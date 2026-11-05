import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Length for vertical dividers. Default 18 (toolbar separator). */
  length?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function Divider({ orientation = 'horizontal', length = 18, className, style }: DividerProps) {
  return orientation === 'vertical' ? (
    <View accessibilityRole="none" className={cn('w-px bg-overlay/10', className)} style={[{ height: length }, style]} />
  ) : (
    <View accessibilityRole="none" className={cn('h-px w-full bg-overlay/[0.06]', className)} style={style} />
  );
}
