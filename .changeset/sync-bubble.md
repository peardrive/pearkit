---
"pearkit": minor
---

`SyncBubble`: a small pill at the bottom of the screen that says where one item stands with the other device (a debug note and the Mac that pulls it): six states in `syncStateMeta` (saving, waiting, sending, synced, offline, failed), a breathing dot while under way and a glowing one once it has arrived, a label and a quieter detail, `offset` to float it above a composer or a dock; `syncProgressLabel` ("2 of 3 files") and `syncBubbleLinger` (how long a settled bubble stays), tested. `DebugNotesButton` takes `connection` ('connected' | 'connecting' | 'offline'): a 6px status dot at its corner saying whether the reading device is on, with the words in the accessibility label.
