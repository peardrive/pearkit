import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentBox, type CommentBoxProps } from './CommentBox';
import { Showcase, Column } from '../../stories/helpers';

function Held(props: Partial<CommentBoxProps> & { start?: string }) {
  const [text, setText] = useState(props.start ?? '');
  return <View className="w-[360px]"><CommentBox {...props} value={text} onChangeText={setText} onSend={() => setText('')} /></View>;
}

const meta: Meta<typeof CommentBox> = {
  title: 'Components/CommentBox',
  component: CommentBox,
  parameters: { docs: { description: { component: 'The box a comment is written in: one line that grows with its text up to `maxLines`, Send at its right, a banner while answering somebody. On a keyboard, Enter sends and Shift+Enter starts a new line. The box does not empty itself: the app does, once the comment went, so a comment that failed keeps its words.' } } },
  args: { maxLines: 5 },
  render: (args) => <Held {...args} />,
};
export default meta;
export const Playground: StoryObj<typeof CommentBox> = {};
export const Variants: StoryObj<typeof CommentBox> = {
  render: () => (
    <Column>
      <Showcase title="Empty"><Held /></Showcase>
      <Showcase title="Grows with its text"><Held start={'One line.\nA second line.\nAnd a third, which is where it stands when it opens.'} /></Showcase>
      <Showcase title="Answering somebody"><Held replyTo={{ name: 'Ada', where: 'Family' }} onCancelReply={() => {}} /></Showcase>
      <Showcase title="Sending"><Held start="On its way" sending /></Showcase>
      <Showcase title="It did not go"><Held start="Still here" error="The Space could not be reached. Try again." /></Showcase>
      <Showcase title="A note"><Held note="Removed on this device." /></Showcase>
      <Showcase title="Disabled"><Held disabled placeholder="Comments are off in this Space" /></Showcase>
    </Column>
  ),
};
