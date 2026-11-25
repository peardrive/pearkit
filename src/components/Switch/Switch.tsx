import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  /** `md` is 36 × 22; `sm` is 30 × 18 for a dense row. */
  size?: SwitchSize;
  /** What is switched, for a screen reader: "Camera", "Loop". */
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const sizes: Record<SwitchSize, { w: number; h: number; thumb: number; pad: number }> = {
  md: { w: 36, h: 22, thumb: 18, pad: 2 },
  sm: { w: 30, h: 18, thumb: 14, pad: 2 },
};

/**
 * On or off, as a switch: the track fills with the brand colour and the thumb slides right. A switch reads as a
 * state, where a button reads as an action, so "Camera: on" never looks like "press to turn the camera on".
 */
export function Switch({ value, onValueChange, disabled, size = 'md', accessibilityLabel, className, style }: SwitchProps) {
  const theme = useTheme();
  const s = sizes[size];
  const x = useRef(new Animated.Value(value ? 1 : 0)).current;
  useEffect(() => { Animated.timing(x, { toValue: value ? 1 : 0, duration: 160, useNativeDriver: false }).start(); }, [value, x]);
  const travel = s.w - s.thumb - s.pad * 2;
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      hitSlop={6}
      className={cn('justify-center rounded-full', value ? 'bg-primary' : 'bg-overlay/[0.18]', Platform.OS === 'web' && 'cursor-pointer select-none', disabled && 'opacity-40', className)}
      style={[{ width: s.w, height: s.h, padding: s.pad }, style]}
    >
      <Animated.View
        style={{
          width: s.thumb, height: s.thumb, borderRadius: s.thumb / 2,
          backgroundColor: value ? theme.colors['primary-foreground'] : theme.colors.foreground,
          transform: [{ translateX: x.interpolate({ inputRange: [0, 1], outputRange: [0, travel] }) }],
          boxShadow: '0 1px 2px rgba(0,0,0,0.35)',
        } as ViewStyle}
      />
    </Pressable>
  );
}
