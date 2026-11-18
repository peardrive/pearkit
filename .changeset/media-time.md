---
"pearkit": minor
---

Add the media time family: `Scrubber` (the time bar with the playhead and, given a range, an in and an out pin to drag), `Transport` (play/pause + scrubber + times, trims too), `Waveform` (peaks as bars), `Filmstrip` (frames edge to edge) and `TrimStrip` (a clip miniaturised: frames and sound, the chosen part lit and framed, the rest dimmed). With them `useTimeRange` and the pure in/out rules (`clampRange`, `moveEdge`, …), the `Playhead` and `InOutPin` glyphs, and canvas painters (`paintPlayhead`, `paintInOutPin`, `paintWaveform`, `paintFilmstrip`) that draw the exact same shapes on a timeline canvas. New colour token `playhead`; new `formatClock()` utility. All React Native primitives — the same components run on Electron and on the phone.
