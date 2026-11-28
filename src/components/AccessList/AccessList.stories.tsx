import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { AccessList } from './AccessList';

const meta: Meta<typeof AccessList> = {
  title: 'Settings/AccessList',
  component: AccessList,
  parameters: {
    docs: {
      description: {
        component:
          "What something may reach, as a list a person can change: the places it always has, the ones granted (with where each came from and a remove button), a field to add a folder, and what is never opened. rKeyChat's \"Folders this project can see\".",
      },
    },
  },
  args: {
    items: [
      { id: 'self', title: '~/rKeyChat/memo-by-anjou', detail: 'the project folder', fixed: true },
      { id: 'beside', title: '~/rKeyChat', detail: 'beside the project, except its _ folders', fixed: true },
      { id: 'g1', title: '~/Anjou/pearkit', detail: 'allowed from a question, by guy (iphone)' },
      { id: 'g2', title: 'run jq commands', icon: 'tick', detail: 'allowed from a question, by guy (macbook)' },
    ],
    onRemove: fn(),
    onAdd: fn(),
    footnote: 'Never opened, whatever is added: keys (~/.ssh, ~/Anjou/_keys), rKeyChat’s own settings and the _ business folders.',
  },
  decorators: [(Story) => <View style={{ width: 380 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof AccessList>;

export const Playground: Story = {};
export const ReadOnly: Story = { args: { onAdd: undefined, onRemove: undefined, lockHint: "Only the owner's devices can change this" } };
