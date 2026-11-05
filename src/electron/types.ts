/** Window state pushed from the Electron main process to the renderer. */
export interface PearkitWindowState {
  focused: boolean;
  maximized: boolean;
  fullscreen: boolean;
}

/**
 * The bridge exposed on `window.pearkit.window` by `exposePearkitWindowBridge()`
 * (see `pearkit/electron`). `<WindowControls/>` uses it automatically when present.
 */
export interface PearkitWindowBridge {
  close(): void;
  minimize(): void;
  /** Green button: full screen or maximise, depending on the main-process option. */
  zoom(): void;
  /** Subscribe to focus / maximise / full-screen changes. Returns an unsubscribe fn. */
  onStateChange?(listener: (state: PearkitWindowState) => void): () => void;
  /** `process.platform` of the host, so the UI can hide mac controls on Windows/Linux. */
  platform?: string;
}

export interface PearkitGlobal {
  window?: PearkitWindowBridge;
}

/** Read the bridge from the global object (no-op outside Electron). */
export function getWindowBridge(): PearkitWindowBridge | undefined {
  const g = globalThis as unknown as { pearkit?: PearkitGlobal };
  return g.pearkit?.window;
}
