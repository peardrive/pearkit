import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Filmstrip } from './Filmstrip';
import { Text } from '../Text/Text';
import { demoFrames } from '../../stories/fixtures/media';

const meta: Meta<typeof Filmstrip> = {
  title: 'Components/Filmstrip',
  component: Filmstrip,
  parameters: {
    docs: {
      description: {
        component:
          'Frames of a clip edge to edge — what the trim strip shows for video. It only draws: the host makes the frames (a hidden video seeking on the desktop, a native thumbnailer on the phone) and hands them over as they arrive; a `null` frame is an empty cell until then. `filmstripFrameTime(i, n, duration)` says which moment each cell wants.',
      },
    },
  },
  argTypes: {
    height: { control: { type: 'range', min: 16, max: 80, step: 1 } },
    radius: { control: { type: 'range', min: 0, max: 16, step: 1 } },
  },
  args: { frames: demoFrames(12), height: 30, radius: 6 },
  decorators: [(Story) => <View style={{ width: 420 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Filmstrip>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <View className="gap-5">
      {([
        ['12 frames · 30px', { frames: demoFrames(12), height: 30 }],
        ['still arriving: 3 empty cells', { frames: demoFrames(12, [5, 6, 11]), height: 30 }],
        ['6 frames · 48px · square corners', { frames: demoFrames(6), height: 48, radius: 0 }],
        ['one frame · a thumbnail', { frames: demoFrames(1), height: 54, radius: 8 }],
      ] as const).map(([label, props]) => (
        <View key={label} className="gap-1.5">
          <Text variant="micro">{label}</Text>
          <Filmstrip {...props} />
        </View>
      ))}
    </View>
  ),
};
