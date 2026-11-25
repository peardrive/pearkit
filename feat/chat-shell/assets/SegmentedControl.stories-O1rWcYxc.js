import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{a as n,u as r,z as i}from"./iframe-DCe4DXPm.js";import{n as a,t as o}from"./SegmentedControl-B6ZwJWUo.js";import{i as s,n as c,t as l}from"./helpers-zAnan5Dk.js";function u(e){let[t,n]=(0,d.useState)(e.value);return(0,f.jsx)(o,{...e,value:t,onChange:t=>{n(t),e.onChange?.(t)}})}var d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{d=t(),r(),a(),s(),f=n(),{fn:p}=__STORYBOOK_MODULE_TEST__,m=[{value:`bubbles`,label:`Bubbles`},{value:`flat`,label:`Flat rows`}],h=[{value:`list`,icon:`menu`,accessibilityLabel:`List`},{value:`grid`,icon:`grid-1`,accessibilityLabel:`Grid`},{value:`folders`,icon:`folder`,accessibilityLabel:`Folders`}],g={title:`Components/SegmentedControl`,component:o,parameters:{docs:{description:{component:"One choice among a few, side by side in a pill: the chosen segment is raised on a pane-coloured tile. Segments take a label, an icon or both. `fullWidth` stretches it across a row. The exclusive sibling of `Chip`."}}},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]}},args:{options:[...m,{value:`compact`,label:`Compact`,icon:`sidebar-left`}],value:`bubbles`,size:`md`,fullWidth:!1,onChange:p()}},_={render:e=>(0,f.jsx)(u,{...e})},v={render:()=>(0,f.jsxs)(l,{width:360,children:[(0,f.jsxs)(c,{title:`Sizes`,children:[(0,f.jsx)(u,{options:m,value:`bubbles`,size:`sm`}),(0,f.jsx)(u,{options:m,value:`flat`,size:`md`})]}),(0,f.jsxs)(c,{title:`Icons only`,children:[(0,f.jsx)(u,{options:h,value:`list`,size:`sm`,accessibilityLabel:`View`}),(0,f.jsx)(u,{options:h,value:`grid`,accessibilityLabel:`View`})]}),(0,f.jsx)(c,{title:`Icon and label`,children:(0,f.jsx)(u,{options:[{value:`all`,label:`All`,icon:`grid-1`},{value:`mine`,label:`Mine`,icon:`people`},{value:`starred`,label:`Starred`,icon:`star`}],value:`all`})}),(0,f.jsx)(c,{title:`Full width, one disabled`,children:(0,f.jsx)(i,{className:`w-full`,children:(0,f.jsx)(u,{fullWidth:!0,options:[{value:`day`,label:`Day`},{value:`week`,label:`Week`},{value:`month`,label:`Month`,disabled:!0}],value:`week`})})}),(0,f.jsx)(c,{title:`Disabled`,children:(0,f.jsx)(u,{options:m,value:`bubbles`,disabled:!0})})]})},y=[`Playground`,`Variants`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Live {...args} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Column width={360}>
      <Showcase title="Sizes">
        <Live options={LOOKS} value="bubbles" size="sm" />
        <Live options={LOOKS} value="flat" size="md" />
      </Showcase>
      <Showcase title="Icons only">
        <Live options={VIEWS} value="list" size="sm" accessibilityLabel="View" />
        <Live options={VIEWS} value="grid" accessibilityLabel="View" />
      </Showcase>
      <Showcase title="Icon and label">
        <Live options={[{
        value: 'all',
        label: 'All',
        icon: 'grid-1'
      }, {
        value: 'mine',
        label: 'Mine',
        icon: 'people'
      }, {
        value: 'starred',
        label: 'Starred',
        icon: 'star'
      }]} value="all" />
      </Showcase>
      <Showcase title="Full width, one disabled">
        <View className="w-full">
          <Live fullWidth options={[{
          value: 'day',
          label: 'Day'
        }, {
          value: 'week',
          label: 'Week'
        }, {
          value: 'month',
          label: 'Month',
          disabled: true
        }]} value="week" />
        </View>
      </Showcase>
      <Showcase title="Disabled">
        <Live options={LOOKS} value="bubbles" disabled />
      </Showcase>
    </Column>
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as Playground,v as Variants,y as __namedExportsOrder,g as default};