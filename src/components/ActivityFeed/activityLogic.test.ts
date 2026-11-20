import { describe, expect, test } from 'vitest';

import { activityKindMeta, groupByDay, unreadCount, whenLabel, whereLabel } from './activityLogic';

const NOW = new Date(2026, 10, 19, 15, 0, 0).getTime(); // a Thursday, 3 PM
const min = 60_000;
const hour = 60 * min;
const day = 24 * hour;

describe('whereLabel', () => {
  test('org, project and conversation, with the parts that are there', () => {
    expect(whereLabel({ org: 'PearDrive', project: 'Pearkit', conversation: 'Chat pieces' })).toBe('PearDrive › Pearkit › Chat pieces');
    expect(whereLabel({ project: 'Pearkit' })).toBe('Pearkit');
    expect(whereLabel({ project: 'Pearkit', conversation: 'Chat pieces' }, ' / ')).toBe('Pearkit / Chat pieces');
    expect(whereLabel(undefined)).toBe('');
  });
});

describe('whenLabel', () => {
  test('just now, minutes, hours today', () => {
    expect(whenLabel(NOW - 10_000, NOW)).toBe('now');
    expect(whenLabel(NOW - 4 * min, NOW)).toBe('4m');
    expect(whenLabel(NOW - 59 * min, NOW)).toBe('59m');
    expect(whenLabel(NOW - 2 * hour, NOW)).toBe('2h');
  });

  test('a weekday within the week, a date before that, the year when it differs', () => {
    expect(whenLabel(NOW - 2 * day, NOW)).toBe(new Date(NOW - 2 * day).toLocaleDateString([], { weekday: 'short' }));
    expect(whenLabel(NOW - 20 * day, NOW)).toBe(new Date(NOW - 20 * day).toLocaleDateString([], { month: 'short', day: 'numeric' }));
    expect(whenLabel(NOW - 400 * day, NOW)).toBe(new Date(NOW - 400 * day).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }));
  });

  test('earlier today past midnight is hours, not a weekday', () => {
    const early = new Date(2026, 10, 19, 0, 30).getTime();
    expect(whenLabel(early, NOW)).toBe('15h');
  });
});

describe('groupByDay', () => {
  test('consecutive items of one day share a group, in the order given', () => {
    const items = [
      { id: 'a', ts: NOW - 5 * min },
      { id: 'b', ts: NOW - 3 * hour },
      { id: 'c', ts: NOW - day },
      { id: 'd', ts: NOW - day - hour },
      { id: 'e', ts: NOW - 5 * day },
    ];
    const days = groupByDay(items, NOW);
    expect(days.map((d) => d.label)).toEqual(['Today', 'Yesterday', new Date(NOW - 5 * day).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })]);
    expect(days.map((d) => d.items.map((i) => i.id))).toEqual([['a', 'b'], ['c', 'd'], ['e']]);
  });

  test('nothing in, nothing out', () => {
    expect(groupByDay([], NOW)).toEqual([]);
  });
});

describe('unreadCount and kinds', () => {
  test('counts the unread ones', () => {
    expect(unreadCount([{ unread: true }, {}, { unread: false }, { unread: true }])).toBe(2);
  });

  test('every kind has an icon and a tone', () => {
    for (const k of ['mention', 'approval', 'done', 'file', 'publish', 'member', 'conversation', 'project', 'proposal', 'zap', 'error', 'note'] as const) {
      expect(activityKindMeta[k].icon).toBeTruthy();
      expect(activityKindMeta[k].tone).toBeTruthy();
    }
  });
});
