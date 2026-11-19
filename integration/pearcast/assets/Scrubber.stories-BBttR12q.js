import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-Svc695Hp.js";import{N as a,a as o,u as s}from"./iframe-COEFSP7C.js";import{n as c,t as l}from"./Scrubber-B6-GHat0.js";import{n as u,t as d}from"./Waveform-BMW0qRkp.js";import{n as f,r as p}from"./media-CntXg4vO.js";function m(e){let[t,n]=(0,h.useState)(e.time??0),[r,o]=(0,h.useState)(e.range),[s,c]=(0,h.useState)(``);return(0,g.jsxs)(a,{className:`gap-1.5`,children:[e.label?(0,g.jsx)(i,{variant:`micro`,children:e.label}):null,(0,g.jsx)(l,{...e,time:t,range:r,onSeek:(e,t)=>{n(e),t&&c(`seek → ${e.toFixed(2)} s`)},onRange:r===void 0?void 0:(e,t)=>{o(e),t&&c(`range → ${e.in.toFixed(2)} – ${e.out.toFixed(2)} s`)},children:e.children}),(0,g.jsxs)(i,{variant:`micro`,tone:`subtle`,children:[t.toFixed(2),` s`,r?` · in ${r.in.toFixed(2)} · out ${r.out.toFixed(2)}`:``,s?` · ${s}`:``]})]})}var h,g,_,v,y,b,x;function S(){return(S=e((()=>{h=t(n()),s(),c(),r(),u(),p(),g=o(),_={title:`Components/Scrubber`,component:l,parameters:{docs:{description:{component:'The time bar: a raised track with the playhead (a line with a little house on top), scrubbed by pressing or dragging; given a `range`, the chosen part framed the way a timeline frames a selected clip — the selection colour, a bar inside each end — and either end drags to trim. `look="pins"` is the older in/out pin (a ball under the strip). Every scrub bar and every in/out in an app is this one component, and a canvas timeline paints the same frame with `paintClipFrame`.'}}},argTypes:{duration:{control:{type:`number`,min:1,step:1}},time:{control:{type:`range`,min:0,max:92,step:.1}},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},look:{control:`inline-radio`,options:[`clip`,`pins`]},emboss:{control:`boolean`},dimOutside:{control:`boolean`},frame:{control:`boolean`},disabled:{control:`boolean`}},args:{duration:92,time:31,size:`sm`,look:`clip`,range:{in:12,out:64},dimOutside:!1,frame:!1,disabled:!1},decorators:[e=>(0,g.jsx)(a,{style:{width:420},children:(0,g.jsx)(e,{})})]},v={render:e=>(0,g.jsx)(m,{...e})},y={render:()=>(0,g.jsxs)(a,{className:`gap-6`,children:[(0,g.jsx)(m,{duration:92,time:31,range:void 0,label:`scrub only · sm (the player's bar, raised)`}),(0,g.jsx)(m,{duration:92,time:31,range:void 0,size:`md`,label:`scrub only · md`}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},label:`with a range · the clip frame, its ends are the trim handles`}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},size:`lg`,dimOutside:!0,label:`lg, dim outside · the trim strip's look`}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},size:`md`,look:`pins`,label:`look=pins · the older in/out pins`}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},height:28,dimOutside:!0,label:`over a waveform (children)`,children:(0,g.jsx)(d,{source:f(92),window:{from:0,to:92},className:`absolute inset-0`,style:{height:28},opacity:.45})}),(0,g.jsx)(m,{duration:92,time:31,range:{in:12,out:64},disabled:!0,label:`disabled`})]})},b={parameters:{docs:{description:{story:`Click the bar to focus it, then ← → move the head (shift ×10), I / O set the in / out at the head, Home / End jump.`}}},render:()=>(0,g.jsx)(m,{duration:30,time:9,range:{in:3,out:24},size:`lg`})},x=[`Playground`,`Variants`,`Keyboard`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <Live {...args} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-6">
      <Live duration={92} time={31} range={undefined} label="scrub only · sm (the player's bar, raised)" />
      <Live duration={92} time={31} range={undefined} size="md" label="scrub only · md" />
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} label="with a range · the clip frame, its ends are the trim handles" />
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} size="lg" dimOutside label="lg, dim outside · the trim strip's look" />
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} size="md" look="pins" label="look=pins · the older in/out pins" />
      <Live duration={92} time={31} range={{
      in: 12,
      out: 64
    }} height={28} dimOutside label="over a waveform (children)">
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
  }} size="lg" />
}`,...b.parameters?.docs?.source}}}})))()}S();export{b as Keyboard,v as Playground,y as Variants,x as __namedExportsOrder,_ as default};