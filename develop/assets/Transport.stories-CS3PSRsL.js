import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-BPIDHJBT.js";import{L as a,a as o,u as s}from"./iframe-DP35oyMv.js";import{n as c,t as l}from"./Transport-BsDma1OO.js";import{n as u,t as d}from"./Waveform-BdTYeauy.js";import{n as f,r as p}from"./media-DI1YuXzA.js";function m(e){let[t,n]=(0,h.useState)(!1),[r,o]=(0,h.useState)(e.time??0),[s,c]=(0,h.useState)(e.trims?e.range??{in:0,out:e.duration}:null),u=(0,h.useRef)(0);(0,h.useEffect)(()=>{if(!t)return;let r=0;u.current=performance.now();let i=t=>{let a=(t-u.current)/1e3;u.current=t,o(t=>{let r=s?.out??e.duration,i=t+a;return i>=r?(n(!1),r):i}),r=requestAnimationFrame(i)};return r=requestAnimationFrame(i),()=>cancelAnimationFrame(r)},[t,s?.out,e.duration]);let d=()=>{if(!t){let t=s?.in??0,n=s?.out??e.duration;(r>=n-.05||r<t)&&o(t)}n(e=>!e)};return(0,g.jsxs)(a,{className:`gap-1.5`,children:[e.label?(0,g.jsx)(i,{variant:`micro`,children:e.label}):null,(0,g.jsx)(l,{...e,playing:t,onToggle:d,time:r,onSeek:e=>o(e),range:s,onRange:e.trims?e=>c(e):void 0,onWhole:e.trims?()=>c({in:0,out:e.duration}):void 0,children:e.children})]})}var h,g,_,v,y,b;function x(){return(x=e((()=>{h=t(n()),s(),c(),r(),u(),p(),g=o(),_={title:`Media/Transport`,component:l,parameters:{docs:{description:{component:'The one video control: play / pause, the `Scrubber`, the times — under a clip on a stage, in a quick look, in an export dialog; only size and placement differ. With a `range` it also trims, the times become `in – out · length`, and a "whole clip" button appears while the range is not everything.'}}},argTypes:{duration:{control:{type:`number`,min:1,step:1}},size:{control:`inline-radio`,options:[`sm`,`md`]},times:{control:`boolean`},fractionDigits:{control:{type:`range`,min:0,max:3,step:1}},disabled:{control:`boolean`}},args:{duration:92,size:`sm`,times:!0,fractionDigits:1,disabled:!1},decorators:[e=>(0,g.jsx)(a,{style:{width:480},children:(0,g.jsx)(e,{})})]},v={render:e=>(0,g.jsx)(m,{...e,trims:!0})},y={render:()=>(0,g.jsxs)(a,{className:`gap-6`,children:[(0,g.jsx)(m,{duration:92,time:14,label:`play and scrub · sm`}),(0,g.jsx)(m,{duration:92,time:14,size:`md`,label:`md`}),(0,g.jsx)(m,{duration:92,time:14,trims:!0,range:{in:8,out:40},label:`trims too: the range, the in – out · length times, the whole-clip button`}),(0,g.jsx)(m,{duration:92,time:14,size:`md`,label:`a waveform inside the bar`,children:(0,g.jsx)(d,{source:f(92),window:{from:0,to:92},className:`absolute inset-0`,style:{height:26},opacity:.45})}),(0,g.jsx)(m,{duration:3725,time:3600,fractionDigits:0,label:`over an hour, no fraction`}),(0,g.jsx)(m,{duration:92,time:14,disabled:!0,label:`disabled`})]})},b=[`Playground`,`Variants`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <Player {...args} trims />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-6">
      <Player duration={92} time={14} label="play and scrub · sm" />
      <Player duration={92} time={14} size="md" label="md" />
      <Player duration={92} time={14} trims range={{
      in: 8,
      out: 40
    }} label="trims too: the range, the in – out · length times, the whole-clip button" />
      <Player duration={92} time={14} size="md" label="a waveform inside the bar">
        <Waveform source={demoPeaks(92)} window={{
        from: 0,
        to: 92
      }} className="absolute inset-0" style={{
        height: 26
      }} opacity={0.45} />
      </Player>
      <Player duration={3725} time={3600} fractionDigits={0} label="over an hour, no fraction" />
      <Player duration={92} time={14} disabled label="disabled" />
    </View>
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as Playground,y as Variants,b as __namedExportsOrder,_ as default};