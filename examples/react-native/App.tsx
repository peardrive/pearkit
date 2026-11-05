import './global.css';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import {
  useFonts, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Button, DangerZone, FileHeader, IconButton, KeyValueList, NetworkStatusCard, PaneHeader, SearchField,
  ShareLinkCard, ShareRow, ThemeProvider, TransferCard,
} from 'pearkit';

type Share = { id: string; name: string; kind: 'video' | 'folder' | 'image'; size: string; status: 'sharing' | 'completed' | 'failed'; progress?: number; link: string };

const SHARES: Share[] = [
  { id: '1', name: 'photo_2.mp4', kind: 'video', size: '1.2 GB', status: 'sharing', progress: 0.98, link: 'peardrop://1de0909835728b6e0f3a4c19d2e7b8a5c6f71d0e9f684cb145a28' },
  { id: '2', name: 'Personal', kind: 'folder', size: '4.5 GB', status: 'completed', link: 'peardrop://f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f708192a3b4c5d6' },
  { id: '3', name: 'photo_03.jpg', kind: 'image', size: '126 KB', status: 'failed', link: 'peardrop://1122334455667788990011aabbccddeeff00112233445566778899aabb' },
];

const copy = (text: string) => Clipboard.setStringAsync(text).then(() => undefined);

function ListScreen({ onOpen }: { onOpen: (s: Share) => void }) {
  const [q, setQ] = useState('');
  return (
    <View className="flex-1 bg-pane">
      <PaneHeader size="display" title="All Shares" subtitle={`${SHARES.length} items`} actions={[{ icon: 'more', label: 'More' }]} />
      <View className="px-3 pb-2"><SearchField placeholder="Search shares" value={q} onChangeText={setQ} /></View>
      <ScrollView contentContainerClassName="gap-0.5 px-3 pb-4">
        <NetworkStatusCard peers={3} upload="1.2 MB/s" download="3.8 MB/s" className="mb-2" />
        {SHARES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())).map((s) => (
          <ShareRow key={s.id} name={s.name} meta={[s.kind, s.size]} thumbnail={{ kind: s.kind }} status={s.status} progress={s.progress}
            action={s.status === 'failed' ? { label: 'Retry', onPress: () => {} } : undefined} onPress={() => onOpen(s)} />
        ))}
      </ScrollView>
      <View className="flex-row gap-2 border-t border-overlay/[0.06] px-4 pt-3">
        <Button variant="primary" size="lg" fill icon="arrow-up" label="Send" />
        <Button variant="secondary" size="lg" fill icon="arrow-down" label="Receive" />
      </View>
    </View>
  );
}

function DetailScreen({ share, onBack }: { share: Share; onBack: () => void }) {
  return (
    <View className="flex-1 bg-background">
      <PaneHeader title="" leading={<IconButton icon="chevron-left" size="sm" accessibilityLabel="Back" onPress={onBack} />} />
      <ScrollView contentContainerClassName="gap-4 px-4 pb-6">
        <FileHeader layout="vertical" title={share.name} meta={[share.kind, share.size]} thumbnail={{ kind: share.kind, size: 96, radius: 22 }} status={share.status} />
        {share.progress != null ? <TransferCard progress={share.progress} speed="1.2 MB/s" eta={4} peers={['a12b9f03c7d14f5g', '9e7c55e0b2a811ad']} /> : null}
        <ShareLinkCard layout="vertical" link={share.link} qrSize={168} onCopy={copy} />
        <KeyValueList title="Details" items={[{ label: 'Size', value: share.size }]} />
        <DangerZone layout="vertical" />
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold });
  const [open, setOpen] = useState<Share | null>(null);
  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <ThemeProvider theme="system">
        <SafeAreaView className="flex-1 bg-background">
          {open ? <DetailScreen share={open} onBack={() => setOpen(null)} /> : <ListScreen onOpen={setOpen} />}
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
