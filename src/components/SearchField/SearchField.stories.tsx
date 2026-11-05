import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { SearchField } from './SearchField';
import { Text } from '../Text/Text';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: { docs: { description: { component: 'Compact search input built on `TextInput`. Shows a shortcut hint when empty and a clear button once there is text. Controlled or uncontrolled.' } } },
  args: { placeholder: 'Search shares', shortcut: '⌘F' },
  decorators: [(Story) => <View style={{ width: 336 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof SearchField> = {};
export const Controlled: StoryObj<typeof SearchField> = {
  render: (args) => {
    const [q, setQ] = useState('photo');
    return (
      <View className="gap-2">
        <SearchField {...args} value={q} onChangeText={setQ} />
        <Text variant="micro">value: “{q}”</Text>
      </View>
    );
  },
};
