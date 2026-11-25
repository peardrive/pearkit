import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{a as t,u as n,z as r}from"./iframe-DCe4DXPm.js";import{n as i,t as a}from"./MarkdownText-Cj_m3ILG.js";import{i as o,n as s,t as c}from"./helpers-zAnan5Dk.js";var l,u,d,f,p,m;function h(){return(h=e((()=>{n(),i(),o(),l=t(),{fn:u}=__STORYBOOK_MODULE_TEST__,d={title:`Components/MarkdownText`,component:a,parameters:{docs:{description:{component:"Markdown as nested `Text` and `View`, with no dependency: paragraphs, headings (`#`..`###`), **bold**, *italic*, `code`, fenced code, `-` / `1.` lists, `>` quotes, links and rules — what a chat message or an agent's answer needs. The parser is pure (`parseMarkdown`, `parseInline`, `plainText`) and tested on its own."}}},argTypes:{variant:{control:`inline-radio`,options:[`body`,`body-sm`]}},args:{text:`## Where to cut

Two places. The second **"so, anyway"** at 0:41 restarts the thought, and the aside about the microphone at *1:12* never pays off.

1. Cut 0:41 to 0:47
2. Cut 1:12 to 1:33
3. Keep the laugh at 0:52

> It is the only place the open breathes.

To apply it from the terminal, run \`pearcast cut --from 0:41 --to 0:47\`, or:

\`\`\`sh
pearcast cut --from 0:41 --to 0:47
pearcast cut --from 1:12 --to 1:33
\`\`\`

---

More in [the editing guide](https://peardrive.com/docs/editing). Nothing is changed until you say so.`,variant:`body`,onLinkPress:u()},decorators:[e=>(0,l.jsx)(r,{style:{width:460},children:(0,l.jsx)(e,{})})]},f={},p={render:()=>(0,l.jsxs)(c,{width:460,children:[(0,l.jsx)(s,{title:`Inline marks`,children:(0,l.jsx)(a,{text:"Plain, **bold**, *italic*, ***both***, `code`, [a link](https://peardrive.com) and \\*escaped\\*. A snake_case_name is left alone.",onLinkPress:u()})}),(0,l.jsx)(s,{title:`Headings`,children:(0,l.jsx)(a,{text:`# Title
## Section
### Point`})}),(0,l.jsx)(s,{title:`Lists and quotes`,children:(0,l.jsx)(a,{text:`- one
- two with \`code\`
  and a second line

3. three
4. four

> A quote,
> over two lines.`})}),(0,l.jsx)(s,{title:`Code block`,children:(0,l.jsx)(a,{text:"```ts\nconst answer = parseMarkdown(text);\nrender(answer); // nested Text\n```"})}),(0,l.jsx)(s,{title:`Small, in a sidebar`,children:(0,l.jsx)(r,{style:{width:300},children:(0,l.jsx)(a,{variant:`body-sm`,text:`**Button** is a pressable row: an icon, a label, an icon on the right.

- primary, secondary, ghost, danger
- two heights

The label never wraps; see \`Button.tsx\`.`})})}),(0,l.jsx)(s,{title:`In a bubble`,children:(0,l.jsx)(r,{className:`max-w-[86%] rounded-[16px] border border-overlay/[0.16] bg-overlay/[0.09] px-3.5 py-2`,children:(0,l.jsx)(a,{text:`Three directions, from **smallest** to largest:

1. Softer press
2. Taller small size
3. Quiet secondary`})})})]})},m=[`Playground`,`Variants`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Column width={460}>
      <Showcase title="Inline marks">
        <MarkdownText text={'Plain, **bold**, *italic*, ***both***, \`code\`, [a link](https://peardrive.com) and \\\\*escaped\\\\*. A snake_case_name is left alone.'} onLinkPress={fn()} />
      </Showcase>
      <Showcase title="Headings">
        <MarkdownText text={'# Title\\n## Section\\n### Point'} />
      </Showcase>
      <Showcase title="Lists and quotes">
        <MarkdownText text={'- one\\n- two with \`code\`\\n  and a second line\\n\\n3. three\\n4. four\\n\\n> A quote,\\n> over two lines.'} />
      </Showcase>
      <Showcase title="Code block">
        <MarkdownText text={'\`\`\`ts\\nconst answer = parseMarkdown(text);\\nrender(answer); // nested Text\\n\`\`\`'} />
      </Showcase>
      <Showcase title="Small, in a sidebar">
        <View style={{
        width: 300
      }}>
          <MarkdownText variant="body-sm" text={'**Button** is a pressable row: an icon, a label, an icon on the right.\\n\\n- primary, secondary, ghost, danger\\n- two heights\\n\\nThe label never wraps; see \`Button.tsx\`.'} />
        </View>
      </Showcase>
      <Showcase title="In a bubble">
        <View className="max-w-[86%] rounded-[16px] border border-overlay/[0.16] bg-overlay/[0.09] px-3.5 py-2">
          <MarkdownText text={'Three directions, from **smallest** to largest:\\n\\n1. Softer press\\n2. Taller small size\\n3. Quiet secondary'} />
        </View>
      </Showcase>
    </Column>
}`,...p.parameters?.docs?.source}}}})))()}h();export{f as Playground,p as Variants,m as __namedExportsOrder,d as default};