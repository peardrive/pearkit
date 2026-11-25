---
"pearkit": minor
---

`MediaPlayer`: an **Audio track** line in the options menu, for films that carry more than one sound track (another language, a commentary). It names the track playing and opens a list of the others, like Captions. An engine opts in with two optional calls, `audioTracks()` and `chooseAudioTrack(index)`; engines without them are unchanged. The browser engine (`useWebMedia`) has them wherever the browser lists sound tracks (`webListsAudioTracks()`; in Electron, `enableBlinkFeatures: 'AudioVideoTracks'`). New rules in `playerLogic`: `audioNames`, `audioChoices`, `audioLine`, `engineAudioChoices`, `engineHasAudioTracks`; new icon `audio-track`; new type `MediaAudioTrack`.
