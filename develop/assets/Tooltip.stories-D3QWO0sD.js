import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{N as t,a as n,u as r}from"./iframe-CmcEqaQC.js";import{n as i,t as a}from"./Button-Ha-yBppa.js";import{n as o,t as s}from"./Tooltip-CWOaHZxy.js";import{n as c,t as l}from"./IconButton-ZG8QwaRa.js";var u,d,f,p,m,h;function g(){return(g=e((()=>{r(),o(),c(),i(),u=n(),d={title:`Components/Tooltip`,component:s,parameters:{docs:{description:{component:`Hover tooltip with an optional shortcut. Hover on desktop / web, long-press on touch. Sizes to its content without measuring, so it behaves identically on native and web.`}}},argTypes:{placement:{control:`inline-radio`,options:[`top`,`bottom`,`left`,`right`]}},args:{label:`Copy link`,shortcut:`⌘C`,placement:`bottom`,defaultOpen:!0},decorators:[e=>(0,u.jsx)(t,{className:`items-center p-16`,children:(0,u.jsx)(e,{})})]},f={render:e=>(0,u.jsx)(s,{...e,children:(0,u.jsx)(l,{icon:`copy`,active:!0,accessibilityLabel:`Copy link`})})},p={render:()=>(0,u.jsx)(t,{className:`flex-row gap-16`,children:[`top`,`bottom`,`left`,`right`].map(e=>(0,u.jsx)(s,{label:e,placement:e,defaultOpen:!0,children:(0,u.jsx)(a,{size:`sm`,label:e})},e))})},m={name:`On hover`,render:()=>(0,u.jsx)(s,{label:`Show in Finder`,shortcut:`⌘R`,children:(0,u.jsx)(l,{icon:`folder-open`,accessibilityLabel:`Show in Finder`})})},h=[`Playground`,`Placements`,`OnHover`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <Tooltip {...args}>
      <IconButton icon="copy" active accessibilityLabel="Copy link" />
    </Tooltip>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <View className="flex-row gap-16">
      {(['top', 'bottom', 'left', 'right'] as const).map(p => <Tooltip key={p} label={p} placement={p} defaultOpen>
          <Button size="sm" label={p} />
        </Tooltip>)}
    </View>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'On hover',
  render: () => <Tooltip label="Show in Finder" shortcut="⌘R">
      <IconButton icon="folder-open" accessibilityLabel="Show in Finder" />
    </Tooltip>
}`,...m.parameters?.docs?.source},description:{story:`Hover to see the tooltip (not pre-opened).`,...m.parameters?.docs?.description}}}})))()}g();export{m as OnHover,p as Placements,f as Playground,h as __namedExportsOrder,d as default};