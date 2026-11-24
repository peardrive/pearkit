import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Scrubber, type ScrubberProps } from './Scrubber';
import type { TimeRange } from './timeRange';
import { Text } from '../Text/Text';
import { Waveform } from '../Waveform/Waveform';
import { demoPeaks } from '../../stories/fixtures/media';

const meta: Meta<typeof Scrubber> = {
  title: 'Components/Scrubber',
  component: Scrubber,
  parameters: {
    docs: {
      description: {
        component:
<<<<<<< HEAD
          'The time bar: a raised track with the playhead (a line with a little house on top), scrubbed by pressing or dragging; given a `range`, the chosen part framed the way a timeline frames a selected clip — the selection colour, a bar inside each end — and either end drags to trim. `look="pins"` is the older in/out pin (a ball under the strip). Every scrub bar and every in/out in an app is this one component, and a canvas timeline paints the same frame with `paintClipFrame`.',
=======
          'The time bar: a track with the playhead (a line with a little house on top), scrubbed by pressing or dragging; given a `range`, the chosen part with an in and an out pin at its ends — the pin is a line with a ball under the strip, and the ball is what you grab. Every scrub bar and every in/out in an app is this one component (or its painters on a canvas).',
>>>>>>> feat/38-dock-controls
      },
    },
  },
  argTypes: {
    duration: { control: { type: 'number', min: 1, step: 1 } },
    time: { control: { type: 'range', min: 0, max: 92, step: 0.1 } },
<<<<<<< HEAD
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    look: { control: 'inline-radio', options: ['clip', 'pins'] },
    emboss: { control: 'boolean' },
=======
    size: { control: 'inline-radio', options: ['sm', 'md'] },
>>>>>>> feat/38-dock-controls
    dimOutside: { control: 'boolean' },
    frame: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
<<<<<<< HEAD
  args: { duration: 92, time: 31, size: 'sm', look: 'clip', range: { in: 12, out: 64 }, dimOutside: false, frame: false, disabled: false },
=======
  args: { duration: 92, time: 31, size: 'sm', range: { in: 12, out: 64 }, dimOutside: false, frame: false, disabled: false },
>>>>>>> feat/38-dock-controls
  decorators: [(Story) => <View style={{ width: 420 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Scrubber>;

/** A controlled scrubber: the story holds time and range so dragging works. */
function Live(props: Partial<ScrubberProps> & { duration: number; children?: React.ReactNode; label?: string }) {
  const [time, setTime] = useState(props.time ?? 0);
  const [range, setRange] = useState<TimeRange | null | undefined>(props.range);
  const [lastDone, setLastDone] = useState<string>('');
  return (
    <View className="gap-1.5">
      {props.label ? <Text variant="micro">{props.label}</Text> : null}
      <Scrubber
        {...props}
        time={time}
        range={range}
        onSeek={(t, done) => { setTime(t); if (done) setLastDone(`seek → ${t.toFixed(2)} s`); }}
        onRange={range === undefined ? undefined : (r, done) => { setRange(r); if (done) setLastDone(`range → ${r.in.toFixed(2)} – ${r.out.toFixed(2)} s`); }}
      >
        {props.children}
      </Scrubber>
      <Text variant="micro" tone="subtle">
        {time.toFixed(2)} s{range ? ` · in ${range.in.toFixed(2)} · out ${range.out.toFixed(2)}` : ''}{lastDone ? ` · ${lastDone}` : ''}
      </Text>
    </View>
  );
}

export const Playground: Story = {
  render: (args) => <Live {...args} />,
};

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
<<<<<<< HEAD
      <Live duration={92} time={31} range={undefined} label="scrub only · sm (the player's bar, raised)" />
      <Live duration={92} time={31} range={undefined} size="md" label="scrub only · md" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} label="with a range · the clip frame, its ends are the trim handles" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} size="lg" dimOutside label="lg, dim outside · the trim strip's look" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} size="md" look="pins" label="look=pins · the older in/out pins" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} height={28} dimOutside label="over a waveform (children)">
=======
      <Live duration={92} time={31} range={undefined} label="scrub only · sm" />
      <Live duration={92} time={31} range={undefined} size="md" label="scrub only · md" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} label="with a range · the lit span" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} size="md" dimOutside frame label="dim outside + frame · the trim strip's look" />
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} height={28} dimOutside frame label="over a waveform (children)">
>>>>>>> feat/38-dock-controls
        <Waveform source={demoPeaks(92)} window={{ from: 0, to: 92 }} className="absolute inset-0" style={{ height: 28 }} opacity={0.45} />
      </Live>
      <Live duration={92} time={31} range={{ in: 12, out: 64 }} disabled label="disabled" />
    </View>
  ),
};

export const Keyboard: Story = {
  parameters: { docs: { description: { story: 'Click the bar to focus it, then ← → move the head (shift ×10), I / O set the in / out at the head, Home / End jump.' } } },
<<<<<<< HEAD
  render: () => <Live duration={30} time={9} range={{ in: 3, out: 24 }} size="lg" />,
=======
  render: () => <Live duration={30} time={9} range={{ in: 3, out: 24 }} size="md" />,
>>>>>>> feat/38-dock-controls
};
