import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{a as t}from"./iframe-CmcEqaQC.js";import{n,t as r}from"./CountBadge-BTyqmDLR.js";import{i,n as a}from"./helpers-DlFGh-SZ.js";var o,s,c,l,u;function d(){return(d=e((()=>{n(),i(),o=t(),s={title:`Components/CountBadge`,component:r,parameters:{docs:{description:{component:"Trailing counter for navigation items. Quiet text by default; give it a `tone` to draw attention (Sharing now · 2, Failed · 1)."}}},argTypes:{tone:{control:`select`,options:[void 0,`success`,`warning`,`danger`,`neutral`,`primary`,`info`,`accent`]}},args:{value:12}},c={},l={render:()=>(0,o.jsxs)(a,{children:[(0,o.jsx)(r,{value:12}),(0,o.jsx)(r,{value:2,tone:`warning`}),(0,o.jsx)(r,{value:1,tone:`danger`}),(0,o.jsx)(r,{value:7,tone:`primary`}),(0,o.jsx)(r,{value:240,tone:`info`}),(0,o.jsx)(r,{value:240,max:999})]})},u=[`Playground`,`Variants`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Showcase>
      <CountBadge value={12} />
      <CountBadge value={2} tone="warning" />
      <CountBadge value={1} tone="danger" />
      <CountBadge value={7} tone="primary" />
      <CountBadge value={240} tone="info" />
      <CountBadge value={240} max={999} />
    </Showcase>
}`,...l.parameters?.docs?.source}}}})))()}d();export{c as Playground,l as Variants,u as __namedExportsOrder,s as default};