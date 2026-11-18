import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Transport, type TransportProps } from './Transport';
import type { TimeRange } from '../Scrubber/timeRange';
import { Text } from '../Text/Text';
import { Waveform } from '../Waveform/Waveform';
import { demoPeaks } from '../../stories/fixtures/media';

const meta: Meta<typeof Transport> = {
  title: 'Components/Transport',
  component: Transport,
  parameters: {
    docs: {
      description: {
        component:
          'The one video control: play / pause, the `Scrubber`, the times — under a clip on a stage, in a quick look, in an export dialog; only size and placement differ. With a `range` it also trims, the times become `in – out · length`, and a "whole clip" button appears while the range is not everything.',
      },
    },
  },
  argTypes: {
    duration: { control: { type: 'number', min: 1, step: 1 } },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    times: { control: 'boolean' },
    fractionDigits: { control: { type: 'range', min: 0, max: 3, step: 1 } },
    disabled: { control: 'boolean' },
  },
  args: { duration: 92, size: 'sm', times: true, fractionDigits: 1, disabled: false },
  decorators: [(Story) => <View style={{ width: 480 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Transport>;

/** A clock that runs while "playing", stops at the out point, and holds the range. */
function Player(props: Partial<TransportProps> & { duration: number; label?: string; trims?: boolean; children?: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(props.time ?? 0);
  const [range, setRange] = useState<TimeRange | null>(props.trims ? props.range ?? { in: 0, out: props.duration } : null);
  const last = useRef(0);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    last.current = performance.now();
    const tick = (now: number) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setTime((t) => {
        const end = range?.out ?? props.duration;
        const next = t + dt;
        if (next >= end) { setPlaying(false); return end; }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, range?.out, props.duration]);
  const toggle = () => {
    if (!playing) {
      const start = range?.in ?? 0, end = range?.out ?? props.duration;
      if (time >= end - 0.05 || time < start) setTime(start);
    }
    setPlaying((p) => !p);
  };
  return (
    <View className="gap-1.5">
      {props.label ? <Text variant="micro">{props.label}</Text> : null}
      <Transport
        {...props}
        playing={playing}
        onToggle={toggle}
        time={time}
        onSeek={(t) => setTime(t)}
        range={range}
        onRange={props.trims ? (r) => setRange(r) : undefined}
        onWhole={props.trims ? () => setRange({ in: 0, out: props.duration }) : undefined}
      >
        {props.children}
      </Transport>
    </View>
  );
}

export const Playground: Story = {
  render: (args) => <Player {...args} trims />,
};

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Player duration={92} time={14} label="play and scrub · sm" />
      <Player duration={92} time={14} size="md" label="md" />
      <Player duration={92} time={14} trims range={{ in: 8, out: 40 }} label="trims too: the range, the in – out · length times, the whole-clip button" />
      <Player duration={92} time={14} size="md" label="a waveform inside the bar">
        <Waveform source={demoPeaks(92)} window={{ from: 0, to: 92 }} className="absolute inset-0" style={{ height: 26 }} opacity={0.45} />
      </Player>
      <Player duration={3725} time={3600} fractionDigits={0} label="over an hour, no fraction" />
      <Player duration={92} time={14} disabled label="disabled" />
    </View>
  ),
};
