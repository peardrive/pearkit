import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { SectionLabel } from './SectionLabel';
import { IconButton } from '../IconButton/IconButton';

const meta: Meta<typeof SectionLabel> = {
  title: 'Components/SectionLabel',
  component: SectionLabel,
  parameters: { docs: { description: { component: 'Uppercase, tracked overline that titles a group: LIBRARY, STATUS, IN PROGRESS · 2, DETAILS.' } } },
  argTypes: { inset: { control: 'inline-radio', options: ['sidebar', 'list', 'none'] } },
  args: { label: 'In progress', count: 2, inset: 'list' },
  decorators: [(Story) => <View style={{ width: 300 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof SectionLabel> = {};
export const Examples: StoryObj<typeof SectionLabel> = {
  render: () => (
    <View>
      <SectionLabel label="Library" />
      <SectionLabel label="Recent" inset="list" />
      <SectionLabel label="Folders" trailing={<IconButton icon="add" size="xs" accessibilityLabel="New folder" />} />
    </View>
  ),
};
