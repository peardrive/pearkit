/**
 * One promise from AGENTS.md, checked:
 *
 *   A name an app can import never disappears by accident. scripts/public-names.txt lists every name exported from
 *   `pearkit` and `pearkit/electron`. A name missing from the code fails here; so does a new name missing from the
 *   list. After adding a name on purpose: `UPDATE_NAMES=1 npx vitest run --project unit organization`.
 *   Removing a line from the list is a breaking change and needs a major changeset.
 *
 * Where a piece is filed is not checked here: the category is the folder it lives in, and Storybook takes the
 * section from that folder (`.storybook/main.ts`), so there is nothing that can drift.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '..');
const LIST = path.join(root, 'scripts/public-names.txt');

/* The names a file exports, following `export * from` into other files. Read as text: nothing is compiled. */
function namesOf(file: string, seen = new Set<string>()): string[] {
  if (seen.has(file)) return [];
  seen.add(file);
  const src = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const names: string[] = [];
  const from = (spec: string) => {
    const base = path.resolve(path.dirname(file), spec);
    const hit = [`${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')].find((f) => fs.existsSync(f));
    if (!hit) throw new Error(`${path.relative(root, file)} exports from ${spec}, which is not a file here`);
    return hit;
  };
  for (const m of src.matchAll(/^export \* from ['"]([^'"]+)['"]/gm)) names.push(...namesOf(from(m[1]!), seen));
  for (const m of src.matchAll(/^export \* as (\w+) from/gm)) names.push(m[1]!);
  for (const m of src.matchAll(/^export (?:type )?\{([^}]*)\}/gm)) {
    for (const part of m[1]!.split(',')) {
      const name = part.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop()!.trim();
      if (name) names.push(name);
    }
  }
  for (const m of src.matchAll(/^export (?:declare )?(?:async )?(?:const|let|function\*?|class|interface|type|enum) (\w+)/gm)) names.push(m[1]!);
  return names;
}

function exported(): string[] {
  const doors = { pearkit: 'src/index.ts', 'pearkit/electron': 'src/electron/index.ts' };
  const names: string[] = [];
  for (const [door, file] of Object.entries(doors)) {
    for (const n of new Set(namesOf(path.join(root, file)))) names.push(`${door}  ${n}`);
  }
  return names.sort();
}

describe('names apps import', () => {
  const now = exported();
  if (process.env.UPDATE_NAMES) fs.writeFileSync(LIST, now.join('\n') + '\n');
  const listed = fs.readFileSync(LIST, 'utf8').split('\n').filter(Boolean);

  it('finds the exports at all', () => {
    expect(now.length).toBeGreaterThan(100);
  });
  it('keeps every listed name (a rename keeps the old name as an alias)', () => {
    expect(listed.filter((n) => !now.includes(n))).toEqual([]);
  });
  it('lists every new name (UPDATE_NAMES=1 adds them)', () => {
    expect(now.filter((n) => !listed.includes(n))).toEqual([]);
  });
});
