import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { RecordButton, type RecordState } from './RecordButton';
import { Showcase } from '../../stories/helpers';
import { formatClock } from '../../utils/format';

const meta: Meta<typeof RecordButton> = {
  title: 'Components/RecordButton',
  component: RecordButton,
  parameters: { docs: { description: { component: 'The one record button: arm, record and stop are one round key in three states; a pulsing square says "recording". The label beside it is the app\'s word or its clock.' } } },
  argTypes: {
    state: { control: 'inline-radio', options: ['arm', 'ready', 'recording', 'busy'] },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
  args: { state: 'ready', label: 'Record', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof RecordButton>;

export const Playground: Story = { args: { tooltip: { label: 'Record', shortcut: 'R' } } };

/** Arm → Record → recording (with the clock) → Saving → armed again, on presses. */
function Walk({ size = 'md' as 'md' | 'lg' }) {
  const [state, setState] = useState<RecordState>('arm');
  const [t0, setT0] = useState(0);
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (state !== 'recording') return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [state]);
  const label = state === 'arm' ? 'Arm' : state === 'ready' ? 'Record' : state === 'busy' ? 'Saving…' : formatClock((now - t0) / 1000);
  const press = () => {
    if (state === 'arm') setState('ready');
    else if (state === 'ready') { setT0(Date.now()); setNow(Date.now()); setState('recording'); }
    else if (state === 'recording') { setState('busy'); setTimeout(() => setState('ready'), 1200); }
  };
  return <RecordButton state={state} label={label} size={size} onPress={press} tooltip={{ label: state === 'recording' ? 'Pause' : state === 'arm' ? 'Arm' : 'Record', shortcut: 'R' }} />;
}

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Showcase title="Press it: arm, record, stop, saving">
        <Walk />
      </Showcase>
      <Showcase title="The four states">
        <RecordButton state="arm" label="Arm" />
        <RecordButton state="ready" label="Record" />
        <RecordButton state="recording" label="01:42" />
        <RecordButton state="busy" label="Saving…" />
      </Showcase>
      <Showcase title="Disc alone, and the thumb size">
        <RecordButton state="ready" />
        <RecordButton state="recording" />
        <Walk size="lg" />
      </Showcase>
    </View>
  ),
};
