/**
 * PearDrop on a phone — the same pearkit components, re-arranged for a
 * React Native screen stack (list → detail). Nothing here is web-specific.
 */
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  DangerZone,
  FileHeader,
  IconButton,
  KeyValueList,
  NetworkStatusCard,
  PaneHeader,
  SearchField,
  SectionLabel,
  ShareLinkCard,
  ShareRow,
  Text,
  TransferCard,
} from '../../index';
import { shareMeta, shares, type DemoShare } from '../fixtures/shares';

function StatusBar() {
  return (
    <View className="h-11 flex-row items-center justify-between px-7">
      <Text variant="body" weight="semibold">9:41</Text>
      <View className="flex-row items-center gap-1.5">
        <View className="h-2.5 w-4 rounded-[3px] border border-foreground/60" />
      </View>
    </View>
  );
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <View
      className="overflow-hidden rounded-[44px] border-[6px] border-overlay/[0.08] bg-background"
      style={{ width: 390, height: 844, boxShadow: '0px 30px 70px 0px rgba(0,0,0,0.45)' } as never}
    >
      <StatusBar />
      <View className="flex-1">{children}</View>
      <View className="items-center pb-2 pt-1"><View className="h-[5px] w-[134px] rounded-full bg-foreground/80" /></View>
    </View>
  );
}

export function MobileListScreen({ onOpen }: { onOpen?: (s: DemoShare) => void }) {
  const [q, setQ] = useState('');
  const list = shares.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <View className="flex-1 bg-pane">
      <PaneHeader size="display" title="All Shares" subtitle={`${shares.length} items · 2 transferring`} actions={[{ icon: 'filter', label: 'Filter' }, { icon: 'more', label: 'More' }]} />
      <View className="px-3 pb-2"><SearchField placeholder="Search shares" value={q} onChangeText={setQ} /></View>
      <ScrollView className="flex-1" contentContainerClassName="gap-0.5 px-3 pb-4">
        <View className="mb-1 mt-1"><NetworkStatusCard peers={3} upload="1.2 MB/s" download="3.8 MB/s" /></View>
        <SectionLabel inset="list" label="All" count={list.length} />
        {list.map((s) => (
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
            onPress={() => onOpen?.(s)}
          />
        ))}
      </ScrollView>
      <View className="flex-row gap-2 border-t border-overlay/[0.06] px-4 pb-2 pt-3">
        <Button variant="primary" size="lg" glow fill icon="arrow-up" label="Send" />
        <Button variant="secondary" size="lg" fill icon="arrow-down" label="Receive" />
      </View>
    </View>
  );
}

export function MobileDetailScreen({ share = shares[0], onBack }: { share?: DemoShare; onBack?: () => void }) {
  return (
    <View className="flex-1 bg-background">
      <PaneHeader
        title=""
        className="pb-1 pt-1"
        leading={<IconButton icon="chevron-left" size="sm" accessibilityLabel="Back" onPress={onBack} className="-ml-2" />}
        actions={[{ icon: 'star', label: 'Favorite' }, { icon: 'more', label: 'More' }]}
      />
      <ScrollView className="flex-1" contentContainerClassName="gap-4 px-4 pb-6">
        <FileHeader layout="vertical" title={share.name} meta={[share.typeLabel, share.size]} thumbnail={{ source: share.image, kind: share.kind, size: 96, radius: 22 }} status={share.status} />
        {share.progress != null ? <TransferCard progress={share.progress} speed="1.2 MB/s" eta={4} transferred={share.bytes * share.progress} total={share.bytes} peers={share.peers} /> : null}
        <ShareLinkCard layout="vertical" link={share.link} qrSize={168} />
        <KeyValueList title="Details" items={[{ label: 'Type', value: share.typeLabel }, { label: 'Location', value: share.location }, { label: 'Added', value: share.added }]} />
        <DangerZone layout="vertical" />
      </ScrollView>
    </View>
  );
}

/** Interactive: tap a row to open its detail, tap back to return. */
export function PearDropMobile() {
  const [open, setOpen] = useState<DemoShare | null>(null);
  return (
    <PhoneFrame>
      {open ? <MobileDetailScreen share={open} onBack={() => setOpen(null)} /> : <MobileListScreen onOpen={setOpen} />}
    </PhoneFrame>
  );
}
