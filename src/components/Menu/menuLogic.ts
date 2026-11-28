/** Where a `Menu` opens, with no screen (tested without React Native). */

export interface MenuAnchor {
  x: number;
  y: number;
}

export const EDGE = 8;
export const ROW = 32;
export const SEPARATOR = 9;
export const PAD = 5;

/** Where the list goes so it stays on the screen. Exported for hosts that place it themselves. */
export function menuPlace(anchor: MenuAnchor, align: 'left' | 'right', width: number, height: number, screen: { width: number; height: number }) {
  const wanted = align === 'right' ? anchor.x - width : anchor.x;
  const left = Math.round(Math.min(Math.max(EDGE, screen.width - width - EDGE), Math.max(EDGE, wanted)));
  const below = anchor.y + height <= screen.height - EDGE;
  const top = Math.round(below ? anchor.y : Math.max(EDGE, anchor.y - height - 4));
  return { left, top };
}

/** Where a list with no anchor goes: the middle of the screen, kept inside it. */
export function menuCenter(width: number, height: number, screen: { width: number; height: number }) {
  return {
    left: Math.round(Math.max(EDGE, (screen.width - width) / 2)),
    top: Math.round(Math.max(EDGE * 6, (screen.height - height) / 2)),
  };
}

