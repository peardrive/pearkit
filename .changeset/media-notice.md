---
"pearkit": patch
---

New **`MediaNotice`**: the notice over a player that cannot play. A media element only knows "error"; the app finds out why and says so where the media is, with one way out, instead of spinning or re-opening the stream in a loop. `kind="offline"` (nobody online holds the file) and `kind="unplayable"` (the stream kept failing) bring icon, copy and tone; `custom` takes yours. `onRetry` shows the Try again button, `actions` adds more, `overlay={false}` renders it inline. Composes `EmptyState` and `Button`; the scrim is the `background` token. Two icons added: `wifi-slash`, `alert-circle`. First used by PearDrive 0.6.147.
