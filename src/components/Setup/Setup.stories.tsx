import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Text } from '../Text/Text';
import { CalloutBlock } from './CalloutBlock';
import { ChoiceCard } from './ChoiceCard';
import { SetupStep } from './SetupStep';

const meta: Meta<typeof SetupStep> = {
  title: 'Setup/SetupStep',
  component: SetupStep,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A first-run flow, one thing at a time: SetupStep is the screen (dots, title, lead, content, Back / Skip / Continue), ChoiceCard is one of a few ways to do the step, and CalloutBlock is the standing notice on the home page for a step that was skipped.',
      },
    },
  },
  decorators: [(Story) => <View style={{ height: 640 }}><Story /></View>],
};
export default meta;
type Story = StoryObj<typeof SetupStep>;

function ConnectYourAI() {
  const [choice, setChoice] = useState<string | null>(null);
  const [key, setKey] = useState('');
  return (
    <SetupStep step={0} steps={3} icon="robot" title="Connect your AI" lead="Projects are worked on by an agent. Pick where its model comes from; you can change this any time in Settings." primary={{ label: 'Continue', onPress: () => {}, disabled: !choice }} onSkip={() => {}}>
      <ChoiceCard icon="robot" title="Claude subscription" description="Log in with your Claude account. Uses the plan you already pay for." selected={choice === 'claude'} onPress={() => setChoice('claude')} tag="recommended">
        <Button variant="primary" label="Log in with Claude" onPress={() => {}} />
      </ChoiceCard>
      <ChoiceCard icon="bolt" title="PPQ" description="Pay per question, no account needed. Paste a PPQ API key." selected={choice === 'ppq'} onPress={() => setChoice('ppq')}>
        <TextField mono password value={key} onChangeText={setKey} placeholder="sk-…" accessibilityLabel="PPQ API key" trailing={<Button size="sm" variant="primary" label="Save" disabled={!key} onPress={() => {}} />} />
      </ChoiceCard>
      <ChoiceCard icon="globe" title="OpenRouter" description="One key for many models. Paste an OpenRouter API key." selected={choice === 'openrouter'} onPress={() => setChoice('openrouter')} />
      <ChoiceCard icon="home" title="llama.cpp" description="A model running on this computer with llama-server. No key." selected={choice === 'llamacpp'} onPress={() => setChoice('llamacpp')} tag="no key" />
    </SetupStep>
  );
}

export const ConnectAI: Story = { render: () => <ConnectYourAI /> };

export const WhereProjectsLive: Story = {
  render: () => (
    <SetupStep step={1} steps={3} icon="folder" title="Where projects live" lead="Each project is a folder. New ones go here unless you pick another place." primary={{ label: 'Continue', onPress: () => {} }} onBack={() => {}} onSkip={() => {}}>
      <TextField mono value="/Users/ben/rKeyChat" onChangeText={() => {}} trailing={<Button size="sm" variant="secondary" label="Choose…" onPress={() => {}} />} />
    </SetupStep>
  ),
};

export const Ready: Story = {
  render: () => (
    <SetupStep step={2} steps={3} icon="tick" title="Ready" lead="Start a project from a folder, or make a new one. Your agent is listening in each." primary={{ label: 'Open rKeyChat', onPress: () => {} }} onBack={() => {}}>
      <View className="gap-1 rounded-card border border-overlay/[0.07] bg-overlay/[0.04] p-3.5">
        <Text variant="body">@ben on ben-macbook</Text>
        <Text variant="caption">AI: Claude subscription, logged in as ben@example.com</Text>
        <Text variant="caption">Projects: /Users/ben/rKeyChat</Text>
      </View>
    </SetupStep>
  ),
};

export const Callout: Story = {
  render: () => (
    <View className="gap-3 p-6" style={{ width: 560 }}>
      <CalloutBlock icon="robot" title="Connect your AI" description="Projects need an agent. Log in with Claude, or add PPQ, OpenRouter or llama.cpp." action={{ label: 'Set up', onPress: () => {} }} />
      <CalloutBlock tone="neutral" icon="folder" title="Pick where projects live" description="New projects go in ~/rKeyChat until you choose a folder." action={{ label: 'Choose', onPress: () => {} }} />
    </View>
  ),
};
