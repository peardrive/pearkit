/**
 * The rules of the activity feed, with no screen: what each kind looks like, how the time reads, how the
 * items fall into days. Pure, so a host that draws its own list keeps the same rules.
 */
import type { IconName } from '../../icons/registry';
import type { StatusTone } from '../../theme/tones';
import { dayLabel, sameDay } from '../Chat/chatLogic';

export type ActivityKind = 'mention' | 'approval' | 'done' | 'file' | 'publish' | 'member' | 'conversation' | 'project' | 'proposal' | 'zap' | 'error' | 'note';

export interface ActivityWho {
  id: string;
  name: string;
  agent?: boolean;
}

export interface ActivityWhere {
  org?: string;
  project: string;
  conversation?: string;
}

export interface ActivityItem {
  id: string;
  /** Milliseconds since the epoch. */
  ts: number;
  kind: ActivityKind;
  title: string;
  detail?: string;
  who?: ActivityWho;
  where?: ActivityWhere;
  unread?: boolean;
  /** One thing to do about it, right on the line (Approve, Open, Retry). */
  action?: { label: string; onPress: () => void };
}

/** The icon and tone of each kind. Replace entries to re-skin. */
export const activityKindMeta: Record<ActivityKind, { icon: IconName; tone: StatusTone; label: string }> = {
  mention: { icon: 'message', tone: 'primary', label: 'Mention' },
  approval: { icon: 'alert-circle', tone: 'warning', label: 'Needs you' },
  done: { icon: 'tick', tone: 'success', label: 'Done' },
  file: { icon: 'document-fill', tone: 'info', label: 'File' },
  publish: { icon: 'export', tone: 'info', label: 'Published' },
  member: { icon: 'people', tone: 'accent', label: 'Member' },
  conversation: { icon: 'message-fill', tone: 'neutral', label: 'Conversation' },
  project: { icon: 'folder-fill', tone: 'primary', label: 'Project' },
  proposal: { icon: 'edit', tone: 'accent', label: 'Proposal' },
  zap: { icon: 'bolt', tone: 'warning', label: 'Zap' },
  error: { icon: 'alert-circle', tone: 'danger', label: 'Error' },
  note: { icon: 'info-circle', tone: 'neutral', label: 'Note' },
};

/** `org › project › conversation`, with the parts that are there. */
export function whereLabel(where: ActivityWhere | undefined, separator = ' › '): string {
  if (!where) return '';
  return [where.org, where.project, where.conversation].filter((s): s is string => !!s).join(separator);
}

/** A short time for the right edge: `now`, `4m`, `2h` today; `9:41 AM` earlier today is `h`; `Tue` this week; `Nov 3` before. */
export function whenLabel(ts: number, now: number = Date.now()): string {
  const diff = now - ts;
  if (diff < 45_000) return 'now';
  if (diff < 3_600_000) return `${Math.max(1, Math.round(diff / 60_000))}m`;
  if (sameDay(ts, now)) return `${Math.round(diff / 3_600_000)}h`;
  if (diff < 6 * 86_400_000) return new Date(ts).toLocaleDateString([], { weekday: 'short' });
  const d = new Date(ts);
  const n = new Date(now);
  return d.toLocaleDateString([], d.getFullYear() === n.getFullYear() ? { month: 'short', day: 'numeric' } : { year: 'numeric', month: 'short', day: 'numeric' });
}

export interface ActivityDay<T extends { ts: number }> {
  label: string;
  items: T[];
}

/** The items by day, newest day first, each day's items in the order given. */
export function groupByDay<T extends { ts: number }>(items: readonly T[], now: number = Date.now()): ActivityDay<T>[] {
  const days: ActivityDay<T>[] = [];
  for (const item of items) {
    const current = days[days.length - 1];
    if (current && sameDay(current.items[0]!.ts, item.ts)) current.items.push(item);
    else days.push({ label: dayLabel(item.ts, now), items: [item] });
  }
  return days;
}

/** How many are unread. */
export function unreadCount(items: readonly { unread?: boolean }[]): number {
  return items.reduce((n, i) => n + (i.unread ? 1 : 0), 0);
}
