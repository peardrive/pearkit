/**
 * The rules of a comment thread and its numbers, with no screen in them: what `SocialBar`, `CommentThread`
 * and `CommentBox` draw. An app hands in what its engine answered and gets rows to draw.
 */

/** The numbers beside the marks under a post. */
export interface SocialCounts {
  likes: number;
  liked: boolean;
  comments: number;
}

/** One comment, as a thread shows it. `at` is milliseconds. */
export interface CommentData {
  id: string;
  /** A stable string for the writer (a key): picks the avatar. */
  author: string;
  name?: string | null;
  at: number;
  text: string;
  /** The comment this one answers. */
  parent?: string | null;
  likes?: number;
  liked?: boolean;
  /** Where it was written, for a thread gathered from several places. */
  where?: string | null;
  /** A moment in a video or a song this comment points at, in seconds. */
  seconds?: number | null;
}

/** A row of a thread: the comment, how deep it sits, and who it answers when that is not the comment above it. */
export interface CommentRowData<T extends CommentData = CommentData> {
  comment: T;
  depth: 0 | 1;
  replyTo: T | null;
}

/** A number beside a mark: nothing for 0, `1.2k` from a thousand on, `12k` from ten thousand on. */
export function formatCount(n: number | null | undefined): string {
  const v = Math.floor(Number(n) || 0);
  if (v <= 0) return '';
  if (v < 1000) return String(v);
  if (v < 10000) return `${Math.floor(v / 100) / 10}k`;
  if (v < 1000000) return `${Math.floor(v / 1000)}k`;
  return `${Math.floor(v / 100000) / 10}M`;
}

/** How long ago: `just now`, `5m ago`, `3h ago`, `2d ago`, then the date. */
export function formatAgo(at: number | null | undefined, now: number = Date.now()): string {
  if (!at) return '';
  const s = Math.max(0, (now - at) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d ago`;
  return new Date(at).toLocaleDateString();
}

/**
 * A thread in the order it is read: each comment, then the answers under it, in the order given (oldest
 * first). An answer to an answer stays under the same comment and names who it answers. An answer whose
 * comment is not in the list stands on its own.
 */
export function commentTree<T extends CommentData>(comments: readonly T[] | null | undefined): CommentRowData<T>[] {
  const list = comments ?? [];
  const by = new Map(list.map((c) => [c.id, c]));
  const rootOf = (c: T): T => {
    let r = c;
    let n = 0;
    while (r.parent && by.has(r.parent) && n++ < 64) r = by.get(r.parent) as T;
    return r;
  };
  const tops: T[] = [];
  const kids = new Map<string, T[]>();
  for (const c of list) {
    const r = rootOf(c);
    // (a loop of parents: each of its comments stands alone)
    if (r === c || (r.parent && by.has(r.parent))) { tops.push(c); continue; }
    const under = kids.get(r.id);
    if (under) under.push(c); else kids.set(r.id, [c]);
  }
  const out: CommentRowData<T>[] = [];
  for (const t of tops) {
    out.push({ comment: t, depth: 0, replyTo: null });
    for (const k of kids.get(t.id) ?? []) {
      out.push({ comment: k, depth: 1, replyTo: k.parent !== t.id ? by.get(k.parent as string) ?? null : null });
    }
  }
  return out;
}

/** The numbers after a like is given or taken back: never below zero, never counted twice. */
export function toggleLiked<T extends { likes?: number; liked?: boolean }>(c: T, on: boolean): T {
  if (!!c.liked === on) return c;
  return { ...c, liked: on, likes: Math.max(0, (Number(c.likes) || 0) + (on ? 1 : -1)) };
}

/** `Liked by Ada`, `Liked by Ada and Bo`, `Liked by Ada, Bo and 3 more`. Nothing when nobody did. */
export function formatLikers(names: readonly string[] | null | undefined, likes: number | null | undefined): string {
  const n = Number(likes) || 0;
  if (!n || !names?.length) return '';
  const shown = names.slice(0, 2);
  const rest = n - shown.length;
  return `Liked by ${rest > 0 ? `${shown.join(', ')} and ${rest} more` : shown.join(' and ')}`;
}
