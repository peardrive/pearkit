/**
 * The trace: a voice recording plus the steps taken in the app while it ran,
 * each stamped with its time into the recording. It knows nothing about the
 * app: it is handed a recorder, a `save` that stores the note wherever this app
 * keeps notes, and a `where()` that says what the app is showing.
 *
 * Runs on web, Electron and React Native (nothing here touches the DOM).
 * From pearcast's spikes/capture/src/trace.js and pear-ui/debug/trace.js.
 */
import type { DebugLog, DebugRecorder, DebugTrace, NoteMeta, NoteSink, SaveNote, Step, StepKind, StoppedNote, TraceStepOptions, WhereFn } from './types';

export interface CreateTraceOptions {
  app: string;
  recorder: DebugRecorder;
  save: SaveNote;
  /** Where the note is written while it records. Without one the recording is held in memory until `save`. */
  sink?: NoteSink;
  where?: WhereFn;
  log?: DebugLog;
}

interface OpenNote {
  id: string;
  t0: number;
  steps: Step[];
  audio: boolean;
}

/** How often the steps so far go to the sink. */
const STEPS_EVERY_MS = 5000;
/** How long a stop waits for the sink to take the last pieces before saving the whole recording instead. */
const SINK_WAIT_MS = 8000;

const nowMs = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());

/** `1280×800` on web / Electron; undefined where there is no window. */
function viewport(): string | undefined {
  const g = globalThis as { innerWidth?: number; innerHeight?: number };
  return typeof g.innerWidth === 'number' && typeof g.innerHeight === 'number' ? `${g.innerWidth}×${g.innerHeight}` : undefined;
}

function userAgent(): string | undefined {
  return (globalThis as { navigator?: { userAgent?: string } }).navigator?.userAgent;
}

/** The note id: the start time, safe as a folder name (`2026-11-08T03-12-45`). */
export function noteId(date = new Date()): string {
  return date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

export function createTrace({ app, recorder, save, sink, where = () => ({}), log = () => {} }: CreateTraceOptions): DebugTrace {
  let note: OpenNote | null = null;
  let starting = false;
  let stopping: Promise<StoppedNote | null> | null = null;

  // The sink: one call at a time, in order. The first failure turns it off for this note, and `save` then gets
  // the whole recording as it always did.
  let sinkOk = false;
  let sinkQueue: Promise<void> = Promise.resolve();
  let stepsTimer: ReturnType<typeof setInterval> | null = null;
  let stepsSent = '';
  const toSink = (what: string, fn: () => unknown) => {
    sinkQueue = sinkQueue.then(async () => {
      if (!sinkOk) return;
      try {
        await fn();
      } catch (err) {
        sinkOk = false;
        log('warn', `Debug note: writing as it records stopped (${what}: ${(err as Error)?.message || String(err)}); the note is saved whole when it stops`);
      }
    });
  };
  const sendSteps = (n: OpenNote) => {
    if (!sink?.steps || !sinkOk) return;
    const last = n.steps[n.steps.length - 1];
    const mark = `${n.steps.length}:${last?.until ?? last?.t ?? 0}:${last?.text ?? ''}`;
    if (mark === stepsSent) return;
    stepsSent = mark;
    const copy = n.steps.map((s) => ({ ...s }));
    toSink('steps', () => sink.steps!(n.id, copy));
  };
  const listeners = new Set<() => void>();
  const emit = () => {
    for (const fn of listeners) {
      try {
        fn();
      } catch {
        /* a listener never breaks the note */
      }
    }
  };
  const now = () => (note ? Math.round(nowMs() - note.t0) / 1000 : 0);

  // One step per thing: the same text again within 2 s is the same thing still happening (counted on the kept
  // step); a run of one `group` (scrolling, scrubbing) becomes "from → to".
  function step(kind: StepKind, text: string, data?: unknown, { group = null }: TraceStepOptions = {}): void {
    if (!note) return;
    const t = now();
    const last = note.steps[note.steps.length - 1];
    if (last && last.text === text && t - (last.until ?? last.t) < 2) {
      last.until = t;
      last.times = (last.times || 1) + 1;
      return emit();
    }
    if (group && last?.group === group && t - (last.until ?? last.t) < 2) {
      last.until = t;
      last.times = (last.times || 1) + 1;
      last.text = `${last.from} → ${text}`;
      if (data !== undefined) last.data = data;
      return emit();
    }
    const s: Step = { t, kind, text };
    if (group) {
      s.group = group;
      s.from = text;
    }
    if (data !== undefined) s.data = data;
    note.steps.push(s);
    emit();
  }

  async function start(): Promise<boolean> {
    if (note || starting || stopping) return false;
    starting = true;
    try {
      return await begin();
    } finally {
      starting = false;
    }
  }

  async function begin(): Promise<boolean> {
    const id = noteId();
    sinkOk = !!sink;
    sinkQueue = Promise.resolve();
    stepsSent = '';
    // Pieces that arrive before the sink has opened the note wait in the queue behind `begin`.
    const early: Blob[] = [];
    let opened = false;
    const onChunk = (data: Blob) => {
      if (!sink?.chunk || !sinkOk) return;
      if (!opened) early.push(data);
      else toSink('chunk', () => sink.chunk!(id, data));
    };
    const audio = await recorder.start(sink?.chunk ? { onChunk } : undefined);
    const n: OpenNote = { id, t0: nowMs(), steps: [], audio };
    note = n;
    if (sink) {
      const vp0 = viewport();
      const ua0 = userAgent();
      const meta = { startedAt: new Date().toISOString(), app, ...(ua0 ? { userAgent: ua0 } : {}), ...(vp0 ? { window: vp0 } : {}), ...where(), ...(audio ? {} : { noAudio: recorder.error || 'no audio captured' }) };
      toSink('begin', () => sink.begin({ id, type: audio ? recorder.type || 'audio/webm' : null, meta }));
      opened = true;
      for (const data of early) toSink('chunk', () => sink.chunk!(id, data));
      stepsTimer = setInterval(() => {
        if (note === n) sendSteps(n);
      }, STEPS_EVERY_MS);
    }
    const w = where();
    const place = Object.entries(w)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k} ${String(v)}`)
      .join('; ');
    const vp = viewport();
    step('ui', `note started — ${place}${vp ? `; window ${vp}` : ''}${audio ? '' : `; NO AUDIO (${recorder.error})`}`);
    log('info', `Debug note started${audio ? '' : ' (no audio)'}`);
    return true;
  }

  // One stop at a time. A second press while the first is closing waits for the same result: it can never stop
  // the recorder a second time (which used to answer "no audio") or leave the note without an ending.
  function stop(extra: Record<string, unknown> = {}): Promise<StoppedNote | null> {
    if (stopping) return stopping;
    if (!note) return Promise.resolve(null);
    const n = note;
    stopping = finish(n, extra).finally(() => {
      stopping = null;
      emit();
    });
    emit();
    return stopping;
  }

  async function finish(n: OpenNote, extra: Record<string, unknown>): Promise<StoppedNote> {
    if (stepsTimer) clearInterval(stepsTimer);
    stepsTimer = null;
    let got: Awaited<ReturnType<DebugRecorder['stop']>> = null;
    try {
      got = n.audio ? await recorder.stop() : null;
    } catch (err) {
      log('error', `Debug note: the recorder failed to stop (${(err as Error)?.message || String(err)})`);
    }
    // The last pieces reach the sink before the note is saved; a sink that hangs is given up on.
    let streamed = false;
    if (sink) {
      const settled = await Promise.race([sinkQueue.then(() => true), new Promise<boolean>((r) => setTimeout(() => r(false), SINK_WAIT_MS))]);
      streamed = settled && sinkOk;
      sinkOk = false;
    }
    note = null;
    emit();
    const seconds = Math.round(nowMs() - n.t0) / 1000;
    const ua = userAgent();
    const vp = viewport();
    const meta: NoteMeta = {
      startedAt: new Date(Date.now() - seconds * 1000).toISOString(),
      seconds,
      steps: n.steps.length,
      app,
      ...(ua ? { userAgent: ua } : {}),
      ...(vp ? { window: vp } : {}),
      ...where(),
      ...extra,
      ...(got ? {} : { noAudio: recorder.error || 'no audio captured' }),
    };
    const saved = await save({ id: n.id, meta, steps: n.steps, blob: got?.blob ?? null, ...(got?.uri ? { uri: got.uri } : {}), ...(got?.type ? { type: got.type } : {}), ...(sink ? { streamed } : {}) });
    log('info', `Debug note saved: ${n.steps.length} step(s), ${seconds} s${got ? '' : ', no audio'}`);
    const base = saved && typeof saved === 'object' ? (saved as Record<string, unknown>) : {};
    return { ...base, id: n.id, seconds, recorded: !!got };
  }

  return {
    start,
    stop,
    step,
    get active() {
      return !!note;
    },
    get stopping() {
      return !!stopping;
    },
    get audio() {
      return !!note?.audio;
    },
    get seconds() {
      return now();
    },
    get steps() {
      return note?.steps.length || 0;
    },
    onChange(fn) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
  };
}
