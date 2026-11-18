import { useCallback, useMemo, useState } from 'react';
import { orderNumber, sendFirst as first, sendLast as last, toggleOrder } from '../../utils/order';

export interface OrderedSelection<K> {
  /** The chosen keys, in the order they were chosen. `order[0]` leads. */
  order: K[];
  /** A tap: choose `key` (it takes the next number) or let it go (the ones after it move up). */
  toggle: (key: K) => void;
  /** The number to show on `key`: 1 for the first chosen, 0 when it is not chosen. */
  numberOf: (key: K) => number;
  /** `key` takes the last number: the same as untapping it and tapping it again. */
  sendLast: (key: K) => void;
  /** `key` leads: it takes number 1, the others keep their order behind it. */
  sendFirst: (key: K) => void;
  clear: () => void;
  set: (order: K[]) => void;
}

/**
 * A selection that remembers the order things were chosen in. `max` stops choosing at that many (a tap on
 * one more does nothing; letting one go always works).
 */
export function useOrderedSelection<K>(initial: K[] = [], { max }: { max?: number } = {}): OrderedSelection<K> {
  const [order, set] = useState<K[]>(initial);
  const toggle = useCallback((key: K) => set((o) => (max != null && o.length >= max && !o.includes(key) ? o : toggleOrder(o, key))), [max]);
  const sendLast = useCallback((key: K) => set((o) => last(o, key)), []);
  const sendFirst = useCallback((key: K) => set((o) => first(o, key)), []);
  const clear = useCallback(() => set([]), []);
  const numberOf = useCallback((key: K) => orderNumber(order, key), [order]);
  return useMemo(() => ({ order, toggle, numberOf, sendLast, sendFirst, clear, set }), [order, toggle, numberOf, sendLast, sendFirst, clear]);
}
