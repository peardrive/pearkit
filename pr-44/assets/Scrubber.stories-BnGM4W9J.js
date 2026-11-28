import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-CGstUeEZ.js";import{L as a,a as o,u as s}from"./iframe-BRms_EWO.js";import{n as c,t as l}from"./Scrubber-CiQXbk5e.js";import{n as u,t as d}from"./Waveform-CnQ0AgSG.js";import{n as f,r as p}from"./media-DI1YuXzA.js";function m(e){let[t,n]=(0,h.useState)(e.time??0),[r,o]=(0,h.useState)(e.range),[s,c]=(0,h.useState)(``);return(0,g.jsxs)(a,{className:`gap-1.5`,children:[e.label?(0,g.jsx)(i,{variant:`micro`,children:e.label}):null,(0,g.jsx)(l,{...e,time:t,range:r,onSeek:(e,t)=>{n(e),t&&c(`seek → ${e.toFixed(2)} s`)},onRange:r===void 0?void 0:(e,t)=>{o(e),t&&c(`range → ${e.in.toFixed(2)} – ${e.out.toFixed(2)} s`)},children:e.children}),(0,g.jsxs)(i,{variant:`micro`,tone:`subtle`,children:[t.toFixed(2),` s`,r?` · in ${r.in.toFixed(2)} · out ${r.out.toFixed(2)}`:``,s?` · ${s}`:``]})]})}var h,g,_,v,y,b,x;function S(){return(S=e((()=>{h=t(n()),s(),c(),r(),u(),p(),g=o(),_={title:`Scrubber`,component:l,parameters:{docs:{description:{component:"The time bar: a track with the playhead (a line with a little house on top), scrubbed by pressing or dragging; given a `range`, the chosen part with an in and an out pin at its ends — the pin is a line with a ball under the strip, and the ball is what you grab. Every scrub bar and every in/out in an app is this one component (or its painters on a canvas)."}}},argTypes:{duration:{control:{type:`number`,min:1,step:1}},time:{control:{type:`range`,min:0,max:92,step:.1}},size:{control:`inline-radio`,options:[`sm`,`md`]},dimOutside:{control:`boolean`},frame:{control:`boolean`},disabled:{control:`boolean`}},args:{duration:92,time:31,size:`sm`,range:{in:12,out:64},dimOutside:!1,frame:!1,disabled:!1},decorators:[e=>(0,g.jsx)(a,{style:{width:420},children:(0,g.jsx)(e,{})})]},v={render:e=>(0,g.jsx)(m,{...e})},y={render:()=>(0,g.jsxs)(a,{className:`gap-6`,children:[(0,g.jsx)(m,{duration:92,time:31,range:void 0,label:`scrub only · sm`}),(0,g.jsx)(m,{duration:92,time:31,range:void 0,size:`md`,label:`scrub only · md`}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},label:`with a range · the lit span`}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},size:`md`,dimOutside:!0,frame:!0,label:`dim outside + frame · the trim strip's look`}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},height:28,dimOutside:!0,frame:!0,label:`over a waveform (children)`,children:(0,g.jsx)(d,{source:f(92),window:{from:0,to:92},className:`absolute inset-0`,style:{height:28},opacity:.45})}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},disabled:!0,label:`disabled`})]})},b={parameters:{docs:{description:{story:`Click the bar to focus it, then ← → move the head (shift ×10), I / O set the in / out at the head, Home / End jump.`}}},render:()=>(0,g.jsx)(m,{duration:30,time:9,range:{in:3,out:24},size:`md`})},x=[`Playground`,`Variants`,`Keyboard`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <Live {...args} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-6">
      <Live duration={92} time={31} range={undefined} label="scrub only · sm" />
      <Live duration={92} time={31} range={undefined} size="md" label="scrub only · md" />
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} label="with a range · the lit span" />
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} size="md" dimOutside frame label="dim outside + frame · the trim strip's look" />
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} height={28} dimOutside frame label="over a waveform (children)">
        <Waveform source={demoPeaks(92)} window={{
        from: 0,
        to: 92
      }} className="absolute inset-0" style={{
        height: 28
      }} opacity={0.45} />
      </Live>
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} disabled label="disabled" />
    </View>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Click the bar to focus it, then ← → move the head (shift ×10), I / O set the in / out at the head, Home / End jump.'
      }
    }
  },
  render: () => <Live duration={30} time={9} range={{
    in: 3,
    out: 24
  }} size="md" />
}`,...b.parameters?.docs?.source}}}})))()}S();export{b as Keyboard,v as Playground,y as Variants,x as __namedExportsOrder,_ as default};