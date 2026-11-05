import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { pearkit } = require('../vite.js');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: [{ from: '../docs/assets', to: '/assets' }],
  async viteFinal(config) {
    // Drop Storybook's own React plugin; pearkit() adds one compiled against NativeWind.
    const own = (config.plugins ?? []).flat().filter(
      (p) => !(p && typeof p === 'object' && 'name' in p && String((p as { name: string }).name).startsWith('vite:react')),
    );
    config.plugins = [...pearkit(), ...own];
    return config;
  },
};
export default config;
