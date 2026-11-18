import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { Toggle, type ToggleProps } from './Toggle';
import { Column, Showcase } from '../../stories/helpers';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { docs: { description: { component: 'An on/off switch built from Views: a track with a thumb, primary when on. With a `label` (and `description`) it is a whole row you can press. `accessibilityRole="switch"`.' } } },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  args: { value: true, label: 'Notify me', description: 'A sound and a badge when someone writes.', size: 'md', onValueChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

function Live(props: Omit<ToggleProps, 'onValueChange'>) {
  const [on, setOn] = useState(props.value);
  return <Toggle {...props} value={on} onValueChange={setOn} />;
}

export const Playground: Story = { render: (args) => <Live {...args} /> };

export const Variants: Story = {
  render: () => (
    <Column width={360}>
      <Showcase title="On and off">
        <Live value accessibilityLabel="On" />
        <Live value={false} accessibilityLabel="Off" />
      </Showcase>
      <Showcase title="Sizes">
        <Live value size="sm" accessibilityLabel="Small" />
        <Live value size="md" accessibilityLabel="Medium" />
      </Showcase>
      <Showcase title="With words">
        <View className="w-full gap-3">
          <Live value label="Notify me" description="A sound and a badge when someone writes." />
          <Live value={false} label="Enter sends" description="Off: Enter is a new line, the button sends." />
          <Live value size="sm" label="Show times" />
        </View>
      </Showcase>
      <Showcase title="Disabled">
        <View className="w-full gap-3">
          <Live value disabled label="Always on" />
          <Live value={false} disabled label="Not available here" />
        </View>
      </Showcase>
    </Column>
  ),
};
