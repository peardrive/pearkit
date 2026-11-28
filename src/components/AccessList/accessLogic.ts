/**
 * The rules behind `AccessList`, with no screen: how a path is shown, and what a typed folder becomes before it
 * is sent.
 */

/** `/Users/guy/Anjou/pearkit` → `~/Anjou/pearkit` when `home` is `/Users/guy`. */
export function shortPath(path: string, home?: string | null): string {
  if (!home) return path;
  const h = home.replace(/\/+$/, '');
  if (path === h) return '~';
  return path.startsWith(h + '/') ? '~' + path.slice(h.length) : path;
}

/** A typed folder, trimmed, quotes and a trailing slash removed; empty when there is nothing to add. */
export function cleanFolderInput(text: string): string {
  let s = text.trim().replace(/^(['"])(.*)\1$/, '$2').trim();
  if (s.length > 1) s = s.replace(/\/+$/, '');
  return s;
}

/** Whether a typed folder is worth sending: a path that starts at the disk or at home. */
export function looksLikeFolder(text: string): boolean {
  const s = cleanFolderInput(text);
  return /^(\/|~\/)./.test(s) && !s.includes('*');
}
