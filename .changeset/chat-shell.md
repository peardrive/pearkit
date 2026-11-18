---
"pearkit": patch
---

The pieces a chat app is built from. `MessageList`, `MessageRow` and `Composer` (from the chat lab): one `ChatMessage` shape for every app, messages grouped by author within five minutes, a line per day, the agent's mark, system lines, struck redacted rows, lighter pending rows, quotes, attachments, reactions; a growing composer where Enter sends and Shift+Enter is a new line. `MarkdownText`: a dependency-free Markdown renderer (paragraphs, headings, bold, italic, code, fenced code, lists, quotes, links, rules) with its parser exported as `parseMarkdown`, `parseInline`, `plainText`. `Menu` and `MenuButton`: a list of actions over everything else, anchored to a button or a point. `ToastProvider` / `useToast` / `Toast`: short notices stacked at the bottom centre. `DropZone`: a place files and folders can be dropped (web), with an overlay while a drag is over it. `Toggle` and `SegmentedControl`. New icons: `robot`, `paperclip`, `chevron-down`.
