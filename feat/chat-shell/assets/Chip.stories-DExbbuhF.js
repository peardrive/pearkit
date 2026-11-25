import{n as e,o as t}from"./rolldown-runtime-BCiCTKAo.js";import{t as n}from"./react-BWPDF9mI.js";import{a as r,u as i,z as a}from"./iframe-DCe4DXPm.js";import{n as o,t as s}from"./Chip-CKaQ7Je5.js";import{i as c,n as l}from"./helpers-zAnan5Dk.js";var u,d,f,p,m,h,g;function _(){return(_=e((()=>{u=t(n()),i(),o(),c(),d=r(),f={title:`Components/Chip`,component:s,parameters:{docs:{description:{component:"A small token for a tag or an active filter: press to toggle, ✕ to remove. The independent sibling of `SegmentedControl` — chips don't exclude each other, so they fit tag lists, filter bars and token inputs."}}},argTypes:{tone:{control:`select`,options:[`primary`,`accent`,`info`,`success`,`warning`,`danger`,`neutral`]},size:{control:`inline-radio`,options:[`sm`,`md`]},icon:{control:`select`,options:[void 0,`star`,`filter`,`video`,`image`,`music`,`clock`]}},args:{label:`sunset`,size:`md`,tone:`primary`}},p={args:{selected:!0,count:412,onPress:()=>{},onRemove:()=>{}}},m={render:()=>(0,d.jsxs)(a,{className:`gap-6`,children:[(0,d.jsxs)(l,{title:`Tags on a result (static, with counts)`,children:[(0,d.jsx)(s,{label:`sunset`,count:412}),(0,d.jsx)(s,{label:`harbor`,count:38}),(0,d.jsx)(s,{label:`wide shot`,count:7,size:`sm`}),(0,d.jsx)(s,{label:`golden hour`,size:`sm`})]}),(0,d.jsxs)(l,{title:`Pressable, selected tints`,children:[(0,d.jsx)(s,{label:`videos`,icon:`video`,selected:!0,onPress:()=>{}}),(0,d.jsx)(s,{label:`pictures`,icon:`image`,selected:!0,tone:`accent`,onPress:()=>{}}),(0,d.jsx)(s,{label:`music`,icon:`music`,selected:!0,tone:`info`,onPress:()=>{}}),(0,d.jsx)(s,{label:`favorites`,icon:`star`,onPress:()=>{}})]}),(0,d.jsxs)(l,{title:`Removable (active filters)`,children:[(0,d.jsx)(s,{label:`over 10 min`,onRemove:()=>{}}),(0,d.jsx)(s,{label:`1080p and up`,selected:!0,onRemove:()=>{},onPress:()=>{}}),(0,d.jsx)(s,{label:`this week`,selected:!0,tone:`accent`,size:`sm`,onRemove:()=>{},onPress:()=>{}})]}),(0,d.jsxs)(l,{title:`Disabled`,children:[(0,d.jsx)(s,{label:`no matches`,disabled:!0,onPress:()=>{}}),(0,d.jsx)(s,{label:`locked`,disabled:!0,selected:!0,onRemove:()=>{}})]})]})},h={render:function(){let e=[`sunset`,`harbor`,`ridge`,`night`,`aerial`,`close up`],[t,n]=u.useState([`sunset`,`night`]),r=e=>n(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,d.jsx)(l,{title:`Filters`,children:e.map(e=>(0,d.jsx)(s,{label:e,selected:t.includes(e),onPress:()=>r(e),onRemove:t.includes(e)?()=>r(e):void 0},e))})}},g=[`Playground`,`Variants`,`FilterBar`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    selected: true,
    count: 412,
    onPress: () => {},
    onRemove: () => {}
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <View className="gap-6">
      <Showcase title="Tags on a result (static, with counts)">
        <Chip label="sunset" count={412} />
        <Chip label="harbor" count={38} />
        <Chip label="wide shot" count={7} size="sm" />
        <Chip label="golden hour" size="sm" />
      </Showcase>
      <Showcase title="Pressable, selected tints">
        <Chip label="videos" icon="video" selected onPress={() => {}} />
        <Chip label="pictures" icon="image" selected tone="accent" onPress={() => {}} />
        <Chip label="music" icon="music" selected tone="info" onPress={() => {}} />
        <Chip label="favorites" icon="star" onPress={() => {}} />
      </Showcase>
      <Showcase title="Removable (active filters)">
        <Chip label="over 10 min" onRemove={() => {}} />
        <Chip label="1080p and up" selected onRemove={() => {}} onPress={() => {}} />
        <Chip label="this week" selected tone="accent" size="sm" onRemove={() => {}} onPress={() => {}} />
      </Showcase>
      <Showcase title="Disabled">
        <Chip label="no matches" disabled onPress={() => {}} />
        <Chip label="locked" disabled selected onRemove={() => {}} />
      </Showcase>
    </View>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: function FilterBarStory() {
    const all = ['sunset', 'harbor', 'ridge', 'night', 'aerial', 'close up'];
    const [on, setOn] = React.useState<string[]>(['sunset', 'night']);
    const toggle = (t: string) => setOn(v => v.includes(t) ? v.filter(x => x !== t) : [...v, t]);
    return <Showcase title="Filters">
        {all.map(t => <Chip key={t} label={t} selected={on.includes(t)} onPress={() => toggle(t)} onRemove={on.includes(t) ? () => toggle(t) : undefined} />)}
      </Showcase>;
  }
}`,...h.parameters?.docs?.source},description:{story:`A working filter bar: press toggles, ✕ clears.`,...h.parameters?.docs?.description}}}})))()}_();export{h as FilterBar,p as Playground,m as Variants,g as __namedExportsOrder,f as default};