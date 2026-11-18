/**
 * pearkit debug notes — the one module every app plugs in.
 *
 *   const notes = createDebugNotes({
 *     app: 'peardrop',
 *     save: async ({ id, meta, steps, blob }) => { … store the three files … },  // the app's store (HTTP, IPC, fs…)
 *     where: () => ({ space, path }),            // what the app is showing — stamped on the note
 *     region: (el) => 'sidebar' | 'toolbar' | …, // optional, web: names for the areas of the screen
 *     describe: (el) => ({ text, data }),        // optional, web: what a clicked thing IS (a file, a message)
 *   });
 *   <DebugNotesButton notes={notes} />           // in a Toolbar, a title bar, a settings pane
 *   notes.trace.step('state', 'files 120 · peers 2');   // the app's own steps, any time
 *
 * The app gives: a save function, a place for the button, and stable names for the things a person can
 * click. The module gives: the recorder, the trace, every click/scroll/key written down (web), and the
 * button. Format of a saved note and the reader's side: docs/debug-notes.md.
 */
import { installCapture, type CaptureOptions, type DescribeFn, type RegionFn } from './capture';
import { canRecordAudio, createUnavailableRecorder, createWebRecorder } from './recorder';
import { createTrace } from './trace';
import type { DebugLog, DebugRecorder, DebugTrace, SaveNote, WhereFn } from './types';

export * from './types';
export { createTrace, noteId } from './trace';
export { createWebRecorder, createUnavailableRecorder, canRecordAudio } from './recorder';
export { installCapture, domPath } from './capture';
export type { CaptureOptions, DescribeFn, RegionFn } from './capture';

/** Where the chosen microphone id is remembered. Defaults to `localStorage` where there is one. */
export interface DebugNotesStorage {
  get(key: string): string | null | Promise<string | null>;
  set(key: string, value: string): void | Promise<void>;
  remove(key: string): void | Promise<void>;
}

export interface DebugNotesOptions {
  /** The app's short name (`peardrop`): on every note, and the key the mic choice is stored under. */
  app: string;
  /** Store a finished note: `note.<ext>`, `trace.jsonl`, `note.json`. */
  save: SaveNote;
  /** What the app is showing (space, path, view…). Stamped on the first step and on `note.json`. */
  where?: WhereFn;
  /** Web: the area of the screen an element is in. Default: nearest landmark or top-level id. */
  region?: RegionFn;
  /** Web: what a clicked thing IS, e.g. `{ text: 'file IMG_5238.MOV', data: { path } }`. */
  describe?: DescribeFn;
  /**
   * The voice recorder. Default: the MediaRecorder one on web / Electron; on React Native a recorder that
   * records nothing (steps only) until the app passes its own (expo-av…).
   */
  recorder?: DebugRecorder;
  /** Web: a live stream the app already holds, so the mic is never opened twice. */
  sharedStream?: () => MediaStream | null | undefined;
  /** Web: install the document-wide capture of clicks, scrolls, fields and keys. Default true. */
  capture?: boolean;
  storage?: DebugNotesStorage;
  log?: DebugLog;
}

export interface DebugNotes {
  readonly app: string;
  readonly trace: DebugTrace;
  readonly recorder: DebugRecorder;
  /** Remove the document listeners (web). The trace keeps working for explicit `step()` calls. */
  uninstall(): void;
  /** The chosen microphone (a deviceId), or null for the default. */
  readonly micId: string | null;
  pickMic(id: string | null): void;
}

function defaultStorage(): DebugNotesStorage | null {
  const ls = (globalThis as { localStorage?: Storage }).localStorage;
  if (!ls) return null;
  return {
    get: (k) => ls.getItem(k),
    set: (k, v) => ls.setItem(k, v),
    remove: (k) => ls.removeItem(k),
  };
}

export function createDebugNotes(opts: DebugNotesOptions): DebugNotes {
  const { app, save, where, region, describe, sharedStream, capture = true, log = () => {} } = opts;
  if (!app || typeof save !== 'function') throw new Error('createDebugNotes needs { app, save }');
  const storage = opts.storage ?? defaultStorage();
  const key = `pear-debug-mic:${app}`;
  let micId: string | null = null;
  try {
    const v = storage?.get(key);
    if (typeof v === 'string') micId = v || null;
    else if (v && typeof (v as Promise<string | null>).then === 'function') (v as Promise<string | null>).then((s) => { micId = s || null; }).catch(() => {});
  } catch {
    /* no storage: the default mic */
  }

  const recorder =
    opts.recorder ??
    (canRecordAudio()
      ? createWebRecorder({ shared: sharedStream, micId: () => micId, log })
      : createUnavailableRecorder('no voice recorder on this platform: pass `recorder` to createDebugNotes'));
  const trace = createTrace({ app, recorder, save, where, log });
  const captureOpts: CaptureOptions = { region, describe };
  const uninstall = capture ? installCapture(trace, captureOpts) : () => {};

  return {
    app,
    trace,
    recorder,
    uninstall,
    get micId() {
      return micId;
    },
    pickMic(id) {
      micId = id || null;
      try {
        if (id) void storage?.set(key, id);
        else void storage?.remove(key);
      } catch {
        /* fine */
      }
    },
  };
}
