import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-DtaQ9TcH.js";import{F as a,J as o,L as s,Y as c,_ as l,a as u,c as d,h as f,i as p,o as m,r as h,s as g,u as _,z as v}from"./iframe-aI8Byg1A.js";import{n as y,r as b}from"./Icon-DfahYaJb.js";import{n as x,t as S}from"./Button-CNBcMHtJ.js";import{n as C,t as w}from"./IconButton-CR9wH2Y8.js";import{a as T,i as E,n as D,r as O,t as k}from"./TextField-1W0j92fY.js";function A({open:e,onClose:t,title:n,description:r,icon:o,children:u,actions:d,onSubmit:h,submitDisabled:g,destructive:_,width:y=420,dismissable:x=!0,hideCloseButton:S,className:C,style:T}){let D=p(),k=(0,j.useMemo)(()=>(0,M.vars)(c(D)),[D]),A=(0,j.useRef)(null),P=!!h&&!_&&!g,F=(0,j.useRef)(h);F.current=h;let I=(0,j.useRef)(0),L=(0,j.useCallback)(()=>{let e=Date.now();e-I.current<600||(I.current=e,F.current?.())},[]),R=P?L:null;return(0,j.useEffect)(()=>{if(!e||v.OS!==`web`||typeof window>`u`||!t&&!R)return;let n=e=>{e.key===`Escape`?t?.():R&&E(e,A.current)&&(e.preventDefault(),R())};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[e,t,R]),(0,N.jsx)(l,{visible:e,transparent:!0,animationType:`fade`,onRequestClose:t,children:(0,N.jsxs)(s,{className:`flex-1 items-center justify-center p-6`,style:k,children:[(0,N.jsx)(f,{accessibilityRole:`button`,accessibilityLabel:`Close dialog`,className:`absolute inset-0 bg-black/60`,onPress:x?t:void 0,focusable:!1}),(0,N.jsx)(s,{ref:A,accessibilityRole:v.OS===`web`?`dialog`:void 0,"aria-modal":!0,"aria-label":n,className:m(`max-h-full w-full overflow-hidden rounded-xl border border-overlay/10 bg-pane`,C),style:[{maxWidth:y,boxShadow:`0px 30px 70px 0px rgba(0,0,0,0.55)`},T],children:(0,N.jsxs)(a,{contentContainerClassName:`gap-4 p-5`,keyboardShouldPersistTaps:`handled`,children:[n||o?(0,N.jsxs)(s,{className:`flex-row items-start gap-3`,children:[o?(0,N.jsx)(s,{className:`h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10`,children:b(o,{size:20,tone:`primary-text`})}):null,(0,N.jsxs)(s,{className:`min-w-0 flex-1 gap-1 pt-0.5`,children:[n?(0,N.jsx)(i,{variant:`title`,accessibilityRole:`header`,children:n}):null,r?(0,N.jsx)(i,{variant:`caption`,tone:`muted`,className:`leading-[17px]`,children:r}):null]}),t&&!S?(0,N.jsx)(w,{icon:`close`,size:`sm`,accessibilityLabel:`Close`,onPress:t,className:`-mr-1.5 -mt-1`}):null]}):null,(0,N.jsxs)(O.Provider,{value:R,children:[u,d?(0,N.jsx)(s,{className:`flex-row justify-end gap-2 pt-1`,children:d}):null]})]})})]})})}var j,M,N;function P(){return(P=e((()=>{j=t(n()),_(),M=d(),g(),h(),o(),y(),C(),r(),T(),N=u(),A.__docgenInfo={description:`Centered modal dialog built on React Native's \`Modal\`, so it works on
native and on react-native-web / Electron. The modal is portalled outside the
provider's element, so the theme's CSS variables are re-applied inside it.`,methods:[],displayName:`Dialog`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},onClose:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Called on backdrop press, Escape (web) and the close button.`},title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},icon:{required:!1,tsType:{name:`union`,raw:`IconName | React.ReactElement`,elements:[{name:`unknown`},{name:`ReactReactElement`,raw:`React.ReactElement`}]},description:`Icon in a tinted tile above the title.`},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Footer buttons, right-aligned.`},onSubmit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`The dialog's one main action ("go", "yes", "join"): the same function its main button calls. Enter
presses it on web / Electron, from a field or from anywhere in the dialog; on a phone the keyboard's
return key of a single-line \`TextField\` inside does. Leave it out when there is no single main action.`},submitDisabled:{required:!1,tsType:{name:`boolean`},description:`The main button is not live yet (nothing typed, still working): Enter does nothing.`},destructive:{required:!1,tsType:{name:`boolean`},description:`The main action deletes, removes or leaves. Enter never does that: it takes a click or a tap.`},width:{required:!1,tsType:{name:`number`},description:`Panel width in px. Default 420.`,defaultValue:{value:`420`,computed:!1}},dismissable:{required:!1,tsType:{name:`boolean`},description:`Close on backdrop press. Default true.`,defaultValue:{value:`true`,computed:!1}},hideCloseButton:{required:!1,tsType:{name:`boolean`},description:`Hide the × button.`},className:{required:!1,tsType:{name:`string`},description:``},style:{required:!1,tsType:{name:`StyleProp`,elements:[{name:`ViewStyle`}],raw:`StyleProp<ViewStyle>`},description:``}}}})))()}var F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{F=n(),_(),P(),x(),D(),r(),I=u(),{expect:L,userEvent:R,waitFor:z,within:B}=__STORYBOOK_MODULE_TEST__,V={title:`Components/Dialog`,component:A,parameters:{layout:`fullscreen`,docs:{description:{component:"Centered modal on top of React Native `Modal` (portalled on web, with the theme re-applied inside). Escape and backdrop close it; `actions` render as a right-aligned footer. `onSubmit` names the one main action: Enter presses it, never with `destructive`."}}},decorators:[e=>(0,I.jsx)(s,{style:{minHeight:560},children:(0,I.jsx)(e,{})})]},H={name:`Form dialog`,render:()=>{let[e,t]=(0,F.useState)(!0);return(0,I.jsxs)(s,{className:`p-6`,children:[(0,I.jsx)(S,{variant:`secondary`,icon:`arrow-down`,label:`Receive`,onPress:()=>t(!0),className:`self-start`}),(0,I.jsx)(A,{open:e,onClose:()=>t(!1),icon:`arrow-down`,title:`Receive files`,description:`Paste the share link someone sent you. You'll see their files as soon as you're connected.`,actions:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(S,{label:`Cancel`,variant:`ghost`,onPress:()=>t(!1)}),(0,I.jsx)(S,{label:`Join space`,variant:`primary`,icon:`link`,onPress:()=>t(!1)})]}),children:(0,I.jsx)(k,{label:`Share link`,mono:!0,icon:`link`,placeholder:`pearcore://…`,autoFocus:!0})})]})}},U={render:()=>{let[e,t]=(0,F.useState)(!0);return(0,I.jsxs)(s,{className:`p-6`,children:[(0,I.jsx)(S,{variant:`danger`,icon:`stop-circle`,label:`Stop sharing`,onPress:()=>t(!0),className:`self-start`}),(0,I.jsx)(A,{open:e,onClose:()=>t(!1),title:`Stop sharing photo_2.mp4?`,width:380,actions:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(S,{label:`Keep sharing`,variant:`ghost`,onPress:()=>t(!1)}),(0,I.jsx)(S,{label:`Stop sharing`,variant:`danger`,onPress:()=>t(!1)})]}),children:(0,I.jsx)(i,{variant:`body`,tone:`muted`,children:`Peers that haven't finished downloading will lose access. The file stays on your disk.`})})]})}},W={name:`Enter presses the main action`,render:()=>{let[e,t]=(0,F.useState)(!0),[n,r]=(0,F.useState)(``),[a,o]=(0,F.useState)(0),c=()=>{o(e=>e+1),t(!1)};return(0,I.jsxs)(s,{className:`p-6 gap-3`,children:[(0,I.jsx)(S,{variant:`secondary`,icon:`arrow-down`,label:`Receive`,onPress:()=>t(!0),className:`self-start`}),(0,I.jsx)(i,{variant:`body`,tone:`muted`,children:`Joined ${a} time${a===1?``:`s`}`}),(0,I.jsx)(A,{open:e,onClose:()=>t(!1),icon:`arrow-down`,title:`Receive files`,description:`Paste the share link and press Enter.`,onSubmit:c,submitDisabled:!n.trim(),actions:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(S,{label:`Cancel`,variant:`ghost`,onPress:()=>t(!1)}),(0,I.jsx)(S,{label:`Join space`,variant:`primary`,icon:`link`,disabled:!n.trim(),onPress:c})]}),children:(0,I.jsx)(k,{label:`Share link`,mono:!0,icon:`link`,placeholder:`pearcore://…`,value:n,onChangeText:r,autoFocus:!0})})]})},play:async({canvasElement:e})=>{let t=B(e),n=B(document.body),r=await n.findByLabelText(`Share link`);await R.click(r),await R.keyboard(`{Enter}`),await L(t.getByText(`Joined 0 times`)).toBeInTheDocument(),await R.type(r,`a-link`),await R.keyboard(`{Enter}{Enter}`),await z(()=>L(t.getByText(`Joined 1 time`)).toBeInTheDocument()),await z(()=>L(n.queryByLabelText(`Share link`)).toBeNull()),await new Promise(e=>setTimeout(e,700)),await R.click(t.getByRole(`button`,{name:`Receive`})),await n.findByLabelText(`Share link`),document.activeElement?.blur?.(),await R.keyboard(`{Enter}`),await z(()=>L(t.getByText(`Joined 2 times`)).toBeInTheDocument())}},G={name:`Enter never presses a delete`,render:()=>{let[e,t]=(0,F.useState)(!0),[n,r]=(0,F.useState)(0),a=()=>{r(e=>e+1),t(!1)};return(0,I.jsxs)(s,{className:`p-6 gap-3`,children:[(0,I.jsx)(S,{variant:`danger`,icon:`stop-circle`,label:`Delete post`,onPress:()=>t(!0),className:`self-start`}),(0,I.jsx)(i,{variant:`body`,tone:`muted`,children:`Deleted ${n}`}),(0,I.jsx)(A,{open:e,onClose:()=>t(!1),title:`Delete this post?`,width:380,destructive:!0,onSubmit:a,actions:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(S,{label:`Cancel`,variant:`ghost`,onPress:()=>t(!1)}),(0,I.jsx)(S,{label:`Delete post`,variant:`danger`,onPress:a})]}),children:(0,I.jsx)(i,{variant:`body`,tone:`muted`,children:`It leaves the Space for everyone.`})})]})},play:async({canvasElement:e})=>{let t=B(e),n=B(document.body);await n.findByText(`Delete this post?`),document.activeElement?.blur?.(),await R.keyboard(`{Enter}`),await L(t.getByText(`Deleted 0`)).toBeInTheDocument(),await L(n.getByText(`Delete this post?`)).toBeInTheDocument(),await R.click(B(n.getByRole(`dialog`)).getByRole(`button`,{name:`Delete post`})),await z(()=>L(t.getByText(`Deleted 1`)).toBeInTheDocument())}},K=[`JoinSpace`,`Confirm`,`EnterJoins`,`EnterNeverDeletes`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    return <View className="p-6">
        <Button variant="danger" icon="stop-circle" label="Stop sharing" onPress={() => setOpen(true)} className="self-start" />
        <Dialog open={open} onClose={() => setOpen(false)} title="Stop sharing photo_2.mp4?" width={380} actions={<><Button label="Keep sharing" variant="ghost" onPress={() => setOpen(false)} /><Button label="Stop sharing" variant="danger" onPress={() => setOpen(false)} /></>}>
          <Text variant="body" tone="muted">Peers that haven't finished downloading will lose access. The file stays on your disk.</Text>
        </Dialog>
      </View>;
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Enter presses the main action',
  render: () => {
    const [open, setOpen] = useState(true);
    const [link, setLink] = useState('');
    const [joined, setJoined] = useState(0);
    const join = () => {
      setJoined(n => n + 1);
      setOpen(false);
    };
    return <View className="p-6 gap-3">
        <Button variant="secondary" icon="arrow-down" label="Receive" onPress={() => setOpen(true)} className="self-start" />
        <Text variant="body" tone="muted">{\`Joined \${joined} time\${joined === 1 ? '' : 's'}\`}</Text>
        <Dialog open={open} onClose={() => setOpen(false)} icon="arrow-down" title="Receive files" description="Paste the share link and press Enter." onSubmit={join} submitDisabled={!link.trim()} actions={<><Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} /><Button label="Join space" variant="primary" icon="link" disabled={!link.trim()} onPress={join} /></>}>
          <TextField label="Share link" mono icon="link" placeholder="pearcore://…" value={link} onChangeText={setLink} autoFocus />
        </Dialog>
      </View>;
  },
  play: async ({
    canvasElement
  }) => {
    const page = within(canvasElement);
    const body = within(document.body);
    const field = await body.findByLabelText('Share link');
    await userEvent.click(field);
    await userEvent.keyboard('{Enter}');
    await expect(page.getByText('Joined 0 times')).toBeInTheDocument(); // nothing typed: the main button is not live
    await userEvent.type(field, 'a-link');
    await userEvent.keyboard('{Enter}{Enter}'); // twice in a moment is one join
    await waitFor(() => expect(page.getByText('Joined 1 time')).toBeInTheDocument());
    await waitFor(() => expect(body.queryByLabelText('Share link')).toBeNull());
    // and from anywhere in the dialog, with the keyboard in no field at all
    await new Promise(r => setTimeout(r, 700));
    await userEvent.click(page.getByRole('button', {
      name: 'Receive'
    }));
    await body.findByLabelText('Share link');
    (document.activeElement as HTMLElement | null)?.blur?.();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(page.getByText('Joined 2 times')).toBeInTheDocument());
  }
}`,...W.parameters?.docs?.source},description:{story:`Enter presses the main action: the link is typed, Enter joins, once. Nothing to join with, nothing happens.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Enter never presses a delete',
  render: () => {
    const [open, setOpen] = useState(true);
    const [deleted, setDeleted] = useState(0);
    const remove = () => {
      setDeleted(n => n + 1);
      setOpen(false);
    };
    return <View className="p-6 gap-3">
        <Button variant="danger" icon="stop-circle" label="Delete post" onPress={() => setOpen(true)} className="self-start" />
        <Text variant="body" tone="muted">{\`Deleted \${deleted}\`}</Text>
        <Dialog open={open} onClose={() => setOpen(false)} title="Delete this post?" width={380} destructive onSubmit={remove} actions={<><Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} /><Button label="Delete post" variant="danger" onPress={remove} /></>}>
          <Text variant="body" tone="muted">It leaves the Space for everyone.</Text>
        </Dialog>
      </View>;
  },
  play: async ({
    canvasElement
  }) => {
    const page = within(canvasElement);
    const body = within(document.body);
    await body.findByText('Delete this post?');
    (document.activeElement as HTMLElement | null)?.blur?.();
    await userEvent.keyboard('{Enter}');
    await expect(page.getByText('Deleted 0')).toBeInTheDocument();
    await expect(body.getByText('Delete this post?')).toBeInTheDocument();
    await userEvent.click(within(body.getByRole('dialog')).getByRole('button', {
      name: 'Delete post'
    }));
    await waitFor(() => expect(page.getByText('Deleted 1')).toBeInTheDocument());
  }
}`,...G.parameters?.docs?.source},description:{story:`Enter never deletes: the dialog stays, and the count stays at 0 until the button is clicked.`,...G.parameters?.docs?.description}}}})))()}q();export{U as Confirm,W as EnterJoins,G as EnterNeverDeletes,H as JoinSpace,K as __namedExportsOrder,V as default};