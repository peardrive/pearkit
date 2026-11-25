import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-CPaIl-yS.js";import{a,u as o,z as s}from"./iframe-DCe4DXPm.js";import{n as c,t as l}from"./Button-DbkpAyom.js";import{i as u,n as d,o as f,r as p,t as m}from"./EmojiPicker-CX4iYXyB.js";import{i as h,n as g,t as _}from"./helpers-zAnan5Dk.js";function v({recent:e=[],anchored:t=!0}){let[n,r]=(0,y.useState)(!1),[a,o]=(0,y.useState)(),[c,p]=(0,y.useState)(e),[h,g]=(0,y.useState)([]),_=(0,y.useRef)(null),v=()=>{t&&_.current?_.current.measureInWindow((e,t,n,i)=>{o({x:e,y:t+i+4}),r(!0)}):(o(void 0),r(!0))},x=e=>{g(t=>[...t,e]),p(t=>f(t,e))};return(0,b.jsxs)(s,{className:`gap-3`,children:[(0,b.jsxs)(s,{className:`flex-row items-center gap-3`,children:[(0,b.jsx)(s,{ref:_,collapsable:!1,children:(0,b.jsx)(l,{label:t?`Pick an emoji`:`Pick, in the middle`,variant:`secondary`,onPress:v})}),(0,b.jsx)(m,{emojis:c.length?c.slice(0,6):u,onPick:x,onMore:v})]}),(0,b.jsx)(i,{variant:`body-lg`,children:h.join(` `)||` `}),(0,b.jsx)(d,{open:n,onClose:()=>r(!1),onPick:x,recent:c,anchor:a})]})}var y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{y=t(n()),o(),p(),c(),r(),h(),b=a(),{fn:x}=__STORYBOOK_MODULE_TEST__,S={title:`Components/EmojiPicker`,component:d,parameters:{docs:{description:{component:"The full emoji list in a pop-up window, built like `Menu`: a search field, the recent row first, then the categories, eight to a row in 44 px cells. `EmojiBar` is the quick row — a few emoji in a pill and a + for the rest. The list and the search are pure data in `emoji.ts` (`EMOJI_CATEGORIES`, `searchEmoji`, `pushRecent`, `DEFAULT_QUICK_EMOJI`)."}}},args:{onPick:x(),onClose:x(),recent:[`🍐`,`🎉`,`👀`]}},C={render:e=>(0,b.jsx)(v,{recent:e.recent})},w={render:()=>(0,b.jsxs)(_,{children:[(0,b.jsxs)(g,{title:`Quick row, md and sm`,children:[(0,b.jsx)(m,{emojis:u,onPick:x(),onMore:x()}),(0,b.jsx)(m,{emojis:u,onPick:x(),onMore:x(),size:`sm`}),(0,b.jsx)(m,{emojis:[`🍐`,`✅`,`🔥`],onPick:x(),size:`sm`})]}),(0,b.jsx)(g,{title:`The list hung from a button, with recent ones`,children:(0,b.jsx)(v,{recent:[`🍐`,`🎉`,`👀`,`✅`]})}),(0,b.jsx)(g,{title:`The list in the middle, nothing recent`,children:(0,b.jsx)(v,{anchored:!1})})]})},T={render:()=>{let[e,t]=(0,y.useState)(!0);return(0,b.jsxs)(s,{className:`gap-3`,children:[(0,b.jsx)(l,{label:`Open`,variant:`secondary`,onPress:()=>t(!0),className:`self-start`}),(0,b.jsx)(d,{open:e,onClose:()=>t(!1),onPick:x(),recent:[`🍐`,`🎉`,`👀`],anchor:{x:24,y:60}})]})}},E=[`Playground`,`Variants`,`Open`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <Demo recent={args.recent} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Quick row, md and sm">
        <EmojiBar emojis={DEFAULT_QUICK_EMOJI} onPick={fn()} onMore={fn()} />
        <EmojiBar emojis={DEFAULT_QUICK_EMOJI} onPick={fn()} onMore={fn()} size="sm" />
        <EmojiBar emojis={['🍐', '✅', '🔥']} onPick={fn()} size="sm" />
      </Showcase>
      <Showcase title="The list hung from a button, with recent ones">
        <Demo recent={['🍐', '🎉', '👀', '✅']} />
      </Showcase>
      <Showcase title="The list in the middle, nothing recent">
        <Demo anchored={false} />
      </Showcase>
    </Column>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    return <View className="gap-3">
        <Button label="Open" variant="secondary" onPress={() => setOpen(true)} className="self-start" />
        <EmojiPicker open={open} onClose={() => setOpen(false)} onPick={fn()} recent={['🍐', '🎉', '👀']} anchor={{
        x: 24,
        y: 60
      }} />
      </View>;
  }
}`,...T.parameters?.docs?.source},description:{story:`The panel open, for a look (search for "party").`,...T.parameters?.docs?.description}}}})))()}D();export{T as Open,C as Playground,w as Variants,E as __namedExportsOrder,S as default};