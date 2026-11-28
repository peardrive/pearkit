/**
 * Rewrites the `@/…` specifiers in the declarations bob emits.
 *
 * `babel-plugin-module-resolver` (babel.config.js) turns the alias into a relative path
 * in the JS output, but `tsc` never touches `paths`: the declarations under
 * `lib/typescript` would keep `from '@/utils/cn'`, which no consumer can resolve. This
 * runs after `bob build` and rewrites each alias the way the JS output was rewritten.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'lib', 'typescript');
const TARGETS = ['commonjs', 'module'];

/** Every `.d.ts` under `dir`, recursively. */
function declarations(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) declarations(p, out);
    else if (entry.name.endsWith('.d.ts')) out.push(p);
  }
  return out;
}

/** The declaration root (`lib/typescript/commonjs` or `…/module`) a file belongs to. */
function targetRootOf(file) {
  return TARGETS.map((t) => path.join(outDir, t)).find((t) => file.startsWith(t + path.sep));
}

if (!fs.existsSync(outDir)) {
  console.error(`fix-alias-declarations: ${path.relative(root, outDir)} does not exist — run bob build first.`);
  process.exit(1);
}

let files = 0;
let specifiers = 0;
for (const file of declarations(outDir)) {
  const target = targetRootOf(file);
  if (!target) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(/(['"])@\/([^'"]+)\1/g, (_match, quote, spec) => {
    let relative = path.relative(path.dirname(file), path.join(target, spec)).replace(/\\/g, '/');
    if (!relative.startsWith('.')) relative = `./${relative}`;
    specifiers += 1;
    return `${quote}${relative}${quote}`;
  });
  if (after !== before) {
    fs.writeFileSync(file, after);
    files += 1;
  }
}

console.log(`fix-alias-declarations: rewrote ${specifiers} specifier(s) in ${files} declaration file(s).`);
