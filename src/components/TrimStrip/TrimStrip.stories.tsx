import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { TrimStrip, type TrimStripProps } from './TrimStrip';
import { Transport } from '../Transport/Transport';
import type { TimeRange } from '../Scrubber/timeRange';
import { Text } from '../Text/Text';
import { demoFrames, demoPeaks } from '../../stories/fixtures/media';

const peaks = demoPeaks(92);
const frames = demoFrames(12);

const meta: Meta<typeof TrimStrip> = {
  title: 'Components/TrimStrip',
  component: TrimStrip,
  parameters: {
    docs: {
      description: {
        component:
          'A clip, miniaturised: its frames edge to edge with the sound along the bottom third (or the whole height of waveform for audio), the chosen part lit with a light edge and a pin at each end, everything outside it dimmed, the playhead over it. Drag a pin\'s ball to trim, drag anywhere else to scrub. `compact` is the single-line Inspector form. The same strip trims a video on a stage, a sound on an audio tab and a clip in an inspector — and on the phone.',
      },
    },
  },
  argTypes: {
    duration: { control: { type: 'number', min: 1, step: 1 } },
    time: { control: { type: 'range', min: 0, max: 92, step: 0.1 } },
    height: { control: { type: 'range', min: 20, max: 80, step: 1 } },
    compact: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { duration: 92, time: 31, range: { in: 12, out: 64 }, waveform: peaks, frames, compact: false, disabled: false },
  decorators: [(Story) => <View style={{ width: 440 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof TrimStrip>;

function Live(props: Partial<TrimStripProps> & { duration: number; label?: string }) {
  const [time, setTime] = useState<number | null>(props.time === undefined ? 0 : props.time);
  const [range, setRange] = useState<TimeRange | null>(props.range ?? null);
  return (
    <View className="gap-1.5">
      {props.label ? <Text variant="micro">{props.label}</Text> : null}
      <TrimStrip {...props} time={time} range={range} onSeek={(t) => setTime(t)} onRange={(r) => setRange(r)} />
    </View>
  );
}

export const Playground: Story = { render: (args) => <Live {...args} /> };

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} waveform={peaks} frames={frames} label="video: frames with the sound along the bottom" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} waveform={peaks} label="audio: the whole height is waveform" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} waveform={peaks} frames={frames} compact label="compact: the Inspector's single line (no frames)" />
      <Live duration={92} time={31} range={null} waveform={peaks} frames={frames} label="the whole clip (range null): pins at the ends" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} frames={demoFrames(12, [4, 5, 9])} label="frames still arriving, no sound yet" />
      <Live duration={92} time={null} range={{ in: 12, out: 64 }} waveform={peaks} frames={frames} disabled label="disabled, no playhead" />
    </View>
  ),
};

/** The media editor's foot: the strip over the picture's foot, the transport under it, one range between them. */
export const WithTransport: Story = {
  render: () => {
    const [time, setTime] = useState(20);
    const [playing, setPlaying] = useState(false);
    const [range, setRange] = useState<TimeRange>({ in: 12, out: 64 });
    return (
      <View className="gap-3">
        <TrimStrip duration={92} time={time} range={range} onSeek={(t) => setTime(t)} onRange={(r) => setRange(r)} waveform={peaks} frames={frames} />
        <Transport
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          duration={92}
          time={time}
          onSeek={(t) => setTime(t)}
          range={range}
          onRange={(r) => setRange(r)}
          onWhole={() => setRange({ in: 0, out: 92 })}
        />
      </View>
    );
  },
};
