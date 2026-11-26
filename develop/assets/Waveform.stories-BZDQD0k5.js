import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-DPCVfO3F.js";import{L as i,a,u as o}from"./iframe-BSicNSaw.js";import{n as s,t as c}from"./Waveform-B17FFjbM.js";import{n as l,r as u}from"./media-DI1YuXzA.js";var d,f,p,m,h,g;function _(){return(_=e((()=>{t(),o(),s(),n(),u(),d=a(),f=l(92),p={title:`Media/Waveform`,component:c,parameters:{docs:{description:{component:"A sound as bars: the loudest peak under each pixel column, grown from the middle or standing on the bottom. The same geometry (`waveformBars`) feeds `paintWaveform` for canvas surfaces, so a trim strip and a timeline draw the same sound the same way."}}},argTypes:{height:{control:{type:`range`,min:8,max:80,step:1}},anchor:{control:`inline-radio`,options:[`center`,`bottom`]},tone:{control:`select`,options:[`info`,`primary`,`primary-strong`,`accent`,`foreground`,`muted`,`success`,`warning`]},opacity:{control:{type:`range`,min:.1,max:1,step:.05}},barWidth:{control:{type:`range`,min:1,max:6,step:1}},gap:{control:{type:`range`,min:0,max:4,step:1}},scale:{control:{type:`range`,min:.3,max:1,step:.05}}},args:{source:f,height:32,anchor:`center`,tone:`info`,opacity:.6,barWidth:1,gap:0,scale:.85},decorators:[e=>(0,d.jsx)(i,{style:{width:420},children:(0,d.jsx)(e,{})})]},m={},h={render:()=>(0,d.jsx)(i,{className:`gap-5`,children:[[`center · the strip`,{anchor:`center`,height:28}],[`bottom · the timeline clip`,{anchor:`bottom`,height:22,tone:`primary`,opacity:.8}],[`a window: 20 – 40 s only`,{anchor:`center`,height:28,window:{from:20,to:40}}],[`2px bars with a gap`,{anchor:`center`,height:36,barWidth:2,gap:1,tone:`foreground`,opacity:.5}],[`no source yet`,{anchor:`center`,height:28,source:null}]].map(([e,t])=>(0,d.jsxs)(i,{className:`gap-1.5`,children:[(0,d.jsx)(r,{variant:`micro`,children:e}),(0,d.jsx)(i,{className:`rounded-md bg-inset/[0.35] overflow-hidden`,children:(0,d.jsx)(c,{source:f,...t})})]},e))})},g=[`Playground`,`Variants`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-5">
      {([['center · the strip', {
      anchor: 'center',
      height: 28
    }], ['bottom · the timeline clip', {
      anchor: 'bottom',
      height: 22,
      tone: 'primary',
      opacity: 0.8
    }], ['a window: 20 – 40 s only', {
      anchor: 'center',
      height: 28,
      window: {
        from: 20,
        to: 40
      }
    }], ['2px bars with a gap', {
      anchor: 'center',
      height: 36,
      barWidth: 2,
      gap: 1,
      tone: 'foreground',
      opacity: 0.5
    }], ['no source yet', {
      anchor: 'center',
      height: 28,
      source: null
    }]] as const).map(([label, props]) => <View key={label} className="gap-1.5">
          <Text variant="micro">{label}</Text>
          <View className="rounded-md bg-inset/[0.35] overflow-hidden">
            <Waveform source={peaks} {...props as object} />
          </View>
        </View>)}
    </View>
}`,...h.parameters?.docs?.source}}}})))()}_();export{m as Playground,h as Variants,g as __namedExportsOrder,p as default};