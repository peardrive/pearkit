import React, { useId } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, RadialGradient as SvgRadialGradient, Rect, Stop } from 'react-native-svg';

export type GradientStop = string | { color: string; offset: number; opacity?: number };

function normalizeStops(colors: GradientStop[]) {
  return colors.map((c, i) =>
    typeof c === 'string'
      ? { color: c, offset: colors.length === 1 ? 0 : i / (colors.length - 1), opacity: 1 }
      : { opacity: 1, ...c },
  );
}

const DIRECTIONS = {
  'to-right': { x1: '0', y1: '0', x2: '1', y2: '0' },
  'to-left': { x1: '1', y1: '0', x2: '0', y2: '0' },
  'to-bottom': { x1: '0', y1: '0', x2: '0', y2: '1' },
  'to-top': { x1: '0', y1: '1', x2: '0', y2: '0' },
  'to-bottom-right': { x1: '0', y1: '0', x2: '1', y2: '1' },
  'to-top-right': { x1: '0', y1: '1', x2: '1', y2: '0' },
} as const;

export interface LinearGradientProps {
  /** Two or more colours, or explicit stops. */
  colors: GradientStop[];
  direction?: keyof typeof DIRECTIONS;
  /** Corner radius of the painted area. */
  radius?: number;
  /** Fill the parent absolutely (default) — put it first inside a `relative` container. */
  absoluteFill?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Cross-platform linear gradient drawn with react-native-svg — no native
 * gradient module and no CSS-only tricks, so it renders identically in React
 * Native and react-native-web.
 */
export function LinearGradient({ colors, direction = 'to-right', radius = 0, absoluteFill = true, className, style, children }: LinearGradientProps) {
  const id = `pk-lg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const stops = normalizeStops(colors);
  return (
    <View pointerEvents={children ? 'box-none' : 'none'} className={className} style={[absoluteFill && StyleSheet.absoluteFill, style]}>
      <Svg width="100%" height="100%" preserveAspectRatio="none" style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgLinearGradient id={id} {...DIRECTIONS[direction]}>
            {stops.map((s, i) => (
              <Stop key={i} offset={s.offset} stopColor={s.color} stopOpacity={s.opacity} />
            ))}
          </SvgLinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" rx={radius} ry={radius} fill={`url(#${id})`} />
      </Svg>
      {children}
    </View>
  );
}

export interface RadialGlowProps {
  color: string;
  /** Peak opacity of the glow. */
  intensity?: number;
  /** Centre of the glow as fractions of the box (may be outside 0–1). */
  cx?: number;
  cy?: number;
  /** Radii as fractions of the box. */
  rx?: number;
  ry?: number;
  style?: StyleProp<ViewStyle>;
}

/** Soft radial light, e.g. the green glow in the corner of the detail pane. */
export function RadialGlow({ color, intensity = 0.07, cx = -0.05, cy = 1.25, rx = 0.6, ry = 0.85, style }: RadialGlowProps) {
  const id = `pk-rg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgRadialGradient id={id} cx={cx * 100} cy={cy * 100} rx={rx * 100} ry={ry * 100} fx={cx * 100} fy={cy * 100} gradientUnits="userSpaceOnUse">
            <Stop offset={0} stopColor={color} stopOpacity={intensity} />
            <Stop offset={1} stopColor={color} stopOpacity={0} />
          </SvgRadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100" height="100" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}
