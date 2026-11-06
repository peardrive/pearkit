import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { View } from 'react-native';
import { FolderTabPage, FolderTabs, type FolderTab } from './FolderTabs';
import { IconButton } from '../IconButton/IconButton';
import { KeyValueList } from '../KeyValueList/KeyValueList';
import { Text } from '../Text/Text';

const PAGES: FolderTab[] = [
  { value: 'video', label: 'Video', icon: 'video' },
  { value: 'audio', label: 'Audio', icon: 'music' },
  { value: 'layers', label: 'Layers', icon: 'grid-1', count: 3 },
];

const meta: Meta<typeof FolderTabs> = {
  title: 'Components/FolderTabs',
  component: FolderTabs,
  parameters: {
    docs: {
      description: {
        component:
          'Folder tabs: the open tab is lit and opens straight into its page; the page edge runs on from the tab, across the top, round the corners and fades down the sides. Use it wherever a panel splits into pages. `FolderTabPage` is the framed page on its own.',
      },
    },
  },
  args: { tabs: PAGES, value: 'video' },
  decorators: [(Story) => <View style={{ width: 380 }}><Story /></View>],
};
export default meta;

function Controlled(props: Partial<React.ComponentProps<typeof FolderTabs>>) {
  const [value, setValue] = useState(props.value ?? 'video');
  return (
    <FolderTabs tabs={PAGES} {...props} value={value} onChange={setValue}>
      <View className="h-[180px] justify-center gap-1 px-2">
        <Text variant="body-lg">{PAGES.find((p) => p.value === value)?.label}</Text>
        <Text variant="caption">The page of the open tab.</Text>
      </View>
    </FolderTabs>
  );
}

export const Playground: StoryObj<typeof FolderTabs> = { render: (args) => <Controlled {...args} /> };

export const WithTrailing: StoryObj<typeof FolderTabs> = {
  name: 'With a trailing action',
  render: () => <Controlled trailing={<IconButton icon="search-normal" size="sm" accessibilityLabel="Search" />} />,
};

export const ManyTabs: StoryObj<typeof FolderTabs> = {
  name: 'More tabs than room',
  render: () => {
    const many: FolderTab[] = ['Main', 'Favorites', 'Kit', 'Sources', 'Recorded', 'Exports'].map((l) => ({ value: l.toLowerCase(), label: l }));
    const [value, setValue] = useState('main');
    return (
      <FolderTabs tabs={many} value={value} onChange={setValue}>
        <View className="h-[140px]" />
      </FolderTabs>
    );
  },
};

export const PageOnItsOwn: StoryObj<typeof FolderTabPage> = {
  name: 'FolderTabPage on its own',
  render: () => (
    <FolderTabPage squareTopLeft={false}>
      <KeyValueList items={[{ label: 'Format', value: '16:9' }, { label: 'Length', value: '00:12:40' }]} />
    </FolderTabPage>
  ),
};
