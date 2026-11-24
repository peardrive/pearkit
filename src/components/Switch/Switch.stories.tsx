import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Switch } from './Switch';
import { Text } from '../Text/Text';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { docs: { description: { component: 'On or off, as a switch: the track fills with the brand colour and the thumb slides right. A switch reads as a state, where a button reads as an action.' } } },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  args: { value: true, size: 'md', accessibilityLabel: 'Camera' },
};
export default meta;
type Story = StoryObj<typeof Switch>;

function Live({ start = true, ...rest }: { start?: boolean; size?: 'sm' | 'md'; disabled?: boolean; accessibilityLabel?: string }) {
  const [on, setOn] = useState(start);
  return <Switch value={on} onValueChange={setOn} {...rest} />;
}

export const Playground: Story = { render: (args) => <Live start={args.value} size={args.size} disabled={args.disabled} accessibilityLabel={args.accessibilityLabel} /> };

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Showcase title="Press it">
        <Live accessibilityLabel="Camera" />
        <Live start={false} accessibilityLabel="Microphone" />
      </Showcase>
      <Showcase title="Small, in a dense row">
        <Live size="sm" accessibilityLabel="Loop" />
        <Live size="sm" start={false} accessibilityLabel="Captions" />
      </Showcase>
      <Showcase title="In a row with its name">
        <View className="w-72 flex-row items-center justify-between rounded-xl bg-overlay/5 px-3 py-2">
          <Text variant="body-sm">Camera</Text>
          <Live accessibilityLabel="Camera" />
        </View>
      </Showcase>
      <Showcase title="Disabled">
        <Switch value onValueChange={() => {}} disabled accessibilityLabel="Locked" />
        <Switch value={false} onValueChange={() => {}} disabled accessibilityLabel="Locked" />
      </Showcase>
    </View>
  ),
};
