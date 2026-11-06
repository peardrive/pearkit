import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Waveform } from './Waveform';
import { Text } from '../Text/Text';
import { demoPeaks } from '../../stories/fixtures/media';

const peaks = demoPeaks(92);

const meta: Meta<typeof Waveform> = {
  title: 'Components/Waveform',
  component: Waveform,
  parameters: {
    docs: {
      description: {
        component:
          'A sound as bars: the loudest peak under each pixel column, grown from the middle or standing on the bottom. The same geometry (`waveformBars`) feeds `paintWaveform` for canvas surfaces, so a trim strip and a timeline draw the same sound the same way.',
      },
    },
  },
  argTypes: {
    height: { control: { type: 'range', min: 8, max: 80, step: 1 } },
    anchor: { control: 'inline-radio', options: ['center', 'bottom'] },
    tone: { control: 'select', options: ['info', 'primary', 'primary-strong', 'accent', 'foreground', 'muted', 'success', 'warning'] },
    opacity: { control: { type: 'range', min: 0.1, max: 1, step: 0.05 } },
    barWidth: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    gap: { control: { type: 'range', min: 0, max: 4, step: 1 } },
    scale: { control: { type: 'range', min: 0.3, max: 1, step: 0.05 } },
  },
  args: { source: peaks, height: 32, anchor: 'center', tone: 'info', opacity: 0.6, barWidth: 1, gap: 0, scale: 0.85 },
  decorators: [(Story) => <View style={{ width: 420 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Waveform>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <View className="gap-5">
      {([
        ['center · the strip', { anchor: 'center', height: 28 }],
        ['bottom · the timeline clip', { anchor: 'bottom', height: 22, tone: 'primary', opacity: 0.8 }],
        ['a window: 20 – 40 s only', { anchor: 'center', height: 28, window: { from: 20, to: 40 } }],
        ['2px bars with a gap', { anchor: 'center', height: 36, barWidth: 2, gap: 1, tone: 'foreground', opacity: 0.5 }],
        ['no source yet', { anchor: 'center', height: 28, source: null }],
      ] as const).map(([label, props]) => (
        <View key={label} className="gap-1.5">
          <Text variant="micro">{label}</Text>
          <View className="rounded-md bg-inset/[0.35] overflow-hidden">
            <Waveform source={peaks} {...(props as object)} />
          </View>
        </View>
      ))}
    </View>
  ),
};
