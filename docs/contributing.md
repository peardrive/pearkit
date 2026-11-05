# Contributing

## Setup

```bash
npm install
npm run storybook       # http://localhost:6006
npm run typecheck
npm run build-storybook # static Storybook in storybook-static/
npm run prepare         # build lib/ with react-native-builder-bob
```

## Project layout

```
src/
  theme/          tokens, built-in themes, createTheme, ThemeProvider, tone class maps
  icons/          generated registry + <Icon/>
  components/     one folder per component: Component.tsx + Component.stories.tsx
  electron/       window bridge types + main/preload helpers (pearkit/electron)
  utils/          cn, formatters, clipboard
  stories/        docs (MDX), foundations, layouts, fixtures & demo assets
icons/            SVG sources (vuesax = from Figma, pearkit = drawn for the kit)
docs/             markdown guides (also rendered inside Storybook)
examples/         Electron and React Native starter code
tailwind.preset.js · global.css · vite.js
```

## Rules of thumb

1. **Only React Native primitives.** No DOM elements, no `react-dom`. If something truly needs the web, use `Platform.OS === 'web'` or a `.web.tsx` file.
2. **Style with `className`, colour with tokens.** Never hard-code hex values in components; use token classes (`bg-primary`) or `useTheme().colors` for SVG.
3. **Write complete class names.** Tailwind scans source files, so `bg-${tone}` won't work. Use the literal maps in `src/theme/tones.ts`.
4. **Expose `className` and `style`** on the root of every component and merge with `cn()`.
5. **Every component gets a story** next to it, with a `Playground` (args/controls) and at least one story showing real variants.
6. **Layout stories use only exported components.** If a layout needs custom markup, it's a sign a component is missing.

## Icons

Drop a 24×24 SVG into `icons/pearkit/` (1.5px strokes to match the Vuesax set) and run `npm run icons`. Colours in the file are ignored — every stroke and fill takes the icon's `tone`/`color`.

## README header image

`docs/assets/header.png` is rendered from the **Internal / README header** story:

```bash
npm run build-storybook && npm run readme:header
```
