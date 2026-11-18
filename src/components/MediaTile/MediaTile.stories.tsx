import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { MediaTile } from './MediaTile';
import { Text } from '../Text/Text';
import { demoWall } from '../../stories/fixtures/browse';

const [dusk, harbor, ridge] = demoWall(3, 3);

const meta: Meta<typeof MediaTile> = {
  title: 'Components/MediaTile',
  component: MediaTile,
  parameters: {
    docs: {
      description: {
        component:
          'One tile of a media wall: the picture, a corner badge, title and meta on a scrim, a selection ring — and a `preview` slot that lights up under the pointer. The tile never owns playback: the host mounts its own player into `preview` from `onHoverChange`, the same division of labour as `Filmstrip`. Lay a wall of them out with `Masonry`.',
      },
    },
  },
  argTypes: {
    aspectRatio: { control: { type: 'range', min: 0.4, max: 2.5, step: 0.05 } },
    radius: { control: { type: 'range', min: 0, max: 16, step: 1 } },
    reveal: { control: 'inline-radio', options: ['auto', 'hover', 'always'] },
    kind: { control: 'select', options: ['video', 'image', 'audio', 'document', 'folder', 'file'] },
  },
  args: {
    source: dusk.source,
    title: dusk.title,
    meta: dusk.meta,
    badge: dusk.badge ?? '4:29',
    aspectRatio: 16 / 9,
    reveal: 'always',
  },
  decorators: [(Story) => <View style={{ width: 300 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof MediaTile>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <View className="w-[640px] flex-row flex-wrap gap-5">
      {([
        ['video · badge · hover for info', { source: dusk.source, title: dusk.title, meta: dusk.meta, badge: '4:29', onPress: () => {} }],
        ['info always on', { source: harbor.source, title: harbor.title, meta: harbor.meta, reveal: 'always' as const, onPress: () => {} }],
        ['selected', { source: ridge.source, title: ridge.title, meta: ridge.meta, badge: '12:04', reveal: 'always' as const, selected: true, onPress: () => {} }],
        ['favorite · portrait', { source: harbor.source, aspectRatio: 2 / 3, favorite: true, onPress: () => {} }],
        ['no picture yet: the kind icon', { source: null, kind: 'video' as const, title: 'Rendering…', reveal: 'always' as const }],
        ['audio kind', { source: null, kind: 'audio' as const, title: 'Ember session', meta: '38:12', reveal: 'always' as const }],
      ] as const).map(([label, props]) => (
        <View key={label} className="w-[300px] gap-1.5">
          <Text variant="micro">{label}</Text>
          <MediaTile aspectRatio={16 / 9} {...props} />
        </View>
      ))}
    </View>
  ),
};

/** The preview slot: whatever the host renders while hovered sits over the picture. */
export const HoverPreview: Story = {
  render: function HoverPreviewStory() {
    const [hovered, setHovered] = React.useState(false);
    return (
      <View className="w-[300px] gap-1.5">
        <Text variant="micro">hover me — the host swaps in its player</Text>
        <MediaTile
          source={dusk.source}
          title={dusk.title}
          meta={dusk.meta}
          badge="4:29"
          onHoverChange={setHovered}
          preview={hovered ? (
            <View className="flex-1 items-center justify-center bg-background/60">
              <Text variant="caption" weight="semibold">host preview playing…</Text>
            </View>
          ) : null}
          onPress={() => {}}
        />
      </View>
    );
  },
};
