import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{N as t,a as n,u as r}from"./iframe-CmcEqaQC.js";import{n as i,t as a}from"./PearDropDesktop-DlNahvOa.js";var o,s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{r(),i(),o=n(),s={title:`Layouts/PearDrop Desktop`,component:a,parameters:{layout:`fullscreen`,docs:{description:{component:"The full PearDrop desktop screen, built only from pearkit components: `Sidebar` (resizable, collapsible), `PaneHeader`, `SearchField`, `ShareRow`, `Toolbar`, `FileHeader`, `TransferCard`, `ShareLinkCard`, `KeyValueList` and `DangerZone`. Everything is interactive — filter from the sidebar, search, select rows, drag the sidebar edge, collapse it with the toggle."}}},decorators:[e=>(0,o.jsx)(t,{className:`flex-1 items-center justify-center p-8`,children:(0,o.jsx)(t,{style:{width:1180,maxWidth:`100%`},children:(0,o.jsx)(e,{})})})],args:{framed:!0,resizable:!0,initialSelectedId:`photo_2`}},c={args:{showTooltip:!0}},l={name:`Resizable sidebar`,args:{resizable:!0}},u={name:`Collapsed sidebar`,args:{defaultCollapsed:!0}},d={name:`Completed share`,args:{initialSelectedId:`photo`}},f={name:`No selection`,args:{initialSelectedId:null}},p={args:{empty:!0}},m={globals:{theme:`light`}},h={name:`Custom theme (Blueberry)`,globals:{theme:`blueberry`}},g=[`Default`,`ResizableSidebar`,`CollapsedSidebar`,`CompletedShare`,`NoSelection`,`Empty`,`Light`,`CustomTheme`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    showTooltip: true
  }
}`,...c.parameters?.docs?.source},description:{story:`Matches the Figma frame, including the “Copy link” tooltip.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Resizable sidebar',
  args: {
    resizable: true
  }
}`,...l.parameters?.docs?.source},description:{story:`Drag the sidebar's right edge (or focus it and use ←/→). Drag far left to collapse; double-click to reset.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Collapsed sidebar',
  args: {
    defaultCollapsed: true
  }
}`,...u.parameters?.docs?.source},description:{story:`Collapsed icon rail — items keep their tooltips, the network card shrinks to a status dot.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Completed share',
  args: {
    initialSelectedId: 'photo'
  }
}`,...d.parameters?.docs?.source},description:{story:`A finished share: no transfer card, completed status.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'No selection',
  args: {
    initialSelectedId: null
  }
}`,...f.parameters?.docs?.source},description:{story:`Nothing selected in the list.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    empty: true
  }
}`,...p.parameters?.docs?.source},description:{story:`First run: no shares yet.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'light'
  }
}`,...m.parameters?.docs?.source},description:{story:`Same screen in the light theme (toolbar theme switch works for every story).`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Custom theme (Blueberry)',
  globals: {
    theme: 'blueberry'
  }
}`,...h.parameters?.docs?.source},description:{story:"Same screen with a custom theme created with `createTheme()`.",...h.parameters?.docs?.description}}}})))()}_();export{u as CollapsedSidebar,d as CompletedShare,h as CustomTheme,c as Default,p as Empty,m as Light,f as NoSelection,l as ResizableSidebar,g as __namedExportsOrder,s as default};