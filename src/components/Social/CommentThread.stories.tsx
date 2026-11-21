import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentThread } from './CommentThread';
import { CommentBox } from './CommentBox';
import { Showcase, Column } from '../../stories/helpers';
import { Text } from '../Text/Text';
import { formatLikers, toggleLiked, type CommentData } from '../../utils/social';

const NOW = Date.now();
const SAMPLE: CommentData[] = [
  { id: 'a', author: 'ada-key', name: 'Ada', at: NOW - 3 * 3600_000, text: 'Where was this taken?', likes: 2, liked: false },
  { id: 'b', author: 'bo-key', name: 'Bo', at: NOW - 2 * 3600_000, text: 'Up at the lake, last summer.', parent: 'a', likes: 1, liked: true },
  { id: 'c', author: 'ada-key', name: 'Ada', at: NOW - 3600_000, text: 'It looks colder than it was, then.', parent: 'b' },
  { id: 'd', author: 'cy-key', name: 'Cy', at: NOW - 20 * 60_000, text: 'the jump here', seconds: 65, where: 'Family', likes: 1200 },
  { id: 'e', author: 'di-key', name: null, at: NOW - 30_000, text: 'A long comment wraps under the name and keeps to its column, however many lines it runs to, so the heart and Reply always sit under the words they belong to.' },
];

const meta: Meta<typeof CommentThread> = {
  title: 'Conversation/CommentThread',
  component: CommentThread,
  parameters: { docs: { description: { component: 'The comments of a post or a file. Answers sit under their comment (an answer to an answer stays under the same comment and names who it answers). It takes comments and callbacks only: reading, sending and deleting are the app\'s. `CommentRow` is one comment, for an app with its own list; `commentTree()` is the order rule on its own.' } } },
  args: { comments: SAMPLE, onLike: () => {}, onReply: () => {}, onMenu: () => {} },
};
export default meta;
export const Playground: StoryObj<typeof CommentThread> = {
  decorators: [(Story) => <View className="h-[440px] w-[380px] rounded-card bg-pane px-4"><Story /></View>],
};

function Live() {
  const [list, setList] = useState(SAMPLE);
  const [text, setText] = useState('');
  const [reply, setReply] = useState<CommentData | null>(null);
  return (
    <View className="h-[520px] w-[380px] gap-2 rounded-card bg-pane p-4">
      <CommentThread
        comments={list}
        showWhere
        header={<Text variant="caption" tone="muted">{formatLikers(['Ada', 'Bo'], 5)}</Text>}
        onLike={(c) => setList((l) => l.map((x) => (x.id === c.id ? toggleLiked(x, !x.liked) : x)))}
        onReply={setReply}
        onMenu={(c) => setList((l) => l.filter((x) => x.id !== c.id))}
        onSeek={() => {}}
      />
      <CommentBox
        value={text}
        onChangeText={setText}
        replyTo={reply}
        onCancelReply={() => setReply(null)}
        onSend={() => {
          setList((l) => [...l, { id: String(l.length + 1) + Date.now(), author: 'me-key', name: 'Me', at: Date.now(), text: text.trim(), parent: reply?.id }]);
          setText(''); setReply(null);
        }}
      />
    </View>
  );
}

export const Variants: StoryObj<typeof CommentThread> = {
  render: () => (
    <Column>
      <Showcase title="A thread with its box (the menu mark removes a comment here)"><Live /></Showcase>
      <Showcase title="Empty">
        <View className="h-32 w-[380px] rounded-card bg-pane px-4"><CommentThread comments={[]} /></View>
      </Showcase>
      <Showcase title="Could not be read">
        <View className="h-32 w-[380px] rounded-card bg-pane px-4"><CommentThread comments={null} emptyLabel="The comments could not be read." /></View>
      </Showcase>
      <Showcase title="Read only (no callbacks)">
        <View className="h-56 w-[380px] rounded-card bg-pane px-4"><CommentThread comments={SAMPLE.slice(0, 3)} /></View>
      </Showcase>
    </Column>
  ),
};
