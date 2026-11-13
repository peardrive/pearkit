import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{l as t}from"./iframe-CmcEqaQC.js";import{i as n,r}from"./react-BfaX7MxJ.js";import{a as i,o as a,s as o}from"./blocks-CtYECHkH.js";var s;function c(){return(c=e((()=>{s=`# React Native

pearkit components are React Native components — on iOS and Android there's no web layer at all. You need NativeWind configured so \`className\` works, \`react-native-svg\` for icons, and the Plus Jakarta Sans fonts.

## 1. NativeWind

Follow the [NativeWind v4 install guide](https://www.nativewind.dev/getting-started/installation). In short:

\`\`\`js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
\`\`\`

\`\`\`js
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = withNativeWind(getDefaultConfig(__dirname), { input: './global.css' });
\`\`\`

\`\`\`css
/* global.css */
@import 'pearkit/global.css';
\`\`\`

\`\`\`js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './node_modules/pearkit/src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset'), require('pearkit/tailwind-preset')],
};
\`\`\`

Metro resolves pearkit through its \`react-native\` field to the TypeScript sources, so your Babel config (with NativeWind) compiles them.

## 2. Fonts

The default theme expects the [Expo Google Fonts](https://github.com/expo/google-fonts) family names:

\`\`\`tsx
import { useFonts, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';

const [loaded] = useFonts({ PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold });
\`\`\`

Using other names or another font? Set \`theme.fonts.native\` — see [Theming → Fonts](./theming.md#fonts). Without fonts, text falls back to the system font with the right weights.

## 3. Clipboard

React Native has no built-in clipboard. Components that copy (\`LinkField\`, \`ShareLinkCard\`) take an \`onCopy\` prop:

\`\`\`tsx
import * as Clipboard from 'expo-clipboard';

<ShareLinkCard link={link} onCopy={(l) => Clipboard.setStringAsync(l)} />
\`\`\`

## 4. What's different on native

| Feature | Native behaviour |
| --- | --- |
| Hover states & tooltips | Tooltips open on long-press. \`hover:\` classes are ignored on touch devices. |
| \`WindowControls\`, \`DragRegion\`, \`app-region-*\` | Desktop-only. Don't render the controls on phones; the utilities are no-ops. |
| Sidebar resizing | Works with touch (PanResponder). Most phone layouts use a screen stack instead of a sidebar. |
| Shadows (\`glow\`, tooltip, window) | Use \`boxShadow\`, supported on the New Architecture (RN 0.76+). |

## 5. Mobile layouts

The **Layouts / PearDrop Mobile** stories show the same components re-arranged for phones: \`PaneHeader size="display"\` with a back button, \`FileHeader layout="vertical"\`, \`ShareLinkCard layout="vertical"\`, \`DangerZone layout="vertical"\`. See [\`examples/react-native\`](../examples/react-native) for an Expo app.
`})))()}function l(e){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{title:`Docs/React Native`}),`
`,(0,d.jsx)(i,{children:s})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;function f(){return(f=e((()=>{d=t(),r(),o(),c()})))()}f();export{u as default};