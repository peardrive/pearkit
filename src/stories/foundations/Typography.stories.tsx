import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Text, type TextVariant } from '../../index';

const meta: Meta<typeof Text> = {
  title: 'Foundations/Typography',
  component: Text,
  parameters: { docs: { description: { component: 'Plus Jakarta Sans, with the type scale lifted from the Figma file. `Text` handles fonts per platform: CSS family + weight on web, one registered family per weight on native (`theme.fonts.native`).' } } },
  argTypes: {
    variant: { control: 'select', options: ['display', 'title', 'body-lg', 'body', 'body-sm', 'label', 'caption', 'micro', 'overline'] },
    weight: { control: 'inline-radio', options: [undefined, 'regular', 'medium', 'semibold', 'bold'] },
    tone: { control: 'select', options: [undefined, 'foreground', 'muted', 'subtle', 'primary-text', 'danger', 'warning', 'success'] },
  },
  args: { children: 'Share files peer-to-peer', variant: 'body' },
};
export default meta;

export const Playground: StoryObj<typeof Text> = {};

const scale: [TextVariant, string, string][] = [
  ['display', '21 / Bold', 'photo_2.mp4'],
  ['title', '18 / Bold', 'All Shares'],
  ['body-lg', '13.5 / SemiBold', 'Sharing with 3 peers'],
  ['body', '13 / Medium', 'Sharing now'],
  ['body-sm', '12.5 / Medium', 'Search shares'],
  ['label', '12 / Medium', 'Video · 1.2 GB · Added Jul 01, 2026'],
  ['caption', '11.5 / Medium', '12 items · 2 transferring'],
  ['micro', '11 / Medium', 'Yesterday'],
  ['overline', '10.5 / SemiBold / +0.84', 'Library'],
];

export const Scale: StoryObj<typeof Text> = {
  render: () => (
    <View className="gap-4">
      {scale.map(([v, spec, sample]) => (
        <View key={v} className="flex-row items-baseline gap-6">
          <View className="w-[170px] gap-0.5">
            <Text variant="label" weight="semibold">{v}</Text>
            <Text variant="micro">{spec}</Text>
          </View>
          <Text variant={v}>{sample}</Text>
        </View>
      ))}
    </View>
  ),
};

export const Tones: StoryObj<typeof Text> = {
  render: () => (
    <View className="gap-2">
      {(['foreground', 'muted', 'subtle', 'primary-text', 'success', 'warning', 'danger', 'info'] as const).map((t) => (
        <Text key={t} tone={t} variant="body">{t}</Text>
      ))}
    </View>
  ),
};
