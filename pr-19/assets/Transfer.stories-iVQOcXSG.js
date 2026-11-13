import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{N as n,a as r,u as i}from"./iframe-BhG_hyu7.js";import{n as a,t as o}from"./TransferRate-Cq7whMiV.js";import{n as s,t as c}from"./TransferCard-D3RK-z_u.js";import{i as l,n as u}from"./helpers-Bti-25oI.js";var d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{d=t(),i(),s(),a(),l(),f=r(),p=[`a12b9f03c7d14f5g`,`9e7c55e0b2a811ad`,`c03fd18e4a7cb82e`],m={title:`Patterns/TransferCard`,component:c,subcomponents:{TransferRate:o},parameters:{docs:{description:{component:`Live transfer panel: title, percentage, gradient progress, speed / ETA / size and the connected peers. Numbers can be raw (bytes, bytes/s, seconds — formatted for you) or preformatted strings.`}}},argTypes:{progress:{control:{type:`range`,min:0,max:1,step:.01}},direction:{control:`inline-radio`,options:[`up`,`down`]}},args:{progress:.98,direction:`up`,speed:`1.2 MB/s`,eta:4,transferred:1.18*1024**3,total:1.2*1024**3,peers:p},decorators:[e=>(0,f.jsx)(n,{style:{width:530},children:(0,f.jsx)(e,{})})]},h={},g={render:e=>{let t=1.2*1024**3,[n,r]=(0,d.useState)(.12);return(0,d.useEffect)(()=>{let e=setInterval(()=>r(e=>e>=1?.05:Math.min(1,e+.01)),120);return()=>clearInterval(e)},[]),(0,f.jsx)(c,{...e,progress:n,transferred:t*n,total:t,eta:(1-n)*120,speed:1258291+Math.round(Math.sin(n*20)*2e5)})}},_={args:{direction:`down`,progress:.42,speed:3984588,eta:95,transferred:.34*1024**3,total:.8*1024**3,peers:[p[1]]}},v={name:`TransferRate`,render:()=>(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{direction:`up`,value:`1.2 MB/s`}),(0,f.jsx)(o,{direction:`down`,value:3984588}),(0,f.jsx)(o,{direction:`up`,value:512,tone:`warning`})]})},y=[`Playground`,`Live`,`Receiving`,`Rates`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const total = 1.2 * 1024 ** 3;
    const [p, setP] = useState(0.12);
    useEffect(() => {
      const t = setInterval(() => setP(v => v >= 1 ? 0.05 : Math.min(1, v + 0.01)), 120);
      return () => clearInterval(t);
    }, []);
    return <TransferCard {...args} progress={p} transferred={total * p} total={total} eta={(1 - p) * 120} speed={1258291 + Math.round(Math.sin(p * 20) * 200000)} />;
  }
}`,...g.parameters?.docs?.source},description:{story:`A simulated live transfer.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    direction: 'down',
    progress: 0.42,
    speed: 3984588,
    eta: 95,
    transferred: 0.34 * 1024 ** 3,
    total: 0.8 * 1024 ** 3,
    peers: [peers[1]]
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'TransferRate',
  render: () => <Showcase>
      <TransferRate direction="up" value="1.2 MB/s" />
      <TransferRate direction="down" value={3984588} />
      <TransferRate direction="up" value={512} tone="warning" />
    </Showcase>
}`,...v.parameters?.docs?.source}}}})))()}b();export{g as Live,h as Playground,v as Rates,_ as Receiving,y as __namedExportsOrder,m as default};