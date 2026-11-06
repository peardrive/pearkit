/**
 * The two time glyphs, as numbers and as canvas painters.
 *
 *  - the playhead: a line with a little house on top ("the universal playhead")
 *  - the in/out pin: a line with a ball under the strip — the ball is what you grab
 *
 * `<Playhead/>` and `<InOutPin/>` (Glyphs.tsx) draw these with React Native views; a canvas surface
 * such as a timeline calls `paintPlayhead` / `paintInOutPin` and gets the exact same shape.
 */

/** The subset of a 2D canvas context the painters use; a `CanvasRenderingContext2D` satisfies it. */
export interface Canvas2D {
  fillStyle: unknown;
  strokeStyle: unknown;
  lineWidth: number;
  globalAlpha: number;
  save(): void;
  restore(): void;
  beginPath(): void;
  closePath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void;
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
  fill(): void;
  stroke(): void;
  clip(): void;
  fillRect(x: number, y: number, w: number, h: number): void;
  drawImage(image: unknown, dx: number, dy: number, dw: number, dh: number): void;
}

export const PLAYHEAD = {
  /** Width of the line. */
  lineWidth: 2,
  /** Width of the house on top. */
  capWidth: 9,
  /** Height of the house. */
  capHeight: 8,
  /** Where the house's walls end and its point begins, from the top. */
  capShoulder: 4,
} as const;

export const PIN = {
  /** Width of the line. */
  lineWidth: 1.5,
  /** Radius of the ball at rest … */
  ballRadius: 4,
  /** … and while hovered or held. */
  ballRadiusLit: 5,
  /** How far the line runs past the strip's bottom before the ball. */
  drop: 3,
} as const;

/** Space to leave under a strip so the pins' balls have room. */
export const PIN_PAD = 8;

/** The house's five corners, point down, centred on `x` with its roof at `top`. */
export function playheadCapPoints(x: number, top: number): Array<[number, number]> {
  const w = PLAYHEAD.capWidth / 2, s = PLAYHEAD.capShoulder, h = PLAYHEAD.capHeight;
  return [[x - w, top], [x + w, top], [x + w, top + s], [x, top + h], [x - w, top + s]];
}

/** The house as an SVG path. */
export function playheadCapPath(x: number, top: number): string {
  return playheadCapPoints(x, top).map(([px, py], i) => `${i ? 'L' : 'M'}${px} ${py}`).join(' ') + ' Z';
}

export interface PaintPlayheadOptions {
  x: number;
  /** Top of the surface the head runs down. */
  top: number;
  /** How far down the line runs. */
  height: number;
  color: string;
}

/** Draw the playhead on a canvas: the line and the house. */
export function paintPlayhead(ctx: Canvas2D, { x, top, height, color }: PaintPlayheadOptions): void {
  ctx.fillStyle = color;
  ctx.fillRect(x - PLAYHEAD.lineWidth / 2, top, PLAYHEAD.lineWidth, height);
  ctx.beginPath();
  playheadCapPoints(x, top).forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
  ctx.closePath();
  ctx.fill();
}

export interface PaintPinOptions {
  x: number;
  /** Top of the strip. */
  top: number;
  /** Height of the strip; the ball hangs below it. */
  height: number;
  color: string;
  /** Outline of the ball, so it reads on any picture. */
  outline?: string;
  /** Hovered or held: a bigger ball. */
  lit?: boolean;
}

/** Draw an in/out pin on a canvas: the line through the strip and the ball under it. */
export function paintInOutPin(ctx: Canvas2D, { x, top, height, color, outline, lit }: PaintPinOptions): void {
  const r = lit ? PIN.ballRadiusLit : PIN.ballRadius;
  ctx.fillStyle = color;
  ctx.fillRect(x - PIN.lineWidth / 2, top, PIN.lineWidth, height + PIN.drop);
  ctx.beginPath();
  ctx.arc(x, top + height + PIN.drop + PIN.ballRadius / 2, r, 0, Math.PI * 2);
  ctx.fill();
  if (outline) {
    ctx.strokeStyle = outline;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

/** Centre of a pin's ball, relative to the strip's top. */
export const pinBallCenterY = (height: number) => height + PIN.drop + PIN.ballRadius / 2;

/** Trace a rounded rectangle (for clips and frames); the caller fills, strokes or clips it. */
export function roundRectPath(ctx: Canvas2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
