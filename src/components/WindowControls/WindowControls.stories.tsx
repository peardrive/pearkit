import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { DragRegion, WindowControls } from './WindowControls';
import { Text } from '../Text/Text';
import { Showcase, Column } from '../../stories/helpers';

const meta: Meta<typeof WindowControls> = {
  title: 'Components/WindowControls',
  component: WindowControls,
  parameters: {
    docs: {
      description: {
        component:
          'macOS traffic lights drawn inside the app, for frameless Electron windows whose sidebar runs to the top edge. With the `pearkit/electron` preload bridge they close / minimise / zoom the real window and dim when it loses focus — no props needed. Outside Electron, pass handlers.',
      },
    },
  },
  argTypes: {
    showGlyphs: { control: 'inline-radio', options: ['hover', 'always', 'never'] },
    zoomGlyph: { control: 'inline-radio', options: ['fullscreen', 'plus'] },
  },
  args: { showGlyphs: 'hover', zoomGlyph: 'fullscreen', size: 12, gap: 8, onClose: fn(), onMinimize: fn(), onZoom: fn() },
};
export default meta;
type Story = StoryObj<typeof WindowControls>;

/** Hover the buttons to reveal the glyphs. */
export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <Column>
      <Showcase title="Focused · hover glyphs"><WindowControls /></Showcase>
      <Showcase title="Glyphs always"><WindowControls showGlyphs="always" /></Showcase>
      <Showcase title="Zoom glyph: plus"><WindowControls showGlyphs="always" zoomGlyph="plus" /></Showcase>
      <Showcase title="Window unfocused"><WindowControls focused={false} /></Showcase>
      <Showcase title="Close only (dialogs)"><WindowControls hide={['minimize', 'zoom']} /></Showcase>
      <Showcase title="Larger"><WindowControls size={14} gap={9} showGlyphs="always" /></Showcase>
    </Column>
  ),
};

/** A custom title bar: `DragRegion` makes empty space drag the window in Electron while buttons stay clickable. */
export const InTitleBar: Story = {
  name: 'In a title bar',
  render: () => (
    <DragRegion className="h-11 w-[480px] flex-row items-center gap-3 rounded-t-card border border-overlay/[0.08] bg-pane px-3.5">
      <WindowControls />
      <View className="flex-1 items-center pr-14">
        <Text variant="label" weight="semibold" tone="muted">PearDrop</Text>
      </View>
    </DragRegion>
  ),
};
