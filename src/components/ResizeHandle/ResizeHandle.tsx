import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  Platform,
  View,
  type AccessibilityActionEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { cn } from '../../utils/cn';

export interface ResizeHandleProps {
  /**
   * Which way the handle drags. `vertical` is a vertical bar between two side-by-side panes
   * (drags left/right, `col-resize`); `horizontal` is a horizontal bar between stacked panes
   * (drags up/down, `row-resize`). Default `vertical`.
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Size of the hit area across the drag axis, in px. Make it the gutter between the two panes:
   * the bar is drawn in its middle, so it reads as "between these two", not as either pane's edge.
   * Default 12.
   */
  thickness?: number;
  /** Length of the visible bar in px, or `'full'` to run the handle's length (minus `inset`). Default 48. */
  barLength?: number | 'full';
  /** With `barLength="full"`, how far the bar stops short of each end. Default 14. */
  inset?: number;
  /** Show the bar only on hover / drag instead of faintly at rest. Default false. */
  hideAtRest?: boolean;

  /** A drag began. */
  onResizeStart?: () => void;
  /** The drag moved: `delta` is px from where it began (positive = right / down). */
  onResize?: (delta: number) => void;
  /** The drag ended (released or cancelled). */
  onResizeEnd?: () => void;
  /** Double-click / double-tap — typically "reset to the default size". */
  onReset?: () => void;
  /** Arrow keys and screen-reader increment/decrement: `+1` grows towards right / down, `-1` the other way. */
  onStep?: (direction: 1 | -1) => void;

  /** Force the lit state, e.g. while the parent is animating to a size. */
  active?: boolean;
  accessibilityLabel?: string;
  /** Current / min / max, announced to screen readers. */
  accessibilityValue?: { min?: number; max?: number; now?: number };
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The grab bar between two panes. A wide, invisible hit area with a short pill drawn in its middle:
 * faint at rest, lit in `primary` on hover and while dragging, with the resize cursor on the web.
 * It does not size anything itself — it reports the drag and the parent sets the sizes — so the same
 * handle sits between a sidebar and its content, two columns, or a stage and a timeline.
 *
 * Place it in the gutter between the panes (in the layout flow, or absolutely positioned over the
 * seam); `thickness` is that gutter.
 */
export function ResizeHandle({
  orientation = 'vertical',
  thickness = 12,
  barLength = 48,
  inset = 14,
  hideAtRest = false,
  onResizeStart,
  onResize,
  onResizeEnd,
  onReset,
  onStep,
  active,
  accessibilityLabel = 'Resize',
  accessibilityValue,
  className,
  style,
}: ResizeHandleProps) {
  const vertical = orientation === 'vertical';
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  const lit = active || dragging || hover;

  // The PanResponder is created once; refs keep it reading the latest callbacks.
  const live = useRef({ onResizeStart, onResize, onResizeEnd, onReset, vertical });
  live.current = { onResizeStart, onResize, onResizeEnd, onReset, vertical };
  const tap = useRef({ last: 0, ignore: false });

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          const now = Date.now();
          if (live.current.onReset && now - tap.current.last < 300) {
            live.current.onReset();
            tap.current.last = 0;
            tap.current.ignore = true; // the rest of this gesture does not resize
            return;
          }
          tap.current.last = now;
          tap.current.ignore = false;
          setDragging(true);
          live.current.onResizeStart?.();
        },
        onPanResponderMove: (_e, g) => {
          if (tap.current.ignore) return;
          live.current.onResize?.(live.current.vertical ? g.dx : g.dy);
        },
        onPanResponderRelease: () => {
          if (tap.current.ignore) return;
          setDragging(false);
          live.current.onResizeEnd?.();
        },
        onPanResponderTerminate: () => {
          setDragging(false);
          if (!tap.current.ignore) live.current.onResizeEnd?.();
        },
      }),
    [],
  );

  // While dragging on the web, keep the resize cursor everywhere and stop text selection.
  useEffect(() => {
    if (Platform.OS !== 'web' || !dragging || typeof document === 'undefined') return;
    const { style: s } = document.body;
    const prev = { cursor: s.cursor, userSelect: s.userSelect };
    s.cursor = vertical ? 'col-resize' : 'row-resize';
    s.userSelect = 'none';
    return () => { s.cursor = prev.cursor; s.userSelect = prev.userSelect; };
  }, [dragging, vertical]);

  // Keyboard: react-native-web doesn't forward onKeyDown on View, so listen on the DOM node.
  const ref = useRef<React.ComponentRef<typeof View>>(null);
  const keys = useRef({ onStep, onReset, vertical });
  keys.current = { onStep, onReset, vertical };
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = ref.current as unknown as HTMLElement | null;
    if (!node?.addEventListener) return;
    const listener = (e: KeyboardEvent) => {
      const k = keys.current;
      const grow = k.vertical ? 'ArrowRight' : 'ArrowDown', shrink = k.vertical ? 'ArrowLeft' : 'ArrowUp';
      if (e.key === grow) { e.preventDefault(); k.onStep?.(1); }
      if (e.key === shrink) { e.preventDefault(); k.onStep?.(-1); }
      if (e.key === 'Enter' && k.onReset) { e.preventDefault(); k.onReset(); }
    };
    node.addEventListener('keydown', listener);
    return () => node.removeEventListener('keydown', listener);
  }, []);

  const onA11yAction = (e: AccessibilityActionEvent) => {
    if (e.nativeEvent.actionName === 'increment') onStep?.(1);
    if (e.nativeEvent.actionName === 'decrement') onStep?.(-1);
  };

  const bar: ViewStyle =
    barLength === 'full'
      ? vertical ? { top: inset, bottom: inset, width: 3 } : { left: inset, right: inset, height: 3 }
      : vertical ? { height: lit ? barLength + 8 : barLength, width: 3 } : { width: lit ? barLength + 8 : barLength, height: 3 };
  const transition =
    Platform.OS === 'web' ? ({ transitionProperty: 'background-color, height, width, opacity', transitionDuration: '150ms' } as ViewStyle) : null;

  return (
    <View
      ref={ref}
      {...pan.panHandlers}
      accessible
      focusable
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Drag, or use the arrow keys. Double-click to reset."
      accessibilityValue={accessibilityValue}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={onA11yAction}
      {...({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as object)}
      className={cn(
        'app-region-no-drag items-center justify-center',
        Platform.OS === 'web' && (vertical ? 'cursor-col-resize' : 'cursor-row-resize'),
        className,
      )}
      style={[vertical ? { width: thickness, alignSelf: 'stretch' } : { height: thickness, alignSelf: 'stretch' }, style]}
    >
      <View
        pointerEvents="none"
        className={cn(
          'rounded-full',
          barLength === 'full' && 'absolute',
          lit ? 'bg-primary' : hideAtRest ? 'bg-transparent' : 'bg-overlay/[0.16]',
        )}
        style={[bar, transition]}
      />
    </View>
  );
}
