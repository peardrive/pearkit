import { describe, expect, it } from 'vitest';
import { menuCenter, menuPlace } from './menuLogic';

const phone = { width: 390, height: 844 };

describe('where a menu opens', () => {
  it('hangs from its anchor, its right edge on the point when aligned right', () => {
    expect(menuPlace({ x: 370, y: 300 }, 'right', 220, 200, phone)).toEqual({ left: 150, top: 300 });
  });
  it('goes above the point when it would run off the bottom', () => {
    expect(menuPlace({ x: 370, y: 800 }, 'right', 220, 200, phone)).toEqual({ left: 150, top: 596 });
  });
  it('without an anchor opens in the middle, never in the top corner under a status bar', () => {
    const c = menuCenter(220, 200, phone);
    expect(c).toEqual({ left: 85, top: 322 });
    expect(menuCenter(220, 900, phone).top).toBeGreaterThanOrEqual(48);
  });
});
