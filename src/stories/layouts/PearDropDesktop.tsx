/**
 * The PearDrop desktop screen (Figma: “Desktop v7 — Concept”) composed purely
 * from pearkit components. Stories render it in different states; it also
 * doubles as a reference for building real screens.
 */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  AppWindow,
  Button,
  DangerZone,
  EmptyState,
  FileHeader,
  KeyValueList,
  NetworkStatusCard,
  Pane,
  PaneBody,
  PaneHeader,
  SearchField,
  SectionLabel,
  ShareLinkCard,
  ShareRow,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarSpacer,
  SidebarToggle,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarSpacer,
  TransferCard,
  useSidebar,
  WindowControls,
} from '../../index';
import { shareMeta, shares as allShares, type DemoShare } from '../fixtures/shares';

export interface PearDropDesktopProps {
  /** Draw rounded window chrome (for docs / screenshots). */
  framed?: boolean;
  initialSelectedId?: string | null;
  defaultCollapsed?: boolean;
  resizable?: boolean;
  /** Start with no shares at all. */
  empty?: boolean;
  /** Show the “Copy link” tooltip like the Figma frame. */
  showTooltip?: boolean;
  height?: number | `${number}%`;
}

/* ───────── Sidebar ───────── */

function PrimaryActions() {
  const { collapsed } = useSidebar();
  return (
    <View className={collapsed ? 'items-center gap-2 pb-2.5' : 'w-full flex-row gap-2 pb-2.5'}>
      <Button variant="primary" size="lg" glow fill={!collapsed} icon="arrow-up" label={collapsed ? undefined : 'Send'} accessibilityLabel="Send" />
      <Button variant="secondary" size="lg" fill={!collapsed} icon="arrow-down" label={collapsed ? undefined : 'Receive'} accessibilityLabel="Receive" />
    </View>
  );
}

function NetworkFooter({ paused, setPaused }: { paused: boolean; setPaused: (p: boolean) => void }) {
  const { collapsed } = useSidebar();
  return (
    <SidebarFooter>
      <NetworkStatusCard compact={collapsed} state="connected" peers={3} upload="1.2 MB/s" download="3.8 MB/s" paused={paused} onPausedChange={setPaused} />
      <View className="h-2" />
      <SidebarItem icon="setting-2-bold" label="Settings" />
    </SidebarFooter>
  );
}

function AppSidebar({ filter, setFilter, defaultCollapsed, resizable, counts }: {
  filter: string; setFilter: (f: string) => void; defaultCollapsed?: boolean; resizable?: boolean; counts: Record<string, number>;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <Sidebar resizable={resizable} defaultCollapsed={defaultCollapsed}>
      <SidebarHeader>
        <WindowControls />
        <SidebarSpacer />
        <SidebarToggle />
      </SidebarHeader>
      <PrimaryActions />
      <SidebarContent>
        <SidebarSection title="Library">
          <SidebarItem icon="grid-1" label="All Shares" count={counts.all} selected={filter === 'all'} onPress={() => setFilter('all')} />
          <SidebarItem icon="export" label="Sharing now" badge={{ value: counts.sharing, tone: 'warning' }} selected={filter === 'sharing'} onPress={() => setFilter('sharing')} />
          <SidebarItem icon="import" label="Received" count={5} selected={filter === 'received'} onPress={() => setFilter('received')} />
          <SidebarItem icon="star" label="Favorites" count={counts.favorites} selected={filter === 'favorites'} onPress={() => setFilter('favorites')} />
        </SidebarSection>
        <SidebarSection title="Status">
          <SidebarItem dot="success" label="Active" count={3} selected={filter === 'active'} onPress={() => setFilter('active')} />
          <SidebarItem dot="primary" label="Completed" count={4} selected={filter === 'completed'} onPress={() => setFilter('completed')} />
          <SidebarItem dot="danger" label="Failed" badge={{ value: 1, tone: 'danger' }} selected={filter === 'failed'} onPress={() => setFilter('failed')} />
          <SidebarItem dot="neutral" label="Inactive" count={2} selected={filter === 'inactive'} onPress={() => setFilter('inactive')} />
        </SidebarSection>
        <SidebarSection title="Folders">
          <SidebarItem icon="folder" iconTone="accent" label="Personal" count={12} />
          <SidebarItem icon="folder" iconTone="accent" label="Personal 01" count={2} />
        </SidebarSection>
      </SidebarContent>
      <NetworkFooter paused={paused} setPaused={setPaused} />
    </Sidebar>
  );
}

/* ───────── List ───────── */

const filterTitle: Record<string, string> = {
  all: 'All Shares', sharing: 'Sharing now', received: 'Received', favorites: 'Favorites',
  active: 'Active', completed: 'Completed', failed: 'Failed', inactive: 'Inactive',
};

function applyFilter(items: DemoShare[], filter: string) {
  switch (filter) {
    case 'sharing': return items.filter((s) => s.status === 'sharing');
    case 'favorites': return items.filter((s) => s.favorite);
    case 'active': case 'completed': case 'failed': case 'inactive': return items.filter((s) => s.status === filter);
    case 'received': return [];
    default: return items;
  }
}

function ListPane({ items, filter, selectedId, onSelect, query, setQuery }: {
  items: DemoShare[]; filter: string; selectedId: string | null; onSelect: (id: string) => void; query: string; setQuery: (q: string) => void;
}) {
  const inProgress = items.filter((s) => s.group === 'in-progress');
  const recent = items.filter((s) => s.group === 'recent');
  const row = (s: DemoShare) => (
    <ShareRow
      key={s.id}
      name={s.name}
      meta={shareMeta(s)}
      thumbnail={{ source: s.image, kind: s.kind }}
      favorite={s.favorite}
      progress={s.progress}
      status={s.status}
      timestamp={s.time}
      action={s.status === 'failed' ? { label: 'Retry', onPress: () => {} } : undefined}
      selected={s.id === selectedId}
      onPress={() => onSelect(s.id)}
    />
  );
  return (
    <Pane width={360} surface="pane" bordered>
      <PaneHeader
        dragRegion
        title={filterTitle[filter]}
        subtitle={`${items.length} items · ${inProgress.length} transferring`}
        actions={[
          { icon: 'sort', label: 'Sort' },
          { icon: 'filter', label: 'Filter' },
          { icon: 'more', label: 'More' },
        ]}
      />
      <View className="px-3 pb-2">
        <SearchField placeholder="Search shares" shortcut="⌘F" value={query} onChangeText={setQuery} />
      </View>
      {items.length === 0 ? (
        <EmptyState
          icon={query ? 'search-normal' : 'folder-open'}
          title={query ? 'No matches' : 'Nothing here yet'}
          description={query ? `No shares match “${query}”.` : 'Send a file or folder and it will show up here.'}
          actions={query ? <Button size="sm" variant="secondary" label="Clear search" onPress={() => setQuery('')} /> : <Button size="sm" variant="primary" icon="arrow-up" label="Send" />}
        />
      ) : (
        <PaneBody contentClassName="gap-0.5 px-3 pb-3">
          {inProgress.length ? <SectionLabel inset="list" label="In progress" count={inProgress.length} /> : null}
          {inProgress.map(row)}
          {recent.length ? <SectionLabel inset="list" label="Recent" /> : null}
          {recent.map(row)}
        </PaneBody>
      )}
    </Pane>
  );
}

/* ───────── Detail ───────── */

function DetailPane({ share, showTooltip }: { share: DemoShare | undefined; showTooltip?: boolean }) {
  const [favorite, setFavorite] = useState<Record<string, boolean>>({});
  if (!share) {
    return (
      <Pane glow>
        <Toolbar dragRegion />
        <EmptyState icon="info-circle" title="Select a share" description="Pick a file or folder on the left to see its transfer, link and details." />
      </Pane>
    );
  }
  const isFav = favorite[share.id] ?? !!share.favorite;
  const inFlight = share.progress != null;
  return (
    <Pane glow>
      <Toolbar dragRegion>
        <ToolbarButton icon={isFav ? 'star-bold' : 'star'} tone={isFav ? 'favorite' : undefined} label={isFav ? 'Unfavorite' : 'Favorite'} onPress={() => setFavorite((f) => ({ ...f, [share.id]: !isFav }))} />
        <ToolbarButton icon="copy" label="Copy link" shortcut="⌘C" active={showTooltip} tooltipOpen={showTooltip} />
        <ToolbarButton icon="scan-barcode" label="Show QR" />
        <ToolbarButton icon="folder-open" label="Show in Finder" />
        <ToolbarSeparator />
        <ToolbarButton icon="pause" label="Pause" disabled={!inFlight} />
        <ToolbarSpacer />
        <ToolbarButton icon="info-circle" label="Inspector" tone="primary" />
      </Toolbar>
      <PaneBody contentClassName="gap-4 px-[26px] pb-5 pt-[22px]">
        <FileHeader
          title={share.name}
          meta={[share.kind === 'folder' ? `Folder · ${share.files} files` : share.typeLabel.split(' ').pop() ?? '', share.size, `Added ${share.added.split(' · ')[0]}`]}
          thumbnail={{ source: share.image, kind: share.kind }}
          status={share.status}
        />
        {inFlight ? (
          <TransferCard progress={share.progress!} speed="1.2 MB/s" eta={4} transferred={share.bytes * share.progress!} total={share.bytes} peers={share.peers} />
        ) : null}
        <ShareLinkCard link={share.link} />
        <KeyValueList
          title="Details"
          items={[
            { label: 'Type', value: share.typeLabel },
            { label: 'Location', value: share.location },
            { label: 'Added', value: share.added },
          ]}
        />
        <View className="min-h-4 flex-1" />
        <DangerZone description={share.kind === 'folder' ? 'Peers will lose access to this folder' : 'Peers will lose access to this file'} />
      </PaneBody>
    </Pane>
  );
}

/* ───────── Screen ───────── */

export function PearDropDesktop({ framed = true, initialSelectedId = 'photo_2', defaultCollapsed, resizable = true, empty, showTooltip, height = 738 }: PearDropDesktopProps) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(empty ? null : initialSelectedId);
  const base = empty ? [] : allShares;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applyFilter(base, filter).filter((s) => !q || s.name.toLowerCase().includes(q));
  }, [base, filter, query]);

  const counts = {
    all: base.length,
    sharing: base.filter((s) => s.status === 'sharing').length,
    favorites: base.filter((s) => s.favorite).length,
  };

  return (
    <View style={{ height, width: '100%' }}>
      <AppWindow framed={framed}>
        <AppSidebar filter={filter} setFilter={setFilter} defaultCollapsed={defaultCollapsed} resizable={resizable} counts={counts} />
        <ListPane items={visible} filter={filter} selectedId={selectedId} onSelect={setSelectedId} query={query} setQuery={setQuery} />
        <DetailPane share={base.find((s) => s.id === selectedId)} showTooltip={showTooltip} />
      </AppWindow>
    </View>
  );
}
