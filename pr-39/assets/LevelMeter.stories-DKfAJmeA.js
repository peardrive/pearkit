import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{L as r,a as i,u as a}from"./iframe-YFO1g5JJ.js";import{n as o,t as s}from"./LevelMeter-BIPlnQcB.js";import{i as c,n as l}from"./helpers-BHtODcjf.js";function u({hot:e=!1,...t}){let[n,r]=(0,d.useState)(.3);return(0,d.useEffect)(()=>{let t=setInterval(()=>r(e?.85+Math.random()*.15:.2+Math.random()*.5),90);return()=>clearInterval(t)},[e]),(0,f.jsx)(s,{level:n,...t})}var d,f,p,m,h,g;function _(){return(_=e((()=>{d=t(n()),a(),o(),c(),f=i(),p={title:`Components/LevelMeter`,component:s,parameters:{docs:{description:{component:`An input level as one thin bar: the track faint, the fill in the brand colour, red when it clips. Along the bottom of a dock button, or long in a mixer.`}}},argTypes:{level:{control:{type:`range`,min:0,max:1,step:.01}},orientation:{control:`inline-radio`,options:[`horizontal`,`vertical`]}},args:{level:.6,orientation:`horizontal`,length:120,thickness:6}},m={},h={render:()=>(0,f.jsxs)(r,{className:`gap-6`,children:[(0,f.jsxs)(l,{title:`Under a dock button (22 × 3, the default)`,children:[(0,f.jsx)(u,{}),(0,f.jsx)(u,{hot:!0}),(0,f.jsx)(s,{level:.5,muted:!0})]}),(0,f.jsxs)(l,{title:`In a mixer`,children:[(0,f.jsx)(u,{length:160,thickness:6}),(0,f.jsx)(u,{length:160,thickness:6,hot:!0})]}),(0,f.jsx)(l,{title:`Vertical`,children:(0,f.jsxs)(r,{className:`h-28 flex-row items-end gap-3`,children:[(0,f.jsx)(u,{orientation:`vertical`,length:112,thickness:6}),(0,f.jsx)(u,{orientation:`vertical`,length:112,thickness:6,hot:!0}),(0,f.jsx)(s,{orientation:`vertical`,length:112,thickness:6,level:.4,muted:!0})]})})]})},g=[`Playground`,`Variants`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-6">
      <Showcase title="Under a dock button (22 × 3, the default)">
        <Live />
        <Live hot />
        <LevelMeter level={0.5} muted />
      </Showcase>
      <Showcase title="In a mixer">
        <Live length={160} thickness={6} />
        <Live length={160} thickness={6} hot />
      </Showcase>
      <Showcase title="Vertical">
        <View className="h-28 flex-row items-end gap-3">
          <Live orientation="vertical" length={112} thickness={6} />
          <Live orientation="vertical" length={112} thickness={6} hot />
          <LevelMeter orientation="vertical" length={112} thickness={6} level={0.4} muted />
        </View>
      </Showcase>
    </View>
}`,...h.parameters?.docs?.source}}}})))()}_();export{m as Playground,h as Variants,g as __namedExportsOrder,p as default};