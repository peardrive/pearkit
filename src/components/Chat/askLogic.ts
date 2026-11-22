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
      return 'allowed always';
    case 'reject_always':
      return 'refused always';
    default:
      return 'refused';
  }
}

/** "9 min left", "40 s left", or "lapsed". */
export function askTimeLeft(expires: number, now = Date.now()): string {
  const ms = expires - now;
  if (ms <= 0) return 'lapsed';
  if (ms < 90_000) return `${Math.max(1, Math.round(ms / 1000))} s left`;
  return `${Math.round(ms / 60_000)} min left`;
}

/** The one line under an answered or lapsed ask: "allowed once by guy (macbook)". */
export function askOutcomeLine(status: AskStatus, answer: AskAnswer | null | undefined): string {
  if (answer) return `${choiceWords(answer.choice)} by ${answer.by}${answer.device ? ` (${answer.device})` : ''}`;
  if (status === 'lapsed') return 'nobody answered in time: refused';
  return '';
}
