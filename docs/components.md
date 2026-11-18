# Component reference

A map of everything pearkit exports. Storybook has full prop tables, controls and live examples for each one.

## Foundations

| Export | Purpose |
| --- | --- |
| `ThemeProvider`, `useTheme`, `useThemeColor` | Provide / read the active theme. |
| `darkTheme`, `lightTheme`, `createTheme`, `withAlpha` | Built-in themes and helpers. |
| `Text` | Typography: `variant` (display · title · body-lg · body · body-sm · label · caption · micro · overline), `weight`, `tone`, `truncate`. |
| `Icon`, `iconNames`, `renderIcon` | 39 SVG icons, coloured by `tone` or `color`. |
| `LinearGradient`, `RadialGlow` | Cross-platform SVG gradients. |

## Components

| Component | Highlights |
| --- | --- |
| `Button` | `primary · secondary · subtle · ghost · danger`, `sm · md · lg`, leading/trailing icons, `fill`, `fullWidth`, `glow`, `loading`, icon-only. |
| `IconButton` | `xs · sm · md · lg`, `ghost · subtle · solid`, `active`, built-in `tooltip`. |
| `Tooltip` | Label + shortcut, four placements, hover / long-press, controlled or `defaultOpen`. |
| `StatusPill`, `StatusDot` | Seven tones; `status` presets via `shareStatusMeta`; dot `glow` and `pulse`. |
| `CountBadge` | Quiet count or tinted pill, `max`, `hideZero`. |
| `OrderTile`, `OrderBadge`, `useOrderedSelection` | Choosing in order: a tap gives the next number (1, 2, 3) in place of a check mark, number 1 leads; `max`; the rule alone in `toggleOrder`, `orderNumber`, `sendLast`, `sendFirst`, `inOrder`. |
| `ProgressBar` | `transfer · brand · solid` gradients, custom `colors`, `height`. |
| `SearchField` | Shortcut hint, clear button, controlled / uncontrolled. |
| `Thumbnail` | Image or tinted kind icon (`fileKindMeta`), `fileKindFromName()`. |
| `Chip` | Tag / filter token: leading icon, quiet count, selected tint per tone, removable ✕, `sm · md`. |
| `Avatar`, `PeerChip` | Deterministic gradient avatars; truncated peer keys. |
| `QRCode` | Real QR generation, one SVG path, themeable colours. |
| `LinkField` | Copyable recessed field with "copied" feedback. |
| `KeyValueList`, `KeyValueRow` | Metadata lists, data-driven or composed. |
| `EmptyState` | Icon, title, description, actions. |
| `MediaNotice` | Over a player that cannot play: `offline` / `unplayable` presets or custom copy, theme scrim, retry button, inline mode. |
| `Card`, `Divider`, `Kbd`, `SectionLabel`, `Spacer` | Small building blocks. |
| `TextField` | Label, hint / error, icons, trailing slot, password reveal, monospace and multiline modes. |
| `Dialog` | Modal on RN `Modal` (portalled on web with the theme re-applied), icon + title + description, footer actions, Escape / backdrop to close. |

## Media browse

| Component | Highlights |
| --- | --- |
| `Masonry` | Balanced mixed-height columns: `columns` or auto from `minColumnWidth`, `gap`, `getAspectRatio` balancing; pure `masonryColumns()` for virtualized/canvas hosts. |
| `MediaTile` | One tile of a media wall: picture or kind icon, corner `badge`, title/meta scrim (`reveal: auto · hover · always`), selection ring, `favorite`, and a host-owned `preview` slot driven by `onHoverChange`. |
## Media time

One in/out, one playhead, one waveform, one filmstrip — for every media app, on desktop and on the phone. The geometry lives in pure modules next to each component and is also exported as canvas painters, so a timeline drawn on a canvas uses the same shapes and bars.

| Component | Highlights |
| --- | --- |
| `Scrubber` | The time bar: track, `Playhead`, scrub by press/drag (`onSeek`), and with `range` the chosen part with an `InOutPin` at each end (`onRange`, `minGap`); `sm` / `md` or an exact `height`; `dimOutside`, `frame`, content as children; ← → I O Home End on the web. |
| `Transport` | Play/pause + `Scrubber` + times; with `range` it trims and shows `in – out · length` and a whole-clip button. |
| `Waveform` | Peaks → bars, `center` or `bottom`, any token, a `window` of time; `waveformBars()` and `paintWaveform()` for canvases. |
| `Filmstrip` | Frames edge to edge, empty cells while frames arrive; `filmstripCells()`, `filmstripFrameTime()`, `paintFilmstrip()`. |
| `TrimStrip` | A clip miniaturised: frames with the sound along the bottom (or all waveform), the chosen part lit and framed, the rest dimmed, pins and playhead; `compact` for an inspector line. |
| `Playhead`, `InOutPin` | The two glyphs as components; `paintPlayhead()`, `paintInOutPin()` for canvases; `PLAYHEAD`, `PIN`, `PIN_PAD` numbers. |
| `useTimeRange` | The in/out rules as a hook: clamp, `minGap`, drag with one `done`, nudge, reset; `clampRange`, `moveEdge`, `nudgeEdge`, `wholeRange`, `isWholeRange`. |

## App chrome

| Component | Highlights |
| --- | --- |
| `WindowControls`, `useWindowControls`, `DragRegion` | In-app macOS traffic lights wired to Electron via `pearkit/electron`. |
| `Sidebar` (+ `SidebarHeader`, `SidebarToggle`, `SidebarContent`, `SidebarSection`, `SidebarItem`, `SidebarFooter`, `SidebarSpacer`, `useSidebar`) | Optional mouse/touch/keyboard resizing through `ResizeHandle` (with an optional `gutter`), collapsible icon rail, controlled or uncontrolled. |
| `ResizeHandle` | The grab bar between two panes: vertical or horizontal, a wide hit area with a short bar in its middle, faint at rest and lit on hover and drag; reports the drag, double-click to reset, arrow keys to step. |
| `Toolbar`, `ToolbarButton`, `ToolbarSeparator`, `ToolbarSpacer` | 52px action bar with tooltips. |
| `PaneHeader` | Title, subtitle, data-driven actions, `leading` slot. |
| `AppWindow`, `Pane`, `PaneBody` | Layout skeleton: panes, surfaces, glow, scrolling. |
| `FolderTabs`, `FolderTabPage` | Tabs that open into their page: the open tab lit, the page edge running on from it across the top and fading down the sides; tabs scroll when they outgrow the row; `trailing` slot. `FolderTabPage` is the framed page on its own. |

## PearDrop patterns

| Component | Highlights |
| --- | --- |
| `ShareRow` | Figma "Share Row": thumbnail, name, favourite, meta, progress, status, timestamp or action. |
| `FileHeader` | Detail hero, horizontal or vertical. |
| `TransferCard`, `TransferRate` | Live transfer stats and peers; raw numbers are formatted for you. |
| `ShareLinkCard` | QR + link + actions, fully relabelable. |
| `NetworkStatusCard` | Connection state, peers, rates, pause/resume, `compact` rail mode. |
| `DangerZone` | Destructive action with its consequence. |

## In-app tools

| Export | Highlights |
| --- | --- |
| `DebugNotesButton`, `useDebugNotes`, `useMicLevel` | The debug-notes button: mic + label idle, red with a live level and `m:ss · steps` while a note records, grey without a microphone. |
| `createDebugNotes` (+ `createTrace`, `createWebRecorder`, `createUnavailableRecorder`, `installCapture`, `domPath`, `noteId`) | Headless debug notes: a voice recording plus a timed trace of every step, saved as `note.<audio>` + `trace.jsonl` + `note.json`. See [debug-notes.md](debug-notes.md). |

## Utilities

`cn`, `formatBytes`, `formatSpeed`, `formatEta`, `formatClock`, `truncateMiddle`, `clamp`, `copyToClipboard`.

## Subpath exports

| Path | Contents |
| --- | --- |
| `pearkit` | Everything above. |
| `pearkit/tailwind-preset` | Tailwind preset (tokens, type scale, radii, Electron utilities). |
| `pearkit/global.css` | Tailwind layers + drag-region rules. |
| `pearkit/vite` | Vite plugin for Electron / web renderers. |
| `pearkit/electron` | Main-process and preload helpers for `WindowControls`. |
