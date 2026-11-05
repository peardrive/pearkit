import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Icon, SearchField, Text, iconNames, iconRegistry, type IconName } from '../../index';

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons',
  component: Icon,
  parameters: { docs: { description: { component: 'Icons are drawn with react-native-svg, so they render everywhere and take any theme `tone` or `color`. The **vuesax** glyphs were exported verbatim from the PearDrop Figma file; **pearkit** glyphs were drawn on the same 24px / 1.5px grid. Add your own SVGs to `icons/` and run `npm run icons`.' } } },
  argTypes: {
    name: { control: 'select', options: iconNames },
    tone: { control: 'select', options: ['icon', 'icon-strong', 'foreground', 'muted', 'primary', 'success', 'warning', 'danger', 'accent', 'favorite'] },
    size: { control: { type: 'range', min: 12, max: 64, step: 1 } },
  },
  args: { name: 'folder', size: 32, tone: 'icon-strong' },
};
export default meta;

export const Playground: StoryObj<typeof Icon> = {};

export const Gallery: StoryObj<typeof Icon> = {
  render: () => {
    const [q, setQ] = useState('');
    const list = iconNames.filter((n) => n.includes(q.toLowerCase()));
    return (
      <View className="gap-5">
        <View style={{ width: 280 }}><SearchField placeholder={`Search ${iconNames.length} icons`} value={q} onChangeText={setQ} /></View>
        {(['vuesax', 'pearkit'] as const).map((set) => (
          <View key={set} className="gap-3">
            <Text variant="overline">{set === 'vuesax' ? 'From Figma (Vuesax)' : 'pearkit additions'}</Text>
            <View className="flex-row flex-wrap gap-2">
              {list.filter((n) => iconRegistry[n as IconName].set === set).map((n) => (
                <View key={n} className="h-[86px] w-[104px] items-center justify-center gap-2 rounded-lg border border-overlay/[0.06] bg-overlay/[0.03]">
                  <Icon name={n} size={22} tone="icon-strong" />
                  <Text variant="micro" numberOfLines={1}>{n}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  },
};
