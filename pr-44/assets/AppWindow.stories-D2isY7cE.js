import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,t as n}from"./Text-CGstUeEZ.js";import{L as r,a as i,u as a}from"./iframe-BRms_EWO.js";import{i as o,n as s,r as c,t as l}from"./AppWindow-TB-boIFX.js";import{c as u,i as d,l as f,s as p,t as m}from"./Sidebar-Duy71I6W.js";import{n as h,r as g}from"./WindowControls-D_C6waK5.js";var _,v,y,b,x,S;function C(){return(C=e((()=>{a(),o(),t(),f(),g(),_=i(),v={title:`AppWindow & Pane`,component:l,subcomponents:{Pane:s,PaneBody:c},parameters:{docs:{description:{component:"Layout skeleton. `AppWindow` is the row of panes (optionally `framed` with rounded chrome for previews); `Pane` is a fixed-width or flexible column with a `surface`, hairline and optional brand `glow`; `PaneBody` scrolls its content."}}},args:{framed:!0}},y=({children:e})=>(0,_.jsx)(r,{className:`flex-1 items-center justify-center`,children:(0,_.jsx)(n,{variant:`label`,tone:`subtle`,children:e})}),b={name:`Three panes`,render:e=>(0,_.jsx)(r,{style:{height:420,width:900},children:(0,_.jsxs)(l,{...e,children:[(0,_.jsxs)(m,{resizable:!0,children:[(0,_.jsxs)(d,{children:[(0,_.jsx)(h,{}),(0,_.jsx)(p,{}),(0,_.jsx)(u,{})]}),(0,_.jsx)(y,{children:`Sidebar (resizable)`})]}),(0,_.jsx)(s,{width:300,surface:`pane`,bordered:!0,children:(0,_.jsx)(y,{children:`Pane · width 300 · surface pane`})}),(0,_.jsx)(s,{glow:!0,children:(0,_.jsx)(y,{children:`Pane · flex · glow`})})]})})},x={name:`Two panes`,render:e=>(0,_.jsx)(r,{style:{height:320,width:720},children:(0,_.jsxs)(l,{...e,children:[(0,_.jsx)(s,{width:280,surface:`pane`,bordered:!0,children:(0,_.jsx)(y,{children:`List`})}),(0,_.jsx)(s,{children:(0,_.jsx)(c,{contentClassName:`p-6 gap-2`,children:Array.from({length:12},(e,t)=>(0,_.jsxs)(n,{variant:`label`,children:[`Scrollable row `,t+1]},t))})})]})})},S=[`ThreePanes`,`TwoPanes`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Three panes',
  render: args => <View style={{
    height: 420,
    width: 900
  }}>
      <AppWindow {...args}>
        <Sidebar resizable>
          <SidebarHeader><WindowControls /><SidebarSpacer /><SidebarToggle /></SidebarHeader>
          <Label>Sidebar (resizable)</Label>
        </Sidebar>
        <Pane width={300} surface="pane" bordered><Label>Pane · width 300 · surface pane</Label></Pane>
        <Pane glow><Label>Pane · flex · glow</Label></Pane>
      </AppWindow>
    </View>
}`,...b.parameters?.docs?.source},description:{story:`Sidebar + list + detail: the three-pane desktop skeleton.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Two panes',
  render: args => <View style={{
    height: 320,
    width: 720
  }}>
      <AppWindow {...args}>
        <Pane width={280} surface="pane" bordered><Label>List</Label></Pane>
        <Pane><PaneBody contentClassName="p-6 gap-2">{Array.from({
            length: 12
          }, (_, i) => <Text key={i} variant="label">Scrollable row {i + 1}</Text>)}</PaneBody></Pane>
      </AppWindow>
    </View>
}`,...x.parameters?.docs?.source}}}})))()}C();export{b as ThreePanes,x as TwoPanes,S as __namedExportsOrder,v as default};