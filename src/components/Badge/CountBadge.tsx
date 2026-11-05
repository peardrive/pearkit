import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { statusSoftBg, statusText, type StatusTone } from '../../theme/tones';
import { Text } from '../Text/Text';

export interface CountBadgeProps {
  value: number | string;
  /** Without a tone the count renders as quiet text; with a tone it becomes a tinted pill. */
  tone?: StatusTone;
  /** Numbers above `max` render as `max+`. */
  max?: number;
  /** Hide when the value is 0. */
  hideZero?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Trailing counters for navigation items: `12`, or an attention pill like `(2)`. */
export function CountBadge({ value, tone, max = 99, hideZero, className, style }: CountBadgeProps) {
  if (hideZero && (value === 0 || value === '0')) return null;
  const text = typeof value === 'number' && value > max ? `${max}+` : String(value);
  if (!tone) {
    return (
      <Text variant="label" tone="muted" className={className} style={style as never} numberOfLines={1}>
        {text}
      </Text>
    );
  }
  return (
    <View className={cn('items-center justify-center rounded-full px-[7px] py-px', statusSoftBg[tone], className)} style={style}>
      <Text variant="micro" weight="semibold" className={statusText[tone]} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}
