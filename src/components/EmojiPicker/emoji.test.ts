import { describe, expect, test } from 'vitest';

import { DEFAULT_QUICK_EMOJI, EMOJI_CATEGORIES, emojiEntry, pushRecent, searchEmoji } from './emoji';

describe('searchEmoji', () => {
  test('an empty or blank query finds nothing: the categories show instead', () => {
    expect(searchEmoji('')).toEqual([]);
    expect(searchEmoji('   ')).toEqual([]);
  });

  test('by name, case-insensitive, names before keywords', () => {
    const r = searchEmoji('Party');
    expect(r[0]).toBe('🥳'); // "partying face" by name
    expect(r).toContain('🎉'); // "party popper" by name
    expect(r).toContain('🎈'); // balloon, by the keyword "party"
    expect(r.indexOf('🥳')).toBeLessThan(r.indexOf('🎈'));
  });

  test('by keyword', () => {
    expect(searchEmoji('lol')).toContain('😂');
    expect(searchEmoji('bot')).toContain('🤖');
    expect(searchEmoji('approved')).toContain('✅');
  });

  test('every word must match', () => {
    expect(searchEmoji('green heart')).toEqual(['💚']);
    expect(searchEmoji('heart green')).toEqual(['💚']);
    expect(searchEmoji('green xyzzy')).toEqual([]);
  });

  test('each emoji once, and no more than the limit', () => {
    const r = searchEmoji('e');
    expect(new Set(r).size).toBe(r.length);
    expect(r.length).toBeLessThanOrEqual(64);
    expect(searchEmoji('e', EMOJI_CATEGORIES, 5)).toHaveLength(5);
  });

  test('the pear is in', () => {
    expect(searchEmoji('pear')).toContain('🍐');
  });
});

describe('the list', () => {
  test('no emoji appears in two categories', () => {
    const all = EMOJI_CATEGORIES.flatMap((c) => c.emojis.map((e) => e.char));
    const dup = all.filter((c, i) => all.indexOf(c) !== i);
    expect(dup).toEqual([]);
  });

  test('every entry has a name', () => {
    for (const c of EMOJI_CATEGORIES) for (const em of c.emojis) expect(em.name.length).toBeGreaterThan(0);
  });

  test('the quick six are all in the list', () => {
    for (const q of DEFAULT_QUICK_EMOJI) expect(emojiEntry(q)).toBeDefined();
  });

  test('emojiEntry finds one, or nothing', () => {
    expect(emojiEntry('🎉')?.name).toBe('party popper');
    expect(emojiEntry('nope')).toBeUndefined();
  });
});

describe('pushRecent', () => {
  test('moves the one used to the front, keeps the rest in order, caps the length', () => {
    expect(pushRecent(['a', 'b', 'c'], 'b')).toEqual(['b', 'a', 'c']);
    expect(pushRecent(['a', 'b'], 'z')).toEqual(['z', 'a', 'b']);
    expect(pushRecent(['a', 'b', 'c'], 'z', 3)).toEqual(['z', 'a', 'b']);
    expect(pushRecent([], 'a')).toEqual(['a']);
  });
});
