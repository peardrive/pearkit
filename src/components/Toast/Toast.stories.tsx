import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { Toast, ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';
import { Column, Showcase } from '../../stories/helpers';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          'Short notices that stack at the bottom centre. Wrap the app in `ToastProvider` once; anywhere below, `const { toast, dismiss } = useToast()` and `toast({ title, description, tone, duration, action })`. Each goes after 4 s unless hovered (web) or given a `duration` of its own; `0` keeps it until dismissed. `Toast` is one notice as it looks.',
      },
    },
  },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'success', 'warning', 'danger', 'info'] } },
  args: { title: 'Saved to the project', description: 'drag-bar.png is in Pearkit crew › Files.', tone: 'success', action: { label: 'Open', onPress: fn() }, onDismiss: fn() },
  decorators: [(Story) => <View style={{ width: 420 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Column width={420}>
      <Showcase title="Tones">
        <Toast title="Copied" tone="neutral" onDismiss={fn()} />
        <Toast title="Sent to 3 people" tone="success" onDismiss={fn()} />
        <Toast title="Working offline" description="Messages go when you are back on." tone="warning" onDismiss={fn()} />
        <Toast title="Could not send" description="The room is not reachable right now." tone="danger" action={{ label: 'Retry', onPress: fn() }} onDismiss={fn()} />
        <Toast title="Pear joined the room" tone="info" onDismiss={fn()} />
      </Showcase>
      <Showcase title="Without ✕ or action">
        <Toast title="Settings saved" tone="success" />
      </Showcase>
    </Column>
  ),
};

function Demo() {
  const { toast, dismiss } = useToast();
  return (
    <View className="flex-row flex-wrap gap-2 p-6">
      <Button label="Neutral" variant="secondary" onPress={() => toast({ title: 'Copied', tone: 'neutral' })} />
      <Button label="Success" variant="secondary" onPress={() => toast({ title: 'Saved to the project', description: 'drag-bar.png is in Files.', tone: 'success', action: { label: 'Open', onPress: fn() } })} />
      <Button label="Warning" variant="secondary" onPress={() => toast({ title: 'Working offline', description: 'Messages go when you are back on.', tone: 'warning' })} />
      <Button label="Danger, stays" variant="secondary" onPress={() => toast({ title: 'Could not send', description: 'Dismiss me by hand.', tone: 'danger', duration: 0, action: { label: 'Retry', onPress: fn() } })} />
      <Button
        label="Info, 1.5 s"
        variant="secondary"
        onPress={() => {
          const id = toast({ title: 'Pear joined the room', tone: 'info', duration: 10000 });
          setTimeout(() => dismiss(id), 1500);
        }}
      />
    </View>
  );
}

/** The provider at work: press the buttons, hover a toast to hold it. */
export const Stack: Story = {
  name: 'ToastProvider',
  decorators: [(Story) => <View className="overflow-hidden rounded-card border border-overlay/[0.08]" style={{ width: 560, height: 360 }}><Story /></View>],
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
