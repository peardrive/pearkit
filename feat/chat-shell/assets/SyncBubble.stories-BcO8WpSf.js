import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-CPaIl-yS.js";import{V as i,a,h as o,o as s,s as c,u as l,z as u}from"./iframe-DCe4DXPm.js";import{n as d,t as f}from"./StatusDot-qrA85xr9.js";import{i as p,n as m,t as h}from"./helpers-zAnan5Dk.js";var g;function _(){return(_=e((()=>{g={saving:{label:`Saving…`,tone:`info`,pulse:!0,glow:!1},waiting:{label:`Waiting for the other device`,tone:`warning`,pulse:!0,glow:!1},sending:{label:`Sending…`,tone:`info`,pulse:!0,glow:!1},synced:{label:`Synced`,tone:`success`,pulse:!1,glow:!0},offline:{label:`Saved here only`,tone:`neutral`,pulse:!1,glow:!1},failed:{label:`Failed`,tone:`danger`,pulse:!1,glow:!1}}})))()}function v({state:e,label:t,detail:n,onPress:a,offset:c,className:l,style:d}){let p=g[e],m=t??p.label,h=(0,y.jsxs)(o,{accessibilityRole:a?`button`:void 0,accessibilityLabel:n?`${m}, ${n}`:m,accessibilityLiveRegion:`polite`,disabled:!a,onPress:a,className:s(`max-w-full flex-row items-center gap-2 self-center rounded-full border border-overlay/10 bg-pane py-1.5 pl-3 pr-3.5`,i.OS===`web`&&(a?`cursor-pointer select-none`:`cursor-default`),l),style:[{maxWidth:360,boxShadow:`0px 8px 24px 0px rgba(0,0,0,0.4)`},d],dataSet:{debugIgnore:``,syncState:e},children:[(0,y.jsx)(f,{tone:p.tone,size:7,pulse:p.pulse,glow:p.glow}),(0,y.jsxs)(u,{className:`min-w-0 flex-row items-baseline gap-1.5`,children:[(0,y.jsx)(r,{variant:`caption`,weight:`semibold`,numberOfLines:1,children:m}),n?(0,y.jsx)(r,{variant:`micro`,tone:`muted`,numberOfLines:1,className:`shrink`,children:n}):null]})]});return c===void 0?h:(0,y.jsx)(u,{pointerEvents:`box-none`,className:`absolute inset-x-0 bottom-0 z-20 items-center px-4`,style:{paddingBottom:c},children:h})}var y;function b(){return(b=e((()=>{t(),l(),c(),d(),n(),_(),y=a(),v.__docgenInfo={description:`A small pill that says where something stands with the other device: a breathing dot while it waits or sends,
a glowing one when it has arrived. The Toast is for the app's own news; this is for one item's sync, shown right
where the item was made (the bottom of the screen, above the composer or the dock) and gone once it is settled.`,methods:[],displayName:`SyncBubble`,props:{state:{required:!0,tsType:{name:`union`,raw:`'saving' | 'waiting' | 'sending' | 'synced' | 'offline' | 'failed'`,elements:[{name:`literal`,value:`'saving'`},{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'sending'`},{name:`literal`,value:`'synced'`},{name:`literal`,value:`'offline'`},{name:`literal`,value:`'failed'`}]},description:``},label:{required:!1,tsType:{name:`string`},description:"The words. Default: the state's own (`syncStateMeta`)."},detail:{required:!1,tsType:{name:`string`},description:`A second, quieter line or phrase: "2 of 3 files", "open rKeyChat on the Mac".`},onPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Pressing dismisses (or opens the thing): the whole bubble is the target.`},offset:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Float it: an absolute wrapper at the bottom of the nearest positioned parent, centred, this far from the
bottom (px or a CSS length on the web, e.g. \`calc(64px + env(safe-area-inset-bottom))\`). Without it the bubble
is laid out in place.`},className:{required:!1,tsType:{name:`string`},description:``},style:{required:!1,tsType:{name:`StyleProp`,elements:[{name:`ViewStyle`}],raw:`StyleProp<ViewStyle>`},description:``}}}})))()}var x,S,C,w,T,E,D;function O(){return(O=e((()=>{l(),b(),p(),n(),x=a(),{fn:S}=__STORYBOOK_MODULE_TEST__,C={title:`Patterns/SyncBubble`,component:v,parameters:{docs:{description:{component:"A small pill at the bottom of the screen saying where one item stands with the other device: breathing dot while it waits or sends, glowing dot once it has arrived. Six states (`syncStateMeta`), a label and a quieter detail. `offset` floats it above a composer or a dock."}}},argTypes:{state:{control:`select`,options:Object.keys(g)}},args:{state:`sending`,label:`Sending to the MacBook`,detail:`2 of 3 files`,onPress:S()}},w={},T={render:()=>(0,x.jsx)(h,{children:(0,x.jsx)(m,{title:`A debug note's way to the Mac`,children:(0,x.jsx)(u,{className:`gap-3`,children:Object.keys(g).map(e=>(0,x.jsxs)(u,{className:`flex-row items-center gap-3`,children:[(0,x.jsx)(r,{variant:`micro`,tone:`subtle`,className:`w-14`,children:e}),(0,x.jsx)(v,{state:e,label:{saving:`Saving the note…`,waiting:`Waiting for the MacBook`,sending:`Sending to the MacBook`,synced:`On the MacBook`,offline:`Saved on this phone`,failed:`Debug note not saved`}[e],detail:{saving:void 0,waiting:`open rKeyChat there`,sending:`2 of 3 files`,synced:`3 files`,offline:`the notes space is down`,failed:`the recording is too large`}[e]})]},e))})})})},E={name:`Floating above a dock`,render:()=>(0,x.jsxs)(u,{className:`relative h-[220px] w-[320px] overflow-hidden rounded-card border border-overlay/10 bg-background`,children:[(0,x.jsx)(u,{className:`absolute inset-x-0 bottom-0 h-14 border-t border-overlay/10 bg-pane/95`}),(0,x.jsx)(v,{state:`synced`,label:`On the MacBook`,detail:`3 files`,offset:64})]})},D=[`Playground`,`States`,`Floating`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="A debug note's way to the Mac">
        <View className="gap-3">
          {(Object.keys(syncStateMeta) as SyncState[]).map(s => <View key={s} className="flex-row items-center gap-3">
              <Text variant="micro" tone="subtle" className="w-14">
                {s}
              </Text>
              <SyncBubble state={s} label={{
            saving: 'Saving the note…',
            waiting: 'Waiting for the MacBook',
            sending: 'Sending to the MacBook',
            synced: 'On the MacBook',
            offline: 'Saved on this phone',
            failed: 'Debug note not saved'
          }[s]} detail={{
            saving: undefined,
            waiting: 'open rKeyChat there',
            sending: '2 of 3 files',
            synced: '3 files',
            offline: 'the notes space is down',
            failed: 'the recording is too large'
          }[s]} />
            </View>)}
        </View>
      </Showcase>
    </Column>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Floating above a dock',
  render: () => <View className="relative h-[220px] w-[320px] overflow-hidden rounded-card border border-overlay/10 bg-background">
      <View className="absolute inset-x-0 bottom-0 h-14 border-t border-overlay/10 bg-pane/95" />
      <SyncBubble state="synced" label="On the MacBook" detail="3 files" offset={64} />
    </View>
}`,...E.parameters?.docs?.source}}}})))()}O();export{E as Floating,w as Playground,T as States,D as __namedExportsOrder,C as default};