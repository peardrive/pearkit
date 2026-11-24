/**
 * The words and counts of a first-run flow, kept out of the components so they are tested on their own.
 */

export interface SetupStepDef<K extends string = string> {
  key: K;
  title: string;
  /** Whether the step applies on this device; a step that does not is left out of the count. */
  when?: boolean;
}

/** The steps that apply, in order. */
export function applicableSteps<K extends string>(steps: SetupStepDef<K>[]): SetupStepDef<K>[] {
  return steps.filter((s) => s.when !== false);
}

/** "Step 2 of 3" for the step at `index` (0-based) of `total`. */
export function stepLabel(index: number, total: number): string {
  if (total <= 1) return '';
  return `Step ${Math.min(index + 1, total)} of ${total}`;
}

/** The key after `key`, or null at the end. */
export function nextStepKey<K extends string>(steps: SetupStepDef<K>[], key: K): K | null {
  const list = applicableSteps(steps);
  const i = list.findIndex((s) => s.key === key);
  return i >= 0 && i + 1 < list.length ? list[i + 1].key : null;
}

/** The key before `key`, or null at the start. */
export function prevStepKey<K extends string>(steps: SetupStepDef<K>[], key: K): K | null {
  const list = applicableSteps(steps);
  const i = list.findIndex((s) => s.key === key);
  return i > 0 ? list[i - 1].key : null;
}
