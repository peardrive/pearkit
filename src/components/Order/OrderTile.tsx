import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';
import { OrderBadge } from './OrderBadge';

export interface OrderTileProps {
  /** Its number in the selection (1 leads), 0 when it is not chosen. From `useOrderedSelection().numberOf(key)`. */
  n: number;
  /** A tap: choose it (it takes the next number) or, when chosen, let it go. */
  onPress: () => void;
  onLongPress?: () => void;
  /** Width and height in points. Leave out to let `className` or `style` size it. */
  size?: number;
  /** Where the badge sits on the tile. */
  corner?: 'top-right' | 'top-left';
  /** Dim a tile that is not chosen once something else is: the chosen ones stand out. */
  dimUnchosen?: boolean;
  /** How many are chosen in all (needed for `dimUnchosen`). */
  chosen?: number;
  disabled?: boolean;
  /** Said by a screen reader before "number 2" or "not chosen". */
  label?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  /** The picture, thumbnail or row to choose. It fills the tile. */
  children: React.ReactNode;
}

/**
 * One thing that can be chosen in order: its picture with the order number on a corner. Tap to choose, tap again
 * to let go. Use it in any grid or list where the order of what is picked matters (the pictures of a post).
 */
export function OrderTile({ n, onPress, onLongPress, size, corner = 'top-right', dimUnchosen, chosen = 0, disabled, label, className, style, children }: OrderTileProps) {
  const on = n > 0;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: on, disabled: !!disabled }}
      accessibilityLabel={`${label ? `${label}, ` : ''}${on ? `number ${n}${n === 1 ? ', leads' : ''}` : 'not chosen'}`}
      className={cn('overflow-hidden rounded-lg bg-overlay/5', className)}
      style={[size ? { width: size, height: size } : null, style]}
    >
      <View style={{ flex: 1, opacity: dimUnchosen && !on && chosen > 0 ? 0.55 : 1 }}>{children}</View>
      {on ? <View pointerEvents="none" className="absolute inset-0 rounded-lg border-2 border-primary" /> : null}
      <OrderBadge n={n} style={{ position: 'absolute', top: 5, ...(corner === 'top-left' ? { left: 5 } : { right: 5 }) }} />
    </Pressable>
  );
}
