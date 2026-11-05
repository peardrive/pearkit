# pearkit × React Native (Expo)

The same components as the desktop app, arranged as a phone screen stack (list → detail). No web code runs here.

```bash
cd examples/react-native
npm install
npx expo run:ios     # or run:android — pearkit uses react-native-svg, so use a dev build rather than Expo Go if versions differ
```

| File | What to look at |
| --- | --- |
| `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css` | NativeWind + pearkit preset. |
| `App.tsx` | Fonts via `@expo-google-fonts/plus-jakarta-sans`, clipboard via `expo-clipboard`, the two screens. |

See [docs/react-native.md](../../docs/react-native.md) for the full guide.
