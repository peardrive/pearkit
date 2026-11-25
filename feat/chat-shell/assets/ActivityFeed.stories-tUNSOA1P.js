import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{a as t,u as n,z as r}from"./iframe-DCe4DXPm.js";import{i,n as a,r as o,t as s}from"./ActivityFeed-l-6S2rq9.js";import{n as c,t as l}from"./EmptyState-ByOKcMN9.js";import{i as u,n as d,t as f}from"./helpers-zAnan5Dk.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{n(),a(),i(),c(),u(),p=t(),{fn:m}=__STORYBOOK_MODULE_TEST__,h=Date.now(),g=6e4,_=60*g,v=24*_,y=[{id:`1`,ts:h-2*g,kind:`approval`,title:`wants to run the release build`,who:{id:`pear`,name:`Pear`,agent:!0},where:{org:`PearDrive`,project:`Pearkit`,conversation:`Release 0.3`},unread:!0,action:{label:`Approve`,onPress:m()}},{id:`2`,ts:h-9*g,kind:`mention`,title:`mentioned you: "can you check the light theme?"`,who:{id:`ana`,name:`Ana`},where:{org:`PearDrive`,project:`Pearkit`,conversation:`Chat pieces`},unread:!0},{id:`3`,ts:h-40*g,kind:`done`,title:`finished: ported the chat lab into the library`,detail:`8 commits on feat/chat-shell`,who:{id:`pear`,name:`Pear`,agent:!0},where:{org:`PearDrive`,project:`Pearkit`},action:{label:`Open`,onPress:m()}},{id:`4`,ts:h-3*_,kind:`file`,title:`added drag-bar.png and tablet-run.mov`,who:{id:`ana`,name:`Ana`},where:{org:`PearDrive`,project:`Pearkit`,conversation:`Chat pieces`}},{id:`5`,ts:h-5*_,kind:`member`,title:`joined the project`,who:{id:`tomas`,name:`Tomás`},where:{org:`PearDrive`,project:`Pearkit`}},{id:`6`,ts:h-v-_,kind:`conversation`,title:`started "Release 0.3"`,who:{id:`me`,name:`Guy`},where:{org:`PearDrive`,project:`Pearkit`}},{id:`7`,ts:h-v-2*_,kind:`error`,title:`could not reach the Mac Mini`,detail:`The seat is paused until the device is back.`,where:{project:`Bitcoin Audible`},action:{label:`Retry`,onPress:m()}},{id:`8`,ts:h-3*v,kind:`note`,title:`The wiki space was created`,where:{org:`PearDrive`,project:`Pearkit`}},{id:`9`,ts:h-3*v-_,kind:`project`,title:`started the project`,who:{id:`me`,name:`Guy`},where:{org:`PearDrive`,project:`Pearkit`}},{id:`10`,ts:h-4*v,kind:`publish`,title:`published release-notes.md to the space`,who:{id:`pear`,name:`Pear`,agent:!0},where:{org:`PearDrive`,project:`Pearkit`}},{id:`11`,ts:h-4*v-_,kind:`proposal`,title:`proposed a change to the draft`,who:{id:`ana`,name:`Ana`},where:{org:`Bitcoin Audible`,project:`Show notes`},action:{label:`Review`,onPress:m()}},{id:`12`,ts:h-5*v,kind:`zap`,title:`zapped 2,100 sats`,who:{id:`tomas`,name:`Tomás`},where:{org:`Bitcoin Audible`,project:`Show notes`}}],b={title:`Components/ActivityFeed`,component:s,parameters:{docs:{description:{component:"What needs you and what happened, one line each, newest first, in PearDrive's feed style: a tinted icon for the kind, who did what, where as a muted breadcrumb, the time at the right, an unread dot, and the action on the line when there is one. Days are labelled. Rules alone: `groupByDay`, `whenLabel`, `whereLabel`, `activityKindMeta`, `unreadCount`."}}},args:{items:y,groupByDay:!0,compact:!1,showWhere:!0,onOpen:m(),onAction:m()}},x=e=>[t=>(0,p.jsx)(r,{className:`overflow-hidden rounded-card border border-overlay/[0.08] bg-background`,style:{width:560,height:e},children:(0,p.jsx)(t,{})})],S={decorators:x()},C={args:{compact:!0,showWhere:!1},decorators:x()},w={args:{items:[],emptyState:(0,p.jsx)(l,{icon:`bell`,title:`Nothing needs you`,description:`Mentions, approvals and finished work show up here.`})},decorators:x(320)},T={name:`ActivityRow variants`,render:()=>(0,p.jsxs)(f,{width:560,children:[(0,p.jsx)(d,{title:`Every kind`,children:(0,p.jsx)(r,{className:`w-full rounded-card border border-overlay/[0.08]`,children:y.map((e,t)=>(0,p.jsx)(o,{item:{...e,unread:!1,action:void 0},divider:t<y.length-1},e.id))})}),(0,p.jsx)(d,{title:`Unread, with an action, pressable`,children:(0,p.jsxs)(r,{className:`w-full rounded-card border border-overlay/[0.08]`,children:[(0,p.jsx)(o,{item:y[0],onOpen:m(),onAction:m()}),(0,p.jsx)(o,{item:y[2],onOpen:m(),divider:!1})]})}),(0,p.jsx)(d,{title:`Compact, inside one project (no breadcrumb)`,children:(0,p.jsx)(r,{className:`w-full rounded-card border border-overlay/[0.08]`,children:y.slice(0,4).map((e,t)=>(0,p.jsx)(o,{item:e,compact:!0,showWhere:!1,divider:t<3},e.id))})})]})},E=[`Playground`,`Compact`,`Empty`,`Rows`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  decorators: framed()
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    compact: true,
    showWhere: false
  },
  decorators: framed()
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    emptyState: <EmptyState icon="bell" title="Nothing needs you" description="Mentions, approvals and finished work show up here." />
  },
  decorators: framed(320)
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'ActivityRow variants',
  render: () => <Column width={560}>
      <Showcase title="Every kind">
        <View className="w-full rounded-card border border-overlay/[0.08]">
          {ITEMS.map((it, i) => <ActivityRow key={it.id} item={{
          ...it,
          unread: false,
          action: undefined
        }} divider={i < ITEMS.length - 1} />)}
        </View>
      </Showcase>
      <Showcase title="Unread, with an action, pressable">
        <View className="w-full rounded-card border border-overlay/[0.08]">
          <ActivityRow item={ITEMS[0]!} onOpen={fn()} onAction={fn()} />
          <ActivityRow item={ITEMS[2]!} onOpen={fn()} divider={false} />
        </View>
      </Showcase>
      <Showcase title="Compact, inside one project (no breadcrumb)">
        <View className="w-full rounded-card border border-overlay/[0.08]">
          {ITEMS.slice(0, 4).map((it, i) => <ActivityRow key={it.id} item={it} compact showWhere={false} divider={i < 3} />)}
        </View>
      </Showcase>
    </Column>
}`,...T.parameters?.docs?.source}}}})))()}D();export{C as Compact,w as Empty,S as Playground,T as Rows,E as __namedExportsOrder,b as default};