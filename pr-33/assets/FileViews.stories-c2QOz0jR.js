import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{n as r,t as i}from"./Text-CmD15Ofj.js";import{D as a,K as o,L as s,N as c,T as l,_ as u,a as d,f,h as p,u as m,z as ee}from"./iframe-s2XYNnpG.js";import{a as te,l as h,n as g,t as _}from"./module-Bl_hvcTh.js";import{n as ne,t as v}from"./PlayerIcon-CAjObe6d.js";import{a as re,i as y,n as b,r as ie,t as ae}from"./ShareProgressBar-7cBI1IVv.js";import{i as oe,n as x,t as se}from"./helpers-B5oJkF_f.js";import{n as ce,t as le}from"./video-dusk-BP8JZpOW.js";import{i as ue,n as de,r as fe,t as pe}from"./photo-ridge-BJu2UWUk.js";import{n as me,t as he}from"./album-ember-CCE21bhd.js";function ge(e){return e?Ae.filter(t=>e.includes(t.value)):Ae}function _e(e,t){let n=ge(t);return n[(n.findIndex(t=>t.value===e)+1)%n.length]?.value??e}function ve(e,t,n,{gap:r=6,edge:i=8}={}){let a=e.x+e.width-n,o=Math.max(i,t-n-i);return{top:Math.round(e.y+e.height+r),left:Math.round(Math.min(o,Math.max(i,a)))}}function ye(e){return e==null||!Number.isFinite(e)?null:Math.round(Math.min(100,Math.max(0,e)))}function be(e,t={}){let n=xe(e);return t.short?n.shortLabel:n.label}function xe(e){return e.done?ie({kind:`active`}):ie({kind:e.direction===`up`?`sharing`:`downloading`,percent:e.percent})}function Se(e){return xe(e).tone}function Ce(e){return e?xe(e).bar:null}function we(e){if(!e||e.direction!==`down`||e.done)return null;let t=ye(e.percent);return t==null?0:t/100}function Te(e,t={}){let n=Math.max(1,Math.floor(t.columns??4)),r=t.gap??10,i=t.edge??12,a=Math.max(0,e-i*2-r*(n-1));return{columns:n,tile:Math.max(1,Math.floor(a/n)),gap:r,edge:i}}function Ee(e){let t=e=>Math.round(e*10)/10,n=t(Math.min(13,Math.max(10,e*.165))),r=t(Math.min(12,Math.max(9,e*.142)));return{name:n,nameLine:Math.ceil(n*1.3),status:r,statusLine:Math.ceil(r*1.3)}}function De(e,t,n,r=n*je){if(!e.length||t<=0)return n;let i=t/(e.length*.68);return Math.round(Math.max(r,Math.min(n,i))*10)/10}function Oe(e,t,n,r){let i=Math.min(1,Math.max(0,Number.isFinite(e)?e:0));if(i<=0)return``;let a=e=>String(Math.round(e*100)/100);if(i>=1)return`M${a(n-t)} ${a(r)}A${a(t)} ${a(t)} 0 1 1 ${a(n+t)} ${a(r)}A${a(t)} ${a(t)} 0 1 1 ${a(n-t)} ${a(r)}Z`;let o=i*2*Math.PI,s=n+t*Math.sin(o),c=r-t*Math.cos(o);return`M${a(n)} ${a(r)}L${a(n)} ${a(r-t)}A${a(t)} ${a(t)} 0 ${+(i>.5)} 1 ${a(s)} ${a(c)}Z`}function ke(e){return e.from===`disk`?`disk:${e.folder}`:`${e.network}:${e.key}`}var Ae,je;function S(){return(S=e((()=>{y(),Ae=[{value:`list`,label:`List view`,name:`List`,icon:`view-list`},{value:`expanded`,label:`Expanded view`,name:`Expanded`,icon:`view-expanded`},{value:`grid`,label:`Grid view`,name:`Grid`,icon:`view-grid`}],je=.8})))()}function C({name:e,size:t=24,color:n=`#fff`}){let r=Ne[e];return(0,Me.jsx)(h,{width:t,height:t,viewBox:`0 0 ${r.box} ${r.box}`,fill:`none`,children:(0,Me.jsx)(te,{d:r.fill,fill:n,fillRule:r.evenodd?`evenodd`:`nonzero`})})}var Me,Ne,Pe;function w(){return(w=e((()=>{n(),_(),Me=d(),Ne={"view-list":{box:24,fill:`M3.6 4.6H20.4A1.1 1.1 0 0 1 21.5 5.7V5.7A1.1 1.1 0 0 1 20.4 6.8H3.6A1.1 1.1 0 0 1 2.5 5.7V5.7A1.1 1.1 0 0 1 3.6 4.6ZM3.6 8.8H20.4A1.1 1.1 0 0 1 21.5 9.9V9.9A1.1 1.1 0 0 1 20.4 11H3.6A1.1 1.1 0 0 1 2.5 9.9V9.9A1.1 1.1 0 0 1 3.6 8.8ZM3.6 13H20.4A1.1 1.1 0 0 1 21.5 14.1V14.1A1.1 1.1 0 0 1 20.4 15.2H3.6A1.1 1.1 0 0 1 2.5 14.1V14.1A1.1 1.1 0 0 1 3.6 13ZM3.6 17.2H20.4A1.1 1.1 0 0 1 21.5 18.3V18.3A1.1 1.1 0 0 1 20.4 19.4H3.6A1.1 1.1 0 0 1 2.5 18.3V18.3A1.1 1.1 0 0 1 3.6 17.2Z`},"view-expanded":{box:24,fill:`M4.2 2.5H19.8A1.7 1.7 0 0 1 21.5 4.2V5.8A1.7 1.7 0 0 1 19.8 7.5H4.2A1.7 1.7 0 0 1 2.5 5.8V4.2A1.7 1.7 0 0 1 4.2 2.5ZM4.2 9.5H19.8A1.7 1.7 0 0 1 21.5 11.2V12.8A1.7 1.7 0 0 1 19.8 14.5H4.2A1.7 1.7 0 0 1 2.5 12.8V11.2A1.7 1.7 0 0 1 4.2 9.5ZM4.2 16.5H19.8A1.7 1.7 0 0 1 21.5 18.2V19.8A1.7 1.7 0 0 1 19.8 21.5H4.2A1.7 1.7 0 0 1 2.5 19.8V18.2A1.7 1.7 0 0 1 4.2 16.5Z`},"view-grid":{box:24,fill:`M4.6 2.5H8.9A2.1 2.1 0 0 1 11 4.6V8.9A2.1 2.1 0 0 1 8.9 11H4.6A2.1 2.1 0 0 1 2.5 8.9V4.6A2.1 2.1 0 0 1 4.6 2.5ZM15.1 2.5H19.4A2.1 2.1 0 0 1 21.5 4.6V8.9A2.1 2.1 0 0 1 19.4 11H15.1A2.1 2.1 0 0 1 13 8.9V4.6A2.1 2.1 0 0 1 15.1 2.5ZM4.6 13H8.9A2.1 2.1 0 0 1 11 15.1V19.4A2.1 2.1 0 0 1 8.9 21.5H4.6A2.1 2.1 0 0 1 2.5 19.4V15.1A2.1 2.1 0 0 1 4.6 13ZM15.1 13H19.4A2.1 2.1 0 0 1 21.5 15.1V19.4A2.1 2.1 0 0 1 19.4 21.5H15.1A2.1 2.1 0 0 1 13 19.4V15.1A2.1 2.1 0 0 1 15.1 13Z`},"kind-file":{box:24,fill:`M7.6 2.5H13.5L19 8V18.9A2.6 2.6 0 0 1 16.4 21.5H7.6A2.6 2.6 0 0 1 5 18.9V5.1A2.6 2.6 0 0 1 7.6 2.5Z`},"kind-document":{box:24,fill:`M7.6 2.5H13.5L19 8V18.9A2.6 2.6 0 0 1 16.4 21.5H7.6A2.6 2.6 0 0 1 5 18.9V5.1A2.6 2.6 0 0 1 7.6 2.5ZM8.85 10.2H15.15A0.85 0.85 0 0 1 16 11.05V11.05A0.85 0.85 0 0 1 15.15 11.9H8.85A0.85 0.85 0 0 1 8 11.05V11.05A0.85 0.85 0 0 1 8.85 10.2ZM8.85 13.4H15.15A0.85 0.85 0 0 1 16 14.25V14.25A0.85 0.85 0 0 1 15.15 15.1H8.85A0.85 0.85 0 0 1 8 14.25V14.25A0.85 0.85 0 0 1 8.85 13.4ZM8.85 16.6H12.15A0.85 0.85 0 0 1 13 17.45V17.45A0.85 0.85 0 0 1 12.15 18.3H8.85A0.85 0.85 0 0 1 8 17.45V17.45A0.85 0.85 0 0 1 8.85 16.6Z`,evenodd:!0},"kind-image":{box:24,fill:`M5.1 4.5H18.9A2.6 2.6 0 0 1 21.5 7.1V16.9A2.6 2.6 0 0 1 18.9 19.5H5.1A2.6 2.6 0 0 1 2.5 16.9V7.1A2.6 2.6 0 0 1 5.1 4.5ZM6.4 9.4A1.8 1.8 0 1 1 10 9.4A1.8 1.8 0 1 1 6.4 9.4ZM5.2 16.8L10 11.6L12.9 14.6L15.2 12.4L18.8 16.8Z`,evenodd:!0},"kind-video":{box:24,fill:`M5.3 5H18.7A2.8 2.8 0 0 1 21.5 7.8V16.2A2.8 2.8 0 0 1 18.7 19H5.3A2.8 2.8 0 0 1 2.5 16.2V7.8A2.8 2.8 0 0 1 5.3 5ZM10.2 8.9L15.4 12L10.2 15.1Z`,evenodd:!0},"kind-audio":{box:256,fill:`M212.92,17.71a7.89,7.89,0,0,0-6.86-1.46l-128,32A8,8,0,0,0,72,56V166.1A36,36,0,1,0,88,196V102.25l112-28V134.1A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.71Z`},"kind-folder":{box:24,fill:`M4.6 4.5H9.2L11.4 7H19.4A2.1 2.1 0 0 1 21.5 9.1V17.4A2.1 2.1 0 0 1 19.4 19.5H4.6A2.1 2.1 0 0 1 2.5 17.4V6.6A2.1 2.1 0 0 1 4.6 4.5Z`},caret:{box:256,fill:`M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z`},tick:{box:256,fill:`M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z`},more:{box:24,fill:`M10.1 5A1.9 1.9 0 1 1 13.9 5A1.9 1.9 0 1 1 10.1 5ZM10.1 12A1.9 1.9 0 1 1 13.9 12A1.9 1.9 0 1 1 10.1 12ZM10.1 19A1.9 1.9 0 1 1 13.9 19A1.9 1.9 0 1 1 10.1 19Z`}},Pe=Object.keys(Ne),C.__docgenInfo={description:``,methods:[],displayName:`FileViewIcon`,props:{name:{required:!0,tsType:{name:`unknown`},description:``},size:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`24`,computed:!1}},color:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'#fff'`,computed:!1}}}}})))()}function Fe({fraction:e,size:t,radius:n=0,color:r=`#fff`}){let i=t/2,a=Math.max(5,t*.29),o=Math.max(1.25,t*.035),c=Oe(e,Math.max(1,a-o*1.9),i,i);return(0,T.jsx)(s,{style:[Ie.cover,{borderRadius:n}],pointerEvents:`none`,accessibilityRole:`progressbar`,accessibilityLabel:`Downloading`,accessibilityValue:{min:0,max:100,now:Math.round(Math.min(1,Math.max(0,e))*100)},children:(0,T.jsxs)(h,{width:t,height:t,viewBox:`0 0 ${t} ${t}`,children:[(0,T.jsx)(g,{cx:i,cy:i,r:a,stroke:r,strokeWidth:o,fill:`none`,opacity:.95}),c?(0,T.jsx)(te,{d:c,fill:r,opacity:.95}):null]})})}var T,Ie;function Le(){return(Le=e((()=>{n(),m(),_(),S(),T=d(),Ie=o.create({cover:{position:`absolute`,top:0,right:0,bottom:0,left:0,overflow:`hidden`,backgroundColor:`rgba(0,0,0,0.52)`,alignItems:`center`,justifyContent:`center`}}),Fe.__docgenInfo={description:``,methods:[],displayName:`DownloadPie`,props:{fraction:{required:!0,tsType:{name:`number`},description:`How much has arrived, 0 to 1.`},size:{required:!0,tsType:{name:`number`},description:`The side of the square it covers.`},radius:{required:!1,tsType:{name:`number`},description:`The corner of the picture underneath, so the dimming does not spill past it.`,defaultValue:{value:`0`,computed:!1}},color:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'#fff'`,computed:!1}}}}})))()}function Re({value:e,onChange:t,modes:n,compact:r=!1,size:i=32,color:a=`rgba(255,255,255,0.72)`,accent:o=`#fff`,onAccent:c=`#111`,track:l=`rgba(255,255,255,0.10)`,style:u}){let d=ge(n),f=Math.round(i*.56),m=Math.round(i*.28);if(r){let r=d.find(t=>t.value===e)??d[0];return r?(0,E.jsx)(p,{style:[D.one,{width:i+6,height:i+6,borderRadius:m+3,backgroundColor:l},u],onPress:()=>t(_e(e,n)),accessibilityRole:`button`,accessibilityLabel:`${r.label}. Change view`,hitSlop:6,children:(0,E.jsx)(C,{name:r.icon,size:f,color:a})}):null}return(0,E.jsx)(s,{style:[D.strip,{borderRadius:m+3,backgroundColor:l},u],accessibilityRole:`tablist`,children:d.map(n=>{let r=n.value===e;return(0,E.jsx)(p,{style:[D.button,{width:i,height:i,borderRadius:m},r&&{backgroundColor:o}],onPress:()=>t(n.value),accessibilityRole:`tab`,accessibilityLabel:n.label,accessibilityState:{selected:r},hitSlop:{top:6,bottom:6},children:(0,E.jsx)(C,{name:n.icon,size:f,color:r?c:a})},n.value)})})}var E,D;function ze(){return(ze=e((()=>{n(),m(),w(),S(),E=d(),D=o.create({strip:{flexDirection:`row`,padding:3,gap:2,alignSelf:`flex-start`},button:{alignItems:`center`,justifyContent:`center`},one:{alignItems:`center`,justifyContent:`center`}}),Re.__docgenInfo={description:``,methods:[],displayName:`ViewSwitcher`,props:{value:{required:!0,tsType:{name:`union`,raw:`'list' | 'expanded' | 'grid'`,elements:[{name:`literal`,value:`'list'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'grid'`}]},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(mode: FileViewMode) => void`,signature:{arguments:[{type:{name:`union`,raw:`'list' | 'expanded' | 'grid'`,elements:[{name:`literal`,value:`'list'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'grid'`}]},name:`mode`}],return:{name:`void`}}},description:``},modes:{required:!1,tsType:{name:`unknown`},description:`The views this app offers. All of them when left out.`},compact:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},size:{required:!1,tsType:{name:`number`},description:`The side of one button.`,defaultValue:{value:`32`,computed:!1}},color:{required:!1,tsType:{name:`string`},description:`The colour of an icon that is not chosen.`,defaultValue:{value:`'rgba(255,255,255,0.72)'`,computed:!1}},accent:{required:!1,tsType:{name:`string`},description:`The colour behind the chosen icon.`,defaultValue:{value:`'#fff'`,computed:!1}},onAccent:{required:!1,tsType:{name:`string`},description:`The colour of the chosen icon, on the accent.`,defaultValue:{value:`'#111'`,computed:!1}},track:{required:!1,tsType:{name:`string`},description:`The colour of the strip the buttons sit on.`,defaultValue:{value:`'rgba(255,255,255,0.10)'`,computed:!1}},style:{required:!1,tsType:{name:`StyleProp`,elements:[{name:`ViewStyle`}],raw:`StyleProp<ViewStyle>`},description:``}}}})))()}function Be({value:e,onChange:t,modes:n,cover:r,size:i=38,color:a=`#fff`,quiet:o=`rgba(255,255,255,0.62)`,accent:c=`#fff`,track:u=`rgba(255,255,255,0.10)`,surface:d=`rgb(28,28,30)`,base:m,line:ee=`rgba(255,255,255,0.18)`,style:te}){let h=ge(n),g=h.find(t=>t.value===e)??h[0],_=(0,O.useRef)(null),[ne,v]=(0,O.useState)(null),re=f(),y=(0,O.useCallback)(()=>v(null),[]);if(!g)return null;let b=ne!==null,ie=()=>{if(b)return y();if(!r||!_.current)return v({x:0,y:0,width:0,height:i});_.current.measureInWindow((e,t,n,r)=>v({x:e,y:t,width:n,height:r}))},ae=(0,k.jsxs)(s,{style:[A.list,{backgroundColor:m??d,borderColor:ee}],accessibilityRole:`menu`,onStartShouldSetResponder:()=>!0,children:[m?(0,k.jsx)(s,{style:[A.wash,{backgroundColor:d}],pointerEvents:`none`}):null,h.map(n=>{let r=n.value===e;return(0,k.jsxs)(p,{style:({pressed:e})=>[A.line,e&&{backgroundColor:ee}],onPress:()=>{y(),r||t(n.value)},accessibilityRole:`menuitem`,accessibilityLabel:n.label,accessibilityState:{selected:r},children:[(0,k.jsx)(C,{name:n.icon,size:18,color:r?c:o}),(0,k.jsx)(l,{style:[A.name,{color:r?c:a}],numberOfLines:1,children:n.name}),r?(0,k.jsx)(C,{name:`tick`,size:15,color:c}):null]},n.value)})]}),oe=ne?ve(ne,re.width,Ve):null;return(0,k.jsxs)(s,{style:A.wrap,children:[(0,k.jsxs)(p,{ref:_,style:[A.button,{height:i,borderRadius:Math.round(i*.27),backgroundColor:u},te],onPress:ie,accessibilityRole:`button`,accessibilityLabel:`${g.label}. Change view`,accessibilityState:{expanded:b},hitSlop:4,children:[(0,k.jsx)(C,{name:g.icon,size:Math.round(i*.47),color:a}),(0,k.jsx)(C,{name:`caret`,size:Math.round(i*.29),color:o})]}),r?(0,k.jsxs)(r,{visible:b,transparent:!0,animationType:`fade`,statusBarTranslucent:!0,onRequestClose:y,children:[(0,k.jsx)(p,{style:A.cover,onPress:y,accessibilityRole:`button`,accessibilityLabel:`Close view list`}),oe?(0,k.jsx)(s,{style:[A.placed,oe],children:ae}):null]}):b?(0,k.jsx)(s,{style:[A.inPlace,{top:i+6}],children:ae}):null]})}var O,k,Ve,He,Ue,A;function We(){return(We=e((()=>{O=t(n()),m(),w(),S(),k=d(),Ve=168,He=42,Ue=5,A=o.create({wrap:{zIndex:30},button:{minWidth:44,paddingHorizontal:9,flexDirection:`row`,alignItems:`center`,justifyContent:`center`,gap:3},cover:{position:`absolute`,top:0,right:0,bottom:0,left:0},placed:{position:`absolute`,width:Ve},inPlace:{position:`absolute`,right:0,width:Ve,zIndex:30},list:{borderRadius:14,borderWidth:o.hairlineWidth*2,paddingVertical:Ue,overflow:`hidden`,shadowColor:`#000`,shadowOpacity:.35,shadowRadius:14,shadowOffset:{width:0,height:6},elevation:12},wash:{position:`absolute`,top:0,right:0,bottom:0,left:0},line:{height:He,paddingHorizontal:13,flexDirection:`row`,alignItems:`center`,gap:11},name:{flex:1,fontSize:15,fontWeight:`600`}}),Be.__docgenInfo={description:``,methods:[],displayName:`ViewMenu`,props:{value:{required:!0,tsType:{name:`union`,raw:`'list' | 'expanded' | 'grid'`,elements:[{name:`literal`,value:`'list'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'grid'`}]},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(mode: FileViewMode) => void`,signature:{arguments:[{type:{name:`union`,raw:`'list' | 'expanded' | 'grid'`,elements:[{name:`literal`,value:`'list'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'grid'`}]},name:`mode`}],return:{name:`void`}}},description:``},modes:{required:!1,tsType:{name:`unknown`},description:`The views this app offers. All of them when left out.`},cover:{required:!1,tsType:{name:`ComponentType`,elements:[{name:`signature`,type:`object`,raw:`{
  visible?: boolean;
  transparent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  statusBarTranslucent?: boolean;
  onRequestClose?: () => void;
  children?: ReactNode;
}`,signature:{properties:[{key:`visible`,value:{name:`boolean`,required:!1}},{key:`transparent`,value:{name:`boolean`,required:!1}},{key:`animationType`,value:{name:`union`,raw:`'none' | 'slide' | 'fade'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'slide'`},{name:`literal`,value:`'fade'`}],required:!1}},{key:`statusBarTranslucent`,value:{name:`boolean`,required:!1}},{key:`onRequestClose`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}},{key:`children`,value:{name:`ReactNode`,required:!1}}]}}],raw:`ComponentType<{
  visible?: boolean;
  transparent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  statusBarTranslucent?: boolean;
  onRequestClose?: () => void;
  children?: ReactNode;
}>`},description:`The app's pop-up window, for the list to open in.`},size:{required:!1,tsType:{name:`number`},description:`The height of the button.`,defaultValue:{value:`38`,computed:!1}},color:{required:!1,tsType:{name:`string`},description:`Icons and words.`,defaultValue:{value:`'#fff'`,computed:!1}},quiet:{required:!1,tsType:{name:`string`},description:`The small arrow on the button, and a view that is not the chosen one.`,defaultValue:{value:`'rgba(255,255,255,0.62)'`,computed:!1}},accent:{required:!1,tsType:{name:`string`},description:`The chosen view in the list.`,defaultValue:{value:`'#fff'`,computed:!1}},track:{required:!1,tsType:{name:`string`},description:`Behind the button.`,defaultValue:{value:`'rgba(255,255,255,0.10)'`,computed:!1}},surface:{required:!1,tsType:{name:`string`},description:`Behind the list.`,defaultValue:{value:`'rgb(28,28,30)'`,computed:!1}},base:{required:!1,tsType:{name:`string`},description:`A solid colour painted under \`surface\`, for an app whose surface colour is see-through (a
white wash over its background, say). Without it a see-through surface lets the page behind
the list show through the list.`},line:{required:!1,tsType:{name:`string`},description:`The edge of the list.`,defaultValue:{value:`'rgba(255,255,255,0.18)'`,computed:!1}},style:{required:!1,tsType:{name:`StyleProp`,elements:[{name:`ViewStyle`}],raw:`StyleProp<ViewStyle>`},description:`The button's own shape, to match the buttons beside it.`}}}})))()}function Ge(e,t){return e===`good`?t.good:e===`busy`?t.busy:e===`bad`?t.bad:t.muted}function Ke(e){return e.bar??re({busy:e.busy,good:e.good})}function qe(e){return e.status?`${e.name}, ${e.status}`:e.name}function j({item:e,size:t,radius:n=Math.round(t*.2),colors:r=N,renderThumb:i}){let o=i?i(e,t):null,c=Math.max(14,Math.round(t*.3));return(0,M.jsxs)(s,{style:{width:t,height:t},children:[(0,M.jsxs)(s,{style:[P.thumb,{width:t,height:t,borderRadius:n,backgroundColor:r.tile}],children:[o??(e.thumbnail?(0,M.jsx)(a,{source:{uri:e.thumbnail},style:P.cover,resizeMode:`cover`}):(0,M.jsx)(C,{name:Ze[e.kind],size:Math.round(t*.58),color:r.glyph})),e.download==null?null:(0,M.jsx)(Fe,{fraction:e.download,size:t,radius:n})]}),e.selected?(0,M.jsx)(s,{style:[P.tick,{width:c,height:c,borderRadius:c/2,backgroundColor:r.accent}],children:(0,M.jsx)(C,{name:`tick`,size:Math.round(c*.62),color:r.onAccent})}):null]})}function Je({item:e,index:t,colors:n=N,onPress:r,onLongPress:i,renderThumb:a}){return(0,M.jsxs)(p,{style:[P.listRow,t%2==1&&{backgroundColor:n.stripe},e.dim&&P.dim],onPress:r,onLongPress:i,accessibilityRole:e.selected==null?`button`:`checkbox`,accessibilityState:e.selected==null?void 0:{checked:e.selected},accessibilityLabel:qe(e),children:[(0,M.jsx)(j,{item:e,size:24,radius:5,colors:n,renderThumb:a}),(0,M.jsx)(l,{style:[P.listName,{color:n.text}],numberOfLines:1,ellipsizeMode:`middle`,maxFontSizeMultiplier:1.2,children:e.name}),e.status?(0,M.jsx)(l,{style:[P.listStatus,{color:Ge(e.tone,n)}],numberOfLines:1,maxFontSizeMultiplier:1.2,children:e.status}):null]})}function Ye({item:e,tile:t,colors:n=N,onPress:r,onLongPress:i,renderThumb:a}){let o=Ee(t),s=e.shortStatus??e.status??` `,c=ee.OS===`web`?De(s,t+8,o.status):o.status;return(0,M.jsxs)(p,{style:[{width:t},e.dim&&P.dim],onPress:r,onLongPress:i,accessibilityRole:e.selected==null?`button`:`checkbox`,accessibilityState:e.selected==null?void 0:{checked:e.selected},accessibilityLabel:qe(e),children:[(0,M.jsx)(j,{item:e,size:t,colors:n,renderThumb:a}),(0,M.jsx)(l,{style:[P.gridName,{color:n.text,fontSize:o.name,lineHeight:o.nameLine}],numberOfLines:1,ellipsizeMode:`middle`,maxFontSizeMultiplier:1.15,children:e.name}),(0,M.jsx)(l,{style:[P.gridStatus,{color:Ge(e.tone,n),fontSize:c,lineHeight:o.statusLine}],numberOfLines:1,adjustsFontSizeToFit:!0,minimumFontScale:je,maxFontSizeMultiplier:1.15,children:s})]})}function Xe({item:e,divider:t=!0,colors:n=N,onPress:r,onLongPress:i,onMore:a,renderThumb:c}){let u=e.status??e.detail??``;return(0,M.jsxs)(s,{style:[P.expandedOuter,t&&{borderTopWidth:o.hairlineWidth,borderTopColor:n.line},e.dim&&P.dim],children:[(0,M.jsxs)(p,{style:P.expandedRow,onPress:r,onLongPress:i,accessibilityRole:e.selected==null?`button`:`checkbox`,accessibilityState:e.selected==null?void 0:{checked:e.selected},accessibilityLabel:qe(e),children:[(0,M.jsx)(j,{item:e,size:48,radius:10,colors:n,renderThumb:c}),(0,M.jsxs)(s,{style:P.expandedText,children:[(0,M.jsx)(l,{style:[P.expandedName,{color:n.text}],numberOfLines:1,ellipsizeMode:`middle`,children:e.name}),u?(0,M.jsxs)(l,{style:[P.expandedUnder,{color:n.muted}],numberOfLines:1,children:[e.status?(0,M.jsx)(l,{style:{color:Ge(e.tone,n)},children:e.status}):null,e.status&&e.detail?` · ${e.detail}`:e.status?null:u]}):null,e.bar?(0,M.jsx)(ae,{value:e.bar.value,look:e.bar.look,colors:Ke(n),style:P.expandedBar}):null]})]}),a?(0,M.jsx)(p,{style:P.more,onPress:a,hitSlop:8,accessibilityRole:`button`,accessibilityLabel:`More options for ${e.name}`,children:(0,M.jsx)(C,{name:`more`,size:20,color:n.muted})}):null]})}var M,N,Ze,P;function Qe(){return(Qe=e((()=>{n(),m(),b(),y(),Le(),w(),S(),M=d(),N={text:`#ffffff`,muted:`rgba(255,255,255,0.56)`,good:`#a8cf3a`,busy:`#f2b84b`,bad:`#ff6b6b`,tile:`rgba(255,255,255,0.09)`,glyph:`rgba(255,255,255,0.88)`,line:`rgba(255,255,255,0.08)`,stripe:`rgba(255,255,255,0.045)`,accent:`#a8cf3a`,onAccent:`#111111`},Ze={image:`kind-image`,video:`kind-video`,audio:`kind-audio`,document:`kind-document`,folder:`kind-folder`,file:`kind-file`},P=o.create({thumb:{overflow:`hidden`,alignItems:`center`,justifyContent:`center`},cover:{position:`absolute`,top:0,right:0,bottom:0,left:0,width:`100%`,height:`100%`},tick:{position:`absolute`,right:-3,bottom:-3,alignItems:`center`,justifyContent:`center`},dim:{opacity:.55},listRow:{height:40,paddingHorizontal:14,flexDirection:`row`,alignItems:`center`,gap:10},listName:{flex:1,fontSize:14,fontWeight:`500`},listStatus:{maxWidth:`44%`,fontSize:12,fontWeight:`500`,textAlign:`right`},gridName:{marginTop:5,marginHorizontal:-4,fontWeight:`600`,textAlign:`center`},gridStatus:{marginHorizontal:-4,fontWeight:`500`,letterSpacing:-.2,textAlign:`center`},expandedOuter:{minHeight:72,paddingHorizontal:16,flexDirection:`row`,alignItems:`center`},expandedRow:{flex:1,minHeight:72,flexDirection:`row`,alignItems:`center`,gap:12},expandedText:{flex:1,gap:3},expandedName:{fontSize:16,fontWeight:`600`},expandedUnder:{fontSize:13,fontWeight:`500`},expandedBar:{marginTop:3},more:{width:32,height:32,alignItems:`center`,justifyContent:`center`}}),j.__docgenInfo={description:`The square picture of a file: its thumbnail, or an icon for what kind of file it is, with the
download pie over it while it is arriving and a tick when it is chosen.`,methods:[],displayName:`FileThumb`,props:{item:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},description:``},size:{required:!0,tsType:{name:`number`},description:``},radius:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`Math.round(size * 0.2)`,computed:!0}},colors:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  text: string;
  /** Small text that is not a status: a detail, a name that is dimmed. */
  muted: string;
  /** Status colours, by tone. */
  good: string;
  busy: string;
  bad: string;
  /** The square behind a file that has no picture. */
  tile: string;
  /** The icon on that square. */
  glyph: string;
  /** The hairline between rows of the expanded list. */
  line: string;
  /** Every other line of the list view, like a folder in Finder. */
  stripe: string;
  /** The tick of a chosen file. */
  accent: string;
  onAccent: string;
  /** The progress bar. Left out, it is made from \`busy\` and \`good\`, so it matches the words. */
  bar?: ShareBarColors;
}`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`muted`,value:{name:`string`,required:!0},description:`Small text that is not a status: a detail, a name that is dimmed.`},{key:`good`,value:{name:`string`,required:!0},description:`Status colours, by tone.`},{key:`busy`,value:{name:`string`,required:!0}},{key:`bad`,value:{name:`string`,required:!0}},{key:`tile`,value:{name:`string`,required:!0},description:`The square behind a file that has no picture.`},{key:`glyph`,value:{name:`string`,required:!0},description:`The icon on that square.`},{key:`line`,value:{name:`string`,required:!0},description:`The hairline between rows of the expanded list.`},{key:`stripe`,value:{name:`string`,required:!0},description:`Every other line of the list view, like a folder in Finder.`},{key:`accent`,value:{name:`string`,required:!0},description:`The tick of a chosen file.`},{key:`onAccent`,value:{name:`string`,required:!0}},{key:`bar`,value:{name:`signature`,type:`object`,raw:`{
  /** The empty part. */
  track: string;
  /** The gradient of a bar that is moving, left to right. */
  from: string;
  to: string;
  /** A bar that is waiting. */
  holding: string;
  /** A bar the person paused. */
  stopped: string;
}`,signature:{properties:[{key:`track`,value:{name:`string`,required:!0},description:`The empty part.`},{key:`from`,value:{name:`string`,required:!0},description:`The gradient of a bar that is moving, left to right.`},{key:`to`,value:{name:`string`,required:!0}},{key:`holding`,value:{name:`string`,required:!0},description:`A bar that is waiting.`},{key:`stopped`,value:{name:`string`,required:!0},description:`A bar the person paused.`}]},required:!1},description:"The progress bar. Left out, it is made from `busy` and `good`, so it matches the words."}]}},description:``,defaultValue:{value:`{
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.56)',
  good: '#a8cf3a',
  busy: '#f2b84b',
  bad: '#ff6b6b',
  tile: 'rgba(255,255,255,0.09)',
  glyph: 'rgba(255,255,255,0.88)',
  line: 'rgba(255,255,255,0.08)',
  stripe: 'rgba(255,255,255,0.045)',
  accent: '#a8cf3a',
  onAccent: '#111111',
}`,computed:!1}},renderThumb:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>, size: number) => ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`},{type:{name:`number`},name:`size`}],return:{name:`ReactNode`}}},description:``}}},Je.__docgenInfo={description:`The list view: one tight line, the way Finder lists a folder. A small picture, the name, and
the state at the right. Every other line is shaded so the eye can follow a line across.`,methods:[],displayName:`FileListRow`,props:{item:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},description:``},colors:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  text: string;
  /** Small text that is not a status: a detail, a name that is dimmed. */
  muted: string;
  /** Status colours, by tone. */
  good: string;
  busy: string;
  bad: string;
  /** The square behind a file that has no picture. */
  tile: string;
  /** The icon on that square. */
  glyph: string;
  /** The hairline between rows of the expanded list. */
  line: string;
  /** Every other line of the list view, like a folder in Finder. */
  stripe: string;
  /** The tick of a chosen file. */
  accent: string;
  onAccent: string;
  /** The progress bar. Left out, it is made from \`busy\` and \`good\`, so it matches the words. */
  bar?: ShareBarColors;
}`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`muted`,value:{name:`string`,required:!0},description:`Small text that is not a status: a detail, a name that is dimmed.`},{key:`good`,value:{name:`string`,required:!0},description:`Status colours, by tone.`},{key:`busy`,value:{name:`string`,required:!0}},{key:`bad`,value:{name:`string`,required:!0}},{key:`tile`,value:{name:`string`,required:!0},description:`The square behind a file that has no picture.`},{key:`glyph`,value:{name:`string`,required:!0},description:`The icon on that square.`},{key:`line`,value:{name:`string`,required:!0},description:`The hairline between rows of the expanded list.`},{key:`stripe`,value:{name:`string`,required:!0},description:`Every other line of the list view, like a folder in Finder.`},{key:`accent`,value:{name:`string`,required:!0},description:`The tick of a chosen file.`},{key:`onAccent`,value:{name:`string`,required:!0}},{key:`bar`,value:{name:`signature`,type:`object`,raw:`{
  /** The empty part. */
  track: string;
  /** The gradient of a bar that is moving, left to right. */
  from: string;
  to: string;
  /** A bar that is waiting. */
  holding: string;
  /** A bar the person paused. */
  stopped: string;
}`,signature:{properties:[{key:`track`,value:{name:`string`,required:!0},description:`The empty part.`},{key:`from`,value:{name:`string`,required:!0},description:`The gradient of a bar that is moving, left to right.`},{key:`to`,value:{name:`string`,required:!0}},{key:`holding`,value:{name:`string`,required:!0},description:`A bar that is waiting.`},{key:`stopped`,value:{name:`string`,required:!0},description:`A bar the person paused.`}]},required:!1},description:"The progress bar. Left out, it is made from `busy` and `good`, so it matches the words."}]}},description:``,defaultValue:{value:`{
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.56)',
  good: '#a8cf3a',
  busy: '#f2b84b',
  bad: '#ff6b6b',
  tile: 'rgba(255,255,255,0.09)',
  glyph: 'rgba(255,255,255,0.88)',
  line: 'rgba(255,255,255,0.08)',
  stripe: 'rgba(255,255,255,0.045)',
  accent: '#a8cf3a',
  onAccent: '#111111',
}`,computed:!1}},onPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onLongPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`A long press: the app's menu for this file.`},renderThumb:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>, size: number) => ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`},{type:{name:`number`},name:`size`}],return:{name:`ReactNode`}}},description:``},index:{required:!0,tsType:{name:`number`},description:``}}},Ye.__docgenInfo={description:`The grid view: the picture, then two small lines under it, the name (shortened in the middle
so its ending still shows) and the state.`,methods:[],displayName:`FileGridCell`,props:{item:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},description:``},colors:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  text: string;
  /** Small text that is not a status: a detail, a name that is dimmed. */
  muted: string;
  /** Status colours, by tone. */
  good: string;
  busy: string;
  bad: string;
  /** The square behind a file that has no picture. */
  tile: string;
  /** The icon on that square. */
  glyph: string;
  /** The hairline between rows of the expanded list. */
  line: string;
  /** Every other line of the list view, like a folder in Finder. */
  stripe: string;
  /** The tick of a chosen file. */
  accent: string;
  onAccent: string;
  /** The progress bar. Left out, it is made from \`busy\` and \`good\`, so it matches the words. */
  bar?: ShareBarColors;
}`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`muted`,value:{name:`string`,required:!0},description:`Small text that is not a status: a detail, a name that is dimmed.`},{key:`good`,value:{name:`string`,required:!0},description:`Status colours, by tone.`},{key:`busy`,value:{name:`string`,required:!0}},{key:`bad`,value:{name:`string`,required:!0}},{key:`tile`,value:{name:`string`,required:!0},description:`The square behind a file that has no picture.`},{key:`glyph`,value:{name:`string`,required:!0},description:`The icon on that square.`},{key:`line`,value:{name:`string`,required:!0},description:`The hairline between rows of the expanded list.`},{key:`stripe`,value:{name:`string`,required:!0},description:`Every other line of the list view, like a folder in Finder.`},{key:`accent`,value:{name:`string`,required:!0},description:`The tick of a chosen file.`},{key:`onAccent`,value:{name:`string`,required:!0}},{key:`bar`,value:{name:`signature`,type:`object`,raw:`{
  /** The empty part. */
  track: string;
  /** The gradient of a bar that is moving, left to right. */
  from: string;
  to: string;
  /** A bar that is waiting. */
  holding: string;
  /** A bar the person paused. */
  stopped: string;
}`,signature:{properties:[{key:`track`,value:{name:`string`,required:!0},description:`The empty part.`},{key:`from`,value:{name:`string`,required:!0},description:`The gradient of a bar that is moving, left to right.`},{key:`to`,value:{name:`string`,required:!0}},{key:`holding`,value:{name:`string`,required:!0},description:`A bar that is waiting.`},{key:`stopped`,value:{name:`string`,required:!0},description:`A bar the person paused.`}]},required:!1},description:"The progress bar. Left out, it is made from `busy` and `good`, so it matches the words."}]}},description:``,defaultValue:{value:`{
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.56)',
  good: '#a8cf3a',
  busy: '#f2b84b',
  bad: '#ff6b6b',
  tile: 'rgba(255,255,255,0.09)',
  glyph: 'rgba(255,255,255,0.88)',
  line: 'rgba(255,255,255,0.08)',
  stripe: 'rgba(255,255,255,0.045)',
  accent: '#a8cf3a',
  onAccent: '#111111',
}`,computed:!1}},onPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onLongPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`A long press: the app's menu for this file.`},renderThumb:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>, size: number) => ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`},{type:{name:`number`},name:`size`}],return:{name:`ReactNode`}}},description:``},tile:{required:!0,tsType:{name:`number`},description:``}}},Xe.__docgenInfo={description:"The expanded view: a roomy row with a larger picture, the name, and a line under it (the\nstate in its colour, then the detail in grey), and the progress bar under that while a\ntransfer is not finished. An app that already has a row of its own for\nthis view keeps it, and passes it to `FileViews` as `renderExpanded`.",methods:[],displayName:`FileExpandedRow`,props:{item:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},description:``},colors:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  text: string;
  /** Small text that is not a status: a detail, a name that is dimmed. */
  muted: string;
  /** Status colours, by tone. */
  good: string;
  busy: string;
  bad: string;
  /** The square behind a file that has no picture. */
  tile: string;
  /** The icon on that square. */
  glyph: string;
  /** The hairline between rows of the expanded list. */
  line: string;
  /** Every other line of the list view, like a folder in Finder. */
  stripe: string;
  /** The tick of a chosen file. */
  accent: string;
  onAccent: string;
  /** The progress bar. Left out, it is made from \`busy\` and \`good\`, so it matches the words. */
  bar?: ShareBarColors;
}`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`muted`,value:{name:`string`,required:!0},description:`Small text that is not a status: a detail, a name that is dimmed.`},{key:`good`,value:{name:`string`,required:!0},description:`Status colours, by tone.`},{key:`busy`,value:{name:`string`,required:!0}},{key:`bad`,value:{name:`string`,required:!0}},{key:`tile`,value:{name:`string`,required:!0},description:`The square behind a file that has no picture.`},{key:`glyph`,value:{name:`string`,required:!0},description:`The icon on that square.`},{key:`line`,value:{name:`string`,required:!0},description:`The hairline between rows of the expanded list.`},{key:`stripe`,value:{name:`string`,required:!0},description:`Every other line of the list view, like a folder in Finder.`},{key:`accent`,value:{name:`string`,required:!0},description:`The tick of a chosen file.`},{key:`onAccent`,value:{name:`string`,required:!0}},{key:`bar`,value:{name:`signature`,type:`object`,raw:`{
  /** The empty part. */
  track: string;
  /** The gradient of a bar that is moving, left to right. */
  from: string;
  to: string;
  /** A bar that is waiting. */
  holding: string;
  /** A bar the person paused. */
  stopped: string;
}`,signature:{properties:[{key:`track`,value:{name:`string`,required:!0},description:`The empty part.`},{key:`from`,value:{name:`string`,required:!0},description:`The gradient of a bar that is moving, left to right.`},{key:`to`,value:{name:`string`,required:!0}},{key:`holding`,value:{name:`string`,required:!0},description:`A bar that is waiting.`},{key:`stopped`,value:{name:`string`,required:!0},description:`A bar the person paused.`}]},required:!1},description:"The progress bar. Left out, it is made from `busy` and `good`, so it matches the words."}]}},description:``,defaultValue:{value:`{
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.56)',
  good: '#a8cf3a',
  busy: '#f2b84b',
  bad: '#ff6b6b',
  tile: 'rgba(255,255,255,0.09)',
  glyph: 'rgba(255,255,255,0.88)',
  line: 'rgba(255,255,255,0.08)',
  stripe: 'rgba(255,255,255,0.045)',
  accent: '#a8cf3a',
  onAccent: '#111111',
}`,computed:!1}},onPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onLongPress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`A long press: the app's menu for this file.`},renderThumb:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>, size: number) => ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`},{type:{name:`number`},name:`size`}],return:{name:`ReactNode`}}},description:``},divider:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},onMore:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}function $e({items:e,mode:t,onOpen:n,onMore:r,colors:i=N,columns:a=5,renderThumb:o,renderExpanded:l,header:u,empty:d,bottomRoom:f=0,style:p}){let[m,ee]=(0,F.useState)(0),te=(0,F.useCallback)(e=>ee(e.nativeEvent.layout.width),[]),h=Te(m,{columns:a}),g=t===`grid`;return(0,I.jsx)(s,{style:[tt.fill,p],onLayout:te,children:m>0?(0,I.jsx)(c,{data:e,keyExtractor:e=>e.id,numColumns:g?h.columns:1,columnWrapperStyle:g?{gap:h.gap,paddingHorizontal:h.edge}:void 0,contentContainerStyle:[g?{gap:h.gap+4,paddingTop:h.edge}:null,{paddingBottom:f},e.length===0?tt.emptyContent:null],ListHeaderComponent:u?(0,I.jsx)(I.Fragment,{children:u}):void 0,ListEmptyComponent:d?(0,I.jsx)(I.Fragment,{children:d}):void 0,showsVerticalScrollIndicator:!1,renderItem:({item:e,index:a})=>{let s=n?()=>n(e):void 0,c=r?()=>r(e):void 0;return g?(0,I.jsx)(Ye,{item:e,tile:h.tile,colors:i,onPress:s,onLongPress:c,renderThumb:o}):t===`list`?(0,I.jsx)(Je,{item:e,index:a,colors:i,onPress:s,onLongPress:c,renderThumb:o}):l?.(e,a)??(0,I.jsx)(Xe,{item:e,divider:a!==0,colors:i,onPress:s,onLongPress:c,onMore:c,renderThumb:o})}},g?`grid-${h.columns}`:t):null})}function et(e,t){let[n,r]=(0,F.useState)({items:[],loading:!!t,error:null}),[i,a]=(0,F.useState)(0),o=t?ke(t):``,s=(0,F.useRef)({reader:e,source:t});s.current={reader:e,source:t},(0,F.useEffect)(()=>{let{reader:e,source:t}=s.current;if(!t){r({items:[],loading:!1,error:null});return}let n=!0,i=()=>{e.list(t).then(e=>{n&&r({items:e,loading:!1,error:null})}).catch(e=>{n&&r(t=>({items:t.items,loading:!1,error:e instanceof Error?e.message:String(e)}))})};r(e=>({...e,loading:!0})),i();let a=e.watch?.(t,i);return()=>{n=!1,a?.()}},[o,i]);let c=(0,F.useCallback)(()=>a(e=>e+1),[]);return{...n,reload:c}}var F,I,tt;function nt(){return(nt=e((()=>{F=t(n()),m(),Qe(),S(),I=d(),tt=o.create({fill:{flex:1},emptyContent:{flexGrow:1,justifyContent:`center`}}),$e.__docgenInfo={description:``,methods:[],displayName:`FileViews`,props:{items:{required:!0,tsType:{name:`unknown`},description:``},mode:{required:!0,tsType:{name:`union`,raw:`'list' | 'expanded' | 'grid'`,elements:[{name:`literal`,value:`'list'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'grid'`}]},description:``},onOpen:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`}],return:{name:`void`}}},description:`A touch on a file.`},onMore:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`}],return:{name:`void`}}},description:`A long press on a file (and the more button of the expanded view): the app's menu for it.`},colors:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  text: string;
  /** Small text that is not a status: a detail, a name that is dimmed. */
  muted: string;
  /** Status colours, by tone. */
  good: string;
  busy: string;
  bad: string;
  /** The square behind a file that has no picture. */
  tile: string;
  /** The icon on that square. */
  glyph: string;
  /** The hairline between rows of the expanded list. */
  line: string;
  /** Every other line of the list view, like a folder in Finder. */
  stripe: string;
  /** The tick of a chosen file. */
  accent: string;
  onAccent: string;
  /** The progress bar. Left out, it is made from \`busy\` and \`good\`, so it matches the words. */
  bar?: ShareBarColors;
}`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`muted`,value:{name:`string`,required:!0},description:`Small text that is not a status: a detail, a name that is dimmed.`},{key:`good`,value:{name:`string`,required:!0},description:`Status colours, by tone.`},{key:`busy`,value:{name:`string`,required:!0}},{key:`bad`,value:{name:`string`,required:!0}},{key:`tile`,value:{name:`string`,required:!0},description:`The square behind a file that has no picture.`},{key:`glyph`,value:{name:`string`,required:!0},description:`The icon on that square.`},{key:`line`,value:{name:`string`,required:!0},description:`The hairline between rows of the expanded list.`},{key:`stripe`,value:{name:`string`,required:!0},description:`Every other line of the list view, like a folder in Finder.`},{key:`accent`,value:{name:`string`,required:!0},description:`The tick of a chosen file.`},{key:`onAccent`,value:{name:`string`,required:!0}},{key:`bar`,value:{name:`signature`,type:`object`,raw:`{
  /** The empty part. */
  track: string;
  /** The gradient of a bar that is moving, left to right. */
  from: string;
  to: string;
  /** A bar that is waiting. */
  holding: string;
  /** A bar the person paused. */
  stopped: string;
}`,signature:{properties:[{key:`track`,value:{name:`string`,required:!0},description:`The empty part.`},{key:`from`,value:{name:`string`,required:!0},description:`The gradient of a bar that is moving, left to right.`},{key:`to`,value:{name:`string`,required:!0}},{key:`holding`,value:{name:`string`,required:!0},description:`A bar that is waiting.`},{key:`stopped`,value:{name:`string`,required:!0},description:`A bar the person paused.`}]},required:!1},description:"The progress bar. Left out, it is made from `busy` and `good`, so it matches the words."}]}},description:``,defaultValue:{value:`{
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.56)',
  good: '#a8cf3a',
  busy: '#f2b84b',
  bad: '#ff6b6b',
  tile: 'rgba(255,255,255,0.09)',
  glyph: 'rgba(255,255,255,0.88)',
  line: 'rgba(255,255,255,0.08)',
  stripe: 'rgba(255,255,255,0.045)',
  accent: '#a8cf3a',
  onAccent: '#111111',
}`,computed:!1}},columns:{required:!1,tsType:{name:`number`},description:`Pictures across in the grid. Five unless the app says otherwise.`,defaultValue:{value:`5`,computed:!1}},renderThumb:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>, size: number) => ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`},{type:{name:`number`},name:`size`}],return:{name:`ReactNode`}}},description:`The app's own picture for a file; return null to get the standard one.`},renderExpanded:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileViewItem<Extra>, index: number) => ReactElement | null`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  kind: FileViewKind;
  /** The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%". */
  status?: string | null;
  /**
   * The same state in fewer letters, for the grid, where a line holds about a dozen. The grid
   * shows it in place of \`status\` when it is given.
   */
  shortStatus?: string | null;
  tone?: FileTone;
  /**
   * How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
   * draws the pie over the picture. Leave it out for a file that is here, and for an upload.
   */
  download?: number | null;
  /**
   * The progress bar under the status line in the expanded view, or nothing for none. It comes
   * from \`describeShareState\` (or \`transferBar\`), which also says how it is drawn.
   */
  bar?: ShareBar | null;
  /** More about the file for the expanded view: its size, its age. */
  detail?: string | null;
  /** A picture of the file, when there is one. */
  thumbnail?: string | null;
  /** Drawn fainter: a share that is switched off, a file that is not here. */
  dim?: boolean;
  /** Ticked, while the app is letting the user pick several. */
  selected?: boolean;
  extra?: Extra;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'image' | 'video' | 'audio' | 'document' | 'folder' | 'file'`,elements:[{name:`literal`,value:`'image'`},{name:`literal`,value:`'video'`},{name:`literal`,value:`'audio'`},{name:`literal`,value:`'document'`},{name:`literal`,value:`'folder'`},{name:`literal`,value:`'file'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one short line about the file's state: "Active", "Downloading 48%", "Sharing 12%".`},{key:`shortStatus`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:"The same state in fewer letters, for the grid, where a line holds about a dozen. The grid\nshows it in place of `status` when it is given."},{key:`tone`,value:{name:`union`,raw:`'plain' | 'good' | 'busy' | 'bad'`,elements:[{name:`literal`,value:`'plain'`},{name:`literal`,value:`'good'`},{name:`literal`,value:`'busy'`},{name:`literal`,value:`'bad'`}],required:!1}},{key:`download`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1},description:`How much of the file has arrived, 0 to 1, and only while it is downloading. This is what
draws the pie over the picture. Leave it out for a file that is here, and for an upload.`},{key:`bar`,value:{name:`union`,raw:`ShareBar | null`,elements:[{name:`signature`,type:`object`,raw:`{ look: ShareBarLook; /** 0 to 1. */ value: number }`,signature:{properties:[{key:`look`,value:{name:`union`,raw:`'moving' | 'holding' | 'stopped'`,elements:[{name:`literal`,value:`'moving'`},{name:`literal`,value:`'holding'`},{name:`literal`,value:`'stopped'`}],required:!0}},{key:`value`,value:{name:`number`,required:!0},description:`0 to 1.`}]}},{name:`null`}],required:!1},description:"The progress bar under the status line in the expanded view, or nothing for none. It comes\nfrom `describeShareState` (or `transferBar`), which also says how it is drawn."},{key:`detail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`More about the file for the expanded view: its size, its age.`},{key:`thumbnail`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`A picture of the file, when there is one.`},{key:`dim`,value:{name:`boolean`,required:!1},description:`Drawn fainter: a share that is switched off, a file that is not here.`},{key:`selected`,value:{name:`boolean`,required:!1},description:`Ticked, while the app is letting the user pick several.`},{key:`extra`,value:{name:`Extra`,required:!1}}]}},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`union`,raw:`ReactElement | null`,elements:[{name:`ReactElement`},{name:`null`}]}}},description:`The app's own row for the expanded view, when it already has one.`},header:{required:!1,tsType:{name:`ReactNode`},description:`Shown above the files, and scrolls with them.`},empty:{required:!1,tsType:{name:`ReactNode`},description:`Shown when there are no files.`},bottomRoom:{required:!1,tsType:{name:`number`},description:`Room left under the last file, for a toolbar that floats over the list.`,defaultValue:{value:`0`,computed:!1}},style:{required:!1,tsType:{name:`StyleProp`,elements:[{name:`ViewStyle`}],raw:`StyleProp<ViewStyle>`},description:``}}}})))()}function L(e,t){return{...e,status:be(t),shortStatus:be(t,{short:!0}),download:we(t),tone:Se(t),bar:Ce(t)}}function rt({mode:e,columns:t,compact:n,menu:r,width:a,height:o,onOpen:c,onMore:l}){let[d,f]=(0,R.useState)(e);return(0,R.useEffect)(()=>f(e),[e]),(0,z.jsxs)(s,{style:{width:a,height:o,backgroundColor:`#0f1110`,borderRadius:28,overflow:`hidden`},children:[(0,z.jsxs)(s,{style:{paddingHorizontal:14,paddingTop:18,paddingBottom:10,flexDirection:`row`,alignItems:`center`,justifyContent:`space-between`},children:[(0,z.jsx)(i,{variant:`title`,children:`Files`}),r?(0,z.jsx)(Be,{value:d,onChange:f,cover:u,accent:`#a8cf3a`}):(0,z.jsx)(Re,{value:d,onChange:f,compact:n,accent:`#a8cf3a`,onAccent:`#111`})]}),(0,z.jsx)($e,{items:U,mode:d,columns:t,onOpen:c,onMore:l,bottomRoom:24})]})}function it({compact:e=!1}){let[t,n]=(0,R.useState)(`expanded`);return(0,z.jsxs)(s,{style:{alignItems:`center`,gap:8},children:[(0,z.jsx)(Re,{value:t,onChange:n,compact:e,accent:`#a8cf3a`,onAccent:`#111`}),(0,z.jsx)(i,{variant:`caption`,children:e?`one button`:`three buttons`})]})}function at(){let[e,t]=(0,R.useState)(0),n=(0,R.useMemo)(()=>ft[e]?.[1]??null,[e]),{items:r,loading:a}=et(dt,n),[o,c]=(0,R.useState)(`grid`);return(0,z.jsxs)(s,{style:{width:390,height:620,backgroundColor:`#0f1110`,borderRadius:28,overflow:`hidden`},children:[(0,z.jsxs)(s,{style:{padding:14,gap:10},children:[(0,z.jsx)(s,{style:{flexDirection:`row`,flexWrap:`wrap`,gap:6},children:ft.map(([n],r)=>(0,z.jsx)(p,{onPress:()=>t(r),style:{paddingHorizontal:10,paddingVertical:6,borderRadius:999,backgroundColor:r===e?`#a8cf3a`:`rgba(255,255,255,0.10)`},children:(0,z.jsx)(i,{variant:`caption`,style:{color:r===e?`#111`:`#fff`},children:n})},n))}),(0,z.jsxs)(s,{style:{flexDirection:`row`,alignItems:`center`,justifyContent:`space-between`},children:[(0,z.jsx)(i,{variant:`caption`,children:a?`Reading…`:`${r.length} files`}),(0,z.jsx)(Re,{value:o,onChange:c,accent:`#a8cf3a`,onAccent:`#111`,size:28})]})]}),(0,z.jsx)($e,{items:r,mode:o})]})}var R,z,ot,B,V,H,U,st,W,G,K,q,J,Y,X,ct,Z,lt,Q,ut,dt,ft,$,pt;function mt(){return(mt=e((()=>{R=t(n()),m(),r(),oe(),me(),fe(),pe(),le(),ne(),y(),Le(),Qe(),w(),nt(),We(),ze(),S(),z=d(),{fn:ot}=__STORYBOOK_MODULE_TEST__,B=ie({kind:`paused`,percent:61}),V=(e,t=!1)=>({direction:`up`,percent:e,done:t}),H=(e,t=!1)=>({direction:`down`,percent:e,done:t}),U=[L({id:`a`,name:`Harbour at dusk.mp4`,kind:`video`,thumbnail:ce,detail:`1.2 GB`},H(37)),L({id:`b`,name:`Ridge photo.jpg`,kind:`image`,thumbnail:de,detail:`4.1 MB`},V(12)),L({id:`c`,name:`Ember (album).m4a`,kind:`audio`,thumbnail:he,detail:`9.8 MB`},V(100,!0)),L({id:`d`,name:`Lease agreement 2026 signed copy.pdf`,kind:`document`,detail:`310 KB`},H(100,!0)),L({id:`e`,name:`Interview take 3.mov`,kind:`video`,detail:`842 MB`},H(4)),L({id:`f`,name:`Harbour.jpg`,kind:`image`,thumbnail:ue,detail:`2.6 MB`},H(100,!0)),L({id:`g`,name:`Family photos`,kind:`folder`,detail:`12 files`},V(100,!0)),L({id:`h`,name:`Test tone.m4a`,kind:`audio`,detail:`120 KB`},H(88)),{id:`i`,name:`backup-2026-11.zip`,kind:`file`,status:B.label,shortStatus:B.shortLabel,tone:B.tone,bar:B.bar,download:.61,detail:`3.4 GB`},L({id:`j`,name:`Notes.txt`,kind:`document`,detail:`2 KB`},H(100,!0)),{id:`k`,name:`Old share.mp4`,kind:`video`,status:`Off`,dim:!0,detail:`75 MB`},L({id:`l`,name:`Dawn.png`,kind:`image`,thumbnail:de,detail:`6.0 MB`},V(64))],st={title:`Components/FileViews`,component:rt,parameters:{layout:`centered`,docs:{description:{component:`The same files shown three ways: a tight **list** (like a folder in Finder), the roomy **expanded** list, and a **grid** of five across. One switcher chooses; every view draws from the same file record, so nothing is lost by switching. A file that is still arriving has a **pie** over its picture; an upload says how far it is in its status line ("Uploading 12%", then "Sharing").`}}},argTypes:{mode:{control:`inline-radio`,options:[`list`,`expanded`,`grid`]},columns:{control:{type:`number`,min:2,max:8},description:`Pictures across in the grid.`},compact:{control:`boolean`,description:`One button that steps through the views.`},menu:{control:`boolean`,description:`One button that drops a list of the views.`},width:{control:{type:`number`,min:320,max:820}},height:{control:{type:`number`,min:480,max:960}}},args:{mode:`expanded`,columns:5,compact:!1,menu:!1,width:390,height:760,onOpen:ot(),onMore:ot()}},W={},G={args:{mode:`list`}},K={args:{mode:`expanded`}},q={args:{mode:`grid`}},J={args:{mode:`expanded`,menu:!0}},Y={args:{mode:`grid`,compact:!0}},X={parameters:{layout:`padded`},render:()=>(0,z.jsxs)(se,{children:[(0,z.jsx)(x,{title:`The three views, at the sizes they are used`,className:`gap-8`,children:[16,20,24,32,48].map(e=>(0,z.jsxs)(s,{style:{alignItems:`center`,gap:8},children:[(0,z.jsxs)(s,{style:{flexDirection:`row`,gap:e*.6,alignItems:`center`},children:[(0,z.jsx)(C,{name:`view-list`,size:e}),(0,z.jsx)(C,{name:`view-expanded`,size:e}),(0,z.jsx)(C,{name:`view-grid`,size:e})]}),(0,z.jsxs)(i,{variant:`caption`,children:[e,` pt`]})]},e))}),(0,z.jsxs)(x,{title:`The switcher`,className:`gap-8`,children:[(0,z.jsx)(it,{}),(0,z.jsx)(it,{compact:!0})]}),(0,z.jsx)(x,{title:`Every file view icon`,className:`gap-5`,children:Pe.map(e=>(0,z.jsxs)(s,{style:{width:96,alignItems:`center`,gap:8},children:[(0,z.jsx)(C,{name:e,size:32}),(0,z.jsx)(i,{variant:`caption`,children:e})]},e))}),(0,z.jsx)(x,{title:`Player icons redrawn in this round`,className:`gap-8`,children:[`speed`,`turn-auto`].map(e=>(0,z.jsxs)(s,{style:{alignItems:`center`,gap:8},children:[(0,z.jsxs)(s,{style:{flexDirection:`row`,gap:18,alignItems:`center`},children:[(0,z.jsx)(v,{name:e,size:20}),(0,z.jsx)(v,{name:e,size:32}),(0,z.jsx)(v,{name:e,size:64})]}),(0,z.jsx)(i,{variant:`caption`,children:e===`speed`?`speed (the rabbit, in profile)`:`turn-auto (even arrow head)`})]},e))})]})},ct=[0,12,37,62,88],Z={parameters:{layout:`padded`},render:()=>(0,z.jsxs)(se,{children:[[[`Grid tile`,66],[`Expanded row`,48],[`List line`,24]].map(([e,t])=>(0,z.jsxs)(x,{title:`${e} (${t} pt)`,className:`gap-5`,children:[ct.map(e=>(0,z.jsxs)(s,{style:{alignItems:`center`,gap:6},children:[(0,z.jsx)(j,{item:{id:String(e),name:`a.jpg`,kind:`image`,thumbnail:ue,download:e/100},size:t}),(0,z.jsxs)(i,{variant:`caption`,children:[e,`%`]})]},e)),(0,z.jsxs)(s,{style:{alignItems:`center`,gap:6},children:[(0,z.jsx)(j,{item:{id:`x`,name:`a.mov`,kind:`video`,download:.5},size:t}),(0,z.jsx)(i,{variant:`caption`,children:`no picture`})]}),(0,z.jsxs)(s,{style:{alignItems:`center`,gap:6},children:[(0,z.jsx)(j,{item:{id:`y`,name:`a.jpg`,kind:`image`,thumbnail:ue},size:t}),(0,z.jsx)(i,{variant:`caption`,children:`arrived`})]})]},e)),(0,z.jsx)(x,{title:`By itself, over anything an app draws`,children:(0,z.jsx)(s,{style:{width:120,height:120,borderRadius:24,backgroundColor:`#35508a`},children:(0,z.jsx)(Fe,{fraction:.7,size:120,radius:24})})})]})},lt=[[`Giving a file, 12% sent`,V(12)],[`Giving a file, all of it sent`,V(100,!0)],[`Taking a file, 12% here`,H(12)],[`Taking a file, all of it here`,H(100,!0)],[`Taking a file, size not known yet`,{direction:`down`,percent:null,done:!1}]],Q={parameters:{layout:`padded`},render:()=>(0,z.jsx)(se,{width:460,children:lt.map(([e,t])=>(0,z.jsxs)(s,{style:{flexDirection:`row`,justifyContent:`space-between`,gap:24},children:[(0,z.jsx)(i,{variant:`caption`,children:e}),(0,z.jsx)(i,{children:be(t)})]},e))})},ut={"disk:/Downloads":U.filter(e=>e.download==null).slice(0,6),"hyperdrive:9f3c…e21a":U.slice(0,5),"pearcore:space-family":U.slice(5,10)},dt={list:e=>new Promise(t=>{let n=e.from===`disk`?`disk:${e.folder}`:`${e.network}:${e.key}`;setTimeout(()=>t(ut[n]??[]),350)})},ft=[[`A folder on this device`,{from:`disk`,folder:`/Downloads`}],[`A Hyperdrive key`,{from:`key`,key:`9f3c…e21a`,network:`hyperdrive`}],[`A pearcore space`,{from:`key`,key:`space-family`,network:`pearcore`}]],$={render:()=>(0,z.jsx)(at,{})},pt=[`Playground`,`List`,`Expanded`,`Grid`,`DropDown`,`OneButton`,`Icons`,`DownloadingPie`,`StatusWording`,`FromAPlace`],W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{}`,...W.parameters?.docs?.source},description:{story:`Press the three icons at the top right to change the view.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'list'
  }
}`,...G.parameters?.docs?.source},description:{story:`One tight line for each file: a small picture, the name, the state.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'expanded'
  }
}`,...K.parameters?.docs?.source},description:{story:`The roomy list. PearDrop keeps its own row here; this is the row other apps start from.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'grid'
  }
}`,...q.parameters?.docs?.source},description:{story:`Five across, with the name and the state in two small lines under each picture.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'expanded',
    menu: true
  }
}`,...J.parameters?.docs?.source},description:{story:`One button for a toolbar that needs its width: press it and the views drop down in a short list. PearDrop uses this.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'grid',
    compact: true
  }
}`,...Y.parameters?.docs?.source},description:{story:`Where a toolbar has no room for three buttons: one, which steps to the next view.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <Column>
      <Showcase title="The three views, at the sizes they are used" className="gap-8">
        {([16, 20, 24, 32, 48] as const).map(size => <View key={size} style={{
        alignItems: 'center',
        gap: 8
      }}>
            <View style={{
          flexDirection: 'row',
          gap: size * 0.6,
          alignItems: 'center'
        }}>
              <FileViewIcon name="view-list" size={size} />
              <FileViewIcon name="view-expanded" size={size} />
              <FileViewIcon name="view-grid" size={size} />
            </View>
            <Text variant="caption">{size} pt</Text>
          </View>)}
      </Showcase>
      <Showcase title="The switcher" className="gap-8">
        <SwitcherDemo />
        <SwitcherDemo compact />
      </Showcase>
      <Showcase title="Every file view icon" className="gap-5">
        {fileViewIconNames.map(name => <View key={name} style={{
        width: 96,
        alignItems: 'center',
        gap: 8
      }}>
            <FileViewIcon name={name} size={32} />
            <Text variant="caption">{name}</Text>
          </View>)}
      </Showcase>
      <Showcase title="Player icons redrawn in this round" className="gap-8">
        {(['speed', 'turn-auto'] as const).map(name => <View key={name} style={{
        alignItems: 'center',
        gap: 8
      }}>
            <View style={{
          flexDirection: 'row',
          gap: 18,
          alignItems: 'center'
        }}>
              <PlayerIcon name={name} size={20} />
              <PlayerIcon name={name} size={32} />
              <PlayerIcon name={name} size={64} />
            </View>
            <Text variant="caption">
              {name === 'speed' ? 'speed (the rabbit, in profile)' : 'turn-auto (even arrow head)'}
            </Text>
          </View>)}
      </Showcase>
    </Column>
}`,...X.parameters?.docs?.source},description:{story:`The icons of the views, the icons that stand in for a file with no picture, and the two player icons redrawn with them.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <Column>
      {([['Grid tile', 66], ['Expanded row', 48], ['List line', 24]] as const).map(([title, size]) => <Showcase key={title} title={\`\${title} (\${size} pt)\`} className="gap-5">
          {PIE_STEPS.map(percent => <View key={percent} style={{
        alignItems: 'center',
        gap: 6
      }}>
              <FileThumb item={{
          id: String(percent),
          name: 'a.jpg',
          kind: 'image',
          thumbnail: photoHarbor,
          download: percent / 100
        }} size={size} />
              <Text variant="caption">{percent}%</Text>
            </View>)}
          <View style={{
        alignItems: 'center',
        gap: 6
      }}>
            <FileThumb item={{
          id: 'x',
          name: 'a.mov',
          kind: 'video',
          download: 0.5
        }} size={size} />
            <Text variant="caption">no picture</Text>
          </View>
          <View style={{
        alignItems: 'center',
        gap: 6
      }}>
            <FileThumb item={{
          id: 'y',
          name: 'a.jpg',
          kind: 'image',
          thumbnail: photoHarbor
        }} size={size} />
            <Text variant="caption">arrived</Text>
          </View>
        </Showcase>)}
      <Showcase title="By itself, over anything an app draws">
        <View style={{
        width: 120,
        height: 120,
        borderRadius: 24,
        backgroundColor: '#35508a'
      }}>
          <DownloadPie fraction={0.7} size={120} radius={24} />
        </View>
      </Showcase>
    </Column>
}`,...Z.parameters?.docs?.source},description:{story:`The pie over a file that is arriving, at the sizes of the three views. An upload never has one.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <Column width={460}>
      {WORDING.map(([what, reading]) => <View key={what} style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 24
    }}>
          <Text variant="caption">{what}</Text>
          <Text>{transferStatus(reading)}</Text>
        </View>)}
    </Column>
}`,...Q.parameters?.docs?.source},description:{story:`The status line is one state at a time, never a chain of them.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => <FromAPlaceDemo />
}`,...$.parameters?.docs?.source},description:{story:"The views do not care where files come from. An app writes one reader for each kind of place\n(a folder, a Hyperdrive key, a pearcore space) and `useFileItems` keeps the list current.",...$.parameters?.docs?.description}}}})))()}mt();export{Z as DownloadingPie,J as DropDown,K as Expanded,$ as FromAPlace,q as Grid,X as Icons,G as List,Y as OneButton,W as Playground,Q as StatusWording,pt as __namedExportsOrder,st as default};