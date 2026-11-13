import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,t as n}from"./Text-TdLxycB9.js";import{N as r,a as i,u as a}from"./iframe-BhG_hyu7.js";import{n as o,t as s}from"./ProgressBar-CDfUr12S.js";var c,l,u,d,f;function p(){return(p=e((()=>{a(),o(),t(),c=i(),l={title:`Components/ProgressBar`,component:s,parameters:{docs:{description:{component:"Gradient progress track drawn with react-native-svg. `transfer` (amber → pear) is used in list rows, `brand` (green → pear) in the transfer card; `solid` takes any colour token."}}},argTypes:{value:{control:{type:`range`,min:0,max:1,step:.01}},variant:{control:`inline-radio`,options:[`transfer`,`brand`,`solid`]},tone:{control:`select`,options:[`primary`,`success`,`warning`,`danger`,`info`,`accent`]},height:{control:{type:`range`,min:2,max:12,step:1}}},args:{value:.62,variant:`transfer`,height:4},decorators:[e=>(0,c.jsx)(r,{style:{width:320},children:(0,c.jsx)(e,{})})]},u={},d={render:()=>(0,c.jsx)(r,{className:`gap-4`,children:[[`transfer · 4px`,{variant:`transfer`,value:.54,height:4}],[`brand · 6px`,{variant:`brand`,value:.98,height:6}],[`solid danger`,{variant:`solid`,tone:`danger`,value:.3,height:4}],[`custom colours`,{colors:[`#a78bfa`,`#60a5fa`,`#2dd4bf`],value:.75,height:6}]].map(([e,t])=>(0,c.jsxs)(r,{className:`gap-1.5`,children:[(0,c.jsx)(n,{variant:`micro`,children:e}),(0,c.jsx)(s,{...t})]},e))})},f=[`Playground`,`Variants`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-4">
      {([['transfer · 4px', {
      variant: 'transfer',
      value: 0.54,
      height: 4
    }], ['brand · 6px', {
      variant: 'brand',
      value: 0.98,
      height: 6
    }], ['solid danger', {
      variant: 'solid',
      tone: 'danger',
      value: 0.3,
      height: 4
    }], ['custom colours', {
      colors: ['#a78bfa', '#60a5fa', '#2dd4bf'],
      value: 0.75,
      height: 6
    }]] as const).map(([label, props]) => <View key={label} className="gap-1.5">
          <Text variant="micro">{label}</Text>
          <ProgressBar {...props as object as {
        value: number;
      }} />
        </View>)}
    </View>
}`,...d.parameters?.docs?.source}}}})))()}p();export{u as Playground,d as Variants,f as __namedExportsOrder,l as default};