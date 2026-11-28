import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { pearkit } = require('../vite.js');

// `@/…` is the repo's shorthand for `src/…` (tsconfig paths); Vite has to be told.
const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');
const srcAlias = { find: /^@\//, replacement: `${srcDir.replace(/\\/g, '/')}/` };

/**
 * A piece's category is the folder it lives in, and its Storybook section is that folder's
 * `titlePrefix`. Moving a folder between categories moves the story with it: there is no
 * category string to keep in sync, and so nothing for a test to check.
 */
const COMPONENT_CATEGORIES = {
  foundations: 'Foundations',
  buttons: 'Buttons',
  input: 'Input',
  feedback: 'Feedback',
  people: 'People',
  files: 'Files',
  media: 'Media',
  conversation: 'Conversation',
  frame: 'Frame',
  tools: 'Tools',
};

const config: StorybookConfig = {
  stories: [
    ...Object.entries(COMPONENT_CATEGORIES).map(([directory, titlePrefix]) => ({
      directory: `../src/components/${directory}`,
      titlePrefix,
      files: '**/*.stories.@(ts|tsx)',
    })),
    '../src/**/*.mdx',
    // Whole screens and the internal README story keep explicit `Layouts/…` and `Internal/…` titles.
    '../src/stories/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: [{ from: '../docs/assets', to: '/assets' }],
  async viteFinal(config) {
    // Drop Storybook's own React plugin; pearkit() adds one compiled against NativeWind.
    const own = (config.plugins ?? []).flat().filter(
      (p) => !(p && typeof p === 'object' && 'name' in p && String((p as { name: string }).name).startsWith('vite:react')),
    );
    config.plugins = [...pearkit(), ...own];
    const current = config.resolve?.alias;
    const aliases = Array.isArray(current)
      ? current
      : Object.entries(current ?? {}).map(([find, replacement]) => ({ find, replacement }));
    config.resolve = { ...config.resolve, alias: [...aliases, srcAlias] };
    return config;
  },
};
export default config;
