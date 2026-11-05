# Theming

pearkit themes are plain objects. `ThemeProvider` turns the active theme into CSS variables (`--pk-primary: 166 206 57`, …) using NativeWind's `vars()`, which works on both web and native. The Tailwind preset maps every colour class to those variables:

```js
// inside pearkit/tailwind-preset
colors: { primary: 'rgb(var(--pk-primary) / <alpha-value>)', /* … */ }
```

So `bg-primary`, `text-muted/80` or `border-overlay/[0.08]` always follow the current theme, opacity modifiers included, and switching themes never requires rebuilding Tailwind.

## Built-in themes

| Theme | Name | Notes |
| --- | --- | --- |
| `darkTheme` | `pear-dark` | The PearDrop design (default). |
| `lightTheme` | `pear-light` | Light counterpart, contrast-tuned (`primary-text` is a darker green). |

```tsx
<ThemeProvider theme="dark" />            // built-in by name
<ThemeProvider theme="system" />          // follows the OS (useColorScheme)
<ThemeProvider theme={myTheme} />         // any Theme object
```

## Tokens

| Group | Tokens |
| --- | --- |
| Surfaces | `background`, `pane`, `sidebar`, `sidebar-to`, `overlay`, `inset`, `tooltip`, `tooltip-foreground` |
| Text & icons | `foreground`, `muted`, `subtle`, `icon`, `icon-strong` |
| Brand | `primary`, `primary-foreground`, `primary-strong`, `primary-text`, `selected` |
| Status | `success`, `warning`, `danger`, `danger-foreground`, `neutral`, `info`, `accent`, `favorite` |
| Window & QR | `window-close`, `window-minimize`, `window-maximize`, `window-inactive`, `qr-background`, `qr-foreground` |

`overlay` deserves a note: it's **white on dark themes and black on light ones**. Hover states, cards and hairlines are drawn with it at low opacity (`bg-overlay/[0.04]`, `border-overlay/[0.07]`), which is why the same components look right on any background.

## Creating a theme

```ts
import { createTheme, darkTheme } from 'pearkit';

export const blueberry = createTheme(darkTheme, {
  name: 'blueberry',
  colors: {
    primary: '#7aa2ff',
    'primary-strong': '#8b5cf6',
    'primary-text': '#93b4ff',
    selected: '#1f2a4d',
  },
});
```

Only the tokens you pass change. Colours must be hex strings.

## Inline overrides & nesting

Patch tokens for a subtree without defining a theme:

```tsx
<ThemeProvider overrides={{ colors: { primary: '#38bdf8' } }}>…</ThemeProvider>
```

Providers nest — a light card inside a dark app just works:

```tsx
<ThemeProvider theme="dark">
  <Sidebar>…</Sidebar>
  <ThemeProvider theme="light" className="rounded-card p-4">
    <ShareLinkCard link={link} />
  </ThemeProvider>
</ThemeProvider>
```

## Reading the theme in code

```ts
const theme = useTheme();            // full resolved theme
const green = useThemeColor('primary');
withAlpha(theme.colors.primary, 0.28) // 'rgba(166, 206, 57, 0.28)'
```

Use these for things Tailwind can't reach: SVG fills, native shadows, third-party components.

## Fonts

`theme.fonts.web` is the CSS family used on web/Electron (weights via `font-weight`). `theme.fonts.native` maps each weight to a registered font family on iOS/Android, because native platforms register every weight as its own font:

```ts
createTheme(darkTheme, {
  fonts: { web: '"Inter", sans-serif', native: { medium: 'Inter_500Medium', semibold: 'Inter_600SemiBold', bold: 'Inter_700Bold' } },
});
```

## Beyond colours

Radii, the type scale and spacing live in the Tailwind preset (build-time). Override them in your own config:

```js
module.exports = {
  presets: [require('nativewind/preset'), require('pearkit/tailwind-preset')],
  theme: { extend: { borderRadius: { control: '6px', card: '10px' }, fontSize: { body: '14px' } } },
};
```
