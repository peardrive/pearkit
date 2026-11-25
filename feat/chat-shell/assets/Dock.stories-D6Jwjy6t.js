import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-CPaIl-yS.js";import{a as i,u as a,z as o}from"./iframe-DCe4DXPm.js";import{n as s,r as c,t as l}from"./Dock.web-BTyPmTwf.js";import{n as u,t as d}from"./MessageList-JnPzEIp-.js";import{i as f,n as p,t as m}from"./helpers-zAnan5Dk.js";function h({inset:e}){let[t,n]=(0,g.useState)(`home`);return(0,_.jsx)(l,{items:y,value:t,onChange:n,inset:e})}var g,_,v,y,b,x,S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{g=t(),a(),s(),u(),n(),f(),_=i(),{fn:v}=__STORYBOOK_MODULE_TEST__,y=[{key:`home`,icon:`home`,label:`Home`},{key:`activity`,icon:`bell-fill`,label:`Activity`,badge:3},{key:`projects`,icon:`folder-fill`,label:`Projects`},{key:`settings`,icon:`setting-2-bold`,label:`Settings`}],b=6e4,x=Date.now(),S={id:`ana`,name:`Ana`},C={id:`me`,name:`Guy`},w={id:`pear`,name:`Pear`,agent:!0},T=Array.from({length:14},(e,t)=>({id:`m${t}`,author:[S,C,C,w][t%4],text:[`Morning. Chat pieces today?`,`Yes. One set for the sidebar chats and for rooms like this one.`,`Same messages, same composer.`,`I can keep a summary pinned at the top if that helps.`][t%4],ts:x-(14-t)*7*b})),E={title:`Components/Dock`,component:l,parameters:{docs:{description:{component:"The floating dock at the bottom: one wide glass pill with the places of the app in it, like the Photos tab pill on an iPhone. Every place is a filled, embossed icon on a pad that stands a little proud of the glass; the chosen one is lifted more, its icon in the primary. The page shows through it blurred on the web, a tint on a phone; `inset` takes the safe-area bottom. `DockButton` is one place on its own."}}},args:{items:y,value:`home`,onChange:v()}},D={render:e=>{let[t,n]=(0,g.useState)(e.value);return(0,_.jsxs)(o,{className:`relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background`,style:{width:390,height:700},children:[(0,_.jsx)(d,{messages:T,currentUserId:`me`,onReact:v(),style:{paddingBottom:84}}),(0,_.jsx)(l,{...e,value:t,onChange:t=>{n(t),e.onChange(t)}})]})}},O={render:()=>(0,_.jsxs)(m,{children:[(0,_.jsx)(p,{title:`Over colour, with a safe-area inset of 20`,children:(0,_.jsxs)(o,{className:`relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background`,style:{width:390,height:180},children:[(0,_.jsx)(o,{className:`absolute -left-6 bottom-0 h-32 w-40 rounded-full bg-primary/40`}),(0,_.jsx)(o,{className:`absolute bottom-4 right-8 h-28 w-28 rounded-full bg-info/40`}),(0,_.jsx)(r,{variant:`display`,className:`absolute left-4 top-6`,children:`Behind the dock`}),(0,_.jsx)(h,{inset:20})]})}),(0,_.jsx)(p,{title:`Buttons: at rest, active, with a badge`,children:(0,_.jsxs)(o,{className:`flex-row gap-1 rounded-full border border-overlay/[0.13] bg-pane p-1.5`,children:[(0,_.jsx)(c,{icon:`home`,label:`Home`,onPress:v()}),(0,_.jsx)(c,{icon:`bell-fill`,label:`Activity`,active:!0,badge:3,onPress:v()}),(0,_.jsx)(c,{icon:`folder-fill`,label:`Projects`,badge:12,onPress:v()})]})})]})},k=[`Playground`,`Variants`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(args.value);
    return <View className="relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{
      width: 390,
      height: 700
    }}>
        <MessageList messages={MESSAGES} currentUserId="me" onReact={fn()} style={{
        paddingBottom: 84
      }} />
        <Dock {...args} value={value} onChange={k => {
        setValue(k);
        args.onChange(k);
      }} />
      </View>;
  }
}`,...D.parameters?.docs?.source},description:{story:`The dock over a conversation: the messages scroll under it.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Over colour, with a safe-area inset of 20">
        <View className="relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{
        width: 390,
        height: 180
      }}>
          <View className="absolute -left-6 bottom-0 h-32 w-40 rounded-full bg-primary/40" />
          <View className="absolute bottom-4 right-8 h-28 w-28 rounded-full bg-info/40" />
          <Text variant="display" className="absolute left-4 top-6">Behind the dock</Text>
          <Live inset={20} />
        </View>
      </Showcase>
      <Showcase title="Buttons: at rest, active, with a badge">
        <View className="flex-row gap-1 rounded-full border border-overlay/[0.13] bg-pane p-1.5">
          <DockButton icon="home" label="Home" onPress={fn()} />
          <DockButton icon="bell-fill" label="Activity" active badge={3} onPress={fn()} />
          <DockButton icon="folder-fill" label="Projects" badge={12} onPress={fn()} />
        </View>
      </Showcase>
    </Column>
}`,...O.parameters?.docs?.source}}}})))()}A();export{D as Playground,O as Variants,k as __namedExportsOrder,E as default};