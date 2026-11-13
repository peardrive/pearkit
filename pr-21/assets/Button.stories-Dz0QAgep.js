import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{N as t,a as n,u as r}from"./iframe-CmcEqaQC.js";import{i,o as a}from"./Icon-Dma2Rm9M.js";import{n as o,t as s}from"./Button-Ha-yBppa.js";import{i as c,n as l,t as u}from"./helpers-DlFGh-SZ.js";var d,f,p,m,h,g,_;function v(){return(v=e((()=>{r(),o(),a(),c(),d=n(),{fn:f}=__STORYBOOK_MODULE_TEST__,p={title:`Components/Button`,component:s,parameters:{docs:{description:{component:"Text button with optional leading/trailing icons. Variants come straight from the PearDrop design: **primary** (Send, Copy Link), **secondary** (Receive, Save QR), **subtle** (Pause all transfers), **ghost** and **danger** (Stop sharing). Omit `label` for a square icon-only button."}}},argTypes:{variant:{control:`inline-radio`,options:[`primary`,`secondary`,`subtle`,`ghost`,`danger`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},icon:{control:`select`,options:[void 0,...i]},iconRight:{control:`select`,options:[void 0,...i]}},args:{label:`Send`,variant:`primary`,size:`lg`,icon:`arrow-up`,glow:!0,onPress:f()}},m={},h={render:()=>(0,d.jsxs)(u,{children:[(0,d.jsxs)(l,{title:`Variants`,children:[(0,d.jsx)(s,{variant:`primary`,icon:`arrow-up`,label:`Send`,glow:!0,size:`lg`}),(0,d.jsx)(s,{variant:`secondary`,icon:`arrow-down`,label:`Receive`,size:`lg`}),(0,d.jsx)(s,{variant:`subtle`,icon:`pause`,label:`Pause all transfers`,size:`sm`}),(0,d.jsx)(s,{variant:`ghost`,icon:`more`,label:`More`}),(0,d.jsx)(s,{variant:`danger`,icon:`stop-circle`,label:`Stop sharing`})]}),(0,d.jsxs)(l,{title:`Sizes`,children:[(0,d.jsx)(s,{variant:`primary`,size:`sm`,icon:`copy`,label:`Small`}),(0,d.jsx)(s,{variant:`primary`,size:`md`,icon:`copy`,label:`Medium`}),(0,d.jsx)(s,{variant:`primary`,size:`lg`,icon:`copy`,label:`Large`})]}),(0,d.jsxs)(l,{title:`Icon only`,children:[(0,d.jsx)(s,{variant:`primary`,size:`lg`,icon:`arrow-up`,accessibilityLabel:`Send`}),(0,d.jsx)(s,{variant:`secondary`,size:`lg`,icon:`arrow-down`,accessibilityLabel:`Receive`}),(0,d.jsx)(s,{variant:`subtle`,size:`md`,icon:`add`,accessibilityLabel:`Add`})]}),(0,d.jsxs)(l,{title:`States`,children:[(0,d.jsx)(s,{variant:`primary`,label:`Disabled`,disabled:!0}),(0,d.jsx)(s,{variant:`secondary`,label:`Loading`,loading:!0}),(0,d.jsx)(s,{variant:`secondary`,label:`Trailing icon`,iconRight:`chevron-right`})]})]})},g={name:`Filling a row`,render:()=>(0,d.jsxs)(t,{className:`w-[212px] flex-row gap-2`,children:[(0,d.jsx)(s,{variant:`primary`,size:`lg`,glow:!0,fill:!0,icon:`arrow-up`,label:`Send`}),(0,d.jsx)(s,{variant:`secondary`,size:`lg`,fill:!0,icon:`arrow-down`,label:`Receive`})]})},_=[`Playground`,`Variants`,`FillRow`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="Variants">
        <Button variant="primary" icon="arrow-up" label="Send" glow size="lg" />
        <Button variant="secondary" icon="arrow-down" label="Receive" size="lg" />
        <Button variant="subtle" icon="pause" label="Pause all transfers" size="sm" />
        <Button variant="ghost" icon="more" label="More" />
        <Button variant="danger" icon="stop-circle" label="Stop sharing" />
      </Showcase>
      <Showcase title="Sizes">
        <Button variant="primary" size="sm" icon="copy" label="Small" />
        <Button variant="primary" size="md" icon="copy" label="Medium" />
        <Button variant="primary" size="lg" icon="copy" label="Large" />
      </Showcase>
      <Showcase title="Icon only">
        <Button variant="primary" size="lg" icon="arrow-up" accessibilityLabel="Send" />
        <Button variant="secondary" size="lg" icon="arrow-down" accessibilityLabel="Receive" />
        <Button variant="subtle" size="md" icon="add" accessibilityLabel="Add" />
      </Showcase>
      <Showcase title="States">
        <Button variant="primary" label="Disabled" disabled />
        <Button variant="secondary" label="Loading" loading />
        <Button variant="secondary" label="Trailing icon" iconRight="chevron-right" />
      </Showcase>
    </Column>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Filling a row',
  render: () => <View className="w-[212px] flex-row gap-2">
      <Button variant="primary" size="lg" glow fill icon="arrow-up" label="Send" />
      <Button variant="secondary" size="lg" fill icon="arrow-down" label="Receive" />
    </View>
}`,...g.parameters?.docs?.source},description:{story:"`fill` splits a row evenly — the sidebar's Send / Receive pair and the share-link actions.",...g.parameters?.docs?.description}}}})))()}v();export{g as FillRow,m as Playground,h as Variants,_ as __namedExportsOrder,p as default};