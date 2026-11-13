import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-TdLxycB9.js";import{N as i,a,u as o}from"./iframe-BhG_hyu7.js";import{n as s,t as c}from"./Button-BbccsKRQ.js";import{n as l,r as u}from"./WindowControls-R0KhuGGD.js";import{a as d,c as f,i as p,l as m,n as h,o as g,r as _,s as v,t as y,u as b}from"./Sidebar-Bm_gwEjX.js";import{n as x,t as S}from"./NetworkStatusCard-BDAstH9i.js";import{i as C,r as w}from"./helpers-Bti-25oI.js";function T(){let{collapsed:e}=b();return(0,A.jsxs)(i,{className:e?`items-center gap-2 pb-2.5`:`w-full flex-row gap-2 pb-2.5`,children:[(0,A.jsx)(c,{variant:`primary`,size:`lg`,glow:!0,fill:!e,icon:`arrow-up`,label:e?void 0:`Send`,accessibilityLabel:`Send`}),(0,A.jsx)(c,{variant:`secondary`,size:`lg`,fill:!e,icon:`arrow-down`,label:e?void 0:`Receive`,accessibilityLabel:`Receive`})]})}function E(){let{collapsed:e}=b();return(0,A.jsxs)(_,{children:[(0,A.jsx)(S,{compact:e,peers:3,upload:`1.2 MB/s`,download:`3.8 MB/s`}),(0,A.jsx)(d,{icon:`setting-2-bold`,label:`Settings`})]})}function D(){let[e,t]=(0,k.useState)(`all`),n=(n,r)=>(0,A.jsx)(d,{...r,selected:e===n,onPress:()=>t(n)});return(0,A.jsxs)(h,{children:[(0,A.jsxs)(g,{title:`Library`,children:[n(`all`,{icon:`grid-1`,label:`All Shares`,count:12}),n(`sharing`,{icon:`export`,label:`Sharing now`,badge:{value:2,tone:`warning`}}),n(`received`,{icon:`import`,label:`Received`,count:5}),n(`favorites`,{icon:`star`,label:`Favorites`,count:2})]}),(0,A.jsxs)(g,{title:`Status`,children:[n(`active`,{dot:`success`,label:`Active`,count:3}),n(`completed`,{dot:`primary`,label:`Completed`,count:4}),n(`failed`,{dot:`danger`,label:`Failed`,badge:{value:1,tone:`danger`}}),n(`inactive`,{dot:`neutral`,label:`Inactive`,count:2})]}),(0,A.jsxs)(g,{title:`Folders`,children:[n(`personal`,{icon:`folder`,iconTone:`accent`,label:`Personal`,count:12}),n(`personal01`,{icon:`folder`,iconTone:`accent`,label:`Personal 01`,count:2})]})]})}function O(e){return(0,A.jsxs)(y,{...e,children:[(0,A.jsxs)(p,{children:[(0,A.jsx)(l,{}),(0,A.jsx)(v,{}),(0,A.jsx)(f,{tooltip:`Toggle sidebar`})]}),(0,A.jsx)(T,{}),(0,A.jsx)(D,{}),(0,A.jsx)(E,{})]})}var k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{k=t(),o(),m(),u(),s(),x(),n(),C(),A=a(),j={title:`Components/Sidebar`,component:y,subcomponents:{SidebarHeader:p,SidebarSection:g,SidebarItem:d,SidebarContent:h,SidebarFooter:_,SidebarToggle:f},parameters:{layout:`fullscreen`,docs:{description:{component:"App sidebar built from composable parts. Key features:\n- **`resizable`** — drag the right edge with mouse, touch or pen (PanResponder, so it works on native too). Clamped to `minWidth`/`maxWidth`; double-click the handle to reset; arrow keys / screen-reader increment & decrement adjust it.\n- **Collapsible icon rail** — `SidebarToggle` or dragging past `minWidth` collapses to `collapsedWidth`; items turn into icons with tooltips. Read the state anywhere with `useSidebar()`.\n- Controlled or uncontrolled (`width`/`defaultWidth`, `collapsed`/`defaultCollapsed`), with `onResizeEnd` for persisting the width."}}},args:{resizable:!0,defaultWidth:236,minWidth:200,maxWidth:380,collapsedWidth:76},decorators:[e=>(0,A.jsx)(i,{style:{height:640},className:`flex-row bg-background`,children:(0,A.jsx)(e,{})})]},M={render:e=>{let[t,n]=(0,k.useState)(e.defaultWidth??236);return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(O,{...e,onWidthChange:n}),(0,A.jsxs)(i,{className:`flex-1 items-center justify-center gap-1`,children:[(0,A.jsxs)(r,{variant:`title`,children:[t,`px`]}),(0,A.jsx)(r,{variant:`caption`,children:`Drag the sidebar edge · ←/→ when focused · double-click to reset`})]})]})}},N={render:e=>(0,A.jsx)(O,{...e,defaultCollapsed:!0})},P={name:`Fixed width (not resizable)`,render:e=>(0,A.jsx)(O,{...e,resizable:!1})},F={render:e=>(0,A.jsx)(O,{...e,gradient:!1,defaultWidth:260,minWidth:220,maxWidth:300})},I={name:`SidebarItem`,parameters:{layout:`padded`},decorators:[e=>(0,A.jsx)(i,{className:`p-6`,children:(0,A.jsx)(e,{})})],render:()=>(0,A.jsxs)(w,{children:[(0,A.jsx)(d,{icon:`grid-1`,label:`Selected`,count:12,selected:!0}),(0,A.jsx)(d,{icon:`export`,label:`With badge`,badge:{value:2,tone:`warning`}}),(0,A.jsx)(d,{dot:`success`,label:`With status dot`,count:3}),(0,A.jsx)(d,{icon:`folder`,iconTone:`accent`,label:`Custom icon tone`,count:12}),(0,A.jsx)(d,{icon:`star`,label:`Disabled`,disabled:!0}),(0,A.jsx)(d,{icon:`import`,label:`A very long label that truncates nicely`,count:5})]})},L=[`Resizable`,`Collapsed`,`Fixed`,`Configured`,`Items`],M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [width, setWidth] = useState(args.defaultWidth ?? 236);
    return <>
        <FullSidebar {...args} onWidthChange={setWidth} />
        <View className="flex-1 items-center justify-center gap-1">
          <Text variant="title">{width}px</Text>
          <Text variant="caption">Drag the sidebar edge · ←/→ when focused · double-click to reset</Text>
        </View>
      </>;
  }
}`,...M.parameters?.docs?.source},description:{story:`Drag the right edge. Drag far left to collapse, double-click the edge to reset.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <FullSidebar {...args} defaultCollapsed />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Fixed width (not resizable)',
  render: args => <FullSidebar {...args} resizable={false} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <FullSidebar {...args} gradient={false} defaultWidth={260} minWidth={220} maxWidth={300} />
}`,...F.parameters?.docs?.source},description:{story:`Plain background instead of the gradient, narrower bounds.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'SidebarItem',
  parameters: {
    layout: 'padded'
  },
  decorators: [Story => <View className="p-6"><Story /></View>],
  render: () => <SidebarSurface>
      <SidebarItem icon="grid-1" label="Selected" count={12} selected />
      <SidebarItem icon="export" label="With badge" badge={{
      value: 2,
      tone: 'warning'
    }} />
      <SidebarItem dot="success" label="With status dot" count={3} />
      <SidebarItem icon="folder" iconTone="accent" label="Custom icon tone" count={12} />
      <SidebarItem icon="star" label="Disabled" disabled />
      <SidebarItem icon="import" label="A very long label that truncates nicely" count={5} />
    </SidebarSurface>
}`,...I.parameters?.docs?.source}}}})))()}R();export{N as Collapsed,F as Configured,P as Fixed,I as Items,M as Resizable,L as __namedExportsOrder,j as default};