import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  Platform,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { cn } from '../../utils/cn';
import { clamp } from '../../utils/format';
import { useTheme } from '../../theme/ThemeProvider';
import { ClipFrame, InOutPin, Playhead } from './Glyphs';
import { PIN, PIN_PAD } from './timeGlyphs';
import { useTimeRange } from './useTimeRange';
import type { TimeRange, TimeRangeEdge } from './timeRange';

export type ScrubberSize = 'sm' | 'md' | 'lg';

/** `sm` is the bar under a player: thin, so the play button beside it is its centre. */
const SIZES: Record<ScrubberSize, number> = { sm: 10, md: 14, lg: 26 };

/** How the chosen part is drawn: the clip frame (a timeline's selected clip) or the older in/out pins. */
export type ScrubberLook = 'clip' | 'pins';

/** How close (px) to an end of the chosen part a press counts as grabbing it. */
const GRAB = 8;

export interface ScrubberProps {
  /** Length of the media, seconds. */
  duration: number;
  /** Where the playhead is, seconds. `null` / undefined hides it. */
  time?: number | null;
  /** The chosen part. Shown as a lit span (or, with `dimOutside`, as the only undimmed part) with a pin at each end. */
  range?: TimeRange | null;
  /** The bar was pressed or dragged: `done` is true on release. Without it the bar does not scrub. */
  onSeek?: (time: number, done: boolean) => void;
  /** A pin was dragged: `done` is true once on release (one undo step). Without it the pins only show. */
  onRange?: (range: TimeRange, done: boolean) => void;
  /** The shortest allowed range, seconds. Default 0.1. */
  minGap?: number;
  /** Seconds one arrow key moves the head (shift: ×10). Default 0.05. */
  step?: number;
  /** Bar height: `sm` 10px, `md` 14px, `lg` 26px. Default `sm`. */
  size?: ScrubberSize;
  /**
   * How the chosen part is drawn. `clip` (default): outlined as a timeline outlines a selected clip — a 2px rounded
   * frame in the selection colour with a short bar inside each end; its ends are the trim handles, nothing hangs
   * below the bar. `pins`: a line with a ball under the strip at each end (the ball is what you grab).
   */
  look?: ScrubberLook;
  /** A raised track: a light edge along the top, a shadow along the bottom. Default: when there is no content inside. */
  emboss?: boolean;
  /** Exact bar height in px; wins over `size`. */
  height?: number;
  /** Draw the chosen part's glyphs (frame or pins). Default: when `range` is given. */
  pins?: boolean;
  /** Dim everything outside `range` instead of lighting the range (the trim strip's look). */
  dimOutside?: boolean;
  /** `pins` look only: a thin light edge around the chosen part. The `clip` look is always framed. */
  frame?: boolean;
  /** Classes for the bar itself, e.g. a darker track behind a filmstrip. */
  trackClassName?: string;
  /** Content under the overlays — a `Waveform`, a `Filmstrip` — laid out absolutely inside the bar. */
  children?: React.ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The time bar: a track with the playhead, scrubbed by pressing or dragging, and when a range is
 * given the chosen part framed the way a timeline frames a selected clip — drag either end to trim.
 *
 * The same bar sits under a video, in an export dialog and, with a waveform or frames inside it, as
 * the trim strip (`TrimStrip`), and the frame is the one a canvas timeline paints (`paintClipFrame`):
 * one trim look wherever a clip is chosen or stretched. Keyboard on the web: ← → move the head,
 * `I` / `O` set the in / out at the head, Home / End jump.
 */
export function Scrubber({
  duration,
  time,
  range,
  onSeek,
  onRange,
  minGap = 0.1,
  step = 0.05,
  size = 'sm',
  height,
  pins,
  look = 'clip',
  emboss,
  dimOutside = false,
  frame = false,
  trackClassName,
  children,
  disabled = false,
  accessibilityLabel = 'Time',
  className,
  style,
}: ScrubberProps) {
  const theme = useTheme();
  const h = height ?? SIZES[size];
  const [width, setWidth] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [hoverPin, setHoverPin] = useState<TimeRangeEdge | null>(null);
  const dur = Math.max(0, Number.isFinite(duration) ? duration : 0);
  const tr = useTimeRange(range, { min: 0, max: dur, minGap, onChange: onRange });
  const showPins = (pins ?? !!range) && !!range;
  const clip = look === 'clip';
  const raised = emboss ?? !children;
  const canTrim = showPins && !!onRange && !disabled;
  const canSeek = !!onSeek && !disabled;

  const xOf = (t: number) => (dur > 0 ? (clamp(t, 0, dur) / dur) * width : 0);
  const tOf = (x: number) => (width > 0 ? clamp((x / width) * dur, 0, dur) : 0);

  // The responder is created once; a ref keeps it reading the latest values.
  const live = useRef({ width, dur, tr, onSeek, canSeek, canTrim, xOf, tOf });
  live.current = { width, dur, tr, onSeek, canSeek, canTrim, xOf, tOf };
  const drag = useRef<{ kind: 'pin'; edge: TimeRangeEdge; x0: number } | { kind: 'scrub'; x0: number } | null>(null);

  const pinAt = (x: number): TimeRangeEdge | null => {
    const s = live.current;
    if (!s.canTrim) return null;
    const di = Math.abs(x - s.xOf(s.tr.range.in)), dOut = Math.abs(x - s.xOf(s.tr.range.out));
    if (Math.min(di, dOut) > GRAB) return null;
    if (di === dOut) return x < s.xOf(s.tr.range.in) ? 'in' : 'out';
    return di < dOut ? 'in' : 'out';
  };

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => live.current.canSeek || live.current.canTrim,
        onMoveShouldSetPanResponder: () => live.current.canSeek || live.current.canTrim,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (e: GestureResponderEvent) => {
          const s = live.current, x = e.nativeEvent.locationX;
          const edge = pinAt(x);
          if (edge) {
            drag.current = { kind: 'pin', edge, x0: x };
            s.tr.begin(edge);
          } else if (s.canSeek) {
            drag.current = { kind: 'scrub', x0: x };
            setScrubbing(true);
            s.onSeek?.(s.tOf(x), false);
          } else drag.current = null;
        },
        onPanResponderMove: (_e, g) => {
          const d = drag.current, s = live.current;
          if (!d) return;
          const x = d.x0 + g.dx;
          if (d.kind === 'pin') s.tr.move(s.tOf(x));
          else s.onSeek?.(s.tOf(x), false);
        },
        onPanResponderRelease: (_e, g) => {
          const d = drag.current, s = live.current;
          drag.current = null;
          if (!d) return;
          const x = d.x0 + g.dx;
          if (d.kind === 'pin') { s.tr.move(s.tOf(x)); s.tr.end(); }
          else { setScrubbing(false); s.onSeek?.(s.tOf(x), true); }
        },
        onPanResponderTerminate: () => {
          const d = drag.current, s = live.current;
          drag.current = null;
          if (!d) return;
          if (d.kind === 'pin') s.tr.end();
          else setScrubbing(false);
        },
      }),
    [],
  );

  // Keyboard on the web: react-native-web doesn't forward onKeyDown on View, so listen on the node.
  const ref = useRef<React.ComponentRef<typeof View>>(null);
  const keys = useRef({ time, dur, step, tr, onSeek, canSeek, canTrim });
  keys.current = { time, dur, step, tr, onSeek, canSeek, canTrim };
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = ref.current as unknown as HTMLElement | null;
    if (!node?.addEventListener) return;
    const listener = (e: KeyboardEvent) => {
      const k = keys.current, t = k.time ?? 0, s = k.step * (e.shiftKey ? 10 : 1);
      const seek = (to: number) => { if (k.canSeek) { e.preventDefault(); k.onSeek?.(clamp(to, 0, k.dur), true); } };
      if (e.key === 'ArrowLeft') seek(t - s);
      else if (e.key === 'ArrowRight') seek(t + s);
      else if (e.key === 'Home') seek(0);
      else if (e.key === 'End') seek(k.dur);
      else if ((e.key === 'i' || e.key === 'I') && k.canTrim && k.time != null) { e.preventDefault(); k.tr.set({ in: t, out: k.tr.range.out }); }
      else if ((e.key === 'o' || e.key === 'O') && k.canTrim && k.time != null) { e.preventDefault(); k.tr.set({ in: k.tr.range.in, out: t }); }
    };
    node.addEventListener('keydown', listener);
    return () => node.removeEventListener('keydown', listener);
  }, []);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  const onMouseMove = (e: { nativeEvent?: { offsetX?: number }; clientX?: number; currentTarget?: unknown }) => {
    if (drag.current) return;
    const x = e.nativeEvent?.offsetX ?? 0;
    setHoverPin(pinAt(x));
  };

  const r = tr.range;
  const xIn = xOf(r.in), xOut = xOf(r.out);
  const litEdge = tr.dragging ?? hoverPin;
  const cursor =
    Platform.OS === 'web' && !disabled
      ? litEdge ? 'cursor-ew-resize' : canSeek ? 'cursor-pointer' : null
      : null;

  return (
    <View
      ref={ref}
      {...pan.panHandlers}
      accessible
      focusable={!disabled}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: Math.round(dur), now: Math.round(time ?? 0) }}
      accessibilityState={{ disabled }}
      onLayout={onLayout}
      {...(Platform.OS === 'web' ? ({ onMouseMove, onMouseLeave: () => setHoverPin(null) } as object) : null)}
      className={cn('relative w-full select-none', cursor, disabled && 'opacity-50', className)}
      style={[{ height: h + (showPins && !clip ? PIN_PAD : 0) }, style]}
    >
      <View
        pointerEvents="none"
        className={cn('absolute left-0 right-0 top-0 overflow-hidden', !children && (raised ? 'bg-inset/[0.55]' : 'bg-overlay/[0.06]'), trackClassName)}
        style={{ height: h, borderRadius: Math.min(6, h / 2) }}
      >
        {children}
        {raised ? (
          <>
            <View className="absolute left-0 right-0 top-0 bg-overlay/[0.1]" style={{ height: 1 }} />
            <View className="absolute left-0 right-0 bottom-0 bg-black/[0.35]" style={{ height: 1 }} />
          </>
        ) : null}
        {range && dimOutside ? (
          <>
            <View className="absolute top-0 bottom-0 left-0 bg-inset/[0.6]" style={{ width: xIn }} />
            <View className="absolute top-0 bottom-0 right-0 bg-inset/[0.6]" style={{ width: Math.max(0, width - xOut) }} />
          </>
        ) : range ? (
          <View className={cn('absolute top-0 bottom-0', clip ? 'bg-overlay/[0.08]' : 'bg-overlay/[0.14]')} style={{ left: xIn, width: Math.max(0, xOut - xIn) }} />
        ) : null}
        {range && frame && !clip ? (
          <View
            className="absolute top-0 bottom-0 border-overlay/[0.92]"
            style={{ left: xIn, width: Math.max(2, xOut - xIn), borderWidth: PIN.lineWidth, borderRadius: 4 }}
          />
        ) : null}
        {scrubbing && canSeek && time != null ? (
          <View className="absolute top-0 bottom-0 bg-overlay/[0.06]" style={{ left: 0, width: xOf(time) }} />
        ) : null}
        {showPins && clip ? <ClipFrame x={xIn} width={xOut - xIn} height={h} lit={litEdge} /> : null}
      </View>
      {showPins && !clip ? (
        <>
          <InOutPin x={xIn} height={h} lit={litEdge === 'in'} />
          <InOutPin x={xOut} height={h} lit={litEdge === 'out'} />
        </>
      ) : null}
      {time != null && dur > 0 ? <Playhead x={xOf(time)} height={h} color={theme.colors.playhead} /> : null}
    </View>
  );
}
