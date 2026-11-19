import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { ProfileCard } from './ProfileCard';
import { Button } from '../Button/Button';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { Toggle } from '../Toggle/Toggle';
import { Column } from '../../stories/helpers';

const PIC = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="#2a4a36"/><circle cx="64" cy="50" r="24" fill="#a8d08d"/><rect x="24" y="84" width="80" height="44" rx="22" fill="#a8d08d"/></svg>')}`;

function BotRules() {
  const [wake, setWake] = useState('mention');
  const [order, setOrder] = useState(true);
  return { wake, setWake, order, setOrder };
}

function Bot({ editable }: { editable?: boolean }) {
  const r = BotRules();
  return (
    <ProfileCard
      name="Pear"
      agent
      subtitle="Bot in Pearkit · runs on Mac Mini"
      badges={[{ label: 'Agent', tone: 'primary', icon: 'robot' }, { label: 'Mac Mini', tone: 'info' }, { label: 'Claude', tone: 'neutral' }]}
      editable={editable}
      onEditName={fn()}
      onPickAvatar={fn()}
      sections={[
        { title: 'In this project', icon: 'folder', description: 'what it is for', rows: [{ label: 'Role', value: 'Keeps the summary, answers about the library', onPress: fn() }, { label: 'Home', value: 'Mac Mini · ~/Anjou/pearkit' }] },
        {
          title: 'Rules',
          icon: 'setting-2-bold',
          description: 'when it speaks',
          rows: [
            { label: 'Wakes', control: <SegmentedControl size="sm" options={[{ value: 'mention', label: 'On mention' }, { value: 'turn', label: 'In turn' }]} value={r.wake} onChange={r.setWake} /> },
            { label: 'Keeps its turn order', hint: 'Waits for the people before it', control: <Toggle value={r.order} onValueChange={r.setOrder} accessibilityLabel="Keeps its turn order" /> },
            { label: 'Daily cap', value: '40 messages', onPress: fn() },
          ],
        },
        { title: 'Runtime', icon: 'robot', rows: [{ label: 'Model', value: 'Claude Sonnet 4.5' }, { label: 'Protocol', value: 'ACP over the daemon' }, { label: 'Last seen', value: '2 minutes ago' }] },
      ]}
      actions={
        editable ? (
          <>
            <Button label="Pause the bot" variant="secondary" icon="pause" onPress={fn()} />
            <Button label="Remove from the project" variant="danger" onPress={fn()} />
          </>
        ) : (
          <Button label="Message" variant="primary" icon="message" onPress={fn()} />
        )
      }
    />
  );
}

const meta: Meta<typeof ProfileCard> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: {
    docs: {
      description: {
        component:
          'A profile for a bot or a person: name and picture on top, badge chips (agent, device, runtime), then settings blocks in PearDrive\'s style (`SettingsBlock` + `SettingsRow`), and actions at the bottom. `editable` shows the marks for changing the name and the picture; everyone else reads.',
      },
    },
  },
  args: {
    name: 'Ana',
    subtitle: 'Member of Pearkit · on an iPhone',
    avatar: { uri: PIC },
    badges: [{ label: 'Member', tone: 'accent' }, { label: 'iPhone', tone: 'info' }],
    sections: [
      { title: 'About', icon: 'people', rows: [{ label: 'Key', value: 'a12b…4f5g' }, { label: 'Joined', value: 'Nov 3' }] },
      { title: 'Projects', icon: 'folder', description: 'shared with you', rows: [{ label: 'Pearkit', onPress: fn() }, { label: 'Pearcast', onPress: fn() }] },
    ],
    editable: false,
    onEditName: fn(),
    onPickAvatar: fn(),
  },
  decorators: [(Story) => <View style={{ width: 480 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Column width={480}>
      <Bot />
      <Bot editable />
    </Column>
  ),
};

export const Person: Story = { args: { editable: true, name: 'Guy', subtitle: 'This is you · Guy\'s Mac', avatar: { seed: 'me' } } };
