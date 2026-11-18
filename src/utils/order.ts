// CHOOSING IN ORDER. A selection is the list of chosen keys in the order they were chosen. Tapping a thing
// that is not chosen gives it the next number; tapping a chosen one takes its number away and everything
// after it moves up one. So "untap, tap again" sends a thing to the end, and that is the one move that changes
// the order. Number 1 leads (the main picture or video of a post).
//
// Nothing of the screen is in here: OrderBadge and OrderTile draw it, useOrderedSelection holds it, and a
// page that is not React (PearDrive desktop) follows the same rule with its own badge (pear-ui: .pk-ordn).

/** Tap `key`: chosen -> not chosen (the rest move up), not chosen -> chosen, last. */
export function toggleOrder<K>(order: readonly K[], key: K): K[] {
  return order.includes(key) ? order.filter((k) => k !== key) : [...order, key];
}

/** The number shown on `key`: 1 for the first chosen, 0 when it is not chosen. */
export function orderNumber<K>(order: readonly K[], key: K): number {
  return order.indexOf(key) + 1;
}

/** Untap and tap again in one move: `key` takes the last number. Not chosen yet: it is added. */
export function sendLast<K>(order: readonly K[], key: K): K[] {
  return [...order.filter((k) => k !== key), key];
}

/** `key` leads: it takes number 1 and the others keep their order behind it. */
export function sendFirst<K>(order: readonly K[], key: K): K[] {
  return [key, ...order.filter((k) => k !== key)];
}

/** A list put in the selection's order: the chosen ones first, by number, then the rest as they were. */
export function inOrder<T, K>(list: readonly T[], order: readonly K[], keyOf: (x: T) => K): T[] {
  const at = new Map(order.map((k, i) => [k, i] as const));
  const chosen = list.filter((x) => at.has(keyOf(x))).sort((a, b) => at.get(keyOf(a))! - at.get(keyOf(b))!);
  return [...chosen, ...list.filter((x) => !at.has(keyOf(x)))];
}
