import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, Pressable, View } from 'react-native';
import { fn } from 'storybook/test';

import { Text } from '@/components/Text/Text';
import { Column, Showcase } from '@/stories/helpers';
import albumEmber from '@/stories/assets/album-ember.jpg';
import photoHarbor from '@/stories/assets/photo-harbor.jpg';
import photoRidge from '@/stories/assets/photo-ridge.jpg';
import videoDusk from '@/stories/assets/video-dusk.jpg';
import { PlayerIcon } from '@/components/MediaPlayer/PlayerIcon';
import { describeShareState } from '@/components/ShareState/shareState';
import { DownloadPie } from './DownloadPie';
import { FileThumb } from './FileRows';
import { FileViewIcon, fileViewIconNames } from './FileViewIcon';
import { FileViews, useFileItems } from './FileViews';
import { ViewMenu } from './ViewMenu';
import { ViewSwitcher } from './ViewSwitcher';
import {
  downloadPie,
  transferBar,
  transferStatus,
  transferTone,
  type FileReader,
  type FileSource,
  type FileViewItem,
  type FileViewMode,
  type TransferReading,
} from './fileViewLogic';

const PAUSED = describeShareState({ kind: 'paused', percent: 61 });

const up = (percent: number, done = false): TransferReading => ({ direction: 'up', percent, done });
const down = (percent: number, done = false): TransferReading => ({ direction: 'down', percent, done });

/** A file whose status line and pie both come from one reading of its transfer. */
function moving(
  item: Omit<FileViewItem, 'status' | 'shortStatus' | 'download' | 'tone' | 'bar'>,
  reading: TransferReading
): FileViewItem {
  return {
    ...item,
    status: transferStatus(reading),
    shortStatus: transferStatus(reading, { short: true }),
    download: downloadPie(reading),
    tone: transferTone(reading),
    bar: transferBar(reading),
  };
}

const FILES: FileViewItem[] = [
  moving(
    { id: 'a', name: 'Harbour at dusk.mp4', kind: 'video', thumbnail: videoDusk, detail: '1.2 GB' },
    down(37)
  ),
  moving(
    { id: 'b', name: 'Ridge photo.jpg', kind: 'image', thumbnail: photoRidge, detail: '4.1 MB' },
    up(12)
  ),
  moving(
    { id: 'c', name: 'Ember (album).m4a', kind: 'audio', thumbnail: albumEmber, detail: '9.8 MB' },
    up(100, true)
  ),
  moving(
    { id: 'd', name: 'Lease agreement 2026 signed copy.pdf', kind: 'document', detail: '310 KB' },
    down(100, true)
  ),
  moving({ id: 'e', name: 'Interview take 3.mov', kind: 'video', detail: '842 MB' }, down(4)),
  moving(
    { id: 'f', name: 'Harbour.jpg', kind: 'image', thumbnail: photoHarbor, detail: '2.6 MB' },
    down(100, true)
  ),
  moving({ id: 'g', name: 'Family photos', kind: 'folder', detail: '12 files' }, up(100, true)),
  moving({ id: 'h', name: 'Test tone.m4a', kind: 'audio', detail: '120 KB' }, down(88)),
  {
    id: 'i',
    name: 'backup-2026-11.zip',
    kind: 'file',
    status: PAUSED.label,
    shortStatus: PAUSED.shortLabel,
    tone: PAUSED.tone,
    bar: PAUSED.bar,
    download: 0.61,
    detail: '3.4 GB',
  },
  moving({ id: 'j', name: 'Notes.txt', kind: 'document', detail: '2 KB' }, down(100, true)),
  { id: 'k', name: 'Old share.mp4', kind: 'video', status: 'Off', dim: true, detail: '75 MB' },
  moving({ id: 'l', name: 'Dawn.png', kind: 'image', thumbnail: photoRidge, detail: '6.0 MB' }, up(64)),
];

type DemoProps = {
  mode: FileViewMode;
  columns: number;
  compact: boolean;
  menu: boolean;
  width: number;
  height: number;
  onOpen: (item: FileViewItem) => void;
  onMore: (item: FileViewItem) => void;
};

/** A phone-shaped frame with the switcher in a toolbar and the files under it. */
function Demo({ mode: startMode, columns, compact, menu, width, height, onOpen, onMore }: DemoProps) {
  const [mode, setMode] = useState(startMode);
  useEffect(() => setMode(startMode), [startMode]);
  return (
    <View style={{ width, height, backgroundColor: '#0f1110', borderRadius: 28, overflow: 'hidden' }}>
      <View
        style={{
          paddingHorizontal: 14,
          paddingTop: 18,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="title">Files</Text>
        {menu ? (
          <ViewMenu value={mode} onChange={setMode} cover={Modal} accent="#a8cf3a" />
        ) : (
          <ViewSwitcher value={mode} onChange={setMode} compact={compact} accent="#a8cf3a" onAccent="#111" />
        )}
      </View>
      <FileViews
        items={FILES}
        mode={mode}
        columns={columns}
        onOpen={onOpen}
        onMore={onMore}
        bottomRoom={24}
      />
    </View>
  );
}

const meta: Meta<typeof Demo> = {
  title: 'Files & sharing/FileViews',
  component: Demo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The same files shown three ways: a tight **list** (like a folder in Finder), the roomy **expanded** list, and a **grid** of five across. One switcher chooses; every view draws from the same file record, so nothing is lost by switching. A file that is still arriving has a **pie** over its picture; an upload says how far it is in its status line ("Uploading 12%", then "Sharing").',
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['list', 'expanded', 'grid'] },
    columns: { control: { type: 'number', min: 2, max: 8 }, description: 'Pictures across in the grid.' },
    compact: { control: 'boolean', description: 'One button that steps through the views.' },
    menu: { control: 'boolean', description: 'One button that drops a list of the views.' },
    width: { control: { type: 'number', min: 320, max: 820 } },
    height: { control: { type: 'number', min: 480, max: 960 } },
  },
  args: {
    mode: 'expanded',
    columns: 5,
    compact: false,
    menu: false,
    width: 390,
    height: 760,
    onOpen: fn(),
    onMore: fn(),
  },
};
export default meta;
type Story = StoryObj<typeof Demo>;

/** Press the three icons at the top right to change the view. */
export const Playground: Story = {};

/** One tight line for each file: a small picture, the name, the state. */
export const List: Story = { args: { mode: 'list' } };

/** The roomy list. PearDrop keeps its own row here; this is the row other apps start from. */
export const Expanded: Story = { args: { mode: 'expanded' } };

/** Five across, with the name and the state in two small lines under each picture. */
export const Grid: Story = { args: { mode: 'grid' } };

/** One button for a toolbar that needs its width: press it and the views drop down in a short list. PearDrop uses this. */
export const DropDown: Story = { args: { mode: 'expanded', menu: true } };

/** Where a toolbar has no room for three buttons: one, which steps to the next view. */
export const OneButton: Story = { args: { mode: 'grid', compact: true } };

/** The icons of the views, the icons that stand in for a file with no picture, and the two player icons redrawn with them. */
export const Icons: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Column>
      <Showcase title="The three views, at the sizes they are used" className="gap-8">
        {([16, 20, 24, 32, 48] as const).map((size) => (
          <View key={size} style={{ alignItems: 'center', gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: size * 0.6, alignItems: 'center' }}>
              <FileViewIcon name="view-list" size={size} />
              <FileViewIcon name="view-expanded" size={size} />
              <FileViewIcon name="view-grid" size={size} />
            </View>
            <Text variant="caption">{size} pt</Text>
          </View>
        ))}
      </Showcase>
      <Showcase title="The switcher" className="gap-8">
        <SwitcherDemo />
        <SwitcherDemo compact />
      </Showcase>
      <Showcase title="Every file view icon" className="gap-5">
        {fileViewIconNames.map((name) => (
          <View key={name} style={{ width: 96, alignItems: 'center', gap: 8 }}>
            <FileViewIcon name={name} size={32} />
            <Text variant="caption">{name}</Text>
          </View>
        ))}
      </Showcase>
      <Showcase title="Player icons redrawn in this round" className="gap-8">
        {(['speed', 'turn-auto'] as const).map((name) => (
          <View key={name} style={{ alignItems: 'center', gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 18, alignItems: 'center' }}>
              <PlayerIcon name={name} size={20} />
              <PlayerIcon name={name} size={32} />
              <PlayerIcon name={name} size={64} />
            </View>
            <Text variant="caption">
              {name === 'speed' ? 'speed (the rabbit, in profile)' : 'turn-auto (even arrow head)'}
            </Text>
          </View>
        ))}
      </Showcase>
    </Column>
  ),
};

function SwitcherDemo({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<FileViewMode>('expanded');
  return (
    <View style={{ alignItems: 'center', gap: 8 }}>
      <ViewSwitcher value={mode} onChange={setMode} compact={compact} accent="#a8cf3a" onAccent="#111" />
      <Text variant="caption">{compact ? 'one button' : 'three buttons'}</Text>
    </View>
  );
}

const PIE_STEPS = [0, 12, 37, 62, 88] as const;

/** The pie over a file that is arriving, at the sizes of the three views. An upload never has one. */
export const DownloadingPie: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Column>
      {(
        [
          ['Grid tile', 66],
          ['Expanded row', 48],
          ['List line', 24],
        ] as const
      ).map(([title, size]) => (
        <Showcase key={title} title={`${title} (${size} pt)`} className="gap-5">
          {PIE_STEPS.map((percent) => (
            <View key={percent} style={{ alignItems: 'center', gap: 6 }}>
              <FileThumb
                item={{
                  id: String(percent),
                  name: 'a.jpg',
                  kind: 'image',
                  thumbnail: photoHarbor,
                  download: percent / 100,
                }}
                size={size}
              />
              <Text variant="caption">{percent}%</Text>
            </View>
          ))}
          <View style={{ alignItems: 'center', gap: 6 }}>
            <FileThumb item={{ id: 'x', name: 'a.mov', kind: 'video', download: 0.5 }} size={size} />
            <Text variant="caption">no picture</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 6 }}>
            <FileThumb item={{ id: 'y', name: 'a.jpg', kind: 'image', thumbnail: photoHarbor }} size={size} />
            <Text variant="caption">arrived</Text>
          </View>
        </Showcase>
      ))}
      <Showcase title="By itself, over anything an app draws">
        <View style={{ width: 120, height: 120, borderRadius: 24, backgroundColor: '#35508a' }}>
          <DownloadPie fraction={0.7} size={120} radius={24} />
        </View>
      </Showcase>
    </Column>
  ),
};

const WORDING: [string, TransferReading][] = [
  ['Giving a file, 12% sent', up(12)],
  ['Giving a file, all of it sent', up(100, true)],
  ['Taking a file, 12% here', down(12)],
  ['Taking a file, all of it here', down(100, true)],
  ['Taking a file, size not known yet', { direction: 'down', percent: null, done: false }],
];

/** The status line is one state at a time, never a chain of them. */
export const StatusWording: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Column width={460}>
      {WORDING.map(([what, reading]) => (
        <View key={what} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 24 }}>
          <Text variant="caption">{what}</Text>
          <Text>{transferStatus(reading)}</Text>
        </View>
      ))}
    </Column>
  ),
};

// A stand-in for what an app writes once: something that lists a folder, and something that
// lists a key on the network. Here both answer from memory, a moment late.
const PLACES: Record<string, FileViewItem[]> = {
  'disk:/Downloads': FILES.filter((file) => file.download == null).slice(0, 6),
  'hyperdrive:9f3c…e21a': FILES.slice(0, 5),
  'pearcore:space-family': FILES.slice(5, 10),
};
const demoReader: FileReader = {
  list: (source) =>
    new Promise((resolve) => {
      const key = source.from === 'disk' ? `disk:${source.folder}` : `${source.network}:${source.key}`;
      setTimeout(() => resolve(PLACES[key] ?? []), 350);
    }),
};
const SOURCES: [string, FileSource][] = [
  ['A folder on this device', { from: 'disk', folder: '/Downloads' }],
  ['A Hyperdrive key', { from: 'key', key: '9f3c…e21a', network: 'hyperdrive' }],
  ['A pearcore space', { from: 'key', key: 'space-family', network: 'pearcore' }],
];

function FromAPlaceDemo() {
  const [at, setAt] = useState(0);
  const source = useMemo(() => SOURCES[at]?.[1] ?? null, [at]);
  const { items, loading } = useFileItems(demoReader, source);
  const [mode, setMode] = useState<FileViewMode>('grid');
  return (
    <View
      style={{ width: 390, height: 620, backgroundColor: '#0f1110', borderRadius: 28, overflow: 'hidden' }}
    >
      <View style={{ padding: 14, gap: 10 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {SOURCES.map(([label], index) => (
            <Pressable
              key={label}
              onPress={() => setAt(index)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: index === at ? '#a8cf3a' : 'rgba(255,255,255,0.10)',
              }}
            >
              <Text variant="caption" style={{ color: index === at ? '#111' : '#fff' }}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="caption">{loading ? 'Reading…' : `${items.length} files`}</Text>
          <ViewSwitcher value={mode} onChange={setMode} accent="#a8cf3a" onAccent="#111" size={28} />
        </View>
      </View>
      <FileViews items={items} mode={mode} />
    </View>
  );
}

/**
 * The views do not care where files come from. An app writes one reader for each kind of place
 * (a folder, a Hyperdrive key, a pearcore space) and `useFileItems` keeps the list current.
 */
export const FromAPlace: Story = { render: () => <FromAPlaceDemo /> };
