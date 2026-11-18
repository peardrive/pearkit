import React, { useMemo, useState } from 'react';
import { View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import type { ColorToken } from '../../theme/tokens';
import { waveformBars, type WaveformAnchor, type WaveformSource, type WaveformWindow } from './waveformBars';

export interface WaveformProps {
  /** The peaks. Nothing is drawn while null. */
  source: WaveformSource | null | undefined;
  /** The stretch of time across the width. Default: all the peaks. */
  window?: WaveformWindow;
  /** Height in px. Default 24; give `style={{ flex: 1 }}` or a parent height to fill instead. */
  height?: number;
  /** Bars grow from the middle or stand on the bottom. Default `center`. */
  anchor?: WaveformAnchor;
  /** Colour token of the bars. Default `info`. */
  tone?: ColorToken;
  /** Any colour; wins over `tone`. */
  color?: string;
  /** 0–1. Default 0.6. */
  opacity?: number;
  /** Width of one bar, px. Default 1. */
  barWidth?: number;
  /** Space between bars, px. Default 0. */
  gap?: number;
  /** How much of the height the loudest bar fills. Default 0.85. */
  scale?: number;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sound as bars — the same geometry a canvas gets from `paintWaveform`. Measures its own box, so it
 * fits wherever it is put: a trim strip's foot, a whole audio strip, a list row.
 */
export function Waveform({
  source,
  window: win,
  height = 24,
  anchor = 'center',
  tone = 'info',
  color,
  opacity = 0.6,
  barWidth = 1,
  gap = 0,
  scale = 0.85,
  accessibilityLabel,
  className,
  style,
}: WaveformProps) {
  const theme = useTheme();
  const [box, setBox] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height: hh } = e.nativeEvent.layout;
    if (width !== box.w || hh !== box.h) setBox({ w: width, h: hh });
  };
  const bars = useMemo(
    () => (source && box.w > 0 && box.h > 0 ? waveformBars(source, { width: box.w, height: box.h, window: win, anchor, barWidth, gap, scale }) : []),
    [source, box.w, box.h, win?.from, win?.to, anchor, barWidth, gap, scale],
  );
  const c = color ?? theme.colors[tone];
  return (
    <View
      onLayout={onLayout}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      className={cn('relative w-full overflow-hidden', className)}
      style={[style ? null : { height }, style]}
    >
      {bars.map((b, i) => (
        <View key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h, backgroundColor: c, opacity }} />
      ))}
    </View>
  );
}
