import type { Meta, StoryObj } from '@storybook/react-vite';
import { QRCode } from './QRCode';
import { Showcase } from '../../stories/helpers';

const meta: Meta<typeof QRCode> = {
  title: 'Components/QRCode',
  component: QRCode,
  parameters: { docs: { description: { component: 'Real, scannable QR code generated in JS and drawn as one SVG path. Colours come from the `qr-foreground` / `qr-background` tokens.' } } },
  argTypes: { errorCorrection: { control: 'inline-radio', options: ['L', 'M', 'Q', 'H'] }, size: { control: { type: 'range', min: 64, max: 280, step: 4 } } },
  args: { value: 'peardrop://1de0909835728b6e0f3a4c19d2e7b8a5c6f71d0e9f684cb145a28', size: 108 },
};
export default meta;
export const Playground: StoryObj<typeof QRCode> = {};
export const Styles: StoryObj<typeof QRCode> = {
  render: () => (
    <Showcase>
      <QRCode value="peardrop://demo" size={108} />
      <QRCode value="peardrop://demo" size={108} color="#a6ce39" backgroundColor="#0d0c11" />
      <QRCode value="peardrop://demo" size={108} radius={54} padding={20} />
    </Showcase>
  ),
};
