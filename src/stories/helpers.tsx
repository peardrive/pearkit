/** Tiny layout helpers for stories (not exported from the library). */
import React from 'react';
import { View } from 'react-native';
import { Text, cn } from '../index';

export function Showcase({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <View className="gap-2.5">
      {title ? <Text variant="overline">{title}</Text> : null}
      <View className={cn('flex-row flex-wrap items-center gap-3', className)}>{children}</View>
    </View>
  );
}

export function Column({ children, className, width }: { children: React.ReactNode; className?: string; width?: number }) {
  return <View className={cn('gap-6', className)} style={width ? { width } : undefined}>{children}</View>;
}

/** Sidebar-coloured surface for previewing sidebar parts in isolation. */
export function SidebarSurface({ children, width = 236 }: { children: React.ReactNode; width?: number }) {
  return (
    <View className="gap-0.5 rounded-card border border-overlay/[0.06] bg-sidebar p-3" style={{ width }}>
      {children}
    </View>
  );
}
