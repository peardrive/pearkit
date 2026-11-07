/**
 * Filmstrip geometry — `n` frames edge to edge across a width. `<Filmstrip/>` lays out images;
 * `paintFilmstrip` draws canvas-ready frames the same way.
 */
import { roundRectPath, type Canvas2D } from '../Scrubber/timeGlyphs';

/** A frame to show: an image URI, or null while it is still being made. */
export type FilmstripFrame = string | { uri: string } | null | undefined;

export interface FilmstripCell {
  index: number;
  x: number;
  w: number;
}

/** Where each of `count` frames sits across `width`. */
export function filmstripCells(count: number, width: number): FilmstripCell[] {
  if (!(count > 0) || !(width > 0)) return [];
  const w = width / count;
  return Array.from({ length: count }, (_, index) => ({ index, x: index * w, w }));
}

/** The time at the middle of frame `index` of `count`, over `duration` seconds — where to grab it from. */
export function filmstripFrameTime(index: number, count: number, duration: number): number {
  return ((index + 0.5) / Math.max(1, count)) * duration;
}

export interface PaintFilmstripOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner radius of the strip. Default 6. */
  radius?: number;
}

/**
 * Draw canvas-ready frames (canvases, bitmaps, video elements) edge to edge, clipped to a rounded
 * strip; a null frame leaves its cell empty.
 */
export function paintFilmstrip(ctx: Canvas2D, frames: ReadonlyArray<unknown>, { x, y, width, height, radius = 6 }: PaintFilmstripOptions): void {
  const cells = filmstripCells(frames.length, width);
  if (!cells.length || !(height > 0)) return;
  ctx.save();
  roundRectPath(ctx, x, y, width, height, radius);
  ctx.clip();
  for (const c of cells) {
    const f = frames[c.index];
    if (f) ctx.drawImage(f, x + c.x, y, c.w + 0.5, height);
  }
  ctx.restore();
}
