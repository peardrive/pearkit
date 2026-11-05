import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { ProgressBar } from './ProgressBar';
import { Text } from '../Text/Text';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { docs: { description: { component: 'Gradient progress track drawn with react-native-svg. `transfer` (amber → pear) is used in list rows, `brand` (green → pear) in the transfer card; `solid` takes any colour token.' } } },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    variant: { control: 'inline-radio', options: ['transfer', 'brand', 'solid'] },
    tone: { control: 'select', options: ['primary', 'success', 'warning', 'danger', 'info', 'accent'] },
    height: { control: { type: 'range', min: 2, max: 12, step: 1 } },
  },
  args: { value: 0.62, variant: 'transfer', height: 4 },
  decorators: [(Story) => <View style={{ width: 320 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <View className="gap-4">
      {([
        ['transfer · 4px', { variant: 'transfer', value: 0.54, height: 4 }],
        ['brand · 6px', { variant: 'brand', value: 0.98, height: 6 }],
        ['solid danger', { variant: 'solid', tone: 'danger', value: 0.3, height: 4 }],
        ['custom colours', { colors: ['#a78bfa', '#60a5fa', '#2dd4bf'], value: 0.75, height: 6 }],
      ] as const).map(([label, props]) => (
        <View key={label} className="gap-1.5">
          <Text variant="micro">{label}</Text>
          <ProgressBar {...(props as object as { value: number })} />
        </View>
      ))}
    </View>
  ),
};
