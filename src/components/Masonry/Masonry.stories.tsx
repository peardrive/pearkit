import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Masonry } from './Masonry';
import { MediaTile } from '../MediaTile/MediaTile';
import { Text } from '../Text/Text';
import { demoWall, type DemoMediaItem } from '../../stories/fixtures/browse';

const wall = demoWall(18);

function renderTile(item: DemoMediaItem) {
  return (
    <MediaTile
      source={item.source}
      kind={item.kind}
      aspectRatio={item.aspectRatio}
      title={item.title}
      meta={item.meta}
      badge={item.badge}
      onPress={() => {}}
    />
  );
}

const meta: Meta<typeof Masonry<DemoMediaItem>> = {
  title: 'Components/Masonry',
  component: Masonry,
  parameters: {
    docs: {
      description: {
        component:
          'A wall of mixed-height tiles in balanced columns — the browse layout of a media app. It only arranges: tiles come from `renderItem`, scrolling stays with the host, and the arrangement is the pure `masonryColumns()` (each item dealt to the shortest column so far, heights taken from `getAspectRatio`), which a virtualized or canvas host can call directly.',
      },
    },
  },
  argTypes: {
    columns: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    minColumnWidth: { control: { type: 'range', min: 120, max: 360, step: 10 } },
    gap: { control: { type: 'range', min: 0, max: 32, step: 2 } },
  },
  args: {
    items: wall,
    renderItem: renderTile,
    keyExtractor: (item: DemoMediaItem) => item.id,
    getAspectRatio: (item: DemoMediaItem) => item.aspectRatio,
    gap: 12,
  },
  decorators: [(Story) => <View style={{ width: 720 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Masonry<DemoMediaItem>>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <View className="gap-8">
      {([
        ['auto columns from minColumnWidth 180', { minColumnWidth: 180 }],
        ['three fixed columns', { columns: 3 }],
        ['tight: two columns, 6px gap', { columns: 2, gap: 6 }],
      ] as const).map(([label, props]) => (
        <View key={label} className="gap-2">
          <Text variant="micro">{label}</Text>
          <Masonry
            items={wall.slice(0, 10)}
            renderItem={renderTile}
            keyExtractor={(item) => item.id}
            getAspectRatio={(item) => item.aspectRatio}
            {...props}
          />
        </View>
      ))}
    </View>
  ),
};
