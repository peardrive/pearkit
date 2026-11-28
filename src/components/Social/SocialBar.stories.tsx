import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialBar } from './SocialBar';
import { Showcase, Column } from '@/stories/helpers';
import { toggleLiked, type SocialCounts } from '@/utils/social';

const meta: Meta<typeof SocialBar> = {
  title: 'Conversation/SocialBar',
  component: SocialBar,
  parameters: { docs: { description: { component: 'Like, comment and share under a post: icons alone, each with its number once there is one. The heart fills in the primary colour when the like is yours. `vertical` is the rail over a full-screen picture or video. The bar keeps no numbers of its own: the app hands in `counts` and changes them.' } } },
  args: { counts: { likes: 12, liked: false, comments: 3 }, onLike: () => {}, onComment: () => {}, onShare: () => {} },
};
export default meta;
export const Playground: StoryObj<typeof SocialBar> = {};

function Live({ vertical }: { vertical?: boolean }) {
  const [c, setC] = useState<SocialCounts>({ likes: 1299, liked: false, comments: 48 });
  return <SocialBar vertical={vertical} color={vertical ? '#fff' : undefined} counts={c} onLike={() => setC((v) => toggleLiked(v, !v.liked))} onComment={() => {}} onShare={() => {}} />;
}

export const Variants: StoryObj<typeof SocialBar> = {
  render: () => (
    <Column>
      <Showcase title="Nothing yet"><SocialBar counts={{ likes: 0, liked: false, comments: 0 }} onLike={() => {}} onComment={() => {}} onShare={() => {}} /></Showcase>
      <Showcase title="Liked, with numbers"><SocialBar counts={{ likes: 7, liked: true, comments: 2 }} onLike={() => {}} onComment={() => {}} onShare={() => {}} /></Showcase>
      <Showcase title="Large numbers (tap the heart)"><Live /></Showcase>
      <Showcase title="Numbers not read yet"><SocialBar onLike={() => {}} onComment={() => {}} onShare={() => {}} /></Showcase>
      <Showcase title="Nothing to like or comment on (counts null)"><SocialBar counts={null} onShare={() => {}} /></Showcase>
      <Showcase title="Vertical, over a picture">
        <View className="h-80 w-48 items-end justify-end rounded-card bg-[#1d2733] p-4"><Live vertical /></View>
      </Showcase>
    </Column>
  ),
};
