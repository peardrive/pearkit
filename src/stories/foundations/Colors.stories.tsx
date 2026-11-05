import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Text, colorTokenNames, useTheme, type ColorToken } from '../../index';

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { docs: { description: { component: 'Every colour token of the active theme (switch themes from the toolbar). In Tailwind use `bg-<token>`, `text-<token>`, `border-<token>` with any opacity modifier, e.g. `bg-overlay/[0.04]`. In JS use `useTheme().colors[token]`.' } } },
};
export default meta;

const groups: Record<string, ColorToken[]> = {
  Surfaces: ['background', 'pane', 'sidebar', 'sidebar-to', 'overlay', 'inset', 'tooltip', 'tooltip-foreground'],
  'Text & icons': ['foreground', 'muted', 'subtle', 'icon', 'icon-strong'],
  Brand: ['primary', 'primary-foreground', 'primary-strong', 'primary-text', 'selected'],
  Status: ['success', 'warning', 'danger', 'danger-foreground', 'neutral', 'info', 'accent', 'favorite'],
  'Window & QR': ['window-close', 'window-minimize', 'window-maximize', 'window-inactive', 'qr-background', 'qr-foreground'],
};

function Swatch({ token }: { token: ColorToken }) {
  const { colors } = useTheme();
  return (
    <View className="w-[132px] gap-1.5">
      <View className="h-14 w-full rounded-lg border border-overlay/10" style={{ backgroundColor: colors[token] }} />
      <Text variant="label" weight="semibold" numberOfLines={1}>{token}</Text>
      <Text variant="micro" numberOfLines={1}>{colors[token]}</Text>
    </View>
  );
}

export const Tokens: StoryObj = {
  render: () => (
    <View className="gap-7">
      {Object.entries(groups).map(([name, tokens]) => (
        <View key={name} className="gap-3">
          <Text variant="overline">{name}</Text>
          <View className="flex-row flex-wrap gap-4">{tokens.map((t) => <Swatch key={t} token={t} />)}</View>
        </View>
      ))}
      <Text variant="micro">{colorTokenNames.length} tokens</Text>
    </View>
  ),
};

/** The `overlay` token at the opacities the design uses for hover states, cards and hairlines. */
export const OverlayScale: StoryObj = {
  name: 'Overlay scale',
  render: () => (
    <View className="flex-row flex-wrap gap-3">
      {[
        ['bg-overlay/[0.03]', '3% · row hover'],
        ['bg-overlay/[0.04]', '4% · cards'],
        ['bg-overlay/5', '5% · inputs, subtle'],
        ['bg-overlay/[0.06]', '6% · secondary btn'],
        ['bg-overlay/[0.08]', '8% · active tool'],
        ['bg-overlay/10', '10% · dividers'],
      ].map(([cls, label]) => (
        <View key={cls} className="gap-1.5">
          <View className={`h-14 w-[132px] rounded-lg border border-overlay/[0.06] ${cls}`} />
          <Text variant="micro">{label}</Text>
        </View>
      ))}
    </View>
  ),
};
