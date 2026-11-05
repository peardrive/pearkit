import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Spacer } from './Spacer';
import { Text } from '../Text/Text';
import { IconButton } from '../IconButton/IconButton';

const meta: Meta<typeof Spacer> = {
  title: 'Components/Spacer',
  component: Spacer,
  parameters: { docs: { description: { component: 'Flexible (`flex-1`) or fixed gap. The design uses it to push trailing actions to the edge — the sidebar toggle, the inspector button, the peer count.' } } },
};
export default meta;
export const Flexible: StoryObj<typeof Spacer> = {
  render: () => (
    <View className="w-[320px] flex-row items-center rounded-control bg-overlay/[0.04] px-3 py-2">
      <Text variant="body" weight="semibold">Connected</Text>
      <Spacer />
      <IconButton icon="more" size="sm" accessibilityLabel="More" />
    </View>
  ),
};
export const Fixed: StoryObj<typeof Spacer> = {
  render: () => (
    <View className="flex-row items-center">
      <Text variant="label">1.2 MB/s</Text>
      <Spacer size={24} />
      <Text variant="label">3.8 MB/s</Text>
    </View>
  ),
};
