import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { MobileDetailScreen, MobileListScreen, PearDropMobile, PhoneFrame } from './PearDropMobile';

const meta: Meta = {
  title: 'Layouts/PearDrop Mobile',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'The same components re-arranged for a React Native phone app: `PaneHeader` (display size, back button), `SearchField`, `NetworkStatusCard`, `ShareRow`, and the vertical layouts of `FileHeader`, `ShareLinkCard` and `DangerZone`. No web-only code — this is what runs on iOS/Android.' } },
  },
  decorators: [(Story) => <View className="flex-1 flex-row flex-wrap items-start justify-center gap-10 p-10"><Story /></View>],
};
export default meta;

/** Tap a row to navigate to its detail screen. */
export const Interactive: StoryObj = { render: () => <PearDropMobile /> };

export const Screens: StoryObj = {
  render: () => (
    <>
      <PhoneFrame><MobileListScreen /></PhoneFrame>
      <PhoneFrame><MobileDetailScreen /></PhoneFrame>
    </>
  ),
};

export const Light: StoryObj = { ...Screens, globals: { theme: 'light' } };
