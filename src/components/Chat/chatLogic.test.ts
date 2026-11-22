import { describe, expect, it } from 'vitest';
import { anchoredScrollY, groupsWith, placeOf, sameDay } from './chatLogic';
import type { ChatMessage } from './types';

const m = (id: string, author: string, ts: number): ChatMessage => ({ id, author: { id: author, name: author }, text: id, ts });

describe('anchoredScrollY: the keyboard slides the chat up, the place is kept', () => {
  it('shrinking the box by Δ scrolls down by Δ, so the newest visible message stays against the bottom edge', () => {
    // 2000px of messages, a 800px box scrolled to the end (1200); the keyboard takes 300px
    expect(anchoredScrollY(1200, 800, 500, 2000)).toBe(1500);
    // reading older messages at 400: the same message stays at the bottom edge
    expect(anchoredScrollY(400, 800, 500, 2000)).toBe(700);
  });
  it('growing the box scrolls back up by the same amount, never past the top', () => {
    expect(anchoredScrollY(1500, 500, 800, 2000)).toBe(1200);
    expect(anchoredScrollY(100, 500, 800, 2000)).toBe(0);
  });
  it('never scrolls past the end, and a short conversation stays at 0', () => {
    expect(anchoredScrollY(1200, 800, 500, 1600)).toBe(1100);
    expect(anchoredScrollY(0, 800, 500, 300)).toBe(0);
  });
});

describe('grouping', () => {
  it('groups one author within five minutes and starts a new day on the date', () => {
    const t = Date.UTC(2026, 0, 2, 12, 0, 0);
    const list = [m('a', 'guy', t), m('b', 'guy', t + 60_000), m('c', 'bot', t + 120_000), m('d', 'bot', t + 86_400_000)];
    expect(groupsWith(list[0], list[1])).toBe(true);
    expect(groupsWith(list[1], list[2])).toBe(false);
    expect(placeOf(list, 0)).toEqual({ first: true, last: false, newDay: true });
    expect(placeOf(list, 1)).toEqual({ first: false, last: true, newDay: false });
    expect(placeOf(list, 3).newDay).toBe(true);
    expect(sameDay(t, t + 1000)).toBe(true);
  });
});
