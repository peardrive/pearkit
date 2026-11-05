import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Thumbnail, fileKindMeta, type FileKind } from './Thumbnail';
import { images } from '../../stories/fixtures/shares';
import { Column, Showcase } from '../../stories/helpers';
import { Text } from '../Text/Text';

const meta: Meta<typeof Thumbnail> = {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  parameters: { docs: { description: { component: 'File preview tile. Shows an image when you have one, otherwise a tinted icon for the file kind (`fileKindMeta`). Corner radius scales with size unless set.' } } },
  argTypes: { kind: { control: 'select', options: Object.keys(fileKindMeta) }, size: { control: { type: 'range', min: 24, max: 120, step: 2 } } },
  args: { kind: 'folder', size: 40 },
};
export default meta;
type Story = StoryObj<typeof Thumbnail>;
export const Playground: Story = {};
export const Kinds: Story = {
  render: () => (
    <Column>
      <Showcase title="Fallbacks">
        {(Object.keys(fileKindMeta) as FileKind[]).map((k) => (
          <View key={k} className="items-center gap-1.5"><Thumbnail kind={k} /><Text variant="micro">{k}</Text></View>
        ))}
      </Showcase>
      <Showcase title="Images">
        <Thumbnail source={images.videoDusk} kind="video" />
        <Thumbnail source={images.photoHarbor} kind="image" />
        <Thumbnail source={images.albumEmber} kind="audio" />
        <Thumbnail source={images.videoDusk} size={68} radius={16} bordered />
      </Showcase>
    </Column>
  ),
};
