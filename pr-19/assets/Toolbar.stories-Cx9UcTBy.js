import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{N as n,a as r,u as i}from"./iframe-BhG_hyu7.js";import{a,i as o,n as s,r as c,t as l}from"./Toolbar-C_nvgHay.js";var u,d,f,p,m;function h(){return(h=e((()=>{u=t(),i(),a(),d=r(),f={title:`Components/Toolbar`,component:l,subcomponents:{ToolbarButton:s,ToolbarSeparator:c,ToolbarSpacer:o},parameters:{docs:{description:{component:"52px action bar at the top of a pane. `ToolbarButton`s show a tooltip with label + shortcut; `dragRegion` lets empty space drag a frameless Electron window."}}},decorators:[e=>(0,d.jsx)(n,{style:{width:580,height:120},className:`rounded-card border border-overlay/[0.06]`,children:(0,d.jsx)(e,{})})]},p={name:`Detail toolbar`,render:()=>{let[e,t]=(0,u.useState)(!0),[n,r]=(0,u.useState)(!1);return(0,d.jsxs)(l,{children:[(0,d.jsx)(s,{icon:e?`star-bold`:`star`,tone:e?`favorite`:void 0,label:e?`Unfavorite`:`Favorite`,onPress:()=>t(!e)}),(0,d.jsx)(s,{icon:`copy`,label:`Copy link`,shortcut:`⌘C`,active:!0,tooltipOpen:!0}),(0,d.jsx)(s,{icon:`scan-barcode`,label:`Show QR`}),(0,d.jsx)(s,{icon:`folder-open`,label:`Show in Finder`,shortcut:`⌘R`}),(0,d.jsx)(c,{}),(0,d.jsx)(s,{icon:n?`play`:`pause`,label:n?`Resume`:`Pause`,onPress:()=>r(!n)}),(0,d.jsx)(o,{}),(0,d.jsx)(s,{icon:`info-circle`,label:`Inspector`,tone:`primary`})]})}},m=[`DetailToolbar`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Detail toolbar',
  render: () => {
    const [fav, setFav] = useState(true);
    const [paused, setPaused] = useState(false);
    return <Toolbar>
        <ToolbarButton icon={fav ? 'star-bold' : 'star'} tone={fav ? 'favorite' : undefined} label={fav ? 'Unfavorite' : 'Favorite'} onPress={() => setFav(!fav)} />
        <ToolbarButton icon="copy" label="Copy link" shortcut="⌘C" active tooltipOpen />
        <ToolbarButton icon="scan-barcode" label="Show QR" />
        <ToolbarButton icon="folder-open" label="Show in Finder" shortcut="⌘R" />
        <ToolbarSeparator />
        <ToolbarButton icon={paused ? 'play' : 'pause'} label={paused ? 'Resume' : 'Pause'} onPress={() => setPaused(!paused)} />
        <ToolbarSpacer />
        <ToolbarButton icon="info-circle" label="Inspector" tone="primary" />
      </Toolbar>;
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as DetailToolbar,m as __namedExportsOrder,f as default};