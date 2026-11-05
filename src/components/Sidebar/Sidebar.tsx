import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  View,
  type AccessibilityActionEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { cn } from '../../utils/cn';
import { clamp } from '../../utils/format';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { useTheme } from '../../theme/ThemeProvider';
import type { ColorToken } from '../../theme/tokens';
import type { StatusTone } from '../../theme/tones';
import { CountBadge } from '../Badge/CountBadge';
import { LinearGradient } from '../Gradient/LinearGradient';
import { IconButton } from '../IconButton/IconButton';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { Spacer } from '../Spacer/Spacer';
import { StatusDot } from '../Status/StatusDot';
import { Text } from '../Text/Text';
import { Tooltip } from '../Tooltip/Tooltip';

/* ───────────────────────── context ───────────────────────── */

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (next: boolean) => void;
  toggle: () => void;
  width: number;
  resizing: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  toggle: () => {},
  width: 236,
  resizing: false,
});

/** Read sidebar state from any descendant (e.g. to render a compact footer when collapsed). */
export function useSidebar() {
  return useContext(SidebarContext);
}

/* ───────────────────────── Sidebar ───────────────────────── */

export interface SidebarProps {
  children?: React.ReactNode;

  /* Size */
  /** Controlled width in px. */
  width?: number;
  /** Uncontrolled initial width. Default 236 (Figma). */
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  onWidthChange?: (width: number) => void;
  /** Fires once when a drag ends — a good moment to persist the width. */
  onResizeEnd?: (width: number) => void;

  /* Resizing */
  /** Let users drag the right edge to resize (mouse, touch & pen). Default false. */
  resizable?: boolean;
  /** Double-click / double-tap the handle to reset to `defaultWidth`. Default true. */
  resetOnDoubleClick?: boolean;
  /** Keyboard / screen-reader resize step in px. Default 16. */
  resizeStep?: number;

  /* Collapsing */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width of the collapsed icon rail. Default 76 (fits the window controls). */
  collapsedWidth?: number;
  /** Dragging this many px below `minWidth` collapses the sidebar. Set `false` to disable. Default 60. */
  collapseOnDrag?: number | false;

  /* Look */
  /** Paint the vertical sidebar gradient. Default true. */
  gradient?: boolean;
  /** Right hairline border. Default true. */
  bordered?: boolean;
  className?: string;
  contentClassName?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * App sidebar with optional mouse/touch resizing and a collapsible icon rail.
 * Compose it from `SidebarHeader`, `SidebarSection`, `SidebarItem`,
 * `SidebarContent` and `SidebarFooter`, or put anything inside.
 */
export function Sidebar({
  children,
  width: widthProp,
  defaultWidth = 236,
  minWidth = 200,
  maxWidth = 380,
  onWidthChange,
  onResizeEnd,
  resizable = false,
  resetOnDoubleClick = true,
  resizeStep = 16,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsedWidth = 76,
  collapseOnDrag = 60,
  gradient = true,
  bordered = true,
  className,
  contentClassName,
  style,
  accessibilityLabel = 'Sidebar',
}: SidebarProps) {
  const theme = useTheme();
  const [innerWidth, setInnerWidth] = useState(defaultWidth);
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
  const [resizing, setResizing] = useState(false);
  const [handleHover, setHandleHover] = useState(false);

  const width = clamp(widthProp ?? innerWidth, minWidth, maxWidth);
  const collapsed = collapsedProp ?? innerCollapsed;

  // Refs keep the PanResponder (created once) in sync with the latest props.
  const live = useRef({ width, collapsed, minWidth, maxWidth, collapseOnDrag, onWidthChange, onResizeEnd, onCollapsedChange, widthProp, collapsedProp, defaultWidth, resetOnDoubleClick });
  live.current = { width, collapsed, minWidth, maxWidth, collapseOnDrag, onWidthChange, onResizeEnd, onCollapsedChange, widthProp, collapsedProp, defaultWidth, resetOnDoubleClick };

  const setWidth = useCallback((w: number) => {
    const l = live.current;
    const next = clamp(Math.round(w), l.minWidth, l.maxWidth);
    if (l.widthProp === undefined) setInnerWidth(next);
    l.onWidthChange?.(next);
    return next;
  }, []);

  const setCollapsed = useCallback((next: boolean) => {
    const l = live.current;
    if (l.collapsedProp === undefined) setInnerCollapsed(next);
    l.onCollapsedChange?.(next);
  }, []);

  const drag = useRef({ start: 0, lastTap: 0, latest: 0, ignore: false });
  const handleRef = useRef<React.ComponentRef<typeof View>>(null);

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          const l = live.current;
          const now = Date.now();
          if (l.resetOnDoubleClick && now - drag.current.lastTap < 300) {
            if (l.collapsed) setCollapsed(false);
            const reset = setWidth(l.defaultWidth);
            l.onResizeEnd?.(reset);
            drag.current.lastTap = 0;
            drag.current.ignore = true; // don't resize for the rest of this gesture
            return;
          }
          drag.current.lastTap = now;
          drag.current.ignore = false;
          drag.current.start = l.collapsed ? collapsedWidth : l.width;
          drag.current.latest = drag.current.start;
          setResizing(true);
        },
        onPanResponderMove: (_e, g) => {
          if (drag.current.ignore) return;
          const l = live.current;
          const raw = drag.current.start + g.dx;
          drag.current.latest = raw;
          if (l.collapseOnDrag !== false && raw < l.minWidth - l.collapseOnDrag) {
            if (!l.collapsed) setCollapsed(true);
            return;
          }
          if (l.collapsed && raw >= l.minWidth - (l.collapseOnDrag || 0) / 2) setCollapsed(false);
          if (!live.current.collapsed || raw >= l.minWidth) setWidth(raw);
        },
        onPanResponderRelease: () => {
          setResizing(false);
          if (drag.current.ignore) return;
          const l = live.current;
          if (!l.collapsed) l.onResizeEnd?.(l.width);
        },
        onPanResponderTerminate: () => setResizing(false),
      }),
    [collapsedWidth, setCollapsed, setWidth],
  );

  // While dragging on the web, keep the resize cursor everywhere and stop text selection.
  useEffect(() => {
    if (Platform.OS !== 'web' || !resizing || typeof document === 'undefined') return;
    const { style: s } = document.body;
    const prev = { cursor: s.cursor, userSelect: s.userSelect };
    s.cursor = 'col-resize';
    s.userSelect = 'none';
    return () => { s.cursor = prev.cursor; s.userSelect = prev.userSelect; };
  }, [resizing]);

  const nudge = (delta: number) => {
    const next = setWidth(width + delta); // evaluate first — onResizeEnd is optional
    onResizeEnd?.(next);
  };

  const onA11yAction = (e: AccessibilityActionEvent) => {
    if (e.nativeEvent.actionName === 'increment') nudge(resizeStep);
    if (e.nativeEvent.actionName === 'decrement') nudge(-resizeStep);
  };

  const onKeyDown = (e: { key: string; preventDefault?: () => void }) => {
    if (e.key === 'ArrowRight') { e.preventDefault?.(); nudge(resizeStep); }
    if (e.key === 'ArrowLeft') { e.preventDefault?.(); nudge(-resizeStep); }
    if (e.key === 'Enter') setCollapsed(!collapsed);
  };

  // react-native-web doesn't forward onKeyDown on View, so listen on the DOM node.
  const keyHandler = useRef(onKeyDown);
  keyHandler.current = onKeyDown;
  useEffect(() => {
    if (Platform.OS !== 'web' || !resizable) return;
    const node = handleRef.current as unknown as HTMLElement | null;
    if (!node?.addEventListener) return;
    const listener = (e: KeyboardEvent) => keyHandler.current(e);
    node.addEventListener('keydown', listener);
    return () => node.removeEventListener('keydown', listener);
  }, [resizable]);

  const ctx = useMemo<SidebarContextValue>(
    () => ({ collapsed, setCollapsed, toggle: () => setCollapsed(!collapsed), width: collapsed ? collapsedWidth : width, resizing }),
    [collapsed, setCollapsed, collapsedWidth, width, resizing],
  );

  const effectiveWidth = collapsed ? collapsedWidth : width;
  const transition =
    Platform.OS === 'web' && !resizing ? ({ transitionProperty: 'width', transitionDuration: '160ms', transitionTimingFunction: 'ease-out' } as ViewStyle) : null;

  return (
    <SidebarContext.Provider value={ctx}>
      <View
        accessibilityRole={Platform.OS === 'web' ? ('navigation' as never) : undefined}
        accessibilityLabel={accessibilityLabel}
        className={cn('relative h-full shrink-0', bordered && 'border-r border-overlay/[0.06]', !gradient && 'bg-sidebar', className)}
        style={[{ width: effectiveWidth }, transition, style]}
      >
        {gradient ? <LinearGradient colors={[theme.colors.sidebar, theme.colors['sidebar-to']]} direction="to-bottom" /> : null}
        <View className={cn('flex-1 gap-0.5 overflow-hidden px-3 pb-3 pt-3.5', collapsed && 'items-center', contentClassName)}>{children}</View>

        {resizable ? (
          <View
            ref={handleRef}
            {...pan.panHandlers}
            accessible
            focusable
            accessibilityRole="adjustable"
            accessibilityLabel="Resize sidebar"
            accessibilityHint="Drag, or use the arrow keys. Double-click to reset."
            accessibilityValue={{ min: minWidth, max: maxWidth, now: effectiveWidth }}
            accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
            onAccessibilityAction={onA11yAction}
            {...({ onMouseEnter: () => setHandleHover(true), onMouseLeave: () => setHandleHover(false) } as object)}
            className={cn('app-region-no-drag absolute bottom-0 top-0 z-10 items-center', Platform.OS === 'web' && 'cursor-col-resize')}
            style={{ right: -4, width: 8 }}
          >
            <View
              className={cn('h-full w-0.5 rounded-full', resizing ? 'bg-primary/70' : handleHover ? 'bg-primary/40' : 'bg-transparent')}
            />
          </View>
        ) : null}
      </View>
    </SidebarContext.Provider>
  );
}

/* ───────────────────────── Header / Toggle ───────────────────────── */

export interface SidebarHeaderProps {
  children?: React.ReactNode;
  /** Make the header a window drag region in Electron. Default true. */
  dragRegion?: boolean;
  className?: string;
}

/** Top row: window controls, spacer, collapse toggle. Doubles as the title bar. */
export function SidebarHeader({ children, dragRegion = true, className }: SidebarHeaderProps) {
  const { collapsed } = useSidebar();
  return (
    <View
      className={cn(
        'w-full px-1 pb-3.5 pt-0.5',
        collapsed ? 'items-center gap-3' : 'flex-row items-center gap-2',
        dragRegion && 'app-region-drag',
        className,
      )}
    >
      {children}
    </View>
  );
}

export interface SidebarToggleProps {
  className?: string;
  tooltip?: string;
}

/** The sidebar-left icon button that collapses / expands the nearest `<Sidebar/>`. */
export function SidebarToggle({ className, tooltip }: SidebarToggleProps) {
  const { collapsed, toggle } = useSidebar();
  return (
    <IconButton
      icon="sidebar-left"
      size="xs"
      tone="icon"
      onPress={toggle}
      accessibilityLabel={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      tooltip={tooltip ? { label: tooltip, placement: collapsed ? 'right' : 'bottom' } : undefined}
      className={cn('app-region-no-drag', className)}
      style={collapsed ? { transform: [{ scaleX: -1 }] } : undefined}
    />
  );
}

/* ───────────────────────── Content / Section / Footer ───────────────────────── */

export interface SidebarContentProps {
  children?: React.ReactNode;
  /** Scroll when the items overflow. Default true. */
  scrollable?: boolean;
  className?: string;
}

/** Flexible middle area. Scrolls by default so the footer stays pinned. */
export function SidebarContent({ children, scrollable = true, className }: SidebarContentProps) {
  const { collapsed } = useSidebar();
  if (!scrollable) return <View className={cn('w-full flex-1 gap-0.5', collapsed && 'items-center', className)}>{children}</View>;
  return (
    <ScrollView
      className="w-full flex-1"
      contentContainerClassName={cn('gap-0.5', collapsed && 'items-center', className)}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export interface SidebarSectionProps {
  /** Overline title. Hidden (replaced by a hairline) when collapsed. */
  title?: string;
  children?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}

export function SidebarSection({ title, children, trailing, className }: SidebarSectionProps) {
  const { collapsed } = useSidebar();
  return (
    <View className={cn('w-full gap-0.5', collapsed && 'items-center', className)}>
      {title ? (
        collapsed ? (
          <View className="my-2.5 h-px w-6 bg-overlay/10" />
        ) : (
          <SectionLabel label={title} trailing={trailing} />
        )
      ) : null}
      {children}
    </View>
  );
}

export interface SidebarFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  const { collapsed } = useSidebar();
  return <View className={cn('w-full gap-2', collapsed && 'items-center', className)}>{children}</View>;
}

export const SidebarSpacer = Spacer;

/* ───────────────────────── Item ───────────────────────── */

export interface SidebarItemProps {
  label: string;
  /** Leading icon (name or element). */
  icon?: IconSource;
  /** Icon colour; selected items use `primary` unless set. Folders in the design use `accent`. */
  iconTone?: ColorToken;
  /** Show a status dot instead of an icon (STATUS section). */
  dot?: StatusTone;
  /** Quiet trailing count. */
  count?: number | string;
  /** Tinted trailing pill — wins over `count`. */
  badge?: { value: number | string; tone: StatusTone };
  /** Anything else on the right. */
  trailing?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Navigation row: icon, label and a trailing count / badge. Collapses to an icon with a tooltip. */
export function SidebarItem({
  label,
  icon,
  iconTone,
  dot,
  count,
  badge,
  trailing,
  selected,
  disabled,
  onPress,
  onLongPress,
  className,
  style,
}: SidebarItemProps) {
  const { collapsed } = useSidebar();
  const leading = dot ? (
    <View className="h-4 w-4 items-center justify-center">
      <StatusDot tone={dot} size={8} />
    </View>
  ) : (
    renderIcon(icon, { size: 16, tone: iconTone ?? (selected ? 'primary' : 'icon') })
  );

  const row = (
    <Pressable
      accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
      accessibilityLabel={label}
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      className={cn(
        'app-region-no-drag flex-row items-center rounded-md',
        Platform.OS === 'web' && 'cursor-pointer select-none',
        collapsed ? 'h-[34px] w-[34px] justify-center' : 'w-full gap-2.5 px-2.5 py-[7px]',
        selected ? 'bg-selected' : 'hover:bg-overlay/5 active:bg-overlay/[0.08]',
        disabled && 'opacity-40',
        className,
      )}
      style={style}
    >
      {leading}
      {collapsed ? null : (
        <>
          <Text variant="body" weight={selected ? 'semibold' : 'medium'} numberOfLines={1} className="min-w-0 flex-1">
            {label}
          </Text>
          {trailing ?? (badge ? <CountBadge value={badge.value} tone={badge.tone} /> : count != null ? <CountBadge value={count} /> : null)}
        </>
      )}
      {collapsed && badge ? (
        <View className="absolute right-1 top-1">
          <StatusDot tone={badge.tone} size={6} />
        </View>
      ) : null}
    </Pressable>
  );

  return collapsed ? (
    <Tooltip label={label} shortcut={count != null ? String(count) : badge ? String(badge.value) : undefined} placement="right" offset={10}>
      {row}
    </Tooltip>
  ) : (
    row
  );
}
