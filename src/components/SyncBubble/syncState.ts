import type { StatusTone } from '../../theme/tones';

/**
 * Where a thing saved on this device stands with the device that is meant to receive it (a debug note and the
 * Mac that pulls it, a memo and the desktop, …). Six words every app uses the same way.
 */
export type SyncState = 'saving' | 'waiting' | 'sending' | 'synced' | 'offline' | 'failed';

export interface SyncStateMeta {
  label: string;
  tone: StatusTone;
  /** The dot breathes: something is under way. */
  pulse: boolean;
  /** The dot glows: it is done. */
  glow: boolean;
}

export const syncStateMeta: Record<SyncState, SyncStateMeta> = {
  saving: { label: 'Saving…', tone: 'info', pulse: true, glow: false },
  waiting: { label: 'Waiting for the other device', tone: 'warning', pulse: true, glow: false },
  sending: { label: 'Sending…', tone: 'info', pulse: true, glow: false },
  synced: { label: 'Synced', tone: 'success', pulse: false, glow: true },
  offline: { label: 'Saved here only', tone: 'neutral', pulse: false, glow: false },
  failed: { label: 'Failed', tone: 'danger', pulse: false, glow: false },
};

/** `"2 of 3 files"`; `"3 files"` when all are there; `"1 file"` for one. */
export function syncProgressLabel(done: number, total: number, unit = 'file'): string {
  const units = (n: number) => `${n} ${unit}${n === 1 ? '' : 's'}`;
  if (total <= 0) return '';
  if (done >= total) return units(total);
  return `${Math.max(0, done)} of ${units(total)}`;
}

/**
 * How long a bubble stays once its state is settled: a success leaves quickly, a failure stays long enough to be
 * read, and a wait gives up after two minutes (the state is still shown wherever the item is listed). `null`: keep it.
 */
export function syncBubbleLinger(state: SyncState): number | null {
  switch (state) {
    case 'synced':
      return 4000;
    case 'failed':
    case 'offline':
      return 8000;
    case 'waiting':
      return 120_000;
    default:
      return null;
  }
}
