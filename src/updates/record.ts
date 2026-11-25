/**
 * pearkit/updates — release records: the one shape every Anjou app publishes and reads.
 *
 * The standard is `~/Anjou/_deliveries/AGENTS.md` (2026-11-25): one folder per app and channel, every installer
 * named `<app>-<version>-<os>-<arch>.<ext>`, and beside it `<name>.release.json`, a record of the fields below
 * signed by the publisher's ed25519 device key over the record's canonical JSON (every field but `sig`, keys
 * sorted, no spaces: the same bytes pearcore's `signJSON` signs and `_deliveries/check.mjs` reads).
 *
 * Nothing here touches the network, a disk or a key: signing and verifying take the host's primitives (PearDrive's
 * sodium, rKeyChat's rkey, a hardware key one day), so this file runs the same in Node, Electron, Bare and a
 * React Native bundle. `UpdateChannel` (channel.ts) builds the "is there a newer version" logic on it.
 */

export const RELEASE_RECORD_FIELDS = ['app', 'channel', 'version', 'build', 'commit', 'os', 'arch', 'ext', 'file', 'size', 'sha256', 'notes', 'publishedAt', 'event', 'publisher'] as const;

export type ReleaseOS = 'mac' | 'linux' | 'win' | 'ios' | 'android';
export type ReleaseArch = 'arm64' | 'x64' | 'universal';

/** One installer, as its `.release.json` says. `sig` is hex; `publisher` is `ed25519:<64 hex>`. */
export interface ReleaseRecord {
  app: string;
  /** `release` when the folder has no `(channel)` suffix. */
  channel: string;
  version: string;
  /** `YYYY-MM-DD.N`: breaks ties between two deliveries of one version. */
  build: string;
  commit?: string;
  os: ReleaseOS;
  arch: ReleaseArch;
  ext: string;
  file: string;
  size: number;
  sha256: string;
  notes?: string;
  publishedAt: string;
  /** The id of the Space event that announced it, when the channel posts events too (PearDrive). */
  event?: string;
  publisher: string;
  sig?: string;
}

/** What an installer's name says about it. */
export interface InstallerName {
  app: string;
  version: string;
  os: ReleaseOS;
  arch: ReleaseArch;
  ext: string;
}

/** The platform a running copy is on, in the record's words. */
export interface ReleasePlatform {
  os: ReleaseOS;
  arch: ReleaseArch;
}

export const INSTALLER_EXTS: Record<ReleaseOS, string[]> = { mac: ['dmg', 'zip'], linux: ['AppImage', 'deb'], win: ['exe'], ios: ['ipa'], android: ['apk', 'aab'] };
/** What an app can swap itself for (a dmg or deb is for people, not the updater). */
export const SELF_INSTALL_EXTS: Partial<Record<ReleaseOS, string>> = { mac: 'zip', linux: 'AppImage', win: 'exe' };

export const INSTALLER_NAME_RE = /^([a-z0-9]+(?:-[a-z0-9]+)*-(?:desktop|mobile|cli|kit))-(\d+\.\d+\.\d+)-(mac|linux|win|ios|android)-(arm64|x64|universal)\.(dmg|zip|AppImage|deb|exe|ipa|apk|aab)$/;
export const BUILD_RE = /^\d{4}-\d{2}-\d{2}\.\d+$/;
const HEX64 = /^[0-9a-f]{64}$/;
const PUBLISHER_RE = /^ed25519:[0-9a-f]{64}$/;

/** `rkeychat-desktop-0.3.1-mac-arm64.zip` → its parts, or null for any other name. */
export function parseInstallerName(name: string): InstallerName | null {
  const m = INSTALLER_NAME_RE.exec(String(name || ''));
  if (!m) return null;
  const [, app, version, os, arch, ext] = m as unknown as [string, string, string, ReleaseOS, ReleaseArch, string];
  if (!INSTALLER_EXTS[os].includes(ext)) return null;
  return { app, version, os, arch, ext };
}

/** The name a record's fields spell. */
export function installerName(r: Pick<ReleaseRecord, 'app' | 'version' | 'os' | 'arch' | 'ext'>): string {
  return `${r.app}-${r.version}-${r.os}-${r.arch}.${r.ext}`;
}

/** Canonical JSON: keys sorted at every level, no spaces (pearcore's `canonicalStringify`). */
export function canonicalJSON(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (Array.isArray(value)) return `[${value.map(canonicalJSON).join(',')}]`;
  const obj = value as Record<string, unknown>;
  return `{${Object.keys(obj)
    .filter((k) => obj[k] !== undefined)
    .sort()
    .map((k) => `${JSON.stringify(k)}:${canonicalJSON(obj[k])}`)
    .join(',')}}`;
}

/** The text a record is signed over: every field but `sig`. */
export function canonicalRecord(record: Partial<ReleaseRecord>): string {
  const { sig: _sig, ...rest } = record;
  return canonicalJSON(rest);
}

/** The bytes a record is signed over (UTF-8 of `canonicalRecord`). */
export function signingBytes(record: Partial<ReleaseRecord>): Uint8Array {
  return utf8(canonicalRecord(record));
}

export function bytesToHex(b: Uint8Array): string {
  let s = '';
  for (const x of b) s += x.toString(16).padStart(2, '0');
  return s;
}
export function hexToBytes(hex: string): Uint8Array {
  const clean = String(hex || '').trim();
  if (clean.length % 2) throw new Error('odd-length hex');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}
const utf8 = (s: string): Uint8Array => (typeof TextEncoder !== 'undefined' ? new TextEncoder().encode(s) : Uint8Array.from(Buffer.from(s, 'utf8')));

/** The 64 hex characters of a publisher key, with or without the `ed25519:` prefix. */
export function publisherHex(publisher: string): string {
  return String(publisher || '')
    .replace(/^ed25519:/, '')
    .toLowerCase();
}

/** Why a record is not a release record, or null when it is one (its fields, not its signature). */
export function recordProblem(record: Partial<ReleaseRecord> | null | undefined): string | null {
  if (!record || typeof record !== 'object') return 'not an object';
  const odd = Object.keys(record).filter((k) => k !== 'sig' && !(RELEASE_RECORD_FIELDS as readonly string[]).includes(k));
  if (odd.length) return `unknown field(s): ${odd.join(', ')}`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*-(?:desktop|mobile|cli|kit)$/.test(String(record.app))) return `app "${record.app}" is not <product>-<form>`;
  if (!/^\d+\.\d+\.\d+$/.test(String(record.version))) return `version "${record.version}" is not MAJOR.MINOR.PATCH`;
  if (!BUILD_RE.test(String(record.build))) return `build "${record.build}" is not YYYY-MM-DD.N`;
  if (!HEX64.test(String(record.sha256))) return 'sha256 is not 64 hex characters';
  if (!Number.isSafeInteger(record.size) || (record.size as number) < 0) return 'size is not a whole number';
  if (!PUBLISHER_RE.test(String(record.publisher))) return 'publisher is not ed25519:<64 hex>';
  const parsed = parseInstallerName(String(record.file));
  if (!parsed) return `file "${record.file}" is not <app>-<version>-<os>-<arch>.<ext>`;
  for (const k of ['app', 'version', 'os', 'arch', 'ext'] as const) if (parsed[k] !== record[k]) return `the name says ${k} ${parsed[k]}, the record says ${record[k]}`;
  return null;
}

/** A detached ed25519 signature over `bytes`, as hex or raw bytes (the host's key does the work). */
export type SignFn = (bytes: Uint8Array) => Promise<Uint8Array | string> | Uint8Array | string;
/** Does `sigHex` sign `bytes` under the public key `publisherKeyHex` (64 hex)? */
export type VerifyFn = (bytes: Uint8Array, sigHex: string, publisherKeyHex: string) => Promise<boolean> | boolean;

/**
 * Sign a record with the publisher's key: the record comes back with `publisher` set and `sig` filled. Refuses
 * anything that is not a release record (nothing shaped like a message can be had signed through this).
 */
export async function signRelease(record: Omit<ReleaseRecord, 'sig' | 'publisher'> & { publisher?: string }, sign: SignFn, publisher: string): Promise<ReleaseRecord> {
  const pub = `ed25519:${publisherHex(publisher)}`;
  const { sig: _old, ...rest } = record as Partial<ReleaseRecord>;
  const unsigned = { ...rest, publisher: pub } as ReleaseRecord;
  const problem = recordProblem(unsigned);
  if (problem) throw new Error(`not a release record: ${problem}`);
  const raw = await sign(signingBytes(unsigned));
  const sig = typeof raw === 'string' ? raw.toLowerCase() : bytesToHex(raw);
  return { ...unsigned, sig };
}

/**
 * Is this record a release from `publisher`? False for a missing or mismatched publisher, a missing signature, a
 * record whose fields are off, or a signature the host's `verify` rejects.
 */
export async function verifyRelease(record: Partial<ReleaseRecord> | null | undefined, verify: VerifyFn, publisher?: string): Promise<boolean> {
  if (!record || recordProblem(record)) return false;
  if (!record.sig || !/^[0-9a-f]+$/i.test(record.sig)) return false;
  const key = publisherHex(record.publisher as string);
  if (publisher && publisherHex(publisher) !== key) return false;
  try {
    return !!(await verify(signingBytes(record), record.sig.toLowerCase(), key));
  } catch {
    return false;
  }
}

/** Compare two releases: positive when `a` is newer. Version first, then the build counter. */
export function compareReleases(a: { version: string; build?: string }, b: { version: string; build?: string }): number {
  const pa = String(a.version || '0').split('.').map((x) => parseInt(x, 10) || 0);
  const pb = String(b.version || '0').split('.').map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d;
  }
  return buildSeq(a.build) - buildSeq(b.build);
}
const buildSeq = (b?: string) => Number(String(b || '').split('.').pop()) || 0;

/** `process.platform`/`process.arch` in the record's words, or null off the desktop. */
export function hostPlatform(p: { platform?: string; arch?: string } | undefined = (globalThis as { process?: { platform?: string; arch?: string } }).process): ReleasePlatform | null {
  if (!p?.platform) return null;
  const os: ReleaseOS | null = p.platform === 'darwin' ? 'mac' : p.platform === 'linux' ? 'linux' : p.platform === 'win32' ? 'win' : null;
  const arch: ReleaseArch | null = p.arch === 'arm64' ? 'arm64' : p.arch === 'x64' ? 'x64' : null;
  return os && arch ? { os, arch } : null;
}

/** Can a copy running on `platform` swap itself for this release? (mac zip, linux AppImage, win exe) */
export function selfInstallable(r: Pick<ReleaseRecord, 'os' | 'arch' | 'ext'>, platform: ReleasePlatform | null): boolean {
  if (!platform || r.os !== platform.os) return false;
  if (r.arch !== platform.arch && r.arch !== 'universal') return false;
  return SELF_INSTALL_EXTS[r.os] === r.ext;
}

/** One id per installer: its bytes. */
export const releaseId = (r: Pick<ReleaseRecord, 'sha256'>): string => r.sha256;

/** Every self-installable release for `platform`, newest first, one per version (the newest build of it wins). */
export function versionsFor<R extends ReleaseRecord>(records: Iterable<R>, platform: ReleasePlatform | null): R[] {
  const byVersion = new Map<string, R>();
  for (const r of records) {
    if (!selfInstallable(r, platform)) continue;
    const cur = byVersion.get(r.version);
    if (!cur || compareReleases(r, cur) > 0) byVersion.set(r.version, r);
  }
  return [...byVersion.values()].sort((a, b) => compareReleases(b, a));
}

/** Those of `versionsFor` newer than what runs. */
export function pendingFor<R extends ReleaseRecord>(records: Iterable<R>, platform: ReleasePlatform | null, running: { version: string; build?: string }): R[] {
  return versionsFor(records, platform).filter((r) => compareReleases(r, running) > 0);
}
