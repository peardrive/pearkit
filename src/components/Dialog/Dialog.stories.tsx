import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Text } from '../Text/Text';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Centered modal on top of React Native `Modal` (portalled on web, with the theme re-applied inside). Escape and backdrop close it; `actions` render as a right-aligned footer.' } },
  },
  decorators: [(Story) => <View style={{ minHeight: 560 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const JoinSpace: Story = {
  name: 'Form dialog',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <View className="p-6">
        <Button variant="secondary" icon="arrow-down" label="Receive" onPress={() => setOpen(true)} className="self-start" />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          icon="arrow-down"
          title="Receive files"
          description="Paste the share link someone sent you. You'll see their files as soon as you're connected."
          actions={<><Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} /><Button label="Join space" variant="primary" icon="link" onPress={() => setOpen(false)} /></>}
        >
          <TextField label="Share link" mono icon="link" placeholder="pearcore://…" autoFocus />
        </Dialog>
      </View>
    );
  },
};

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <View className="p-6">
        <Button variant="danger" icon="stop-circle" label="Stop sharing" onPress={() => setOpen(true)} className="self-start" />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Stop sharing photo_2.mp4?"
          width={380}
          actions={<><Button label="Keep sharing" variant="ghost" onPress={() => setOpen(false)} /><Button label="Stop sharing" variant="danger" onPress={() => setOpen(false)} /></>}
        >
          <Text variant="body" tone="muted">Peers that haven't finished downloading will lose access. The file stays on your disk.</Text>
        </Dialog>
      </View>
    );
  },
};
