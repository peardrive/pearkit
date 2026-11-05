/**
 * Design tokens.
 *
 * Every colour token is exposed three ways:
 *  1. As a hex string on the resolved theme (`useTheme().colors.primary`) for
 *     places that need a raw value (SVG icons, gradients, native shadows).
 *  2. As a CSS variable `--pk-<token>` holding space-separated RGB channels,
 *     injected by <ThemeProvider/> (works on web and on native via NativeWind `vars()`).
 *  3. As a Tailwind colour (`bg-primary`, `text-muted`, `border-overlay/[0.08]`)
 *     via `pearkit/tailwind-preset`, which reads the CSS variable so opacity
 *     modifiers keep working.
 */
export const colorTokenNames = [
  // Surfaces
  'background', // window / detail pane
  'pane', // list pane
  'sidebar', // sidebar gradient start
  'sidebar-to', // sidebar gradient end
  'overlay', // tint used with opacity for hover / cards / borders (white on dark, black on light)
  'inset', // recessed fields (link field)
  'tooltip',
  'tooltip-foreground',
  // Text & icons
  'foreground',
  'muted', // secondary text
  'subtle', // tertiary text, section labels
  'icon',
  'icon-strong',
  // Brand
  'primary',
  'primary-foreground',
  'primary-strong', // gradient partner of primary
  'primary-text', // primary used as text on the background (contrast-safe)
  'selected', // selected nav item / row background
  // Status
  'success',
  'warning',
  'danger',
  'danger-foreground',
  'neutral',
  'info',
  'accent', // folders
  'favorite',
  // Window chrome
  'window-close',
  'window-minimize',
  'window-maximize',
  'window-inactive',
  // QR
  'qr-background',
  'qr-foreground',
] as const;

export type ColorToken = (typeof colorTokenNames)[number];
export type ThemeColors = Record<ColorToken, string>;

export type FontWeightName = 'regular' | 'medium' | 'semibold' | 'bold';

export interface ThemeFonts {
  /** Font family used on web / Electron (CSS family name). Weights are applied with `font-weight`. */
  web: string;
  /**
   * Font family per weight on native, where every weight is usually a separate
   * registered font (e.g. the names exported by `@expo-google-fonts/plus-jakarta-sans`).
   * Omit to fall back to the system font.
   */
  native?: Partial<Record<FontWeightName, string>>;
}

export interface Theme {
  /** Unique name, handy for persistence & debugging. */
  name: string;
  /** Used for status bar style, `color-scheme` and as the base for `createTheme`. */
  scheme: 'light' | 'dark';
  colors: ThemeColors;
  fonts: ThemeFonts;
}

export const fontWeightValue: Record<FontWeightName, '400' | '500' | '600' | '700'> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};
