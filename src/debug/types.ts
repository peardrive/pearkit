/**
 * pearkit debug notes — the shapes a note is made of.
 *
 * A debug note is a voice recording plus every step the person took in the app
 * while it ran, each stamped with its time into the recording. The app stores
 * three files per note (`note.<audio>`, `trace.jsonl`, `note.json`) and shares
 * them however it shares things (a pearcore space, a room); a helper on another
 * machine then works through the note step by step. See docs/debug-notes.md.
 */

/** What kind of thing a step records. Apps may add their own kinds. */
export type StepKind =
  | 'ui' // the state of the app when the note started
  | 'click'
  | 'tap'
  | 'right-click'
  | 'dblclick'
  | 'scrollbar'
  | 'scroll'
  | 'focus'
  | 'key'
  | 'log' // one of the app's own log lines
  | 'state' // the app's state, summarised
  | 'error'
  | (string & {});

/** One line of the trace. `t` is seconds into the recording. */
export interface Step {
  t: number;
  kind: StepKind;
  text: string;
  data?: unknown;
  /** Set when the same step kept happening: the time of the last repeat. */
  until?: number;
  /** How many times it happened within the window. */
  times?: number;
  /** A run of one group (scrolling, scrubbing) folds into one step, "from → to". */
  group?: string;
  from?: string;
}

/** `note.json`: what the recording is, and where the app was. */
export interface NoteMeta {
  startedAt: string;
  seconds: number;
  steps: number;
  app: string;
  userAgent?: string;
  window?: string;
  /** Present when the voice was NOT recorded, with the reason (a refusal, no mic API, …). */
  noAudio?: string;
  [key: string]: unknown;
}

/** What `save` receives when a note stops. */
export interface SaveNoteInput {
  id: string;
  meta: NoteMeta;
  steps: Step[];
  /** The recording, or null when there is none (`meta.noAudio` says why). */
  blob: Blob | null;
  /** A file the platform recorder wrote instead of a Blob (native recorders). */
  uri?: string;
  /** The recording's MIME type, when known. */
  type?: string;
  /**
   * True when every piece of the recording reached the `sink` while it ran: the audio is already stored, and
   * `save` only has to finish the note. `blob` is still handed over, for a store that wants to check or keep it.
   */
  streamed?: boolean;
}

/**
 * Where a note goes WHILE it records, so the recording never lives only in memory (pearkit-studio, 2026-11-16: a
 * 36-minute note was one stuck button away from lost). The app writes each piece to disk as it arrives. If any call
 * fails the trace stops using the sink and `save` gets the whole recording as before (`streamed: false`).
 */
export interface NoteSink {
  /** A note started. `type` is the recording's MIME type, or null when there is no voice. */
  begin(note: { id: string; type: string | null; meta: Record<string, unknown> }): Promise<unknown> | unknown;
  /** The next piece of the recording, in order (about one a second). */
  chunk?(id: string, data: Blob): Promise<unknown> | unknown;
  /** The steps so far: the whole list each time, since a repeated step updates the one before it. */
  steps?(id: string, steps: Step[]): Promise<unknown> | unknown;
}

export interface RecorderStartOptions {
  /** Called with each piece of the recording as it is produced, in order. */
  onChunk?: (data: Blob) => void;
}

/** The app's store: write the three files wherever this app keeps notes. Whatever it returns is handed back from `trace.stop()`. */
export type SaveNote = (note: SaveNoteInput) => Promise<unknown> | unknown;

export interface RecordingResult {
  blob?: Blob | null;
  uri?: string;
  type: string;
  seconds: number;
}

export interface MicrophoneInfo {
  id: string;
  label: string;
}

/**
 * A voice recorder the trace can drive. `createWebRecorder()` is the browser /
 * Electron one (MediaRecorder); a React Native app passes its own, built on
 * expo-av or the like, with the same four members.
 */
export interface DebugRecorder {
  /** → true when the voice is being recorded; false (with `error` set) when it is not. */
  start(opts?: RecorderStartOptions): Promise<boolean>;
  /** → the recording, or null when nothing was captured. Asked twice, it answers both with the same recording. */
  stop(): Promise<RecordingResult | null>;
  /** The MIME type of the running recording, when known. */
  readonly type?: string | null;
  /** The microphones available (labels appear once the mic was allowed). */
  mics?(): Promise<MicrophoneInfo[]>;
  /** Ask for the mic once and let go, so a refusal is known BEFORE a note starts. → null, or the refusal. */
  probe?(): Promise<string | null>;
  readonly active: boolean;
  /** The live stream while recording (web), for a level meter. */
  readonly stream: MediaStream | null;
  /** Why the last start recorded nothing. */
  readonly error: string | null;
}

export type DebugLog = (level: 'info' | 'warn' | 'error', message: string) => void;

/** What the app is showing, stamped on the first step and on `note.json`. */
export type WhereFn = () => Record<string, unknown>;

export interface TraceStepOptions {
  /** Steps of one group within 2 s fold into one: "from → to". */
  group?: string | null;
}

export interface StoppedNote {
  id: string;
  seconds: number;
  /** Whether a voice recording was saved with the note. */
  recorded: boolean;
  [key: string]: unknown;
}

export interface DebugTrace {
  /** Start a note: opens the recorder, stamps the first step. → false when a note was already running. */
  start(): Promise<boolean>;
  /**
   * Stop and save. `extra` is merged into `note.json`. → what `save` returned plus id/seconds/recorded, or null when
   * no note was running. Safe to call again while a stop is under way: every caller gets the same answer.
   */
  stop(extra?: Record<string, unknown>): Promise<StoppedNote | null>;
  /** Write a step on the note's clock. Ignored when no note is running. */
  step(kind: StepKind, text: string, data?: unknown, opts?: TraceStepOptions): void;
  readonly active: boolean;
  /** A stop is under way (the recording is closing, or being saved). */
  readonly stopping: boolean;
  /** Whether the running note is recording a voice. */
  readonly audio: boolean;
  readonly seconds: number;
  readonly steps: number;
  /** Called on every change (start, stop, each step). → unsubscribe. */
  onChange(fn: () => void): () => void;
}
