import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import {
  Button, Card, NetworkStatusCard, ShareRow, StatusPill, Text, ThemeProvider, createTheme, darkTheme, lightTheme, type Theme,
} from '../../index';
import { images } from '../fixtures/shares';

const meta: Meta = {
  title: 'Foundations/Theming',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Themes are plain objects. `ThemeProvider` turns one into CSS variables that the Tailwind preset reads, so switching or nesting themes is instant and never needs a Tailwind rebuild. Derive your own with `createTheme(base, overrides)`.' } },
  },
};
export default meta;

const sunset = createTheme(lightTheme, {
  name: 'sunset',
  colors: { primary: '#f97316', 'primary-strong': '#ef4444', 'primary-text': '#c2410c', 'primary-foreground': '#ffffff', selected: '#ffedd5', sidebar: '#fff7ed', 'sidebar-to': '#ffedd5' },
});
const grape = createTheme(darkTheme, {
  name: 'grape',
  colors: { background: '#0e0a14', pane: '#120d1a', primary: '#c084fc', 'primary-strong': '#7c3aed', 'primary-text': '#d8b4fe', selected: '#2e1a47', sidebar: '#1a1325', 'sidebar-to': '#130e1c' },
});

function Sample({ theme }: { theme: Theme }) {
  return (
    <ThemeProvider theme={theme} className="flex-1 gap-3 bg-background p-5" style={{ minWidth: 300 }}>
      <Text variant="overline">{theme.name}</Text>
      <View className="flex-row gap-2">
        <Button variant="primary" glow icon="arrow-up" label="Send" fill size="lg" />
        <Button variant="secondary" icon="arrow-down" label="Receive" fill size="lg" />
      </View>
      <ShareRow name="photo_2.mp4" meta={['Video', '1.2 GB']} thumbnail={{ source: images.videoDusk }} status="sharing" progress={0.72} timestamp="now" selected />
      <ShareRow name="Personal" meta={['Folder', '12 files']} thumbnail={{ kind: 'folder' }} status="completed" timestamp="2h" favorite />
      <Card size="sm"><View className="flex-row gap-2"><StatusPill status="active" /><StatusPill status="failed" /></View></Card>
      <NetworkStatusCard peers={3} upload="1.2 MB/s" download="3.8 MB/s" />
    </ThemeProvider>
  );
}

/** Four themes side by side — two built in, two made with `createTheme`. Each column is its own nested `ThemeProvider`. */
export const SideBySide: StoryObj = {
  name: 'Side by side',
  render: () => (
    <View className="flex-row flex-wrap">
      <Sample theme={darkTheme} />
      <Sample theme={lightTheme} />
      <Sample theme={grape} />
      <Sample theme={sunset} />
    </View>
  ),
};

/** Patch a couple of tokens inline with `overrides` — no theme object needed. */
export const InlineOverrides: StoryObj = {
  name: 'Inline overrides',
  render: () => (
    <ThemeProvider overrides={{ colors: { primary: '#38bdf8', 'primary-strong': '#6366f1', 'primary-text': '#7dd3fc' } }} className="gap-3 bg-background p-6">
      <Text variant="label" tone="muted">{"<ThemeProvider overrides={{ colors: { primary: '#38bdf8' } }}>"}</Text>
      <View className="flex-row gap-2" style={{ width: 360 }}>
        <Button variant="primary" glow icon="copy" label="Copy Link" fill />
        <Button variant="secondary" icon="import" label="Save QR" fill />
      </View>
    </ThemeProvider>
  ),
};
