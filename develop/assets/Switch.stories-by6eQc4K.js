import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-DPCVfO3F.js";import{L as a,a as o,u as s}from"./iframe-BSicNSaw.js";import{n as c,t as l}from"./Switch-Ch7X8UZq.js";import{i as u,n as d}from"./helpers-CR-59dX5.js";function f({start:e=!0,...t}){let[n,r]=(0,p.useState)(e);return(0,m.jsx)(l,{value:n,onValueChange:r,...t})}var p,m,h,g,_,v;function y(){return(y=e((()=>{p=t(n()),s(),c(),r(),u(),m=o(),h={title:`Components/Switch`,component:l,parameters:{docs:{description:{component:`On or off, as a switch: the track fills with the brand colour and the thumb slides right. A switch reads as a state, where a button reads as an action.`}}},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]}},args:{value:!0,size:`md`,accessibilityLabel:`Camera`}},g={render:e=>(0,m.jsx)(f,{start:e.value,size:e.size,disabled:e.disabled,accessibilityLabel:e.accessibilityLabel})},_={render:()=>(0,m.jsxs)(a,{className:`gap-6`,children:[(0,m.jsxs)(d,{title:`Press it`,children:[(0,m.jsx)(f,{accessibilityLabel:`Camera`}),(0,m.jsx)(f,{start:!1,accessibilityLabel:`Microphone`})]}),(0,m.jsxs)(d,{title:`Small, in a dense row`,children:[(0,m.jsx)(f,{size:`sm`,accessibilityLabel:`Loop`}),(0,m.jsx)(f,{size:`sm`,start:!1,accessibilityLabel:`Captions`})]}),(0,m.jsx)(d,{title:`In a row with its name`,children:(0,m.jsxs)(a,{className:`w-72 flex-row items-center justify-between rounded-xl bg-overlay/5 px-3 py-2`,children:[(0,m.jsx)(i,{variant:`body-sm`,children:`Camera`}),(0,m.jsx)(f,{accessibilityLabel:`Camera`})]})}),(0,m.jsxs)(d,{title:`Disabled`,children:[(0,m.jsx)(l,{value:!0,onValueChange:()=>{},disabled:!0,accessibilityLabel:`Locked`}),(0,m.jsx)(l,{value:!1,onValueChange:()=>{},disabled:!0,accessibilityLabel:`Locked`})]})]})},v=[`Playground`,`Variants`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Live start={args.value} size={args.size} disabled={args.disabled} accessibilityLabel={args.accessibilityLabel} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-6">
      <Showcase title="Press it">
        <Live accessibilityLabel="Camera" />
        <Live start={false} accessibilityLabel="Microphone" />
      </Showcase>
      <Showcase title="Small, in a dense row">
        <Live size="sm" accessibilityLabel="Loop" />
        <Live size="sm" start={false} accessibilityLabel="Captions" />
      </Showcase>
      <Showcase title="In a row with its name">
        <View className="w-72 flex-row items-center justify-between rounded-xl bg-overlay/5 px-3 py-2">
          <Text variant="body-sm">Camera</Text>
          <Live accessibilityLabel="Camera" />
        </View>
      </Showcase>
      <Showcase title="Disabled">
        <Switch value onValueChange={() => {}} disabled accessibilityLabel="Locked" />
        <Switch value={false} onValueChange={() => {}} disabled accessibilityLabel="Locked" />
      </Showcase>
    </View>
}`,..._.parameters?.docs?.source}}}})))()}y();export{g as Playground,_ as Variants,v as __namedExportsOrder,h as default};