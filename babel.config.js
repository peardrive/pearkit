/**
 * Used by react-native-builder-bob when compiling `lib/` (targets set `configFile: true`).
 * JSX is compiled against NativeWind's runtime so `className` keeps working in
 * consumers no matter how they bundle pearkit (Metro, Vite, webpack).
 * Storybook does not use this file — its Vite config sets `jsxImportSource` instead.
 */
module.exports = {
  presets: ['module:react-native-builder-bob/babel-preset'],
  plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic', importSource: 'nativewind' }]],
};
