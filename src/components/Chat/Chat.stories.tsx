import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentType } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { Composer } from './Composer';
import { MessageList } from './MessageList';
import { MessageRow } from './MessageRow';
import type { ChatAuthor, ChatMessage } from './types';
import { Button } from '../Button/Button';
import { EmptyState } from '../EmptyState/EmptyState';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const ME: ChatAuthor = { id: 'me', name: 'Guy' };
const ANA: ChatAuthor = { id: 'ana', name: 'Ana' };
const TOMAS: ChatAuthor = { id: 'tomas', name: 'Tomás' };
const PEAR: ChatAuthor = { id: 'pear', name: 'Pear', agent: true };
const SYSTEM: ChatAuthor = { id: 'system', name: '' };

const min = 60000;
const now = Date.now();
const yesterday = now - 26 * 60 * min;
const earlier = now - 40 * min;

const PIC = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="264" height="168"><rect width="264" height="168" fill="#10151a"/><rect x="72" y="62" width="120" height="44" rx="10" fill="#58c47a"/></svg>')}`;

const ROOM: ChatMessage[] = [
  { id: 'r0', author: SYSTEM, text: 'Ana added Tomás to the room', ts: yesterday - min, system: true },
  { id: 'r1', author: ANA, text: 'New drag bar is in the library. Bolder, 75% of the gap.', ts: yesterday, reactions: [{ emoji: '🎉', count: 2, mine: true }] },
  { id: 'r2', author: TOMAS, text: 'Tried it on the tablet, the grab area is finally big enough.', ts: yesterday + 2 * min },
  { id: 'r3', author: TOMAS, text: 'One thing: it disappears on the light theme.', ts: yesterday + 2.4 * min, reactions: [{ emoji: '👀', count: 1 }] },
  { id: 'r4', author: ME, text: 'Good catch. It should use the overlay colour, not white.', ts: yesterday + 6 * min, re: ['r3'] },
  { id: 'r5', author: ANA, text: 'Morning. Chat pieces today?', ts: earlier },
  { id: 'r6', author: ME, text: 'Yes. One set for the sidebar chats and for rooms like this one.', ts: earlier + min },
  { id: 'r7', author: ME, text: 'Same messages, same composer. The sidebar just switches most of it off.', ts: earlier + 1.3 * min, reactions: [{ emoji: '👍', count: 1 }] },
  { id: 'r8', author: ANA, text: 'Here is the mock and the recording from the tablet.', ts: earlier + 4 * min, attachments: [{ name: 'drag-bar.png', size: 184_000, url: PIC, kind: 'image' }, { name: 'tablet-run.mov', size: 42_300_000 }] },
  { id: 'r9', author: TOMAS, text: 'never mind, wrong room', ts: earlier + 5 * min, redacted: true },
  { id: 'r10', author: PEAR, text: 'I can keep a summary of this room pinned at the top if that helps. Say "@Pear summarize".', ts: earlier + 6 * min },
  { id: 'r11', author: ME, text: '@Pear summarize', ts: now - 5000, pending: true },
];

const meta: Meta<typeof MessageList> = {
  title: 'Components/Chat',
  component: MessageList,
  parameters: {
    docs: {
      description: {
        component:
          'The chat pieces for every app: `MessageList` (messages grouped by author within five minutes, a line per day, the agent\'s mark, system lines, struck redacted rows, lighter pending rows; stays at the newest message unless you scrolled up) and `Composer` (a growing pill field; Enter sends, Shift+Enter is a new line on a keyboard). Both are controlled: the app owns the messages and the text. `MessageRow` is one message on its own.',
      },
    },
  },
  argTypes: { look: { control: 'inline-radio', options: ['bubbles', 'flat'] } },
  args: { messages: ROOM, currentUserId: 'me', look: 'bubbles', compact: false, showDays: true, showTimes: true, onReact: fn(), onReply: fn(), onOpenAttachment: fn() },
};
export default meta;
type Story = StoryObj<typeof MessageList>;

/** A framed pane of a fixed size, so the list has something to scroll in. */
const framed = (width = 420, height = 560) => [
  (Story: ComponentType) => (
    <View className="overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width, height }}>
      <Story />
    </View>
  ),
];

export const Playground: Story = { decorators: framed() };

export const Flat: Story = { name: 'Flat rows', args: { look: 'flat' }, decorators: framed() };

export const Compact: Story = { name: 'Compact, for a sidebar', args: { compact: true, showDays: false }, decorators: framed(320) };

export const Empty: Story = {
  args: { messages: [], emptyState: <EmptyState icon="message" title="Nothing here yet" description="Say hello, or drop a file in." /> },
  decorators: framed(),
};

/** Every kind of row, on its own. */
export const Rows: Story = {
  name: 'MessageRow variants',
  render: () => (
    <Column width={420}>
      <Showcase title="A person, first and last of a group">
        <View className="w-full"><MessageRow message={ROOM[1]!} onReact={fn()} onReply={fn()} /></View>
      </Showcase>
      <Showcase title="Mine, answering">
        <View className="w-full"><MessageRow message={ROOM[4]!} mine quoted={[ROOM[3]!]} /></View>
      </Showcase>
      <Showcase title="An agent">
        <View className="w-full"><MessageRow message={ROOM[10]!} /></View>
      </Showcase>
      <Showcase title="System, redacted, pending">
        <View className="w-full">
          <MessageRow message={ROOM[0]!} />
          <MessageRow message={ROOM[9]!} />
          <MessageRow message={ROOM[11]!} mine />
        </View>
      </Showcase>
      <Showcase title="Attachments">
        <View className="w-full"><MessageRow message={ROOM[8]!} onOpenAttachment={fn()} /></View>
      </Showcase>
      <Showcase title="Flat">
        <View className="w-full"><MessageRow message={ROOM[1]!} look="flat" /><MessageRow message={ROOM[2]!} look="flat" /></View>
      </Showcase>
    </Column>
  ),
};

function ComposerDemo({ compact, replyTo: initialReply, disabled }: { compact?: boolean; replyTo?: { name: string; text: string } | null; disabled?: boolean }) {
  const [value, setValue] = useState('');
  const [sending, setSending] = useState(false);
  const [replyTo, setReplyTo] = useState(initialReply ?? null);
  return (
    <Composer
      value={value}
      onChangeText={setValue}
      compact={compact}
      disabled={disabled}
      sending={sending}
      replyTo={replyTo}
      onCancelReply={() => setReplyTo(null)}
      onAttach={fn()}
      onSend={() => {
        setSending(true);
        setTimeout(() => { setSending(false); setValue(''); setReplyTo(null); }, 600);
      }}
    />
  );
}

export const ComposerStory: Story = {
  name: 'Composer',
  render: () => (
    <Column width={420}>
      <Showcase title="Default"><View className="w-full"><ComposerDemo /></View></Showcase>
      <Showcase title="Answering someone"><View className="w-full"><ComposerDemo replyTo={{ name: 'Tomás', text: 'One thing: it disappears on the light theme.' }} /></View></Showcase>
      <Showcase title="Compact"><View className="w-full"><ComposerDemo compact /></View></Showcase>
      <Showcase title="Disabled"><View className="w-full"><ComposerDemo disabled /></View></Showcase>
    </Column>
  ),
};

/** The list and the composer together, with the messages owned by the page around them. */
export const Conversation: Story = {
  decorators: framed(),
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>(ROOM.slice(0, 11));
    const [value, setValue] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const quoted = replyTo ? messages.find((m) => m.id === replyTo) : undefined;
    const send = () => {
      const id = `m${Date.now()}`;
      setMessages((all) => [...all, { id, author: ME, text: value.trim(), ts: Date.now(), re: replyTo ? [replyTo] : undefined, pending: true }]);
      setValue('');
      setReplyTo(null);
      setTimeout(() => setMessages((all) => all.map((m) => (m.id === id ? { ...m, pending: false } : m))), 700);
      setTimeout(() => setMessages((all) => [...all, { id: `${id}a`, author: ANA, text: 'Makes sense.', ts: Date.now() }]), 2200);
    };
    const react = (id: string, emoji: string) =>
      setMessages((all) =>
        all.map((m) => {
          if (m.id !== id) return m;
          const have = m.reactions?.find((r) => r.emoji === emoji);
          const rest = (m.reactions ?? []).filter((r) => r.emoji !== emoji);
          const next = have ? (have.mine ? { ...have, count: have.count - 1, mine: false } : { ...have, count: have.count + 1, mine: true }) : { emoji, count: 1, mine: true };
          return { ...m, reactions: [...rest, next] };
        }),
      );
    return (
      <>
        <View className="flex-row items-center gap-2 border-b border-overlay/[0.06] px-3 py-2">
          <View className="flex-1">
            <Text variant="label" weight="bold" truncate>Pearkit crew · 4 people</Text>
            <Text variant="micro" tone="muted" truncate>A room: people and an agent</Text>
          </View>
          <Button size="sm" variant="ghost" icon="refresh" accessibilityLabel="Start over" onPress={() => setMessages(ROOM.slice(0, 11))} />
        </View>
        <MessageList messages={messages} currentUserId="me" onReact={react} onReply={setReplyTo} onOpenAttachment={fn()} />
        <Composer value={value} onChangeText={setValue} onSend={send} onAttach={fn()} replyTo={quoted ? { name: quoted.author.name, text: quoted.text } : null} onCancelReply={() => setReplyTo(null)} placeholder="Message Pearkit crew" />
      </>
    );
  },
};
