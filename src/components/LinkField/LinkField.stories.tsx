import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { LinkField } from './LinkField';

const meta: Meta<typeof LinkField> = {
  title: 'Components/LinkField',
  component: LinkField,
  parameters: { docs: { description: { component: 'Read-only recessed field for a share link. Tap anywhere to copy — shows a tick for a moment. Uses the web clipboard unless you pass `onCopy` (e.g. `expo-clipboard` on native).' } } },
  args: { value: 'peardrop://1de0909835728b6e0f3a4c19d2e7b8a5c6f71d0e9f684cb145a28', onCopy: fn() },
  decorators: [(Story) => <View style={{ width: 340 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof LinkField> = {};
export const CustomDisplay: StoryObj<typeof LinkField> = { name: 'Custom display value', args: { displayValue: 'peardrop://photo_2.mp4' } };
