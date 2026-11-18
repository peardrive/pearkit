import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { masonryColumnCount, masonryColumns } from './masonryColumns';

export interface MasonryProps<T> {
  items: ReadonlyArray<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  /** Fixed column count. When omitted, columns are computed from `minColumnWidth`. */
  columns?: number;
  /** Smallest column width when `columns` is omitted. Default 220. */
  minColumnWidth?: number;
  /** Gap between columns and between items, in px. Default 12. */
  gap?: number;
  /**
   * The item's width / height (the RN `aspectRatio` convention), used to balance the
   * columns. Default 1 — without it a wall of mixed media still works, just less evenly.
   */
  getAspectRatio?: (item: T, index: number) => number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A wall of mixed-height tiles in balanced columns — the browse layout of a media app.
 * It only arranges: tiles come from `renderItem` (a `MediaTile`, a `Card`, anything), and
 * scrolling stays with the host. The arrangement itself is `masonryColumns()`, a pure
 * function a virtualized host can reuse.
 */
export function Masonry<T>({
  items, renderItem, keyExtractor, columns, minColumnWidth = 220, gap = 12,
  getAspectRatio, className, style,
}: MasonryProps<T>) {
  const [width, setWidth] = React.useState(0);
  const count = columns ?? (width > 0 ? masonryColumnCount(width, minColumnWidth, gap) : 0);
  const layout = React.useMemo(() => {
    if (!(count > 0)) return [];
    const aspects = items.map((item, i) => (getAspectRatio ? getAspectRatio(item, i) : 1));
    return masonryColumns(aspects, count);
  }, [items, count, getAspectRatio]);
  return (
    <View
      className={cn('w-full flex-row items-start', className)}
      style={[{ gap }, style]}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {layout.map((indexes, c) => (
        <View key={c} className="flex-1" style={{ gap, minWidth: 0 }}>
          {indexes.map((i) => (
            <View key={keyExtractor ? keyExtractor(items[i], i) : i}>{renderItem(items[i], i)}</View>
          ))}
        </View>
      ))}
    </View>
  );
}
