/**
 * Masonry geometry — items dealt across columns, each to the shortest column so far.
 * `<Masonry/>` lays out views with it; a virtualized or canvas host can call it directly
 * and get the exact same arrangement.
 */

/** How many columns fit `width` when each must be at least `minColumnWidth` wide. */
export function masonryColumnCount(width: number, minColumnWidth: number, gap: number): number {
  if (!(width > 0) || !(minColumnWidth > 0)) return 1;
  return Math.max(1, Math.floor((width + gap) / (minColumnWidth + gap)));
}

/**
 * Deal items into `columnCount` columns of item indexes, balancing by height. Each item's
 * height is taken from its aspect ratio (width / height, the RN `aspectRatio` convention):
 * at equal column widths a 2:1 panorama is half as tall as a square. Items are placed in
 * order, each into the currently shortest column, so reading order stays roughly
 * left-to-right, top-to-bottom.
 */
export function masonryColumns(aspectRatios: ReadonlyArray<number>, columnCount: number): number[][] {
  const n = Math.max(1, Math.floor(columnCount));
  const columns: number[][] = Array.from({ length: n }, () => []);
  const heights = new Array<number>(n).fill(0);
  for (let i = 0; i < aspectRatios.length; i++) {
    let shortest = 0;
    for (let c = 1; c < n; c++) if (heights[c] < heights[shortest]) shortest = c;
    columns[shortest].push(i);
    const aspect = aspectRatios[i];
    heights[shortest] += 1 / (aspect > 0 ? aspect : 1);
  }
  return columns;
}
