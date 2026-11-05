/**
 * Renders docs/assets/header.png (see scripts/capture-readme-header.mjs).
 * Three layers of real pearkit components, fanned out in perspective:
 * primitives → patterns → a full layout, to show how they nest.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import {
  Button, Icon, IconButton, NetworkStatusCard, PeerChip, ProgressBar, QRCode, RadialGlow, SearchField, ShareRow,
  Sidebar, SidebarHeader, SidebarItem, SidebarSection, SidebarSpacer, SidebarToggle, StatusPill, Text, Thumbnail,
  TransferCard, WindowControls, useTheme,
} from '../../index';
import { PearDropDesktop } from '../layouts/PearDropDesktop';
import { images } from '../fixtures/shares';

const meta: Meta = {
  title: 'Internal/README header',
  parameters: { layout: 'fullscreen', docs: { disable: true } },
  tags: ['!autodocs'],
};
export default meta;

const W = 1600;
const H = 860;

function LayerTag({ index, label, sub }: { index: string; label: string; sub: string }) {
  return (
    <View className="flex-row items-center gap-2.5">
      <View className="h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
        <Text variant="micro" weight="bold" tone="primary-text">{index}</Text>
      </View>
      <View>
        <Text variant="label" weight="semibold">{label}</Text>
        <Text variant="micro">{sub}</Text>
      </View>
    </View>
  );
}

const glass = 'rounded-[18px] border border-overlay/10 bg-pane';
const shadow = { boxShadow: '0px 40px 80px -20px rgba(0,0,0,0.75)' } as ViewStyle;

function Primitives() {
  return (
    <View className={`${glass} gap-4 p-5`} style={[{ width: 360 }, shadow]}>
      <View className="flex-row items-center gap-3">
        <WindowControls showGlyphs="always" />
        <View className="flex-1" />
        <IconButton icon="copy" active accessibilityLabel="Copy" />
        <IconButton icon="star-bold" tone="favorite" accessibilityLabel="Favorite" />
        <IconButton icon="info-circle" tone="primary" accessibilityLabel="Info" />
      </View>
      <View className="flex-row gap-2">
        <Button variant="primary" size="lg" glow fill icon="arrow-up" label="Send" />
        <Button variant="secondary" size="lg" fill icon="arrow-down" label="Receive" />
      </View>
      <View className="flex-row flex-wrap gap-2">
        <StatusPill status="sharing" progress={0.98} />
        <StatusPill status="active" />
        <StatusPill status="completed" />
        <StatusPill status="failed" />
      </View>
      <ProgressBar value={0.72} height={6} variant="brand" />
      <View className="flex-row items-center gap-3">
        <QRCode value="peardrop://pearkit" size={72} padding={6} radius={10} />
        <View className="flex-1 gap-2">
          <PeerChip peerId="a12b9f03c7d14f5g" />
          <View className="flex-row gap-2">
            <Thumbnail kind="folder" size={32} />
            <Thumbnail kind="video" size={32} />
            <Thumbnail kind="audio" size={32} />
            <Thumbnail kind="image" size={32} />
          </View>
        </View>
      </View>
    </View>
  );
}

function Patterns() {
  return (
    <View className={`${glass} flex-row overflow-hidden`} style={[{ width: 560, height: 360 }, shadow]}>
      <Sidebar defaultWidth={210} minWidth={180}>
        <SidebarHeader><WindowControls /><SidebarSpacer /><SidebarToggle /></SidebarHeader>
        <SidebarSection title="Library">
          <SidebarItem icon="grid-1" label="All Shares" count={12} selected />
          <SidebarItem icon="export" label="Sharing now" badge={{ value: 2, tone: 'warning' }} />
          <SidebarItem icon="star" label="Favorites" count={2} />
        </SidebarSection>
        <SidebarSpacer />
        <NetworkStatusCard peers={3} upload="1.2 MB/s" download="3.8 MB/s" action={null} />
      </Sidebar>
      <View className="flex-1 gap-2 p-3">
        <SearchField placeholder="Search shares" shortcut="⌘F" />
        <ShareRow name="photo_2.mp4" meta={['Video', '1.2 GB']} thumbnail={{ source: images.videoDusk }} status="sharing" progress={0.98} selected />
        <ShareRow name="Personal" meta={['Folder', '12 files']} thumbnail={{ kind: 'folder' }} status="active" favorite />
        <TransferCard progress={0.98} speed="1.2 MB/s" eta={4} peers={['a12b9f03c7d14f5g', '9e7c55e0b2a811ad']} />
      </View>
    </View>
  );
}

function Header() {
  const theme = useTheme();
  const tilt = (z: number): ViewStyle => ({
    transform: [{ perspective: 2400 }, { rotateX: '14deg' }, { rotateY: '-22deg' }, { rotateZ: '4deg' }, { translateX: z * 0.6 }, { translateY: -z * 0.35 }],
  });
  return (
    <View className="overflow-hidden bg-background" style={{ width: W, height: H }}>
      <RadialGlow color={theme.colors.primary} intensity={0.16} cx={0.78} cy={0.55} rx={0.5} ry={0.7} />
      <RadialGlow color={theme.colors.info} intensity={0.06} cx={0.1} cy={-0.1} rx={0.5} ry={0.6} />

      {/* Copy */}
      <View className="absolute gap-6" style={{ left: 88, top: 150, width: 500 }}>
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-[14px] bg-primary" style={{ boxShadow: '0px 10px 30px -6px rgba(166,207,56,0.45)' } as ViewStyle}>
            <Icon name="export" size={24} tone="primary-foreground" strokeWidth={2} />
          </View>
          <Text weight="bold" style={{ fontSize: 56, letterSpacing: -1.5 }}>pearkit</Text>
        </View>
        <Text weight="semibold" tone="foreground" style={{ fontSize: 26, lineHeight: 34 }}>
          One themeable component library for React Native and Electron.
        </Text>
        <Text variant="body-lg" weight="medium" tone="muted" style={{ fontSize: 16, lineHeight: 24 }}>
          Primitives nest into patterns, patterns into full layouts — styled with Tailwind, themed at runtime.
        </Text>
        <View className="flex-row flex-wrap gap-2 pt-1">
          {['React Native', 'Electron', 'Tailwind · NativeWind', 'Runtime themes', 'Storybook'].map((t) => (
            <View key={t} className="rounded-full border border-overlay/10 bg-overlay/5 px-3 py-1.5">
              <Text variant="label" weight="semibold" tone="muted">{t}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Layers */}
      <View className="absolute" style={{ left: 700, top: 70, width: 900, height: 740 }}>
        <View className="absolute" style={[{ left: 140, top: 0, width: 1180, height: 738 }, tilt(0), { transform: [...(tilt(0).transform as never[]), { scale: 0.6 }], transformOrigin: 'top left' } as ViewStyle]}>
          <PearDropDesktop height={738} showTooltip={false} resizable={false} />
        </View>
        <View className="absolute" style={[{ left: 70, top: 215 }, tilt(0)]}>
          <Patterns />
        </View>
        <View className="absolute" style={[{ left: 0, top: 410 }, tilt(0)]}>
          <Primitives />
        </View>
      </View>

      <View className="absolute gap-4" style={{ left: 88, top: 560 }}>
        <View className="gap-4">
          <LayerTag index="1" label="Primitives" sub="Button · StatusPill · QRCode · Icon…" />
          <LayerTag index="2" label="Patterns" sub="Sidebar · ShareRow · TransferCard…" />
          <LayerTag index="3" label="Layouts" sub="Full screens, desktop & mobile" />
        </View>
      </View>
    </View>
  );
}

export const Header1600: StoryObj = { name: 'Header (1600×860)', render: () => <Header /> };
