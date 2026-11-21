import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{l as t}from"./iframe-D4ObyxHG.js";import{i as n,r}from"./react-BfaX7MxJ.js";import{a as i,o as a,s as o}from"./blocks-BdsXPnAx.js";var s;function c(){return(c=e((()=>{s=`# Working with Pearkit

Pearkit is the one shared library of interface pieces for every PearDrive app. This page is the whole set of rules
for using it and adding to it. It is written for people and for coding agents alike: hand it to either.

## Using Pearkit in an app

1. **Look here before building anything.** If a piece exists, use it. If it nearly fits, change it here; don't copy
   it into the app.
2. **Import by name from the front door, and nowhere else.**

   \`\`\`ts
   import { Button, Scrubber, useTheme } from 'pearkit';
   import { installUpdate } from 'pearkit/electron'; // Electron main process only
   \`\`\`

   Never import from a folder inside the package (\`pearkit/src/...\`, \`pearkit/lib/...\`). Folders move; names don't.
3. **Colours, type and spacing come from the theme.** No hard-coded colours in an app's own screens either.

## Where a piece goes

Every piece has **one home category**. The category is the first part of its Storybook title
(\`title: 'Media/Scrubber'\`), and that is the only place it is recorded. Ask one question:

> **What is the person making when they reach for this?**

| Category | What goes there | Examples |
| --- | --- | --- |
| **Foundations** | The look everything shares | Colors, Typography, Icons, Theming, Gradient |
| **Buttons & actions** | Things you press | Button, IconButton, Chip, Kbd |
| **Text & input** | Things you type or drop into | TextField, SearchField, LinkField |
| **Status & messages** | Things that tell you something | Status, CountBadge, ProgressBar, Tooltip, Dialog, EmptyState, DangerZone |
| **People** | Who someone is | Avatar, PeerChip |
| **Files & sharing** | Showing, listing and sending files | Thumbnail, MediaTile, FileViews, Masonry, FileHeader, ShareRow, ShareLinkCard, TransferCard, QRCode |
| **Media** | Playing and editing audio and video | Transport, Scrubber, Waveform, Filmstrip, TrimStrip, MediaPlayer |
| **Conversation** | Chat, comments and reactions | SocialBar, CommentBox, CommentThread |
| **App frame** | The window and how you move around it | AppWindow & Pane, Sidebar, Toolbar, PaneHeader, FolderTabs, WindowControls, ResizeHandle, Card, Divider |
| **App tools** | Ready-made features every app carries | DebugNotesButton, UpdateNotice, NetworkStatusCard |
| **Layouts** | Whole screens, built only from the pieces above | PearDrop Desktop, PearDrop Mobile |

How to choose:

- **General beats specific.** A button used in a video editor is still a button: Buttons & actions. Only a piece
  that makes no sense outside one kind of work goes in that kind's category (a trim strip: Media).
- **Size does not change the category.** A play button, a scrub bar and the whole player are all Media. Small
  single pieces and assembled ones live side by side.
- **A whole screen is a Layout.** A podcast player screen (artwork, player, controls, settings) is a Layout made
  from Media pieces. If a Layout needs markup of its own, a piece is missing: add the piece.
- **Nothing fits?** Pick the closest and say so in the pull request. A new category is added only when three or
  more pieces share a job no category covers; add it to the table above, to \`CATEGORIES\` in
  \`src/organization.test.ts\` and to the sidebar order in \`.storybook/preview.tsx\`, in the same pull request.
- **Moving a piece to another category is free.** It changes the Storybook title and nothing else.

## Names are the promise

Apps break when a name changes, never when a piece moves. So:

1. **A name is permanent once it is released.** Choose it for what the piece is, not for the app it came from:
   \`Scrubber\`, not \`PearcastScrubber\`. No app names inside names.
2. **A rename keeps the old name.** Export the new name, keep the old one as an alias marked \`@deprecated\`, and
   leave it for at least one release. The same goes for a prop: add the new one, keep the old one working.
3. **Removing a name is a breaking change.** It needs a major changeset with a note on what to use instead.
4. **The list is checked.** \`scripts/public-names.txt\` holds every name apps can import. The build fails if a
   listed name disappears, or if a new name is not on the list. After adding a name on purpose:

   \`\`\`sh
   UPDATE_NAMES=1 npx vitest run --project unit organization
   \`\`\`

   and commit the changed list. Never delete a line from it to make the check pass.

## Adding a piece: the checklist

1. \`src/components/<Name>/<Name>.tsx\`, plus \`index.ts\`, exported from \`src/components/index.ts\`. The folder is
   named after the piece, not the category: folders stay flat.
2. \`src/components/<Name>/<Name>.stories.tsx\` with \`title: '<Category>/<Name>'\`, a \`Playground\` story and at
   least one story showing the real variants.
3. React Native primitives only, styled with \`className\` and theme tokens. Works in both built-in themes.
4. Update the names list (command above) and add a changeset (\`npm run changeset\`).
5. Pull request into \`develop\`, titled \`type(Name): subject\` with a lowercase subject, for example
   \`feat(Scrubber): add chapter marks\`.

The longer guide to the code itself is \`docs/contributing.md\`.
`})))()}function l(e){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{title:`Docs/Organization`}),`
`,(0,d.jsx)(i,{children:s})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;function f(){return(f=e((()=>{d=t(),r(),o(),c()})))()}f();export{u as default};