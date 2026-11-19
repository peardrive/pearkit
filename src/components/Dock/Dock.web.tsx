import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { withAlpha } from '../../theme/createTheme';
import { DockButton } from './DockButton';
import type { DockProps } from './dockTypes';

export * from './dockTypes';
export * from './DockButton';

/**
 * The floating dock at the bottom: one wide pill with the places of the app in it, like the Photos tab pill on
 * an iPhone, with the page showing through it blurred (`backdrop-filter`, as PearDrive's bars).
 */
export function Dock({ items, value, onChange, inset = 0, className, style }: DockProps) {
  const theme = useTheme();
  const glass = {
    backgroundColor: withAlpha(theme.colors.pane, 0.72),
    backdropFilter: 'blur(22px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(22px) saturate(1.5)',
    boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.1), 0px 14px 34px rgba(0,0,0,0.55)',
  } as unknown as ViewStyle;
  const pad = typeof inset === 'number' ? ({ paddingBottom: 12 + inset } as ViewStyle) : ({ paddingBottom: `calc(12px + ${inset})` } as unknown as ViewStyle);
  return (
    <View pointerEvents="box-none" className={cn('absolute inset-x-0 bottom-0 z-10 items-center px-4', className)} style={[pad, style as ViewStyle]}>
      <View accessibilityRole="tablist" className="flex-row items-center gap-0.5 rounded-full border border-overlay/[0.13] p-1.5" style={glass}>
        {items.map((it) => (
          <DockButton key={it.key} icon={it.icon} label={it.label} badge={it.badge} active={it.key === value} onPress={() => onChange(it.key)} />
        ))}
      </View>
    </View>
  );
}
