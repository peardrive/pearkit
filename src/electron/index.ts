/**
 * pearkit/electron — wire <WindowControls/> to a frameless Electron window.
 *
 * Electron is injected rather than imported so this module never pulls
 * Electron into a React Native bundle.
 *
 *   // main.ts
 *   import { app, BrowserWindow, ipcMain } from 'electron';
 *   import { attachPearkitWindowBridge, pearkitWindowOptions } from 'pearkit/electron';
 *   attachPearkitWindowBridge({ ipcMain, BrowserWindow });
 *   const win = new BrowserWindow({ ...pearkitWindowOptions(), width: 1180, height: 760, webPreferences: { preload } });
 *
 *   // preload.ts
 *   import { contextBridge, ipcRenderer } from 'electron';
 *   import { exposePearkitWindowBridge } from 'pearkit/electron';
 *   exposePearkitWindowBridge({ contextBridge, ipcRenderer });
 */
import type { PearkitWindowState } from './types';

export * from './types';
export { installUpdate, installedAt, swapScript, type InstallUpdateOptions, type SwapScriptOptions } from './install';

/** `process.platform` when running under Node/Electron (no Node typings needed). */
function hostPlatform(): string | undefined {
  return (globalThis as { process?: { platform?: string } }).process?.platform;
}

export const CHANNEL_ACTION = 'pearkit:window';
export const CHANNEL_STATE = 'pearkit:window-state';

type Action = 'close' | 'minimize' | 'zoom' | 'sync';

/* Minimal structural types so we don't depend on electron's typings. */
interface IpcRendererLike {
  send(channel: string, ...args: unknown[]): void;
  on(channel: string, listener: (event: unknown, ...args: any[]) => void): unknown;
  removeListener(channel: string, listener: (...args: any[]) => void): unknown;
}
interface ContextBridgeLike {
  exposeInMainWorld(key: string, api: unknown): void;
}
interface WindowLike {
  close(): void;
  minimize(): void;
  maximize(): void;
  unmaximize(): void;
  isMaximized(): boolean;
  isFullScreen(): boolean;
  setFullScreen(flag: boolean): void;
  isFocused(): boolean;
  isDestroyed(): boolean;
  on(event: string, listener: () => void): unknown;
  webContents: { send(channel: string, ...args: unknown[]): void };
}
interface IpcMainLike {
  on(channel: string, listener: (event: { sender: unknown }, ...args: any[]) => void): unknown;
}
interface BrowserWindowStaticLike {
  fromWebContents(webContents: any): WindowLike | null;
}

/** Recommended `BrowserWindow` options for a pearkit frameless window. */
export function pearkitWindowOptions(opts: { platform?: string } = {}) {
  const platform = opts.platform ?? hostPlatform() ?? 'darwin';
  return platform === 'darwin'
    ? // Hide the native traffic lights — <WindowControls/> draws them inside the sidebar.
      { frame: false, titleBarStyle: 'hidden' as const, trafficLightPosition: { x: -100, y: -100 }, backgroundColor: '#09080d' }
    : { frame: false, backgroundColor: '#09080d' };
}

/** Main process: handle window actions and broadcast state changes. */
export function attachPearkitWindowBridge({
  ipcMain,
  BrowserWindow,
  zoomAction = 'fullscreen',
}: {
  ipcMain: IpcMainLike;
  BrowserWindow: BrowserWindowStaticLike;
  /** What the green button does. macOS default is full screen. */
  zoomAction?: 'fullscreen' | 'maximize';
}) {
  const watched = new WeakSet<WindowLike>();
  const stateOf = (w: WindowLike): PearkitWindowState => ({ focused: w.isFocused(), maximized: w.isMaximized(), fullscreen: w.isFullScreen() });
  const push = (w: WindowLike) => { if (!w.isDestroyed()) w.webContents.send(CHANNEL_STATE, stateOf(w)); };

  ipcMain.on(CHANNEL_ACTION, (event, action: Action) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    if (!watched.has(win)) {
      watched.add(win);
      for (const e of ['focus', 'blur', 'maximize', 'unmaximize', 'enter-full-screen', 'leave-full-screen']) win.on(e, () => push(win));
    }
    switch (action) {
      case 'close': win.close(); break;
      case 'minimize': win.minimize(); break;
      case 'zoom':
        if (zoomAction === 'fullscreen') win.setFullScreen(!win.isFullScreen());
        else if (win.isMaximized()) win.unmaximize();
        else win.maximize();
        break;
      case 'sync': push(win); break;
    }
  });
}

/** Preload: expose `window.pearkit.window` to the renderer (context-isolation safe). */
export function exposePearkitWindowBridge({
  contextBridge,
  ipcRenderer,
  platform = hostPlatform(),
}: {
  contextBridge: ContextBridgeLike;
  ipcRenderer: IpcRendererLike;
  platform?: string;
}) {
  contextBridge.exposeInMainWorld('pearkit', {
    window: {
      platform,
      close: () => ipcRenderer.send(CHANNEL_ACTION, 'close'),
      minimize: () => ipcRenderer.send(CHANNEL_ACTION, 'minimize'),
      zoom: () => ipcRenderer.send(CHANNEL_ACTION, 'zoom'),
      onStateChange: (listener: (s: PearkitWindowState) => void) => {
        const handler = (_e: unknown, s: PearkitWindowState) => listener(s);
        ipcRenderer.on(CHANNEL_STATE, handler);
        ipcRenderer.send(CHANNEL_ACTION, 'sync');
        return () => { ipcRenderer.removeListener(CHANNEL_STATE, handler); };
      },
    },
  });
}
