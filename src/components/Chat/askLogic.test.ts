import { describe, expect, it } from 'vitest';
import { askOutcomeLine, askStatus, askTimeLeft, choiceWords } from './askLogic';

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
    expect(choiceWords('allow_always')).toBe('allowed always');
    expect(choiceWords('reject_once')).toBe('refused');
    expect(choiceWords('reject_always')).toBe('refused always');
  });

  it('counts down in minutes, then seconds', () => {
    expect(askTimeLeft(NOW + 9 * 60_000 + 20_000, NOW)).toBe('9 min left');
    expect(askTimeLeft(NOW + 89_000, NOW)).toBe('89 s left');
    expect(askTimeLeft(NOW + 400, NOW)).toBe('1 s left');
    expect(askTimeLeft(NOW, NOW)).toBe('lapsed');
  });

  it('names who answered and from where', () => {
    expect(askOutcomeLine('allowed', { choice: 'allow_once', by: 'guy', device: 'macbook', ts: NOW })).toBe('allowed once by guy (macbook)');
    expect(askOutcomeLine('refused', { choice: 'reject_once', by: 'guy', ts: NOW })).toBe('refused by guy');
    expect(askOutcomeLine('lapsed', null)).toBe('nobody answered in time: refused');
    expect(askOutcomeLine('open', null)).toBe('');
  });
});
