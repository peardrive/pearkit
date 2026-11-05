import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The element the tooltip describes. */
  children: React.ReactNode;
  label: string;
  /** Optional keyboard shortcut shown after the label, e.g. `⌘C`. */
  shortcut?: string;
  placement?: TooltipPlacement;
  /** Gap between the anchor and the bubble, in px. */
  offset?: number;
  /** Hover delay before showing, in ms (web/desktop). */
  delay?: number;
  /** Control visibility yourself. */
  open?: boolean;
  /** Initially visible (uncontrolled). Useful for docs & screenshots. */
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

// A wide, centred, pointer-transparent track lets the bubble size to its
// content without measuring — identical behaviour on native and web.
const TRACK = 600;
const trackStyle = (placement: TooltipPlacement, offset: number): ViewStyle => {
  switch (placement) {
    case 'top':
      return { position: 'absolute', bottom: '100%', left: -TRACK, right: -TRACK, marginBottom: offset, alignItems: 'center' };
    case 'left':
      return { position: 'absolute', right: '100%', top: -TRACK, bottom: -TRACK, marginRight: offset, justifyContent: 'center', alignItems: 'flex-end' };
    case 'right':
      return { position: 'absolute', left: '100%', top: -TRACK, bottom: -TRACK, marginLeft: offset, justifyContent: 'center', alignItems: 'flex-start' };
    default:
      return { position: 'absolute', top: '100%', left: -TRACK, right: -TRACK, marginTop: offset, alignItems: 'center' };
  }
};

/**
 * Hover tooltip with an optional shortcut hint. Shows on hover on desktop/web
 * and on long-press on touch devices.
 */
export function Tooltip({
  children,
  label,
  shortcut,
  placement = 'bottom',
  offset = 6,
  delay = 350,
  open,
  defaultOpen = false,
  disabled,
  className,
  style,
}: TooltipProps) {
  const [hovered, setHovered] = useState(defaultOpen);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(true), delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setHovered(false);
  };
  const visible = !disabled && (open ?? hovered);

  return (
    <Pressable
      accessible={false}
      focusable={false}
      onHoverIn={show}
      onHoverOut={hide}
      onLongPress={() => setHovered(true)}
      onPressOut={() => open === undefined && !defaultOpen && setTimeout(hide, 1200)}
      className={cn('relative', className)}
      style={[{ zIndex: visible ? 50 : undefined }, style]}
    >
      {children}
      {visible ? (
        <View pointerEvents="none" style={trackStyle(placement, offset)}>
          <View
            accessibilityRole="text"
            className="flex-row items-center gap-2 rounded-sm border border-overlay/10 bg-tooltip px-2 py-[5px]"
            style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.5)' } as ViewStyle}
          >
            <Text variant="caption" weight="semibold" tone="tooltip-foreground" numberOfLines={1}>
              {label}
            </Text>
            {shortcut ? (
              <Text variant="micro" tone="muted" numberOfLines={1}>
                {shortcut}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}
