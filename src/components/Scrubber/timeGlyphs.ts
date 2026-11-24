/**
 * The two time glyphs, as numbers and as canvas painters.
 *
 *  - the playhead: a line with a little house on top ("the universal playhead")
<<<<<<< HEAD
 *  - the clip frame: the chosen part outlined the way a timeline outlines a selected clip — a 2px
 *    rounded frame in the selection colour with a short bar inside each end; the ends are what you
 *    drag to trim (the one trim look, everywhere a clip is chosen or stretched)
 *  - the in/out pin: a line with a ball under the strip — the older look, kept for bars that want it
 *
 * `<Playhead/>`, `<ClipFrame/>` and `<InOutPin/>` (Glyphs.tsx) draw these with React Native views; a
 * canvas surface such as a timeline calls `paintPlayhead` / `paintClipFrame` / `paintInOutPin` and gets
 * the exact same shape.
=======
 *  - the in/out pin: a line with a ball under the strip — the ball is what you grab
 *
 * `<Playhead/>` and `<InOutPin/>` (Glyphs.tsx) draw these with React Native views; a canvas surface
 * such as a timeline calls `paintPlayhead` / `paintInOutPin` and gets the exact same shape.
>>>>>>> feat/38-dock-controls
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

<<<<<<< HEAD
export const CLIP = {
  /** Width of the frame's line. */
  lineWidth: 2,
  /** Corner radius of the frame (a clip's corners); smaller strips round to half their height. */
  radius: 7,
  /** The bar inside each end: its width … */
  barWidth: 3,
  /** … its height on a tall strip (shorter strips shrink it to fit) … */
  barHeight: 22,
  /** … and how far in from the frame's edge it stands. */
  barInset: 3,
  /** A strip narrower than this shows the frame without its bars. */
  minWidthForBars: 24,
} as const;

/** The bar's height for a strip of this height: the full bar when there is room, else what fits. */
export const clipBarHeight = (height: number) => Math.max(4, Math.min(CLIP.barHeight, height - 6));

=======
>>>>>>> feat/38-dock-controls
/** The house's size: its width, its full height, and where its walls end and its point begins. */
export interface PlayheadCap {
  width: number;
  height: number;
  shoulder: number;
}

/** The strip's cap (tiny). A timeline ruler passes its own, bigger one. */
export const PLAYHEAD_CAP: PlayheadCap = { width: PLAYHEAD.capWidth, height: PLAYHEAD.capHeight, shoulder: PLAYHEAD.capShoulder };

/** The house's five corners, point down, centred on `x` with its roof at `top`. */
export function playheadCapPoints(x: number, top: number, cap: PlayheadCap = PLAYHEAD_CAP): Array<[number, number]> {
  const w = cap.width / 2, s = cap.shoulder, h = cap.height;
  return [[x - w, top], [x + w, top], [x + w, top + s], [x, top + h], [x - w, top + s]];
}

/** The house as an SVG path. */
export function playheadCapPath(x: number, top: number, cap: PlayheadCap = PLAYHEAD_CAP): string {
  return playheadCapPoints(x, top, cap).map(([px, py], i) => `${i ? 'L' : 'M'}${px} ${py}`).join(' ') + ' Z';
}

export interface PaintPlayheadOptions {
  x: number;
  /** Top of the surface the head runs down. */
  top: number;
  /** How far down the line runs. */
  height: number;
  color: string;
  /** Width of the line. Default 2. */
  lineWidth?: number;
  /** The house's size. Default the strip's tiny one; a timeline passes its bigger one. */
  cap?: PlayheadCap;
  /** Draw only the line (the head is drawn elsewhere, e.g. on a ruler that stays put while the lanes scroll). */
  headless?: boolean;
}

/** Draw the playhead on a canvas: the line and the house. */
export function paintPlayhead(ctx: Canvas2D, { x, top, height, color, lineWidth = PLAYHEAD.lineWidth, cap = PLAYHEAD_CAP, headless = false }: PaintPlayheadOptions): void {
  ctx.fillStyle = color;
  ctx.fillRect(x - lineWidth / 2, top, lineWidth, height);
  if (headless) return;
  paintPlayheadCap(ctx, { x, top, color, cap });
}

/** Just the house — for a ruler that keeps the head while the lanes under it scroll. */
export function paintPlayheadCap(ctx: Canvas2D, { x, top, color, cap = PLAYHEAD_CAP }: { x: number; top: number; color: string; cap?: PlayheadCap }): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  playheadCapPoints(x, top, cap).forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
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

<<<<<<< HEAD
export interface PaintClipFrameOptions {
  /** Left edge of the chosen part. */
  x: number;
  /** Top of the strip. */
  top: number;
  /** Width of the chosen part. */
  width: number;
  /** Height of the strip. */
  height: number;
  color: string;
  /** Width of the frame's line. Default 2. */
  lineWidth?: number;
  /** Draw the two bars. Default true (left out on a strip too narrow for them). */
  bars?: boolean;
}

/** Draw the clip frame on a canvas: the rounded outline half a pixel in, and the bar inside each end. */
export function paintClipFrame(ctx: Canvas2D, { x, top, width, height, color, lineWidth = CLIP.lineWidth, bars = true }: PaintClipFrameOptions): void {
  const w = Math.max(lineWidth * 2, width);
  roundRectPath(ctx, x + lineWidth / 2, top + lineWidth / 2, w - lineWidth, height - lineWidth, CLIP.radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  if (!bars || w < CLIP.minWidthForBars) return;
  const bh = clipBarHeight(height), y = top + height / 2 - bh / 2;
  ctx.fillStyle = color;
  for (const bx of [x + CLIP.barInset, x + w - CLIP.barInset - CLIP.barWidth]) {
    roundRectPath(ctx, bx, y, CLIP.barWidth, bh, CLIP.barWidth / 2);
    ctx.fill();
  }
}

=======
>>>>>>> feat/38-dock-controls
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
