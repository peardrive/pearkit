import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-CPaIl-yS.js";import{a as i,h as a,u as o,z as s}from"./iframe-DCe4DXPm.js";import{n as c,t as l}from"./Button-DbkpAyom.js";import{n as u,r as d,t as f}from"./Menu-DEvWX9jc.js";import{i as p,n as m,t as h}from"./helpers-zAnan5Dk.js";var g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{g=t(),o(),d(),c(),n(),p(),_=i(),{fn:v}=__STORYBOOK_MODULE_TEST__,y=[{key:`reply`,label:`Reply`,icon:`message`,shortcut:`R`,onSelect:v()},{key:`copy`,label:`Copy text`,icon:`copy`,shortcut:`⌘C`,onSelect:v()},{key:`link`,label:`Copy link`,icon:`link`,onSelect:v()},{key:`s1`,separator:!0},{key:`pin`,label:`Pin to the project`,icon:`star`,disabled:!0,onSelect:v()},{key:`s2`,separator:!0},{key:`delete`,label:`Delete message`,icon:`close`,danger:!0,shortcut:`⌫`,onSelect:v()}],b={title:`Components/Menu`,component:u,parameters:{docs:{description:{component:"A list of actions over everything else. `Menu` is controlled (`open`, `onClose`, an `anchor` point in window coordinates) and opens in a pop-up window that covers the screen, so a press anywhere outside closes it; Escape closes it on web. `MenuButton` owns its menu and hangs it from itself: an `IconButton` with just an icon, a `Button` with a label."}}},argTypes:{size:{control:`inline-radio`,options:[`xs`,`sm`,`md`,`lg`]},variant:{control:`inline-radio`,options:[`ghost`,`subtle`,`solid`,`primary`,`secondary`,`danger`]},align:{control:`inline-radio`,options:[`left`,`right`]}},args:{icon:`more`,items:y,tooltip:`More`,size:`md`,variant:`ghost`,align:`right`}},x={},S={render:()=>(0,_.jsxs)(h,{children:[(0,_.jsxs)(m,{title:`Icon only`,children:[(0,_.jsx)(u,{items:y,tooltip:`More`}),(0,_.jsx)(u,{items:y,icon:`setting-2-bold`,tooltip:`Settings`,variant:`subtle`}),(0,_.jsx)(u,{items:y,icon:`add`,tooltip:`New`,variant:`solid`,size:`lg`,align:`left`})]}),(0,_.jsxs)(m,{title:`With a label`,children:[(0,_.jsx)(u,{items:y,label:`Actions`}),(0,_.jsx)(u,{items:y,label:`Sort by`,icon:`sort`,variant:`ghost`,size:`sm`,align:`left`}),(0,_.jsx)(u,{items:y,label:`New`,icon:`add`,variant:`primary`})]}),(0,_.jsxs)(m,{title:`Disabled`,children:[(0,_.jsx)(u,{items:y,tooltip:`More`,disabled:!0}),(0,_.jsx)(u,{items:y,label:`Actions`,disabled:!0})]})]})},C={render:()=>{let[e,t]=(0,g.useState)(null);return(0,_.jsxs)(s,{className:`gap-3`,children:[(0,_.jsx)(a,{onPress:e=>{let n=e.nativeEvent;t({x:n.pageX??40,y:n.pageY??40})},className:`h-40 items-center justify-center rounded-card border border-dashed border-overlay/20 bg-overlay/[0.03]`,style:{width:360},children:(0,_.jsx)(r,{variant:`caption`,tone:`muted`,children:`Press anywhere in here`})}),(0,_.jsx)(l,{label:`Open at the top left`,variant:`secondary`,onPress:()=>t({x:24,y:24}),className:`self-start`}),(0,_.jsx)(f,{open:e!==null,onClose:()=>t(null),items:y,anchor:e??void 0})]})}},w=[`Playground`,`Variants`,`ContextMenu`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Icon only">
        <MenuButton items={ITEMS} tooltip="More" />
        <MenuButton items={ITEMS} icon="setting-2-bold" tooltip="Settings" variant="subtle" />
        <MenuButton items={ITEMS} icon="add" tooltip="New" variant="solid" size="lg" align="left" />
      </Showcase>
      <Showcase title="With a label">
        <MenuButton items={ITEMS} label="Actions" />
        <MenuButton items={ITEMS} label="Sort by" icon="sort" variant="ghost" size="sm" align="left" />
        <MenuButton items={ITEMS} label="New" icon="add" variant="primary" />
      </Showcase>
      <Showcase title="Disabled">
        <MenuButton items={ITEMS} tooltip="More" disabled />
        <MenuButton items={ITEMS} label="Actions" disabled />
      </Showcase>
    </Column>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [anchor, setAnchor] = useState<{
      x: number;
      y: number;
    } | null>(null);
    return <View className="gap-3">
        <Pressable onPress={e => {
        const n = e.nativeEvent as {
          pageX?: number;
          pageY?: number;
        };
        setAnchor({
          x: n.pageX ?? 40,
          y: n.pageY ?? 40
        });
      }} className="h-40 items-center justify-center rounded-card border border-dashed border-overlay/20 bg-overlay/[0.03]" style={{
        width: 360
      }}>
          <Text variant="caption" tone="muted">Press anywhere in here</Text>
        </Pressable>
        <Button label="Open at the top left" variant="secondary" onPress={() => setAnchor({
        x: 24,
        y: 24
      })} className="self-start" />
        <Menu open={anchor !== null} onClose={() => setAnchor(null)} items={ITEMS} anchor={anchor ?? undefined} />
      </View>;
  }
}`,...C.parameters?.docs?.source},description:{story:"The controlled `Menu` on its own, opened where you press (a context menu).",...C.parameters?.docs?.description}}}})))()}T();export{C as ContextMenu,x as Playground,S as Variants,w as __namedExportsOrder,b as default};