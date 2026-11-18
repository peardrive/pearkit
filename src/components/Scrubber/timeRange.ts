/**
 * The rules of an in/out pair — the one place they are written.
 *
 * A range is `{ in, out }` in seconds inside `[min, max]`, never shorter than `minGap`. Every edge
 * drag in a pearkit app (a trim strip's pins, a scrubber's range, a timeline's clip edges) goes
 * through these functions, so a clip can never be dragged inside out or past its media.
 */
import { clamp } from '../../utils/format';

export interface TimeRange {
  /** Start of the chosen part, seconds. */
  in: number;
  /** End of the chosen part, seconds. */
  out: number;
}

export type TimeRangeEdge = 'in' | 'out';

export interface TimeRangeBounds {
  /** Earliest allowed `in`. Default 0. */
  min?: number;
  /** Latest allowed `out` — usually the media's duration. */
  max: number;
  /** The shortest a range may be, seconds. Default 0.1. */
  minGap?: number;
}

const resolve = (b: TimeRangeBounds) => {
  const min = Number.isFinite(b.min) ? (b.min as number) : 0;
  const max = Math.max(min, Number.isFinite(b.max) ? b.max : min);
  const minGap = Math.min(Math.max(0, b.minGap ?? 0.1), max - min);
  return { min, max, minGap };
};

/** The whole span: `{ in: min, out: max }`. */
export function wholeRange(bounds: TimeRangeBounds): TimeRange {
  const { min, max } = resolve(bounds);
  return { in: min, out: max };
}

/** Pull a range inside the bounds and open it to at least `minGap`, keeping `in` where it was when possible. */
export function clampRange(range: TimeRange, bounds: TimeRangeBounds): TimeRange {
  const { min, max, minGap } = resolve(bounds);
  let i = clamp(Number.isFinite(range.in) ? range.in : min, min, max - minGap);
  let o = clamp(Number.isFinite(range.out) ? range.out : max, min + minGap, max);
  if (o - i < minGap) {
    o = i + minGap;
    if (o > max) { o = max; i = max - minGap; }
  }
  return { in: i, out: o };
}

/** Move one edge to `t`; the other edge stays and the gap is kept. */
export function moveEdge(range: TimeRange, edge: TimeRangeEdge, t: number, bounds: TimeRangeBounds): TimeRange {
  const { min, max, minGap } = resolve(bounds);
  const r = clampRange(range, bounds);
  return edge === 'in'
    ? { in: clamp(t, min, r.out - minGap), out: r.out }
    : { in: r.in, out: clamp(t, r.in + minGap, max) };
}

/** Move one edge by `delta` seconds (negative moves it earlier). */
export function nudgeEdge(range: TimeRange, edge: TimeRangeEdge, delta: number, bounds: TimeRangeBounds): TimeRange {
  return moveEdge(range, edge, range[edge] + delta, bounds);
}

/** True when the range covers everything (within `epsilon`). */
export function isWholeRange(range: TimeRange | null | undefined, bounds: TimeRangeBounds, epsilon = 1e-3): boolean {
  if (!range) return true;
  const { min, max } = resolve(bounds);
  return range.in <= min + epsilon && range.out >= max - epsilon;
}

/** True when `t` lies inside the range. */
export function inRange(range: TimeRange, t: number): boolean {
  return t >= range.in && t <= range.out;
}
