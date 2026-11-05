import React from 'react';
import { Platform, Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { fontWeightValue, type ColorToken, type FontWeightName } from '../../theme/tokens';
import { textTone } from '../../theme/tones';

export type TextVariant =
  | 'display' // 21 / bold — detail hero title
  | 'title' // 18 / bold — pane titles
  | 'body-lg' // 13.5 / semibold — row & card titles
  | 'body' // 13 / medium — nav items, buttons
  | 'body-sm' // 12.5 / medium — small buttons, inputs
  | 'label' // 12 / medium — meta, key/value rows
  | 'caption' // 11.5 / medium — secondary lines
  | 'micro' // 11 / medium — timestamps, pills
  | 'overline'; // 10.5 / semibold / uppercase / tracked — section labels

const variantClass: Record<TextVariant, string> = {
  display: 'text-display',
  title: 'text-title',
  'body-lg': 'text-body-lg',
  body: 'text-body',
  'body-sm': 'text-body-sm',
  label: 'text-label',
  caption: 'text-caption',
  micro: 'text-micro',
  overline: 'text-overline uppercase tracking-[0.84px]',
};

const variantWeight: Record<TextVariant, FontWeightName> = {
  display: 'bold',
  title: 'bold',
  'body-lg': 'semibold',
  body: 'medium',
  'body-sm': 'medium',
  label: 'medium',
  caption: 'medium',
  micro: 'medium',
  overline: 'semibold',
};

const variantTone: Record<TextVariant, ColorToken> = {
  display: 'foreground',
  title: 'foreground',
  'body-lg': 'foreground',
  body: 'foreground',
  'body-sm': 'foreground',
  label: 'foreground',
  caption: 'muted',
  micro: 'subtle',
  overline: 'subtle',
};

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: FontWeightName;
  /** Colour token. Defaults depend on the variant (captions are muted, overlines subtle…). */
  tone?: ColorToken;
  /** Single line with ellipsis. Shorthand for `numberOfLines={1}`. */
  truncate?: boolean;
  className?: string;
}

/**
 * Typography primitive. Handles the per-platform font plumbing: on web the
 * theme's CSS family + `font-weight`; on native the registered family for
 * each weight (`theme.fonts.native`).
 */
export const Text = React.forwardRef<React.ComponentRef<typeof RNText>, TextProps>(function Text(
  { variant = 'body', weight, tone, truncate, className, style, numberOfLines, ...rest },
  ref,
) {
  const theme = useTheme();
  const w = weight ?? variantWeight[variant];
  const nativeFamily = theme.fonts.native?.[w];
  const fontStyle: TextStyle =
    Platform.OS === 'web'
      ? { fontFamily: theme.fonts.web, fontWeight: fontWeightValue[w] }
      : nativeFamily
        ? { fontFamily: nativeFamily }
        : { fontWeight: fontWeightValue[w] };

  return (
    <RNText
      ref={ref}
      numberOfLines={truncate ? 1 : numberOfLines}
      className={cn(variantClass[variant], textTone[tone ?? variantTone[variant]], className)}
      style={[fontStyle, style]}
      {...rest}
    />
  );
}) as React.ForwardRefExoticComponent<TextProps & React.RefAttributes<React.ComponentRef<typeof RNText>>>;
