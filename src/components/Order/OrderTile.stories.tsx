import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { OrderTile } from './OrderTile';
import { OrderBadge } from './OrderBadge';
import { useOrderedSelection } from './useOrderedSelection';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { Showcase, Column } from '../../stories/helpers';

const meta: Meta<typeof OrderTile> = {
  title: 'Components/OrderTile',
  component: OrderTile,
  parameters: { docs: { description: { component: 'Choosing things in order. A tap gives a tile the next number (1, 2, 3) in place of a check mark; a tap on a chosen tile lets it go and the ones after it move up. Number 1 leads: the main picture or video of a post. `useOrderedSelection` holds the order, `OrderBadge` is the number alone, and the rule itself is in `utils/order` for pages that are not React.' } } },
};
export default meta;

const COLOURS = ['#b4532a', '#2a7ab4', '#3a9d5d', '#8a4fb4', '#b49a2a', '#b42a5c', '#2ab4a6', '#5c6470'];

function Grid({ max }: { max?: number }) {
  const sel = useOrderedSelection<number>([], { max });
  return (
    <View style={{ gap: 10, width: 4 * 84 + 3 * 6 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {COLOURS.map((c, i) => (
          <OrderTile key={i} n={sel.numberOf(i)} onPress={() => sel.toggle(i)} size={84} label={`Picture ${i + 1}`} dimUnchosen chosen={sel.order.length}>
            <View style={{ flex: 1, backgroundColor: c }} />
          </OrderTile>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text variant="caption" tone="muted" style={{ flex: 1 }}>
          {sel.order.length ? `In this order: ${sel.order.map((i) => i + 1).join(', ')}. The first one leads.` : 'Tap the pictures in the order you want them.'}
        </Text>
        <Button label="Clear" size="sm" variant="ghost" onPress={sel.clear} disabled={!sel.order.length} />
      </View>
    </View>
  );
}

export const TapInOrder: StoryObj<typeof OrderTile> = {
  render: () => <Grid />,
  // The rule, tapped through: numbers follow the taps, letting one go moves the rest up, tapping it again sends it last.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const tile = (n: number) => c.getByRole('checkbox', { name: new RegExp(`^Picture ${n},`) });
    for (const n of [3, 1, 5]) await userEvent.click(tile(n));
    await expect(tile(3)).toHaveAccessibleName('Picture 3, number 1, leads');
    await expect(tile(1)).toHaveAccessibleName('Picture 1, number 2');
    await expect(tile(5)).toHaveAccessibleName('Picture 5, number 3');
    await expect(tile(2)).toHaveAccessibleName('Picture 2, not chosen');
    await userEvent.click(tile(3));
    await expect(tile(1)).toHaveAccessibleName('Picture 1, number 1, leads');
    await expect(tile(5)).toHaveAccessibleName('Picture 5, number 2');
    await userEvent.click(tile(3));
    await expect(tile(3)).toHaveAccessibleName('Picture 3, number 3');
  },
};
export const AtMostFour: StoryObj<typeof OrderTile> = {
  render: () => <Grid max={4} />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const tile = (n: number) => c.getByRole('checkbox', { name: new RegExp(`^Picture ${n},`) });
    for (const n of [1, 2, 3, 4, 5]) await userEvent.click(tile(n));
    await expect(tile(4)).toHaveAccessibleName('Picture 4, number 4');
    await expect(tile(5)).toHaveAccessibleName('Picture 5, not chosen');
  },
};

export const Badges: StoryObj<typeof OrderTile> = {
  render: () => (
    <Column>
      <Showcase title="Chosen: its number">
        <OrderBadge n={1} />
        <OrderBadge n={2} />
        <OrderBadge n={12} />
        <OrderBadge n={128} />
      </Showcase>
      <Showcase title="Not chosen: an empty ring, or nothing">
        <View style={{ backgroundColor: '#2a7ab4', padding: 8, borderRadius: 8 }}><OrderBadge n={0} /></View>
        <OrderBadge n={0} empty="none" />
      </Showcase>
      <Showcase title="Sizes">
        <OrderBadge n={3} size={16} />
        <OrderBadge n={3} size={22} />
        <OrderBadge n={3} size={30} />
      </Showcase>
    </Column>
  ),
};
