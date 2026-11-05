import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { NetworkStatusCard } from './NetworkStatusCard';
import { SidebarSurface } from '../../stories/helpers';

const meta: Meta<typeof NetworkStatusCard> = {
  title: 'Patterns/NetworkStatusCard',
  component: NetworkStatusCard,
  parameters: { docs: { description: { component: 'P2P network summary for the sidebar footer: state dot, peer count, live rates and a pause/resume action. `compact` renders just the dot (with a tooltip) for the collapsed rail.' } } },
  argTypes: { state: { control: 'inline-radio', options: ['connected', 'connecting', 'offline'] } },
  args: { state: 'connected', peers: 3, upload: '1.2 MB/s', download: '3.8 MB/s' },
  decorators: [(Story) => <SidebarSurface><Story /></SidebarSurface>],
};
export default meta;
type Story = StoryObj<typeof NetworkStatusCard>;
export const Playground: Story = {};
export const PauseResume: Story = {
  name: 'Pause / resume',
  render: (args) => {
    const [paused, setPaused] = useState(false);
    return <NetworkStatusCard {...args} paused={paused} onPausedChange={setPaused} upload={paused ? 0 : 1258291} download={paused ? 0 : 3984588} />;
  },
};
export const States: Story = {
  render: () => (
    <View className="gap-3">
      <NetworkStatusCard state="connected" peers={3} upload="1.2 MB/s" download="3.8 MB/s" />
      <NetworkStatusCard state="connecting" peers={0} action={null} />
      <NetworkStatusCard state="offline" action={{ label: 'Reconnect', icon: 'refresh', onPress: fn() }} />
    </View>
  ),
};
export const Compact: Story = { args: { compact: true }, decorators: [(Story) => <View className="w-[52px] items-center"><Story /></View>] };
