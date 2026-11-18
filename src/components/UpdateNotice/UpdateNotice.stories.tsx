import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { UpdateNotice, type UpdateState } from './UpdateNotice';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarSection, SidebarSpacer, SidebarToggle } from '../Sidebar/Sidebar';
import { WindowControls } from '../WindowControls/WindowControls';
import { Text } from '../Text/Text';

const meta: Meta<typeof UpdateNotice> = {
  title: 'Patterns/UpdateNotice',
  component: UpdateNotice,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The notice at the bottom of the sidebar, above Settings, when a newer version is waiting on the app's update channel. **One press** downloads it, installs it and restarts the app on it: no trip into Settings. The channel drives `state` (`available` → `downloading` → `restarting`, or `error`) and `progress`; this only shows them. In a collapsed sidebar it's an icon with a dot and a tooltip.",
      },
    },
  },
  args: { version: '0.1.4', behind: 1, state: 'available' },
  argTypes: {
    state: { control: 'inline-radio', options: ['available', 'downloading', 'restarting', 'error'] },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
};
export default meta;
type Story = StoryObj<typeof UpdateNotice>;

/** The notice where it lives: a sidebar footer, above Settings. */
function InSidebar({ children, collapsed }: { children: React.ReactNode; collapsed?: boolean }) {
  return (
    <View style={{ height: 420 }} className="flex-row bg-background">
      <Sidebar defaultCollapsed={collapsed} defaultWidth={236}>
        <SidebarHeader>
          <WindowControls />
          <SidebarSpacer />
          <SidebarToggle />
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection title="Library">
            <SidebarItem icon="grid-1" label="All" selected />
            <SidebarItem icon="star" label="Favorites" />
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <View className="gap-1">
            {children}
            <SidebarItem icon="setting-2-bold" label="Settings" />
          </View>
        </SidebarFooter>
      </Sidebar>
    </View>
  );
}

export const Playground: Story = {
  render: (args) => (
    <InSidebar>
      <UpdateNotice {...args} />
    </InSidebar>
  ),
};

/** Press it: it downloads (the bar fills), restarts, and comes back as the new version. */
function Simulated() {
  const [state, setState] = useState<UpdateState | 'done'>('available');
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);
  const press = () => {
    setState('downloading');
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          clearInterval(timer.current!);
          setState('restarting');
          setTimeout(() => setState('done'), 1500);
          return 1;
        }
        return Math.min(1, p + 0.08);
      });
    }, 120);
  };
  return (
    <InSidebar>
      {state === 'done' ? (
        <Text variant="caption" tone="muted" className="px-2.5 py-2">
          Running 0.1.4. The notice is gone.
        </Text>
      ) : (
        <UpdateNotice version="0.1.4" behind={3} state={state} progress={progress} onPress={press} />
      )}
    </InSidebar>
  );
}

export const OnePress: Story = {
  name: 'One press: download, restart',
  render: () => <Simulated />,
};

export const States: Story = {
  render: () => (
    <View className="flex-row gap-6 bg-background p-6">
      {(
        [
          { state: 'available', behind: 1 },
          { state: 'available', behind: 3 },
          { state: 'downloading', progress: 0.42 },
          { state: 'restarting' },
          { state: 'error', error: 'The download stopped: no peer has the file right now.' },
        ] as const
      ).map((s, i) => (
        <View key={i} className="w-[220px] gap-2">
          <Text variant="caption" tone="muted">
            {s.state}
            {'behind' in s && s.behind > 1 ? `, ${s.behind} behind` : ''}
          </Text>
          <UpdateNotice version="0.1.4" compact={false} {...s} />
        </View>
      ))}
    </View>
  ),
};

export const Collapsed: Story = {
  name: 'In a collapsed sidebar',
  render: () => (
    <InSidebar collapsed>
      <UpdateNotice version="0.1.4" behind={2} />
    </InSidebar>
  ),
};
