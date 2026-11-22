import { describe, expect, it } from 'vitest';
import { syncBubbleLinger, syncProgressLabel, syncStateMeta, type SyncState } from './syncState';

describe('sync bubble', () => {
  it('has a tone and a dot behaviour for every state, and only one state glows', () => {
    const states: SyncState[] = ['saving', 'waiting', 'sending', 'synced', 'offline', 'failed'];
    for (const s of states) {
      expect(syncStateMeta[s].label.length).toBeGreaterThan(0);
      expect(syncStateMeta[s].pulse && syncStateMeta[s].glow).toBe(false); // never both
    }
    expect(states.filter((s) => syncStateMeta[s].glow)).toEqual(['synced']);
    expect(states.filter((s) => syncStateMeta[s].pulse)).toEqual(['saving', 'waiting', 'sending']);
  });

  it('counts files the way a person would', () => {
    expect(syncProgressLabel(0, 3)).toBe('0 of 3 files');
    expect(syncProgressLabel(2, 3)).toBe('2 of 3 files');
    expect(syncProgressLabel(3, 3)).toBe('3 files');
    expect(syncProgressLabel(1, 1)).toBe('1 file');
    expect(syncProgressLabel(0, 0)).toBe('');
    expect(syncProgressLabel(1, 2, 'step')).toBe('1 of 2 steps');
  });

  it('lingers briefly after success, longer after a failure, gives up a wait after two minutes', () => {
    expect(syncBubbleLinger('synced')).toBe(4000);
    expect(syncBubbleLinger('failed')).toBe(8000);
    expect(syncBubbleLinger('offline')).toBe(8000);
    expect(syncBubbleLinger('waiting')).toBe(120_000);
    expect(syncBubbleLinger('sending')).toBeNull();
    expect(syncBubbleLinger('saving')).toBeNull();
  });
});
