import React, { useEffect, useRef } from 'react';
import type { Preview } from '@storybook/react-vite';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '../global.css';
import { ThemeProvider } from '../src/theme';
import { storybookThemes } from './themes';

/* Scroll bars inside a preview stay out of the way: a thin thumb, shown only while the pointer is over the thing that
   scrolls. A preview shown in a frame (Pearkit Studio stacks several on a page) would otherwise be a wall of them. */
const QUIET_SCROLLBARS = `
  * { scrollbar-width: thin; scrollbar-color: transparent transparent; }
  *:hover { scrollbar-color: rgb(128 128 128 / 0.45) transparent; }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: transparent; border-radius: 4px; }
  *:hover::-webkit-scrollbar-thumb { background: rgb(128 128 128 / 0.45); }
`;

function ThemedCanvas({ themeName, storyId, children }: { themeName: string; storyId: string; children: React.ReactNode }) {
  const theme = storybookThemes[themeName] ?? storybookThemes.dark;
  const content = useRef<HTMLDivElement>(null);
  // Tell whoever frames this preview how tall the story is, so the frame can fit it (Pearkit Studio).
  useEffect(() => {
    const el = content.current;
    if (!el || window.parent === window || typeof ResizeObserver === 'undefined') return;
    // The wrapper takes no part in layout (display: contents), so a story that fills its frame still does; the
    // story's height is where its own elements end. A story that fills the frame reports the frame's height.
    const say = () => {
      const kids = [...el.children];
      if (!kids.length) return;
      const bottom = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom));
      const top = Math.min(...kids.map((k) => k.getBoundingClientRect().top));
      window.parent.postMessage({ type: 'pearkit-preview-size', id: storyId, height: Math.ceil(bottom - Math.min(top, 16) + 16 + window.scrollY) }, '*');
    };
    const ro = new ResizeObserver(say);
    for (const k of el.children) ro.observe(k);
    ro.observe(document.body);
    say();
    return () => ro.disconnect();
  }, [storyId]);
  // Paint the whole iframe so padded stories don't sit on white.
  useEffect(() => {
    document.body.style.background = theme.colors.background;
    document.documentElement.style.colorScheme = theme.scheme;
  }, [theme]);
  return (
    <ThemeProvider theme={theme} className="min-h-full bg-background" style={{ minHeight: '100vh' }}>
      <style>{QUIET_SCROLLBARS}</style>
      <div ref={content} style={{ display: 'contents' }}>
        {children}
      </div>
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
      <ThemedCanvas themeName={ctx.globals.theme ?? 'dark'} storyId={ctx.id}>
        <Story />
      </ThemedCanvas>
    ),
  ],
};
export default preview;
