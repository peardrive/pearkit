import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { clamp } from '../../utils/format';
import { useTheme } from '../../theme/ThemeProvider';
import type { ColorToken } from '../../theme/tokens';
import { LinearGradient } from '../Gradient/LinearGradient';

export type ProgressVariant = 'transfer' | 'brand' | 'solid';

export interface ProgressBarProps {
  /** 0–1. */
  value: number;
  /**
   * `transfer` — warning → primary (list rows), `brand` — primary-strong → primary
   * (detail card), `solid` — a single `tone`.
   */
  variant?: ProgressVariant;
  /** Colour token for `solid`. */
  tone?: ColorToken;
  /** Custom gradient stops (hex), wins over `variant`. */
  colors?: string[];
  /** Bar thickness in px. Default 4. */
  height?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function ProgressBar({ value, variant = 'transfer', tone = 'primary', colors, height = 4, className, style, accessibilityLabel }: ProgressBarProps) {
  const theme = useTheme();
  const v = clamp(Number.isFinite(value) ? value : 0, 0, 1);
  const stops =
    colors ??
    (variant === 'transfer'
      ? [theme.colors.warning, theme.colors.primary]
      : variant === 'brand'
        ? [theme.colors['primary-strong'], theme.colors.primary]
        : [theme.colors[tone], theme.colors[tone]]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(v * 100) }}
      className={cn('w-full overflow-hidden rounded-full bg-overlay/[0.08]', className)}
      style={[{ height }, style]}
    >
      <View className="h-full overflow-hidden rounded-full" style={{ width: `${v * 100}%` }}>
        <LinearGradient colors={stops} radius={height / 2} />
      </View>
    </View>
  );
}
