import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import type { GlassBarProps } from './glassBarTypes';

export * from './glassBarTypes';
export * from './GlassBarButton';

/**
 * A floating bar over content, at the top or the bottom: on the web (`GlassBar.web.tsx`) the content shows
 * through it blurred; here, with no blur to hand, it is a near-solid tint of the pane colour.
 */
export function GlassBar({ position = 'top', inset = 0, children, className, style }: GlassBarProps) {
  const pad = typeof inset === 'number' ? inset : 0;
  return (
    <View
      pointerEvents="box-none"
      className={cn('absolute inset-x-0 z-10', position === 'top' ? 'top-0 border-b' : 'bottom-0 border-t', 'border-overlay/[0.10] bg-pane/95', className)}
      style={[position === 'top' ? { paddingTop: pad } : { paddingBottom: pad }, style as ViewStyle]}
    >
      <View className="flex-row items-center justify-center gap-2 px-3 py-2">{children}</View>
    </View>
  );
}
