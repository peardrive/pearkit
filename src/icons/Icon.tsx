import React, { useId } from 'react';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { embossGradient } from '../theme/emboss';
import type { ColorToken } from '../theme/tokens';
import { iconRegistry, type IconName } from './registry';

export interface IconProps {
  name: IconName;
  /** Pixel size (icons are square). Default 16. */
  size?: number;
  /** Theme token to colour the icon with. Default `icon`. Ignored when `color` is set. */
  tone?: ColorToken;
  /** Any CSS/RN colour string — wins over `tone`. */
  color?: string;
  /** Override the stroke width of outline icons (the source grid is 24px / 1.5). */
  strokeWidth?: number;
  /**
   * The raised look of the dock and the glass bars: the glyph painted with a barely-there gradient (a touch
   * lighter at the top), a soft highlight along its top edge and a soft shadow under its bottom one. Meant for
   * the filled icons (`home`, `bell-fill`, `folder-fill`…); an outline icon only gets the gradient.
   */
  emboss?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  /** Make the icon visible to screen readers. Decorative (hidden) by default. */
  accessibilityLabel?: string;
}

type PathDef = {
  d: string; stroke?: boolean; fill?: boolean; evenodd?: boolean; strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square'; strokeLinejoin?: 'round' | 'miter' | 'bevel'; strokeMiterlimit?: number;
};

/**
 * Renders a glyph from the pearkit icon set with `react-native-svg`
 * (works on iOS, Android, web and Electron).
 */
export function Icon({ name, size = 16, tone = 'icon', color, strokeWidth, emboss, className, style, accessibilityLabel }: IconProps) {
  const theme = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const def = iconRegistry[name];
  if (!def) {
    if (__DEV__) console.warn(`[pearkit] Unknown icon "${String(name)}"`);
    return null;
  }
  const c = color ?? theme.colors[tone];
  const paint = emboss ? `url(#pk-emboss-${id})` : c;
  const gradient = emboss ? embossGradient(c) : null;
  const paths = (fillWith: string, strokeWith: string) =>
    (def.paths as readonly PathDef[]).map((sp, i) => (
      <Path
        key={i}
        d={sp.d}
        fill={sp.fill ? fillWith : 'none'}
        fillRule={sp.evenodd ? 'evenodd' : undefined}
        stroke={sp.stroke ? strokeWith : undefined}
        strokeWidth={sp.stroke ? (strokeWidth ?? sp.strokeWidth) : undefined}
        strokeLinecap={sp.strokeLinecap}
        strokeLinejoin={sp.strokeLinejoin}
        strokeMiterlimit={sp.strokeMiterlimit}
      />
    ));
  // The emboss lifts the glyph by 0.6 of a grid unit: a shadow copy sits that far below it and a highlight copy
  // that far above, each showing along one edge only. Enough to be felt at 20 px, not enough to be seen.
  const lift = 0.6;
  return (
    <View
      className={className}
      style={[{ width: size, height: size }, style]}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      importantForAccessibility={accessibilityLabel ? 'yes' : 'no-hide-descendants'}
      pointerEvents="none"
    >
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {gradient ? (
          <Defs>
            <LinearGradient id={`pk-emboss-${id}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={gradient.top} />
              <Stop offset="1" stopColor={gradient.bottom} />
            </LinearGradient>
          </Defs>
        ) : null}
        {emboss ? <G opacity={0.3} transform={`translate(0 ${lift})`}>{paths('#000000', '#000000')}</G> : null}
        {emboss ? <G opacity={0.22} transform={`translate(0 ${-lift})`}>{paths('#ffffff', '#ffffff')}</G> : null}
        {paths(paint, paint)}
      </Svg>
    </View>
  );
}

/** Anything that can be passed where pearkit accepts an icon: a name or your own element. */
export type IconSource = IconName | React.ReactElement;

/** Render an `IconSource` with default props applied to named icons. */
export function renderIcon(icon: IconSource | undefined | null, defaults: Omit<IconProps, 'name'> = {}) {
  if (icon == null) return null;
  if (typeof icon === 'string') return <Icon name={icon} {...defaults} />;
  return icon;
}
