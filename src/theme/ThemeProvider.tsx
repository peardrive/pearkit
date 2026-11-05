import React, { createContext, useContext, useMemo } from 'react';
import { Platform, useColorScheme, View, type StyleProp, type ViewStyle } from 'react-native';
import { vars } from 'nativewind';
import { cn } from '../utils/cn';
import { createTheme, themeToCssVariables, type ThemeOverrides } from './createTheme';
import { darkTheme, lightTheme } from './themes';
import type { Theme } from './tokens';

const ThemeContext = createContext<Theme>(darkTheme);

export type ThemeInput = Theme | 'dark' | 'light' | 'system';

export interface ThemeProviderProps {
  /** A theme object, a built-in theme name, or `'system'` to follow the OS. Default `'dark'`. */
  theme?: ThemeInput;
  /** Patch individual tokens without building a full theme. */
  overrides?: ThemeOverrides;
  /** Themes used when `theme="system"`. */
  systemThemes?: { light: Theme; dark: Theme };
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Provides the theme to every pearkit component below it.
 *
 * It renders a single `View` carrying the `--pk-*` CSS variables, so themes can
 * be nested (e.g. a light card inside a dark app) and switched at runtime
 * without rebuilding Tailwind.
 */
export function ThemeProvider({
  theme = 'dark',
  overrides,
  systemThemes = { light: lightTheme, dark: darkTheme },
  children,
  className,
  style,
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();

  const resolved = useMemo(() => {
    let base: Theme;
    if (theme === 'system') base = systemScheme === 'light' ? systemThemes.light : systemThemes.dark;
    else if (theme === 'dark') base = darkTheme;
    else if (theme === 'light') base = lightTheme;
    else base = theme;
    return overrides ? createTheme(base, { name: base.name, ...overrides }) : base;
  }, [theme, overrides, systemScheme, systemThemes]);

  const cssVars = useMemo(() => vars(themeToCssVariables(resolved)), [resolved]);
  const webScheme = Platform.OS === 'web' ? ({ colorScheme: resolved.scheme } as ViewStyle) : null;

  return (
    <ThemeContext.Provider value={resolved}>
      <View className={cn('flex-1', className)} style={[cssVars, webScheme, style]}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

/** The active, fully-resolved theme. */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}

/** Shortcut for a single colour token's hex value. */
export function useThemeColor(token: keyof Theme['colors']): string {
  return useContext(ThemeContext).colors[token];
}
