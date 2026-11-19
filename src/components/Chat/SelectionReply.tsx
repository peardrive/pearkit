import type React from 'react';
import type { View } from 'react-native';

export interface SelectionReplyProps {
  /** The View the words live in: a selection inside it offers the chip. */
  containerRef: React.RefObject<React.ComponentRef<typeof View> | null>;
  /** The chip was pressed, with the selected words. */
  onReply: (text: string) => void;
  label?: string;
}

/**
 * "Reply to this" over selected words. The web file (`SelectionReply.web.tsx`) watches the browser's selection;
 * a phone's selection menu is the platform's own, so here there is nothing to draw.
 */
export function SelectionReply(_props: SelectionReplyProps) {
  return null;
}
