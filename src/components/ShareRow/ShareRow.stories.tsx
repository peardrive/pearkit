import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { ShareRow } from './ShareRow';
import { shareStatusMeta } from '../Status/status';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { images, shareMeta, shares } from '../../stories/fixtures/shares';

const meta: Meta<typeof ShareRow> = {
  title: 'Patterns/ShareRow',
  component: ShareRow,
  parameters: {
    docs: { description: { component: 'List row for a share (file or folder) — mirrors the Figma “Share Row” component: toggle `progress` for in-flight transfers and `favorite` for starred items. Status pill, timestamp or an inline action (Retry) on the right.' } },
  },
  argTypes: {
    status: { control: 'select', options: Object.keys(shareStatusMeta) },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
  args: {
    name: 'photo_2.mp4',
    meta: ['Video', '1.2 GB', '3 peers'],
    thumbnail: { source: images.videoDusk, kind: 'video' },
    status: 'sharing',
    progress: 0.98,
    timestamp: 'now',
    selected: true,
    onPress: fn(),
  },
  decorators: [(Story) => <View style={{ width: 336 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof ShareRow>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <View className="gap-0.5">
      <ShareRow name="photo_2.mp4" meta={['Video', '1.2 GB', '3 peers']} thumbnail={{ source: images.videoDusk }} status="sharing" progress={0.98} timestamp="now" selected />
      <ShareRow name="Personal 01" meta={['Folder', '2 files', '0.8 GB']} thumbnail={{ kind: 'folder' }} status="sharing" progress={0.54} timestamp="now" />
      <ShareRow name="Personal" meta={['Folder', '12 files', '4.5 GB']} thumbnail={{ kind: 'folder' }} favorite status="active" timestamp="2h" />
      <ShareRow name="photo_03.jpg" meta={['Picture', '126 KB']} thumbnail={{ source: images.photoRidge }} status="failed" action={{ label: 'Retry', onPress: fn() }} />
      <ShareRow name="Fallout.mp3" meta={['Music', '8.4 MB']} thumbnail={{ source: images.albumEmber }} status="completed" timestamp="Jul 2" />
      <ShareRow name="photo_04.jpg" meta={['Picture', '210 KB']} thumbnail={{ source: images.photoHarbor }} status="inactive" timestamp="Jul 1" />
      <ShareRow name="notes.pdf" meta={['Document', '84 KB']} thumbnail={{ kind: 'document' }} status="receiving" progress={0.31} timestamp="now" />
    </View>
  ),
};

/** Selectable list with group headers, fed from fixtures. */
export const List: Story = {
  render: () => {
    const [selected, setSelected] = useState('photo_2');
    return (
      <View className="gap-0.5 rounded-card bg-pane p-3">
        <SectionLabel inset="list" label="In progress" count={2} />
        {shares.map((s, i) => (
          <View key={s.id}>
            {i === 2 ? <SectionLabel inset="list" label="Recent" /> : null}
            <ShareRow
              name={s.name}
              meta={shareMeta(s)}
              thumbnail={{ source: s.image, kind: s.kind }}
              favorite={s.favorite}
              progress={s.progress}
              status={s.status}
              timestamp={s.time}
              action={s.status === 'failed' ? { label: 'Retry', onPress: fn() } : undefined}
              selected={selected === s.id}
              onPress={() => setSelected(s.id)}
            />
          </View>
        ))}
      </View>
    );
  },
};
