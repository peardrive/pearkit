import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Chip } from './Chip';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component:
          'A small token for a tag or an active filter: press to toggle, ✕ to remove. The independent sibling of `SegmentedControl` — chips don\'t exclude each other, so they fit tag lists, filter bars and token inputs.',
      },
    },
  },
  argTypes: {
    tone: { control: 'select', options: ['primary', 'accent', 'info', 'success', 'warning', 'danger', 'neutral'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: 'select', options: [undefined, 'star', 'filter', 'video', 'image', 'music', 'clock'] },
  },
  args: { label: 'sunset', size: 'md', tone: 'primary' },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  args: { selected: true, count: 412, onPress: () => {}, onRemove: () => {} },
};

export const Variants: Story = {
  render: () => (
    <View className="gap-6">
      <Showcase title="Tags on a result (static, with counts)">
        <Chip label="sunset" count={412} />
        <Chip label="harbor" count={38} />
        <Chip label="wide shot" count={7} size="sm" />
        <Chip label="golden hour" size="sm" />
      </Showcase>
      <Showcase title="Pressable, selected tints">
        <Chip label="videos" icon="video" selected onPress={() => {}} />
        <Chip label="pictures" icon="image" selected tone="accent" onPress={() => {}} />
        <Chip label="music" icon="music" selected tone="info" onPress={() => {}} />
        <Chip label="favorites" icon="star" onPress={() => {}} />
      </Showcase>
      <Showcase title="Removable (active filters)">
        <Chip label="over 10 min" onRemove={() => {}} />
        <Chip label="1080p and up" selected onRemove={() => {}} onPress={() => {}} />
        <Chip label="this week" selected tone="accent" size="sm" onRemove={() => {}} onPress={() => {}} />
      </Showcase>
      <Showcase title="Disabled">
        <Chip label="no matches" disabled onPress={() => {}} />
        <Chip label="locked" disabled selected onRemove={() => {}} />
      </Showcase>
    </View>
  ),
};

/** A working filter bar: press toggles, ✕ clears. */
export const FilterBar: Story = {
  render: function FilterBarStory() {
    const all = ['sunset', 'harbor', 'ridge', 'night', 'aerial', 'close up'];
    const [on, setOn] = React.useState<string[]>(['sunset', 'night']);
    const toggle = (t: string) => setOn((v) => (v.includes(t) ? v.filter((x) => x !== t) : [...v, t]));
    return (
      <Showcase title="Filters">
        {all.map((t) => (
          <Chip
            key={t}
            label={t}
            selected={on.includes(t)}
            onPress={() => toggle(t)}
            onRemove={on.includes(t) ? () => toggle(t) : undefined}
          />
        ))}
      </Showcase>
    );
  },
};
