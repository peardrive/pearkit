import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-C7CcZ4xr.js";import{N as i,a,u as o}from"./iframe-CmcEqaQC.js";import{a as s,i as c,n as l,o as u,t as d}from"./Icon-Dma2Rm9M.js";import{n as f,t as p}from"./SearchField-hKuhy3DQ.js";var m,h,g,_,v,y;function b(){return(b=e((()=>{m=t(),o(),l(),f(),n(),u(),h=a(),g={title:`Foundations/Icons`,component:d,parameters:{docs:{description:{component:"Icons are drawn with react-native-svg, so they render everywhere and take any theme `tone` or `color`. The **vuesax** glyphs were exported verbatim from the PearDrop Figma file; **pearkit** glyphs were drawn on the same 24px / 1.5px grid. Add your own SVGs to `icons/` and run `npm run icons`."}}},argTypes:{name:{control:`select`,options:c},tone:{control:`select`,options:[`icon`,`icon-strong`,`foreground`,`muted`,`primary`,`success`,`warning`,`danger`,`accent`,`favorite`]},size:{control:{type:`range`,min:12,max:64,step:1}}},args:{name:`folder`,size:32,tone:`icon-strong`}},_={},v={render:()=>{let[e,t]=(0,m.useState)(``),n=c.filter(t=>t.includes(e.toLowerCase()));return(0,h.jsxs)(i,{className:`gap-5`,children:[(0,h.jsx)(i,{style:{width:280},children:(0,h.jsx)(p,{placeholder:`Search ${c.length} icons`,value:e,onChangeText:t})}),[`vuesax`,`pearkit`].map(e=>(0,h.jsxs)(i,{className:`gap-3`,children:[(0,h.jsx)(r,{variant:`overline`,children:e===`vuesax`?`From Figma (Vuesax)`:`pearkit additions`}),(0,h.jsx)(i,{className:`flex-row flex-wrap gap-2`,children:n.filter(t=>s[t].set===e).map(e=>(0,h.jsxs)(i,{className:`h-[86px] w-[104px] items-center justify-center gap-2 rounded-lg border border-overlay/[0.06] bg-overlay/[0.03]`,children:[(0,h.jsx)(d,{name:e,size:22,tone:`icon-strong`}),(0,h.jsx)(r,{variant:`micro`,numberOfLines:1,children:e})]},e))})]},e))]})}},y=[`Playground`,`Gallery`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [q, setQ] = useState('');
    const list = iconNames.filter(n => n.includes(q.toLowerCase()));
    return <View className="gap-5">
        <View style={{
        width: 280
      }}><SearchField placeholder={\`Search \${iconNames.length} icons\`} value={q} onChangeText={setQ} /></View>
        {(['vuesax', 'pearkit'] as const).map(set => <View key={set} className="gap-3">
            <Text variant="overline">{set === 'vuesax' ? 'From Figma (Vuesax)' : 'pearkit additions'}</Text>
            <View className="flex-row flex-wrap gap-2">
              {list.filter(n => iconRegistry[n as IconName].set === set).map(n => <View key={n} className="h-[86px] w-[104px] items-center justify-center gap-2 rounded-lg border border-overlay/[0.06] bg-overlay/[0.03]">
                  <Icon name={n} size={22} tone="icon-strong" />
                  <Text variant="micro" numberOfLines={1}>{n}</Text>
                </View>)}
            </View>
          </View>)}
      </View>;
  }
}`,...v.parameters?.docs?.source}}}})))()}b();export{v as Gallery,_ as Playground,y as __namedExportsOrder,g as default};