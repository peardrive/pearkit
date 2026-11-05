import { useState } from 'react';
import { View } from 'react-native';
import {
  AppWindow, Button, EmptyState, FileHeader, KeyValueList, NetworkStatusCard, Pane, PaneBody, PaneHeader, SearchField,
  ShareLinkCard, ShareRow, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarSection,
  SidebarSpacer, SidebarToggle, ThemeProvider, Toolbar, ToolbarButton, ToolbarSpacer, TransferCard, useSidebar, WindowControls,
} from 'pearkit';

type Share = { id: string; name: string; kind: 'video' | 'folder' | 'image'; size: string; status: 'sharing' | 'completed'; progress?: number; link: string };

const SHARES: Share[] = [
  { id: '1', name: 'photo_2.mp4', kind: 'video', size: '1.2 GB', status: 'sharing', progress: 0.98, link: 'peardrop://1de0909835728b6e0f3a4c19d2e7b8a5c6f71d0e9f684cb145a28' },
  { id: '2', name: 'Personal', kind: 'folder', size: '4.5 GB', status: 'completed', link: 'peardrop://f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f708192a3b4c5d6' },
  { id: '3', name: 'photo.jpg', kind: 'image', size: '342 KB', status: 'completed', link: 'peardrop://9f8e7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c5b4a39281706f5e4d3c' },
];

function SidebarActions() {
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
  const [paused, setPaused] = useState(false);
  return (
    <SidebarFooter>
      <NetworkStatusCard compact={collapsed} peers={3} upload="1.2 MB/s" download="3.8 MB/s" paused={paused} onPausedChange={setPaused} />
      <SidebarItem icon="setting-2-bold" label="Settings" />
    </SidebarFooter>
  );
}

export function App() {
  const [selected, setSelected] = useState('1');
  const [width, setWidth] = useState(() => Number(localStorage.getItem('pk-sidebar')) || 236);
  const share = SHARES.find((s) => s.id === selected);

  return (
    <ThemeProvider theme="system">
      <AppWindow>
        <Sidebar resizable width={width} onWidthChange={setWidth} onResizeEnd={(w) => localStorage.setItem('pk-sidebar', String(w))}>
          <SidebarHeader>
            <WindowControls />
            <SidebarSpacer />
            <SidebarToggle />
          </SidebarHeader>
          <SidebarActions />
          <SidebarContent>
            <SidebarSection title="Library">
              <SidebarItem icon="grid-1" label="All Shares" count={SHARES.length} selected />
              <SidebarItem icon="export" label="Sharing now" badge={{ value: 1, tone: 'warning' }} />
              <SidebarItem icon="star" label="Favorites" count={0} />
            </SidebarSection>
          </SidebarContent>
          <Footer />
        </Sidebar>

        <Pane width={360} surface="pane" bordered>
          <PaneHeader dragRegion title="All Shares" subtitle={`${SHARES.length} items`} actions={[{ icon: 'sort', label: 'Sort' }, { icon: 'more', label: 'More' }]} />
          <View className="px-3 pb-2"><SearchField placeholder="Search shares" shortcut="⌘F" /></View>
          <PaneBody contentClassName="gap-0.5 px-3 pb-3">
            {SHARES.map((s) => (
              <ShareRow key={s.id} name={s.name} meta={[s.kind, s.size]} thumbnail={{ kind: s.kind }} status={s.status} progress={s.progress}
                selected={s.id === selected} onPress={() => setSelected(s.id)} />
            ))}
          </PaneBody>
        </Pane>

        <Pane glow>
          <Toolbar dragRegion>
            <ToolbarButton icon="copy" label="Copy link" shortcut="⌘C" />
            <ToolbarButton icon="folder-open" label="Show in Finder" />
            <ToolbarSpacer />
            <ToolbarButton icon="info-circle" label="Inspector" tone="primary" />
          </Toolbar>
          {share ? (
            <PaneBody contentClassName="gap-4 px-[26px] pb-5 pt-[22px]">
              <FileHeader title={share.name} meta={[share.kind, share.size]} thumbnail={{ kind: share.kind }} status={share.status} />
              {share.progress != null ? <TransferCard progress={share.progress} speed="1.2 MB/s" eta={4} peers={['a12b9f03c7d14f5g', '9e7c55e0b2a811ad']} /> : null}
              <ShareLinkCard link={share.link} />
              <KeyValueList title="Details" items={[{ label: 'Size', value: share.size }]} />
            </PaneBody>
          ) : (
            <EmptyState title="Select a share" />
          )}
        </Pane>
      </AppWindow>
    </ThemeProvider>
  );
}
