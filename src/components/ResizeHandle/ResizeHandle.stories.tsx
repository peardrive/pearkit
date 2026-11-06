import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { ResizeHandle } from './ResizeHandle';
import { Text } from '../Text/Text';
import { clamp } from '../../utils/format';

const meta: Meta<typeof ResizeHandle> = {
  title: 'Components/ResizeHandle',
  component: ResizeHandle,
  parameters: {
    docs: {
      description: {
        component:
          'The grab bar between two panes: a wide hit area in the gutter with a short bar in its middle — faint at rest, lit on hover and while dragging. It reports the drag; the parent sets the sizes. `Sidebar` uses it for its resizable edge.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    barLength: { control: 'number' },
  },
  args: { orientation: 'vertical', thickness: 12, barLength: 48, hideAtRest: false },
};
export default meta;

export const Playground: StoryObj<typeof ResizeHandle> = {
  render: (args) => (
    <View className="h-[220px] flex-row rounded-card bg-overlay/[0.02] p-2" style={args.orientation === 'horizontal' ? { flexDirection: 'column', width: 360 } : undefined}>
      <View className="flex-1 rounded-lg bg-overlay/[0.04]" />
      <ResizeHandle {...args} />
      <View className="flex-1 rounded-lg bg-overlay/[0.04]" />
    </View>
  ),
};

function Columns() {
  const [left, setLeft] = useState(220);
  const start = useRef(left);
  return (
    <View className="h-[260px] w-[640px] flex-row rounded-card bg-overlay/[0.02] p-2">
      <View className="justify-center rounded-lg bg-overlay/[0.05] px-3" style={{ width: left }}>
        <Text variant="label" tone="muted">{`${left} px`}</Text>
      </View>
      <ResizeHandle
        onResizeStart={() => (start.current = left)}
        onResize={(d) => setLeft(clamp(Math.round(start.current + d), 140, 440))}
        onReset={() => setLeft(220)}
        onStep={(dir) => setLeft((w) => clamp(w + dir * 16, 140, 440))}
        accessibilityValue={{ min: 140, max: 440, now: left }}
      />
      <View className="flex-1 rounded-lg bg-overlay/[0.05]" />
    </View>
  );
}
export const BetweenTwoPanes: StoryObj<typeof ResizeHandle> = { name: 'Between two panes', render: () => <Columns /> };

function Stacked() {
  const [top, setTop] = useState(140);
  const start = useRef(top);
  return (
    <View className="h-[320px] w-[420px] rounded-card bg-overlay/[0.02] p-2">
      <View className="rounded-lg bg-overlay/[0.05]" style={{ height: top }} />
      <ResizeHandle orientation="horizontal" onResizeStart={() => (start.current = top)} onResize={(d) => setTop(clamp(Math.round(start.current + d), 60, 240))} onReset={() => setTop(140)} />
      <View className="flex-1 rounded-lg bg-overlay/[0.05]" />
    </View>
  );
}
export const StackedPanes: StoryObj<typeof ResizeHandle> = { name: 'Stacked panes', render: () => <Stacked /> };

export const FullLength: StoryObj<typeof ResizeHandle> = {
  name: 'Full-length bar',
  render: () => (
    <View className="h-[220px] w-[420px] flex-row rounded-card bg-overlay/[0.02] p-2">
      <View className="flex-1 rounded-lg bg-overlay/[0.05]" />
      <ResizeHandle barLength="full" />
      <View className="flex-1 rounded-lg bg-overlay/[0.05]" />
    </View>
  ),
};
