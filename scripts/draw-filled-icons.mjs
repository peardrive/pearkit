#!/usr/bin/env node
// Draws the filled glyphs of the kit (the solid ones the dock, the glass bars and the organization tabs use)
// from plain geometry, and writes them as SVG sources into icons/pearkit/, so a shape is changed by changing a
// number here, never by hand-editing a path. Then `npm run icons` rebuilds the registry.
//
//   node scripts/draw-filled-icons.mjs                   write icons/pearkit/<name>.svg for each glyph
//   node scripts/draw-filled-icons.mjs --preview x.html  also write a page showing them at four sizes
//
// Every glyph sits in the 24 square the rest of the set uses, about 19 wide, so it weighs the same as the
// outline icons beside it. Holes (a door, the lines on a page) are drawn with fill-rule="evenodd".
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const f = (n) => String(Math.round(n * 100) / 100);
const rad = (d) => (d * Math.PI) / 180;

/** A solid block with round corners. */
function block(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  return `M${f(x + r)} ${f(y)}H${f(x + w - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w)} ${f(y + r)}V${f(y + h - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)}H${f(x + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + h - r)}V${f(y + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)}Z`;
}
/** A solid disc. */
const disc = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)}Z`;

// ---- The house: a roof with a little overhang, a body with round bottom corners, a door cut out.
function house() {
  const roof = 'M12 2.6L2.9 10.1C2.3 10.6 2.6 11.5 3.4 11.5H4.8V18.9A2.6 2.6 0 0 0 7.4 21.5H16.6A2.6 2.6 0 0 0 19.2 18.9V11.5H20.6C21.4 11.5 21.7 10.6 21.1 10.1Z';
  const door = 'M10.1 21.5V16.1A1.9 1.9 0 0 1 13.9 16.1V21.5Z';
  return { evenodd: true, fill: roof + door };
}

// ---- The globe: a disc cut by one meridian ring and the equator, so it reads as a globe at any size.
// Six solid pieces instead of holes, because two holes crossing would fill their crossing again.
function globe() {
  const cx = 12, cy = 12, R = 9.5;
  const rxOut = 5.1, rxIn = 3.9; // the meridian ring, which thins out to nothing at the poles
  const eq = 0.65; // half the height of the equator gap
  const xOn = (rx, y) => rx * Math.sqrt(Math.max(0, 1 - (y / R) ** 2)); // x of an ellipse (rx, R) at height y
  const yTop = -R, yEq = -eq;
  const pieces = [];
  for (const sy of [-1, 1]) {
    const yq = sy * eq; // the equator edge on this half
    const pole = sy * R;
    const sweepEll = sy === -1 ? 1 : 0;
    // the lens in the middle
    const xl = xOn(rxIn, yq);
    pieces.push(`M${f(cx - xl)} ${f(cy + yq)}A${f(rxIn)} ${f(R)} 0 0 ${sweepEll} ${f(cx + xl)} ${f(cy + yq)}Z`);
    for (const sx of [-1, 1]) {
      // the cap: from the ring at the equator up the ring to the pole, back down the disc's rim, along the equator
      const xr = sx * xOn(rxOut, yq);
      const xd = sx * Math.sqrt(R * R - yq * yq);
      const sweepRing = (sx === -1) === (sy === -1) ? 1 : 0;
      const sweepDisc = sweepRing ? 0 : 1;
      pieces.push(`M${f(cx + xr)} ${f(cy + yq)}A${f(rxOut)} ${f(R)} 0 0 ${sweepRing} ${f(cx)} ${f(cy + pole)}A${f(R)} ${f(R)} 0 0 ${sweepDisc} ${f(cx + xd)} ${f(cy + yq)}Z`);
    }
  }
  void yTop; void yEq;
  return { fill: pieces.join('') };
}

// ---- Three rounded squares in a huddle, one above two: a group of things.
function group() {
  const s = 8.6, r = 2.4, gap = 1.6;
  const top = 2.6;
  const rowY = top + s + gap;
  const left = 12 - s - gap / 2;
  return { fill: block(12 - s / 2, top, s, s, r) + block(left, rowY, s, s, r) + block(left + s + gap, rowY, s, s, r) };
}

// ---- The bell: the body with its rim, a knob on top, the clapper under.
function bell() {
  const body = 'M12 2.5A1.4 1.4 0 0 1 13.4 3.9V4.45A6.3 6.3 0 0 1 18.2 10.6V14.1L19.9 16.5C20.5 17.3 19.9 18.4 18.9 18.4H5.1C4.1 18.4 3.5 17.3 4.1 16.5L5.8 14.1V10.6A6.3 6.3 0 0 1 10.6 4.45V3.9A1.4 1.4 0 0 1 12 2.5Z';
  const clapper = 'M9.2 19.6H14.8A2.8 2.8 0 0 1 9.2 19.6Z';
  return { fill: body + clapper };
}

// ---- The folder, as the file views draw it.
const folder = () => ({ fill: 'M4.6 4.5H9.2L11.4 7H19.4A2.1 2.1 0 0 1 21.5 9.1V17.4A2.1 2.1 0 0 1 19.4 19.5H4.6A2.1 2.1 0 0 1 2.5 17.4V6.6A2.1 2.1 0 0 1 4.6 4.5Z' });

// ---- The speech bubble, its tail at the bottom left, as the outline `message` has it.
const message = () => ({ fill: 'M12 3.5C6.8 3.5 2.5 6.9 2.5 11.2C2.5 12.9 3.2 14.5 4.3 15.8L3.4 19.6C3.3 20.1 3.8 20.6 4.3 20.4L8.4 19C9.5 19.4 10.7 19.6 12 19.6C17.2 19.6 21.5 16.2 21.5 11.6C21.5 7 17.2 3.5 12 3.5Z' });

// ---- The page with its folded corner and three lines cut out.
function document() {
  const page = 'M7.6 2.5H13.5L19 8V18.9A2.6 2.6 0 0 1 16.4 21.5H7.6A2.6 2.6 0 0 1 5 18.9V5.1A2.6 2.6 0 0 1 7.6 2.5Z';
  const fold = 'M13.5 2.5V6.4A1.6 1.6 0 0 0 15.1 8H19Z';
  return { evenodd: true, fill: page + fold + block(8, 11, 8, 1.6, 0.8) + block(8, 14.2, 8, 1.6, 0.8) + block(8, 17.4, 5, 1.6, 0.8) };
}

// ---- Three dots down the middle.
const more = () => ({ fill: disc(12, 5, 2) + disc(12, 12, 2) + disc(12, 19, 2) });

// ---- A bolt: a zap, a payment.
const bolt = () => ({ fill: 'M13.6 2.4C13.9 2 14.6 2.3 14.5 2.8L13.2 9.9H19.1C19.6 9.9 19.9 10.5 19.6 10.9L10.4 21.6C10.1 22 9.4 21.7 9.5 21.2L10.8 14.1H4.9C4.4 14.1 4.1 13.5 4.4 13.1Z' });

export const glyphs = {
  home: house(),
  globe: globe(),
  group: group(),
  'bell-fill': bell(),
  'folder-fill': folder(),
  'message-fill': message(),
  'document-fill': document(),
  'more-fill': more(),
  bolt: bolt(),
};

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgOf = (g) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="${g.fill}" fill="#292D32"${g.evenodd ? ' fill-rule="evenodd"' : ''}/>\n</svg>\n`;
for (const [name, g] of Object.entries(glyphs)) fs.writeFileSync(path.join(root, 'icons/pearkit', `${name}.svg`), svgOf(g));
console.log(`wrote ${Object.keys(glyphs).length} filled icons → icons/pearkit/`);

const args = process.argv.slice(2);
if (args[0] === '--preview' && args[1]) {
  const svg = (g, size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="${g.fill}" fill="#fff" fill-rule="${g.evenodd ? 'evenodd' : 'nonzero'}"/></svg>`;
  const rows = Object.entries(glyphs)
    .map(([name, g]) => `<div style="display:flex;align-items:center;gap:18px;margin:8px 0">${svg(g, 96)}${svg(g, 48)}${svg(g, 24)}${svg(g, 18)}<span>${name}</span></div>`)
    .join('');
  fs.writeFileSync(args[1], `<!doctype html><body style="margin:0;background:#1c1c1e;color:#fff;font:12px system-ui;padding:16px">${rows}</body>`);
}
