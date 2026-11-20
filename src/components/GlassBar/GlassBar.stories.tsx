import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { GlassBar, GlassBarButton } from './GlassBar';
import { Composer } from '../Chat/Composer';
import { MessageList } from '../Chat/MessageList';
import type { ChatMessage } from '../Chat/types';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const min = 60_000;
const now = Date.now();
const ANA = { id: 'ana', name: 'Ana' };
const ME = { id: 'me', name: 'Guy' };
const PEAR = { id: 'pear', name: 'Pear', agent: true };
const MESSAGES: ChatMessage[] = [
  { id: '1', author: ANA, text: 'Morning. Chat pieces today?', ts: now - 40 * min },
  { id: '2', author: ME, text: 'Yes. One set for the sidebar chats and for rooms like this one.', ts: now - 39 * min },
  { id: '3', author: ME, text: 'Same messages, same composer. The sidebar just switches most of it off.', ts: now - 38.7 * min },
  { id: '4', author: ANA, text: 'Here is the mock from the tablet. The bar at the top should stay put while I type.', ts: now - 36 * min, attachments: [{ name: 'drag-bar.png', size: 184_000 }] },
  { id: '5', author: PEAR, text: '**So far**\n\n- The new drag bar shipped\n- It vanishes on the light theme', ts: now - 30 * min },
  { id: '6', author: ME, text: 'Looks right. Ship it.', ts: now - 2 * min },
];

/** A colourful surface behind the bar, so the blur has something to blur. */
function Backdrop() {
  return (
    <View className="absolute inset-0 overflow-hidden">
      <View className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/40" />
      <View className="absolute right-6 top-4 h-28 w-28 rounded-full bg-info/40" />
      <View className="absolute bottom-6 left-20 h-32 w-32 rounded-full bg-warning/30" />
      <Text variant="display" className="absolute left-4 top-20">Behind the glass</Text>
    </View>
  );
}

function ChatWithBar({ position = 'top' as 'top' | 'bottom' }) {
  const [tab, setTab] = useState('chat');
  const [value, setValue] = useState('');
  const bar = (
    <GlassBar position={position}>
      <GlassBarButton icon="message-fill" label="Chat" active={tab === 'chat'} onPress={() => setTab('chat')} accessibilityLabel="Chat" />
      <GlassBarButton icon="folder-fill" label="Files" badge={2} active={tab === 'files'} onPress={() => setTab('files')} accessibilityLabel="Files" />
      <GlassBarButton icon="more-fill" label="Project" active={tab === 'more'} onPress={() => setTab('more')} accessibilityLabel="The project" />
    </GlassBar>
  );
  return (
    <View className="relative flex-1 bg-background">
      <MessageList messages={MESSAGES} currentUserId="me" onReact={fn()} onReply={fn()} style={position === 'top' ? { paddingTop: 72 } : undefined} />
      <Composer value={value} onChangeText={setValue} onSend={() => setValue('')} onAttach={fn()} placeholder="Message Pearkit crew" style={position === 'bottom' ? { paddingBottom: 72 } : undefined} />
      {bar}
    </View>
  );
}

const meta: Meta<typeof GlassBar> = {
  title: 'Components/GlassBar',
  component: GlassBar,
  parameters: {
    docs: {
      description: {
        component:
          'A floating translucent bar over content, at the top or the bottom: on the web the content shows through it blurred (`backdrop-filter`), on a phone it is a near-solid tint. `GlassBarButton` is PearDrive\'s toolbar action: an embossed circle with a filled, embossed icon and its name under it, painted with the primary when chosen, with a count on its corner. `inset` takes the safe-area padding on the outer edge.',
      },
    },
  },
  argTypes: { position: { control: 'inline-radio', options: ['top', 'bottom'] } },
  args: { position: 'top' },
};
export default meta;
type Story = StoryObj<typeof GlassBar>;

/** A conversation with its one bar: chat, files, the project. */
export const Playground: Story = {
  render: (args) => (
    <View className="overflow-hidden rounded-card border border-overlay/[0.08]" style={{ width: 420, height: 560 }}>
      <ChatWithBar position={args.position} />
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <Column>
      <Showcase title="Top and bottom, over colour">
        <View className="relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width: 360, height: 200 }}>
          <Backdrop />
          <GlassBar position="top">
            <GlassBarButton icon="message-fill" label="Chat" active onPress={fn()} accessibilityLabel="Chat" />
            <GlassBarButton icon="folder-fill" label="Files" badge={12} onPress={fn()} accessibilityLabel="Files" />
            <GlassBarButton icon="more-fill" label="Project" onPress={fn()} accessibilityLabel="The project" />
          </GlassBar>
        </View>
        <View className="relative overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width: 360, height: 200 }}>
          <Backdrop />
          <GlassBar position="bottom" inset={12}>
            <GlassBarButton icon="bell-fill" onPress={fn()} accessibilityLabel="Activity" badge={3} />
            <GlassBarButton icon="folder-fill" onPress={fn()} accessibilityLabel="Projects" active />
            <GlassBarButton icon="setting-2-bold" onPress={fn()} accessibilityLabel="Settings" />
          </GlassBar>
        </View>
      </Showcase>
      <Showcase title="Buttons">
        <GlassBarButton icon="message-fill" label="Chat" onPress={fn()} accessibilityLabel="Chat" />
        <GlassBarButton icon="message-fill" label="Active" active onPress={fn()} accessibilityLabel="Active" />
        <GlassBarButton icon="folder-fill" label="Badge" badge={7} onPress={fn()} accessibilityLabel="Badge" />
        <GlassBarButton icon="more-fill" onPress={fn()} accessibilityLabel="No label" />
        <GlassBarButton icon="more-fill" label="Disabled" disabled onPress={fn()} accessibilityLabel="Disabled" />
      </Showcase>
    </Column>
  ),
};
