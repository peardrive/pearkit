import { describe, expect, it } from 'vitest';
import { askFoldCounts, askFoldLine, askOutcomeLine, askStatus, askTimeLeft, choiceWords, type FoldedAsk } from './askLogic';

const NOW = 1_700_000_000_000;

describe('an agent asking a person', () => {
  it('is open until answered or lapsed', () => {
    expect(askStatus({ expires: NOW + 1000 }, null, NOW)).toBe('open');
    expect(askStatus({ expires: NOW - 1 }, null, NOW)).toBe('lapsed');
    expect(askStatus({ expires: NOW - 1 }, { choice: 'allow_once', by: 'guy', ts: NOW }, NOW)).toBe('allowed');
    expect(askStatus({ expires: NOW + 1000 }, { choice: 'reject_always', by: 'guy', ts: NOW }, NOW)).toBe('refused');
  });

  it('says the choice the way a person would', () => {
    expect(choiceWords('allow_once')).toBe('allowed once');
    expect(choiceWords('allow_always')).toBe('allowed for this project');
    expect(choiceWords('reject_once')).toBe('refused');
    expect(choiceWords('reject_always')).toBe('refused always');
  });

  it('counts down in minutes, then seconds', () => {
    expect(askTimeLeft(NOW + 9 * 60_000 + 20_000, NOW)).toBe('9 min left');
    expect(askTimeLeft(NOW + 89_000, NOW)).toBe('89 s left');
    expect(askTimeLeft(NOW + 400, NOW)).toBe('1 s left');
    expect(askTimeLeft(NOW, NOW)).toBe('lapsed');
    expect(askTimeLeft(NOW + 24 * 3600_000, NOW)).toBe('waiting for you');
    expect(askTimeLeft(NOW + 80 * 60_000, NOW)).toBe('80 min left');
  });

  it('names who answered and from where', () => {
    expect(askOutcomeLine('allowed', { choice: 'allow_once', by: 'guy', device: 'macbook', ts: NOW })).toBe('allowed once by guy (macbook)');
    expect(askOutcomeLine('refused', { choice: 'reject_once', by: 'guy', ts: NOW })).toBe('refused by guy');
    expect(askOutcomeLine('lapsed', null)).toBe('nobody answered: set aside');
    expect(askOutcomeLine('open', null)).toBe('');
  });
});

describe('the block the asks of one stretch fold into', () => {
  const a = (id: string, status: FoldedAsk['status'], what = `cmd ${id}`): FoldedAsk => ({ id, tool: 'Bash', what, status, by: status === 'allowed' || status === 'refused' ? 'guy' : null });

  it('names one ask and its outcome', () => {
    expect(askFoldLine([a('1', 'allowed', 'npm test')])).toBe('asked for Bash: npm test · allowed');
    expect(askFoldLine([a('1', 'refused')], 4)).toBe('asked for Bash: cmd 1 · refused · 4 steps');
    expect(askFoldLine([a('1', 'lapsed')])).toBe('asked for Bash: cmd 1 · lapsed');
  });

  it('counts several, saying only what happened', () => {
    expect(askFoldLine([a('1', 'allowed'), a('2', 'allowed'), a('3', 'allowed')], 8)).toBe('asked for 3 permissions · 3 allowed · 8 steps');
    expect(askFoldLine([a('1', 'allowed'), a('2', 'refused'), a('3', 'lapsed')])).toBe('asked for 3 permissions · 1 allowed · 1 refused · 1 lapsed');
    expect(askFoldCounts([a('1', 'allowed'), a('2', 'refused')])).toEqual({ open: 0, allowed: 1, refused: 1, lapsed: 0 });
  });
});
