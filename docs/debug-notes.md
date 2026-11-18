# Debug notes

A voice note about the app with every step taken while it ran, each stamped with its time into the recording. The person presses the mic, talks about what is wrong while they keep using the app, and presses again. The app saves three files; a helper on another machine listens to a sentence, reads the steps that happened before the next sentence, and has one issue to look at. Every Anjou app gets this module (Guy, 2026-10-20), and it is the same code everywhere so the reader's side works everywhere.

Design history: pearcast `docs/NOTES-MODE.md`; rKeyChat `docs/debug-notes-module.md`; the framework-free copy in `pear-ui/debug/` (PearDrive). This is that module as part of pearkit.

## Pieces

| Export | What |
| --- | --- |
| `createDebugNotes(options)` | Headless: wires the recorder, the trace and (on web) the document capture. Returns `{ trace, recorder, uninstall, micId, pickMic }`. |
| `DebugNotesButton` | The button: mic + label when idle; red with a five-bar live level and `m:ss · steps` while recording; grey when the note runs without a microphone. |
| `useDebugNotes(notes)` | `{ active, audio, seconds, steps, error }`, live. For your own UI around a note (a banner, a dialog). |
| `useMicLevel(stream)` | Five bar heights following a stream (web). |
| `createTrace`, `createWebRecorder`, `createUnavailableRecorder`, `installCapture`, `domPath`, `noteId` | The parts, for apps that compose their own. |

## Mounting it

```tsx
import { createDebugNotes, DebugNotesButton } from 'pearkit';

const notes = createDebugNotes({
  app: 'peardrop',
  save: async ({ id, meta, steps, blob, type }) => {
    // store note.<ext>, trace.jsonl (one JSON step per line), note.json — wherever this app keeps notes
    await api.saveDebugNote(id, meta, steps, blob, type);
  },
  where: () => ({ space: current.space, path: current.path }),   // stamped on the note
  region: (el) => el.closest('[data-region]')?.getAttribute('data-region'),   // optional, web
  describe: (el) => (el.dataset.path ? { text: `file ${el.dataset.path}`, data: { path: el.dataset.path } } : null), // optional, web
});

<Toolbar>
  …
  <DebugNotesButton notes={notes} onStopped={() => refresh()} />
</Toolbar>

notes.trace.step('state', `files ${n} · peers ${p}`, undefined, { group: 'state' });   // your own steps
```

Make `notes` once (module scope, or `useMemo`), not per render: it owns the recorder and the document listeners. Call `notes.uninstall()` if the app unmounts the feature.

### What the app supplies

- **`save({ id, meta, steps, blob, uri?, type? })`** — the store. `blob` is null when no voice was recorded, and `meta.noAudio` says why. One pearcore space per app for notes, shared read-only by link, is the convention (rKeyChat `src/debug-notes.js` is the reference store).
- **`where()`** — what is on screen (space, path, view). It is stamped on the first step and merged into `note.json`.
- **`region(el)`** (web) — the area of the screen an element belongs to (sidebar / toolbar / grid / modal). Default: the nearest `aria-label` on a landmark role, or the top-level element's id.
- **`describe(el)`** (web) — what a clicked thing IS: `{ text: 'file IMG_5238.MOV', data: { path } }`. Give selectable things stable names (`data-name`, `data-path`, `aria-label`): the trace is only as readable as those.
- **`onIdleClick`** on the button — open a dialog first (pick a microphone with `recorder.mics()`, show a refusal from `recorder.probe()` before the person talks), then call `notes.trace.start()`.

### Platforms

- **Web / Electron:** everything. The recorder is `MediaRecorder` (`audio/webm` in Chromium, `audio/mp4` in Safari); the capture listens on `document` in the capture phase, so handlers that stop propagation are still seen. On macOS the Electron app needs the microphone permission (System Settings → Privacy & Security → Microphone); a refusal shows up as `NotAllowedError` in `recorder.error` and `note.noAudio`.
- **React Native:** the trace, `useDebugNotes` and the button work; there is no DOM to capture, so the app calls `trace.step()` from its own handlers (navigation, taps on named things). There is no `MediaRecorder` either: pass a `recorder` built on expo-av (or the like) with the same `start/stop/active/stream/error` members, or let the default `createUnavailableRecorder()` run the note as steps only.

## The files

Three files per note, in a folder named after the note id (`2026-11-08T03-12-45`, the start time):

| File | Content |
| --- | --- |
| `note.<webm\|mp4\|m4a\|ogg>` | the voice, as the recorder produced it (absent when `noAudio`) |
| `trace.jsonl` | one step per line: `{ t, kind, text, data?, until?, times? }` |
| `note.json` | `meta`: `startedAt`, `seconds`, `steps`, `app`, `userAgent`, `window`, whatever `where()` said, `noAudio?` |

A step's `kind` is one of `ui` (state at the start), `click`, `tap`, `right-click`, `dblclick`, `scrollbar`, `scroll`, `focus`, `key`, `log`, `state`, `error`, or the app's own. Click `data`: `{ in, at: [x, y], el, rect: [l, t, w, h], act?, mods?, …describe().data }`. Typed text and unmodified keys are never recorded. Repeats of one step within 2 s fold into one with `until` and `times`; a run of one `group` (scrolling) becomes "from → to".

## Reading a note

Transcribe the voice (rKeyChat and PearDrive do it locally with sherpa-onnx). Then: a sentence, the steps between it and the next sentence, one issue. The clock makes the join: a step at `t: 41.2` happened while the sentence spoken around 0:41 was being said.

## Moving an app from `pear-ui/debug`

`mountDebugNotes({ app, save, where, region, describe, onIdleClick, onStopped })` becomes `createDebugNotes({ app, save, where, region, describe })` plus `<DebugNotesButton notes={…} onIdleClick onStopped />`. `debug.trace`, `debug.recorder`, `debug.micId`, `debug.pickMic()` keep their names. The CSS file is gone: the button is themed by pearkit (`danger` for the recording red, `neutral` for a silent note). The saved files are byte-for-byte the same, so readers and stores need no change.
