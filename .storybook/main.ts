import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    config.resolve = {
      ...config.resolve,
      alias: { ...config.resolve?.alias, 'react-native': 'react-native-web' },
      extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    };
    config.define = { ...config.define, __DEV__: true };
    return config;
  },
};
export default config;