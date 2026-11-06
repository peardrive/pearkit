import type { Theme, ThemeFonts } from './tokens';

export const plusJakartaSans: ThemeFonts = {
  web: '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  native: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semibold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
  },
};

/** The PearDrop desktop look (Figma: “Desktop v7 — Concept”). */
export const darkTheme: Theme = {
  name: 'pear-dark',
  scheme: 'dark',
  fonts: plusJakartaSans,
  colors: {
    background: '#09080d',
    pane: '#0d0c11',
    sidebar: '#17171b',
    'sidebar-to': '#111013',
    overlay: '#ffffff',
    inset: '#000000',
    tooltip: '#2a2a2e',
    'tooltip-foreground': '#ffffff',

    foreground: '#ffffff',
    muted: '#9ca3af',
    subtle: '#6b7280',
    icon: '#9f9f9f',
    'icon-strong': '#c8c8c8',

    primary: '#a6ce39',
    'primary-foreground': '#0b0b0c',
    'primary-strong': '#3eb679',
    'primary-text': '#a6ce39',
    selected: '#3c4b15',

    success: '#34d399',
    warning: '#fbbf24',
    danger: '#ef4444',
    'danger-foreground': '#fafafa',
    neutral: '#6b7280',
    info: '#60a5fa',
    accent: '#2dd4bf',
    favorite: '#f5c907',

    'window-close': '#ed6a5f',
    'window-minimize': '#f5bf4f',
    'window-maximize': '#61c554',
    'window-inactive': '#3a3a3f',

    'qr-background': '#ffffff',
    'qr-foreground': '#0b0b0c',

    playhead: '#ffd60a',
  },
};

/** Light counterpart, tuned for contrast on white surfaces. */
export const lightTheme: Theme = {
  name: 'pear-light',
  scheme: 'light',
  fonts: plusJakartaSans,
  colors: {
    background: '#ffffff',
    pane: '#fafafa',
    sidebar: '#f4f4f6',
    'sidebar-to': '#ececef',
    overlay: '#000000',
    inset: '#ffffff',
    tooltip: '#18181b',
    'tooltip-foreground': '#ffffff',

    foreground: '#0b0b0c',
    muted: '#52525b',
    subtle: '#8a8f98',
    icon: '#6b6b72',
    'icon-strong': '#3f3f46',

    primary: '#a6ce39',
    'primary-foreground': '#0b0b0c',
    'primary-strong': '#3eb679',
    'primary-text': '#5b8512',
    selected: '#e6f2c4',

    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    'danger-foreground': '#ffffff',
    neutral: '#71717a',
    info: '#2563eb',
    accent: '#0d9488',
    favorite: '#eab308',

    'window-close': '#ed6a5f',
    'window-minimize': '#f5bf4f',
    'window-maximize': '#61c554',
    'window-inactive': '#d4d4d8',

    'qr-background': '#ffffff',
    'qr-foreground': '#0b0b0c',

    playhead: '#d9a400',
  },
};

export const themes = { dark: darkTheme, light: lightTheme } as const;
