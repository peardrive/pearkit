import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { UpdatesPanel, type UpdateRelease, type UpdatesStatus, type UpdateVersion } from './UpdatesPanel';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { Text } from '../Text/Text';

const DAY = 86400000;
const NOTES = [
  'The right panel: Chat and Code as folder tabs joined to their page, a chat that looks like a chat with its own settings, a bar to resize the panel.',
  'Select a block to see it in the right panel. Resize blocks. Read the code.',
  'Updates keep the publisher’s signature.',
  'Debug notes are written as they record.',
  'Proposals show what changed.',
  'The update channel.',
  'First build.',
];
const VERSIONS: UpdateVersion[] = ['0.1.8', '0.1.7', '0.1.6', '0.1.5', '0.1.4', '0.1.3', '0.1.2'].map((version, i) => ({
  id: `r${i}`,
  version,
  at: Date.now() - (i * 1.4 + 0.2) * DAY,
  size: 148_300_000 + i * 410_000,
  notes: NOTES[i],
  build: `2026-11-${17 - i}.${212 - i * 3}`,
}));
const PUBLISHER = '98ae8770c41f0d5b6e2a7c93b1f4d8e05a6c7b21d3e4f5a6b7c8d9e0f1a2b3c4';
const full = async (id: string): Promise<UpdateRelease> => {
  const v = VERSIONS.find((x) => x.id === id)!;
  return {
    ...v,
    file: `pearkit-studio-desktop-${v.version}-mac-arm64.zip`,
    verified: id !== 'r5',
    signedBy: id === 'r5' ? 'ffff0000c41f0d5b6e2a7c93b1f4d8e05a6c7b21d3e4f5a6b7c8d9e0f1a20000' : PUBLISHER,
    contentHash: '5d41402abc4b2a76b9719d911017c592ae2f3b6c1d0e9f8a7b6c5d4e3f2a1b0c',
    raw: { id, kind: 1063, pubkey: PUBLISHER, created_at: Math.round(v.at / 1000), tags: [['app', 'pearkit-studio'], ['v', v.version], ['os', 'darwin-arm64']], content: v.notes },
  };
};

const meta: Meta<typeof UpdatesPanel> = {
  title: 'Patterns/UpdatesPanel',
  component: UpdatesPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The Updates block of an app's settings, laid out as PearDrive's: one line per row, the label on the left and the answer on the right. **Latest** carries the answer (up to date, or the Update button) with Check beside it; **Versions** is a framed list, yours marked \"Your version\", the newest with the bright Install; the channel and its publisher sit behind **Advanced**; pressing a version opens its notes and signature in a window. The app's update channel drives it; this only shows it. `UpdateNotice` is the same news in the sidebar.",
      },
    },
  },
  args: { appName: 'Pearkit Studio', running: '0.1.6', status: 'available', latest: '0.1.8', behind: 2, versions: VERSIONS, channel: { name: 'Pearkit Studio', publisher: PUBLISHER }, canInstall: true },
  argTypes: {
    status: { control: 'select', options: ['starting', 'no-channel', 'connecting', 'up-to-date', 'available', 'downloading', 'installing', 'none-posted'] },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
};
export default meta;
type Story = StoryObj<typeof UpdatesPanel>;

/** The block where it lives: a section of a settings page. */
function InSettings({ children }: { children: React.ReactNode }) {
  return (
    <View className="bg-background p-6">
      <View className="w-[480px] gap-2 rounded-xl border border-overlay/10 bg-pane p-5">
        <SectionLabel label="Updates" />
        {children}
      </View>
    </View>
  );
}

export const Playground: Story = {
  render: (args) => (
    <InSettings>
      <UpdatesPanel {...args} loadRelease={full} onCopy={() => {}} onCheck={() => {}} onInstall={() => {}} />
    </InSettings>
  ),
};

/** Press Update: it downloads, installs, and the list moves "Your version" to the top. */
function Simulated() {
  const [running, setRunning] = useState('0.1.6');
  const [status, setStatus] = useState<UpdatesStatus>('available');
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState('0.1.8');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);
  const install = (id?: string) => {
    const to = VERSIONS.find((v) => v.id === id)?.version ?? '0.1.8';
    setTarget(to);
    setStatus('downloading');
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          clearInterval(timer.current!);
          setStatus('installing');
          setTimeout(() => {
            setRunning(to);
            setStatus(to === '0.1.8' ? 'up-to-date' : 'available');
          }, 1400);
          return 1;
        }
        return Math.min(1, p + 0.08);
      });
    }, 120);
  };
  const behind = VERSIONS.findIndex((v) => v.version === running);
  return (
    <InSettings>
      <UpdatesPanel
        appName="Pearkit Studio"
        running={running}
        status={status}
        latest={status === 'downloading' || status === 'installing' ? target : '0.1.8'}
        behind={behind}
        progress={status === 'downloading' ? progress : undefined}
        versions={VERSIONS}
        channel={{ name: 'Pearkit Studio', publisher: PUBLISHER }}
        loadRelease={full}
        onCopy={() => {}}
        onCheck={() => {}}
        onInstall={install}
      />
    </InSettings>
  );
}

export const OnePress: Story = {
  name: 'One press: download, install',
  render: () => <Simulated />,
};

export const States: Story = {
  render: () => (
    <View className="flex-row flex-wrap gap-4 bg-background p-6">
      {(
        [
          { status: 'starting' },
          { status: 'no-channel' },
          { status: 'connecting' },
          { status: 'none-posted' },
          { status: 'up-to-date', running: '0.1.8' },
          { status: 'available', behind: 2 },
          { status: 'downloading', progress: 0.42 },
          { status: 'installing' },
          { status: 'available', behind: 2, error: 'The download stopped: the publisher went offline.' },
          { status: 'available', behind: 2, canInstall: false },
        ] as Array<{ status: UpdatesStatus; running?: string; behind?: number; progress?: number; error?: string; canInstall?: boolean }>
      ).map((s, i) => (
        <View key={i} className="w-[360px] gap-2 rounded-xl border border-overlay/10 bg-pane p-4">
          <Text variant="micro" tone="subtle">
            {s.status}
            {s.error ? ' · failed' : ''}
            {s.canInstall === false ? ' · cannot install here' : ''}
          </Text>
          <UpdatesPanel appName="Pearkit Studio" running={s.running ?? '0.1.6'} latest="0.1.8" versions={s.status === 'starting' || s.status === 'no-channel' || s.status === 'connecting' || s.status === 'none-posted' ? [] : VERSIONS.slice(0, 3)} onCheck={() => {}} {...s} />
        </View>
      ))}
    </View>
  ),
};

/** Many versions, yours far down: "Your version" under the list scrolls to it. */
export const FarBehind: Story = {
  name: 'Far behind',
  args: { running: '0.1.2', behind: 6 },
  render: (args) => (
    <InSettings>
      <UpdatesPanel {...args} loadRelease={full} onCopy={() => {}} onCheck={() => {}} onInstall={() => {}} />
    </InSettings>
  ),
};
