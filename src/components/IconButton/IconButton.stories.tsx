import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { IconButton } from './IconButton';
import { iconNames } from '../../icons/registry';
import { Column, Showcase } from '../../stories/helpers';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: { description: { component: 'Square icon button for headers and toolbars. Pass `tooltip` for a hover label (and screen-reader name), with an optional keyboard shortcut.' } },
  },
  argTypes: {
    icon: { control: 'select', options: iconNames },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['ghost', 'subtle', 'solid'] },
  },
  args: { icon: 'copy', size: 'md', variant: 'ghost', tooltip: { label: 'Copy link', shortcut: '⌘C' }, onPress: fn() },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const Gallery: Story = {
  render: () => (
    <Column>
      <Showcase title="List header (sm · 30px)">
        <IconButton size="sm" icon="sort" tooltip="Sort" />
        <IconButton size="sm" icon="filter" tooltip="Filter" />
        <IconButton size="sm" icon="more" tooltip="More" />
      </Showcase>
      <Showcase title="Toolbar (md · 32px)">
        <IconButton icon="star-bold" tone="favorite" tooltip="Favorite" />
        <IconButton icon="copy" active tooltip={{ label: 'Copy link', shortcut: '⌘C' }} />
        <IconButton icon="scan-barcode" tooltip="Show QR" />
        <IconButton icon="folder-open" tooltip="Show in Finder" />
        <IconButton icon="info-circle" tone="primary" tooltip="Inspector" />
      </Showcase>
      <Showcase title="Variants">
        <IconButton icon="add" variant="ghost" accessibilityLabel="Add" />
        <IconButton icon="add" variant="subtle" accessibilityLabel="Add" />
        <IconButton icon="add" variant="solid" accessibilityLabel="Add" />
        <IconButton icon="add" variant="subtle" disabled accessibilityLabel="Add" />
      </Showcase>
    </Column>
  ),
};
