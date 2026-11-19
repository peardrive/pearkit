import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { withAlpha } from '../../theme/createTheme';
import type { GlassBarProps } from './glassBarTypes';

export * from './glassBarTypes';
export * from './GlassBarButton';

/**
 * A floating bar over content, at the top or the bottom, with the content showing through it blurred, as
 * PearDrive's bars: `backdrop-filter: blur(22px) saturate(1.5)` over a translucent wash of the pane colour.
 */
export function GlassBar({ position = 'top', inset = 0, children, className, style }: GlassBarProps) {
  const theme = useTheme();
  const glass = {
    backgroundColor: withAlpha(theme.colors.pane, 0.72),
    backdropFilter: 'blur(22px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(22px) saturate(1.5)',
    boxShadow: position === 'top' ? 'inset 0px -1px 0px rgba(255,255,255,0.06), 0px 8px 24px -12px rgba(0,0,0,0.6)' : 'inset 0px 1px 0px rgba(255,255,255,0.06), 0px -8px 24px -12px rgba(0,0,0,0.6)',
  } as unknown as ViewStyle;
  return (
    <View
      pointerEvents="box-none"
      className={cn('absolute inset-x-0 z-10', position === 'top' ? 'top-0 border-b' : 'bottom-0 border-t', 'border-overlay/[0.10]', className)}
      style={[glass, position === 'top' ? ({ paddingTop: inset } as ViewStyle) : ({ paddingBottom: inset } as ViewStyle), style as ViewStyle]}
    >
      <View className="flex-row items-center justify-center gap-2 px-3 py-2">{children}</View>
    </View>
  );
}
