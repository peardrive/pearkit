# pearkit × Electron

A frameless Electron window rendering pearkit through `react-native-web`, with the macOS traffic lights drawn inside the sidebar and a resizable sidebar whose width is persisted.

```bash
cd examples/electron
npm install
npm run dev
```

| File | What to look at |
| --- | --- |
| `vite.config.ts` | `pearkit()` — React + NativeWind, `react-native` → `react-native-web`. |
| `src/main/main.ts` | `pearkitWindowOptions()` + `attachPearkitWindowBridge()`. |
| `src/main/preload.ts` | `exposePearkitWindowBridge()`. |
| `src/renderer/App.tsx` | The three-pane PearDrop shell built from pearkit components. |

See [docs/electron.md](../../docs/electron.md) for the full guide.
