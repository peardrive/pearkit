import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Divider } from './Divider';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { docs: { description: { component: 'Hairline separator. Horizontal between blocks; vertical between toolbar groups.' } } },
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  args: { orientation: 'horizontal' },
  decorators: [(Story) => <View style={{ width: 320 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof Divider> = {};
export const InContext: StoryObj<typeof Divider> = {
  name: 'In context',
  render: () => (
    <View className="gap-4">
      <View className="gap-3">
        <Text variant="label">Above</Text>
        <Divider />
        <Text variant="label">Below</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <IconButton icon="copy" accessibilityLabel="Copy" />
        <IconButton icon="folder-open" accessibilityLabel="Open" />
        <View className="px-1.5"><Divider orientation="vertical" /></View>
        <IconButton icon="pause" accessibilityLabel="Pause" />
      </View>
    </View>
  ),
};
