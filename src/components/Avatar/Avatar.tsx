import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import type { Theme } from '../../theme/tokens';
import { LinearGradient } from '../Gradient/LinearGradient';
import { Text } from '../Text/Text';

/** Gradient pairs for generated avatars (first three come from the Figma peer chips). */
export const avatarPalette = (theme: Theme): [string, string][] => [
  [theme.colors.primary, theme.colors['primary-strong']],
  [theme.colors.info, theme.colors.accent],
  ['#f0a46a', theme.colors.danger],
  [theme.colors.warning, '#f0a46a'],
  ['#a78bfa', theme.colors.info],
  [theme.colors.accent, theme.colors.success],
];

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h);
}

export interface AvatarProps {
  /** Any stable string (peer key, user id). Picks the gradient deterministically. */
  seed: string;
  size?: number;
  /** Explicit gradient. */
  colors?: [string, string];
  /** Initials / short label drawn on top. */
  label?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** Deterministic gradient avatar for peers and devices. */
export function Avatar({ seed, size = 18, colors, label, className, style, accessibilityLabel }: AvatarProps) {
  const theme = useTheme();
  const palette = avatarPalette(theme);
  const pair = colors ?? palette[hash(seed) % palette.length];
  return (
    <View
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      className={cn('items-center justify-center overflow-hidden rounded-full', className)}
      style={[{ width: size, height: size }, style]}
    >
      <LinearGradient colors={pair} direction="to-bottom-right" radius={size / 2} />
      {label ? (
        <Text weight="bold" tone="primary-foreground" style={{ fontSize: Math.max(8, size * 0.42) }}>
          {label.slice(0, 2).toUpperCase()}
        </Text>
      ) : null}
    </View>
  );
}
