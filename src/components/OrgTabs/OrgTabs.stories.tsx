import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { ALL_ORGS, OrgTabs, type OrgTabItem } from './OrgTabs';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const PIC = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="#1f3b2a"/><circle cx="64" cy="64" r="34" fill="#a8d08d"/></svg>')}`;

const ORGS: OrgTabItem[] = [
  { key: 'peardrive', name: 'PearDrive', avatar: { uri: PIC }, count: 6 },
  { key: 'audible', name: 'Bitcoin Audible', count: 3 },
  { key: 'anjou', name: 'Anjou', count: 2 },
  { key: 'family', name: 'Family' },
  { key: 'crew', name: 'Pearkit crew', count: 1 },
  { key: 'lab', name: 'The lab' },
];

function Live({ items = ORGS, size, onAdd, width = 390 }: { items?: OrgTabItem[]; size?: 'sm' | 'md'; onAdd?: () => void; width?: number }) {
  const [value, setValue] = useState(ALL_ORGS);
  return (
    <View className="overflow-hidden rounded-card border border-overlay/[0.08] bg-background" style={{ width }}>
      <OrgTabs items={items} value={value} onChange={setValue} size={size} onAdd={onAdd} />
      <Text variant="caption" tone="muted" className="px-4 pb-3">
        Chosen: {value === ALL_ORGS ? 'All' : items.find((i) => i.key === value)?.name}
      </Text>
    </View>
  );
}

const meta: Meta<typeof OrgTabs> = {
  title: 'Components/OrgTabs',
  component: OrgTabs,
  parameters: {
    docs: {
      description: {
        component:
          'The organizations as a row of round tabs with their names under: "All" first, a + last with `onAdd`, the chosen one ringed in the primary. The row scrolls sideways and snaps to a tab, so a flick moves along it; the page below can listen to its own swipes. `ALL_ORGS` is the key of the "All" tab.',
      },
    },
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  args: { items: ORGS, value: ALL_ORGS, size: 'md', onChange: fn(), onAdd: fn() },
};
export default meta;
type Story = StoryObj<typeof OrgTabs>;

export const Playground: Story = { render: (args) => <Live items={args.items} size={args.size} onAdd={args.onAdd} /> };

export const Variants: Story = {
  render: () => (
    <Column>
      <Showcase title="Medium, with a +, on a phone's width (flick it)">
        <Live onAdd={fn()} />
      </Showcase>
      <Showcase title="Small, no +, three organizations">
        <Live size="sm" items={ORGS.slice(0, 3)} />
      </Showcase>
      <Showcase title="Wide">
        <Live width={720} onAdd={fn()} />
      </Showcase>
    </Column>
  ),
};
