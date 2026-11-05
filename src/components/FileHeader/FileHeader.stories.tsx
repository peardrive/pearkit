import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { FileHeader } from './FileHeader';
import { shareStatusMeta } from '../Status/status';
import { images } from '../../stories/fixtures/shares';

const meta: Meta<typeof FileHeader> = {
  title: 'Patterns/FileHeader',
  component: FileHeader,
  parameters: { docs: { description: { component: 'Hero block for the detail pane: 68px preview, display title, meta line and status. `layout="vertical"` centres everything for mobile.' } } },
  argTypes: { status: { control: 'select', options: Object.keys(shareStatusMeta) }, layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  args: { title: 'photo_2.mp4', meta: ['Video', '1.2 GB', 'Added Jul 01, 2026'], thumbnail: { source: images.videoDusk, kind: 'video' }, status: 'sharing' },
  decorators: [(Story) => <View style={{ width: 520 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof FileHeader>;
export const Playground: Story = {};
export const Folder: Story = { args: { title: 'Personal', meta: ['Folder', '12 files', '4.5 GB'], thumbnail: { kind: 'folder' }, status: 'active' } };
export const Vertical: Story = { args: { layout: 'vertical', status: 'completed' }, decorators: [(Story) => <View style={{ width: 340 }}><Story /></View>] };
