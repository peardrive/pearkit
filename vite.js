/**
 * pearkit/vite — everything a Vite app (Electron renderer, web) needs to run
 * pearkit + NativeWind on top of react-native-web.
 *
 *   // vite.config.ts (Electron renderer)
 *   import { defineConfig } from 'vite';
 *   import { pearkit } from 'pearkit/vite';
 *   export default defineConfig({ plugins: [pearkit()] });
 *
 * What it does:
 *  - adds @vitejs/plugin-react with `jsxImportSource: 'nativewind'`
 *  - aliases `react-native` → `react-native-web` and prefers `.web.*` files
 *  - defines `__DEV__`, `process.env.NODE_ENV` and `global` expected by RN packages
 *  - patches react-native-css-interop's JSX-in-.js “doctor” check that Vite's parser rejects
 *  - stubs react-native-svg's native-only sound module
 */
const DOCTOR_RE = /react-native-css-interop[\\/]dist[\\/]doctor\.js$/;
const JSX_CHECK = /<react-native-css-interop-jsx-pragma-check\s*\/>\s*===\s*true/;

const WEB_EXTENSIONS = ['.web.tsx', '.web.ts', '.web.mjs', '.web.js', '.tsx', '.ts', '.mjs', '.js', '.jsx', '.json'];

const SVG_SOUND_RE = /NativeSvgSoundModule(\.js)?$/;
const SVG_SOUND_STUB = '\0pearkit:svg-sound-stub';

/**
 * Rolldown/Vite plugin smoothing over react-native packages on the web:
 *  - neutralises react-native-css-interop's JSX-in-.js doctor expression
 *  - stubs react-native-svg's native sound TurboModule (not exported by react-native-web)
 */
function cssInteropDoctorFix() {
  return {
    name: 'pearkit:rnw-compat',
    enforce: 'pre',
    resolveId(source, importer) {
      if (SVG_SOUND_RE.test(source) && importer && /react-native-svg/.test(importer)) return SVG_SOUND_STUB;
      return null;
    },
    load(id) {
      if (id === SVG_SOUND_STUB) return 'export default null;';
      return null;
    },
    transform(code, id) {
      if (DOCTOR_RE.test(id) && JSX_CHECK.test(code)) return { code: code.replace(JSX_CHECK, 'true'), map: null };
      return null;
    },
  };
}

/**
 * @param {{ react?: boolean | object, reactNativeWeb?: boolean }} [options]
 *   react: pass `false` if you add @vitejs/plugin-react yourself (remember `jsxImportSource: 'nativewind'`),
 *          or an options object forwarded to it.
 */
function pearkit(options = {}) {
  const plugins = [cssInteropDoctorFix()];
  if (options.react !== false) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const reactPlugin = require('@vitejs/plugin-react');
    const react = reactPlugin.default ?? reactPlugin;
    plugins.push(react({ jsxImportSource: 'nativewind', ...(typeof options.react === 'object' ? options.react : {}) }));
  }
  plugins.push({
    name: 'pearkit:config',
    config(config, env) {
      const rnw = options.reactNativeWeb !== false;
      return {
        resolve: {
          alias: rnw
            ? {
                'react-native': 'react-native-web',
                // react-native-svg's web image resolver expects RN's asset registry; RNW ships an equivalent.
                '@react-native/assets-registry/registry': 'react-native-web/dist/modules/AssetRegistry/index.js',
              }
            : {},
          extensions: WEB_EXTENSIONS,
        },
        define: {
          // react-native-web (Animated) and some RN packages reference Node's `global`.
          global: 'globalThis',
          __DEV__: JSON.stringify(env.mode !== 'production'),
          'process.env.NODE_ENV': JSON.stringify(env.mode === 'production' ? 'production' : 'development'),
        },
        optimizeDeps: {
          include: ['react-native-web', 'nativewind', 'react-native-css-interop', 'react-native-svg'],
          exclude: ['react-native'],
          // The dependency pre-bundler doesn't inherit resolve.extensions: without
          // this it picks native entry points (e.g. react-native-svg's Fabric
          // modules importing TurboModuleRegistry), which crash in `vite dev`.
          rolldownOptions: { plugins: [cssInteropDoctorFix()], resolve: { extensions: WEB_EXTENSIONS } },
        },
      };
    },
  });
  return plugins;
}

module.exports = { pearkit, cssInteropDoctorFix };
module.exports.default = pearkit;
