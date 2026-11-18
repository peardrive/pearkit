import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { MarkdownText } from './MarkdownText';
import { Column, Showcase } from '../../stories/helpers';

const ANSWER = `## Where to cut

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

More in [the editing guide](https://peardrive.com/docs/editing). Nothing is changed until you say so.`;

const meta: Meta<typeof MarkdownText> = {
  title: 'Components/MarkdownText',
  component: MarkdownText,
  parameters: {
    docs: {
      description: {
        component:
          'Markdown as nested `Text` and `View`, with no dependency: paragraphs, headings (`#`..`###`), **bold**, *italic*, `code`, fenced code, `-` / `1.` lists, `>` quotes, links and rules — what a chat message or an agent\'s answer needs. The parser is pure (`parseMarkdown`, `parseInline`, `plainText`) and tested on its own.',
      },
    },
  },
  argTypes: { variant: { control: 'inline-radio', options: ['body', 'body-sm'] } },
  args: { text: ANSWER, variant: 'body', onLinkPress: fn() },
  decorators: [(Story) => <View style={{ width: 460 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof MarkdownText>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Column width={460}>
      <Showcase title="Inline marks">
        <MarkdownText text={'Plain, **bold**, *italic*, ***both***, `code`, [a link](https://peardrive.com) and \\*escaped\\*. A snake_case_name is left alone.'} onLinkPress={fn()} />
      </Showcase>
      <Showcase title="Headings">
        <MarkdownText text={'# Title\n## Section\n### Point'} />
      </Showcase>
      <Showcase title="Lists and quotes">
        <MarkdownText text={'- one\n- two with `code`\n  and a second line\n\n3. three\n4. four\n\n> A quote,\n> over two lines.'} />
      </Showcase>
      <Showcase title="Code block">
        <MarkdownText text={'```ts\nconst answer = parseMarkdown(text);\nrender(answer); // nested Text\n```'} />
      </Showcase>
      <Showcase title="Small, in a sidebar">
        <View style={{ width: 300 }}>
          <MarkdownText variant="body-sm" text={'**Button** is a pressable row: an icon, a label, an icon on the right.\n\n- primary, secondary, ghost, danger\n- two heights\n\nThe label never wraps; see `Button.tsx`.'} />
        </View>
      </Showcase>
      <Showcase title="In a bubble">
        <View className="max-w-[86%] rounded-[16px] border border-overlay/[0.16] bg-overlay/[0.09] px-3.5 py-2">
          <MarkdownText text={'Three directions, from **smallest** to largest:\n\n1. Softer press\n2. Taller small size\n3. Quiet secondary'} />
        </View>
      </Showcase>
    </Column>
  ),
};
