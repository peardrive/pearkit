import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { QRScanner } from './QRScanner';

const meta: Meta<typeof QRScanner> = {
  title: 'Components/QRScanner',
  component: QRScanner,
  parameters: { docs: { description: { component: 'The camera as a QR reader, the counterpart of `QRCode`: a framed viewfinder with a close button, a title and description under it, and a paste alternative. The camera is `expo-camera`, an optional peer; where it is missing (here, on the web) the frame says so and offers the paste button, so the screen around it is the same screen everywhere.' } } },
  args: { title: 'Scan the project code', description: 'From the Project panel on the Mac.', pasteLabel: 'Paste the code instead' },
  decorators: [(Story) => <View style={{ width: 320 }}><Story /></View>],
};
export default meta;
export const Playground: StoryObj<typeof QRScanner> = { args: { onScan: () => {}, onPaste: () => {}, onClose: () => {} } };
export const NoPaste: StoryObj<typeof QRScanner> = { args: { onScan: () => {}, onPaste: undefined, onClose: () => {} } };
export const Wide: StoryObj<typeof QRScanner> = { args: { onScan: () => {}, onPaste: () => {}, aspectRatio: 16 / 10 } };
