import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PeerChip } from './PeerChip';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof PeerChip> = {
  title: 'Components/PeerChip',
  component: PeerChip,
  parameters: { docs: { description: { component: 'A connected peer: generated avatar and the middle-truncated key (`a12b…4f5g`). Pressable when `onPress` is set.' } } },
  args: { peerId: 'a12b9f03c7d14f5g' },
};
export default meta;
export const Playground: StoryObj<typeof PeerChip> = {};
export const Variants: StoryObj<typeof PeerChip> = {
  render: () => (
    <Showcase>
      <PeerChip peerId="a12b9f03c7d14f5g" />
      <PeerChip peerId="9e7c55e0b2a811ad" online />
      <PeerChip peerId="c03fd18e4a7cb82e" label="Arsham's MacBook" />
      <PeerChip peerId="ffee00112233aabb" onPress={fn()} />
    </Showcase>
  ),
};
