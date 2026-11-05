import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarSpacer } from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  subcomponents: { ToolbarButton, ToolbarSeparator, ToolbarSpacer } as never,
  parameters: { docs: { description: { component: '52px action bar at the top of a pane. `ToolbarButton`s show a tooltip with label + shortcut; `dragRegion` lets empty space drag a frameless Electron window.' } } },
  decorators: [(Story) => <View style={{ width: 580, height: 120 }} className="rounded-card border border-overlay/[0.06]"><Story /></View>],
};
export default meta;

export const DetailToolbar: StoryObj<typeof Toolbar> = {
  name: 'Detail toolbar',
  render: () => {
    const [fav, setFav] = useState(true);
    const [paused, setPaused] = useState(false);
    return (
      <Toolbar>
        <ToolbarButton icon={fav ? 'star-bold' : 'star'} tone={fav ? 'favorite' : undefined} label={fav ? 'Unfavorite' : 'Favorite'} onPress={() => setFav(!fav)} />
        <ToolbarButton icon="copy" label="Copy link" shortcut="⌘C" active tooltipOpen />
        <ToolbarButton icon="scan-barcode" label="Show QR" />
        <ToolbarButton icon="folder-open" label="Show in Finder" shortcut="⌘R" />
        <ToolbarSeparator />
        <ToolbarButton icon={paused ? 'play' : 'pause'} label={paused ? 'Resume' : 'Pause'} onPress={() => setPaused(!paused)} />
        <ToolbarSpacer />
        <ToolbarButton icon="info-circle" label="Inspector" tone="primary" />
      </Toolbar>
    );
  },
};
