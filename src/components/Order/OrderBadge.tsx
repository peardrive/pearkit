import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text/Text';

export interface OrderBadgeProps {
  /** The number of the thing in the selection: 1 leads. 0 (or less) means it is not chosen. */
  n: number;
  /** Diameter in points. The number scales with it. */
  size?: number;
  /** What to draw for something that is not chosen: an empty ring (it can be chosen) or nothing. */
  empty?: 'ring' | 'none';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The number on something chosen in order: 1, 2, 3 in the order it was tapped, in place of a check mark.
 * Not chosen: an empty ring, which reads over a picture. The rule that gives the numbers is `utils/order`.
 */
export function OrderBadge({ n, size = 22, empty = 'ring', className, style }: OrderBadgeProps) {
  const on = n > 0;
  if (!on && empty === 'none') return null;
  return (
    <View
      accessibilityLabel={on ? `Number ${n}` : 'Not chosen'}
      className={cn('items-center justify-center', on ? 'bg-primary' : 'bg-black/35', className)}
      style={[{ minWidth: size, height: size, borderRadius: size / 2, paddingHorizontal: on && n > 9 ? Math.round(size * 0.22) : 0, borderWidth: 1.5, borderColor: on ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.8)' }, style]}
    >
      {on ? (
        <Text variant="micro" weight="bold" className="text-primary-foreground" style={{ fontSize: Math.round(size * 0.55), lineHeight: Math.round(size * 0.72), fontVariant: ['tabular-nums'] }} numberOfLines={1}>
          {n}
        </Text>
      ) : null}
    </View>
  );
}
