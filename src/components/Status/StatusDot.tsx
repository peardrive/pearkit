import React, { useEffect, useRef } from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { withAlpha } from '../../theme/createTheme';
import { statusToken, type StatusTone } from '../../theme/tones';

export interface StatusDotProps {
  tone?: StatusTone;
  /** Diameter in px. Default 8. */
  size?: number;
  /** Soft halo around the dot (the "Connected" indicator). */
  glow?: boolean;
  /** Gentle breathing animation for live states. */
  pulse?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function StatusDot({ tone = 'success', size = 8, glow, pulse, className, style, accessibilityLabel }: StatusDotProps) {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!pulse) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.45, duration: 900, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, opacity]);

  const glowStyle = glow
    ? ({ boxShadow: `0px 0px ${size * 0.75}px ${withAlpha(theme.colors[statusToken[tone]], 0.7)}` } as ViewStyle)
    : null;

  // Colour comes from the theme object (not a class) so it also paints inside Animated.View.
  const dot = (
    <View
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      className={cn('rounded-full', className)}
      style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors[statusToken[tone]] }, glowStyle, style]}
    />
  );
  return pulse ? <Animated.View style={{ opacity }}>{dot}</Animated.View> : dot;
}
