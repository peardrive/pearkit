import { createTheme, darkTheme, lightTheme, type Theme } from '../src/theme';

/** Example of a fully custom theme built from the dark base. */
export const blueberryTheme = createTheme(darkTheme, {
  name: 'blueberry',
  colors: {
    background: '#0a0c14',
    pane: '#0d1019',
    sidebar: '#151a28',
    'sidebar-to': '#0f121c',
    primary: '#7aa2ff',
    'primary-strong': '#8b5cf6',
    'primary-text': '#93b4ff',
    'primary-foreground': '#0a0c14',
    selected: '#1f2a4d',
    accent: '#a78bfa',
  },
});

export const storybookThemes: Record<string, Theme> = {
  dark: darkTheme,
  light: lightTheme,
  blueberry: blueberryTheme,
};
