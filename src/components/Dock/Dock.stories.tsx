import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { Dock, DockButton, type DockItem } from './Dock';
import { MessageList } from '../Chat/MessageList';
import type { ChatMessage } from '../Chat/types';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const DOCK_ITEMS: DockItem[] = [
  { key: 'home', icon: 'grid-1', label: 'Home' },
  { key: 'activity', icon: 'bell', label: 'Activity', badge: 3 },
  { key: 'projects', icon: 'folder', label: 'Projects' },
  { key: 'settings', icon: 'setting-2-bold', label: 'Settings' },
];

const min = 60_000;
const now = Date.now();
const ANA = { id: 'ana', name: 'Ana' };
const ME = { id: 'me', name: 'Guy' };
const PEAR = { id: 'pear', name: 'Pear', agent: true };
const MESSAGES: ChatMessage[] = Array.from({ length: 14 }, (_, i) => ({
  id: `m${i}`,
  author: [ANA, ME, ME, PEAR][i % 4]!,
  text: ['Morning. Chat pieces today?', 'Yes. One set for the sidebar chats and for rooms like this one.', 'Same messages, same composer.', 'I can keep a summary pinned at the top if that helps.'][i % 4]!,
  ts: now - (14 - i) * 7 * min,
}));

function Live({ inset }: { inset?: number | string }) {
  const [value, setValue] = useState('home');
  return <Dock items={DOCK_ITEMS} value={value} onChange={setValue} inset={inset} />;
}

const meta: Meta<typeof Dock> = {
  title: 'Components/Dock',
  component: Dock,
  parameters: {
    docs: {
      description: {
        component:
          'The floating dock at the bottom: one wide glass pill with the places of the app in it, like the Photos tab pill on an iPhone. The chosen place is embossed (a pad with an inner highlight, the icon in the primary); the others sit flat. The page shows through it blurred on the web, a tint on a phone; `inset` takes the safe-area bottom. `DockButton` is one place on its own.',
      },
    },
  },
  args: { items: DOCK_ITEMS, value: 'home', onChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Dock>;

/** The dock over a conversation: the messages scroll under it. */
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <View className="relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width: 390, height: 700 }}>
        <MessageList messages={MESSAGES} currentUserId="me" onReact={fn()} style={{ paddingBottom: 84 }} />
        <Dock {...args} value={value} onChange={(k) => { setValue(k); args.onChange(k); }} />
      </View>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Column>
      <Showcase title="Over colour, with a safe-area inset of 20">
        <View className="relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width: 390, height: 180 }}>
          <View className="absolute -left-6 bottom-0 h-32 w-40 rounded-full bg-primary/40" />
          <View className="absolute bottom-4 right-8 h-28 w-28 rounded-full bg-info/40" />
          <Text variant="display" className="absolute left-4 top-6">Behind the dock</Text>
          <Live inset={20} />
        </View>
      </Showcase>
      <Showcase title="Buttons: flat, active, with a badge">
        <View className="flex-row gap-1 rounded-full border border-overlay/[0.13] bg-pane p-1.5">
          <DockButton icon="grid-1" label="Home" onPress={fn()} />
          <DockButton icon="bell" label="Activity" active badge={3} onPress={fn()} />
          <DockButton icon="folder" label="Projects" badge={12} onPress={fn()} />
        </View>
      </Showcase>
    </Column>
  ),
};
