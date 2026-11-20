import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { ActivityFeed } from './ActivityFeed';
import { ActivityRow } from './ActivityRow';
import type { ActivityItem } from './activityLogic';
import { EmptyState } from '../EmptyState/EmptyState';
import { Column, Showcase } from '../../stories/helpers';

const NOW = Date.now();
const min = 60_000;
const hour = 60 * min;
const day = 24 * hour;

const ITEMS: ActivityItem[] = [
  { id: '1', ts: NOW - 2 * min, kind: 'approval', title: 'wants to run the release build', who: { id: 'pear', name: 'Pear', agent: true }, where: { org: 'PearDrive', project: 'Pearkit', conversation: 'Release 0.3' }, unread: true, action: { label: 'Approve', onPress: fn() } },
  { id: '2', ts: NOW - 9 * min, kind: 'mention', title: 'mentioned you: "can you check the light theme?"', who: { id: 'ana', name: 'Ana' }, where: { org: 'PearDrive', project: 'Pearkit', conversation: 'Chat pieces' }, unread: true },
  { id: '3', ts: NOW - 40 * min, kind: 'done', title: 'finished: ported the chat lab into the library', detail: '8 commits on feat/chat-shell', who: { id: 'pear', name: 'Pear', agent: true }, where: { org: 'PearDrive', project: 'Pearkit' }, action: { label: 'Open', onPress: fn() } },
  { id: '4', ts: NOW - 3 * hour, kind: 'file', title: 'added drag-bar.png and tablet-run.mov', who: { id: 'ana', name: 'Ana' }, where: { org: 'PearDrive', project: 'Pearkit', conversation: 'Chat pieces' } },
  { id: '5', ts: NOW - 5 * hour, kind: 'member', title: 'joined the project', who: { id: 'tomas', name: 'Tomás' }, where: { org: 'PearDrive', project: 'Pearkit' } },
  { id: '6', ts: NOW - day - hour, kind: 'conversation', title: 'started "Release 0.3"', who: { id: 'me', name: 'Guy' }, where: { org: 'PearDrive', project: 'Pearkit' } },
  { id: '7', ts: NOW - day - 2 * hour, kind: 'error', title: 'could not reach the Mac Mini', detail: 'The seat is paused until the device is back.', where: { project: 'Bitcoin Audible' }, action: { label: 'Retry', onPress: fn() } },
  { id: '8', ts: NOW - 3 * day, kind: 'note', title: 'The wiki space was created', where: { org: 'PearDrive', project: 'Pearkit' } },
  { id: '9', ts: NOW - 3 * day - hour, kind: 'project', title: 'started the project', who: { id: 'me', name: 'Guy' }, where: { org: 'PearDrive', project: 'Pearkit' } },
  { id: '10', ts: NOW - 4 * day, kind: 'publish', title: 'published release-notes.md to the space', who: { id: 'pear', name: 'Pear', agent: true }, where: { org: 'PearDrive', project: 'Pearkit' } },
  { id: '11', ts: NOW - 4 * day - hour, kind: 'proposal', title: 'proposed a change to the draft', who: { id: 'ana', name: 'Ana' }, where: { org: 'Bitcoin Audible', project: 'Show notes' }, action: { label: 'Review', onPress: fn() } },
  { id: '12', ts: NOW - 5 * day, kind: 'zap', title: 'zapped 2,100 sats', who: { id: 'tomas', name: 'Tomás' }, where: { org: 'Bitcoin Audible', project: 'Show notes' } },
];

const meta: Meta<typeof ActivityFeed> = {
  title: 'Components/ActivityFeed',
  component: ActivityFeed,
  parameters: {
    docs: {
      description: {
        component:
          'What needs you and what happened, one line each, newest first, in PearDrive\'s feed style: a tinted icon for the kind, who did what, where as a muted breadcrumb, the time at the right, an unread dot, and the action on the line when there is one. Days are labelled. Rules alone: `groupByDay`, `whenLabel`, `whereLabel`, `activityKindMeta`, `unreadCount`.',
      },
    },
  },
  args: { items: ITEMS, groupByDay: true, compact: false, showWhere: true, onOpen: fn(), onAction: fn() },
};
export default meta;
type Story = StoryObj<typeof ActivityFeed>;

/** A framed column, as the feed sits on the home screen. */
const framed = (height?: number) => [
  (Story: ComponentType) => (
    <View className="overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width: 560, height }}>
      <Story />
    </View>
  ),
];

export const Playground: Story = { decorators: framed() };

export const Compact: Story = { args: { compact: true, showWhere: false }, decorators: framed() };

export const Empty: Story = {
  args: { items: [], emptyState: <EmptyState icon="bell" title="Nothing needs you" description="Mentions, approvals and finished work show up here." /> },
  decorators: framed(320),
};

export const Rows: Story = {
  name: 'ActivityRow variants',
  render: () => (
    <Column width={560}>
      <Showcase title="Every kind">
        <View className="w-full rounded-card border border-overlay/[0.08]">
          {ITEMS.map((it, i) => (
            <ActivityRow key={it.id} item={{ ...it, unread: false, action: undefined }} divider={i < ITEMS.length - 1} />
          ))}
        </View>
      </Showcase>
      <Showcase title="Unread, with an action, pressable">
        <View className="w-full rounded-card border border-overlay/[0.08]">
          <ActivityRow item={ITEMS[0]!} onOpen={fn()} onAction={fn()} />
          <ActivityRow item={ITEMS[2]!} onOpen={fn()} divider={false} />
        </View>
      </Showcase>
      <Showcase title="Compact, inside one project (no breadcrumb)">
        <View className="w-full rounded-card border border-overlay/[0.08]">
          {ITEMS.slice(0, 4).map((it, i) => (
            <ActivityRow key={it.id} item={it} compact showWhere={false} divider={i < 3} />
          ))}
        </View>
      </Showcase>
    </Column>
  ),
};
