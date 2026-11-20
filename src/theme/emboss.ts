/**
 * The embossed look: a pad that stands a little proud of the glass it sits on, lit from above, and a glyph
 * shaded the same way. The dock, the glass bars and the organization tabs use it, so every raised control in
 * every app is lit the same. Nothing here is sharp: the highlights and shadows are blurred a pixel or two, so a
 * pad reads as a shape with depth, never as an outline.
 */
import type { ViewStyle } from 'react-native';
import type { Theme } from './tokens';
import { hexToChannels, withAlpha } from './createTheme';

/** `#a6ce39` lightened (amount > 0, towards white) or darkened (amount < 0, towards black) by a fraction. */
export function shade(hex: string, amount: number): string {
  const [r, g, b] = hexToChannels(hex).split(' ').map(Number) as [number, number, number];
  const to = amount >= 0 ? 255 : 0;
  const k = Math.min(1, Math.abs(amount));
  const mix = (c: number) => Math.round(c + (to - c) * k);
  const h = (n: number) => n.toString(16).padStart(2, '0');
  return `#${h(mix(r))}${h(mix(g))}${h(mix(b))}`;
}

/** The two ends of the subtle gradient a filled, embossed glyph is painted with: a touch lighter at the top. */
export function embossGradient(color: string): { top: string; bottom: string } {
  return { top: shade(color, 0.14), bottom: shade(color, -0.12) };
}

export interface EmbossPadOptions {
  /** The chosen one: a touch brighter, lifted a little more. */
  active?: boolean;
  /** Paint the pad with the primary instead of the neutral overlay (a lit glass-bar circle). */
  primary?: boolean;
}

/**
 * The style of a raised pad: a faint top-to-bottom wash of the overlay (lighter above), a soft inner highlight
 * along the top edge, a soft inner shadow along the bottom, and a short drop shadow under it. On the web the
 * wash is a gradient; elsewhere a flat tint, since a View cannot paint a gradient.
 */
export function embossPad(theme: Theme, { active, primary }: EmbossPadOptions = {}, web = true): ViewStyle {
  const base = primary ? theme.colors.primary : theme.colors.overlay;
  const [hi, lo] = primary ? (active ? [0.34, 0.16] : [0.22, 0.1]) : active ? [0.15, 0.06] : [0.09, 0.03];
  const wash = web ? { backgroundImage: `linear-gradient(180deg, ${withAlpha(base, hi)}, ${withAlpha(base, lo)})` } : { backgroundColor: withAlpha(base, (hi + lo) / 2) };
  const light = active ? 0.16 : 0.1;
  const dark = active ? 0.34 : 0.26;
  const drop = active ? '0px 2px 6px -1px rgba(0,0,0,0.45)' : '0px 1px 2px rgba(0,0,0,0.28)';
  return {
    ...(wash as ViewStyle),
    boxShadow: `inset 0px 1px 1.5px rgba(255,255,255,${light}), inset 0px -1px 1.5px rgba(0,0,0,${dark}), ${drop}`,
  } as ViewStyle;
}
