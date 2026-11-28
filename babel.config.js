/**
 * Used by react-native-builder-bob when compiling `lib/` (targets set `configFile: true`).
 * JSX is compiled against NativeWind's runtime so `className` keeps working in
 * consumers no matter how they bundle pearkit (Metro, Vite, webpack).
 * Storybook does not use this file — its Vite config sets `jsxImportSource` instead.
 */
module.exports = {
  presets: ['module:react-native-builder-bob/babel-preset'],
  plugins: [
    // `@/…` is this repo's own shorthand for `src/…`. It is resolved here so the published
    // `lib/` never contains an alias a consumer would have to configure (see
    // scripts/fix-alias-declarations.mjs for the matching rewrite of `.d.ts` files).
    ['module-resolver', { root: ['.'], alias: { '@': './src' }, extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] }],
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic', importSource: 'nativewind' }],
  ],
};
