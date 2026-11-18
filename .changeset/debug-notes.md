---
"pearkit": patch
---

New **debug notes** module, the one every app gets: `createDebugNotes()` (headless: the voice recorder, the timed trace of every click / scroll / field / shortcut on web, and your own `trace.step()` calls), `DebugNotesButton` (mic when idle; red with a live five-bar level and `m:ss · steps` while recording; grey when there is no microphone) and `useDebugNotes()`. A finished note is handed to your `save` as `note.<audio>` + `trace.jsonl` + `note.json`, the same files `pear-ui/debug` produced, so stores and readers need no change. Two icons added: `microphone`, `microphone-slash`. Guide: docs/debug-notes.md.
