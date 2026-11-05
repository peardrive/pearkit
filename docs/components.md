# Component reference

A map of everything pearkit exports. Storybook has full prop tables, controls and live examples for each one.

## Foundations

| Export | Purpose |
| --- | --- |
| `ThemeProvider`, `useTheme`, `useThemeColor` | Provide / read the active theme. |
| `darkTheme`, `lightTheme`, `createTheme`, `withAlpha` | Built-in themes and helpers. |
| `Text` | Typography: `variant` (display · title · body-lg · body · body-sm · label · caption · micro · overline), `weight`, `tone`, `truncate`. |
| `Icon`, `iconNames`, `renderIcon` | 37 SVG icons, coloured by `tone` or `color`. |
| `LinearGradient`, `RadialGlow` | Cross-platform SVG gradients. |

## Components

| Component | Highlights |
| --- | --- |
| `Button` | `primary · secondary · subtle · ghost · danger`, `sm · md · lg`, leading/trailing icons, `fill`, `fullWidth`, `glow`, `loading`, icon-only. |
| `IconButton` | `xs · sm · md · lg`, `ghost · subtle · solid`, `active`, built-in `tooltip`. |
| `Tooltip` | Label + shortcut, four placements, hover / long-press, controlled or `defaultOpen`. |
| `StatusPill`, `StatusDot` | Seven tones; `status` presets via `shareStatusMeta`; dot `glow` and `pulse`. |
| `CountBadge` | Quiet count or tinted pill, `max`, `hideZero`. |
| `ProgressBar` | `transfer · brand · solid` gradients, custom `colors`, `height`. |
| `SearchField` | Shortcut hint, clear button, controlled / uncontrolled. |
| `Thumbnail` | Image or tinted kind icon (`fileKindMeta`), `fileKindFromName()`. |
| `Avatar`, `PeerChip` | Deterministic gradient avatars; truncated peer keys. |
| `QRCode` | Real QR generation, one SVG path, themeable colours. |
| `LinkField` | Copyable recessed field with "copied" feedback. |
| `KeyValueList`, `KeyValueRow` | Metadata lists, data-driven or composed. |
| `EmptyState` | Icon, title, description, actions. |
| `Card`, `Divider`, `Kbd`, `SectionLabel`, `Spacer` | Small building blocks. |
| `TextField` | Label, hint / error, icons, trailing slot, password reveal, monospace and multiline modes. |
| `Dialog` | Modal on RN `Modal` (portalled on web with the theme re-applied), icon + title + description, footer actions, Escape / backdrop to close. |

## App chrome

| Component | Highlights |
| --- | --- |
| `WindowControls`, `useWindowControls`, `DragRegion` | In-app macOS traffic lights wired to Electron via `pearkit/electron`. |
| `Sidebar` (+ `SidebarHeader`, `SidebarToggle`, `SidebarContent`, `SidebarSection`, `SidebarItem`, `SidebarFooter`, `SidebarSpacer`, `useSidebar`) | Optional mouse/touch/keyboard resizing, collapsible icon rail, controlled or uncontrolled. |
| `Toolbar`, `ToolbarButton`, `ToolbarSeparator`, `ToolbarSpacer` | 52px action bar with tooltips. |
| `PaneHeader` | Title, subtitle, data-driven actions, `leading` slot. |
| `AppWindow`, `Pane`, `PaneBody` | Layout skeleton: panes, surfaces, glow, scrolling. |

## PearDrop patterns

| Component | Highlights |
| --- | --- |
| `ShareRow` | Figma "Share Row": thumbnail, name, favourite, meta, progress, status, timestamp or action. |
| `FileHeader` | Detail hero, horizontal or vertical. |
| `TransferCard`, `TransferRate` | Live transfer stats and peers; raw numbers are formatted for you. |
| `ShareLinkCard` | QR + link + actions, fully relabelable. |
| `NetworkStatusCard` | Connection state, peers, rates, pause/resume, `compact` rail mode. |
| `DangerZone` | Destructive action with its consequence. |

## Utilities

`cn`, `formatBytes`, `formatSpeed`, `formatEta`, `truncateMiddle`, `clamp`, `copyToClipboard`.

## Subpath exports

| Path | Contents |
| --- | --- |
| `pearkit` | Everything above. |
| `pearkit/tailwind-preset` | Tailwind preset (tokens, type scale, radii, Electron utilities). |
| `pearkit/global.css` | Tailwind layers + drag-region rules. |
| `pearkit/vite` | Vite plugin for Electron / web renderers. |
| `pearkit/electron` | Main-process and preload helpers for `WindowControls`. |
