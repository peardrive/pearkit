# pearkit

## 0.2.0

First tracked release — the baseline the team builds on.

- **Theming:** 32-token theme model, built-in `darkTheme` and `lightTheme`, `createTheme(base, overrides)`, nested `ThemeProvider`s, and the `pearkit/tailwind-preset` that maps tokens to CSS variables.
- **Icons:** 22 Vuesax glyphs from the PearDrop Figma file plus 15 pearkit glyphs on the same 24px grid, generated into a typed registry (`npm run icons`).
- **Primitives:** Text, Icon, Button, IconButton, Tooltip, StatusPill/StatusDot, CountBadge, ProgressBar, SearchField, TextField, Thumbnail, Avatar, PeerChip, QRCode, LinkField, KeyValueList, EmptyState, Card, Divider, Kbd, SectionLabel, Spacer, LinearGradient/RadialGlow, Dialog.
- **Window chrome:** WindowControls (with `useWindowControls` and `DragRegion`), resizable and collapsible Sidebar (`useSidebar`), Toolbar, PaneHeader, AppWindow/Pane/PaneBody.
- **Patterns:** ShareRow, FileHeader, TransferCard/TransferRate, ShareLinkCard, NetworkStatusCard, DangerZone.
- **Integrations:** `pearkit/vite` plugin for Electron renderers, `pearkit/electron` window bridge helpers, `pearkit/global.css`.
- **Docs:** Storybook with foundations, component stories and PearDrop desktop/mobile layouts; guides for getting started, theming, Electron and React Native; Electron and React Native examples.
