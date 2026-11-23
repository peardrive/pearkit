import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { AskFold } from './AskFold';
import { Column } from '../../stories/helpers';

const meta: Meta<typeof AskFold> = {
  title: 'Chat/AskFold',
  component: AskFold,
  parameters: {
    docs: {
      description: {
        component:
          'The permissions an agent asked for during one stretch of work, folded into one line of the conversation. A press opens it to one line per ask with its answer. The open question is never in here: it stands as its AskCard until answered.',
      },
    },
  },
  args: {
    agent: 'pear',
    steps: 8,
    asks: [
      { id: '1', tool: 'Bash', what: 'cd ~/Projects/peardrive && npm test', status: 'allowed', by: 'guy' },
      { id: '2', tool: 'Bash', what: 'ls ~/Projects/peardrive/src', status: 'allowed', by: 'guy' },
      { id: '3', tool: 'Edit', what: 'src/share-row.tsx', status: 'refused', by: 'guy' },
      { id: '4', tool: 'WebFetch', what: 'https://registry.npmjs.org/pearkit', status: 'lapsed' },
    ],
  },
  decorators: [(Story) => <View style={{ width: 380 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof AskFold>;

export const Closed: Story = {};
export const Open: Story = { args: { defaultExpanded: true } };
export const OneAsk: Story = {
  render: (args) => (
    <Column>
      <AskFold {...args} steps={0} asks={[{ id: '1', tool: 'Bash', what: 'npm run release', status: 'allowed', by: 'guy' }]} />
      <AskFold {...args} steps={3} asks={[{ id: '2', tool: 'Bash', what: 'rm -rf dist', status: 'refused', by: 'guy' }]} defaultExpanded />
    </Column>
  ),
};
