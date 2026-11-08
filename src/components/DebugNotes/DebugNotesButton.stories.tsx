import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DebugNotesButton } from './DebugNotesButton';
import { createDebugNotes, createUnavailableRecorder, type SaveNoteInput } from '../../debug';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { SearchField } from '../SearchField/SearchField';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { Text } from '../Text/Text';
import { Toolbar, ToolbarSpacer } from '../Toolbar/Toolbar';

const meta: Meta<typeof DebugNotesButton> = {
  title: 'Patterns/DebugNotesButton',
  component: DebugNotesButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The debug-notes button every app gets. Idle: a mic and a label. Recording: red, a five-bar level following the voice, and `m:ss · steps`. Without a microphone: grey, steps only, and the reason is kept on the note. Press to start, press again to stop; `save` receives `{ id, meta, steps, blob }`. Pair it with `createDebugNotes` (headless) and `useDebugNotes`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DebugNotesButton>;

/** A small app to click around in while a note records; the saved notes appear underneath. */
function Playground({ noMic }: { noMic?: boolean }) {
  const [saved, setSaved] = useState<SaveNoteInput[]>([]);
  const [view, setView] = useState('Files');
  const notes = useMemo(
    () =>
      createDebugNotes({
        app: 'storybook',
        where: () => ({ view }),
        describe: (_target, hit) => {
          const f = hit.closest('[data-file]')?.getAttribute('data-file');
          return f ? { text: `file ${f}`, data: { path: `/Photos/${f}` } } : null;
        },
        save: async (note) => {
          setSaved((s) => [note, ...s]);
          return { stored: true };
        },
        recorder: noMic ? createUnavailableRecorder('NotAllowedError: Permission denied') : undefined,
        log: (level, msg) => console[level === 'error' ? 'error' : 'log'](`[debug-notes] ${msg}`),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noMic],
  );
  useEffect(() => () => notes.uninstall(), [notes]);
  useEffect(() => {
    notes.trace.step('state', `view ${view}`, undefined, { group: 'view' });
  }, [notes, view]);

  return (
    <View className="min-h-[560px] bg-background">
      <Toolbar>
        <Text variant="body-lg">PearDrop</Text>
        <ToolbarSpacer />
        <SearchField placeholder="Search" className="w-56" />
        <DebugNotesButton notes={notes} onStopped={(s) => console.log('stopped', s)} />
      </Toolbar>
      <View className="flex-row gap-5 p-5">
        <View className="w-60 gap-2" accessibilityRole={'navigation' as never} aria-label="sidebar">
          <SectionLabel label="Library" />
          {['Files', 'Shared', 'Peers'].map((v) => (
            <Button key={v} label={v} variant={view === v ? 'secondary' : 'ghost'} size="sm" onPress={() => setView(v)} className="self-stretch" />
          ))}
        </View>
        <View className="flex-1 gap-3" aria-label="grid" accessibilityRole={'main' as never}>
          <Text variant="title">{view}</Text>
          <View className="flex-row flex-wrap gap-3">
            {['IMG_5238.MOV', 'notes.md', 'lego-7min.mp4', 'peardrive_v0.6.112.zip'].map((f) => (
              <Card key={f} className="w-44 p-3" {...({ dataSet: { file: f } } as object)}>
                <Text variant="body" truncate>
                  {f}
                </Text>
                <Text variant="caption" tone="muted">
                  click me while recording
                </Text>
              </Card>
            ))}
          </View>
          <Text variant="caption" tone="muted">
            Start a note, talk, click a few things, use ⌘K, scroll, then press the button again. The note lands below.
          </Text>
        </View>
      </View>
      <View className="gap-3 px-5 pb-5">
        <SectionLabel label={`Saved notes (${saved.length})`} />
        {saved.map((n) => (
          <Card key={n.id} className="gap-2 p-3">
            <Text variant="body-lg">
              {n.id} · {n.meta.seconds}s · {n.steps.length} steps{n.blob ? ` · audio ${Math.round(n.blob.size / 1024)} KB (${n.type})` : ` · NO AUDIO: ${n.meta.noAudio}`}
            </Text>
            <ScrollView className="max-h-56" nestedScrollEnabled>
              {n.steps.map((s, i) => (
                <Text key={i} variant="caption" tone="muted" style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>
                  {s.t.toFixed(1).padStart(6)} {s.kind.padEnd(11)} {s.text}
                  {s.times ? ` ×${s.times}` : ''}
                </Text>
              ))}
            </ScrollView>
          </Card>
        ))}
      </View>
    </View>
  );
}

export const Default: Story = {
  name: 'In a toolbar',
  render: () => <Playground />,
};

export const NoMicrophone: Story = {
  name: 'Without a microphone',
  parameters: { docs: { description: { story: 'The recorder was refused: the note runs grey, keeps every step, and `note.json` carries `noAudio` with the reason.' } } },
  render: () => <Playground noMic />,
};
