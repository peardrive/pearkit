import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
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
  className?: string;
  style?: StyleProp<ViewStyle>;
  /** Make the icon visible to screen readers. Decorative (hidden) by default. */
  accessibilityLabel?: string;
}

/**
 * Renders a glyph from the pearkit icon set with `react-native-svg`
 * (works on iOS, Android, web and Electron).
 */
export function Icon({ name, size = 16, tone = 'icon', color, strokeWidth, className, style, accessibilityLabel }: IconProps) {
  const theme = useTheme();
  const def = iconRegistry[name];
  if (!def) {
    if (__DEV__) console.warn(`[pearkit] Unknown icon "${String(name)}"`);
    return null;
  }
  const c = color ?? theme.colors[tone];
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
        {def.paths.map((p, i) => {
          const sp = p as {
            d: string; stroke?: boolean; fill?: boolean; strokeWidth?: number;
            strokeLinecap?: 'round' | 'butt' | 'square'; strokeLinejoin?: 'round' | 'miter' | 'bevel'; strokeMiterlimit?: number;
          };
          return (
            <Path
              key={i}
              d={sp.d}
              fill={sp.fill ? c : 'none'}
              stroke={sp.stroke ? c : undefined}
              strokeWidth={sp.stroke ? (strokeWidth ?? sp.strokeWidth) : undefined}
              strokeLinecap={sp.strokeLinecap}
              strokeLinejoin={sp.strokeLinejoin}
              strokeMiterlimit={sp.strokeMiterlimit}
            />
          );
        })}
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
