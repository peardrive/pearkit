import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountBadge } from './CountBadge';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof CountBadge> = {
  title: 'Components/CountBadge',
  component: CountBadge,
  parameters: { docs: { description: { component: 'Trailing counter for navigation items. Quiet text by default; give it a `tone` to draw attention (Sharing now · 2, Failed · 1).' } } },
  argTypes: { tone: { control: 'select', options: [undefined, 'success', 'warning', 'danger', 'neutral', 'primary', 'info', 'accent'] } },
  args: { value: 12 },
};
export default meta;
type Story = StoryObj<typeof CountBadge>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Showcase>
      <CountBadge value={12} />
      <CountBadge value={2} tone="warning" />
      <CountBadge value={1} tone="danger" />
      <CountBadge value={7} tone="primary" />
      <CountBadge value={240} tone="info" />
      <CountBadge value={240} max={999} />
    </Showcase>
  ),
};
