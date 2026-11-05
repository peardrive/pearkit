import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { PaneHeader } from './PaneHeader';
import { IconButton } from '../IconButton/IconButton';

const meta: Meta<typeof PaneHeader> = {
  title: 'Components/PaneHeader',
  component: PaneHeader,
  parameters: { docs: { description: { component: 'Title, subtitle and icon actions at the top of a pane. Pass `actions` as data (rendered as tooltip-ed `IconButton`s) or any nodes; `leading` adds e.g. a back button on mobile.' } } },
  args: {
    title: 'All Shares',
    subtitle: '12 items · 2 transferring',
    actions: [{ icon: 'sort', label: 'Sort', onPress: fn() }, { icon: 'filter', label: 'Filter', onPress: fn() }, { icon: 'more', label: 'More', onPress: fn() }],
  },
  decorators: [(Story) => <View style={{ width: 360 }} className="rounded-card bg-pane"><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof PaneHeader> = {};
export const MobileScreen: StoryObj<typeof PaneHeader> = {
  name: 'Mobile screen (back button)',
  args: {
    size: 'display',
    title: 'photo_2.mp4',
    subtitle: undefined,
    leading: <IconButton icon="chevron-left" size="sm" accessibilityLabel="Back" className="-ml-2 mr-1" />,
    actions: [{ icon: 'more', label: 'More' }],
  },
};
