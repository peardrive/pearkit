import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{L as r,a as i,u as a}from"./iframe-DP35oyMv.js";import{n as o,t as s}from"./CommentBox-BWMSgrv8.js";import{i as c,n as l,t as u}from"./helpers-ut74RicK.js";function d(e){let[t,n]=(0,f.useState)(e.start??``);return(0,p.jsx)(r,{className:`w-[360px]`,children:(0,p.jsx)(s,{...e,value:t,onChangeText:n,onSend:()=>n(``)})})}var f,p,m,h,g,_;function v(){return(v=e((()=>{f=t(n()),a(),o(),c(),p=i(),m={title:`Conversation/CommentBox`,component:s,parameters:{docs:{description:{component:"The box a comment is written in: one line that grows with its text up to `maxLines`, Send at its right, a banner while answering somebody. On a keyboard, Enter sends and Shift+Enter starts a new line. The box does not empty itself: the app does, once the comment went, so a comment that failed keeps its words."}}},args:{maxLines:5},render:e=>(0,p.jsx)(d,{...e})},h={},g={render:()=>(0,p.jsxs)(u,{children:[(0,p.jsx)(l,{title:`Empty`,children:(0,p.jsx)(d,{})}),(0,p.jsx)(l,{title:`Grows with its text`,children:(0,p.jsx)(d,{start:`One line.
A second line.
And a third, which is where it stands when it opens.`})}),(0,p.jsx)(l,{title:`Answering somebody`,children:(0,p.jsx)(d,{replyTo:{name:`Ada`,where:`Family`},onCancelReply:()=>{}})}),(0,p.jsx)(l,{title:`Sending`,children:(0,p.jsx)(d,{start:`On its way`,sending:!0})}),(0,p.jsx)(l,{title:`It did not go`,children:(0,p.jsx)(d,{start:`Still here`,error:`The Space could not be reached. Try again.`})}),(0,p.jsx)(l,{title:`A note`,children:(0,p.jsx)(d,{note:`Removed on this device.`})}),(0,p.jsx)(l,{title:`Disabled`,children:(0,p.jsx)(d,{disabled:!0,placeholder:`Comments are off in this Space`})})]})},_=[`Playground`,`Variants`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Empty"><Held /></Showcase>
      <Showcase title="Grows with its text"><Held start={'One line.\\nA second line.\\nAnd a third, which is where it stands when it opens.'} /></Showcase>
      <Showcase title="Answering somebody"><Held replyTo={{
        name: 'Ada',
        where: 'Family'
      }} onCancelReply={() => {}} /></Showcase>
      <Showcase title="Sending"><Held start="On its way" sending /></Showcase>
      <Showcase title="It did not go"><Held start="Still here" error="The Space could not be reached. Try again." /></Showcase>
      <Showcase title="A note"><Held note="Removed on this device." /></Showcase>
      <Showcase title="Disabled"><Held disabled placeholder="Comments are off in this Space" /></Showcase>
    </Column>
}`,...g.parameters?.docs?.source}}}})))()}v();export{h as Playground,g as Variants,_ as __namedExportsOrder,m as default};