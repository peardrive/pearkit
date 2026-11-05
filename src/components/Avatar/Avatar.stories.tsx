import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { docs: { description: { component: 'Deterministic gradient avatar: the same `seed` (peer key, device id) always picks the same gradient from the theme-aware `avatarPalette`.' } } },
  args: { seed: 'a12b9f03c7d14f5g', size: 40 },
};
export default meta;
export const Playground: StoryObj<typeof Avatar> = {};
export const Seeds: StoryObj<typeof Avatar> = {
  render: () => (
    <Showcase>
      {['a12b', '9e7c', 'c03f', 'peer-4', 'peer-5', 'peer-6'].map((s) => <Avatar key={s} seed={s} size={32} />)}
      <Avatar seed="ak" size={32} label="AK" />
      <Avatar seed="x" size={32} colors={['#a6ce39', '#3eb679']} />
    </Showcase>
  ),
};
