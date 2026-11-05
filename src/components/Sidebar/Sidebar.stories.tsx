import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarSpacer,
  SidebarToggle,
  useSidebar,
} from './Sidebar';
import { WindowControls } from '../WindowControls/WindowControls';
import { Button } from '../Button/Button';
import { NetworkStatusCard } from '../NetworkStatus/NetworkStatusCard';
import { Text } from '../Text/Text';
import { SidebarSurface } from '../../stories/helpers';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  subcomponents: { SidebarHeader, SidebarSection, SidebarItem, SidebarContent, SidebarFooter, SidebarToggle } as never,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'App sidebar built from composable parts. Key features:',
          '- **`resizable`** — drag the right edge with mouse, touch or pen (PanResponder, so it works on native too). Clamped to `minWidth`/`maxWidth`; double-click the handle to reset; arrow keys / screen-reader increment & decrement adjust it.',
          '- **Collapsible icon rail** — `SidebarToggle` or dragging past `minWidth` collapses to `collapsedWidth`; items turn into icons with tooltips. Read the state anywhere with `useSidebar()`.',
          '- Controlled or uncontrolled (`width`/`defaultWidth`, `collapsed`/`defaultCollapsed`), with `onResizeEnd` for persisting the width.',
        ].join('\n'),
      },
    },
  },
  args: { resizable: true, defaultWidth: 236, minWidth: 200, maxWidth: 380, collapsedWidth: 76 },
  decorators: [(Story) => <View style={{ height: 640 }} className="flex-row bg-background"><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

function Actions() {
  const { collapsed } = useSidebar();
  return (
    <View className={collapsed ? 'items-center gap-2 pb-2.5' : 'w-full flex-row gap-2 pb-2.5'}>
      <Button variant="primary" size="lg" glow fill={!collapsed} icon="arrow-up" label={collapsed ? undefined : 'Send'} accessibilityLabel="Send" />
      <Button variant="secondary" size="lg" fill={!collapsed} icon="arrow-down" label={collapsed ? undefined : 'Receive'} accessibilityLabel="Receive" />
    </View>
  );
}

function Footer() {
  const { collapsed } = useSidebar();
  return (
    <SidebarFooter>
      <NetworkStatusCard compact={collapsed} peers={3} upload="1.2 MB/s" download="3.8 MB/s" />
      <SidebarItem icon="setting-2-bold" label="Settings" />
    </SidebarFooter>
  );
}

function DemoItems() {
  const [selected, setSelected] = useState('all');
  const item = (id: string, props: Omit<React.ComponentProps<typeof SidebarItem>, 'selected' | 'onPress'>) => (
    <SidebarItem {...props} selected={selected === id} onPress={() => setSelected(id)} />
  );
  return (
    <SidebarContent>
      <SidebarSection title="Library">
        {item('all', { icon: 'grid-1', label: 'All Shares', count: 12 })}
        {item('sharing', { icon: 'export', label: 'Sharing now', badge: { value: 2, tone: 'warning' } })}
        {item('received', { icon: 'import', label: 'Received', count: 5 })}
        {item('favorites', { icon: 'star', label: 'Favorites', count: 2 })}
      </SidebarSection>
      <SidebarSection title="Status">
        {item('active', { dot: 'success', label: 'Active', count: 3 })}
        {item('completed', { dot: 'primary', label: 'Completed', count: 4 })}
        {item('failed', { dot: 'danger', label: 'Failed', badge: { value: 1, tone: 'danger' } })}
        {item('inactive', { dot: 'neutral', label: 'Inactive', count: 2 })}
      </SidebarSection>
      <SidebarSection title="Folders">
        {item('personal', { icon: 'folder', iconTone: 'accent', label: 'Personal', count: 12 })}
        {item('personal01', { icon: 'folder', iconTone: 'accent', label: 'Personal 01', count: 2 })}
      </SidebarSection>
    </SidebarContent>
  );
}

function FullSidebar(args: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...args}>
      <SidebarHeader>
        <WindowControls />
        <SidebarSpacer />
        <SidebarToggle tooltip="Toggle sidebar" />
      </SidebarHeader>
      <Actions />
      <DemoItems />
      <Footer />
    </Sidebar>
  );
}

/** Drag the right edge. Drag far left to collapse, double-click the edge to reset. */
export const Resizable: Story = {
  render: (args) => {
    const [width, setWidth] = useState(args.defaultWidth ?? 236);
    return (
      <>
        <FullSidebar {...args} onWidthChange={setWidth} />
        <View className="flex-1 items-center justify-center gap-1">
          <Text variant="title">{width}px</Text>
          <Text variant="caption">Drag the sidebar edge · ←/→ when focused · double-click to reset</Text>
        </View>
      </>
    );
  },
};

export const Collapsed: Story = { render: (args) => <FullSidebar {...args} defaultCollapsed /> };

export const Fixed: Story = { name: 'Fixed width (not resizable)', render: (args) => <FullSidebar {...args} resizable={false} /> };

/** Plain background instead of the gradient, narrower bounds. */
export const Configured: Story = {
  render: (args) => <FullSidebar {...args} gradient={false} defaultWidth={260} minWidth={220} maxWidth={300} />,
};

export const Items: StoryObj<typeof SidebarItem> = {
  name: 'SidebarItem',
  parameters: { layout: 'padded' },
  decorators: [(Story) => <View className="p-6"><Story /></View>],
  render: () => (
    <SidebarSurface>
      <SidebarItem icon="grid-1" label="Selected" count={12} selected />
      <SidebarItem icon="export" label="With badge" badge={{ value: 2, tone: 'warning' }} />
      <SidebarItem dot="success" label="With status dot" count={3} />
      <SidebarItem icon="folder" iconTone="accent" label="Custom icon tone" count={12} />
      <SidebarItem icon="star" label="Disabled" disabled />
      <SidebarItem icon="import" label="A very long label that truncates nicely" count={5} />
    </SidebarSurface>
  ),
};
