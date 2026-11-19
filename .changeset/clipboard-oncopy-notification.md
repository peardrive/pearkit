---
"pearkit": minor
---

**Behaviour change:** `onCopy` no longer replaces the copy; register a writer with `setClipboardWriter`. `LinkField`, `ShareLinkCard` and the chat's `MessageRow` / `MessageList` now always copy with `copyToClipboard` themselves (a registered writer, then the browser clipboard, then `execCommand`), and call `onCopy(text, ok)` afterwards as a notification — so an app that passed `onCopy` only to show a toast copies again, and an app that passed it to supply its clipboard must call `setClipboardWriter(fn)` once at start-up instead.
