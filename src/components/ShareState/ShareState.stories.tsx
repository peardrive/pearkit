import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';

import { Text } from '../Text/Text';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Column } from '../../stories/helpers';
import { ShareProgressBar } from './ShareProgressBar';
import { describeShareState, type ShareStateInput, type ShareStateTone } from './shareState';

/**
 * The universal states of a share: one word, one colour and one bar for each, the same in
 * every app and every layout.
 */
const meta = {
  title: 'Components/ShareState',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TONE: Record<ShareStateTone, string> = {
  good: '#a6ce39',
  busy: '#fbbf24',
  plain: '#9ca3af',
  bad: '#ef4444',
};

const STATES: [string, ShareStateInput][] = [
  ['The files are here and available', { kind: 'active' }],
  ['Someone is taking the file from you', { kind: 'sharing', percent: 12 }],
  ['The file is arriving', { kind: 'downloading', percent: 48 }],
  ['The sender was found; about to move', { kind: 'starting', percent: 23 }],
  ['Nobody to download from yet; carries on by itself', { kind: 'waiting', percent: 23 }],
  ['You paused it; it never restarts by itself', { kind: 'paused', percent: 23 }],
  ['Switched off', { kind: 'inactive' }],
  ['The list is here and nothing is asked for yet', { kind: 'choose' }],
  ['It cannot carry on without you', { kind: 'attention', note: 'Not enough space' }],
];

/** Every state: what it means, the line a row shows, and its bar. */
export const EveryState: Story = {
  render: () => (
    <Column width={560}>
      {STATES.map(([what, input]) => {
        const view = describeShareState(input);
        return (
          <View key={what} style={{ gap: 6, opacity: view.dim ? 0.55 : 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 24 }}>
              <Text variant="caption">{what}</Text>
              <Text style={{ color: TONE[view.tone], fontWeight: '600' }}>{view.label}</Text>
            </View>
            {view.bar ? <ShareProgressBar value={view.bar.value} look={view.bar.look} /> : null}
          </View>
        );
      })}
    </Column>
  ),
};

/** The moving bar beside Pearkit's own `ProgressBar`: the same track, radius and gradient. */
export const BesideTheOfficialBar: Story = {
  render: () => (
    <Column width={420}>
      <View style={{ gap: 8 }}>
        <Text variant="caption">ProgressBar (official)</Text>
        <ProgressBar value={0.48} />
      </View>
      <View style={{ gap: 8 }}>
        <Text variant="caption">ShareProgressBar, moving</Text>
        <ShareProgressBar value={0.48} look="moving" />
      </View>
      <View style={{ gap: 8 }}>
        <Text variant="caption">ShareProgressBar, holding (waiting)</Text>
        <ShareProgressBar value={0.48} look="holding" />
      </View>
      <View style={{ gap: 8 }}>
        <Text variant="caption">ShareProgressBar, stopped (paused)</Text>
        <ShareProgressBar value={0.48} look="stopped" />
      </View>
    </Column>
  ),
};
