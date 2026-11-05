import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { TextField } from './TextField';
import { Kbd } from '../Kbd/Kbd';
import { iconNames } from '../../icons/registry';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { docs: { description: { component: 'Labelled text input with hint / error, leading icon, trailing slot, password reveal and a monospace mode for keys and links. Built on `TextInput`, so it works on native and in Electron.' } } },
  argTypes: { icon: { control: 'select', options: [undefined, ...iconNames] }, size: { control: 'inline-radio', options: ['sm', 'md'] } },
  args: { label: 'Username', placeholder: 'alice', hint: 'Stored only on this device.' },
  decorators: [(Story) => <View style={{ width: 340 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => {
    const [pw, setPw] = useState('correct horse battery');
    return (
      <View className="gap-5">
        <TextField label="Username" placeholder="alice" icon="people" />
        <TextField label="Password" password value={pw} onChangeText={setPw} />
        <TextField label="Share link" mono icon="link" placeholder="pearcore://…" defaultValue="pearcore://3MApi3V1vV8Yh3Uv1KN32hrL" />
        <TextField label="Space name" error="A space with this name already exists" defaultValue="Holiday" />
        <TextField size="sm" placeholder="Filter" icon="search-normal" trailing={<Kbd>⌘K</Kbd>} />
        <TextField label="Recovery phrase" multiline placeholder="orbit pear velvet …" />
        <TextField label="Disabled" disabled defaultValue="read only" />
      </View>
    );
  },
};
