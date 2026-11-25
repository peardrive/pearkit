import React, { useEffect, useRef } from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';

export interface LevelMeterProps {
  /** The level to show, 0..1, already on the curve the app wants (a dB scale is the caller's business). */
  level: number;
  /** Lit in the record red. Default: when `level` is above 0.95. */
  hot?: boolean;
  orientation?: 'horizontal' | 'vertical';
  /** Along the bar, in px. Default 22. */
  length?: number;
  /** Across the bar, in px. Default 3. */
  thickness?: number;
  /** Dimmed: the device it meters is off. */
  muted?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const clamp01 = (n: number) => (Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0);

/**
 * An input level as one thin bar: the track faint, the fill in the brand colour, red when it clips. Small enough to
 * sit along the bottom of a dock button, long enough for a mixer when `length` says so. The fill eases over 60 ms,
 * so a level fed at any rate reads smoothly.
 */
export function LevelMeter({ level, hot, orientation = 'horizontal', length = 22, thickness = 3, muted, className, style, accessibilityLabel = 'Level' }: LevelMeterProps) {
  const theme = useTheme();
  const shown = clamp01(level);
  const value = useRef(new Animated.Value(shown)).current;
  useEffect(() => {
    Animated.timing(value, { toValue: shown, duration: 60, useNativeDriver: false }).start();
  }, [shown, value]);
  const isHot = hot ?? shown > 0.95;
  const horizontal = orientation === 'horizontal';
  const extent = value.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(shown * 100) }}
      className={cn('overflow-hidden rounded-full bg-overlay/10', muted && 'opacity-40', className)}
      style={[{ width: horizontal ? length : thickness, height: horizontal ? thickness : length, justifyContent: 'flex-end' }, style]}
    >
      <Animated.View
        style={horizontal ? { height: '100%', width: extent, backgroundColor: isHot ? theme.colors.rec : theme.colors.primary } : { width: '100%', height: extent, backgroundColor: isHot ? theme.colors.rec : theme.colors.primary }}
      />
    </View>
  );
}
