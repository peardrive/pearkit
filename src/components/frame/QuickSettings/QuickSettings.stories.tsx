import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { QuickSettings, QuickSettingsLine } from './QuickSettings';
import { Switch } from '@/components/buttons/Switch/Switch';
import { IconButton } from '@/components/buttons/IconButton/IconButton';
import { Text } from '@/components/foundations/Text/Text';
import { Showcase } from '@/stories/helpers';

const meta: Meta<typeof QuickSettings> = {
  title: 'QuickSettings',
  component: QuickSettings,
  subcomponents: { QuickSettingsLine } as never,
  parameters: { docs: { description: { component: 'The small options box that pops up from a control: one line per setting, the name left, its control right, and one plain button at the foot to the full page. The host places it and puts it away on a press outside.' } } },
  args: { width: 300 },
};
export default meta;
type Story = StoryObj<typeof QuickSettings>;

function Camera() {
  const [on, setOn] = useState(true);
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  return (
    <QuickSettings footer={{ label: 'All settings', onPress: () => {} }}>
      <QuickSettingsLine icon="video" name="Camera" detail={on ? 'On' : 'Off: black frames go into the take'}>
        <Switch value={on} onValueChange={setOn} accessibilityLabel="Camera" />
      </QuickSettingsLine>
      <QuickSettingsLine name={facing === 'front' ? 'Front camera' : 'Back camera'} detail="Flip while a take runs; it keeps rolling">
        <IconButton icon="refresh" size="sm" variant="subtle" tooltip="Flip" onPress={() => setFacing((f) => (f === 'front' ? 'back' : 'front'))} />
      </QuickSettingsLine>
    </QuickSettings>
  );
}

function Player() {
  const [loop, setLoop] = useState(false);
  const [speed, setSpeed] = useState(1);
  return (
    <QuickSettings title="Playback" width={280} footer={{ label: 'All settings', onPress: () => {} }}>
      <QuickSettingsLine icon="clock" name="Speed">
        <IconButton icon="chevron-left" size="xs" variant="subtle" accessibilityLabel="Slower" onPress={() => setSpeed((v) => Math.max(0.5, v - 0.25))} />
        <Text variant="body-sm" weight="semibold" style={{ minWidth: 36, textAlign: 'center' }}>{speed}×</Text>
        <IconButton icon="chevron-right" size="xs" variant="subtle" accessibilityLabel="Faster" onPress={() => setSpeed((v) => Math.min(2, v + 0.25))} />
      </QuickSettingsLine>
      <QuickSettingsLine icon="refresh" name="Loop">
        <Switch value={loop} onValueChange={setLoop} size="sm" accessibilityLabel="Loop" />
      </QuickSettingsLine>
      <QuickSettingsLine icon="document" name="Captions" detail="None in this file" dim>
        <Switch value={false} onValueChange={() => {}} size="sm" disabled accessibilityLabel="Captions" />
      </QuickSettingsLine>
    </QuickSettings>
  );
}

export const Playground: Story = { render: () => <Camera /> };

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Showcase title="A dock capsule's quick settings (hold the camera)">
        <Camera />
      </Showcase>
      <Showcase title="A player's, with a heading">
        <Player />
      </Showcase>
      <Showcase title="No footer: the lines are all there is">
        <QuickSettings width={260}>
          <QuickSettingsLine icon="microphone" name="Microphone" detail="iPhone microphone">
            <Switch value onValueChange={() => {}} accessibilityLabel="Microphone" />
          </QuickSettingsLine>
        </QuickSettings>
      </Showcase>
    </View>
  ),
};
