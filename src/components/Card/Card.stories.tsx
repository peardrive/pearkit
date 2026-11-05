import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Card } from './Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { docs: { description: { component: 'Translucent grouping surface. `md` for detail panels (16px padding, 14px radius), `sm` for sidebar cards (12px / 12px). Because it tints with the `overlay` token, it adapts to any background and theme.' } } },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] }, variant: { control: 'inline-radio', options: ['surface', 'outline', 'plain'] } },
  args: { size: 'md', variant: 'surface' },
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof Card> = {
  render: (args) => (
    <Card {...args}>
      <Text variant="body-lg">Card title</Text>
      <Text variant="caption">Cards stack their children with a 12px gap.</Text>
    </Card>
  ),
};
export const Variants: StoryObj<typeof Card> = {
  render: () => (
    <View className="gap-3">
      {(['surface', 'outline', 'plain'] as const).map((v) => (
        <Card key={v} variant={v}><Text variant="label">{v}</Text></Card>
      ))}
      <Card size="sm"><Text variant="label">size sm</Text></Card>
    </View>
  ),
};
