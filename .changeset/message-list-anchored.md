---
"pearkit": patch
---

`MessageList` keeps the bottom edge anchored when its box changes height: the keyboard coming up (or a pane being resized) slides the whole conversation up as one piece, the top goes off the screen, and the message that sat above the composer stays there, whether the person was at the newest message or reading older ones. The rule is `anchoredScrollY` in `chatLogic` (tested); the list is labelled "Messages" for tests and screen readers; the padding under the last message is 4px.
