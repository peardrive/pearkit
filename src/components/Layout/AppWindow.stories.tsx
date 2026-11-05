import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { AppWindow, Pane, PaneBody } from './AppWindow';
import { Text } from '../Text/Text';
import { Sidebar, SidebarHeader, SidebarSpacer, SidebarToggle } from '../Sidebar/Sidebar';
import { WindowControls } from '../WindowControls/WindowControls';

const meta: Meta<typeof AppWindow> = {
  title: 'Components/AppWindow & Pane',
  component: AppWindow,
  subcomponents: { Pane, PaneBody } as never,
  parameters: { docs: { description: { component: 'Layout skeleton. `AppWindow` is the row of panes (optionally `framed` with rounded chrome for previews); `Pane` is a fixed-width or flexible column with a `surface`, hairline and optional brand `glow`; `PaneBody` scrolls its content.' } } },
  args: { framed: true },
};
export default meta;

const Label = ({ children }: { children: string }) => (
  <View className="flex-1 items-center justify-center"><Text variant="label" tone="subtle">{children}</Text></View>
);

/** Sidebar + list + detail: the three-pane desktop skeleton. */
export const ThreePanes: StoryObj<typeof AppWindow> = {
  name: 'Three panes',
  render: (args) => (
    <View style={{ height: 420, width: 900 }}>
      <AppWindow {...args}>
        <Sidebar resizable>
          <SidebarHeader><WindowControls /><SidebarSpacer /><SidebarToggle /></SidebarHeader>
          <Label>Sidebar (resizable)</Label>
        </Sidebar>
        <Pane width={300} surface="pane" bordered><Label>Pane · width 300 · surface pane</Label></Pane>
        <Pane glow><Label>Pane · flex · glow</Label></Pane>
      </AppWindow>
    </View>
  ),
};

export const TwoPanes: StoryObj<typeof AppWindow> = {
  name: 'Two panes',
  render: (args) => (
    <View style={{ height: 320, width: 720 }}>
      <AppWindow {...args}>
        <Pane width={280} surface="pane" bordered><Label>List</Label></Pane>
        <Pane><PaneBody contentClassName="p-6 gap-2">{Array.from({ length: 12 }, (_, i) => <Text key={i} variant="label">Scrollable row {i + 1}</Text>)}</PaneBody></Pane>
      </AppWindow>
    </View>
  ),
};
