/**
 * The rules of the message list, with no screen: how messages group, what a time reads as. Pure functions,
 * so a host that draws its own list (a virtualised one, say) can use the same rules.
 */
import type { ChatMessage } from './types';

/** Messages from one author closer together than this share one name and avatar. */
export const GROUP_GAP_MS = 5 * 60 * 1000;

export interface MessagePlace {
  /** Starts a group: shows the name and avatar. */
  first: boolean;
  /** Ends a group: gets the time and the pointed corner. */
  last: boolean;
  /** The first message of a day. */
  newDay: boolean;
}

export function sameDay(a: number, b: number): boolean {
  const x = new Date(a);
  const y = new Date(b);
  return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate();
}

/** Two messages that would share a group: same author, same day, within `GROUP_GAP_MS`, neither a system line. */
export function groupsWith(a: ChatMessage | undefined, b: ChatMessage | undefined): boolean {
  if (!a || !b) return false;
  if (a.system || b.system) return false;
  if (a.author.id !== b.author.id) return false;
  if (Math.abs(b.ts - a.ts) > GROUP_GAP_MS) return false;
  return sameDay(a.ts, b.ts);
}

/** Where message `i` sits in its group and its day. */
export function placeOf(messages: readonly ChatMessage[], i: number): MessagePlace {
  const m = messages[i]!;
  const prev = messages[i - 1];
  const next = messages[i + 1];
  const newDay = !prev || !sameDay(prev.ts, m.ts);
  return { first: !groupsWith(prev, m), last: !groupsWith(m, next), newDay };
}

/** `9:41 AM` in the device's locale. */
export function messageTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

/** `Today`, `Yesterday`, or `Tuesday, Nov 3`. */
export function dayLabel(ts: number, now: number = Date.now()): string {
  const d = new Date(ts);
  const t = new Date(now);
  const start = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const days = Math.round((start(t) - start(d)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
}

/** The messages a message answers, in the order it names them, skipping ones that are not in the list. */
export function quotedMessages(message: ChatMessage, byId: ReadonlyMap<string, ChatMessage>): ChatMessage[] {
  return (message.re ?? []).map((id) => byId.get(id)).filter((m): m is ChatMessage => !!m);
}
