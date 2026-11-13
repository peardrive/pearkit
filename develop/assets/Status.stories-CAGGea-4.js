import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,t as n}from"./Text-C7CcZ4xr.js";import{N as r,a as i,u as a}from"./iframe-CmcEqaQC.js";import{i as o,n as s,r as c,t as l}from"./StatusPill-CtiZDmBL.js";import{n as u,t as d}from"./StatusDot-7mnj3lR2.js";import{i as f,n as p,t as m}from"./helpers-DlFGh-SZ.js";var h,g,_,v,y,b,x;function S(){return(S=e((()=>{a(),s(),u(),c(),f(),t(),h=i(),g=[`success`,`warning`,`danger`,`neutral`,`primary`,`info`,`accent`],_={title:`Components/Status`,component:l,parameters:{docs:{description:{component:"`StatusPill` and `StatusDot` share seven semantic tones. Pills accept a `status` preset (`sharing`, `active`, `completed`, `failed`, `inactive`…) whose labels and tones live in `shareStatusMeta`, and append a percentage for in-flight transfers."}}},argTypes:{status:{control:`select`,options:Object.keys(o)},tone:{control:`select`,options:[void 0,...g]},size:{control:`inline-radio`,options:[`sm`,`md`]},progress:{control:{type:`range`,min:0,max:1,step:.01}}},args:{status:`sharing`,progress:.98,size:`sm`}},v={},y={render:()=>(0,h.jsxs)(m,{children:[(0,h.jsx)(p,{title:`Share statuses`,children:Object.keys(o).map(e=>(0,h.jsx)(l,{status:e,progress:e===`sharing`||e===`receiving`?.54:void 0},e))}),(0,h.jsxs)(p,{title:`Medium (detail hero)`,children:[(0,h.jsx)(l,{status:`sharing`,size:`md`}),(0,h.jsx)(l,{status:`completed`,size:`md`}),(0,h.jsx)(l,{label:`Custom label`,tone:`accent`,size:`md`}),(0,h.jsx)(l,{label:`No dot`,tone:`info`,dot:!1,size:`md`})]})]})},b={render:()=>(0,h.jsxs)(m,{children:[(0,h.jsx)(p,{title:`Tones`,children:g.map(e=>(0,h.jsxs)(r,{className:`items-center gap-1.5`,children:[(0,h.jsx)(d,{tone:e}),(0,h.jsx)(n,{variant:`micro`,children:e})]},e))}),(0,h.jsxs)(p,{title:`Glow · pulse`,children:[(0,h.jsxs)(r,{className:`flex-row items-center gap-2`,children:[(0,h.jsx)(d,{tone:`success`,glow:!0}),(0,h.jsx)(n,{variant:`label`,children:`Connected`})]}),(0,h.jsxs)(r,{className:`flex-row items-center gap-2`,children:[(0,h.jsx)(d,{tone:`warning`,pulse:!0}),(0,h.jsx)(n,{variant:`label`,children:`Connecting…`})]}),(0,h.jsxs)(r,{className:`flex-row items-center gap-2`,children:[(0,h.jsx)(d,{tone:`neutral`,size:10}),(0,h.jsx)(n,{variant:`label`,children:`Offline`})]})]})]})},x=[`Playground`,`Presets`,`Dots`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Share statuses">
        {(Object.keys(shareStatusMeta) as ShareStatus[]).map(s => <StatusPill key={s} status={s} progress={s === 'sharing' || s === 'receiving' ? 0.54 : undefined} />)}
      </Showcase>
      <Showcase title="Medium (detail hero)">
        <StatusPill status="sharing" size="md" />
        <StatusPill status="completed" size="md" />
        <StatusPill label="Custom label" tone="accent" size="md" />
        <StatusPill label="No dot" tone="info" dot={false} size="md" />
      </Showcase>
    </Column>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Tones">
        {tones.map(t => <View key={t} className="items-center gap-1.5">
            <StatusDot tone={t} />
            <Text variant="micro">{t}</Text>
          </View>)}
      </Showcase>
      <Showcase title="Glow · pulse">
        <View className="flex-row items-center gap-2"><StatusDot tone="success" glow /><Text variant="label">Connected</Text></View>
        <View className="flex-row items-center gap-2"><StatusDot tone="warning" pulse /><Text variant="label">Connecting…</Text></View>
        <View className="flex-row items-center gap-2"><StatusDot tone="neutral" size={10} /><Text variant="label">Offline</Text></View>
      </Showcase>
    </Column>
}`,...b.parameters?.docs?.source}}}})))()}S();export{b as Dots,v as Playground,y as Presets,x as __namedExportsOrder,_ as default};