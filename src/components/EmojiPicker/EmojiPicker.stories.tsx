import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { DEFAULT_QUICK_EMOJI, EmojiBar, EmojiPicker, pushRecent } from './EmojiPicker';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const meta: Meta<typeof EmojiPicker> = {
  title: 'Components/EmojiPicker',
  component: EmojiPicker,
  parameters: {
    docs: {
      description: {
        component:
          'The full emoji list in a pop-up window, built like `Menu`: a search field, the recent row first, then the categories, eight to a row in 44 px cells. `EmojiBar` is the quick row — a few emoji in a pill and a + for the rest. The list and the search are pure data in `emoji.ts` (`EMOJI_CATEGORIES`, `searchEmoji`, `pushRecent`, `DEFAULT_QUICK_EMOJI`).',
      },
    },
  },
  args: { onPick: fn(), onClose: fn(), recent: ['🍐', '🎉', '👀'] },
};
export default meta;
type Story = StoryObj<typeof EmojiPicker>;

function Demo({ recent: initial = [] as string[], anchored = true }: { recent?: string[]; anchored?: boolean }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | undefined>();
  const [recent, setRecent] = useState(initial);
  const [picked, setPicked] = useState<string[]>([]);
  const button = useRef<React.ComponentRef<typeof View>>(null);
  const openIt = () => {
    if (anchored && button.current) button.current.measureInWindow((x, y, _w, h) => { setAnchor({ x, y: y + h + 4 }); setOpen(true); });
    else { setAnchor(undefined); setOpen(true); }
  };
  const pick = (em: string) => {
    setPicked((p) => [...p, em]);
    setRecent((r) => pushRecent(r, em));
  };
  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-3">
        <View ref={button} collapsable={false}>
          <Button label={anchored ? 'Pick an emoji' : 'Pick, in the middle'} variant="secondary" onPress={openIt} />
        </View>
        <EmojiBar emojis={recent.length ? recent.slice(0, 6) : DEFAULT_QUICK_EMOJI} onPick={pick} onMore={openIt} />
      </View>
      <Text variant="body-lg">{picked.join(' ') || ' '}</Text>
      <EmojiPicker open={open} onClose={() => setOpen(false)} onPick={pick} recent={recent} anchor={anchor} />
    </View>
  );
}

export const Playground: Story = { render: (args) => <Demo recent={args.recent} /> };

export const Variants: Story = {
  render: () => (
    <Column>
      <Showcase title="Quick row, md and sm">
        <EmojiBar emojis={DEFAULT_QUICK_EMOJI} onPick={fn()} onMore={fn()} />
        <EmojiBar emojis={DEFAULT_QUICK_EMOJI} onPick={fn()} onMore={fn()} size="sm" />
        <EmojiBar emojis={['🍐', '✅', '🔥']} onPick={fn()} size="sm" />
      </Showcase>
      <Showcase title="The list hung from a button, with recent ones">
        <Demo recent={['🍐', '🎉', '👀', '✅']} />
      </Showcase>
      <Showcase title="The list in the middle, nothing recent">
        <Demo anchored={false} />
      </Showcase>
    </Column>
  ),
};

/** The panel open, for a look (search for "party"). */
export const Open: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <View className="gap-3">
        <Button label="Open" variant="secondary" onPress={() => setOpen(true)} className="self-start" />
        <EmojiPicker open={open} onClose={() => setOpen(false)} onPick={fn()} recent={['🍐', '🎉', '👀']} anchor={{ x: 24, y: 60 }} />
      </View>
    );
  },
};
