import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-DPCVfO3F.js";import{L as a,a as o,u as s}from"./iframe-BSicNSaw.js";import{t as c}from"./format-BcbbYMrm.js";import{n as l,t as u}from"./ResizeHandle-CEsB9q7r.js";function d(){let[e,t]=(0,p.useState)(220),n=(0,p.useRef)(e);return(0,m.jsxs)(a,{className:`h-[260px] w-[640px] flex-row rounded-card bg-overlay/[0.02] p-2`,children:[(0,m.jsx)(a,{className:`justify-center rounded-lg bg-overlay/[0.05] px-3`,style:{width:e},children:(0,m.jsx)(i,{variant:`label`,tone:`muted`,children:`${e} px`})}),(0,m.jsx)(u,{onResizeStart:()=>n.current=e,onResize:e=>t(c(Math.round(n.current+e),140,440)),onReset:()=>t(220),onStep:e=>t(t=>c(t+e*16,140,440)),accessibilityValue:{min:140,max:440,now:e}}),(0,m.jsx)(a,{className:`flex-1 rounded-lg bg-overlay/[0.05]`})]})}function f(){let[e,t]=(0,p.useState)(140),n=(0,p.useRef)(e);return(0,m.jsxs)(a,{className:`h-[320px] w-[420px] rounded-card bg-overlay/[0.02] p-2`,children:[(0,m.jsx)(a,{className:`rounded-lg bg-overlay/[0.05]`,style:{height:e}}),(0,m.jsx)(u,{orientation:`horizontal`,onResizeStart:()=>n.current=e,onResize:e=>t(c(Math.round(n.current+e),60,240)),onReset:()=>t(140)}),(0,m.jsx)(a,{className:`flex-1 rounded-lg bg-overlay/[0.05]`})]})}var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{p=t(n()),s(),l(),r(),m=o(),h={title:`App frame/ResizeHandle`,component:u,parameters:{docs:{description:{component:"The grab bar between two panes: a wide hit area in the gutter with a short bar in its middle — faint at rest, lit on hover and while dragging. It reports the drag; the parent sets the sizes. `Sidebar` uses it for its resizable edge."}}},argTypes:{orientation:{control:`inline-radio`,options:[`vertical`,`horizontal`]},barLength:{control:`text`,description:`'75%', a number of px, or 'full'`}},args:{orientation:`vertical`,thickness:12,barLength:`75%`,hideAtRest:!1}},g={render:e=>(0,m.jsxs)(a,{className:`h-[220px] flex-row rounded-card bg-overlay/[0.02] p-2`,style:e.orientation===`horizontal`?{flexDirection:`column`,width:360}:void 0,children:[(0,m.jsx)(a,{className:`flex-1 rounded-lg bg-overlay/[0.04]`}),(0,m.jsx)(u,{...e}),(0,m.jsx)(a,{className:`flex-1 rounded-lg bg-overlay/[0.04]`})]})},_={name:`Between two panes`,render:()=>(0,m.jsx)(d,{})},v={name:`Stacked panes`,render:()=>(0,m.jsx)(f,{})},y={name:`Full-length bar`,render:()=>(0,m.jsxs)(a,{className:`h-[220px] w-[420px] flex-row rounded-card bg-overlay/[0.02] p-2`,children:[(0,m.jsx)(a,{className:`flex-1 rounded-lg bg-overlay/[0.05]`}),(0,m.jsx)(u,{barLength:`full`}),(0,m.jsx)(a,{className:`flex-1 rounded-lg bg-overlay/[0.05]`})]})},b=[`Playground`,`BetweenTwoPanes`,`StackedPanes`,`FullLength`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <View className="h-[220px] flex-row rounded-card bg-overlay/[0.02] p-2" style={args.orientation === 'horizontal' ? {
    flexDirection: 'column',
    width: 360
  } : undefined}>
      <View className="flex-1 rounded-lg bg-overlay/[0.04]" />
      <ResizeHandle {...args} />
      <View className="flex-1 rounded-lg bg-overlay/[0.04]" />
    </View>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Between two panes',
  render: () => <Columns />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Stacked panes',
  render: () => <Stacked />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Full-length bar',
  render: () => <View className="h-[220px] w-[420px] flex-row rounded-card bg-overlay/[0.02] p-2">
      <View className="flex-1 rounded-lg bg-overlay/[0.05]" />
      <ResizeHandle barLength="full" />
      <View className="flex-1 rounded-lg bg-overlay/[0.05]" />
    </View>
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as BetweenTwoPanes,y as FullLength,g as Playground,v as StackedPanes,b as __namedExportsOrder,h as default};