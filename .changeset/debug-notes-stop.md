---
"pearkit": patch
---

Debug notes: a running note can always be stopped, and can be written to disk as it records. `trace.stop()` and the recorder's `stop()` answer a second call with the stop already under way (a second press used to save the note without its voice, or be ignored for good); a recorder that never confirms the stop is given up on after 4 s, keeping what it recorded. New `sink` option (`NoteSink`: `begin`, `chunk`, `steps`) hands each second of voice and the steps so far to the app while the note runs; `save` then receives `streamed: true`. `trace.stopping` and `useDebugNotes().stopping` say a note is being saved.
