import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '../global.css';
import { ThemeProvider } from '../src/theme';
import { storybookThemes } from './themes';

function ThemedCanvas({ themeName, children }: { themeName: string; children: React.ReactNode }) {
  const theme = storybookThemes[themeName] ?? storybookThemes.dark;
  // Paint the whole iframe so padded stories don't sit on white.
  useEffect(() => {
    document.body.style.background = theme.colors.background;
    document.documentElement.style.colorScheme = theme.scheme;
  }, [theme]);
  return (
    <ThemeProvider theme={theme} className="min-h-full bg-background" style={{ minHeight: '100vh' }}>
      {children}
    </ThemeProvider>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'pearkit theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Pear Dark (default)' },
          { value: 'light', title: 'Pear Light' },
          { value: 'blueberry', title: 'Blueberry (custom)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i }, expanded: true },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: ['Introduction', 'Docs', 'Foundations', 'Components', 'Patterns', 'Layouts', '*'],
      },
    },
    docs: { codePanel: true },
  },
  decorators: [
    (Story, ctx) => (
      <ThemedCanvas themeName={ctx.globals.theme ?? 'dark'}>
        <Story />
      </ThemedCanvas>
    ),
  ],
};
export default preview;
