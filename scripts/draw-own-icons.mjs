#!/usr/bin/env node
// Draws the icons Pearkit makes itself (the ones not taken from an icon set) from plain geometry,
// so a shape is changed by changing a number here, never by hand-editing a path.
//
//   node scripts/draw-own-icons.mjs                 print every glyph as JSON
//   node scripts/draw-own-icons.mjs --preview x.html  also write a page showing them at four sizes
//
// The glyphs are pasted into src/components/media/MediaPlayer/PlayerIcon.tsx (speed, turn-auto) and
// src/components/files/FileViews/FileViewIcon.tsx (the rest).

import fs from "node:fs";

const f = (n) => String(Math.round(n * 100) / 100);
const rad = (d) => (d * Math.PI) / 180;

/** A solid arrow head with two equal sides, sitting on a ring at `deg`, pointing the way the ring turns. */
function head(cx, cy, r, deg, h, w) {
  const a = rad(deg);
  const n = [Math.cos(a), Math.sin(a)];
  const t = [-Math.sin(a), Math.cos(a)];
  const p = [cx + r * n[0], cy + r * n[1]];
  const b1 = [p[0] + (w / 2) * n[0], p[1] + (w / 2) * n[1]];
  const b2 = [p[0] - (w / 2) * n[0], p[1] - (w / 2) * n[1]];
  const tip = [p[0] + h * t[0], p[1] + h * t[1]];
  return `M${f(b1[0])} ${f(b1[1])}L${f(tip[0])} ${f(tip[1])}L${f(b2[0])} ${f(b2[1])}Z`;
}
/** The ring: from `fromDeg` clockwise round to `toDeg`, the long way. */
function ring(cx, cy, r, fromDeg, toDeg) {
  const p = (d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
  const [a, b] = [p(fromDeg), p(toDeg)];
  return `M${f(a[0])} ${f(a[1])}A${r} ${r} 0 1 1 ${f(b[0])} ${f(b[1])}`;
}
/** A solid ellipse, turned by `deg`. A `hole` is drawn the other way round, so it cuts out. */
function ellipse(cx, cy, rx, ry, deg = 0, hole = false) {
  const a = rad(deg);
  const dx = rx * Math.cos(a);
  const dy = rx * Math.sin(a);
  const s = hole ? 0 : 1;
  return `M${f(cx - dx)} ${f(cy - dy)}A${rx} ${ry} ${deg} 1 ${s} ${f(cx + dx)} ${f(cy + dy)}A${rx} ${ry} ${deg} 1 ${s} ${f(cx - dx)} ${f(cy - dy)}Z`;
}
/** A solid block with round corners. */
function block(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  return `M${f(x + r)} ${f(y)}H${f(x + w - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w)} ${f(y + r)}V${f(y + h - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)}H${f(x + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + h - r)}V${f(y + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)}Z`;
}

// ---- The view icons. One gap for all three, so each reads as separate things, the way the
// ---- files themselves are laid out. Every icon is 19 wide in a 24 square.
const GAP = 2;
const LEFT = 2.5;
const WIDE = 19;
/** `count` blocks stacked with the gap between them, centred in the square. */
function stack(count, h, r) {
  const top = (24 - (count * h + (count - 1) * GAP)) / 2;
  return Array.from({ length: count }, (_, i) => block(LEFT, top + i * (h + GAP), WIDE, h, r)).join("");
}
function fourSquares(r) {
  const side = (WIDE - GAP) / 2;
  return [0, 1]
    .flatMap((row) => [0, 1].map((col) => block(LEFT + col * (side + GAP), LEFT + row * (side + GAP), side, side, r)))
    .join("");
}

// ---- A rabbit seen from the side, sitting, ears up: built from overlapping ovals.
const RABBIT = [
  [10.3, 15.2, 6.5, 5.1, -12], // body
  [7.5, 16.5, 5.0, 5.0, 0], // haunch
  [17.3, 10.0, 3.5, 2.9, 16], // head
  [14.7, 12.3, 3.0, 3.6, 32], // neck
  [13.9, 5.0, 1.4, 4.3, -24], // far ear
  [16.5, 4.6, 1.3, 4.1, 0], // near ear
  [2.8, 15.6, 1.75, 1.75, 0], // tail
  [15.2, 18.6, 1.25, 3.0, -6], // front leg
  [9.6, 20.55, 3.7, 1.05, 0], // hind foot
  [18.5, 9.4, 0.62, 0.62, 0, true], // eye
];

const PAGE = "M7.6 2.5H13.5L19 8V18.9A2.6 2.6 0 0 1 16.4 21.5H7.6A2.6 2.6 0 0 1 5 18.9V5.1A2.6 2.6 0 0 1 7.6 2.5Z";

const glyphs = {
  // The player's.
  "speed": { box: 24, fill: RABBIT.map((e) => ellipse(...e)).join("") },
  "turn-auto": { box: 24, fill: head(12, 12, 7.6, 260, 5.0, 6.6), stroke: ring(12, 12, 7.6, -42, 260), strokeWidth: 2.4 },
  // The three ways to see a list of files.
  "view-list": { box: 24, fill: stack(4, 2.2, 1.1) },
  "view-expanded": { box: 24, fill: stack(3, 5, 1.7) },
  "view-grid": { box: 24, fill: fourSquares(2.1) },
  // What a file is, when there is no picture of it.
  "kind-file": { box: 24, fill: PAGE },
  "kind-document": { box: 24, evenodd: true, fill: PAGE + block(8, 10.2, 8, 1.7, 0.85) + block(8, 13.4, 8, 1.7, 0.85) + block(8, 16.6, 5, 1.7, 0.85) },
  "kind-image": { box: 24, evenodd: true, fill: block(2.5, 4.5, 19, 15, 2.6) + ellipse(8.2, 9.4, 1.8, 1.8) + "M5.2 16.8L10 11.6L12.9 14.6L15.2 12.4L18.8 16.8Z" },
  "kind-video": { box: 24, evenodd: true, fill: block(2.5, 5, 19, 14, 2.8) + "M10.2 8.9L15.4 12L10.2 15.1Z" },
  "kind-audio": { box: 256, fill: "M212.92,17.71a7.89,7.89,0,0,0-6.86-1.46l-128,32A8,8,0,0,0,72,56V166.1A36,36,0,1,0,88,196V102.25l112-28V134.1A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.71Z" },
  "kind-folder": { box: 24, fill: "M4.6 4.5H9.2L11.4 7H19.4A2.1 2.1 0 0 1 21.5 9.1V17.4A2.1 2.1 0 0 1 19.4 19.5H4.6A2.1 2.1 0 0 1 2.5 17.4V6.6A2.1 2.1 0 0 1 4.6 4.5Z" },
  "tick": { box: 256, fill: "M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" },
  "more": { box: 24, fill: ellipse(12, 5, 1.9, 1.9) + ellipse(12, 12, 1.9, 1.9) + ellipse(12, 19, 1.9, 1.9) },
};

const args = process.argv.slice(2);
if (args[0] === "--preview" && args[1]) {
  const svg = (g, size) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 ${g.box} ${g.box}" fill="none">` +
    (g.stroke ? `<path d="${g.stroke}" stroke="#fff" stroke-width="${g.strokeWidth}" stroke-linecap="round"/>` : "") +
    `<path d="${g.fill}" fill="#fff" fill-rule="${g.evenodd ? "evenodd" : "nonzero"}"/></svg>`;
  const rows = Object.entries(glyphs)
    .map(([name, g]) => `<div style="display:flex;align-items:center;gap:18px;margin:8px 0">${svg(g, 96)}${svg(g, 48)}${svg(g, 24)}${svg(g, 18)}<span>${name}</span></div>`)
    .join("");
  fs.writeFileSync(args[1], `<!doctype html><body style="margin:0;background:#1c1c1e;color:#fff;font:12px system-ui;padding:16px">${rows}</body>`);
} else {
  console.log(JSON.stringify(glyphs, null, 2));
}
