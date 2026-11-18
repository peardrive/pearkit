---
"pearkit": patch
---

`pearkit/electron` gains **`installUpdate()`**, the last step of an in-app update, moved from PearDrive: unpack the new build, swap it in for the running app (keeping the previous one beside it for one cycle), re-sign it with the app's identifier so macOS keeps its permissions, and relaunch. Also `installedAt()` (where the running copy lives, or null from source) and `swapScript()` (the helper, pure, for tests).
