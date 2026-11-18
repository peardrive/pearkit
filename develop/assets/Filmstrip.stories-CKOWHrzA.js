import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-fliRoubA.js";import{N as i,a,u as o}from"./iframe-CUpoSHGG.js";import{n as s,t as c}from"./Filmstrip-DB6T5Xem.js";import{r as l,t as u}from"./media-CntXg4vO.js";var d,f,p,m,h;function g(){return(g=e((()=>{t(),o(),s(),n(),l(),d=a(),f={title:`Components/Filmstrip`,component:c,parameters:{docs:{description:{component:"Frames of a clip edge to edge — what the trim strip shows for video. It only draws: the host makes the frames (a hidden video seeking on the desktop, a native thumbnailer on the phone) and hands them over as they arrive; a `null` frame is an empty cell until then. `filmstripFrameTime(i, n, duration)` says which moment each cell wants."}}},argTypes:{height:{control:{type:`range`,min:16,max:80,step:1}},radius:{control:{type:`range`,min:0,max:16,step:1}}},args:{frames:u(12),height:30,radius:6},decorators:[e=>(0,d.jsx)(i,{style:{width:420},children:(0,d.jsx)(e,{})})]},p={},m={render:()=>(0,d.jsx)(i,{className:`gap-5`,children:[[`12 frames · 30px`,{frames:u(12),height:30}],[`still arriving: 3 empty cells`,{frames:u(12,[5,6,11]),height:30}],[`6 frames · 48px · square corners`,{frames:u(6),height:48,radius:0}],[`one frame · a thumbnail`,{frames:u(1),height:54,radius:8}]].map(([e,t])=>(0,d.jsxs)(i,{className:`gap-1.5`,children:[(0,d.jsx)(r,{variant:`micro`,children:e}),(0,d.jsx)(c,{...t})]},e))})},h=[`Playground`,`Variants`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-5">
      {([['12 frames · 30px', {
      frames: demoFrames(12),
      height: 30
    }], ['still arriving: 3 empty cells', {
      frames: demoFrames(12, [5, 6, 11]),
      height: 30
    }], ['6 frames · 48px · square corners', {
      frames: demoFrames(6),
      height: 48,
      radius: 0
    }], ['one frame · a thumbnail', {
      frames: demoFrames(1),
      height: 54,
      radius: 8
    }]] as const).map(([label, props]) => <View key={label} className="gap-1.5">
          <Text variant="micro">{label}</Text>
          <Filmstrip {...props} />
        </View>)}
    </View>
}`,...m.parameters?.docs?.source}}}})))()}g();export{p as Playground,m as Variants,h as __namedExportsOrder,f as default};