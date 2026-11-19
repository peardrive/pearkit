import type { StyleProp, ViewStyle } from 'react-native';
import type { IconSource } from '../../icons/Icon';

export interface DockItem {
  key: string;
  icon: IconSource;
  label: string;
  /** A count on the icon's corner (unread, pending). Hidden at 0. */
  badge?: number;
}

export interface DockProps {
  items: DockItem[];
  /** The key of the chosen item. */
  value: string;
  onChange: (key: string) => void;
  /** The safe-area inset under the pill: a number of px, or on the web a CSS length such as `env(safe-area-inset-bottom)`. */
  inset?: number | string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
