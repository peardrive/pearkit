/**
 * The web recorder: MediaRecorder over the microphone, for browsers and
 * Electron. Uses a live stream the app already holds (a call, a capture) when
 * there is one, so the mic is never grabbed twice; otherwise opens its own and
 * releases it when the recording ends. One recording at a time.
 *
 * The reason a mic was refused is kept (`error`), because a note that silently
 * records no voice is the worst outcome (PearDrive, 2026-10-22: 2½ minutes of
 * talk, lost).
 *
 * React Native has no MediaRecorder: pass your own `DebugRecorder` (expo-av…)
 * to `createDebugNotes`, or get `createUnavailableRecorder()` and steps only.
 */
import type { DebugLog, DebugRecorder, MicrophoneInfo, RecorderStartOptions, RecordingResult } from './types';

export interface WebRecorderOptions {
  /** A live stream the app already holds; its audio tracks are cloned instead of opening the mic again. */
  shared?: () => MediaStream | null | undefined;
  /** The microphone to use (a deviceId from `mics()`); falls back to the default mic when it cannot be opened. */
  micId?: () => string | null | undefined;
  log?: DebugLog;
}

const describeError = (err: unknown) => {
  const e = err as { name?: string; message?: string } | undefined;
  return `${e?.name || 'Error'}: ${e?.message || String(err)}`;
};

/** How long a stop waits for MediaRecorder to hand over its last piece. */
const STOP_WAIT_MS = 4000;

const media = () => (globalThis as { navigator?: Navigator }).navigator?.mediaDevices;

/** Whether this platform can record a voice with `createWebRecorder()`. */
export function canRecordAudio(): boolean {
  return typeof MediaRecorder !== 'undefined' && !!media()?.getUserMedia;
}

export function createWebRecorder({ shared = () => null, micId = () => null, log = () => {} }: WebRecorderOptions = {}): DebugRecorder {
  let cur: { rec: MediaRecorder; chunks: Blob[]; stream: MediaStream; own: boolean; t0: number } | null = null;
  let error: string | null = null;
  let stopping: Promise<RecordingResult | null> | null = null;
  const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

  async function own(): Promise<MediaStream | null> {
    const md = media();
    if (!md?.getUserMedia) {
      error = 'no microphone API here (not a secure context, or not a browser)';
      log('warn', `No microphone: ${error}`);
      return null;
    }
    const id = micId();
    try {
      return await md.getUserMedia({ audio: id ? { deviceId: { exact: id } } : true });
    } catch (err) {
      if (id) {
        try {
          return await md.getUserMedia({ audio: true });
        } catch {
          /* fall through */
        }
      }
      error = describeError(err);
      log('warn', `No microphone: ${error}`);
      return null;
    }
  }

  function begin(stream: MediaStream, onChunk?: (data: Blob) => void) {
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => {
      if (!e.data?.size) return;
      chunks.push(e.data);
      try {
        onChunk?.(e.data);
      } catch {
        /* the listener never breaks the recording */
      }
    };
    rec.start(1000);
    return { rec, chunks };
  }

  async function start({ onChunk }: RecorderStartOptions = {}): Promise<boolean> {
    if (cur || stopping) return false;
    error = null;
    if (typeof MediaRecorder === 'undefined') {
      error = 'no MediaRecorder on this platform';
      log('warn', `No microphone: ${error}`);
      return false;
    }
    const live = (shared()?.getAudioTracks?.() || []).filter((t) => t.readyState === 'live');
    let stream: MediaStream | null = live.length ? new MediaStream(live.map((t) => t.clone())) : null;
    let isOwn = false;
    let got: { rec: MediaRecorder; chunks: Blob[] } | null = null;
    if (stream) {
      try {
        got = begin(stream, onChunk);
      } catch (err) {
        log('warn', `Shared mic would not record (${describeError(err)}); opening our own`);
        for (const t of stream.getTracks()) t.stop();
        stream = null;
      }
    }
    if (!stream) {
      stream = await own();
      if (!stream) return false;
      isOwn = true;
      try {
        got = begin(stream, onChunk);
      } catch (err) {
        for (const t of stream.getTracks()) t.stop();
        error = `MediaRecorder: ${describeError(err)}`;
        return false;
      }
    }
    const s = stream;
    for (const t of s.getTracks()) {
      t.addEventListener('ended', () => {
        if (cur?.stream === s) {
          error = 'the microphone track ended mid-note';
          log('warn', error);
        }
      });
    }
    cur = { rec: got!.rec, chunks: got!.chunks, stream: s, own: isOwn, t0: now() };
    return true;
  }

  // A second stop while the first is closing gets the same recording (it used to get null, which the trace read as
  // "no audio" and saved the note without its voice). And a MediaRecorder that never reports back cannot hold the
  // note hostage: after a few seconds the pieces already received are the recording.
  function stop(): Promise<RecordingResult | null> {
    if (stopping) return stopping;
    if (!cur) return Promise.resolve(null);
    const c = cur;
    stopping = (async () => {
      try {
        await new Promise<void>((resolve) => {
          if (c.rec.state === 'inactive') return resolve();
          const giveUp = setTimeout(() => {
            log('warn', 'The recorder did not confirm the stop; keeping what was recorded');
            resolve();
          }, STOP_WAIT_MS);
          c.rec.onstop = () => {
            clearTimeout(giveUp);
            resolve();
          };
          try {
            c.rec.stop();
          } catch {
            clearTimeout(giveUp);
            resolve();
          }
        });
        for (const t of c.stream.getTracks()) t.stop();
        const seconds = Math.round(now() - c.t0) / 1000;
        const type = c.rec.mimeType || 'audio/webm';
        return c.chunks.length ? { blob: new Blob(c.chunks, { type }), type, seconds } : null;
      } finally {
        cur = null;
        stopping = null;
      }
    })();
    return stopping;
  }

  async function mics(): Promise<MicrophoneInfo[]> {
    try {
      const list = await media()!.enumerateDevices();
      return list.filter((d) => d.kind === 'audioinput').map((d, i) => ({ id: d.deviceId, label: d.label || `Microphone ${i + 1}` }));
    } catch {
      return [];
    }
  }

  async function probe(): Promise<string | null> {
    const md = media();
    if (!md?.getUserMedia) return 'no microphone API here (not a secure context, or not a browser)';
    try {
      const s = await md.getUserMedia({ audio: true });
      for (const t of s.getTracks()) t.stop();
      return null;
    } catch (err) {
      return describeError(err);
    }
  }

  return {
    start,
    stop,
    mics,
    probe,
    get active() {
      return !!cur;
    },
    get stream() {
      return cur?.stream || null;
    },
    get type() {
      return cur ? cur.rec.mimeType || 'audio/webm' : null;
    },
    get error() {
      return error;
    },
  };
}

/** A recorder that never records: the note keeps the steps and says why there is no voice. */
export function createUnavailableRecorder(reason = 'no voice recorder on this platform'): DebugRecorder {
  return {
    start: async () => false,
    stop: async () => null,
    probe: async () => reason,
    active: false,
    stream: null,
    error: reason,
  };
}
