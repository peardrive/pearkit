import { describe, expect, test } from 'vitest';

import {
  DEFAULT_GRID_SIZE,
  GRID_SIZES,
  downloadPie,
  fileViewKindOf,
  fileSourceKey,
  fileViewChoices,
  fileViewFrom,
  fitTextSize,
  gridCellHeight,
  gridColumns,
  gridMetrics,
  gridSizeFrom,
  gridText,
  nextFileView,
  pieSlice,
  viewMenuPlace,
  transferBar,
  transferStatus,
  transferTone,
} from './fileViewLogic';

describe('the views an app offers', () => {
  test('all three, in the standard order, when the app names none', () => {
    expect(fileViewChoices().map((c) => c.value)).toEqual(['list', 'expanded', 'grid']);
  });

  test('only the ones the app names, still in the standard order', () => {
    expect(fileViewChoices(['grid', 'list']).map((c) => c.value)).toEqual(['list', 'grid']);
  });

  test('a saved view that is not offered falls back', () => {
    expect(fileViewFrom('grid')).toBe('grid');
    expect(fileViewFrom('wall')).toBe('expanded');
    expect(fileViewFrom(null)).toBe('expanded');
    // The app does not offer the expanded view, so the fallback is its first one.
    expect(fileViewFrom('expanded', ['list', 'grid'])).toBe('list');
  });

  test('one button steps through the offered views and comes back round', () => {
    expect(nextFileView('list')).toBe('expanded');
    expect(nextFileView('expanded')).toBe('grid');
    expect(nextFileView('grid')).toBe('list');
    expect(nextFileView('list', ['list', 'grid'])).toBe('grid');
  });
});

describe('the drop-down list of views', () => {
  test('sits just under its button, right edges together', () => {
    // A 52-wide button ending 16 from the right of a 402-wide screen.
    expect(viewMenuPlace({ x: 334, y: 136, width: 52, height: 38 }, 402, 168)).toEqual({
      top: 180,
      left: 218,
    });
  });

  test('is never pushed off either side of the screen', () => {
    expect(viewMenuPlace({ x: 10, y: 100, width: 44, height: 38 }, 402, 168).left).toBe(8);
    expect(viewMenuPlace({ x: 380, y: 100, width: 44, height: 38 }, 402, 168).left).toBe(402 - 168 - 8);
    // A screen narrower than the list: the left edge wins.
    expect(viewMenuPlace({ x: 100, y: 0, width: 44, height: 38 }, 150, 168).left).toBe(8);
  });

  test('each view has a short word for the list', () => {
    expect(fileViewChoices().map((c) => c.name)).toEqual(['List', 'Expanded', 'Grid']);
  });
});

describe('the status line', () => {
  test('an upload is Sharing with how far it is, then the file is Active', () => {
    expect(transferStatus({ direction: 'up', percent: 12, done: false })).toBe('Sharing 12%');
    expect(transferStatus({ direction: 'up', percent: 100, done: true })).toBe('Active');
  });

  test('a download says how far it is, then the file is Active', () => {
    expect(transferStatus({ direction: 'down', percent: 47.6, done: false })).toBe('Downloading 48%');
    expect(transferStatus({ direction: 'down', percent: 100, done: true })).toBe('Active');
  });

  test('a percentage that is not known yet is left out or zero, and a wild one is held in range', () => {
    expect(transferStatus({ direction: 'up', percent: null, done: false })).toBe('Sharing');
    expect(transferStatus({ direction: 'down', percent: null, done: false })).toBe('Downloading 0%');
    expect(transferStatus({ direction: 'down', percent: 140, done: false })).toBe('Downloading 100%');
    expect(transferStatus({ direction: 'down', percent: -3, done: false })).toBe('Downloading 0%');
  });

  test('in the grid a download drops its number, which the pie shows; an upload keeps it', () => {
    expect(transferStatus({ direction: 'down', percent: 37, done: false }, { short: true })).toBe(
      'Downloading'
    );
    expect(transferStatus({ direction: 'up', percent: 12, done: false }, { short: true })).toBe(
      'Sharing 12%'
    );
    expect(transferStatus({ direction: 'up', percent: 100, done: true }, { short: true })).toBe('Active');
    expect(transferStatus({ direction: 'down', percent: 100, done: true }, { short: true })).toBe('Active');
  });

  test('it is one state, never a chain of them', () => {
    for (const direction of ['up', 'down'] as const) {
      for (const done of [true, false]) {
        expect(transferStatus({ direction, percent: 12, done })).not.toMatch(/[·•|(]/);
      }
    }
  });

  test('the colour and the bar come with the words: amber and a bar while moving, green and none after', () => {
    expect(transferTone({ direction: 'down', percent: 12, done: false })).toBe('busy');
    expect(transferTone({ direction: 'up', percent: 12, done: false })).toBe('busy');
    expect(transferTone({ direction: 'down', percent: 100, done: true })).toBe('good');
    expect(transferBar({ direction: 'down', percent: 25, done: false })).toEqual({ look: 'moving', value: 0.25 });
    expect(transferBar({ direction: 'down', percent: 100, done: true })).toBeNull();
    expect(transferBar(null)).toBeNull();
  });
});

describe('the download pie', () => {
  test('only a download that is still going has one', () => {
    expect(downloadPie({ direction: 'down', percent: 25, done: false })).toBe(0.25);
    expect(downloadPie({ direction: 'down', percent: null, done: false })).toBe(0);
    expect(downloadPie({ direction: 'down', percent: 100, done: true })).toBeNull();
    expect(downloadPie(null)).toBeNull();
  });

  test('an upload never has one', () => {
    expect(downloadPie({ direction: 'up', percent: 25, done: false })).toBeNull();
  });

  test('the slice starts at the top and grows clockwise', () => {
    expect(pieSlice(0, 10, 20, 20)).toBe('');
    // A quarter: from the top (20,10) round to three o'clock (30,20), the short way.
    expect(pieSlice(0.25, 10, 20, 20)).toBe('M20 20L20 10A10 10 0 0 1 30 20Z');
    // Three quarters: round to nine o'clock (10,20), the long way.
    expect(pieSlice(0.75, 10, 20, 20)).toBe('M20 20L20 10A10 10 0 1 1 10 20Z');
    // Full: a whole disc, not a slice with no width.
    expect(pieSlice(1, 10, 20, 20)).toContain('A10 10 0 1 1 30 20');
    expect(pieSlice(Number.NaN, 10, 20, 20)).toBe('');
  });
});

describe('the grid', () => {
  test('four across fit an iPhone, with whole-point tiles', () => {
    const grid = gridMetrics(402);
    expect(grid.columns).toBe(4);
    expect(Number.isInteger(grid.tile)).toBe(true);
    // Four tiles, three gaps and both edges are no wider than the screen.
    expect(grid.tile * 4 + grid.gap * 3 + grid.edge * 2).toBeLessThanOrEqual(402);
    expect(grid.tile * 4 + grid.gap * 3 + grid.edge * 2).toBeGreaterThan(402 - 4);
  });

  test('four across on any width, and an app can ask for another number', () => {
    expect(gridMetrics(320).columns).toBe(4);
    expect(gridMetrics(820).columns).toBe(4);
    expect(gridMetrics(820, { columns: 8 }).columns).toBe(8);
    expect(gridMetrics(0).tile).toBe(1);
  });

  test('three sizes to choose between: large is three across, medium four, small five', () => {
    expect(GRID_SIZES.map((choice) => [choice.name, choice.columns])).toEqual([
      ['Large', 3],
      ['Medium', 4],
      ['Small', 5],
    ]);
    expect(gridColumns('large')).toBe(3);
    expect(gridColumns(DEFAULT_GRID_SIZE)).toBe(gridMetrics(402).columns);
  });

  test('a saved size that is not one of the three falls back to medium', () => {
    expect(gridSizeFrom('small')).toBe('small');
    expect(gridSizeFrom('huge')).toBe('medium');
    expect(gridSizeFrom(null)).toBe('medium');
  });

  test('a cell is its picture and two short lines, which grow with the picture', () => {
    const phone = gridText(67);
    expect(gridCellHeight(67)).toBe(67 + 5 + phone.nameLine + phone.statusLine);
    expect(phone.status).toBeLessThan(phone.name);
    // Never too small to read, never larger than list text.
    expect(gridText(20)).toMatchObject({ name: 10, status: 9 });
    expect(gridText(400)).toMatchObject({ name: 13, status: 12 });
  });
});

describe('a state that is too long for its tile', () => {
  test('is shrunk a little to fit, and never below four fifths', () => {
    expect(fitTextSize('Active', 75, 9.5)).toBe(9.5);
    const long = fitTextSize('Downloading 100%', 75, 9.5);
    expect(long).toBeLessThan(9.5);
    expect(long).toBeGreaterThanOrEqual(7.6);
    expect(fitTextSize('A state far too long to ever fit under a picture', 75, 10)).toBe(8);
    expect(fitTextSize('', 75, 10)).toBe(10);
  });
});

describe('files and places', () => {
  test('the kind of a file comes from the end of its name', () => {
    expect(fileViewKindOf('Ridge at dawn.JPG')).toBe('image');
    expect(fileViewKindOf('clip.final.mp4')).toBe('video');
    expect(fileViewKindOf('tone.m4a')).toBe('audio');
    expect(fileViewKindOf('notes.pdf')).toBe('document');
    expect(fileViewKindOf('archive.zip')).toBe('file');
    expect(fileViewKindOf('no ending')).toBe('file');
  });

  test('the same place has the same name, a different place a different one', () => {
    expect(fileSourceKey({ from: 'disk', folder: '/a' })).toBe('disk:/a');
    expect(fileSourceKey({ from: 'key', key: 'abc', network: 'hyperdrive' })).toBe('hyperdrive:abc');
    expect(fileSourceKey({ from: 'key', key: 'abc', network: 'pearcore' })).not.toBe(
      fileSourceKey({ from: 'key', key: 'abc', network: 'hyperdrive' })
    );
  });
});
