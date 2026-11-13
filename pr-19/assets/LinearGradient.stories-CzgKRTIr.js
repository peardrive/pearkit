import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,t as n}from"./Text-TdLxycB9.js";import{N as r,a as i,u as a}from"./iframe-BhG_hyu7.js";import{n as o,r as s,t as c}from"./LinearGradient-YHV6xPSD.js";var l,u,d,f,p;function m(){return(m=e((()=>{a(),s(),t(),l=i(),u={title:`Components/Gradient`,component:c,parameters:{docs:{description:{component:"SVG-based gradients that render the same on native and web. `LinearGradient` paints the sidebar and progress bars; `RadialGlow` the soft corner light in the detail pane."}}},argTypes:{direction:{control:`select`,options:[`to-right`,`to-left`,`to-bottom`,`to-top`,`to-bottom-right`,`to-top-right`]}},args:{colors:[`#fbbf24`,`#a6ce39`],direction:`to-right`,radius:14}},d={render:e=>(0,l.jsx)(r,{style:{width:320,height:120},children:(0,l.jsx)(c,{...e})})},f={render:()=>(0,l.jsxs)(r,{className:`overflow-hidden rounded-card border border-overlay/[0.06] bg-background p-6`,style:{width:420,height:260},children:[(0,l.jsx)(o,{color:`#a6ce39`,intensity:.12}),(0,l.jsx)(n,{variant:`title`,children:`Detail pane glow`})]})},p=[`Linear`,`Glow`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <View style={{
    width: 320,
    height: 120
  }}><LinearGradient {...args} /></View>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <View className="overflow-hidden rounded-card border border-overlay/[0.06] bg-background p-6" style={{
    width: 420,
    height: 260
  }}>
      <RadialGlow color="#a6ce39" intensity={0.12} />
      <Text variant="title">Detail pane glow</Text>
    </View>
}`,...f.parameters?.docs?.source}}}})))()}m();export{f as Glow,d as Linear,p as __namedExportsOrder,u as default};