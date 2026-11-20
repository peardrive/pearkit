---
"pearkit": minor
---

The raised look. `Icon` gains `emboss`: the glyph painted with a barely-there top-to-bottom gradient, a soft highlight along its top edge and a soft shadow under its bottom one. `embossPad(theme, { active, primary })` (theme) is the matching pad style, a shape with depth rather than an outline, and `shade(hex, amount)` lightens or darkens a colour. `DockButton`, `GlassBarButton` and the "All" and "+" tabs of `OrgTabs` sit on it now, every one of them, with the chosen one lifted more; `HomeBlock` headers emboss their icon. Nine filled icons drawn from geometry (`scripts/draw-filled-icons.mjs`): `home` (a house), `globe`, `group` (three rounded squares in a huddle), `bell-fill`, `folder-fill`, `message-fill`, `document-fill`, `more-fill`, `bolt`; the icon build understands `fill-rule="evenodd"` holes. `ActivityFeed` knows four more kinds: `project`, `publish`, `proposal`, `zap`.
