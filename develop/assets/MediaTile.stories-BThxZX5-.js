import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-DPCVfO3F.js";import{L as a,a as o,u as s}from"./iframe-BSicNSaw.js";import{i as c,n as l,r as u,t as d}from"./browse-CSkqj0Oa.js";var f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{f=t(n()),s(),c(),r(),l(),p=o(),[m,h,g]=d(3,3),_={title:`Files & sharing/MediaTile`,component:u,parameters:{docs:{description:{component:"One tile of a media wall: the picture, a corner badge, title and meta on a scrim, a selection ring — and a `preview` slot that lights up under the pointer. The tile never owns playback: the host mounts its own player into `preview` from `onHoverChange`, the same division of labour as `Filmstrip`. Lay a wall of them out with `Masonry`."}}},argTypes:{aspectRatio:{control:{type:`range`,min:.4,max:2.5,step:.05}},radius:{control:{type:`range`,min:0,max:16,step:1}},reveal:{control:`inline-radio`,options:[`auto`,`hover`,`always`]},kind:{control:`select`,options:[`video`,`image`,`audio`,`document`,`folder`,`file`]}},args:{source:m.source,title:m.title,meta:m.meta,badge:m.badge??`4:29`,aspectRatio:16/9,reveal:`always`},decorators:[e=>(0,p.jsx)(a,{style:{width:300},children:(0,p.jsx)(e,{})})]},v={},y={render:()=>(0,p.jsx)(a,{className:`w-[640px] flex-row flex-wrap gap-5`,children:[[`video · badge · hover for info`,{source:m.source,title:m.title,meta:m.meta,badge:`4:29`,onPress:()=>{}}],[`info always on`,{source:h.source,title:h.title,meta:h.meta,reveal:`always`,onPress:()=>{}}],[`selected`,{source:g.source,title:g.title,meta:g.meta,badge:`12:04`,reveal:`always`,selected:!0,onPress:()=>{}}],[`favorite · portrait`,{source:h.source,aspectRatio:2/3,favorite:!0,onPress:()=>{}}],[`no picture yet: the kind icon`,{source:null,kind:`video`,title:`Rendering…`,reveal:`always`}],[`audio kind`,{source:null,kind:`audio`,title:`Ember session`,meta:`38:12`,reveal:`always`}]].map(([e,t])=>(0,p.jsxs)(a,{className:`w-[300px] gap-1.5`,children:[(0,p.jsx)(i,{variant:`micro`,children:e}),(0,p.jsx)(u,{aspectRatio:16/9,...t})]},e))})},b={render:function(){let[e,t]=f.useState(!1);return(0,p.jsxs)(a,{className:`w-[300px] gap-1.5`,children:[(0,p.jsx)(i,{variant:`micro`,children:`hover me — the host swaps in its player`}),(0,p.jsx)(u,{source:m.source,title:m.title,meta:m.meta,badge:`4:29`,onHoverChange:t,preview:e?(0,p.jsx)(a,{className:`flex-1 items-center justify-center bg-background/60`,children:(0,p.jsx)(i,{variant:`caption`,weight:`semibold`,children:`host preview playing…`})}):null,onPress:()=>{}})]})}},x=[`Playground`,`Variants`,`HoverPreview`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <View className="w-[640px] flex-row flex-wrap gap-5">
      {([['video · badge · hover for info', {
      source: dusk.source,
      title: dusk.title,
      meta: dusk.meta,
      badge: '4:29',
      onPress: () => {}
    }], ['info always on', {
      source: harbor.source,
      title: harbor.title,
      meta: harbor.meta,
      reveal: 'always' as const,
      onPress: () => {}
    }], ['selected', {
      source: ridge.source,
      title: ridge.title,
      meta: ridge.meta,
      badge: '12:04',
      reveal: 'always' as const,
      selected: true,
      onPress: () => {}
    }], ['favorite · portrait', {
      source: harbor.source,
      aspectRatio: 2 / 3,
      favorite: true,
      onPress: () => {}
    }], ['no picture yet: the kind icon', {
      source: null,
      kind: 'video' as const,
      title: 'Rendering…',
      reveal: 'always' as const
    }], ['audio kind', {
      source: null,
      kind: 'audio' as const,
      title: 'Ember session',
      meta: '38:12',
      reveal: 'always' as const
    }]] as const).map(([label, props]) => <View key={label} className="w-[300px] gap-1.5">
          <Text variant="micro">{label}</Text>
          <MediaTile aspectRatio={16 / 9} {...props} />
        </View>)}
    </View>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: function HoverPreviewStory() {
    const [hovered, setHovered] = React.useState(false);
    return <View className="w-[300px] gap-1.5">
        <Text variant="micro">hover me — the host swaps in its player</Text>
        <MediaTile source={dusk.source} title={dusk.title} meta={dusk.meta} badge="4:29" onHoverChange={setHovered} preview={hovered ? <View className="flex-1 items-center justify-center bg-background/60">
              <Text variant="caption" weight="semibold">host preview playing…</Text>
            </View> : null} onPress={() => {}} />
      </View>;
  }
}`,...b.parameters?.docs?.source},description:{story:`The preview slot: whatever the host renders while hovered sits over the picture.`,...b.parameters?.docs?.description}}}})))()}S();export{b as HoverPreview,v as Playground,y as Variants,x as __namedExportsOrder,_ as default};