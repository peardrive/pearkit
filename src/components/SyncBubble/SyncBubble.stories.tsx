import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { SyncBubble, syncStateMeta, type SyncState } from './SyncBubble';
import { Column, Showcase } from '../../stories/helpers';
import { Text } from '../Text/Text';

const meta: Meta<typeof SyncBubble> = {
  title: 'Patterns/SyncBubble',
  component: SyncBubble,
  parameters: {
    docs: {
      description: {
        component:
          'A small pill at the bottom of the screen saying where one item stands with the other device: breathing dot while it waits or sends, glowing dot once it has arrived. Six states (`syncStateMeta`), a label and a quieter detail. `offset` floats it above a composer or a dock.',
      },
    },
  },
  argTypes: { state: { control: 'select', options: Object.keys(syncStateMeta) } },
  args: { state: 'sending', label: 'Sending to the MacBook', detail: '2 of 3 files', onPress: fn() },
};
export default meta;
type Story = StoryObj<typeof SyncBubble>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <Column>
      <Showcase title="A debug note's way to the Mac">
        <View className="gap-3">
          {(Object.keys(syncStateMeta) as SyncState[]).map((s) => (
            <View key={s} className="flex-row items-center gap-3">
              <Text variant="micro" tone="subtle" className="w-14">
                {s}
              </Text>
              <SyncBubble
                state={s}
                label={{ saving: 'Saving the note…', waiting: 'Waiting for the MacBook', sending: 'Sending to the MacBook', synced: 'On the MacBook', offline: 'Saved on this phone', failed: 'Debug note not saved' }[s]}
                detail={{ saving: undefined, waiting: 'open rKeyChat there', sending: '2 of 3 files', synced: '3 files', offline: 'the notes space is down', failed: 'the recording is too large' }[s]}
              />
            </View>
          ))}
        </View>
      </Showcase>
    </Column>
  ),
};

export const Floating: Story = {
  name: 'Floating above a dock',
  render: () => (
    <View className="relative h-[220px] w-[320px] overflow-hidden rounded-card border border-overlay/10 bg-background">
      <View className="absolute inset-x-0 bottom-0 h-14 border-t border-overlay/10 bg-pane/95" />
      <SyncBubble state="synced" label="On the MacBook" detail="3 files" offset={64} />
    </View>
  ),
};
