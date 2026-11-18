import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { formatClock } from '../../utils/format';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';
import { Scrubber, type ScrubberSize } from '../Scrubber/Scrubber';
import { isWholeRange, type TimeRange } from '../Scrubber/timeRange';

export interface TransportProps {
  playing: boolean;
  /** Play / pause was pressed. */
  onToggle: () => void;
  /** Length of the media, seconds. */
  duration: number;
  /** Where the playhead is, seconds. */
  time: number;
  /** The bar was pressed or dragged; `done` on release. */
  onSeek?: (time: number, done: boolean) => void;
  /** The chosen part, when the control also trims. */
  range?: TimeRange | null;
  /** A pin was dragged; `done` once on release. */
  onRange?: (range: TimeRange, done: boolean) => void;
  /** Show a "whole clip" button while the range is not the whole clip. */
  onWhole?: () => void;
  /** The shortest allowed range, seconds. Default 0.1. */
  minGap?: number;
  /** Bar size. Default `sm`. */
  size?: ScrubberSize;
  /** Show the times after the bar. Default true. */
  times?: boolean;
  /** Decimals in the times. Default 1 (`0:07.3`). */
  fractionDigits?: number;
  /** Content inside the bar (a `Waveform`). */
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The one video control: play / pause, the `Scrubber`, the times. Under a clip on a stage, in a quick
 * look, in an export dialog — only size and placement differ. With `range` it also trims.
 */
export function Transport({
  playing,
  onToggle,
  duration,
  time,
  onSeek,
  range,
  onRange,
  onWhole,
  minGap,
  size = 'sm',
  times = true,
  fractionDigits = 1,
  children,
  disabled,
  className,
  style,
}: TransportProps) {
  const fmt = (s: number) => formatClock(s, fractionDigits);
  const label = range
    ? `${fmt(range.in)} – ${fmt(range.out)} · ${fmt(range.out - range.in)}`
    : `${fmt(time)} / ${fmt(duration)}`;
  const whole = isWholeRange(range, { max: duration });
  return (
    <View className={cn('w-full flex-row items-center gap-2', className)} style={style}>
      <IconButton
        icon={playing ? 'pause' : 'play'}
        size="sm"
        variant="subtle"
        tooltip={playing ? 'Pause' : 'Play'}
        onPress={onToggle}
        disabled={disabled}
      />
      <Scrubber
        duration={duration}
        time={time}
        range={range}
        onSeek={onSeek}
        onRange={onRange}
        minGap={minGap}
        size={size}
        disabled={disabled}
        className="flex-1"
        accessibilityLabel="Position"
      >
        {children}
      </Scrubber>
      {times ? (
        <Text variant="caption" tone="muted" className="tabular-nums" numberOfLines={1}>
          {label}
        </Text>
      ) : null}
      {onWhole && range && !whole ? (
        <IconButton icon="refresh" size="xs" tooltip="Whole clip" onPress={onWhole} disabled={disabled} />
      ) : null}
    </View>
  );
}
