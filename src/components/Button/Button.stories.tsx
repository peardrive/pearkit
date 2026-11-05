import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { iconNames } from '../../icons/registry';
import { Column, Showcase } from '../../stories/helpers';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Text button with optional leading/trailing icons. Variants come straight from the PearDrop design: **primary** (Send, Copy Link), **secondary** (Receive, Save QR), **subtle** (Pause all transfers), **ghost** and **danger** (Stop sharing). Omit `label` for a square icon-only button.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'subtle', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: 'select', options: [undefined, ...iconNames] },
    iconRight: { control: 'select', options: [undefined, ...iconNames] },
  },
  args: { label: 'Send', variant: 'primary', size: 'lg', icon: 'arrow-up', glow: true, onPress: fn() },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Column>
      <Showcase title="Variants">
        <Button variant="primary" icon="arrow-up" label="Send" glow size="lg" />
        <Button variant="secondary" icon="arrow-down" label="Receive" size="lg" />
        <Button variant="subtle" icon="pause" label="Pause all transfers" size="sm" />
        <Button variant="ghost" icon="more" label="More" />
        <Button variant="danger" icon="stop-circle" label="Stop sharing" />
      </Showcase>
      <Showcase title="Sizes">
        <Button variant="primary" size="sm" icon="copy" label="Small" />
        <Button variant="primary" size="md" icon="copy" label="Medium" />
        <Button variant="primary" size="lg" icon="copy" label="Large" />
      </Showcase>
      <Showcase title="Icon only">
        <Button variant="primary" size="lg" icon="arrow-up" accessibilityLabel="Send" />
        <Button variant="secondary" size="lg" icon="arrow-down" accessibilityLabel="Receive" />
        <Button variant="subtle" size="md" icon="add" accessibilityLabel="Add" />
      </Showcase>
      <Showcase title="States">
        <Button variant="primary" label="Disabled" disabled />
        <Button variant="secondary" label="Loading" loading />
        <Button variant="secondary" label="Trailing icon" iconRight="chevron-right" />
      </Showcase>
    </Column>
  ),
};

/** `fill` splits a row evenly — the sidebar's Send / Receive pair and the share-link actions. */
export const FillRow: Story = {
  name: 'Filling a row',
  render: () => (
    <View className="w-[212px] flex-row gap-2">
      <Button variant="primary" size="lg" glow fill icon="arrow-up" label="Send" />
      <Button variant="secondary" size="lg" fill icon="arrow-down" label="Receive" />
    </View>
  ),
};
