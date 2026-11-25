import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { failedCopy, preflightSource, previousAt, previousCopy, revertScript, swapScript } from './install';

describe('the swap helper', () => {
  it('keeps the previous macOS copy out of Spotlight (.noindex under the keep folder), never beside the app', () => {
    const s = swapScript({ platform: 'darwin', pid: 1, fresh: '/tmp/new/X.app', dest: '/Applications/X.app', work: '/tmp/w', keep: '/Users/me/.x/updates/previous.noindex/X.app' })!;
    expect(s).toContain(`PREV='/Users/me/.x/updates/previous.noindex/X.app'`);
    expect(s).toContain('rm -rf "$DEST.previous" "$PREV"'); // an old beside-the-app copy is cleared too
    expect(s).toContain('mv "$DEST" "$PREV"');
    expect(s).toContain('lsregister'); // the kept copy is taken out of Launch Services
    expect(s).not.toMatch(/mv "\$DEST" "\$DEST\.previous"/);
    expect(previousCopy('/Applications/X.app', '/Users/me/.x/updates')).toBe('/Users/me/.x/updates/previous.noindex/X.app');
    expect(failedCopy('/Applications/X.app', 'darwin', '/Users/me/.x/updates')).toBe('/Users/me/.x/updates/failed.noindex/X.app');
  });

  it('leaves a publisher-signed build as it came and signs only an unsigned one', () => {
    const s = swapScript({ platform: 'darwin', pid: 1, fresh: '/tmp/new/X.app', dest: '/Applications/X.app', work: '/tmp/w', identifier: 'com.example.x' })!;
    expect(s).toContain(`grep -q '^TeamIdentifier=[A-Z0-9]\\{10\\}$'; then :; else`);
    expect(s).toContain(`codesign --force --deep --sign '-' --identifier 'com.example.x'`);
  });

  it('on Linux the AppImage is replaced in place and the old one kept as .previous', () => {
    const s = swapScript({ platform: 'linux', pid: 1, fresh: '/tmp/new.AppImage', dest: '/home/me/Applications/X.AppImage', work: '/tmp/w' })!;
    expect(s).toContain('mv -f "$DEST" "$DEST.previous"');
    expect(swapScript({ platform: 'win32', pid: 1, fresh: 'a', dest: 'b', work: 'c' })).toBeNull();
  });

  it('actually swaps a throwaway bundle on this machine and keeps the old one in the keep folder', async () => {
    if (process.platform !== 'darwin') return;
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pearkit-swap-'));
    const dest = path.join(tmp, 'Apps', 'X.app');
    const fresh = path.join(tmp, 'new', 'X.app');
    const keep = path.join(tmp, 'keep', 'previous.noindex', 'X.app');
    for (const d of [dest, fresh]) fs.mkdirSync(path.join(d, 'Contents', 'MacOS'), { recursive: true });
    fs.writeFileSync(path.join(dest, 'Contents', 'MacOS', 'X'), 'old');
    fs.writeFileSync(path.join(fresh, 'Contents', 'MacOS', 'X'), 'new');
    const work = path.join(tmp, 'work');
    fs.mkdirSync(work);
    const opened = path.join(tmp, 'opened');
    const script = swapScript({ platform: 'darwin', pid: 999999, fresh, dest, work, keep, open: `touch ${JSON.stringify(opened)}` })!;
    const helper = path.join(tmp, 'swap.sh');
    fs.writeFileSync(helper, script, { mode: 0o755 });
    execFileSync('/bin/sh', [helper], { stdio: 'ignore' });
    expect(fs.readFileSync(path.join(dest, 'Contents', 'MacOS', 'X'), 'utf8')).toBe('new');
    expect(fs.readFileSync(path.join(keep, 'Contents', 'MacOS', 'X'), 'utf8')).toBe('old');
    expect(fs.existsSync(`${dest}.previous`)).toBe(false);
    expect(fs.existsSync(work)).toBe(false);
    expect(fs.existsSync(opened)).toBe(true);
    expect(previousAt(dest, 'darwin', path.join(tmp, 'keep'))).toBe(keep);
    // and the way back
    const failed = path.join(tmp, 'keep', 'failed.noindex', 'X.app');
    const back = revertScript({ platform: 'darwin', pid: 999999, dest, prev: keep, failed, open: `touch ${JSON.stringify(opened + '2')}` })!;
    fs.writeFileSync(helper, back, { mode: 0o755 });
    execFileSync('/bin/sh', [helper], { stdio: 'ignore' });
    expect(fs.readFileSync(path.join(dest, 'Contents', 'MacOS', 'X'), 'utf8')).toBe('old');
    expect(fs.readFileSync(path.join(failed, 'Contents', 'MacOS', 'X'), 'utf8')).toBe('new');
    expect(fs.existsSync(keep)).toBe(false);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it('the preflight asks only for the modules named and reports with its markers', () => {
    const src = preflightSource(['better-sqlite3', 'sodium-native']);
    expect(src).toContain('["better-sqlite3","sodium-native"]');
    expect(src).toContain('PEARKIT-PREFLIGHT-OK');
    expect(src).toContain('PEARKIT-PREFLIGHT-FAIL');
    expect(src).toContain("new x(':memory:')"); // the database is actually opened
  });
});
