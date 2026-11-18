import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image, View } from 'react-native';
import { fn } from 'storybook/test';
import { MediaNotice } from './MediaNotice';
import { Button } from '../Button/Button';
import { iconNames } from '../../icons/registry';
import { Column, Showcase } from '../../stories/helpers';
import poster from '../../stories/assets/video-dusk.jpg';

/** A player's stage: the poster stays behind the notice. */
function Stage({ children, width = 360, height = 202 }: { children: React.ReactNode; width?: number; height?: number }) {
  return (
    <View className="overflow-hidden rounded-card border border-overlay/[0.07]" style={{ width, height }}>
      <Image source={{ uri: poster }} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      {children}
    </View>
  );
}

const meta: Meta<typeof MediaNotice> = {
  title: 'Components/MediaNotice',
  component: MediaNotice,
  parameters: {
    docs: {
      description: {
        component:
          'The notice over a player that cannot play. A media element only knows "error"; the app finds out why and says so where the media is, with one way out, instead of spinning or re-opening the stream in a loop. **offline**: nobody online holds the file. **unplayable**: the stream kept failing. Composes `EmptyState` and `Button`; the scrim uses the `background` token so it follows the theme.',
      },
    },
  },
  argTypes: {
    kind: { control: 'inline-radio', options: ['offline', 'unplayable', 'custom'] },
    tone: { control: 'inline-radio', options: [undefined, 'neutral', 'warning', 'danger', 'info', 'primary', 'success', 'accent'] },
    icon: { control: 'select', options: [undefined, ...iconNames] },
    scrim: { control: { type: 'range', min: 0, max: 1, step: 0.02 } },
  },
  args: { kind: 'offline', onRetry: fn() },
  decorators: [(Story) => <Stage><Story /></Stage>],
};
export default meta;
type Story = StoryObj<typeof MediaNotice>;

export const Playground: Story = {};

export const Kinds: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <Column>
      <Showcase title="Offline: nobody online holds the file">
        <Stage><MediaNotice kind="offline" onRetry={fn()} /></Stage>
      </Showcase>
      <Showcase title="Unplayable: the stream kept failing">
        <Stage><MediaNotice kind="unplayable" onRetry={fn()} /></Stage>
      </Showcase>
      <Showcase title="Custom copy and actions">
        <Stage>
          <MediaNotice
            kind="custom"
            icon="document"
            title="Preview not available"
            description="Open it in the app that made it."
            actions={<Button size="sm" variant="primary" icon="export" label="Open" onPress={fn()} />}
          />
        </Stage>
      </Showcase>
    </Column>
  ),
};

/** Without the overlay it is an ordinary block: a row in a list of attachments, a card in a feed. */
export const Inline: Story = {
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
  args: { overlay: false, kind: 'offline' },
};
