import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{L as n,a as r,u as i}from"./iframe-B8w9WGnZ.js";import{i as a,r as o}from"./StatusPill-Bcxoex0p.js";import{n as s,t as c}from"./SectionLabel-Du4uEVrr.js";import{n as l,t as u}from"./ShareRow-Bu8InwjS.js";import{i as d,n as f,r as p,t as m}from"./shares-VQWspGVD.js";var h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{h=t(),i(),l(),o(),s(),f(),g=r(),{fn:_}=__STORYBOOK_MODULE_TEST__,v={title:`Patterns/ShareRow`,component:u,parameters:{docs:{description:{component:"List row for a share (file or folder) — mirrors the Figma “Share Row” component: toggle `progress` for in-flight transfers and `favorite` for starred items. Status pill, timestamp or an inline action (Retry) on the right."}}},argTypes:{status:{control:`select`,options:Object.keys(a)},progress:{control:{type:`range`,min:0,max:1,step:.01}}},args:{name:`photo_2.mp4`,meta:[`Video`,`1.2 GB`,`3 peers`],thumbnail:{source:m.videoDusk,kind:`video`},status:`sharing`,progress:.98,timestamp:`now`,selected:!0,onPress:_()},decorators:[e=>(0,g.jsx)(n,{style:{width:336},children:(0,g.jsx)(e,{})})]},y={},b={render:()=>(0,g.jsxs)(n,{className:`gap-0.5`,children:[(0,g.jsx)(u,{name:`photo_2.mp4`,meta:[`Video`,`1.2 GB`,`3 peers`],thumbnail:{source:m.videoDusk},status:`sharing`,progress:.98,timestamp:`now`,selected:!0}),(0,g.jsx)(u,{name:`Personal 01`,meta:[`Folder`,`2 files`,`0.8 GB`],thumbnail:{kind:`folder`},status:`sharing`,progress:.54,timestamp:`now`}),(0,g.jsx)(u,{name:`Personal`,meta:[`Folder`,`12 files`,`4.5 GB`],thumbnail:{kind:`folder`},favorite:!0,status:`active`,timestamp:`2h`}),(0,g.jsx)(u,{name:`photo_03.jpg`,meta:[`Picture`,`126 KB`],thumbnail:{source:m.photoRidge},status:`failed`,action:{label:`Retry`,onPress:_()}}),(0,g.jsx)(u,{name:`Fallout.mp3`,meta:[`Music`,`8.4 MB`],thumbnail:{source:m.albumEmber},status:`completed`,timestamp:`Jul 2`}),(0,g.jsx)(u,{name:`photo_04.jpg`,meta:[`Picture`,`210 KB`],thumbnail:{source:m.photoHarbor},status:`inactive`,timestamp:`Jul 1`}),(0,g.jsx)(u,{name:`notes.pdf`,meta:[`Document`,`84 KB`],thumbnail:{kind:`document`},status:`receiving`,progress:.31,timestamp:`now`})]})},x={render:()=>{let[e,t]=(0,h.useState)(`photo_2`);return(0,g.jsxs)(n,{className:`gap-0.5 rounded-card bg-pane p-3`,children:[(0,g.jsx)(c,{inset:`list`,label:`In progress`,count:2}),d.map((r,i)=>(0,g.jsxs)(n,{children:[i===2?(0,g.jsx)(c,{inset:`list`,label:`Recent`}):null,(0,g.jsx)(u,{name:r.name,meta:p(r),thumbnail:{source:r.image,kind:r.kind},favorite:r.favorite,progress:r.progress,status:r.status,timestamp:r.time,action:r.status===`failed`?{label:`Retry`,onPress:_()}:void 0,selected:e===r.id,onPress:()=>t(r.id)})]},r.id))]})}},S=[`Playground`,`States`,`List`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-0.5">
      <ShareRow name="photo_2.mp4" meta={['Video', '1.2 GB', '3 peers']} thumbnail={{
      source: images.videoDusk
    }} status="sharing" progress={0.98} timestamp="now" selected />
      <ShareRow name="Personal 01" meta={['Folder', '2 files', '0.8 GB']} thumbnail={{
      kind: 'folder'
    }} status="sharing" progress={0.54} timestamp="now" />
      <ShareRow name="Personal" meta={['Folder', '12 files', '4.5 GB']} thumbnail={{
      kind: 'folder'
    }} favorite status="active" timestamp="2h" />
      <ShareRow name="photo_03.jpg" meta={['Picture', '126 KB']} thumbnail={{
      source: images.photoRidge
    }} status="failed" action={{
      label: 'Retry',
      onPress: fn()
    }} />
      <ShareRow name="Fallout.mp3" meta={['Music', '8.4 MB']} thumbnail={{
      source: images.albumEmber
    }} status="completed" timestamp="Jul 2" />
      <ShareRow name="photo_04.jpg" meta={['Picture', '210 KB']} thumbnail={{
      source: images.photoHarbor
    }} status="inactive" timestamp="Jul 1" />
      <ShareRow name="notes.pdf" meta={['Document', '84 KB']} thumbnail={{
      kind: 'document'
    }} status="receiving" progress={0.31} timestamp="now" />
    </View>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState('photo_2');
    return <View className="gap-0.5 rounded-card bg-pane p-3">
        <SectionLabel inset="list" label="In progress" count={2} />
        {shares.map((s, i) => <View key={s.id}>
            {i === 2 ? <SectionLabel inset="list" label="Recent" /> : null}
            <ShareRow name={s.name} meta={shareMeta(s)} thumbnail={{
          source: s.image,
          kind: s.kind
        }} favorite={s.favorite} progress={s.progress} status={s.status} timestamp={s.time} action={s.status === 'failed' ? {
          label: 'Retry',
          onPress: fn()
        } : undefined} selected={selected === s.id} onPress={() => setSelected(s.id)} />
          </View>)}
      </View>;
  }
}`,...x.parameters?.docs?.source},description:{story:`Selectable list with group headers, fed from fixtures.`,...x.parameters?.docs?.description}}}})))()}C();export{x as List,y as Playground,b as States,S as __namedExportsOrder,v as default};