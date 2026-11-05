import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TransferCard } from './TransferCard';
import { TransferRate } from './TransferRate';
import { Showcase } from '../../stories/helpers';

const peers = ['a12b9f03c7d14f5g', '9e7c55e0b2a811ad', 'c03fd18e4a7cb82e'];

const meta: Meta<typeof TransferCard> = {
  title: 'Patterns/TransferCard',
  component: TransferCard,
  subcomponents: { TransferRate } as never,
  parameters: { docs: { description: { component: 'Live transfer panel: title, percentage, gradient progress, speed / ETA / size and the connected peers. Numbers can be raw (bytes, bytes/s, seconds — formatted for you) or preformatted strings.' } } },
  argTypes: { progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } }, direction: { control: 'inline-radio', options: ['up', 'down'] } },
  args: { progress: 0.98, direction: 'up', speed: '1.2 MB/s', eta: 4, transferred: 1.18 * 1024 ** 3, total: 1.2 * 1024 ** 3, peers },
  decorators: [(Story) => <View style={{ width: 530 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof TransferCard>;
export const Playground: Story = {};

/** A simulated live transfer. */
export const Live: Story = {
  render: (args) => {
    const total = 1.2 * 1024 ** 3;
    const [p, setP] = useState(0.12);
    useEffect(() => {
      const t = setInterval(() => setP((v) => (v >= 1 ? 0.05 : Math.min(1, v + 0.01))), 120);
      return () => clearInterval(t);
    }, []);
    return <TransferCard {...args} progress={p} transferred={total * p} total={total} eta={(1 - p) * 120} speed={1258291 + Math.round(Math.sin(p * 20) * 200000)} />;
  },
};

export const Receiving: Story = {
  args: { direction: 'down', progress: 0.42, speed: 3984588, eta: 95, transferred: 0.34 * 1024 ** 3, total: 0.8 * 1024 ** 3, peers: [peers[1]] },
};

export const Rates: StoryObj<typeof TransferRate> = {
  name: 'TransferRate',
  render: () => (
    <Showcase>
      <TransferRate direction="up" value="1.2 MB/s" />
      <TransferRate direction="down" value={3984588} />
      <TransferRate direction="up" value={512} tone="warning" />
    </Showcase>
  ),
};
