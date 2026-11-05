import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { PearDropDesktop } from './PearDropDesktop';

const meta: Meta<typeof PearDropDesktop> = {
  title: 'Layouts/PearDrop Desktop',
  component: PearDropDesktop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The full PearDrop desktop screen, built only from pearkit components: `Sidebar` (resizable, collapsible), `PaneHeader`, `SearchField`, `ShareRow`, `Toolbar`, `FileHeader`, `TransferCard`, `ShareLinkCard`, `KeyValueList` and `DangerZone`. Everything is interactive — filter from the sidebar, search, select rows, drag the sidebar edge, collapse it with the toggle.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View className="flex-1 items-center justify-center p-8">
        <View style={{ width: 1180, maxWidth: '100%' }}>
          <Story />
        </View>
      </View>
    ),
  ],
  args: { framed: true, resizable: true, initialSelectedId: 'photo_2' },
};
export default meta;
type Story = StoryObj<typeof PearDropDesktop>;

/** Matches the Figma frame, including the “Copy link” tooltip. */
export const Default: Story = { args: { showTooltip: true } };

/** Drag the sidebar's right edge (or focus it and use ←/→). Drag far left to collapse; double-click to reset. */
export const ResizableSidebar: Story = { name: 'Resizable sidebar', args: { resizable: true } };

/** Collapsed icon rail — items keep their tooltips, the network card shrinks to a status dot. */
export const CollapsedSidebar: Story = { name: 'Collapsed sidebar', args: { defaultCollapsed: true } };

/** A finished share: no transfer card, completed status. */
export const CompletedShare: Story = { name: 'Completed share', args: { initialSelectedId: 'photo' } };

/** Nothing selected in the list. */
export const NoSelection: Story = { name: 'No selection', args: { initialSelectedId: null } };

/** First run: no shares yet. */
export const Empty: Story = { args: { empty: true } };

/** Same screen in the light theme (toolbar theme switch works for every story). */
export const Light: Story = { globals: { theme: 'light' } };

/** Same screen with a custom theme created with `createTheme()`. */
export const CustomTheme: Story = { name: 'Custom theme (Blueberry)', globals: { theme: 'blueberry' } };
