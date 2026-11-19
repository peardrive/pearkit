import React, { useEffect, useState } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { Icon } from '../../icons/Icon';
import { Text } from '../Text/Text';
import type { SelectionReplyProps } from './SelectionReply';

export type { SelectionReplyProps } from './SelectionReply';

const CHIP_TRACK = 160;

/**
 * "Reply to this" over selected words: watches the browser's selection, and when it lies inside the container,
 * floats a small chip above it. The chip is taken on pointer-down, before the selection goes.
 */
export function SelectionReply({ containerRef, onReply, label = 'Reply to this' }: SelectionReplyProps) {
  const [sel, setSel] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onChange = () => {
      const root = containerRef.current as unknown as HTMLElement | null;
      const s = window.getSelection();
      if (!root || !s || s.isCollapsed || !s.rangeCount) return setSel(null);
      const range = s.getRangeAt(0);
      if (!root.contains(range.commonAncestorContainer)) return setSel(null);
      const text = s.toString().trim();
      if (!text) return setSel(null);
      const r = range.getBoundingClientRect();
      const b = root.getBoundingClientRect();
      const x = Math.min(Math.max(r.left - b.left + r.width / 2, CHIP_TRACK / 2), Math.max(CHIP_TRACK / 2, b.width - CHIP_TRACK / 2));
      setSel({ text, x, y: r.top - b.top });
    };
    document.addEventListener('selectionchange', onChange);
    return () => document.removeEventListener('selectionchange', onChange);
  }, [containerRef]);

  if (!sel) return null;
  const take = () => {
    const text = sel.text;
    setSel(null);
    window.getSelection()?.removeAllRanges();
    onReply(text);
  };
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: sel.x - CHIP_TRACK / 2, top: sel.y - 30, width: CHIP_TRACK, alignItems: 'center', zIndex: 20 }}>
      <Pressable
        onPressIn={take}
        accessibilityRole="button"
        accessibilityLabel={label}
        className="flex-row items-center gap-1 rounded-full border border-overlay/10 bg-tooltip px-2 py-1 cursor-pointer"
        style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.5)' } as ViewStyle}
      >
        <Icon name="reply" size={12} tone="tooltip-foreground" />
        <Text variant="micro" weight="semibold" tone="tooltip-foreground" numberOfLines={1}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}
