import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{l as t}from"./iframe-BhG_hyu7.js";import{i as n,r}from"./react-BfaX7MxJ.js";import{a as i,o as a,s as o}from"./blocks-pFsWHTTO.js";var s;function c(){return(c=e((()=>{s=`# Electron

In Electron, pearkit renders through \`react-native-web\`. The renderer is a normal Vite + React app; three things make it feel native: the Vite plugin, a frameless window, and the in-app window controls.

## 1. Vite (renderer)

\`\`\`ts
// vite.config.ts
import { defineConfig } from 'vite';
import { pearkit } from 'pearkit/vite';

export default defineConfig({
  plugins: [pearkit()],
});
\`\`\`

\`pearkit()\` adds \`@vitejs/plugin-react\` compiled against NativeWind (\`jsxImportSource: 'nativewind'\`), aliases \`react-native\` → \`react-native-web\`, prefers \`.web.*\` files, defines \`__DEV__\` and \`global\`, and works around two react-native packages that Vite can't parse out of the box. Pass \`pearkit({ react: false })\` if you configure the React plugin yourself.

Add PostCSS for Tailwind:

\`\`\`js
// postcss.config.js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
\`\`\`

Give the React root a flex container and load the font (bundled, works offline):

\`\`\`html
<style>html, body, #root { height: 100%; margin: 0 } #root { display: flex; flex-direction: column }</style>
\`\`\`

\`\`\`ts
// renderer entry
import '@fontsource/plus-jakarta-sans/500.css'; // + 400 / 600 / 700
import 'pearkit/global.css';
\`\`\`

## 2. Frameless window with in-app traffic lights

The PearDrop design puts the macOS traffic lights inside the sidebar. Hide the native ones and let \`<WindowControls/>\` draw them.

\`\`\`ts
// main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { attachPearkitWindowBridge, pearkitWindowOptions } from 'pearkit/electron';

attachPearkitWindowBridge({ ipcMain, BrowserWindow, zoomAction: 'fullscreen' });

app.whenReady().then(() => {
  const win = new BrowserWindow({
    ...pearkitWindowOptions(), // frame: false, hidden title bar, native traffic lights moved off-screen
    width: 1180,
    height: 760,
    minWidth: 860,
    minHeight: 560,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true },
  });
  win.loadURL(process.env.VITE_DEV_SERVER_URL ?? \`file://\${path.join(__dirname, '../dist/index.html')}\`);
});
\`\`\`

\`\`\`ts
// preload.ts
import { contextBridge, ipcRenderer } from 'electron';
import { exposePearkitWindowBridge } from 'pearkit/electron';

exposePearkitWindowBridge({ contextBridge, ipcRenderer });
\`\`\`

That's it — \`<WindowControls/>\` finds \`window.pearkit.window\` and:

- closes, minimises and zooms (full screen, or maximise with \`zoomAction: 'maximize'\`) the real window;
- dims to grey when the window loses focus, like native macOS;
- shows the ×, − and ⤢ glyphs on hover.

\`pearkit/electron\` takes Electron as arguments instead of importing it, so it never ends up in a React Native bundle.

### Without the bridge

Pass handlers yourself (any IPC you already have):

\`\`\`tsx
<WindowControls onClose={api.close} onMinimize={api.minimize} onZoom={api.toggleFullScreen} focused={isFocused} />
\`\`\`

Or use the hook to build your own controls: \`const { available, state, close, minimize, zoom } = useWindowControls();\`

### Windows & Linux

Check \`window.pearkit?.window?.platform\` and render your own caption buttons (or use \`titleBarOverlay\`) instead of the mac lights.

## 3. Drag regions

Frameless windows need explicit drag areas. pearkit marks the natural ones for you:

- \`SidebarHeader\` (where the traffic lights live) — on by default;
- \`PaneHeader dragRegion\` and \`Toolbar dragRegion\` — opt in.

Anything interactive inside (buttons, links, inputs, the resize handle) is automatically excluded via \`global.css\`. For custom title bars use \`<DragRegion>\` or the \`app-region-drag\` / \`app-region-no-drag\` utilities.

## 4. Resizable sidebar

\`\`\`tsx
const [width, setWidth] = useState(() => Number(localStorage.getItem('sidebar')) || 236);

<Sidebar
  resizable
  width={width}
  onWidthChange={setWidth}
  onResizeEnd={(w) => localStorage.setItem('sidebar', String(w))}
  minWidth={200}
  maxWidth={380}
>
\`\`\`

Drag the edge with the mouse, double-click it to reset, focus it and use ←/→, or drag far left to collapse to the icon rail.

## Full example

See [\`examples/electron\`](../examples/electron) for a complete main / preload / renderer setup.
`})))()}function l(e){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{title:`Docs/Electron`}),`
`,(0,d.jsx)(i,{children:s})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;function f(){return(f=e((()=>{d=t(),r(),o(),c()})))()}f();export{u as default};