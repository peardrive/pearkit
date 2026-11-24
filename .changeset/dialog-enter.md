---
"pearkit": patch
---

`Dialog`: Enter presses the main action. `onSubmit` names the dialog's one main action; on web and Electron Enter presses it from a field or from anywhere in the dialog, and on a phone the return key of a single-line `TextField` inside does. Never a delete (`destructive`), never while the main button is not live (`submitDisabled`), and Enter keeps its own meaning in a multi-line field and on a focused button. The key rule on its own is exported as `enterPressesMain`.
