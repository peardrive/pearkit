import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{a as n,u as r,z as i}from"./iframe-DCe4DXPm.js";import{n as a,t as o}from"./Toggle-BHsUceI7.js";import{i as s,n as c,t as l}from"./helpers-zAnan5Dk.js";function u(e){let[t,n]=(0,d.useState)(e.value);return(0,f.jsx)(o,{...e,value:t,onValueChange:n})}var d,f,p,m,h,g,_;function v(){return(v=e((()=>{d=t(),r(),a(),s(),f=n(),{fn:p}=__STORYBOOK_MODULE_TEST__,m={title:`Components/Toggle`,component:o,parameters:{docs:{description:{component:'An on/off switch built from Views: a track with a thumb, primary when on. With a `label` (and `description`) it is a whole row you can press. `accessibilityRole="switch"`.'}}},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]}},args:{value:!0,label:`Notify me`,description:`A sound and a badge when someone writes.`,size:`md`,onValueChange:p()}},h={render:e=>(0,f.jsx)(u,{...e})},g={render:()=>(0,f.jsxs)(l,{width:360,children:[(0,f.jsxs)(c,{title:`On and off`,children:[(0,f.jsx)(u,{value:!0,accessibilityLabel:`On`}),(0,f.jsx)(u,{value:!1,accessibilityLabel:`Off`})]}),(0,f.jsxs)(c,{title:`Sizes`,children:[(0,f.jsx)(u,{value:!0,size:`sm`,accessibilityLabel:`Small`}),(0,f.jsx)(u,{value:!0,size:`md`,accessibilityLabel:`Medium`})]}),(0,f.jsx)(c,{title:`With words`,children:(0,f.jsxs)(i,{className:`w-full gap-3`,children:[(0,f.jsx)(u,{value:!0,label:`Notify me`,description:`A sound and a badge when someone writes.`}),(0,f.jsx)(u,{value:!1,label:`Enter sends`,description:`Off: Enter is a new line, the button sends.`}),(0,f.jsx)(u,{value:!0,size:`sm`,label:`Show times`})]})}),(0,f.jsx)(c,{title:`Disabled`,children:(0,f.jsxs)(i,{className:`w-full gap-3`,children:[(0,f.jsx)(u,{value:!0,disabled:!0,label:`Always on`}),(0,f.jsx)(u,{value:!1,disabled:!0,label:`Not available here`})]})})]})},_=[`Playground`,`Variants`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <Live {...args} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Column width={360}>
      <Showcase title="On and off">
        <Live value accessibilityLabel="On" />
        <Live value={false} accessibilityLabel="Off" />
      </Showcase>
      <Showcase title="Sizes">
        <Live value size="sm" accessibilityLabel="Small" />
        <Live value size="md" accessibilityLabel="Medium" />
      </Showcase>
      <Showcase title="With words">
        <View className="w-full gap-3">
          <Live value label="Notify me" description="A sound and a badge when someone writes." />
          <Live value={false} label="Enter sends" description="Off: Enter is a new line, the button sends." />
          <Live value size="sm" label="Show times" />
        </View>
      </Showcase>
      <Showcase title="Disabled">
        <View className="w-full gap-3">
          <Live value disabled label="Always on" />
          <Live value={false} disabled label="Not available here" />
        </View>
      </Showcase>
    </Column>
}`,...g.parameters?.docs?.source}}}})))()}v();export{h as Playground,g as Variants,_ as __namedExportsOrder,m as default};