import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { ShareLinkCard } from './ShareLinkCard';

const meta: Meta<typeof ShareLinkCard> = {
  title: 'Patterns/ShareLinkCard',
  component: ShareLinkCard,
  parameters: { docs: { description: { component: 'Everything needed to hand a share to someone: a scannable QR, the copyable link and actions. Every string and action is configurable; `layout="vertical"` stacks it for phones.' } } },
  argTypes: { layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  args: { link: 'peardrop://1de0909835728b6e0f3a4c19d2e7b8a5c6f71d0e9f684cb145a28', onCopy: fn(), onSaveQr: fn() },
  decorators: [(Story) => <View style={{ width: 530 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof ShareLinkCard>;
export const Playground: Story = {};
export const Vertical: Story = { args: { layout: 'vertical', qrSize: 160 }, decorators: [(Story) => <View style={{ width: 340 }}><Story /></View>] };
export const LinkOnly: Story = { name: 'Without QR', args: { showQr: false, secondaryAction: { label: 'Share…', icon: 'export', onPress: fn() } } };
export const Localized: Story = {
  args: { title: 'Lien de partage', description: 'Toute personne disposant du lien peut télécharger tant que vous êtes en ligne', copyLabel: 'Copier', secondaryAction: { label: 'Enregistrer', icon: 'import' } },
};
