import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,t as n}from"./Text-C7CcZ4xr.js";import{N as r,a as i,u as a}from"./iframe-CmcEqaQC.js";import{n as o,r as s}from"./WindowControls-Z0cu_li-.js";import{c,i as l,l as u,s as d,t as f}from"./Sidebar-BWI2crTs.js";import{i as p,n as m,r as h,t as g}from"./AppWindow-CNKRr2L2.js";var _,v,y,b,x,S;function C(){return(C=e((()=>{a(),p(),t(),u(),s(),_=i(),v={title:`Components/AppWindow & Pane`,component:g,subcomponents:{Pane:m,PaneBody:h},parameters:{docs:{description:{component:"Layout skeleton. `AppWindow` is the row of panes (optionally `framed` with rounded chrome for previews); `Pane` is a fixed-width or flexible column with a `surface`, hairline and optional brand `glow`; `PaneBody` scrolls its content."}}},args:{framed:!0}},y=({children:e})=>(0,_.jsx)(r,{className:`flex-1 items-center justify-center`,children:(0,_.jsx)(n,{variant:`label`,tone:`subtle`,children:e})}),b={name:`Three panes`,render:e=>(0,_.jsx)(r,{style:{height:420,width:900},children:(0,_.jsxs)(g,{...e,children:[(0,_.jsxs)(f,{resizable:!0,children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(o,{}),(0,_.jsx)(d,{}),(0,_.jsx)(c,{})]}),(0,_.jsx)(y,{children:`Sidebar (resizable)`})]}),(0,_.jsx)(m,{width:300,surface:`pane`,bordered:!0,children:(0,_.jsx)(y,{children:`Pane · width 300 · surface pane`})}),(0,_.jsx)(m,{glow:!0,children:(0,_.jsx)(y,{children:`Pane · flex · glow`})})]})})},x={name:`Two panes`,render:e=>(0,_.jsx)(r,{style:{height:320,width:720},children:(0,_.jsxs)(g,{...e,children:[(0,_.jsx)(m,{width:280,surface:`pane`,bordered:!0,children:(0,_.jsx)(y,{children:`List`})}),(0,_.jsx)(m,{children:(0,_.jsx)(h,{contentClassName:`p-6 gap-2`,children:Array.from({length:12},(e,t)=>(0,_.jsxs)(n,{variant:`label`,children:[`Scrollable row `,t+1]},t))})})]})})},S=[`ThreePanes`,`TwoPanes`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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