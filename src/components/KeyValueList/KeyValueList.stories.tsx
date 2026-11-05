import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { KeyValueList, KeyValueRow } from './KeyValueList';
import { StatusPill } from '../Status/StatusPill';

const meta: Meta<typeof KeyValueList> = {
  title: 'Components/KeyValueList',
  component: KeyValueList,
  parameters: { docs: { description: { component: 'Metadata list (the DETAILS block). Data-driven via `items`, or compose `KeyValueRow`s. Values can be any node; rows become pressable with `onPress`.' } } },
  args: {
    title: 'Details',
    items: [
      { label: 'Type', value: 'MP4 Video' },
      { label: 'Location', value: '~/Downloads' },
      { label: 'Added', value: 'Jul 01, 2026 · 14:32' },
    ],
  },
  decorators: [(Story) => <View style={{ width: 420 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof KeyValueList> = {};
export const Composed: StoryObj<typeof KeyValueList> = {
  render: () => (
    <KeyValueList title="Transfer">
      <KeyValueRow label="Status" value={<StatusPill status="sharing" progress={0.98} />} />
      <KeyValueRow label="Location" value="~/Downloads" onPress={fn()} />
      <KeyValueRow label="Encryption" value="Noise · end-to-end" divider={false} />
    </KeyValueList>
  ),
};
