import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,t as n}from"./Text-CPaIl-yS.js";import{Y as r,Z as i,a,et as o,n as s,nt as c,r as l,tt as u,u as d,z as f}from"./iframe-DCe4DXPm.js";import{n as p,t as m}from"./Button-DbkpAyom.js";import{n as h,t as g}from"./StatusPill-Z3DfVMpq.js";import{n as _,t as v}from"./Card-Dj_s5b7B.js";import{n as y,t as b}from"./NetworkStatusCard-BgL9M0LR.js";import{n as x,t as S}from"./ShareRow-ClyaVpvy.js";import{n as C,t as w}from"./shares-VQWspGVD.js";function T({theme:e}){return(0,E.jsxs)(s,{theme:e,className:`flex-1 gap-3 bg-background p-5`,style:{minWidth:300},children:[(0,E.jsx)(n,{variant:`overline`,children:e.name}),(0,E.jsxs)(f,{className:`flex-row gap-2`,children:[(0,E.jsx)(m,{variant:`primary`,glow:!0,icon:`arrow-up`,label:`Send`,fill:!0,size:`lg`}),(0,E.jsx)(m,{variant:`secondary`,icon:`arrow-down`,label:`Receive`,fill:!0,size:`lg`})]}),(0,E.jsx)(S,{name:`photo_2.mp4`,meta:[`Video`,`1.2 GB`],thumbnail:{source:w.videoDusk},status:`sharing`,progress:.72,timestamp:`now`,selected:!0}),(0,E.jsx)(S,{name:`Personal`,meta:[`Folder`,`12 files`],thumbnail:{kind:`folder`},status:`completed`,timestamp:`2h`,favorite:!0}),(0,E.jsx)(v,{size:`sm`,children:(0,E.jsxs)(f,{className:`flex-row gap-2`,children:[(0,E.jsx)(g,{status:`active`}),(0,E.jsx)(g,{status:`failed`})]})}),(0,E.jsx)(b,{peers:3,upload:`1.2 MB/s`,download:`3.8 MB/s`})]})}var E,D,O,k,A,j,M;function N(){return(N=e((()=>{d(),p(),_(),y(),x(),h(),t(),l(),i(),u(),C(),E=a(),D={title:`Foundations/Theming`,parameters:{layout:`fullscreen`,docs:{description:{component:"Themes are plain objects. `ThemeProvider` turns one into CSS variables that the Tailwind preset reads, so switching or nesting themes is instant and never needs a Tailwind rebuild. Derive your own with `createTheme(base, overrides)`."}}}},O=r(c,{name:`sunset`,colors:{primary:`#f97316`,"primary-strong":`#ef4444`,"primary-text":`#c2410c`,"primary-foreground":`#ffffff`,selected:`#ffedd5`,sidebar:`#fff7ed`,"sidebar-to":`#ffedd5`}}),k=r(o,{name:`grape`,colors:{background:`#0e0a14`,pane:`#120d1a`,primary:`#c084fc`,"primary-strong":`#7c3aed`,"primary-text":`#d8b4fe`,selected:`#2e1a47`,sidebar:`#1a1325`,"sidebar-to":`#130e1c`}}),A={name:`Side by side`,render:()=>(0,E.jsxs)(f,{className:`flex-row flex-wrap`,children:[(0,E.jsx)(T,{theme:o}),(0,E.jsx)(T,{theme:c}),(0,E.jsx)(T,{theme:k}),(0,E.jsx)(T,{theme:O})]})},j={name:`Inline overrides`,render:()=>(0,E.jsxs)(s,{overrides:{colors:{primary:`#38bdf8`,"primary-strong":`#6366f1`,"primary-text":`#7dd3fc`}},className:`gap-3 bg-background p-6`,children:[(0,E.jsx)(n,{variant:`label`,tone:`muted`,children:`<ThemeProvider overrides={{ colors: { primary: '#38bdf8' } }}>`}),(0,E.jsxs)(f,{className:`flex-row gap-2`,style:{width:360},children:[(0,E.jsx)(m,{variant:`primary`,glow:!0,icon:`copy`,label:`Copy Link`,fill:!0}),(0,E.jsx)(m,{variant:`secondary`,icon:`import`,label:`Save QR`,fill:!0})]})]})},M=[`SideBySide`,`InlineOverrides`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Side by side',
  render: () => <View className="flex-row flex-wrap">
      <Sample theme={darkTheme} />
      <Sample theme={lightTheme} />
      <Sample theme={grape} />
      <Sample theme={sunset} />
    </View>
}`,...A.parameters?.docs?.source},description:{story:"Four themes side by side — two built in, two made with `createTheme`. Each column is its own nested `ThemeProvider`.",...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Inline overrides',
  render: () => <ThemeProvider overrides={{
    colors: {
      primary: '#38bdf8',
      'primary-strong': '#6366f1',
      'primary-text': '#7dd3fc'
    }
  }} className="gap-3 bg-background p-6">
      <Text variant="label" tone="muted">{"<ThemeProvider overrides={{ colors: { primary: '#38bdf8' } }}>"}</Text>
      <View className="flex-row gap-2" style={{
      width: 360
    }}>
        <Button variant="primary" glow icon="copy" label="Copy Link" fill />
        <Button variant="secondary" icon="import" label="Save QR" fill />
      </View>
    </ThemeProvider>
}`,...j.parameters?.docs?.source},description:{story:"Patch a couple of tokens inline with `overrides` — no theme object needed.",...j.parameters?.docs?.description}}}})))()}N();export{j as InlineOverrides,A as SideBySide,M as __namedExportsOrder,D as default};