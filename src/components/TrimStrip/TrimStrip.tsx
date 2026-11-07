import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Scrubber } from '../Scrubber/Scrubber';
import type { TimeRange } from '../Scrubber/timeRange';
import { Waveform } from '../Waveform/Waveform';
import type { WaveformSource } from '../Waveform/waveformBars';
import { Filmstrip } from '../Filmstrip/Filmstrip';
import type { FilmstripFrame } from '../Filmstrip/filmstripCells';

export interface TrimStripProps {
  /** Length of the media, seconds. */
  duration: number;
  /** The chosen part. `null` means the whole clip. */
  range: TimeRange | null | undefined;
  /** A pin was dragged; `done` once on release. */
  onRange?: (range: TimeRange, done: boolean) => void;
  /** Where the playhead is, seconds; hidden when null. */
  time?: number | null;
  /** Press or drag anywhere but a pin to scrub. */
  onSeek?: (time: number, done: boolean) => void;
  /** The sound, drawn along the bottom third under frames, or the whole height without them. */
  waveform?: WaveformSource | null;
  /** The frames across the strip (video). Ignored in `compact`. */
  frames?: ReadonlyArray<FilmstripFrame> | null;
  /** Height in px. Default 44, or 28 in `compact`. */
  height?: number;
  /** The Inspector's single-line form: no frames, a lighter veil. */
  compact?: boolean;
  /** The shortest allowed range, seconds. Default 0.1. */
  minGap?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A clip, miniaturised: its frames edge to edge with the sound along the bottom (or the whole height
 * of waveform for audio), the chosen part lit with a light edge and a pin at each end, everything
 * outside it dimmed, the playhead over it. Drag a pin's ball to trim, drag anywhere else to scrub.
 */
export function TrimStrip({
  duration,
  range,
  onRange,
  time,
  onSeek,
  waveform,
  frames,
  height,
  compact = false,
  minGap,
  disabled,
  accessibilityLabel = 'Trim',
  className,
  style,
}: TrimStripProps) {
  const h = height ?? (compact ? 28 : 44);
  const framed = !compact && !!frames?.length;
  const top = framed ? Math.round(h * 0.68) : 0;
  return (
    <Scrubber
      duration={duration}
      time={time}
      range={range ?? { in: 0, out: duration }}
      onRange={onRange}
      onSeek={onSeek}
      minGap={minGap}
      height={h}
      pins
      dimOutside
      frame
      disabled={disabled}
      trackClassName={compact ? 'bg-inset/[0.35]' : 'bg-inset/[0.55]'}
      accessibilityLabel={accessibilityLabel}
      className={className}
      style={style}
    >
      {framed ? <Filmstrip frames={frames!} height={top} radius={0} className="absolute left-0 right-0 top-0" /> : null}
      {waveform ? (
        <Waveform
          source={waveform}
          window={{ from: 0, to: duration }}
          anchor="center"
          opacity={framed ? 0.6 : 0.45}
          className="absolute left-0 right-0"
          style={{ top, height: h - top }}
        />
      ) : null}
    </Scrubber>
  );
}
