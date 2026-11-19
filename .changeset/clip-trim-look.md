---
"pearkit": minor
---

One trim look: `Scrubber`, `Transport` and `TrimStrip` draw the chosen part as a timeline draws a selected clip — a 2px rounded frame in the new `selection` colour with a short bar inside each end — and either end of the frame drags to trim; nothing hangs below the bar, so a player's bar centres on its play button. `look="pins"` keeps the older in/out pins. The bar under a player is thinner and raised (`sm` 10px, `md` 14px, `lg` 26px; `emboss`). New glyph `ClipFrame` with `paintClipFrame()` and the `CLIP` numbers for canvases; the `playhead` token is the timeline's white line, `selection` its yellow.
