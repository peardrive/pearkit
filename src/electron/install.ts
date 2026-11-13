/**
 * The swap: the last step of an update. The new build is on disk, verified; replace the running app with it and
 * relaunch. Moved from PearDrive (electron/updater.js) so every Anjou desktop app swaps the same way.
 *
 * A process can't replace itself while it runs, so a small shell helper starts DETACHED, waits for this process to
 * exit, swaps the bundle (keeping the previous one beside it for one cycle, so a bad build is one `mv` from undone),
 * and opens the new one.
 *
 *   macOS   the zip is unpacked with ditto; the .app inside replaces the running bundle (/Applications/X.app, or
 *           wherever this copy runs from). Files the app wrote itself carry no quarantine mark, so Gatekeeper doesn't
 *           stand in the way; the bundle is re-signed (ad hoc, or `signId`) with the app's own identifier so macOS
 *           keeps treating it as the same app (the microphone permission is keyed on that).
 *   Linux   the AppImage replaces the file named by $APPIMAGE (set by the AppImage runtime).
 *
 * Running from source (electron .) has nothing to swap: installUpdate refuses, with the file's path.
 *
 * Main process only (`pearkit/electron` is never part of a React Native or renderer bundle).
 */
/// <reference types="node" />
import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const sh = (s: string) => `'${String(s).replace(/'/g, `'\\''`)}'`;

const proc = () => process;

/** Where the running copy lives: the .app bundle, the AppImage, or null (running from source). */
export function installedAt(): string | null {
  const p = proc();
  if (p.platform === 'darwin') {
    const m = p.execPath.match(/^(.*?\.app)\/Contents\//);
    return m ? m[1]! : null;
  }
  if (p.platform === 'linux') {
    return p.env.APPIMAGE && fs.existsSync(p.env.APPIMAGE) ? p.env.APPIMAGE : null;
  }
  return null;
}

export interface SwapScriptOptions {
  platform?: string;
  pid?: number;
  /** The new build: an unpacked .app (macOS) or an AppImage (Linux). */
  fresh: string;
  /** The running copy to replace. */
  dest: string;
  /** A temporary folder the helper removes when done. */
  work: string;
  /** codesign identity; '-' is ad hoc. */
  sign?: string;
  /** The bundle identifier to sign with (macOS), e.g. com.peardrive.pearkit-studio. */
  identifier?: string;
  /** The command that opens the new copy (tests pass their own). */
  open?: string | null;
}

/** The helper, as text. Pure, so it can be tried against a throwaway bundle. */
export function swapScript({ platform = proc().platform, pid = proc().pid, fresh, dest, work, sign = '-', identifier, open = null }: SwapScriptOptions): string | null {
  const wait = `i=0; while kill -0 "$PID" 2>/dev/null && [ $i -lt 240 ]; do sleep 0.5; i=$((i+1)); done`;
  if (platform === 'darwin') {
    return `#!/bin/sh
PID=${pid}; NEW=${sh(fresh)}; DEST=${sh(dest)}
${wait}
rm -rf "$DEST.previous"
mv "$DEST" "$DEST.previous" || exit 1
if ditto "$NEW" "$DEST"; then
  xattr -dr com.apple.quarantine "$DEST" 2>/dev/null
  codesign --force --deep --sign ${sh(sign)}${identifier ? ` --identifier ${sh(identifier)}` : ''} "$DEST" 2>/dev/null
else
  rm -rf "$DEST"; mv "$DEST.previous" "$DEST"
fi
rm -rf ${sh(work)}
${open || 'open "$DEST"'}
`;
  }
  if (platform === 'linux') {
    return `#!/bin/sh
PID=${pid}; NEW=${sh(fresh)}; DEST=${sh(dest)}
${wait}
cp "$NEW" "$DEST.new" && chmod +x "$DEST.new" || exit 1
rm -f "$DEST.previous"
mv -f "$DEST" "$DEST.previous" && mv -f "$DEST.new" "$DEST" || { [ -e "$DEST" ] || mv -f "$DEST.previous" "$DEST"; }
rm -rf ${sh(work)}
${open || 'cd "$(dirname "$DEST")" && (nohup "$DEST" >/dev/null 2>&1 &)'}
`;
  }
  return null;
}

export interface InstallUpdateOptions {
  /** The downloaded installer: a .zip holding the .app (macOS) or an .AppImage (Linux). */
  file: string;
  version?: string;
  /** The bundle identifier to re-sign with (macOS). */
  identifier?: string;
  /** codesign identity; default ad hoc. */
  signId?: string;
}

/**
 * Unpack (macOS) and start the detached helper. Resolves once the helper runs; the caller then quits the app
 * (`app.quit()`), and the helper swaps and reopens it.
 */
export async function installUpdate({ file, version, identifier, signId }: InstallUpdateOptions): Promise<{ dest: string; helper: string }> {
  const p = proc();
  const dest = installedAt();
  if (!dest) throw new Error(`this copy runs from source; the new build is at ${file}`);
  if (!fs.existsSync(file)) throw new Error(`the downloaded file is missing: ${file}`);
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'pearkit-update-'));
  let fresh = file;
  if (p.platform === 'darwin') {
    if (!/\.zip$/i.test(file)) throw new Error('the macOS update must be a .zip');
    execFileSync('/usr/bin/ditto', ['-xk', file, work], { stdio: 'ignore' });
    const bundle = fs.readdirSync(work).find((n) => n.endsWith('.app'));
    if (!bundle) throw new Error('no .app inside the zip');
    fresh = path.join(work, bundle);
  } else if (p.platform === 'linux') {
    if (!/\.AppImage$/i.test(file)) throw new Error('the Linux update must be an .AppImage');
  }
  const script = swapScript({ fresh, dest, work, sign: signId || '-', identifier });
  if (!script) throw new Error(`in-app updates are not built for ${p.platform} yet; the file is at ${file}`);
  const helper = path.join(work, 'swap.sh');
  fs.writeFileSync(helper, script, { mode: 0o755 });
  const child = spawn('/bin/sh', [helper], { detached: true, stdio: 'ignore', env: { ...p.env, PEARKIT_UPDATE_TO: String(version || '') } });
  child.unref();
  return { dest, helper };
}
