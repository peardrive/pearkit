---
"pearkit": patch
---

File every piece under the folder of its category — `src/components/media/Scrubber`, `src/components/frame/Sidebar`, `src/components/feedback/Dialog`. Folders are camelCase single words (`foundations`, `buttons`, `input`, `feedback`, `people`, `files`, `media`, `conversation`, `frame`, `tools`) and the Storybook section now comes from the folder, so stories are titled with just the piece's name and the "every story sits under a known category" test is gone. Imports are unchanged — `@/components/<category>/<Piece>/…` — and the public API is untouched.
