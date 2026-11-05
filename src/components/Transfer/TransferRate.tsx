import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { formatSpeed } from '../../utils/format';
import { Icon } from '../../icons/Icon';
import type { ColorToken } from '../../theme/tokens';
import { Text } from '../Text/Text';

export interface TransferRateProps {
  direction: 'up' | 'down';
  /** Bytes per second (formatted for you) or a preformatted string. */
  value: number | string;
  /** Arrow colour. Defaults: up → `primary`, down → `primary-strong`. */
  tone?: ColorToken;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** `↑ 1.2 MB/s` / `↓ 3.8 MB/s`. */
export function TransferRate({ direction, value, tone, className, style }: TransferRateProps) {
  const text = typeof value === 'number' ? formatSpeed(value) : value;
  return (
    <View
      accessibilityLabel={`${direction === 'up' ? 'Upload' : 'Download'} ${text}`}
      className={cn('flex-row items-center gap-1.5', className)}
      style={style}
    >
      <Icon name={direction === 'up' ? 'arrow-up' : 'arrow-down'} size={12} tone={tone ?? (direction === 'up' ? 'primary' : 'primary-strong')} />
      <Text variant="label" numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}
