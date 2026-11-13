import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{N as n,a as r,u as i}from"./iframe-BhG_hyu7.js";import{n as a,t as o}from"./NetworkStatusCard-BDAstH9i.js";import{i as s,r as c}from"./helpers-Bti-25oI.js";var l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{l=t(),i(),a(),s(),u=r(),{fn:d}=__STORYBOOK_MODULE_TEST__,f={title:`Patterns/NetworkStatusCard`,component:o,parameters:{docs:{description:{component:"P2P network summary for the sidebar footer: state dot, peer count, live rates and a pause/resume action. `compact` renders just the dot (with a tooltip) for the collapsed rail."}}},argTypes:{state:{control:`inline-radio`,options:[`connected`,`connecting`,`offline`]}},args:{state:`connected`,peers:3,upload:`1.2 MB/s`,download:`3.8 MB/s`},decorators:[e=>(0,u.jsx)(c,{children:(0,u.jsx)(e,{})})]},p={},m={name:`Pause / resume`,render:e=>{let[t,n]=(0,l.useState)(!1);return(0,u.jsx)(o,{...e,paused:t,onPausedChange:n,upload:t?0:1258291,download:t?0:3984588})}},h={render:()=>(0,u.jsxs)(n,{className:`gap-3`,children:[(0,u.jsx)(o,{state:`connected`,peers:3,upload:`1.2 MB/s`,download:`3.8 MB/s`}),(0,u.jsx)(o,{state:`connecting`,peers:0,action:null}),(0,u.jsx)(o,{state:`offline`,action:{label:`Reconnect`,icon:`refresh`,onPress:d()}})]})},g={args:{compact:!0},decorators:[e=>(0,u.jsx)(n,{className:`w-[52px] items-center`,children:(0,u.jsx)(e,{})})]},_=[`Playground`,`PauseResume`,`States`,`Compact`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Pause / resume',
  render: args => {
    const [paused, setPaused] = useState(false);
    return <NetworkStatusCard {...args} paused={paused} onPausedChange={setPaused} upload={paused ? 0 : 1258291} download={paused ? 0 : 3984588} />;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-3">
      <NetworkStatusCard state="connected" peers={3} upload="1.2 MB/s" download="3.8 MB/s" />
      <NetworkStatusCard state="connecting" peers={0} action={null} />
      <NetworkStatusCard state="offline" action={{
      label: 'Reconnect',
      icon: 'refresh',
      onPress: fn()
    }} />
    </View>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    compact: true
  },
  decorators: [Story => <View className="w-[52px] items-center"><Story /></View>]
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as Compact,m as PauseResume,p as Playground,h as States,_ as __namedExportsOrder,f as default};