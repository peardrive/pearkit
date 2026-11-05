import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';
import { iconNames } from '../../icons/registry';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { docs: { description: { component: 'Placeholder for empty lists, no selection or search misses.' } } },
  argTypes: { icon: { control: 'select', options: iconNames } },
  args: { icon: 'folder-open', title: 'Nothing here yet', description: 'Send a file or folder and it will show up here.' },
  decorators: [(Story) => <View style={{ width: 360, height: 320 }} className="rounded-card border border-overlay/[0.06]"><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof EmptyState> = {};
export const WithActions: StoryObj<typeof EmptyState> = {
  name: 'With actions',
  args: { actions: <><Button size="sm" variant="primary" icon="arrow-up" label="Send" /><Button size="sm" variant="secondary" icon="arrow-down" label="Receive" /></> },
};
export const NoResults: StoryObj<typeof EmptyState> = { name: 'No results', args: { icon: 'search-normal', title: 'No matches', description: 'No shares match “holiday”.' } };
