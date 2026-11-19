import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { DockButton } from './DockButton';
import type { DockProps } from './dockTypes';

export * from './dockTypes';
export * from './DockButton';

/**
 * The floating dock at the bottom: one wide pill with the places of the app in it, like the Photos tab pill on
 * an iPhone. On the web (`Dock.web.tsx`) the page shows through it blurred; here it is a near-solid tint.
 */
export function Dock({ items, value, onChange, inset = 0, className, style }: DockProps) {
  const pad = typeof inset === 'number' ? inset : 0;
  return (
    <View pointerEvents="box-none" className={cn('absolute inset-x-0 bottom-0 z-10 items-center px-4 pb-3', className)} style={[{ paddingBottom: 12 + pad }, style as ViewStyle]}>
      <View
        accessibilityRole="tablist"
        className="flex-row items-center gap-0.5 rounded-full border border-overlay/[0.13] bg-pane/95 p-1.5"
        style={{ boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.08), 0px 14px 34px rgba(0,0,0,0.55)' } as ViewStyle}
      >
        {items.map((it) => (
          <DockButton key={it.key} icon={it.icon} label={it.label} badge={it.badge} active={it.key === value} onPress={() => onChange(it.key)} />
        ))}
      </View>
    </View>
  );
}
