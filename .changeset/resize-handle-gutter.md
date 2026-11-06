---
"pearkit": minor
---

Add `ResizeHandle`: the grab bar between two panes — a wide hit area in the gutter with a short bar in its middle, faint at rest and lit in `primary` on hover and while dragging; vertical or horizontal, double-click to reset, arrow keys to step. `Sidebar` now resizes through it: the full-height edge line that lit on hover becomes a short bar on the seam, and a new `gutter` prop (default 0, so nothing moves) keeps space beside the sidebar with the bar in its middle.
