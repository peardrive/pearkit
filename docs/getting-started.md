# Getting started

pearkit is a React component library that runs unchanged in **React Native** (iOS / Android) and in **Electron** (through `react-native-web`). It's styled with **Tailwind CSS** via **NativeWind 4** and themed with runtime CSS variables.

## 1. Install

pearkit is installed from its GitHub repository:

```bash
npm install github:peardrive/pearkit
```

Peer dependencies (install the ones your platform needs):

```bash
# everywhere
npm install react nativewind@^4.1 tailwindcss@^3.4 react-native-svg

# Electron / web
npm install react-dom react-native-web @vitejs/plugin-react vite

# React Native
npm install react-native react-native-reanimated   # reanimated is a NativeWind peer
```

## 2. Configure Tailwind

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    // let Tailwind see the classes used inside pearkit
    './node_modules/pearkit/src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset'), require('pearkit/tailwind-preset')],
};
```

The preset adds the colour tokens (`bg-primary`, `text-muted`, `border-overlay/[0.08]`…), the PearDrop type scale (`text-body`, `text-caption`, `text-overline`…), radii and the `app-region-drag` utilities for Electron.

## 3. Import the global stylesheet once

```ts
import 'pearkit/global.css';
```

## 4. Wrap your app in `ThemeProvider`

```tsx
import { ThemeProvider, Button } from 'pearkit';

export default function App() {
  return (
    <ThemeProvider theme="dark">
      <Button variant="primary" icon="arrow-up" label="Send" />
    </ThemeProvider>
  );
}
```

`theme` accepts `'dark'`, `'light'`, `'system'` or any theme object — see [Theming](./theming.md).

## 5. Platform setup

- **Electron** — add the Vite plugin and wire the window controls: [Electron guide](./electron.md).
- **React Native** — add NativeWind's Babel/Metro config and load the fonts: [React Native guide](./react-native.md).

## Using components

Every component:

- accepts `className` (merged with `tailwind-merge`, so your classes win) and `style`;
- takes theme **tokens** for colours (`tone="primary"`, `iconTone="accent"`) rather than hex values;
- accepts icons as a name (`icon="copy"`) or any element (`icon={<MyIcon />}`);
- is accessible by default (roles, labels, states, keyboard where it applies).

```tsx
<ShareRow
  name="photo_2.mp4"
  meta={['Video', '1.2 GB', '3 peers']}
  thumbnail={{ source: { uri: thumbUrl }, kind: 'video' }}
  status="sharing"
  progress={0.98}
  timestamp="now"
  selected
  onPress={() => select(id)}
  className="mb-1"
/>
```

Browse every component, its props and live examples in Storybook: `npm run storybook`.
