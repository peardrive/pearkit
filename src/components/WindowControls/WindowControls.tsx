import React, { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { getWindowBridge, type PearkitWindowState } from '../../electron/types';

/* ───────────────────────── hook ───────────────────────── */

export interface UseWindowControls {
  /** True when running inside Electron with the pearkit preload bridge. */
  available: boolean;
  state: PearkitWindowState;
  close(): void;
  minimize(): void;
  zoom(): void;
}

/**
 * Talks to the Electron preload bridge (`pearkit/electron`). Outside Electron it
 * still tracks window focus on the web so the controls dim correctly.
 */
export function useWindowControls(): UseWindowControls {
  const bridge = useMemo(getWindowBridge, []);
  const [state, setState] = useState<PearkitWindowState>({ focused: true, maximized: false, fullscreen: false });

  useEffect(() => {
    if (bridge?.onStateChange) return bridge.onStateChange(setState);
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onFocus = () => setState((s) => ({ ...s, focused: true }));
    const onBlur = () => setState((s) => ({ ...s, focused: false }));
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, [bridge]);

  return {
    available: !!bridge,
    state,
    close: () => bridge?.close(),
    minimize: () => bridge?.minimize(),
    zoom: () => bridge?.zoom(),
  };
}

/* ───────────────────────── component ───────────────────────── */

export interface WindowControlsProps {
  /** Override the Electron bridge (or provide behaviour outside Electron). */
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  /** Force the focused / unfocused look. Defaults to the real window focus. */
  focused?: boolean;
  /** When to draw the ×, − and ⤢ glyphs. macOS shows them on hover. */
  showGlyphs?: 'hover' | 'always' | 'never';
  /** Green button glyph: full-screen arrows (default) or a plus (zoom). */
  zoomGlyph?: 'fullscreen' | 'plus';
  /** Button diameter. Default 12. */
  size?: number;
  /** Gap between buttons. Default 8. */
  gap?: number;
  /** Hide individual buttons. */
  hide?: Array<'close' | 'minimize' | 'zoom'>;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const GLYPH = 'rgba(0,0,0,0.55)';

function Glyph({ kind, size, zoomGlyph }: { kind: 'close' | 'minimize' | 'zoom'; size: number; zoomGlyph: 'fullscreen' | 'plus' }) {
  const d =
    kind === 'close'
      ? 'M3.6 3.6L8.4 8.4M8.4 3.6L3.6 8.4'
      : kind === 'minimize'
        ? 'M3 6H9'
        : zoomGlyph === 'plus'
          ? 'M6 3V9M3 6H9'
          : null;
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" pointerEvents="none">
      {d ? (
        <Path d={d} stroke={GLYPH} strokeWidth={1.2} strokeLinecap="round" />
      ) : (
        <>
          <Path d="M3.5 3.5H7.3L3.5 7.3Z" fill={GLYPH} />
          <Path d="M8.5 8.5H4.7L8.5 4.7Z" fill={GLYPH} />
        </>
      )}
    </Svg>
  );
}

/**
 * macOS traffic-light buttons drawn in-app, for frameless Electron windows
 * whose sidebar runs to the top edge. Works stand-alone (pass handlers) or
 * wired to `pearkit/electron` automatically.
 */
export function WindowControls({
  onClose,
  onMinimize,
  onZoom,
  focused,
  showGlyphs = 'hover',
  zoomGlyph = 'fullscreen',
  size = 12,
  gap = 8,
  hide = [],
  disabled,
  className,
  style,
}: WindowControlsProps) {
  const theme = useTheme();
  const win = useWindowControls();
  const [hovered, setHovered] = useState(false);
  const isFocused = focused ?? win.state.focused;
  const glyphs = !disabled && (showGlyphs === 'always' || (showGlyphs === 'hover' && hovered));

  const buttons = [
    { key: 'close' as const, color: theme.colors['window-close'], label: 'Close window', onPress: onClose ?? win.close },
    { key: 'minimize' as const, color: theme.colors['window-minimize'], label: 'Minimize window', onPress: onMinimize ?? win.minimize },
    { key: 'zoom' as const, color: theme.colors['window-maximize'], label: win.state.fullscreen ? 'Exit full screen' : 'Enter full screen', onPress: onZoom ?? win.zoom },
  ].filter((b) => !hide.includes(b.key));

  return (
    <Pressable
      accessible={false}
      focusable={false}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      className={cn('app-region-no-drag flex-row items-center', className)}
      style={[{ gap }, style]}
    >
      {buttons.map((b) => (
        <Pressable
          key={b.key}
          accessibilityRole="button"
          accessibilityLabel={b.label}
          disabled={disabled}
          onPress={b.onPress}
          className={cn('items-center justify-center rounded-full active:opacity-80', Platform.OS === 'web' && 'cursor-default')}
          style={{
            width: size,
            height: size,
            backgroundColor: isFocused || hovered ? b.color : theme.colors['window-inactive'],
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.12)',
          }}
        >
          {glyphs ? <Glyph kind={b.key} size={size} zoomGlyph={zoomGlyph} /> : null}
        </Pressable>
      ))}
    </Pressable>
  );
}

/* ───────────────────────── DragRegion ───────────────────────── */

export interface DragRegionProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Marks an area as the window's title bar in frameless Electron windows
 * (`-webkit-app-region: drag`). Buttons and inputs inside stay clickable.
 * Renders a plain View on native.
 */
export function DragRegion({ children, className, style }: DragRegionProps) {
  return (
    <View className={cn('app-region-drag', className)} style={style}>
      {children}
    </View>
  );
}
