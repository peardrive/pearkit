import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{N as t,a as n,u as r}from"./iframe-CmcEqaQC.js";import{n as i,t as a}from"./ShareLinkCard-DXtTVOAf.js";var o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{r(),i(),o=n(),{fn:s}=__STORYBOOK_MODULE_TEST__,c={title:`Patterns/ShareLinkCard`,component:a,parameters:{docs:{description:{component:'Everything needed to hand a share to someone: a scannable QR, the copyable link and actions. Every string and action is configurable; `layout="vertical"` stacks it for phones.'}}},argTypes:{layout:{control:`inline-radio`,options:[`horizontal`,`vertical`]}},args:{link:`peardrop://1de0909835728b6e0f3a4c19d2e7b8a5c6f71d0e9f684cb145a28`,onCopy:s(),onSaveQr:s()},decorators:[e=>(0,o.jsx)(t,{style:{width:530},children:(0,o.jsx)(e,{})})]},l={},u={args:{layout:`vertical`,qrSize:160},decorators:[e=>(0,o.jsx)(t,{style:{width:340},children:(0,o.jsx)(e,{})})]},d={name:`Without QR`,args:{showQr:!1,secondaryAction:{label:`Share…`,icon:`export`,onPress:s()}}},f={args:{title:`Lien de partage`,description:`Toute personne disposant du lien peut télécharger tant que vous êtes en ligne`,copyLabel:`Copier`,secondaryAction:{label:`Enregistrer`,icon:`import`}}},p=[`Playground`,`Vertical`,`LinkOnly`,`Localized`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    layout: 'vertical',
    qrSize: 160
  },
  decorators: [Story => <View style={{
    width: 340
  }}><Story /></View>]
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Without QR',
  args: {
    showQr: false,
    secondaryAction: {
      label: 'Share…',
      icon: 'export',
      onPress: fn()
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Lien de partage',
    description: 'Toute personne disposant du lien peut télécharger tant que vous êtes en ligne',
    copyLabel: 'Copier',
    secondaryAction: {
      label: 'Enregistrer',
      icon: 'import'
    }
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as LinkOnly,f as Localized,l as Playground,u as Vertical,p as __namedExportsOrder,c as default};