import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-Cv3GZ32s.js";import{N as i,a,u as o}from"./iframe-Dw1EscmA.js";import{n as s,t as c}from"./Button-CFLLiPOL.js";import{n as l,t as u}from"./TextField-DJKZ1ks6.js";import{n as d,t as f}from"./Dialog-D37SP3DF.js";var p,m,h,g,_,v;function y(){return(y=e((()=>{p=t(),o(),d(),s(),l(),n(),m=a(),h={title:`Components/Dialog`,component:f,parameters:{layout:`fullscreen`,docs:{description:{component:"Centered modal on top of React Native `Modal` (portalled on web, with the theme re-applied inside). Escape and backdrop close it; `actions` render as a right-aligned footer."}}},decorators:[e=>(0,m.jsx)(i,{style:{minHeight:560},children:(0,m.jsx)(e,{})})]},g={name:`Form dialog`,render:()=>{let[e,t]=(0,p.useState)(!0);return(0,m.jsxs)(i,{className:`p-6`,children:[(0,m.jsx)(c,{variant:`secondary`,icon:`arrow-down`,label:`Receive`,onPress:()=>t(!0),className:`self-start`}),(0,m.jsx)(f,{open:e,onClose:()=>t(!1),icon:`arrow-down`,title:`Receive files`,description:`Paste the share link someone sent you. You'll see their files as soon as you're connected.`,actions:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c,{label:`Cancel`,variant:`ghost`,onPress:()=>t(!1)}),(0,m.jsx)(c,{label:`Join space`,variant:`primary`,icon:`link`,onPress:()=>t(!1)})]}),children:(0,m.jsx)(u,{label:`Share link`,mono:!0,icon:`link`,placeholder:`pearcore://…`,autoFocus:!0})})]})}},_={render:()=>{let[e,t]=(0,p.useState)(!0);return(0,m.jsxs)(i,{className:`p-6`,children:[(0,m.jsx)(c,{variant:`danger`,icon:`stop-circle`,label:`Stop sharing`,onPress:()=>t(!0),className:`self-start`}),(0,m.jsx)(f,{open:e,onClose:()=>t(!1),title:`Stop sharing photo_2.mp4?`,width:380,actions:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c,{label:`Keep sharing`,variant:`ghost`,onPress:()=>t(!1)}),(0,m.jsx)(c,{label:`Stop sharing`,variant:`danger`,onPress:()=>t(!1)})]}),children:(0,m.jsx)(r,{variant:`body`,tone:`muted`,children:`Peers that haven't finished downloading will lose access. The file stays on your disk.`})})]})}},v=[`JoinSpace`,`Confirm`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Form dialog',
  render: () => {
    const [open, setOpen] = useState(true);
    return <View className="p-6">
        <Button variant="secondary" icon="arrow-down" label="Receive" onPress={() => setOpen(true)} className="self-start" />
        <Dialog open={open} onClose={() => setOpen(false)} icon="arrow-down" title="Receive files" description="Paste the share link someone sent you. You'll see their files as soon as you're connected." actions={<><Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} /><Button label="Join space" variant="primary" icon="link" onPress={() => setOpen(false)} /></>}>
          <TextField label="Share link" mono icon="link" placeholder="pearcore://…" autoFocus />
        </Dialog>
      </View>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    return <View className="p-6">
        <Button variant="danger" icon="stop-circle" label="Stop sharing" onPress={() => setOpen(true)} className="self-start" />
        <Dialog open={open} onClose={() => setOpen(false)} title="Stop sharing photo_2.mp4?" width={380} actions={<><Button label="Keep sharing" variant="ghost" onPress={() => setOpen(false)} /><Button label="Stop sharing" variant="danger" onPress={() => setOpen(false)} /></>}>
          <Text variant="body" tone="muted">Peers that haven't finished downloading will lose access. The file stays on your disk.</Text>
        </Dialog>
      </View>;
  }
}`,..._.parameters?.docs?.source}}}})))()}y();export{_ as Confirm,g as JoinSpace,v as __namedExportsOrder,h as default};