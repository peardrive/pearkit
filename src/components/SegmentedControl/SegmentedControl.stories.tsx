import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { SegmentedControl, type SegmentedControlProps } from './SegmentedControl';
import { Column, Showcase } from '../../stories/helpers';

const LOOKS = [
  { value: 'bubbles', label: 'Bubbles' },
  { value: 'flat', label: 'Flat rows' },
];
const VIEWS = [
  { value: 'list', icon: 'menu' as const, accessibilityLabel: 'List' },
  { value: 'grid', icon: 'grid-1' as const, accessibilityLabel: 'Grid' },
  { value: 'folders', icon: 'folder' as const, accessibilityLabel: 'Folders' },
];

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { docs: { description: { component: 'One choice among a few, side by side in a pill: the chosen segment is raised on a pane-coloured tile. Segments take a label, an icon or both. `fullWidth` stretches it across a row. The exclusive sibling of `Chip`.' } } },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  args: { options: [...LOOKS, { value: 'compact', label: 'Compact', icon: 'sidebar-left' }], value: 'bubbles', size: 'md', fullWidth: false, onChange: fn() },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

function Live(props: Omit<SegmentedControlProps, 'onChange'> & { onChange?: (v: string) => void }) {
  const [v, setV] = useState(props.value);
  return <SegmentedControl {...props} value={v} onChange={(x) => { setV(x); props.onChange?.(x); }} />;
}

export const Playground: Story = { render: (args) => <Live {...args} /> };

export const Variants: Story = {
  render: () => (
    <Column width={360}>
      <Showcase title="Sizes">
        <Live options={LOOKS} value="bubbles" size="sm" />
        <Live options={LOOKS} value="flat" size="md" />
      </Showcase>
      <Showcase title="Icons only">
        <Live options={VIEWS} value="list" size="sm" accessibilityLabel="View" />
        <Live options={VIEWS} value="grid" accessibilityLabel="View" />
      </Showcase>
      <Showcase title="Icon and label">
        <Live options={[{ value: 'all', label: 'All', icon: 'grid-1' }, { value: 'mine', label: 'Mine', icon: 'people' }, { value: 'starred', label: 'Starred', icon: 'star' }]} value="all" />
      </Showcase>
      <Showcase title="Full width, one disabled">
        <View className="w-full">
          <Live fullWidth options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month', disabled: true }]} value="week" />
        </View>
      </Showcase>
      <Showcase title="Disabled">
        <Live options={LOOKS} value="bubbles" disabled />
      </Showcase>
    </Column>
  ),
};
