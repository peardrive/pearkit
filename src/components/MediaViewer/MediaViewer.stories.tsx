import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Attachments } from '../Chat/Attachments';
import type { ChatAttachment } from '../Chat/types';
import { MediaViewer } from './MediaViewer';

const PIC = (hue: number, w = 640, h = 480) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="hsl(${hue} 50% 40%)"/><circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) / 4}" fill="hsl(${hue + 40} 70% 70%)"/></svg>`)}`;

const ITEMS: ChatAttachment[] = [
  { name: 'contact-sheet.png', url: PIC(90, 1024, 768), size: 444_385, width: 1024, height: 768 },
  { name: '01-horizon-leaf_1024.png', url: PIC(140, 1024, 1024), size: 83_844, width: 1024, height: 1024 },
  { name: 'tablet-run.mov', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail: PIC(200, 640, 360), size: 42_300_000, kind: 'video' },
  { name: 'notes.pdf', url: '#', size: 120_000 },
  { name: 'voice memo', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', mime: 'audio/mpeg', size: 90_000, kind: 'audio' },
  { name: 'extra-1.png', url: PIC(20), size: 10_000 },
  { name: 'extra-2.png', url: PIC(300), size: 10_000 },
];

function Demo({ items }: { items: ChatAttachment[] }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <View className="gap-3 p-4" style={{ maxWidth: 420 }}>
      <Attachments items={items} onOpen={(_, i) => setIndex(i)} />
      <Button size="sm" variant="secondary" label="Open the first" onPress={() => setIndex(0)} />
      <MediaViewer open={index !== null} items={items} index={index ?? 0} onIndexChange={setIndex} onClose={() => setIndex(null)} onShare={(a) => alert(`share ${a.name}`)} />
    </View>
  );
}

const meta: Meta<typeof Demo> = { title: 'Components/MediaViewer', component: Demo, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof Demo>;

/** A message's pictures and files; a press opens the viewer, arrows and swipes page through the media. */
export const Gallery: Story = { args: { items: ITEMS } };
export const OnePicture: Story = { args: { items: ITEMS.slice(0, 1) } };
export const TwoPictures: Story = { args: { items: ITEMS.slice(0, 2) } };
export const ThreeWithAVideo: Story = { args: { items: ITEMS.slice(0, 3) } };
export const FilesOnly: Story = { args: { items: [ITEMS[3]!, ITEMS[4]!] } };
