import { useCallback, useMemo, useRef, useState } from 'react';
import {
  clampRange,
  isWholeRange,
  moveEdge,
  nudgeEdge,
  wholeRange,
  type TimeRange,
  type TimeRangeBounds,
  type TimeRangeEdge,
} from './timeRange';

export interface UseTimeRangeOptions extends TimeRangeBounds {
  /**
   * The range changed. `done` is false for every move inside a drag and true once at its end (and
   * for a nudge or a reset), so the host can make one undo step per gesture.
   */
  onChange?: (range: TimeRange, done: boolean) => void;
}

export interface TimeRangeHandle {
  /** The range to draw: the live one while an edge is being dragged, otherwise the prop, clamped. */
  range: TimeRange;
  /** Which edge is being dragged, if any. */
  dragging: TimeRangeEdge | null;
  /** True when the range covers the whole span. */
  whole: boolean;
  /** Start dragging an edge. */
  begin: (edge: TimeRangeEdge) => void;
  /** Move the dragged edge to `t` (seconds). No-op outside a drag. */
  move: (t: number) => void;
  /** End the drag; fires `onChange(range, true)`. */
  end: () => void;
  /** Cancel the drag without a final change. */
  cancel: () => void;
  /** Move an edge by `delta` seconds in one step (a key press). */
  nudge: (edge: TimeRangeEdge, delta: number) => void;
  /** Replace the range in one step. */
  set: (range: TimeRange) => void;
  /** Reset to the whole span in one step. */
  reset: () => void;
}

/**
 * The in/out pair as a controlled value with a drag: the host owns `range` and gets `onChange`;
 * the hook holds the live value during a drag so the host only has to store the result.
 *
 * `range` may be null for "the whole thing".
 */
export function useTimeRange(range: TimeRange | null | undefined, options: UseTimeRangeOptions): TimeRangeHandle {
  const { onChange, min, max, minGap } = options;
  const bounds = useMemo<TimeRangeBounds>(() => ({ min, max, minGap }), [min, max, minGap]);
  const [live, setLive] = useState<TimeRange | null>(null);
  const [dragging, setDragging] = useState<TimeRangeEdge | null>(null);

  const current = useMemo(() => live ?? clampRange(range ?? wholeRange(bounds), bounds), [live, range, bounds]);

  // Refs so the callbacks are stable (a PanResponder keeps the first ones it is given).
  const state = useRef({ current, dragging, live, bounds, onChange });
  state.current = { current, dragging, live, bounds, onChange };

  const begin = useCallback((edge: TimeRangeEdge) => {
    const s = state.current;
    setDragging(edge);
    setLive(s.current);
    state.current = { ...s, dragging: edge, live: s.current };
  }, []);

  const move = useCallback((t: number) => {
    const s = state.current;
    if (!s.dragging) return;
    const next = moveEdge(s.live ?? s.current, s.dragging, t, s.bounds);
    state.current = { ...s, live: next };
    setLive(next);
    s.onChange?.(next, false);
  }, []);

  const end = useCallback(() => {
    const s = state.current;
    if (s.dragging) s.onChange?.(s.live ?? s.current, true);
    state.current = { ...s, dragging: null, live: null };
    setDragging(null);
    setLive(null);
  }, []);

  const cancel = useCallback(() => {
    state.current = { ...state.current, dragging: null, live: null };
    setDragging(null);
    setLive(null);
  }, []);

  const nudge = useCallback((edge: TimeRangeEdge, delta: number) => {
    const s = state.current;
    s.onChange?.(nudgeEdge(s.current, edge, delta, s.bounds), true);
  }, []);

  const set = useCallback((next: TimeRange) => {
    const s = state.current;
    s.onChange?.(clampRange(next, s.bounds), true);
  }, []);

  const reset = useCallback(() => {
    const s = state.current;
    s.onChange?.(wholeRange(s.bounds), true);
  }, []);

  return {
    range: current,
    dragging,
    whole: isWholeRange(current, bounds),
    begin,
    move,
    end,
    cancel,
    nudge,
    set,
    reset,
  };
}
