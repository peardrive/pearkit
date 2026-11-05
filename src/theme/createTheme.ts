import { colorTokenNames, type Theme, type ThemeColors, type ThemeFonts } from './tokens';
import { darkTheme } from './themes';

export interface ThemeOverrides {
  name?: string;
  scheme?: Theme['scheme'];
  colors?: Partial<ThemeColors>;
  fonts?: Partial<ThemeFonts>;
}

/**
 * Derive a theme from a base theme. Only the tokens you pass are replaced.
 *
 * ```ts
 * const blueberry = createTheme(darkTheme, {
 *   name: 'blueberry',
 *   colors: { primary: '#60a5fa', 'primary-strong': '#6366f1', selected: '#1e2a4a' },
 * });
 * ```
 */
export function createTheme(base: Theme = darkTheme, overrides: ThemeOverrides = {}): Theme {
  return {
    name: overrides.name ?? `${base.name}-custom`,
    scheme: overrides.scheme ?? base.scheme,
    colors: { ...base.colors, ...overrides.colors },
    fonts: {
      ...base.fonts,
      ...overrides.fonts,
      native: { ...base.fonts.native, ...overrides.fonts?.native },
    },
  };
}

/** `#a6ce39` → `"166 206 57"` (the channel format the Tailwind preset expects). */
export function hexToChannels(hex: string): string {
  let h = hex.trim().replace('#', '');
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) {
    throw new Error(`[pearkit] Theme colours must be hex strings, received "${hex}"`);
  }
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Map a theme to the `--pk-*` CSS variables consumed by the Tailwind preset. */
export function themeToCssVariables(theme: Theme): Record<`--pk-${string}`, string> {
  const vars: Record<string, string> = {};
  for (const token of colorTokenNames) vars[`--pk-${token}`] = hexToChannels(theme.colors[token]);
  return vars as Record<`--pk-${string}`, string>;
}

/** Hex colour with alpha → `rgba()` string. Useful for SVG fills & native shadows. */
export function withAlpha(hex: string, alpha: number): string {
  return `rgba(${hexToChannels(hex).split(' ').join(', ')}, ${alpha})`;
}
