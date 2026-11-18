import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{a as t}from"./iframe-CmcEqaQC.js";import{i as n,o as r}from"./Icon-Dma2Rm9M.js";import{n as i,t as a}from"./IconButton-ZG8QwaRa.js";import{i as o,n as s,t as c}from"./helpers-DlFGh-SZ.js";var l,u,d,f,p,m;function h(){return(h=e((()=>{i(),r(),o(),l=t(),{fn:u}=__STORYBOOK_MODULE_TEST__,d={title:`Components/IconButton`,component:a,parameters:{docs:{description:{component:"Square icon button for headers and toolbars. Pass `tooltip` for a hover label (and screen-reader name), with an optional keyboard shortcut."}}},argTypes:{icon:{control:`select`,options:n},size:{control:`inline-radio`,options:[`xs`,`sm`,`md`,`lg`]},variant:{control:`inline-radio`,options:[`ghost`,`subtle`,`solid`]}},args:{icon:`copy`,size:`md`,variant:`ghost`,tooltip:{label:`Copy link`,shortcut:`⌘C`},onPress:u()}},f={},p={render:()=>(0,l.jsxs)(c,{children:[(0,l.jsxs)(s,{title:`List header (sm · 30px)`,children:[(0,l.jsx)(a,{size:`sm`,icon:`sort`,tooltip:`Sort`}),(0,l.jsx)(a,{size:`sm`,icon:`filter`,tooltip:`Filter`}),(0,l.jsx)(a,{size:`sm`,icon:`more`,tooltip:`More`})]}),(0,l.jsxs)(s,{title:`Toolbar (md · 32px)`,children:[(0,l.jsx)(a,{icon:`star-bold`,tone:`favorite`,tooltip:`Favorite`}),(0,l.jsx)(a,{icon:`copy`,active:!0,tooltip:{label:`Copy link`,shortcut:`⌘C`}}),(0,l.jsx)(a,{icon:`scan-barcode`,tooltip:`Show QR`}),(0,l.jsx)(a,{icon:`folder-open`,tooltip:`Show in Finder`}),(0,l.jsx)(a,{icon:`info-circle`,tone:`primary`,tooltip:`Inspector`})]}),(0,l.jsxs)(s,{title:`Variants`,children:[(0,l.jsx)(a,{icon:`add`,variant:`ghost`,accessibilityLabel:`Add`}),(0,l.jsx)(a,{icon:`add`,variant:`subtle`,accessibilityLabel:`Add`}),(0,l.jsx)(a,{icon:`add`,variant:`solid`,accessibilityLabel:`Add`}),(0,l.jsx)(a,{icon:`add`,variant:`subtle`,disabled:!0,accessibilityLabel:`Add`})]})]})},m=[`Playground`,`Gallery`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Column>
      <Showcase title="List header (sm · 30px)">
        <IconButton size="sm" icon="sort" tooltip="Sort" />
        <IconButton size="sm" icon="filter" tooltip="Filter" />
        <IconButton size="sm" icon="more" tooltip="More" />
      </Showcase>
      <Showcase title="Toolbar (md · 32px)">
        <IconButton icon="star-bold" tone="favorite" tooltip="Favorite" />
        <IconButton icon="copy" active tooltip={{
        label: 'Copy link',
        shortcut: '⌘C'
      }} />
        <IconButton icon="scan-barcode" tooltip="Show QR" />
        <IconButton icon="folder-open" tooltip="Show in Finder" />
        <IconButton icon="info-circle" tone="primary" tooltip="Inspector" />
      </Showcase>
      <Showcase title="Variants">
        <IconButton icon="add" variant="ghost" accessibilityLabel="Add" />
        <IconButton icon="add" variant="subtle" accessibilityLabel="Add" />
        <IconButton icon="add" variant="solid" accessibilityLabel="Add" />
        <IconButton icon="add" variant="subtle" disabled accessibilityLabel="Add" />
      </Showcase>
    </Column>
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as Gallery,f as Playground,m as __namedExportsOrder,d as default};