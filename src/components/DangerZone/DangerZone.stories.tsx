import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { DangerZone } from './DangerZone';

const meta: Meta<typeof DangerZone> = {
  title: 'Patterns/DangerZone',
  component: DangerZone,
  parameters: { docs: { description: { component: 'A destructive action with its consequence spelled out next to it.' } } },
  argTypes: { layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  args: { onPress: fn() },
  decorators: [(Story) => <View style={{ width: 520 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof DangerZone> = {};
export const RemoveDevice: StoryObj<typeof DangerZone> = {
  name: 'Custom copy',
  args: { actionLabel: 'Remove device', icon: 'close', description: 'This device will need to be paired again' },
};
