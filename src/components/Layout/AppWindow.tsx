import React from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { RadialGlow } from '../Gradient/LinearGradient';

/* ───────────────────────── AppWindow ───────────────────────── */

export interface AppWindowProps {
  children?: React.ReactNode;
  /**
   * Draw the rounded window chrome (border, 14px radius, drop shadow). Use it
   * for previews, docs and screenshots; in a real Electron window the OS draws
   * the frame, so leave it off.
   */
  framed?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Root surface of a desktop app: a horizontal row of panes on the window background. */
export function AppWindow({ children, framed = false, className, style }: AppWindowProps) {
  return (
    <View
      className={cn('flex-1 flex-row overflow-hidden bg-background', framed && 'rounded-window border border-overlay/[0.08]', className)}
      style={[framed ? ({ boxShadow: '0px 30px 70px 0px rgba(0,0,0,0.55)' } as ViewStyle) : null, style]}
    >
      {children}
    </View>
  );
}

/* ───────────────────────── Pane ───────────────────────── */

export interface PaneProps {
  children?: React.ReactNode;
  /** Fixed width in px. Omit to fill the remaining space. */
  width?: number;
  minWidth?: number;
  /** Background: `pane` (list), `background` (detail) or `transparent`. */
  surface?: 'pane' | 'background' | 'transparent';
  /** Right hairline. */
  bordered?: boolean;
  /** Soft brand glow from the bottom-left corner (detail pane). */
  glow?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const surfaces = { pane: 'bg-pane', background: 'bg-background', transparent: 'bg-transparent' };

/** A vertical column of the app layout (list pane, detail pane…). */
export function Pane({ children, width, minWidth, surface = 'background', bordered, glow, className, style }: PaneProps) {
  const theme = useTheme();
  return (
    <View
      className={cn('relative h-full overflow-hidden', width == null ? 'min-w-0 flex-1' : 'shrink-0', surfaces[surface], bordered && 'border-r border-overlay/[0.06]', className)}
      style={[{ width, minWidth }, style]}
    >
      {glow ? <RadialGlow color={theme.colors.primary} /> : null}
      {children}
    </View>
  );
}

/* ───────────────────────── PaneBody ───────────────────────── */

export interface PaneBodyProps {
  children?: React.ReactNode;
  /** Scroll the content. Default true. */
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
}

/** Padded, optionally scrolling content area of a pane. */
export function PaneBody({ children, scrollable = true, className, contentClassName }: PaneBodyProps) {
  if (!scrollable) return <View className={cn('flex-1', className, contentClassName)}>{children}</View>;
  return (
    <ScrollView className={cn('flex-1', className)} contentContainerClassName={cn('flex-grow', contentClassName)} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
