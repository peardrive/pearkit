import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { StatusPill } from './StatusPill';
import { StatusDot } from './StatusDot';
import { shareStatusMeta, type ShareStatus } from './status';
import { Column, Showcase } from '../../stories/helpers';
import { Text } from '../Text/Text';

const tones = ['success', 'warning', 'danger', 'neutral', 'primary', 'info', 'accent'] as const;

const meta: Meta<typeof StatusPill> = {
  title: 'Components/Status',
  component: StatusPill,
  parameters: {
    docs: {
      description: {
        component:
          '`StatusPill` and `StatusDot` share seven semantic tones. Pills accept a `status` preset (`sharing`, `active`, `completed`, `failed`, `inactive`…) whose labels and tones live in `shareStatusMeta`, and append a percentage for in-flight transfers.',
      },
    },
  },
  argTypes: {
    status: { control: 'select', options: Object.keys(shareStatusMeta) },
    tone: { control: 'select', options: [undefined, ...tones] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
  args: { status: 'sharing', progress: 0.98, size: 'sm' },
};
export default meta;
type Story = StoryObj<typeof StatusPill>;

export const Playground: Story = {};

export const Presets: Story = {
  render: () => (
    <Column>
      <Showcase title="Share statuses">
        {(Object.keys(shareStatusMeta) as ShareStatus[]).map((s) => (
          <StatusPill key={s} status={s} progress={s === 'sharing' || s === 'receiving' ? 0.54 : undefined} />
        ))}
      </Showcase>
      <Showcase title="Medium (detail hero)">
        <StatusPill status="sharing" size="md" />
        <StatusPill status="completed" size="md" />
        <StatusPill label="Custom label" tone="accent" size="md" />
        <StatusPill label="No dot" tone="info" dot={false} size="md" />
      </Showcase>
    </Column>
  ),
};

export const Dots: StoryObj<typeof StatusDot> = {
  render: () => (
    <Column>
      <Showcase title="Tones">
        {tones.map((t) => (
          <View key={t} className="items-center gap-1.5">
            <StatusDot tone={t} />
            <Text variant="micro">{t}</Text>
          </View>
        ))}
      </Showcase>
      <Showcase title="Glow · pulse">
        <View className="flex-row items-center gap-2"><StatusDot tone="success" glow /><Text variant="label">Connected</Text></View>
        <View className="flex-row items-center gap-2"><StatusDot tone="warning" pulse /><Text variant="label">Connecting…</Text></View>
        <View className="flex-row items-center gap-2"><StatusDot tone="neutral" size={10} /><Text variant="label">Offline</Text></View>
      </Showcase>
    </Column>
  ),
};
