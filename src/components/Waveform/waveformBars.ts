/**
 * Waveform geometry — peaks in, bars out. `<Waveform/>` renders the bars as views; `paintWaveform`
 * draws the same bars on a canvas. Both come from `waveformBars`, so a strip and a timeline agree.
 */
import type { Canvas2D } from '../Scrubber/timeGlyphs';

export interface WaveformSource {
  /** One peak (0–1) per `1 / peaksPerSecond` seconds. */
  peaks: ArrayLike<number>;
  peaksPerSecond: number;
  /** The time `peaks[0]` stands for, seconds. Default 0. */
  start?: number;
  /** The level that fills the height. Default: the loudest peak (sampled), never below 0.05. */
  max?: number;
}

export interface WaveformWindow {
  /** Time at the left edge, seconds. */
  from: number;
  /** Time at the right edge, seconds. */
  to: number;
}

export type WaveformAnchor = 'center' | 'bottom';

export interface WaveformGeometry {
  width: number;
  height: number;
  /** The stretch of time across `width`. Default: all the peaks. */
  window?: WaveformWindow;
  /** Bars grow from the middle (`center`) or stand on the bottom (`bottom`). Default `center`. */
  anchor?: WaveformAnchor;
  /** Width of one bar, px. Default 1. */
  barWidth?: number;
  /** Space between bars, px. Default 0. */
  gap?: number;
  /** How much of `height` the loudest bar fills. Default 0.85. */
  scale?: number;
  /** The shortest bar, px. Default 1. */
  minHeight?: number;
}

export interface WaveformBar {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** The loudest peak, sampled every `stride`, never below 0.05. */
export function waveformMax(peaks: ArrayLike<number>, stride = 4): number {
  let m = 0;
  for (let i = 0; i < peaks.length; i += stride) if (peaks[i] > m) m = peaks[i];
  return Math.max(0.05, m);
}

/** The whole span the peaks cover. */
export function waveformSpan(source: WaveformSource): WaveformWindow {
  const start = source.start ?? 0;
  return { from: start, to: start + source.peaks.length / Math.max(1e-6, source.peaksPerSecond) };
}

/** One bar per `barWidth + gap` px across `width`: the loudest peak under each. */
export function waveformBars(source: WaveformSource, geometry: WaveformGeometry): WaveformBar[] {
  const { width, height, anchor = 'center', barWidth = 1, gap = 0, scale = 0.85, minHeight = 1 } = geometry;
  const { peaks, peaksPerSecond: pps } = source;
  const start = source.start ?? 0;
  const win = geometry.window ?? waveformSpan(source);
  const span = win.to - win.from;
  const pitch = Math.max(0.5, barWidth + gap);
  const n = Math.floor(width / pitch);
  if (!(n > 0) || !(height > 0) || !(span > 0) || !peaks.length) return [];
  const max = source.max ?? waveformMax(peaks);
  const bars: WaveformBar[] = [];
  for (let b = 0; b < n; b++) {
    const t0 = win.from + (b / n) * span - start, t1 = win.from + ((b + 1) / n) * span - start;
    const i0 = Math.floor(t0 * pps), i1 = Math.max(i0 + 1, Math.ceil(t1 * pps));
    let v = 0;
    const stride = Math.max(1, Math.floor((i1 - i0) / 24));
    for (let i = Math.max(0, i0); i < i1 && i < peaks.length; i += stride) if (peaks[i] > v) v = peaks[i];
    const h = Math.max(minHeight, Math.min(1, v / max) * height * scale);
    bars.push({ x: b * pitch, y: anchor === 'bottom' ? height - h : (height - h) / 2, w: barWidth, h });
  }
  return bars;
}

export interface PaintWaveformOptions extends WaveformGeometry {
  /** Left edge on the canvas. */
  x: number;
  /** Top edge on the canvas. */
  y: number;
  color: string;
  /** 0–1. Default 1. */
  alpha?: number;
}

/** Draw the bars on a canvas, exactly as `<Waveform/>` lays them out. */
export function paintWaveform(ctx: Canvas2D, source: WaveformSource, options: PaintWaveformOptions): void {
  const { x, y, color, alpha = 1, ...geometry } = options;
  const bars = waveformBars(source, geometry);
  if (!bars.length) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  for (const b of bars) ctx.fillRect(x + b.x, y + b.y, b.w, b.h);
  ctx.restore();
}
