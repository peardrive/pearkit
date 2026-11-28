import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-CV2VamHV.js";import{L as i,a,h as o,o as s,s as c,u as l}from"./iframe-B-Z_KQDH.js";import{n as u,t as d}from"./Button-DvOD4BEB.js";import{i as f,n as p,t as m}from"./helpers-BKhN0YQW.js";function h(e,t){return e.includes(t)?e.filter(e=>e!==t):[...e,t]}function g(e,t){return e.indexOf(t)+1}function _(e,t){return[...e.filter(e=>e!==t),t]}function v(e,t){return[t,...e.filter(e=>e!==t)]}function y({n:e,size:t=22,empty:n=`ring`,className:a,style:o}){let c=e>0;return!c&&n===`none`?null:(0,b.jsx)(i,{accessibilityLabel:c?`Number ${e}`:`Not chosen`,className:s(`items-center justify-center`,c?`bg-primary`:`bg-black/35`,a),style:[{minWidth:t,height:t,borderRadius:t/2,paddingHorizontal:c&&e>9?Math.round(t*.22):0,borderWidth:1.5,borderColor:c?`rgba(0,0,0,0.45)`:`rgba(255,255,255,0.8)`},o],children:c?(0,b.jsx)(r,{variant:`micro`,weight:`bold`,className:`text-primary-foreground`,style:{fontSize:Math.round(t*.55),lineHeight:Math.round(t*.72),fontVariant:[`tabular-nums`]},numberOfLines:1,children:e}):null})}var b;function x(){return(x=e((()=>{t(),l(),c(),n(),b=a(),y.__docgenInfo={description:"The number on something chosen in order: 1, 2, 3 in the order it was tapped, in place of a check mark.\nNot chosen: an empty ring, which reads over a picture. The rule that gives the numbers is `utils/order`.",methods:[],displayName:`OrderBadge`,props:{n:{required:!0,tsType:{name:`number`},description:`The number of the thing in the selection: 1 leads. 0 (or less) means it is not chosen.`},size:{required:!1,tsType:{name:`number`},description:`Diameter in points. The number scales with it.`,defaultValue:{value:`22`,computed:!1}},empty:{required:!1,tsType:{name:`union`,raw:`'ring' | 'none'`,elements:[{name:`literal`,value:`'ring'`},{name:`literal`,value:`'none'`}]},description:`What to draw for something that is not chosen: an empty ring (it can be chosen) or nothing.`,defaultValue:{value:`'ring'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},style:{required:!1,tsType:{name:`StyleProp`,elements:[{name:`ViewStyle`}],raw:`StyleProp<ViewStyle>`},description:``}}}})))()}function S({n:e,onPress:t,onLongPress:n,size:r,corner:a=`top-right`,dimUnchosen:c,chosen:l=0,disabled:u,label:d,className:f,style:p,children:m}){let h=e>0;return(0,C.jsxs)(o,{onPress:t,onLongPress:n,disabled:u,accessibilityRole:`checkbox`,accessibilityState:{checked:h,disabled:!!u},accessibilityLabel:`${d?`${d}, `:``}${h?`number ${e}${e===1?`, leads`:``}`:`not chosen`}`,className:s(`overflow-hidden rounded-lg bg-overlay/5`,f),style:[r?{width:r,height:r}:null,p],children:[(0,C.jsx)(i,{style:{flex:1,opacity:c&&!h&&l>0?.55:1},children:m}),h?(0,C.jsx)(i,{pointerEvents:`none`,className:`absolute inset-0 rounded-lg border-2 border-primary`}):null,(0,C.jsx)(y,{n:e,style:{position:`absolute`,top:5,...a===`top-left`?{left:5}:{right:5}}})]})}var C;function w(){return(w=e((()=>{t(),l(),c(),x(),C=a(),S.__docgenInfo={description:`One thing that can be chosen in order: its picture with the order number on a corner. Tap to choose, tap again
to let go. Use it in any grid or list where the order of what is picked matters (the pictures of a post).`,methods:[],displayName:`OrderTile`,props:{n:{required:!0,tsType:{name:`number`},description:"Its number in the selection (1 leads), 0 when it is not chosen. From `useOrderedSelection().numberOf(key)`."},onPress:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`A tap: choose it (it takes the next number) or, when chosen, let it go.`},onLongPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},size:{required:!1,tsType:{name:`number`},description:"Width and height in points. Leave out to let `className` or `style` size it."},corner:{required:!1,tsType:{name:`union`,raw:`'top-right' | 'top-left'`,elements:[{name:`literal`,value:`'top-right'`},{name:`literal`,value:`'top-left'`}]},description:`Where the badge sits on the tile.`,defaultValue:{value:`'top-right'`,computed:!1}},dimUnchosen:{required:!1,tsType:{name:`boolean`},description:`Dim a tile that is not chosen once something else is: the chosen ones stand out.`},chosen:{required:!1,tsType:{name:`number`},description:"How many are chosen in all (needed for `dimUnchosen`).",defaultValue:{value:`0`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``},label:{required:!1,tsType:{name:`string`},description:`Said by a screen reader before "number 2" or "not chosen".`},className:{required:!1,tsType:{name:`string`},description:``},style:{required:!1,tsType:{name:`StyleProp`,elements:[{name:`ViewStyle`}],raw:`StyleProp<ViewStyle>`},description:``},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`The picture, thumbnail or row to choose. It fills the tile.`}}}})))()}function T(e=[],{max:t}={}){let[n,r]=(0,E.useState)(e),i=(0,E.useCallback)(e=>r(n=>t!=null&&n.length>=t&&!n.includes(e)?n:h(n,e)),[t]),a=(0,E.useCallback)(e=>r(t=>_(t,e)),[]),o=(0,E.useCallback)(e=>r(t=>v(t,e)),[]),s=(0,E.useCallback)(()=>r([]),[]),c=(0,E.useCallback)(e=>g(n,e),[n]);return(0,E.useMemo)(()=>({order:n,toggle:i,numberOf:c,sendLast:a,sendFirst:o,clear:s,set:r}),[n,i,c,a,o,s])}var E;function D(){return(D=e((()=>{E=t()})))()}function O({max:e}){let t=T([],{max:e});return(0,k.jsxs)(i,{style:{gap:10,width:354},children:[(0,k.jsx)(i,{style:{flexDirection:`row`,flexWrap:`wrap`,gap:6},children:P.map((e,n)=>(0,k.jsx)(S,{n:t.numberOf(n),onPress:()=>t.toggle(n),size:84,label:`Picture ${n+1}`,dimUnchosen:!0,chosen:t.order.length,children:(0,k.jsx)(i,{style:{flex:1,backgroundColor:e}})},n))}),(0,k.jsxs)(i,{style:{flexDirection:`row`,alignItems:`center`,gap:10},children:[(0,k.jsx)(r,{variant:`caption`,tone:`muted`,style:{flex:1},children:t.order.length?`In this order: ${t.order.map(e=>e+1).join(`, `)}. The first one leads.`:`Tap the pictures in the order you want them.`}),(0,k.jsx)(d,{label:`Clear`,size:`sm`,variant:`ghost`,onPress:t.clear,disabled:!t.order.length})]})]})}var k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{t(),l(),w(),x(),D(),n(),u(),f(),k=a(),{expect:A,userEvent:j,within:M}=__STORYBOOK_MODULE_TEST__,N={title:`Files & sharing/OrderTile`,component:S,parameters:{docs:{description:{component:"Choosing things in order. A tap gives a tile the next number (1, 2, 3) in place of a check mark; a tap on a chosen tile lets it go and the ones after it move up. Number 1 leads: the main picture or video of a post. `useOrderedSelection` holds the order, `OrderBadge` is the number alone, and the rule itself is in `utils/order` for pages that are not React."}}}},P=[`#b4532a`,`#2a7ab4`,`#3a9d5d`,`#8a4fb4`,`#b49a2a`,`#b42a5c`,`#2ab4a6`,`#5c6470`],F={render:()=>(0,k.jsx)(O,{}),play:async({canvasElement:e})=>{let t=M(e),n=e=>t.getByRole(`checkbox`,{name:RegExp(`^Picture ${e},`)});for(let e of[3,1,5])await j.click(n(e));await A(n(3)).toHaveAccessibleName(`Picture 3, number 1, leads`),await A(n(1)).toHaveAccessibleName(`Picture 1, number 2`),await A(n(5)).toHaveAccessibleName(`Picture 5, number 3`),await A(n(2)).toHaveAccessibleName(`Picture 2, not chosen`),await j.click(n(3)),await A(n(1)).toHaveAccessibleName(`Picture 1, number 1, leads`),await A(n(5)).toHaveAccessibleName(`Picture 5, number 2`),await j.click(n(3)),await A(n(3)).toHaveAccessibleName(`Picture 3, number 3`)}},I={render:()=>(0,k.jsx)(O,{max:4}),play:async({canvasElement:e})=>{let t=M(e),n=e=>t.getByRole(`checkbox`,{name:RegExp(`^Picture ${e},`)});for(let e of[1,2,3,4,5])await j.click(n(e));await A(n(4)).toHaveAccessibleName(`Picture 4, number 4`),await A(n(5)).toHaveAccessibleName(`Picture 5, not chosen`)}},L={render:()=>(0,k.jsxs)(m,{children:[(0,k.jsxs)(p,{title:`Chosen: its number`,children:[(0,k.jsx)(y,{n:1}),(0,k.jsx)(y,{n:2}),(0,k.jsx)(y,{n:12}),(0,k.jsx)(y,{n:128})]}),(0,k.jsxs)(p,{title:`Not chosen: an empty ring, or nothing`,children:[(0,k.jsx)(i,{style:{backgroundColor:`#2a7ab4`,padding:8,borderRadius:8},children:(0,k.jsx)(y,{n:0})}),(0,k.jsx)(y,{n:0,empty:`none`})]}),(0,k.jsxs)(p,{title:`Sizes`,children:[(0,k.jsx)(y,{n:3,size:16}),(0,k.jsx)(y,{n:3,size:22}),(0,k.jsx)(y,{n:3,size:30})]})]})},R=[`TapInOrder`,`AtMostFour`,`Badges`],F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Grid />,
  // The rule, tapped through: numbers follow the taps, letting one go moves the rest up, tapping it again sends it last.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const tile = (n: number) => c.getByRole('checkbox', {
      name: new RegExp(\`^Picture \${n},\`)
    });
    for (const n of [3, 1, 5]) await userEvent.click(tile(n));
    await expect(tile(3)).toHaveAccessibleName('Picture 3, number 1, leads');
    await expect(tile(1)).toHaveAccessibleName('Picture 1, number 2');
    await expect(tile(5)).toHaveAccessibleName('Picture 5, number 3');
    await expect(tile(2)).toHaveAccessibleName('Picture 2, not chosen');
    await userEvent.click(tile(3));
    await expect(tile(1)).toHaveAccessibleName('Picture 1, number 1, leads');
    await expect(tile(5)).toHaveAccessibleName('Picture 5, number 2');
    await userEvent.click(tile(3));
    await expect(tile(3)).toHaveAccessibleName('Picture 3, number 3');
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Grid max={4} />,
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const tile = (n: number) => c.getByRole('checkbox', {
      name: new RegExp(\`^Picture \${n},\`)
    });
    for (const n of [1, 2, 3, 4, 5]) await userEvent.click(tile(n));
    await expect(tile(4)).toHaveAccessibleName('Picture 4, number 4');
    await expect(tile(5)).toHaveAccessibleName('Picture 5, not chosen');
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Chosen: its number">
        <OrderBadge n={1} />
        <OrderBadge n={2} />
        <OrderBadge n={12} />
        <OrderBadge n={128} />
      </Showcase>
      <Showcase title="Not chosen: an empty ring, or nothing">
        <View style={{
        backgroundColor: '#2a7ab4',
        padding: 8,
        borderRadius: 8
      }}><OrderBadge n={0} /></View>
        <OrderBadge n={0} empty="none" />
      </Showcase>
      <Showcase title="Sizes">
        <OrderBadge n={3} size={16} />
        <OrderBadge n={3} size={22} />
        <OrderBadge n={3} size={30} />
      </Showcase>
    </Column>
}`,...L.parameters?.docs?.source}}}})))()}z();export{I as AtMostFour,L as Badges,F as TapInOrder,R as __namedExportsOrder,N as default};