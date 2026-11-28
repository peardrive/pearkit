import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { DeviceToggle } from './DeviceToggle';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof DeviceToggle> = {
  title: 'Media/DeviceToggle',
  component: DeviceToggle,
  parameters: { docs: { description: { component: 'A live input as a capsule: the body switches the device on and off, the slim caret opens its options. Off is tinted red with a slash through the icon. A microphone shows its level along the bottom. `compact` drops the caret for a thumb; a long press opens the options.' } } },
  argTypes: {
    icon: { control: 'select', options: ['video', 'microphone', 'screen'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
  args: { icon: 'video', label: 'Camera', on: true, shortcut: 'C', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof DeviceToggle>;

export const Playground: Story = {
  render: (args) => {
    const [on, setOn] = useState(args.on);
    const [open, setOpen] = useState(false);
    return <DeviceToggle {...args} on={on} onToggle={() => setOn(!on)} onOptions={() => setOpen(!open)} optionsOpen={open} />;
  },
};

function Mic({ compact = false, size = 'md' as 'md' | 'sm', startOn = true }) {
  const [on, setOn] = useState(startOn);
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(0.3);
  useEffect(() => {
    const t = setInterval(() => setLevel(0.2 + Math.random() * 0.6), 90);
    return () => clearInterval(t);
  }, []);
  return <DeviceToggle icon="microphone" label="Microphone" shortcut="⇧M" on={on} onToggle={() => setOn(!on)} onOptions={() => setOpen(!open)} optionsOpen={open} level={level} compact={compact} size={size} />;
}

function Camera({ compact = false, size = 'md' as 'md' | 'sm', startOn = true }) {
  const [on, setOn] = useState(startOn);
  const [open, setOpen] = useState(false);
  return <DeviceToggle icon="video" label="Camera" shortcut="C" on={on} onToggle={() => setOn(!on)} onOptions={() => setOpen(!open)} optionsOpen={open} compact={compact} size={size} />;
}

function Nudged() {
  const [n, setN] = useState(0);
  return <DeviceToggle icon="microphone" label="Microphone" on={false} onToggle={() => setN(n + 1)} onOptions={() => {}} level={0} nudge={n} />;
}

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Showcase title="A dock's inputs: press the body, press the caret">
        <Camera />
        <Mic />
      </Showcase>
      <Showcase title="Off: tinted, slashed; the level dims">
        <Camera startOn={false} />
        <Mic startOn={false} />
      </Showcase>
      <Showcase title="Compact, for a thumb: no caret, long press for the options">
        <Camera compact size="sm" />
        <Mic compact size="sm" />
      </Showcase>
      <Showcase title="Nudge: press it and the capsule shakes (a take started with the mic off)">
        <Nudged />
      </Showcase>
      <Showcase title="Disabled">
        <DeviceToggle icon="screen" label="Screen" on onToggle={() => {}} onOptions={() => {}} disabled />
      </Showcase>
    </View>
  ),
};
