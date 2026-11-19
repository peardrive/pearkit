---
"pearkit": patch
---

Round two of the chat shell pieces. `ActivityFeed` / `ActivityRow`: what needs you and what happened, one line each in PearDrive's feed style, with the rules alone (`groupByDay`, `whenLabel`, `whereLabel`, `activityKindMeta`). `GlassBar` / `GlassBarButton`: a floating translucent bar over content (blurred on the web), with PearDrive's glass-circle buttons. `EmojiPicker` / `EmojiBar` and the pure list in `emoji.ts` (`EMOJI_CATEGORIES`, `searchEmoji`, `pushRecent`, `DEFAULT_QUICK_EMOJI`). `SettingsBlock` / `SettingsRow`: PearDrive's settings look, and `ProfileCard` for a bot or a person built from them. Chat: `MessageRow`'s action row is icons only (the quick emoji, a + for the full list via `onMore`, reply, copy; `quickReactions`), bubbles are tighter and edgeless like Messages, and on the web selecting words inside a message offers "Reply to this" (`onReplyToSelection`). New icons: `reply`, `edit`, `bell`.
