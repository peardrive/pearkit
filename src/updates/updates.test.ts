import { describe, expect, it } from 'vitest';
import { createHash, generateKeyPairSync, sign as nodeSign, verify as nodeVerify } from 'node:crypto';
import { UpdateChannel, noticeFor, type UpdateSource } from './channel';
import { canonicalRecord, compareReleases, hostPlatform, parseInstallerName, pendingFor, recordProblem, selfInstallable, signRelease, verifyRelease, versionsFor, type ReleaseRecord } from './record';

// an ed25519 key pair the way a device holds one: Node's crypto stands in for sodium/rkey
function keyPair() {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const pubHex = publicKey.export({ format: 'der', type: 'spki' }).subarray(-32).toString('hex');
  const sign = (bytes: Uint8Array) => new Uint8Array(nodeSign(null, bytes, privateKey));
  const verify = (bytes: Uint8Array, sigHex: string, keyHex: string) => {
    const der = Buffer.concat([Buffer.from('302a300506032b6570032100', 'hex'), Buffer.from(keyHex, 'hex')]);
    return nodeVerify(null, bytes, { key: der, format: 'der', type: 'spki' }, Buffer.from(sigHex, 'hex'));
  };
  return { pubHex, sign, verify };
}

const bytesOf = (s: string) => createHash('sha256').update(s).digest('hex');
const rec = (over: Partial<ReleaseRecord> = {}): Omit<ReleaseRecord, 'sig' | 'publisher'> => ({
  app: 'rkeychat-desktop',
  channel: 'release',
  version: '0.3.1',
  build: '2026-11-25.1',
  commit: 'abc1234',
  os: 'mac',
  arch: 'arm64',
  ext: 'zip',
  file: 'rkeychat-desktop-0.3.1-mac-arm64.zip',
  size: 1234,
  sha256: bytesOf('0.3.1'),
  notes: 'first one',
  publishedAt: '2026-11-25T20:00:00.000Z',
  ...over,
});

describe('release records', () => {
  it('reads an installer name and refuses every other spelling', () => {
    expect(parseInstallerName('rkeychat-desktop-0.3.1-mac-arm64.zip')).toEqual({ app: 'rkeychat-desktop', version: '0.3.1', os: 'mac', arch: 'arm64', ext: 'zip' });
    expect(parseInstallerName('peardrive-desktop-0.6.207-linux-x64.AppImage')?.os).toBe('linux');
    expect(parseInstallerName('rKeyChat-0.3.0-mac-arm64.dmg')).toBeNull();
    expect(parseInstallerName('rkeychat-desktop-0.3.1-mac-arm64.AppImage')).toBeNull(); // not a mac extension
    expect(parseInstallerName('rkeychat-mobile-0.3.0-vc1-b0d40f2-debugsigned.apk')).toBeNull();
  });

  it('canonical JSON sorts keys at every level and leaves sig out', () => {
    const a = canonicalRecord({ version: '1.0.0', app: 'x-desktop', sig: 'zz', size: 1 } as never);
    expect(a).toBe('{"app":"x-desktop","size":1,"version":"1.0.0"}');
    expect(canonicalRecord({ b: { z: 1, a: [2, { y: 1, x: 0 }] } } as never)).toBe('{"b":{"a":[2,{"x":0,"y":1}],"z":1}}');
  });

  it('a record is signed by its publisher and verified by the key alone', async () => {
    const me = keyPair();
    const other = keyPair();
    const signed = await signRelease(rec(), me.sign, me.pubHex);
    expect(signed.publisher).toBe(`ed25519:${me.pubHex}`);
    expect(signed.sig).toMatch(/^[0-9a-f]{128}$/);
    expect(await verifyRelease(signed, me.verify)).toBe(true);
    expect(await verifyRelease(signed, me.verify, `ed25519:${me.pubHex}`)).toBe(true);
    // the channel names another publisher: not ours
    expect(await verifyRelease(signed, me.verify, other.pubHex)).toBe(false);
    // a byte changed after signing
    expect(await verifyRelease({ ...signed, size: 1235 }, me.verify)).toBe(false);
    expect(await verifyRelease({ ...signed, sig: undefined }, me.verify)).toBe(false);
    // signed by somebody else entirely
    const forged = await signRelease(rec(), other.sign, me.pubHex);
    expect(await verifyRelease(forged, me.verify)).toBe(false);
  });

  it('refuses to sign anything that is not a release record', async () => {
    const me = keyPair();
    await expect(signRelease({ ...rec(), kind: 1, content: 'hi' } as never, me.sign, me.pubHex)).rejects.toThrow(/unknown field/);
    await expect(signRelease(rec({ file: 'rkeychat-desktop-0.3.2-mac-arm64.zip' }), me.sign, me.pubHex)).rejects.toThrow(/name says version 0.3.2/);
    expect(recordProblem(rec({ build: 'nope' }) as never)).toMatch(/build/);
    expect(recordProblem(rec({ sha256: 'short' }) as never)).toMatch(/sha256/);
    expect(recordProblem({ ...rec(), publisher: 'ed25519:' + 'ab'.repeat(32) })).toBeNull();
  });

  it('orders by version, then by the build counter; picks what this computer can install', () => {
    expect(compareReleases({ version: '0.3.1' }, { version: '0.3.0' })).toBeGreaterThan(0);
    expect(compareReleases({ version: '0.10.0' }, { version: '0.9.9' })).toBeGreaterThan(0);
    expect(compareReleases({ version: '0.3.1', build: '2026-11-25.2' }, { version: '0.3.1', build: '2026-11-25.1' })).toBeGreaterThan(0);
    expect(compareReleases({ version: '0.3.1', build: '2026-11-25.1' }, { version: '0.3.1', build: '2026-11-25.1' })).toBe(0);
    const mac = { os: 'mac', arch: 'arm64' } as const;
    expect(selfInstallable({ os: 'mac', arch: 'arm64', ext: 'zip' }, mac)).toBe(true);
    expect(selfInstallable({ os: 'mac', arch: 'arm64', ext: 'dmg' }, mac)).toBe(false); // the dmg is for people
    expect(selfInstallable({ os: 'mac', arch: 'x64', ext: 'zip' }, mac)).toBe(false);
    expect(selfInstallable({ os: 'mac', arch: 'universal', ext: 'zip' }, mac)).toBe(true);
    expect(selfInstallable({ os: 'linux', arch: 'x64', ext: 'AppImage' }, { os: 'linux', arch: 'x64' })).toBe(true);
    expect(selfInstallable({ os: 'linux', arch: 'x64', ext: 'deb' }, { os: 'linux', arch: 'x64' })).toBe(false);
    expect(selfInstallable({ os: 'mac', arch: 'arm64', ext: 'zip' }, null)).toBe(false);
    expect(hostPlatform({ platform: 'darwin', arch: 'arm64' })).toEqual({ os: 'mac', arch: 'arm64' });
    expect(hostPlatform({ platform: 'linux', arch: 'x64' })).toEqual({ os: 'linux', arch: 'x64' });
    expect(hostPlatform({})).toBeNull();
    expect(hostPlatform({ platform: 'win32', arch: 'x64' })).toEqual({ os: 'win', arch: 'x64' });
  });

  it('one row per version, the newest build of it, newest first; pending is what is newer than running', () => {
    const P = 'ed25519:' + 'ab'.repeat(32);
    const all: ReleaseRecord[] = [
      { ...rec({ version: '0.3.1', build: '2026-11-25.1', sha256: bytesOf('a') }), publisher: P },
      { ...rec({ version: '0.3.1', build: '2026-11-25.2', sha256: bytesOf('b') }), publisher: P },
      { ...rec({ version: '0.3.3', build: '2026-11-26.1', sha256: bytesOf('c'), file: 'rkeychat-desktop-0.3.3-mac-arm64.zip' }), publisher: P },
      { ...rec({ version: '0.3.2', build: '2026-11-25.3', sha256: bytesOf('d'), file: 'rkeychat-desktop-0.3.2-mac-arm64.zip' }), publisher: P },
      { ...rec({ version: '0.3.2', build: '2026-11-25.3', sha256: bytesOf('e'), ext: 'dmg', file: 'rkeychat-desktop-0.3.2-mac-arm64.dmg' }), publisher: P },
      { ...rec({ version: '0.3.4', build: '2026-11-26.2', sha256: bytesOf('f'), os: 'linux', arch: 'x64', ext: 'AppImage', file: 'rkeychat-desktop-0.3.4-linux-x64.AppImage' }), publisher: P },
    ];
    const mac = { os: 'mac', arch: 'arm64' } as const;
    expect(versionsFor(all, mac).map((r) => `${r.version}/${r.build}`)).toEqual(['0.3.3/2026-11-26.1', '0.3.2/2026-11-25.3', '0.3.1/2026-11-25.2']);
    expect(pendingFor(all, mac, { version: '0.3.1', build: '2026-11-25.2' }).map((r) => r.version)).toEqual(['0.3.3', '0.3.2']);
    expect(pendingFor(all, mac, { version: '0.3.3', build: '2026-11-26.1' })).toEqual([]);
    // a copy that does not know its build counter counts as the first build of its version
    expect(pendingFor(all, mac, { version: '0.3.3' }).map((r) => r.version)).toEqual(['0.3.3']);
    expect(versionsFor(all, { os: 'linux', arch: 'x64' }).map((r) => r.version)).toEqual(['0.3.4']);
  });
});

describe('the update channel', () => {
  const me = keyPair();
  const other = keyPair();
  const mac = { os: 'mac', arch: 'arm64' } as const;
  async function signedSet() {
    const s = (r: ReturnType<typeof rec>) => signRelease(r, me.sign, me.pubHex);
    return [
      await s(rec({ version: '0.3.1', build: '2026-11-25.1', sha256: bytesOf('a') })),
      await s(rec({ version: '0.3.2', build: '2026-11-25.2', sha256: bytesOf('b'), file: 'rkeychat-desktop-0.3.2-mac-arm64.zip', notes: 'second' })),
      await s(rec({ version: '0.3.3', build: '2026-11-25.3', sha256: bytesOf('c'), file: 'rkeychat-desktop-0.3.3-mac-arm64.zip', notes: 'third' })),
      // a stranger's record in the same folder: never offered
      await signRelease(rec({ version: '9.9.9', build: '2026-11-25.9', sha256: bytesOf('z'), file: 'rkeychat-desktop-9.9.9-mac-arm64.zip' }), other.sign, other.pubHex),
    ];
  }
  function source(records: ReleaseRecord[], fetched: string[] = [], opts: { fail?: boolean; slow?: boolean } = {}): UpdateSource {
    return {
      records: async () => records,
      verify: (r) => verifyRelease(r, me.verify, me.pubHex),
      fetch: async (r, onProgress) => {
        if (opts.fail) throw new Error('the publisher is offline');
        onProgress?.(r.size / 2, r.size);
        if (opts.slow) await new Promise((res) => setTimeout(res, 20));
        onProgress?.(r.size, r.size);
        fetched.push(r.file);
        return `/tmp/updates/${r.file}`;
      },
      describe: () => ({ name: 'rKeyChat', publisher: `ed25519:${me.pubHex}` }),
    };
  }

  it('no source is no channel; a source not yet read is connecting; then up to date or behind', async () => {
    const ch = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.1', build: '2026-11-25.1' }, platform: mac });
    expect(ch.state().status).toBe('no-channel');
    const installed: string[] = [];
    ch.installer = async (file) => {
      installed.push(file);
    };
    ch.setSource(source(await signedSet()));
    expect(ch.state().status).toBe('connecting');
    const s = await ch.check();
    expect(s.status).toBe('available');
    expect(s.behind).toBe(2);
    expect(s.latest?.version).toBe('0.3.3');
    expect(s.pending.map((p) => p.version)).toEqual(['0.3.3', '0.3.2']);
    expect(s.versions.map((p) => p.version)).toEqual(['0.3.3', '0.3.2', '0.3.1']);
    expect(s.rejected).toBe(1); // the stranger's 9.9.9
    expect(s.canInstall).toBe(true);
    expect(s.channel).toEqual({ name: 'rKeyChat', publisher: `ed25519:${me.pubHex}`, connected: true });
    expect(noticeFor(s)).toEqual({ version: '0.3.3', behind: 2, state: 'available' });
  });

  it('a copy on the newest version is up to date; a platform with nothing posted says so', async () => {
    const ch = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.3', build: '2026-11-25.3' }, platform: mac, source: source(await signedSet()) });
    expect((await ch.check()).status).toBe('up-to-date');
    expect(noticeFor(ch.state())).toBeNull();
    const linux = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.1', build: '2026-11-25.1' }, platform: { os: 'linux', arch: 'x64' }, source: source(await signedSet()) });
    expect((await linux.check()).status).toBe('none-posted');
    const phone = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.1', build: '2026-11-25.1' }, platform: null, source: source(await signedSet()) });
    expect((await phone.check()).canInstall).toBe(false);
  });

  it('starting while the host is not ready; records absorbed as they arrive', async () => {
    let ready = false;
    const ch = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.1', build: '2026-11-25.1' }, platform: mac, source: source([]), ready: () => ready });
    expect(ch.state().status).toBe('starting');
    ready = true;
    await ch.check();
    expect(ch.state().status).toBe('none-posted');
    expect(await ch.absorb((await signedSet()).slice(0, 2))).toBe(2);
    expect(ch.state().status).toBe('available');
    expect(ch.state().latest?.version).toBe('0.3.2');
  });

  it('install downloads with progress, then hands the file to the host; a failed fetch is an error to try again', async () => {
    const fetched: string[] = [];
    const installed: { file: string; version: string }[] = [];
    const states: string[] = [];
    const ch = new UpdateChannel({
      app: 'rkeychat-desktop',
      running: { version: '0.3.1', build: '2026-11-25.1' },
      platform: mac,
      source: source(await signedSet(), fetched, { slow: true }),
      install: async (file, r) => {
        installed.push({ file, version: r.version });
      },
      onChange: (s) => states.push(`${s.status}${s.progress != null ? `:${s.progress}` : ''}`),
    });
    await ch.check();
    const job = await ch.install();
    expect(job.state).toBe('installing');
    expect(fetched).toEqual(['rkeychat-desktop-0.3.3-mac-arm64.zip']);
    expect(installed).toEqual([{ file: '/tmp/updates/rkeychat-desktop-0.3.3-mac-arm64.zip', version: '0.3.3' }]);
    expect(states).toContain('downloading:0.5');
    expect(states.at(-1)).toBe('installing');
    expect(noticeFor(ch.state())).toEqual({ version: '0.3.3', behind: 2, state: 'restarting' });

    // a chosen older version
    const second = ch.state().versions.find((v) => v.version === '0.3.2')!;
    await ch.install(second.id);
    expect(installed.at(-1)?.version).toBe('0.3.2');

    const broken = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.1', build: '2026-11-25.1' }, platform: mac, source: source(await signedSet(), [], { fail: true }), install: async () => {} });
    await broken.check();
    await expect(broken.install()).rejects.toThrow(/offline/);
    expect(broken.state().job.state).toBe('error');
    expect(broken.state().error).toMatch(/offline/);
    expect(noticeFor(broken.state())?.state).toBe('error');
  });

  it('a build that does not load here is refused and not offered again; without an installer the copy says where the file is', async () => {
    const refused: string[] = [];
    const ch = new UpdateChannel({
      app: 'rkeychat-desktop',
      running: { version: '0.3.1', build: '2026-11-25.1' },
      platform: mac,
      source: source(await signedSet()),
      install: async () => {
        const e = new Error('Version 0.3.3 does not load on this computer') as Error & { unfit?: boolean; detail?: string };
        e.unfit = true;
        e.detail = 'better-sqlite3: dlopen failed';
        throw e;
      },
      refuse: (v, why) => refused.push(`${v}: ${why}`),
    });
    await ch.check();
    await expect(ch.install()).rejects.toThrow(/does not load/);
    expect(refused).toEqual(['0.3.3: better-sqlite3: dlopen failed']);
    expect(ch.state().refused?.version).toBe('0.3.3');
    expect(ch.state().pending.map((p) => p.version)).toEqual(['0.3.2']);
    expect(ch.state().latest?.version).toBe('0.3.3'); // still listed, just not offered

    const cli = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.1', build: '2026-11-25.1' }, platform: mac, source: source(await signedSet()) });
    await cli.check();
    await expect(cli.install()).rejects.toThrow(/\/tmp\/updates\/rkeychat-desktop-0.3.3-mac-arm64.zip/);
  });

  it('a record the channel stops listing is no longer offered; a stale source read cannot revive it', async () => {
    const all = await signedSet();
    let listed = all;
    const ch = new UpdateChannel({ app: 'rkeychat-desktop', running: { version: '0.3.1', build: '2026-11-25.1' }, platform: mac, source: { ...source(all), records: async () => listed } });
    await ch.check();
    expect(ch.state().latest?.version).toBe('0.3.3');
    listed = all.filter((r) => r.version !== '0.3.3');
    await ch.check();
    expect(ch.state().latest?.version).toBe('0.3.2');
  });
});
