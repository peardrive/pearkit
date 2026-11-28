import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { View } from 'react-native';
import { Dialog } from './Dialog';
import { Button } from '@/components/buttons/Button/Button';
import { TextField } from '@/components/input/TextField/TextField';
import { Text } from '@/components/foundations/Text/Text';

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Centered modal on top of React Native `Modal` (portalled on web, with the theme re-applied inside). Escape and backdrop close it; `actions` render as a right-aligned footer. `onSubmit` names the one main action: Enter presses it, never with `destructive`.' } },
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

/** Enter presses the main action: the link is typed, Enter joins, once. Nothing to join with, nothing happens. */
export const EnterJoins: Story = {
  name: 'Enter presses the main action',
  render: () => {
    const [open, setOpen] = useState(true);
    const [link, setLink] = useState('');
    const [joined, setJoined] = useState(0);
    const join = () => { setJoined((n) => n + 1); setOpen(false); };
    return (
      <View className="p-6 gap-3">
        <Button variant="secondary" icon="arrow-down" label="Receive" onPress={() => setOpen(true)} className="self-start" />
        <Text variant="body" tone="muted">{`Joined ${joined} time${joined === 1 ? '' : 's'}`}</Text>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          icon="arrow-down"
          title="Receive files"
          description="Paste the share link and press Enter."
          onSubmit={join}
          submitDisabled={!link.trim()}
          actions={<><Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} /><Button label="Join space" variant="primary" icon="link" disabled={!link.trim()} onPress={join} /></>}
        >
          <TextField label="Share link" mono icon="link" placeholder="pearcore://…" value={link} onChangeText={setLink} autoFocus />
        </Dialog>
      </View>
    );
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement);
    const body = within(document.body);
    const field = await body.findByLabelText('Share link');
    await userEvent.click(field);
    await userEvent.keyboard('{Enter}');
    await expect(page.getByText('Joined 0 times')).toBeInTheDocument(); // nothing typed: the main button is not live
    await userEvent.type(field, 'a-link');
    await userEvent.keyboard('{Enter}{Enter}'); // twice in a moment is one join
    await waitFor(() => expect(page.getByText('Joined 1 time')).toBeInTheDocument());
    await waitFor(() => expect(body.queryByLabelText('Share link')).toBeNull());
    // and from anywhere in the dialog, with the keyboard in no field at all
    await new Promise((r) => setTimeout(r, 700));
    await userEvent.click(page.getByRole('button', { name: 'Receive' }));
    await body.findByLabelText('Share link');
    (document.activeElement as HTMLElement | null)?.blur?.();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(page.getByText('Joined 2 times')).toBeInTheDocument());
  },
};

/** Enter never deletes: the dialog stays, and the count stays at 0 until the button is clicked. */
export const EnterNeverDeletes: Story = {
  name: 'Enter never presses a delete',
  render: () => {
    const [open, setOpen] = useState(true);
    const [deleted, setDeleted] = useState(0);
    const remove = () => { setDeleted((n) => n + 1); setOpen(false); };
    return (
      <View className="p-6 gap-3">
        <Button variant="danger" icon="stop-circle" label="Delete post" onPress={() => setOpen(true)} className="self-start" />
        <Text variant="body" tone="muted">{`Deleted ${deleted}`}</Text>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete this post?"
          width={380}
          destructive
          onSubmit={remove}
          actions={<><Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} /><Button label="Delete post" variant="danger" onPress={remove} /></>}
        >
          <Text variant="body" tone="muted">It leaves the Space for everyone.</Text>
        </Dialog>
      </View>
    );
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement);
    const body = within(document.body);
    await body.findByText('Delete this post?');
    (document.activeElement as HTMLElement | null)?.blur?.();
    await userEvent.keyboard('{Enter}');
    await expect(page.getByText('Deleted 0')).toBeInTheDocument();
    await expect(body.getByText('Delete this post?')).toBeInTheDocument();
    await userEvent.click(within(body.getByRole('dialog')).getByRole('button', { name: 'Delete post' }));
    await waitFor(() => expect(page.getByText('Deleted 1')).toBeInTheDocument());
  },
};
