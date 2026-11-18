import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { DropZone, type DroppedItem } from './DropZone';
import { EmptyState } from '../EmptyState/EmptyState';
import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';

const meta: Meta<typeof DropZone> = {
  title: 'Components/DropZone',
  component: DropZone,
  parameters: {
    docs: {
      description: {
        component:
          'A place files can be dropped. On the web it listens to the browser\'s drag events on its own element, tells folders from files (`webkitGetAsEntry`), and shows an `overlay` while a drag with files is over it (a dashed primary frame by default). On a phone it only draws its children. Drag a file from your desktop onto the frames below.',
      },
    },
  },
  args: { onDrop: fn(), onDragActiveChange: fn(), disabled: false },
};
export default meta;
type Story = StoryObj<typeof DropZone>;

function Target({ children, height = 180 }: { children?: React.ReactNode; height?: number }) {
  return (
    <View className="items-center justify-center rounded-card border border-overlay/[0.08] bg-pane" style={{ height, width: 360 }}>
      {children}
    </View>
  );
}

export const Playground: Story = {
  render: (args) => {
    const [dropped, setDropped] = useState<DroppedItem[]>([]);
    return (
      <DropZone {...args} onDrop={(items, e) => { setDropped(items); args.onDrop(items, e); }}>
        <Target>
          {dropped.length ? (
            <View className="gap-1 p-4">
              {dropped.map((d, i) => (
                <Text key={i} variant="caption">
                  {d.kind === 'directory' ? '📁' : '📄'} {d.name}
                </Text>
              ))}
            </View>
          ) : (
            <EmptyState icon="import" title="Drop files here" description="Folders are told from files." />
          )}
        </Target>
      </DropZone>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Column>
      <Showcase title="Default overlay">
        <DropZone onDrop={fn()}>
          <Target><Text variant="caption" tone="muted">Drag a file over me</Text></Target>
        </DropZone>
      </Showcase>
      <Showcase title="Your own overlay, drawn all the time (a function of `active`)">
        <DropZone
          onDrop={fn()}
          overlay={(active) => (
            <View className={active ? 'flex-1 items-center justify-center bg-success/20' : 'flex-1'} style={{ borderRadius: 14 }}>
              {active ? <Text variant="body-lg" tone="success">Let go</Text> : null}
            </View>
          )}
        >
          <Target><Text variant="caption" tone="muted">A green wash while over</Text></Target>
        </DropZone>
      </Showcase>
      <Showcase title="Disabled">
        <DropZone onDrop={fn()} disabled>
          <Target height={100}><Text variant="caption" tone="muted">Nothing happens here</Text></Target>
        </DropZone>
      </Showcase>
    </Column>
  ),
};
