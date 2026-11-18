import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { fn } from 'storybook/test';
import { Menu, MenuButton, type MenuItem } from './Menu';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const ITEMS: MenuItem[] = [
  { key: 'reply', label: 'Reply', icon: 'message', shortcut: 'R', onSelect: fn() },
  { key: 'copy', label: 'Copy text', icon: 'copy', shortcut: '⌘C', onSelect: fn() },
  { key: 'link', label: 'Copy link', icon: 'link', onSelect: fn() },
  { key: 's1', separator: true },
  { key: 'pin', label: 'Pin to the project', icon: 'star', disabled: true, onSelect: fn() },
  { key: 's2', separator: true },
  { key: 'delete', label: 'Delete message', icon: 'close', danger: true, shortcut: '⌫', onSelect: fn() },
];

const meta: Meta<typeof MenuButton> = {
  title: 'Components/Menu',
  component: MenuButton,
  parameters: {
    docs: {
      description: {
        component:
          'A list of actions over everything else. `Menu` is controlled (`open`, `onClose`, an `anchor` point in window coordinates) and opens in a pop-up window that covers the screen, so a press anywhere outside closes it; Escape closes it on web. `MenuButton` owns its menu and hangs it from itself: an `IconButton` with just an icon, a `Button` with a label.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['ghost', 'subtle', 'solid', 'primary', 'secondary', 'danger'] },
    align: { control: 'inline-radio', options: ['left', 'right'] },
  },
  args: { icon: 'more', items: ITEMS, tooltip: 'More', size: 'md', variant: 'ghost', align: 'right' },
};
export default meta;
type Story = StoryObj<typeof MenuButton>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Column>
      <Showcase title="Icon only">
        <MenuButton items={ITEMS} tooltip="More" />
        <MenuButton items={ITEMS} icon="setting-2-bold" tooltip="Settings" variant="subtle" />
        <MenuButton items={ITEMS} icon="add" tooltip="New" variant="solid" size="lg" align="left" />
      </Showcase>
      <Showcase title="With a label">
        <MenuButton items={ITEMS} label="Actions" />
        <MenuButton items={ITEMS} label="Sort by" icon="sort" variant="ghost" size="sm" align="left" />
        <MenuButton items={ITEMS} label="New" icon="add" variant="primary" />
      </Showcase>
      <Showcase title="Disabled">
        <MenuButton items={ITEMS} tooltip="More" disabled />
        <MenuButton items={ITEMS} label="Actions" disabled />
      </Showcase>
    </Column>
  ),
};

/** The controlled `Menu` on its own, opened where you press (a context menu). */
export const ContextMenu: Story = {
  render: () => {
    const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
    return (
      <View className="gap-3">
        <Pressable
          onPress={(e) => {
            const n = e.nativeEvent as { pageX?: number; pageY?: number };
            setAnchor({ x: n.pageX ?? 40, y: n.pageY ?? 40 });
          }}
          className="h-40 items-center justify-center rounded-card border border-dashed border-overlay/20 bg-overlay/[0.03]"
          style={{ width: 360 }}
        >
          <Text variant="caption" tone="muted">Press anywhere in here</Text>
        </Pressable>
        <Button label="Open at the top left" variant="secondary" onPress={() => setAnchor({ x: 24, y: 24 })} className="self-start" />
        <Menu open={anchor !== null} onClose={() => setAnchor(null)} items={ITEMS} anchor={anchor ?? undefined} />
      </View>
    );
  },
};
