import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface DroppedItem {
  kind: 'file' | 'directory';
  name: string;
  /** The browser's `File`, for a file (web only). */
  file?: File;
}

export interface DropZoneProps {
  /** What was dropped, and the browser's drop event. */
  onDrop: (items: DroppedItem[], event?: unknown) => void;
  /** A drag came over the zone, or left it. */
  onDragActiveChange?: (active: boolean) => void;
  /**
   * What to show while a drag is over the zone, on top of the children. A function is called with `active` and
   * drawn all the time (so it can fade); a node is drawn only while active. Without one, a dashed primary frame.
   */
  overlay?: ReactNode | ((active: boolean) => ReactNode);
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
