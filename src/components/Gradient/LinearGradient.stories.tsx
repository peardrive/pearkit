import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { LinearGradient, RadialGlow } from './LinearGradient';
import { Text } from '../Text/Text';

const meta: Meta<typeof LinearGradient> = {
  title: 'Components/Gradient',
  component: LinearGradient,
  parameters: { docs: { description: { component: 'SVG-based gradients that render the same on native and web. `LinearGradient` paints the sidebar and progress bars; `RadialGlow` the soft corner light in the detail pane.' } } },
  argTypes: { direction: { control: 'select', options: ['to-right', 'to-left', 'to-bottom', 'to-top', 'to-bottom-right', 'to-top-right'] } },
  args: { colors: ['#fbbf24', '#a6ce39'], direction: 'to-right', radius: 14 },
};
export default meta;
export const Linear: StoryObj<typeof LinearGradient> = {
  render: (args) => <View style={{ width: 320, height: 120 }}><LinearGradient {...args} /></View>,
};
export const Glow: StoryObj<typeof RadialGlow> = {
  render: () => (
    <View className="overflow-hidden rounded-card border border-overlay/[0.06] bg-background p-6" style={{ width: 420, height: 260 }}>
      <RadialGlow color="#a6ce39" intensity={0.12} />
      <Text variant="title">Detail pane glow</Text>
    </View>
  ),
};
