import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { fn } from 'storybook/test';
import { HomeBlock, HomeGrid, PresenceRow, type PresencePerson } from './HomeBlock';
import { ActivityRow, type ActivityItem } from '../ActivityFeed/ActivityFeed';
import { Button } from '../Button/Button';
import { Dock, type DockItem } from '../Dock/Dock';
import { ALL_ORGS, OrgTabs, type OrgTabItem } from '../OrgTabs/OrgTabs';
import { SidebarItem } from '../Sidebar/Sidebar';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const NOW = Date.now();
const min = 60_000;

const PEOPLE: PresencePerson[] = [
  { id: 'me', name: 'Guy', online: true },
  { id: 'ana', name: 'Ana', online: true },
  { id: 'pear', name: 'Pear', agent: true, online: true },
  { id: 'tomas', name: 'Tomás', online: false },
  { id: 'editor', name: 'Editor', agent: true, online: false },
  { id: 'mini', name: 'Mac Mini', online: true },
  { id: 'jeff', name: 'Jeffrey', online: true },
  { id: 'amir', name: 'Amir', online: false },
];

const NEEDS: ActivityItem[] = [
  { id: '1', ts: NOW - 2 * min, kind: 'approval', title: 'wants to run the release build', who: { id: 'pear', name: 'Pear', agent: true }, where: { project: 'Pearkit', conversation: 'Release 0.3' }, unread: true, action: { label: 'Approve', onPress: fn() } },
  { id: '2', ts: NOW - 9 * min, kind: 'mention', title: 'mentioned you: "can you check the light theme?"', who: { id: 'ana', name: 'Ana' }, where: { project: 'Pearkit', conversation: 'Chat pieces' }, unread: true },
  { id: '3', ts: NOW - 40 * min, kind: 'done', title: 'finished: ported the chat lab', who: { id: 'pear', name: 'Pear', agent: true }, where: { project: 'Pearkit' } },
];

const ORGS: OrgTabItem[] = [
  { key: 'peardrive', name: 'PearDrive', count: 6 },
  { key: 'audible', name: 'Bitcoin Audible', count: 3 },
  { key: 'anjou', name: 'Anjou', count: 2 },
  { key: 'family', name: 'Family' },
];

const DOCK: DockItem[] = [
  { key: 'home', icon: 'grid-1', label: 'Home' },
  { key: 'activity', icon: 'bell', label: 'Activity', badge: 2 },
  { key: 'projects', icon: 'folder', label: 'Projects' },
  { key: 'settings', icon: 'setting-2-bold', label: 'Settings' },
];

const meta: Meta<typeof HomeBlock> = {
  title: 'Components/HomeBlock',
  component: HomeBlock,
  parameters: {
    docs: {
      description: {
        component:
          'PearDrive\'s block as one component: a card with a header row (icon, title, count, an action at the right) and a body; `size` is `compact` (one cell), `wide` (a row) or `full` (a row that grows). `HomeGrid` lays blocks out two up on a wide screen and one up on a phone. `PresenceRow` is who is around: small avatars with an online dot each, "+N" for the rest.',
      },
    },
  },
  argTypes: { size: { control: 'inline-radio', options: ['compact', 'wide', 'full'] } },
  args: { title: 'Online', icon: 'people', count: 5, action: { label: 'All', onPress: fn() }, size: 'compact' },
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof HomeBlock>;

export const Playground: Story = {
  render: (args) => (
    <HomeBlock {...args}>
      <PresenceRow people={PEOPLE} onPress={fn()} />
    </HomeBlock>
  ),
};

export const Variants: Story = {
  decorators: [],
  render: () => (
    <Column>
      <Showcase title="PresenceRow: six then +N, bots marked, offline dimmed; smaller">
        <PresenceRow people={PEOPLE} onPress={fn()} />
        <PresenceRow people={PEOPLE.slice(0, 3)} size={22} />
      </Showcase>
      <Showcase title="Blocks: an action, a chevron, nothing at the right">
        <View style={{ width: 300 }}><HomeBlock title="Needs you" icon="bell" count={2} action={{ label: 'All', onPress: fn() }}><Text variant="caption" tone="muted">Two things wait for you.</Text></HomeBlock></View>
        <View style={{ width: 300 }}><HomeBlock title="Projects" icon="folder" count={6} onPress={fn()}><Text variant="caption" tone="muted">Pearkit, Pearcast, …</Text></HomeBlock></View>
        <View style={{ width: 300 }}><HomeBlock title="This device" icon="setting-2-bold"><Text variant="caption" tone="muted">Guy's Mac · can hold projects</Text></HomeBlock></View>
      </Showcase>
    </Column>
  ),
};

/** The Home screen: the organizations on top, the blocks, the dock. Two columns from 720 px, one on a phone. */
function Home({ width, height }: { width: number; height: number }) {
  const [org, setOrg] = useState(ALL_ORGS);
  const [dock, setDock] = useState('home');
  return (
    <View className="relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width, height }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <OrgTabs items={ORGS} value={org} onChange={setOrg} onAdd={fn()} />
        <View className="px-3 pt-1">
          <HomeGrid columns={width >= 720 ? 2 : 1}>
            <HomeBlock title="Needs you" icon="bell" count={2} action={{ label: 'All', onPress: fn() }} size="wide">
              <View className="-mx-4 -mb-4">
                {NEEDS.map((it, i) => (
                  <ActivityRow key={it.id} item={it} compact onOpen={fn()} divider={i < NEEDS.length - 1} />
                ))}
              </View>
            </HomeBlock>
            <HomeBlock title="Online" icon="people" count={5} onPress={fn()}>
              <PresenceRow people={PEOPLE} onPress={fn()} />
            </HomeBlock>
            <HomeBlock title="Projects" icon="folder" count={6} action={{ label: 'New', onPress: fn() }}>
              <View className="-mx-2">
                <SidebarItem icon="folder" label="Pearkit" count={3} onPress={fn()} />
                <SidebarItem icon="folder" label="Pearcast" count={1} onPress={fn()} />
                <SidebarItem icon="folder" label="rKeyChat" onPress={fn()} />
              </View>
            </HomeBlock>
            <HomeBlock title="Recent files" icon="document" count={12} action={{ label: 'All', onPress: fn() }} size="wide">
              <Text variant="caption" tone="muted">drag-bar.png · tablet-run.mov · release-notes.md</Text>
            </HomeBlock>
          </HomeGrid>
        </View>
      </ScrollView>
      <Dock items={DOCK} value={dock} onChange={setDock} />
    </View>
  );
}

export const Phone: Story = { name: 'Home on a phone', decorators: [], render: () => <Home width={390} height={760} /> };
export const Desktop: Story = { name: 'Home on a desktop', decorators: [], render: () => <Home width={820} height={620} /> };

export const Buttons: Story = {
  name: 'A block with a button body',
  render: () => (
    <HomeBlock title="New" icon="add" size="wide">
      <View className="flex-row gap-2">
        <Button size="sm" variant="primary" icon="add" label="Project" onPress={fn()} />
        <Button size="sm" variant="secondary" icon="people" label="Organization" onPress={fn()} />
      </View>
    </HomeBlock>
  ),
};
