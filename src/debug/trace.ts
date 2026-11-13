/**
 * The trace: a voice recording plus the steps taken in the app while it ran,
 * each stamped with its time into the recording. It knows nothing about the
 * app: it is handed a recorder, a `save` that stores the note wherever this app
 * keeps notes, and a `where()` that says what the app is showing.
 *
 * Runs on web, Electron and React Native (nothing here touches the DOM).
 * From pearcast's spikes/capture/src/trace.js and pear-ui/debug/trace.js.
 */
import type { DebugLog, DebugRecorder, DebugTrace, NoteMeta, SaveNote, Step, StepKind, TraceStepOptions, WhereFn } from './types';

export interface CreateTraceOptions {
  app: string;
  recorder: DebugRecorder;
  save: SaveNote;
  where?: WhereFn;
  log?: DebugLog;
}

interface OpenNote {
  id: string;
  t0: number;
  steps: Step[];
  audio: boolean;
}

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

export function createTrace({ app, recorder, save, where = () => ({}), log = () => {} }: CreateTraceOptions): DebugTrace {
  let note: OpenNote | null = null;
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
    if (note) return false;
    const id = noteId();
    const audio = await recorder.start();
    note = { id, t0: nowMs(), steps: [], audio };
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

  async function stop(extra: Record<string, unknown> = {}) {
    if (!note) return null;
    const n = note;
    const got = n.audio ? await recorder.stop() : null;
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
    const saved = await save({ id: n.id, meta, steps: n.steps, blob: got?.blob ?? null, ...(got?.uri ? { uri: got.uri } : {}), ...(got?.type ? { type: got.type } : {}) });
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
