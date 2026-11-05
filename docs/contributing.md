# Contributing

## How work flows

Every change starts as a GitHub issue (**New component**, **Design change** or **Bug report**), is built on its own branch off `develop`, and lands through a pull request. `main` only receives releases.

```
issue #42 ─▶ feat/42-segmented-control ─▶ PR into develop (squash) ─▶ release PR develop → main ─▶ v0.3.0
```

In short:

1. Pick up an issue marked `status: ready`.
2. `git switch develop && git pull --ff-only && git switch -c feat/42-segmented-control`
3. Build it, with a story. Commit as often as you like.
4. `npx changeset` to describe the change for the changelog, and commit the file.
5. Open a PR **into develop** with a Conventional Commit title (`feat(SegmentedControl): add segmented control`) and `Closes #42` in the body.
6. Once CI is green, **Squash and merge**.

Branch types: `feat/`, `design/`, `fix/`, `docs/`, `refactor/`, `chore/` — always followed by the issue number.

Releases, hotfixes, versioning and the one-time GitHub setup are in [releasing.md](releasing.md).

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
.changeset/       pending changelog entries, consumed at release time
.github/          issue/PR templates, CI and release workflows, branch rulesets
tailwind.preset.js · global.css · vite.js
```

## Rules of thumb

1. **Only React Native primitives.** No DOM elements, no `react-dom`. If something truly needs the web, use `Platform.OS === 'web'` or a `.web.tsx` file.
2. **Style with `className`, colour with tokens.** Never hard-code hex values in components; use token classes (`bg-primary`) or `useTheme().colors` for SVG.
3. **Write complete class names.** Tailwind scans source files, so `bg-${tone}` won't work. Use the literal maps in `src/theme/tones.ts`.
4. **Expose `className` and `style`** on the root of every component and merge with `cn()`.
5. **Every component gets a story** next to it, with a `Playground` (args/controls) and at least one story showing real variants.
6. **Layout stories use only exported components.** If a layout needs custom markup, it's a sign a component is missing.
7. **Public API changes need a changeset.** Renaming or removing a prop, token or component is breaking: say so in the changeset and include a migration note.

## Icons

Drop a 24×24 SVG into `icons/pearkit/` (1.5px strokes to match the Vuesax set) and run `npm run icons`. Colours in the file are ignored — every stroke and fill takes the icon's `tone`/`color`.

## README header image

`docs/assets/header.png` is rendered from the **Internal / README header** story:

```bash
npm run build-storybook && npm run readme:header
```
