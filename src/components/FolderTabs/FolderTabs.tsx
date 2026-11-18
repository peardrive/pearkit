import React, { useId, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Path, Stop } from 'react-native-svg';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { useTheme } from '../../theme/ThemeProvider';
import { withAlpha } from '../../theme/createTheme';
import { CountBadge } from '../Badge/CountBadge';
import { Text } from '../Text/Text';

/* ───────────────────────── the frame ───────────────────────── */

export interface FolderTabPageProps {
  children?: React.ReactNode;
  /**
   * The opening in the top edge where the open tab joins the page, in px from the page's left edge.
   * Leave it out for a page with no tab above it.
   */
  opening?: { start: number; end: number } | null;
  /** Corner radius. Default 12. */
  radius?: number;
  /** Square the top-left corner, where a row of tabs starts. Default true. */
  squareTopLeft?: boolean;
  /** How far down the lit edge runs before it has faded out, in px. Default 110. */
  fade?: number;
  /** Light the edge (the open page). Default true; false leaves only the faint frame. */
  lit?: boolean;
  /** Inner padding. Default true (8px). */
  padded?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A framed page: a faint frame all round, and a `primary` edge across the top that turns the corners
 * and fades out down the sides. Under `FolderTabs` it is the open tab's page; on its own it frames any
 * panel that should read as "the one in use".
 */
export function FolderTabPage({
  children,
  opening = null,
  radius = 12,
  squareTopLeft = true,
  fade = 110,
  lit = true,
  padded = true,
  className,
  style,
}: FolderTabPageProps) {
  const theme = useTheme();
  const id = `pk-ftp-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [size, setSize] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.w || height !== size.h) setSize({ w: width, h: height });
  };
  const d = size.w > 0 && size.h > 0 ? framePath(size.w, size.h, radius, squareTopLeft ? 0 : radius, opening) : null;
  return (
    <View onLayout={onLayout} className={cn('relative bg-overlay/[0.03]', padded && 'p-2', className)} style={[{ borderRadius: radius, borderTopLeftRadius: squareTopLeft ? 0 : radius }, style]}>
      {d ? (
        <Svg pointerEvents="none" width={size.w} height={size.h} style={StyleSheet.absoluteFill}>
          <Defs>
            <SvgLinearGradient id={id} x1="0" y1="0" x2="0" y2={fade} gradientUnits="userSpaceOnUse">
              <Stop offset={0} stopColor={theme.colors.primary} stopOpacity={0.68} />
              <Stop offset={14 / fade} stopColor={theme.colors.primary} stopOpacity={0.68} />
              <Stop offset={44 / fade} stopColor={theme.colors.primary} stopOpacity={0.27} />
              <Stop offset={1} stopColor={theme.colors.primary} stopOpacity={0} />
            </SvgLinearGradient>
          </Defs>
          {/* the rest of the frame, barely there */}
          <Path d={d} fill="none" stroke={theme.colors.overlay} strokeOpacity={0.045} strokeWidth={1} />
          {lit ? (
            <>
              {/* a soft glow under the lit edge, then the edge itself */}
              <Path d={d} fill="none" stroke={`url(#${id})`} strokeOpacity={0.22} strokeWidth={4} />
              <Path d={d} fill="none" stroke={`url(#${id})`} strokeWidth={1} />
            </>
          ) : null}
        </Svg>
      ) : null}
      {children}
    </View>
  );
}

// The frame as one open path, starting at the right of the opening and going round clockwise to its
// left, so the top edge stops under the open tab. Inset half a pixel so a 1px stroke is crisp.
function framePath(w: number, h: number, r: number, rTopLeft: number, opening: { start: number; end: number } | null) {
  const x0 = 0.5, y0 = 0.5, x1 = w - 0.5, y1 = h - 0.5;
  const R = Math.max(0, Math.min(r, (w - 1) / 2, (h - 1) / 2)), RT = Math.max(0, Math.min(rTopLeft, R));
  const a = opening ? Math.max(x0 + RT, Math.min(x1 - R, opening.start)) : null;
  const b = opening ? Math.max(x0 + RT, Math.min(x1 - R, opening.end)) : null;
  const from = b ?? x0 + RT;
  let d = `M ${from} ${y0} L ${x1 - R} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y0 + R} L ${x1} ${y1 - R} A ${R} ${R} 0 0 1 ${x1 - R} ${y1} L ${x0 + R} ${y1} A ${R} ${R} 0 0 1 ${x0} ${y1 - R} L ${x0} ${y0 + RT}`;
  if (RT > 0) d += ` A ${RT} ${RT} 0 0 1 ${x0 + RT} ${y0}`;
  d += ` L ${a ?? from} ${y0}`;
  return d;
}

/* ───────────────────────── the tabs ───────────────────────── */

export interface FolderTab {
  value: string;
  label: string;
  icon?: IconSource;
  /** A quiet count after the label. */
  count?: number | string;
  disabled?: boolean;
}

export interface FolderTabsProps {
  tabs: FolderTab[];
  /** The open tab's `value`. */
  value: string;
  onChange: (value: string) => void;
  /** The open tab's page. */
  children?: React.ReactNode;
  /** Something at the end of the tab row, e.g. a search button. */
  trailing?: React.ReactNode;
  /** Page corner radius. Default 12. */
  radius?: number;
  /** Inner padding of the page. Default true. */
  padded?: boolean;
  className?: string;
  pageClassName?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Folder tabs: a row of tabs whose open one is lit and opens straight into its page, with the page's
 * edge running on from the tab, across the top, round the corners and fading down the sides. The page
 * is a `FolderTabPage`. When the tabs outgrow the row they scroll sideways.
 */
export function FolderTabs({
  tabs,
  value,
  onChange,
  children,
  trailing,
  radius = 12,
  padded = true,
  className,
  pageClassName,
  style,
  accessibilityLabel = 'Tabs',
}: FolderTabsProps) {
  const theme = useTheme();
  const [spans, setSpans] = useState<Record<string, { x: number; w: number }>>({});
  const [scrollX, setScrollX] = useState(0);
  const onTabLayout = (key: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setSpans((cur) => (cur[key]?.x === x && cur[key]?.w === width ? cur : { ...cur, [key]: { x, w: width } }));
  };
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => setScrollX(e.nativeEvent.contentOffset.x);
  const open = spans[value];
  const opening = open ? { start: open.x - scrollX, end: open.x + open.w - scrollX } : null; // (x is within the scrolled row, which starts where the page does)
  const glow: ViewStyle =
    Platform.OS === 'web'
      ? ({ boxShadow: `0 -8px 22px -8px ${withAlpha(theme.colors.primary, 0.5)}, inset 0 1px 0 ${withAlpha(theme.colors.primary, 0.2)}` } as ViewStyle)
      : { shadowColor: theme.colors.primary, shadowOpacity: 0.45, shadowRadius: 10, shadowOffset: { width: 0, height: -4 } };

  return (
    <View className={cn('min-w-0', className)} style={style}>
      <View className="flex-row items-end gap-1.5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          className="min-w-0 flex-1"
          contentContainerClassName="items-end gap-[3px] pt-2.5" /* room for the open tab's glow, which a scrolling row would otherwise clip */
          accessibilityRole={Platform.OS === 'web' ? ('tablist' as never) : undefined}
          accessibilityLabel={accessibilityLabel}
        >
          {tabs.map((t, i) => {
            const on = t.value === value;
            return (
              <Pressable
                key={t.value}
                onLayout={onTabLayout(t.value)}
                onPress={() => !on && onChange(t.value)}
                disabled={t.disabled}
                accessibilityRole="tab"
                accessibilityLabel={t.label}
                accessibilityState={{ selected: on, disabled: !!t.disabled }}
                className={cn(
                  'flex-row items-center gap-1.5 rounded-t-[11px] border border-b-0 px-[13px] pb-[7px] pt-1.5',
                  Platform.OS === 'web' && 'cursor-pointer select-none',
                  on ? 'z-10 border-primary/60 bg-overlay/[0.03]' : 'border-overlay/[0.08] bg-overlay/[0.03] hover:bg-overlay/[0.06]',
                  t.disabled && 'opacity-40',
                  i === 0 && 'ml-0',
                )}
                style={on ? glow : undefined}
              >
                {renderIcon(t.icon, { size: 14, tone: on ? 'primary' : 'icon' })}
                <Text variant="body" weight={on ? 'semibold' : 'medium'} tone={on ? 'primary-text' : 'muted'} numberOfLines={1}>
                  {t.label}
                </Text>
                {t.count != null ? <CountBadge value={t.count} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>
        {trailing}
      </View>
      <FolderTabPage opening={opening} radius={radius} padded={padded} className={pageClassName}>
        {children}
      </FolderTabPage>
    </View>
  );
}
