import { describe, expect, it } from 'vitest';
import { applicableSteps, nextStepKey, prevStepKey, stepLabel } from './setupLogic';

const STEPS = [
  { key: 'agent', title: 'Connect your AI' },
  { key: 'folder', title: 'Where projects live', when: false },
  { key: 'done', title: 'Ready' },
] as const;

describe('a first-run flow', () => {
  it('counts only the steps that apply on this device', () => {
    expect(applicableSteps([...STEPS]).map((s) => s.key)).toEqual(['agent', 'done']);
    expect(stepLabel(0, 2)).toBe('Step 1 of 2');
    expect(stepLabel(1, 2)).toBe('Step 2 of 2');
    expect(stepLabel(0, 1)).toBe('');
  });
  it('moves forward and back over the steps that apply, and stops at the ends', () => {
    expect(nextStepKey([...STEPS], 'agent')).toBe('done');
    expect(nextStepKey([...STEPS], 'done')).toBeNull();
    expect(prevStepKey([...STEPS], 'done')).toBe('agent');
    expect(prevStepKey([...STEPS], 'agent')).toBeNull();
  });
});
