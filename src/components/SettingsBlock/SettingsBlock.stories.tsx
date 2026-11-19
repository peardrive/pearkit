import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { SettingsBlock, SettingsRow } from './SettingsBlock';
import { Button } from '../Button/Button';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { Text } from '../Text/Text';
import { Toggle } from '../Toggle/Toggle';
import { Column } from '../../stories/helpers';

const meta: Meta<typeof SettingsBlock> = {
  title: 'Components/SettingsBlock',
  component: SettingsBlock,
  parameters: {
    docs: {
      description: {
        component:
          'PearDrive\'s settings look, for any app: a card per block with a visual cue, a title and a quiet blurb, and one line per setting (`SettingsRow`): label and hint at the left, the control at the right — a `Toggle`, a `SegmentedControl`, a value, a `Button`, or a chevron when the row opens something. `ProfileCard` is built from these.',
      },
    },
  },
  args: { title: 'This device', icon: 'setting-2-bold', description: 'its name and key' },
  decorators: [(Story) => <View style={{ width: 460 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof SettingsBlock>;

function Live() {
  const [on, setOn] = useState(true);
  const [density, setDensity] = useState('comfortable');
  return (
    <>
      <SettingsRow label="Name" hint="How this device appears to others" control={<Text variant="label" weight="semibold">Guy's Mac</Text>} onPress={fn()} />
      <SettingsRow label="Workspace folder" control="~/Anjou" onPress={fn()} />
      <SettingsRow label="Can hold projects" hint="Keeps a copy of every project it is in" control={<Toggle value={on} onValueChange={setOn} accessibilityLabel="Can hold projects" />} />
      <SettingsRow label="Density" control={<SegmentedControl size="sm" options={[{ value: 'compact', label: 'Compact' }, { value: 'comfortable', label: 'Comfortable' }]} value={density} onChange={setDensity} />} divider={false} />
    </>
  );
}

export const Playground: Story = { render: (args) => <SettingsBlock {...args}><Live /></SettingsBlock> };

export const Variants: Story = {
  render: () => (
    <Column width={460}>
      <SettingsBlock title="This device" icon="setting-2-bold" description="its name and key">
        <Live />
      </SettingsBlock>
      <SettingsBlock title="Media" icon="image" description="pictures and GIFs to reply with" trailing={<Button size="sm" variant="ghost" label="Open" onPress={fn()} />}>
        <SettingsRow label="Cache" hint="Thumbnails kept on this device" control="184 MB" />
        <SettingsRow label="Clear the cache" icon="refresh" onPress={fn()} />
        <SettingsRow label="Remove the space" icon="close" destructive onPress={fn()} divider={false} />
      </SettingsBlock>
      <SettingsBlock title="Rules" description="when the bot speaks">
        <SettingsRow label="Wake on mention" control={<Toggle value onValueChange={fn()} accessibilityLabel="Wake on mention" />} />
        <SettingsRow label="Daily cap" control="40 messages" onPress={fn()} disabled />
        <SettingsRow label="Runtime" control="Claude, on Mac Mini" divider={false} />
      </SettingsBlock>
    </Column>
  ),
};
