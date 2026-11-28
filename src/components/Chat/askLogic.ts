/**
 * An agent asking a person for a permission, as the chat shows it (rKeyChat's `ask` record and its `answer`): the
 * rules behind `AskCard`, with no screen.
 */

/** What the person can say: the agent's own four choices (ACP's permission options). */
export type AskChoice = 'allow_once' | 'allow_always' | 'reject_once' | 'reject_always';

export interface AskAnswer {
  choice: AskChoice;
  /** Who answered, and from which device. */
  by: string;
  device?: string;
  ts: number;
}

export type AskStatus = 'open' | 'allowed' | 'refused' | 'lapsed';

/** Where an ask stands: answered (allowed or refused), still open, or lapsed with nobody answering. */
export function askStatus(ask: { expires: number }, answer: AskAnswer | null | undefined, now = Date.now()): AskStatus {
  if (answer) return answer.choice.startsWith('allow') ? 'allowed' : 'refused';
  return ask.expires > now ? 'open' : 'lapsed';
}

/** "allowed once", "allowed always", "refused", "refused always". */
export function choiceWords(choice: AskChoice): string {
  switch (choice) {
    case 'allow_once':
      return 'allowed once';
    case 'allow_always':
      return 'allowed for this project';
    case 'reject_always':
      return 'refused always';
    default:
      return 'refused';
  }
}

/**
 * "9 min left", "40 s left", or "lapsed"; a question with more than an hour and a half to go just says it is
 * waiting (an ask waits for its person, by default a day: the countdown would only be noise).
 */
export function askTimeLeft(expires: number, now = Date.now()): string {
  const ms = expires - now;
  if (ms <= 0) return 'lapsed';
  if (ms >= 90 * 60_000) return 'waiting for you';
  if (ms < 90_000) return `${Math.max(1, Math.round(ms / 1000))} s left`;
  return `${Math.round(ms / 60_000)} min left`;
}

/** The one line under an answered or lapsed ask: "allowed once by guy (macbook)". */
export function askOutcomeLine(status: AskStatus, answer: AskAnswer | null | undefined): string {
  if (answer) return `${choiceWords(answer.choice)} by ${answer.by}${answer.device ? ` (${answer.device})` : ''}`;
  if (status === 'lapsed') return 'nobody answered: set aside';
  return '';
}

/** One ask as the folded block lists it: the tool, what it would do, and where it stands. */
export interface FoldedAsk {
  id: string;
  tool: string;
  what: string;
  status: AskStatus;
  /** Who answered, when someone did. */
  by?: string | null;
}

/** How many of the folded asks ended each way. */
export function askFoldCounts(asks: FoldedAsk[]): Record<AskStatus, number> {
  const c: Record<AskStatus, number> = { open: 0, allowed: 0, refused: 0, lapsed: 0 };
  for (const a of asks) c[a.status]++;
  return c;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/**
 * The one line a stretch of asked permissions folds into: "asked for 3 permissions · 3 allowed", with the
 * refusals and lapses when there were any, and the steps around them ("· 8 steps") when there were.
 */
export function askFoldLine(asks: FoldedAsk[], steps = 0): string {
  const c = askFoldCounts(asks);
  const parts: string[] = [];
  if (asks.length === 1) parts.push(`asked for ${asks[0].tool}: ${asks[0].what}`, c.allowed ? 'allowed' : c.refused ? 'refused' : c.lapsed ? 'lapsed' : 'open');
  else {
    parts.push(`asked for ${plural(asks.length, 'permission')}`);
    if (c.allowed) parts.push(`${c.allowed} allowed`);
    if (c.refused) parts.push(`${c.refused} refused`);
    if (c.lapsed) parts.push(`${c.lapsed} lapsed`);
  }
  if (steps) parts.push(plural(steps, 'step'));
  return parts.join(' · ');
}
