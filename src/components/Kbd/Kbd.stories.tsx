import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: { docs: { description: { component: 'Keyboard shortcut hint, used inside `SearchField` (⌘F) and tooltips.' } } },
  args: { children: '⌘F' },
};
export default meta;
export const Playground: StoryObj<typeof Kbd> = {};
export const Shortcuts: StoryObj<typeof Kbd> = {
  render: () => (
    <Showcase>
      {['⌘F', '⌘C', '⌘⇧N', 'Esc', 'Ctrl K'].map((k) => <Kbd key={k}>{k}</Kbd>)}
    </Showcase>
  ),
};
