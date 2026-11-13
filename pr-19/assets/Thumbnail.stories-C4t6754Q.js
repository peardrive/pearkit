import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,t as n}from"./Text-TdLxycB9.js";import{N as r,a as i,u as a}from"./iframe-BhG_hyu7.js";import{a as o,n as s,o as c,s as l,t as u}from"./shares-B416pf46.js";import{i as d,n as f,t as p}from"./helpers-Bti-25oI.js";var m,h,g,_,v;function y(){return(y=e((()=>{a(),l(),s(),d(),t(),m=i(),h={title:`Components/Thumbnail`,component:o,parameters:{docs:{description:{component:"File preview tile. Shows an image when you have one, otherwise a tinted icon for the file kind (`fileKindMeta`). Corner radius scales with size unless set."}}},argTypes:{kind:{control:`select`,options:Object.keys(c)},size:{control:{type:`range`,min:24,max:120,step:2}}},args:{kind:`folder`,size:40}},g={},_={render:()=>(0,m.jsxs)(p,{children:[(0,m.jsx)(f,{title:`Fallbacks`,children:Object.keys(c).map(e=>(0,m.jsxs)(r,{className:`items-center gap-1.5`,children:[(0,m.jsx)(o,{kind:e}),(0,m.jsx)(n,{variant:`micro`,children:e})]},e))}),(0,m.jsxs)(f,{title:`Images`,children:[(0,m.jsx)(o,{source:u.videoDusk,kind:`video`}),(0,m.jsx)(o,{source:u.photoHarbor,kind:`image`}),(0,m.jsx)(o,{source:u.albumEmber,kind:`audio`}),(0,m.jsx)(o,{source:u.videoDusk,size:68,radius:16,bordered:!0})]})]})},v=[`Playground`,`Kinds`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Fallbacks">
        {(Object.keys(fileKindMeta) as FileKind[]).map(k => <View key={k} className="items-center gap-1.5"><Thumbnail kind={k} /><Text variant="micro">{k}</Text></View>)}
      </Showcase>
      <Showcase title="Images">
        <Thumbnail source={images.videoDusk} kind="video" />
        <Thumbnail source={images.photoHarbor} kind="image" />
        <Thumbnail source={images.albumEmber} kind="audio" />
        <Thumbnail source={images.videoDusk} size={68} radius={16} bordered />
      </Showcase>
    </Column>
}`,..._.parameters?.docs?.source}}}})))()}y();export{_ as Kinds,g as Playground,v as __namedExportsOrder,h as default};