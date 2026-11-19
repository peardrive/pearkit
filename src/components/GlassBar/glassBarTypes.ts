import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface GlassBarProps {
  /** Over the top or the bottom of what it floats on. Default `top`. */
  position?: 'top' | 'bottom';
  /** The safe-area inset on the bar's outer edge: a number of px, or on the web a CSS length such as `env(safe-area-inset-top)`. */
  inset?: number | string;
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
