import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { LevelMeter } from './LevelMeter';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof LevelMeter> = {
  title: 'Media/LevelMeter',
  component: LevelMeter,
  parameters: { docs: { description: { component: 'An input level as one thin bar: the track faint, the fill in the brand colour, red when it clips. Along the bottom of a dock button, or long in a mixer.' } } },
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { level: 0.6, orientation: 'horizontal', length: 120, thickness: 6 },
};
export default meta;
type Story = StoryObj<typeof LevelMeter>;

export const Playground: Story = {};

/** A level that moves, as a microphone's does. */
function Live({ hot = false, ...rest }: { hot?: boolean; orientation?: 'horizontal' | 'vertical'; length?: number; thickness?: number; muted?: boolean }) {
  const [level, setLevel] = useState(0.3);
  useEffect(() => {
    const t = setInterval(() => setLevel(hot ? 0.85 + Math.random() * 0.15 : 0.2 + Math.random() * 0.5), 90);
    return () => clearInterval(t);
  }, [hot]);
  return <LevelMeter level={level} {...rest} />;
}

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Showcase title="Under a dock button (22 × 3, the default)">
        <Live />
        <Live hot />
        <LevelMeter level={0.5} muted />
      </Showcase>
      <Showcase title="In a mixer">
        <Live length={160} thickness={6} />
        <Live length={160} thickness={6} hot />
      </Showcase>
      <Showcase title="Vertical">
        <View className="h-28 flex-row items-end gap-3">
          <Live orientation="vertical" length={112} thickness={6} />
          <Live orientation="vertical" length={112} thickness={6} hot />
          <LevelMeter orientation="vertical" length={112} thickness={6} level={0.4} muted />
        </View>
      </Showcase>
    </View>
  ),
};
