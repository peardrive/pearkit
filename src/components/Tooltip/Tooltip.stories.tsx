import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Tooltip } from './Tooltip';
import { IconButton } from '../IconButton/IconButton';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: { description: { component: 'Hover tooltip with an optional shortcut. Hover on desktop / web, long-press on touch. Sizes to its content without measuring, so it behaves identically on native and web.' } },
  },
  argTypes: { placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] } },
  args: { label: 'Copy link', shortcut: '⌘C', placement: 'bottom', defaultOpen: true },
  decorators: [(Story) => <View className="items-center p-16"><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <IconButton icon="copy" active accessibilityLabel="Copy link" />
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <View className="flex-row gap-16">
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} label={p} placement={p} defaultOpen>
          <Button size="sm" label={p} />
        </Tooltip>
      ))}
    </View>
  ),
};

/** Hover to see the tooltip (not pre-opened). */
export const OnHover: Story = {
  name: 'On hover',
  render: () => (
    <Tooltip label="Show in Finder" shortcut="⌘R">
      <IconButton icon="folder-open" accessibilityLabel="Show in Finder" />
    </Tooltip>
  ),
};
