import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-CPaIl-yS.js";import{a as i,u as a,z as o}from"./iframe-DCe4DXPm.js";import{n as s,t as c}from"./SearchField-DNOAY4G-.js";var l,u,d,f,p,m;function h(){return(h=e((()=>{l=t(),a(),s(),n(),u=i(),d={title:`Components/SearchField`,component:c,parameters:{docs:{description:{component:"Compact search input built on `TextInput`. Shows a shortcut hint when empty and a clear button once there is text. Controlled or uncontrolled."}}},args:{placeholder:`Search shares`,shortcut:`⌘F`},decorators:[e=>(0,u.jsx)(o,{style:{width:336},children:(0,u.jsx)(e,{})})]},f={},p={render:e=>{let[t,n]=(0,l.useState)(`photo`);return(0,u.jsxs)(o,{className:`gap-2`,children:[(0,u.jsx)(c,{...e,value:t,onChangeText:n}),(0,u.jsxs)(r,{variant:`micro`,children:[`value: “`,t,`”`]})]})}},m=[`Playground`,`Controlled`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [q, setQ] = useState('photo');
    return <View className="gap-2">
        <SearchField {...args} value={q} onChangeText={setQ} />
        <Text variant="micro">value: “{q}”</Text>
      </View>;
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as Controlled,f as Playground,m as __namedExportsOrder,d as default};