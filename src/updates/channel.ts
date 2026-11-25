/**
 * pearkit/updates — the update channel every Anjou app runs: "is there a newer version of me, and put it in place".
 *
 * The channel is a place that holds release records (`record.ts`) and the installers they name: for PearDrive and
 * rKeyChat a pearcore Space that mirrors the app's folder in `~/Anjou/_deliveries`; for a test, an array. The host
 * hands this class a `source` that lists the records, verifies their signatures and fetches an installer, and an
 * `install` that swaps the running copy (`pearkit/electron`'s installUpdate on the desktop). Everything in between
 * (which releases count, which is newest, how far behind this copy is, the download and install job, what the
 * Updates block and the sidebar notice show) is here, once, the way PearDrive worked it out
 * (peardrive/src/engine/updates.js, 2026-11-12 to 2026-11-25).
 *
 * No React, no Node: the class is plain TypeScript and runs wherever the host does.
 */
import { compareReleases, pendingFor, releaseId, selfInstallable, versionsFor, type ReleasePlatform, type ReleaseRecord } from './record';

/** Where the channel stands (the words `UpdatesPanel` takes). */
export type UpdateChannelStatus = 'starting' | 'no-channel' | 'connecting' | 'up-to-date' | 'available' | 'downloading' | 'installing' | 'none-posted';

/** What the host gives the channel to reach its releases. */
export interface UpdateSource {
  /** Every release record the channel holds right now (signed or not: `verify` sorts them). */
  records(): Promise<ReleaseRecord[]>;
  /** Is this record signed by the channel's publisher? Records that fail are dropped and counted. */
  verify(record: ReleaseRecord): Promise<boolean> | boolean;
  /**
   * Fetch the installer a record names and return its local path. Must throw when the bytes do not hash to
   * `record.sha256`; may report progress in bytes.
   */
  fetch(record: ReleaseRecord, onProgress?: (done: number, total: number | null) => void): Promise<string>;
  /** The channel's name and publisher, for the Updates block's Advanced rows. */
  describe?(): { name?: string; publisher?: string; link?: string };
}

export interface UpdateJob {
  state: 'idle' | 'downloading' | 'ready' | 'installing' | 'error';
  id?: string;
  version?: string;
  path?: string;
  /** 0–1 while downloading, when the size is known. */
  progress?: number | null;
  error?: string;
  startedAt?: number;
}

/** One version in the list (what `UpdatesPanel` and `UpdateNotice` take). */
export interface UpdateVersionInfo {
  id: string;
  version: string;
  build: string;
  at: number;
  size: number | null;
  notes: string;
  file: string;
}

export interface UpdateChannelState {
  app: string;
  running: { version: string; build?: string; commit?: string; from?: string };
  platform: ReleasePlatform | null;
  status: UpdateChannelStatus;
  /** The newest version for this platform, newer than running or not. */
  latest: UpdateVersionInfo | null;
  /** True when `latest` is newer than running. */
  available: boolean;
  /** How many versions this copy is behind. */
  behind: number;
  progress: number | null;
  error: string | null;
  canInstall: boolean;
  versions: UpdateVersionInfo[];
  /** Newer than running, newest first. */
  pending: UpdateVersionInfo[];
  job: UpdateJob;
  channel: { name?: string; publisher?: string; link?: string; connected: boolean };
  /** Records seen and dropped for a bad or foreign signature since the last check. */
  rejected: number;
  /** When the records were last read, or null. */
  checkedAt: number | null;
  /** A version fetched here that did not load (or start): not offered again. */
  refused: { version: string; reason: string } | null;
}

export interface UpdateChannelOptions {
  /** The app id of the records to accept (`rkeychat-desktop`). */
  app: string;
  running: { version: string; build?: string; commit?: string; from?: string };
  /** Where this copy runs; null (a phone, a browser) means nothing is self-installable. */
  platform: ReleasePlatform | null;
  source?: UpdateSource | null;
  /** Put a fetched installer in place and relaunch. Absent: the copy cannot update itself (source tree, CLI). */
  install?: ((file: string, record: ReleaseRecord) => Promise<void>) | null;
  /** The host's network is up (false while the engine starts: status `starting`). */
  ready?: () => boolean;
  /** Called after every change of state. */
  onChange?: (state: UpdateChannelState) => void;
  /** A version that was installed here and did not start, remembered by the host (PearDrive's failed-start.json). */
  refused?: () => { version: string; reason: string } | null;
  /** Remember a refused version (a fetched build that does not load here). */
  refuse?: (version: string, reason: string) => void;
  /** Who says the time (tests). */
  now?: () => number;
}

const info = (r: ReleaseRecord): UpdateVersionInfo => ({ id: releaseId(r), version: r.version, build: r.build, at: Date.parse(r.publishedAt) || 0, size: Number.isFinite(r.size) ? r.size : null, notes: r.notes || '', file: r.file });

export class UpdateChannel {
  readonly app: string;
  running: UpdateChannelOptions['running'];
  platform: ReleasePlatform | null;
  source: UpdateSource | null;
  /** The host's swap-and-relaunch; null where this copy cannot update itself. */
  installer: UpdateChannelOptions['install'];
  readonly releases = new Map<string, ReleaseRecord>();
  job: UpdateJob = { state: 'idle' };
  rejected = 0;
  checkedAt: number | null = null;
  lastError: string | null = null;
  private checking: Promise<UpdateChannelState> | null = null;
  private readonly opts: UpdateChannelOptions;
  private refusedHere: { version: string; reason: string } | null = null;

  constructor(opts: UpdateChannelOptions) {
    this.opts = opts;
    this.app = opts.app;
    this.running = opts.running;
    this.platform = opts.platform;
    this.source = opts.source ?? null;
    this.installer = opts.install ?? null;
  }

  private now() {
    return (this.opts.now ?? Date.now)();
  }
  private changed() {
    this.opts.onChange?.(this.state());
  }

  /** A new place to read from (the person changed the channel): releases forgotten, the job dropped. */
  setSource(source: UpdateSource | null) {
    this.source = source;
    this.releases.clear();
    this.job = { state: 'idle' };
    this.rejected = 0;
    this.checkedAt = null;
    this.lastError = null;
    this.changed();
  }

  /** Read the channel's records once: verified ones are kept, the rest counted. Concurrent calls share one read. */
  check(): Promise<UpdateChannelState> {
    if (this.checking) return this.checking;
    this.checking = (async () => {
      if (!this.source) return this.state();
      try {
        const records = await this.source.records();
        let rejected = 0;
        const seen = new Set<string>();
        for (const r of records) {
          if (!r || r.app !== this.app) continue;
          let ok = false;
          try {
            ok = await this.source.verify(r);
          } catch {
            ok = false;
          }
          if (!ok) {
            rejected++;
            continue;
          }
          const id = releaseId(r);
          seen.add(id);
          this.releases.set(id, r);
        }
        // a record the channel no longer lists is no longer offered (a release cannot be taken back, but a folder can be sorted)
        for (const id of [...this.releases.keys()]) if (!seen.has(id)) this.releases.delete(id);
        this.rejected = rejected;
        this.checkedAt = this.now();
        this.lastError = null;
      } catch (err) {
        this.lastError = String((err as Error)?.message || err);
      }
      this.changed();
      return this.state();
    })().finally(() => {
      this.checking = null;
    });
    return this.checking;
  }

  /** Hand the channel records the host already holds (a Space's file list just arrived): verified here too. */
  async absorb(records: ReleaseRecord[]): Promise<number> {
    if (!this.source) return 0;
    let added = 0;
    for (const r of records) {
      if (!r || r.app !== this.app) continue;
      let ok = false;
      try {
        ok = await this.source.verify(r);
      } catch {
        ok = false;
      }
      if (!ok) {
        this.rejected++;
        continue;
      }
      const id = releaseId(r);
      if (!this.releases.has(id)) added++;
      this.releases.set(id, r);
    }
    if (added) this.changed();
    return added;
  }

  versions(): ReleaseRecord[] {
    return versionsFor(this.releases.values(), this.platform);
  }
  pending(): ReleaseRecord[] {
    const refused = this.refused();
    return pendingFor(this.releases.values(), this.platform, this.running).filter((r) => !refused || r.version !== refused.version);
  }
  latest(): ReleaseRecord | null {
    return this.versions()[0] ?? null;
  }
  isNewer(r: { version: string; build?: string }): boolean {
    return compareReleases(r, this.running) > 0;
  }
  release(id: string): ReleaseRecord | null {
    return this.releases.get(String(id)) ?? null;
  }
  refused(): { version: string; reason: string } | null {
    return this.refusedHere ?? this.opts.refused?.() ?? null;
  }

  /** The release to act on: the id given, else the newest pending one. */
  private pick(id?: string | null): ReleaseRecord {
    const rel = id ? this.releases.get(String(id)) : this.pending()[0] ?? null;
    if (!rel) throw new Error(id ? 'no such release' : 'no newer version for this computer');
    if (!selfInstallable(rel, this.platform)) throw new Error(`${rel.file} is not an installer for this computer`);
    return rel;
  }

  /** Fetch a release's installer (the newest pending one unless `id` names another). The job rides `state()`. */
  async download(id?: string | null): Promise<UpdateJob> {
    if (!this.source) throw new Error('no update channel');
    const rel = this.pick(id);
    const rid = releaseId(rel);
    if (this.job.state === 'downloading' && this.job.id === rid) return this.job;
    if (this.job.state === 'ready' && this.job.id === rid && this.job.path) return this.job;
    this.job = { state: 'downloading', id: rid, version: rel.version, progress: null, startedAt: this.now() };
    this.changed();
    try {
      const path = await this.source.fetch(rel, (done, total) => {
        if (this.job.id !== rid || this.job.state !== 'downloading') return;
        const p = total ? Math.max(0, Math.min(1, done / total)) : null;
        if (p !== this.job.progress) {
          this.job = { ...this.job, progress: p };
          this.changed();
        }
      });
      if (this.job.id !== rid) return this.job; // the person moved on to another release meanwhile
      this.job = { state: 'ready', id: rid, version: rel.version, path, progress: 1 };
      this.changed();
      return this.job;
    } catch (err) {
      if (this.job.id === rid) {
        this.job = { state: 'error', id: rid, version: rel.version, error: String((err as Error)?.message || err) };
        this.changed();
      }
      throw err;
    }
  }

  /** Download if needed, then hand the installer to the host's `install` (which swaps and relaunches). */
  async install(id?: string | null): Promise<UpdateJob> {
    const job = await this.download(id);
    if (job.state !== 'ready' || !job.path || !job.id) throw new Error(job.error || 'the download is not finished');
    const rel = this.releases.get(job.id);
    if (!rel) throw new Error('the release went away');
    if (!this.installer) throw new Error(`the new version is at ${job.path}; this copy cannot put it in place itself`);
    this.job = { ...job, state: 'installing' };
    this.changed();
    try {
      await this.installer(job.path, rel);
      return this.job;
    } catch (err) {
      const e = err as Error & { unfit?: boolean; detail?: string };
      if (e?.unfit) this.refuse(rel.version, e.detail || e.message);
      this.job = { ...job, state: 'error', error: String(e?.message || err) };
      this.changed();
      throw err;
    }
  }

  /** A fetched build that does not load here: never offered again (the host may remember it on disk). */
  refuse(version: string, reason: string) {
    this.refusedHere = { version, reason };
    this.opts.refuse?.(version, reason);
    this.changed();
  }

  /** The job after a failed swap (the host's helper reported back). */
  failInstall(err: unknown) {
    this.job = { ...this.job, state: 'error', error: String((err as Error)?.message || err) };
    this.changed();
  }

  status(): UpdateChannelStatus {
    if (!this.source) return 'no-channel';
    if (this.opts.ready && !this.opts.ready()) return 'starting';
    if (this.job.state === 'installing') return 'installing';
    if (this.job.state === 'downloading') return 'downloading';
    if (this.pending().length) return 'available';
    if (this.checkedAt === null && !this.releases.size) return 'connecting';
    return this.versions().length ? 'up-to-date' : 'none-posted';
  }

  state(): UpdateChannelState {
    const versions = this.versions();
    const pending = this.pending();
    const latest = versions[0] ?? null;
    const d = this.source?.describe?.() ?? {};
    return {
      app: this.app,
      running: this.running,
      platform: this.platform,
      status: this.status(),
      latest: latest ? info(latest) : null,
      available: pending.length > 0,
      behind: pending.length,
      progress: this.job.state === 'downloading' ? this.job.progress ?? null : null,
      error: this.job.state === 'error' ? this.job.error ?? 'failed' : this.lastError,
      canInstall: !!this.installer && !!this.platform,
      versions: versions.map(info),
      pending: pending.map(info),
      job: { ...this.job },
      channel: { ...d, connected: !!this.source },
      rejected: this.rejected,
      checkedAt: this.checkedAt,
      refused: this.refused(),
    };
  }
}

/** The channel's state as `UpdateNotice` wants it, or null when there is nothing to show. */
export function noticeFor(s: UpdateChannelState): { version: string; behind: number; state: 'available' | 'downloading' | 'restarting' | 'error'; progress?: number; error?: string } | null {
  if (s.job.state === 'error' && s.pending[0]) return { version: s.pending[0].version, behind: s.behind, state: 'error', error: s.job.error };
  if (s.status === 'installing' && s.job.version) return { version: s.job.version, behind: s.behind, state: 'restarting' };
  if (s.status === 'downloading' && s.job.version) return { version: s.job.version, behind: s.behind, state: 'downloading', progress: s.progress ?? undefined };
  if (s.status === 'available' && s.pending[0]) return { version: s.pending[0].version, behind: s.behind, state: 'available' };
  return null;
}
