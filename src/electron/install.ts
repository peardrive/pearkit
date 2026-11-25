/**
 * The swap: the last step of an update (`pearkit/updates`' UpdateChannel hands the installer here). The new build
 * is on disk, verified; replace the running app with it and relaunch. From PearDrive (electron/updater.js,
 * 2026-11-12 to 2026-11-17), so every Anjou desktop app swaps the same way.
 *
 * A process can't replace itself while it runs, so a small shell helper starts DETACHED, waits for this process to
 * exit, swaps the bundle (keeping the previous one for one cycle, so a bad build is one `mv` from undone), and
 * opens the new one.
 *
 *   macOS   the zip is unpacked with ditto; the .app inside replaces the running bundle (/Applications/X.app, or
 *           wherever this copy runs from). THE PREVIOUS COPY IS KEPT OUT OF SPOTLIGHT'S SIGHT: in
 *           `<keepDir>/previous.noindex/X.app`, never beside the app (a `X.app.previous` in /Applications showed up
 *           as a second app, with its helpers, when Guy typed its name; Spotlight skips a `.noindex` folder). Files
 *           the app wrote itself carry no quarantine mark, so Gatekeeper doesn't stand in the way. A build signed by
 *           its publisher (a Developer ID certificate) is left exactly as it came: signing it again would replace
 *           the publisher's signature with a nameless one, and a firewall or macOS would see a different app after
 *           every update. Only an unsigned build is signed on the spot (ad hoc, or `signId`) with the app's own
 *           identifier, so macOS keeps treating it as the same app (the microphone permission is keyed on that).
 *   Linux   the AppImage replaces the file named by $APPIMAGE (set by the AppImage runtime); the old one is kept
 *           beside it as `.previous` (no Spotlight there).
 *
 * BEFORE THE SWAP THE NEW BUILD IS ASKED TO LOAD ITS OWN NATIVE MODULES (`preflight`): its binary runs as plain
 * Node for a moment and requires each module the engine cannot start without. A build that says a module cannot
 * load is not installed (the error carries `unfit`), the running app stays, and the channel remembers the version.
 * A check that could not run at all refuses nothing.
 *
 * THE WAY BACK (`revertUpdate`): when the new build does not start, the host offers "Go back to the previous
 * version": the swap in reverse, the failed build set aside in `<keepDir>/failed.noindex/`, nothing signed.
 *
 * Running from source (electron .) has nothing to swap: installUpdate refuses, with the file's path.
 *
 * Main process only (`pearkit/electron` is never part of a React Native or renderer bundle).
 */
/// <reference types="node" />
import { execFile, execFileSync, spawn } from 'node:child_process';
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

/** Where an app keeps what the swap sets aside, by default: `~/.pearkit/updates`. Apps pass their own data folder. */
export const defaultKeepDir = (home = os.homedir()) => path.join(home, '.pearkit', 'updates');

/** Where the macOS swap keeps the copy it replaced: out of Spotlight's sight (`.noindex`). */
export function previousCopy(dest: string, keepDir = defaultKeepDir()): string {
  return path.join(keepDir, 'previous.noindex', path.basename(dest));
}

/** Where the way back puts the build that did not start (kept once, for whoever looks into it). */
export function failedCopy(dest: string, platform: string = proc().platform, keepDir = defaultKeepDir()): string {
  return platform === 'darwin' ? path.join(keepDir, 'failed.noindex', path.basename(dest)) : `${dest}.failed`;
}

/** The copy the last update replaced, when it is still kept: the way back from a build that does not start. */
export function previousAt(dest = installedAt(), platform: string = proc().platform, keepDir = defaultKeepDir()): string | null {
  if (!dest) return null;
  const prev = platform === 'darwin' ? previousCopy(dest, keepDir) : platform === 'linux' ? `${dest}.previous` : null;
  return prev && fs.existsSync(prev) ? prev : null;
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
  /** codesign identity for a build that came unsigned; '-' is ad hoc. */
  sign?: string;
  /** The bundle identifier to sign an unsigned build with (macOS), e.g. com.peardrive.pearkit-studio. */
  identifier?: string;
  /** Where the replaced copy is kept (macOS; see `previousCopy`). */
  keep?: string | null;
  /** The command that opens the new copy (tests pass their own). */
  open?: string | null;
}

const WAIT = `i=0; while kill -0 "$PID" 2>/dev/null && [ $i -lt 240 ]; do sleep 0.5; i=$((i+1)); done`;
const LSR = '/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister';

/** The helper, as text. Pure, so it can be tried against a throwaway bundle. */
export function swapScript({ platform = proc().platform, pid = proc().pid, fresh, dest, work, sign = '-', identifier, keep = null, open = null }: SwapScriptOptions): string | null {
  if (platform === 'darwin') {
    return `#!/bin/sh
PID=${pid}; NEW=${sh(fresh)}; DEST=${sh(dest)}; PREV=${sh(keep || previousCopy(dest))}
LSR=${LSR}
${WAIT}
rm -rf "$DEST.previous" "$PREV"
mkdir -p "$(dirname "$PREV")" || exit 1
mv "$DEST" "$PREV" || exit 1
if ditto "$NEW" "$DEST"; then
  xattr -dr com.apple.quarantine "$DEST" 2>/dev/null
  if codesign -dv "$DEST" 2>&1 | grep -q '^TeamIdentifier=[A-Z0-9]\\{10\\}$'; then :; else
    codesign --force --deep --sign ${sh(sign)}${identifier ? ` --identifier ${sh(identifier)}` : ''} "$DEST" 2>/dev/null
  fi
  [ -x "$LSR" ] && "$LSR" -u "$PREV" >/dev/null 2>&1
else
  rm -rf "$DEST"; mv "$PREV" "$DEST"
fi
rm -rf ${sh(work)}
${open || 'open "$DEST"'}
`;
  }
  if (platform === 'linux') {
    return `#!/bin/sh
PID=${pid}; NEW=${sh(fresh)}; DEST=${sh(dest)}
${WAIT}
cp "$NEW" "$DEST.new" && chmod +x "$DEST.new" || exit 1
rm -f "$DEST.previous"
mv -f "$DEST" "$DEST.previous" && mv -f "$DEST.new" "$DEST" || { [ -e "$DEST" ] || mv -f "$DEST.previous" "$DEST"; }
rm -rf ${sh(work)}
${open || 'cd "$(dirname "$DEST")" && (nohup "$DEST" >/dev/null 2>&1 &)'}
`;
  }
  return null;
}

export interface RevertScriptOptions {
  platform?: string;
  pid?: number;
  /** The running (failed) copy. */
  dest: string;
  /** The kept previous copy to put back. */
  prev: string;
  /** Where the failed build goes (see `failedCopy`). */
  failed?: string | null;
  open?: string | null;
}

/**
 * THE WAY BACK, as text: the swap in reverse. Waits for this process to exit, sets the build that failed aside,
 * puts the previous copy where the app lives and opens it. Nothing is signed here: the previous copy is put back
 * exactly as it was kept. If the previous copy cannot be moved in, the failed build is put back, so there is
 * always an app.
 */
export function revertScript({ platform = proc().platform, pid = proc().pid, dest, prev, failed = null, open = null }: RevertScriptOptions): string | null {
  const aside = failed || failedCopy(dest, platform);
  if (platform === 'darwin') {
    return `#!/bin/sh
PID=${pid}; DEST=${sh(dest)}; PREV=${sh(prev)}; FAILED=${sh(aside)}
LSR=${LSR}
${WAIT}
[ -d "$PREV" ] || exit 1
rm -rf "$FAILED"
mkdir -p "$(dirname "$FAILED")" || exit 1
mv "$DEST" "$FAILED" || exit 1
if mv "$PREV" "$DEST"; then
  [ -x "$LSR" ] && "$LSR" -u "$FAILED" >/dev/null 2>&1
else
  mv "$FAILED" "$DEST"
fi
${open || 'open "$DEST"'}
`;
  }
  if (platform === 'linux') {
    return `#!/bin/sh
PID=${pid}; DEST=${sh(dest)}; PREV=${sh(prev)}; FAILED=${sh(aside)}
${WAIT}
[ -f "$PREV" ] || exit 1
rm -f "$FAILED"
mv -f "$DEST" "$FAILED" || exit 1
mv -f "$PREV" "$DEST" || mv -f "$FAILED" "$DEST"
chmod +x "$DEST"
${open || 'cd "$(dirname "$DEST")" && (nohup "$DEST" >/dev/null 2>&1 &)'}
`;
  }
  return null;
}

/** Start the detached helper that goes back to the previous copy. Resolves once it runs; the caller quits. */
export async function revertUpdate({ keepDir = defaultKeepDir() }: { keepDir?: string } = {}): Promise<{ dest: string; prev: string; helper: string }> {
  const dest = installedAt();
  const prev = previousAt(dest, proc().platform, keepDir);
  if (!dest || !prev) throw new Error('no previous version is kept on this computer');
  const script = revertScript({ dest, prev, failed: failedCopy(dest, proc().platform, keepDir) });
  if (!script) throw new Error(`going back is not built for ${proc().platform} yet`);
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'pearkit-revert-'));
  const helper = path.join(work, 'revert.sh');
  fs.writeFileSync(helper, script, { mode: 0o755 });
  const child = spawn('/bin/sh', [helper], { detached: true, stdio: 'ignore' });
  child.unref();
  return { dest, prev, helper };
}

/** The native modules an Anjou engine cannot start without; a module the build does not carry is passed over. */
export const PREFLIGHT_MODULES = ['better-sqlite3', 'sodium-native', 'udx-native'];
const PRE_OK = 'PEARKIT-PREFLIGHT-OK';
const PRE_FAIL = 'PEARKIT-PREFLIGHT-FAIL';

/** What the new build runs, as text. */
export function preflightSource(mods: string[] = PREFLIGHT_MODULES): string {
  return `const p=require('path'),fs=require('fs');
const dir=p.dirname(process.execPath);
const roots=[p.join(dir,'resources','app'),p.join(dir,'..','Resources','app'),p.join(dir,'resources','app.asar'),p.join(dir,'..','Resources','app.asar')];
const root=roots.find((d)=>{try{return fs.existsSync(p.join(d,'node_modules'))}catch{return false}});
if(!root){console.log('no app folder beside '+process.execPath);process.exit(0)}
const bad=[];
for(const m of ${JSON.stringify(mods)}){
  const at=p.join(root,'node_modules',m);
  if(!fs.existsSync(at))continue;
  try{const x=require(at);if(m==='better-sqlite3'){const d=new x(':memory:');d.prepare('select 1').get();d.close()}}
  catch(e){bad.push(m+': '+String(e&&e.message||e).split('\\n')[0].slice(0,300))}
}
console.log(bad.length?'${PRE_FAIL} '+bad.join(' | '):'${PRE_OK}');
process.exit(0);`;
}

/** The program inside a new build that can be asked: the AppImage itself, or the binary inside the .app. */
export function preflightBinary(fresh: string, platform: string = proc().platform): string | null {
  if (platform === 'linux') return fresh;
  if (platform === 'darwin') {
    const dir = path.join(fresh, 'Contents', 'MacOS');
    try {
      const n = fs.readdirSync(dir).find((f) => !f.startsWith('.'));
      return n ? path.join(dir, n) : null;
    } catch {
      return null;
    }
  }
  return null;
}

export interface PreflightResult {
  /** true: loads; false: a module said it cannot load; null: could not be asked. */
  ok: boolean | null;
  message?: string;
}

/** Ask the new build whether its native modules load here. */
export function preflight({ fresh, modules = PREFLIGHT_MODULES, platform = proc().platform, timeout = 60_000, bin = preflightBinary(fresh, platform) }: { fresh: string; modules?: string[]; platform?: string; timeout?: number; bin?: string | null }): Promise<PreflightResult> {
  return new Promise((resolve) => {
    if (!bin) return resolve({ ok: null, message: 'nothing to ask in this build' });
    if (platform === 'linux') {
      try {
        fs.chmodSync(bin, 0o755);
      } catch {
        /* the run says so */
      }
    }
    // the running app's own AppImage variables must not reach the new one
    const env: NodeJS.ProcessEnv = { ...proc().env, ELECTRON_RUN_AS_NODE: '1' };
    for (const k of ['APPIMAGE', 'APPDIR', 'OWD', 'ARGV0']) delete env[k];
    execFile(bin, ['-e', preflightSource(modules)], { env, timeout, maxBuffer: 1 << 20 }, (err, stdout) => {
      const out = String(stdout || '');
      const fail = out.split('\n').find((l) => l.startsWith(PRE_FAIL));
      if (fail) return resolve({ ok: false, message: fail.slice(PRE_FAIL.length).trim() });
      if (out.includes(PRE_OK)) return resolve({ ok: true });
      resolve({ ok: null, message: err ? String(err.message || err).split('\n')[0].slice(0, 300) : out.trim().slice(0, 300) || 'no answer' });
    });
  });
}

export interface InstallUpdateOptions {
  /** The downloaded installer: a .zip holding the .app (macOS) or an .AppImage (Linux). */
  file: string;
  version?: string;
  /** The bundle identifier to sign an UNSIGNED build with (macOS). */
  identifier?: string;
  /** codesign identity for an unsigned build; default ad hoc. */
  signId?: string;
  /** Where the replaced copy is kept (`<keepDir>/previous.noindex/`). Default `~/.pearkit/updates`. */
  keepDir?: string;
  /** The native modules to ask the new build about first; `[]` skips the question. */
  preflightModules?: string[];
}

/** The new build's native modules do not load here: it was not installed. `UpdateChannel` remembers the version. */
export class UnfitBuildError extends Error {
  unfit = true;
  detail: string;
  constructor(version: string | undefined, detail: string) {
    super(`Version ${version || 'offered'} does not load on this computer, so it was not installed and this version stays (${detail}).`);
    this.detail = detail;
  }
}

/**
 * Unpack (macOS), ask the new build whether it loads, and start the detached helper. Resolves once the helper
 * runs; the caller then quits the app (`app.quit()`), and the helper swaps and reopens it.
 */
export async function installUpdate({ file, version, identifier, signId, keepDir = defaultKeepDir(), preflightModules = PREFLIGHT_MODULES }: InstallUpdateOptions): Promise<{ dest: string; helper: string }> {
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
  const script = swapScript({ fresh, dest, work, sign: signId || '-', identifier, keep: p.platform === 'darwin' ? previousCopy(dest, keepDir) : null });
  if (!script) throw new Error(`in-app updates are not built for ${p.platform} yet; the file is at ${file}`);
  if (preflightModules.length) {
    const pre = await preflight({ fresh, modules: preflightModules });
    if (pre.ok === false) {
      fs.rmSync(work, { recursive: true, force: true });
      throw new UnfitBuildError(version, pre.message || 'a native module did not load');
    }
    if (pre.ok === null) console.log(`[updates] the new build could not be asked whether it loads (${pre.message}); installing as before`);
  }
  const helper = path.join(work, 'swap.sh');
  fs.writeFileSync(helper, script, { mode: 0o755 });
  const child = spawn('/bin/sh', [helper], { detached: true, stdio: 'ignore', env: { ...p.env, PEARKIT_UPDATE_TO: String(version || '') } });
  child.unref();
  return { dest, helper };
}
