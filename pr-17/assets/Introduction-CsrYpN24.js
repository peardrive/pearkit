import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{l as t}from"./iframe-CmcEqaQC.js";import{i as n,r}from"./react-BfaX7MxJ.js";import{o as i,s as a}from"./blocks-CtYECHkH.js";function o(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{title:`Introduction`}),`
`,(0,c.jsx)(`img`,{src:`./assets/header.png`,alt:`pearkit — components layered from primitives to a full PearDrop window`,style:{width:`100%`,borderRadius:14}}),`
`,(0,c.jsx)(t.h1,{id:`pearkit`,children:`pearkit`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`One set of React components for React Native `,(0,c.jsx)(t.em,{children:`and`}),` Electron`]}),`, styled with Tailwind (via `,(0,c.jsx)(t.a,{href:`https://www.nativewind.dev`,rel:`nofollow`,children:`NativeWind`}),`) and themeable at runtime. pearkit is the UI layer of the PearDrive apps — the components here were broken down from the PearDrop desktop design.`]}),`
`,(0,c.jsx)(t.h2,{id:`how-its-built`,children:`How it's built`}),`
`,(0,c.jsxs)(t.p,{children:[`| Layer | What it does |
| --- | --- |
| `,(0,c.jsx)(t.strong,{children:`React Native primitives`}),` | Every component is made of `,(0,c.jsx)(t.code,{children:`View`}),`, `,(0,c.jsx)(t.code,{children:`Text`}),`, `,(0,c.jsx)(t.code,{children:`Pressable`}),`, `,(0,c.jsx)(t.code,{children:`TextInput`}),` and `,(0,c.jsx)(t.code,{children:`react-native-svg`}),`. On iOS/Android they're native; in Electron they render to the DOM through `,(0,c.jsx)(t.code,{children:`react-native-web`}),`. |
| `,(0,c.jsx)(t.strong,{children:`Tailwind via NativeWind`}),` | Components are styled with `,(0,c.jsx)(t.code,{children:`className`}),`. The same classes compile to CSS on the web and to native styles on mobile. Every component accepts `,(0,c.jsx)(t.code,{children:`className`}),` and later classes win (`,(0,c.jsx)(t.code,{children:`tailwind-merge`}),`). |
| `,(0,c.jsx)(t.strong,{children:`Runtime themes`}),` | `,(0,c.jsx)(t.code,{children:`ThemeProvider`}),` turns a theme object into `,(0,c.jsx)(t.code,{children:`--pk-*`}),` CSS variables. The Tailwind preset maps colours to those variables, so `,(0,c.jsx)(t.code,{children:`bg-primary`}),` follows the active theme. Themes can be switched or nested without a rebuild. |`]}),`
`,(0,c.jsx)(t.h2,{id:`whats-inside`,children:`What's inside`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Foundations`}),` — colour tokens, type scale, 37 icons (22 exported straight from the Figma file).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Components`}),` — Button, IconButton, Tooltip, StatusPill / StatusDot, CountBadge, ProgressBar, SearchField, Thumbnail, Avatar, PeerChip, QRCode, LinkField, KeyValueList, EmptyState, TextField, Dialog, Card, Divider, Kbd, SectionLabel, Spacer, Gradient, WindowControls, Sidebar (resizable, collapsible), Toolbar, PaneHeader, AppWindow / Pane.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Patterns`}),` — the PearDrop building blocks: ShareRow, FileHeader, TransferCard, ShareLinkCard, NetworkStatusCard, DangerZone.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Layouts`}),` — full desktop and mobile screens composed only from the above. They double as living examples and catch regressions when a component changes.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Use the `,(0,c.jsx)(t.strong,{children:`Theme`}),` switcher in the toolbar to see every story in Pear Dark, Pear Light, or a custom theme.`]}),`
`,(0,c.jsx)(t.h2,{id:`next`,children:`Next`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`?path=/docs/docs-getting-started--docs`,children:`Getting started`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`?path=/docs/docs-theming--docs`,children:`Theming`})}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`?path=/docs/docs-electron--docs`,children:`Electron`}),` · `,(0,c.jsx)(t.a,{href:`?path=/docs/docs-react-native--docs`,children:`React Native`})]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=t(),r(),a()})))()}l();export{s as default};