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
| `SocialBar` | Like, comment, share with their numbers; `vertical` rail over a picture; `counts` null hides like and comment. |
| `CommentThread`, `CommentRow`, `CommentBox` | A thread with answers under their comment, a heart and Reply on each; the growing box that writes one. Rules alone: `commentTree`, `formatCount`, `formatClock`, `formatAgo`, `formatLikers`, `toggleLiked`. |
| `QRCode` | Real QR generation, one SVG path, themeable colours. |
| `LinkField` | Copyable recessed field with "copied" feedback. |
| `KeyValueList`, `KeyValueRow` | Metadata lists, data-driven or composed. |
| `EmptyState` | Icon, title, description, actions. |
| `MediaNotice` | Over a player that cannot play: `offline` / `unplayable` presets or custom copy, theme scrim, retry button, inline mode. |
| `Card`, `Divider`, `Kbd`, `SectionLabel`, `Spacer` | Small building blocks. |
| `TextField` | Label, hint / error, icons, trailing slot, password reveal, monospace and multiline modes. |
| `Dialog` | Modal on RN `Modal` (portalled on web with the theme re-applied), icon + title + description, footer actions, Escape / backdrop to close. |
| `Menu`, `MenuButton` | A list of actions over everything else (RN `Modal`, portalled on web): `items` with icon, shortcut, `danger`, `disabled`, separators; anchored to a point (`anchor`, `align`) or, with `MenuButton`, hung from its own icon or label button; Escape and a press outside close it; `menuPlace()` keeps it on the screen. |
| `ToastProvider`, `useToast`, `Toast` | Short notices stacked at the bottom centre: `toast({ title, description, tone, duration, action })` returns an id for `dismiss`; 4 s by default, held while hovered (web), `0` stays. |
| `DropZone` | A place files can be dropped (web): `onDrop(items)` with each a `file` or a `directory` (`webkitGetAsEntry`), `onDragActiveChange`, an `overlay` while a drag is over it; draws only its children on a phone. `droppedItemsFrom()` reads a `DataTransfer`. |
| `Toggle` | An on/off switch from Views, primary when on; `label` and `description` make it a whole row; `sm · md`; `accessibilityRole="switch"`. |
| `SegmentedControl` | One choice among a few in a pill, the chosen one raised: label, icon or both per segment, `sm · md`, `fullWidth`. |
| `EmojiPicker`, `EmojiBar` | The full emoji list in a pop-up (search, recent first, categories, 8 × 44 px cells; `anchor`, `align`), and the quick row with a + for the rest. Pure list and search: `EMOJI_CATEGORIES`, `searchEmoji`, `emojiEntry`, `pushRecent`, `DEFAULT_QUICK_EMOJI`. |
| `MarkdownText` | Markdown as nested `Text`/`View`, no dependency: paragraphs, `#`..`###`, bold, italic, `code`, fenced code, `-`/`1.` lists, `>` quotes, links (`onLinkPress`), rules; `body · body-sm`. Parser alone: `parseMarkdown`, `parseInline`, `plainText`. |

## Chat

One message shape and one set of pieces for every app that talks: a sidebar chat with an agent (Pearkit Studio, Pearcast) and a room of people (rKeyChat) differ only in where the messages come from. The pieces hold no messages and talk to no network.

| Component | Highlights |
| --- | --- |
| `MessageList` | Messages newest at the bottom, grouped by author within five minutes (`GROUP_GAP_MS`), a line per day, `emptyState`, `renderMessage` to draw one yourself; stays at the newest message unless you scrolled up. Older history: `onReachTop` (once within 80 px of the top, re-armed once the content has grown), `loadingOlder` spinner line, `header` above the first message; the view stays put when older messages are put in front. `look: bubbles · flat`, `compact`, `showDays`, `showTimes`, `onLinkPress`, `footer`. |
| `MessageRow` | One message: avatar or `AgentMark`, name, quotes (`re`), the text as Markdown (`MarkdownText`, `onLinkPress`), attachment tiles (`onOpenAttachment`), reaction pills (`onReact`), a press opens the icons-only action row (`quickReactions`, + via `onMore`, reply, copy); on the web, selected words offer "Reply to this" (`onReplyToSelection`); `system` as a muted line, `redacted` struck, `pending` lighter. |
| `Composer` | Controlled field in a pill that grows to `maxLines`; Enter sends and Shift+Enter is a new line on a keyboard; `replyTo` banner with `onCancelReply`; paperclip with `onAttach`; `leading` / `trailing` slots; `sending`, `disabled`, `compact`. |
| `AgentMark` | The agent's mark where a person would have an avatar. |
| `ChatMessage`, `placeOf`, `groupsWith`, `dayLabel`, `messageTime`, `quotedMessages`, `QUICK_REACTIONS` | The message shape and the list's rules, for hosts that draw their own list. |

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
| `GlassBar`, `GlassBarButton` | A floating translucent bar over content at the `top` or `bottom` (blurred on the web, a tint on a phone), `inset` for the safe area; glass-circle buttons with a label under, `active`, `badge`. |
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

## Feed, settings and profiles

| Component | Highlights |
| --- | --- |
| `ActivityFeed`, `ActivityRow` | What needs you and what happened, one line each, newest first, in PearDrive's feed style: a tinted kind icon (`mention · approval · done · file · member · conversation · error · note`), who, title, the `where` breadcrumb, time at the right, an unread dot, an inline `action`; days labelled (`groupByDay`), `compact`, `emptyState`. Rules alone: `groupByDay`, `whenLabel`, `whereLabel`, `activityKindMeta`, `unreadCount`. |
| `SettingsBlock`, `SettingsRow` | PearDrive's settings look: a card per block with icon, title and blurb; rows with label, hint, icon, a `control` at the right (or a chevron when `onPress`), `destructive`. |
| `ProfileCard` | A bot or a person: name and picture (URL, seed or the agent's mark), `badges` chips, `sections` as settings blocks, `actions`; `editable` with `onEditName` / `onPickAvatar`. |

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
