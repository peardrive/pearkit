import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { AskCard } from './AskCard';
import { Column } from '../../stories/helpers';

const NOW = Date.now();

const meta: Meta<typeof AskCard> = {
  title: 'Chat/AskCard',
  component: AskCard,
  parameters: {
    docs: {
      description: {
        component:
          'An agent asks a person for a permission, in the conversation: the tool and the exact thing it would do, three answers for the people who may give them (allow once, allow for this project with what that would open, refuse), a lock line for everyone else, and the outcome once answered.',
      },
    },
  },
  args: { agent: 'pear', tool: 'Bash', what: 'npm run release', ts: NOW - 20_000, expires: NOW + 9 * 60_000, canAnswer: true, onAnswer: fn() },
  decorators: [(Story) => <View style={{ width: 420 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof AskCard>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <Column>
      <AskCard {...args} />
      <AskCard {...args} tool="Bash" what="sed -n 1,40p ~/Anjou/pearkit/README.md" always="read anything in ~/Anjou/pearkit" expires={NOW + 24 * 3600_000} />
      <AskCard {...args} what="rm -rf dist" always={null} />
      <AskCard {...args} canAnswer={false} />
      <AskCard {...args} tool="Edit" what="src/release.ts" detail={'{\n "file_path": "src/release.ts",\n "old_string": "const DRY = true",\n "new_string": "const DRY = false"\n}'} />
      <AskCard {...args} answer={{ choice: 'allow_once', by: 'guy', device: 'macbook', ts: NOW - 5000 }} />
      <AskCard {...args} always="read anything in ~/Anjou" answer={{ choice: 'allow_always', by: 'guy', device: 'iphone', ts: NOW - 5000 }} />
      <AskCard {...args} answer={{ choice: 'reject_always', by: 'guy', device: 'iphone', ts: NOW - 5000 }} />
      <AskCard {...args} expires={NOW - 1000} />
    </Column>
  ),
};
