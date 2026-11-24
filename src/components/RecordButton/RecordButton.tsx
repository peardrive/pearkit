import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { withAlpha } from '../../theme/createTheme';
import { Text } from '../Text/Text';
import { Tooltip, type TooltipPlacement } from '../Tooltip/Tooltip';

/**
 * `arm`: nothing is armed yet, the disc is a red ring (press to arm). `ready`: armed, a full red disc (press to record).
 * `recording`: a pulsing red square (press to stop). `busy`: the take is being saved; the button waits.
 */
export type RecordState = 'arm' | 'ready' | 'recording' | 'busy';
export type RecordButtonSize = 'md' | 'lg';

export interface RecordButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  state: RecordState;
  /** The word or clock beside the disc: `Arm`, `Record`, `00:12`, `Saving…`. Nothing shows without it. */
  label?: string;
  /** `md` is the desk's 54px; `lg` is 64px for a thumb. */
  size?: RecordButtonSize;
  tooltip?: string | { label: string; shortcut?: string; placement?: TooltipPlacement; defaultOpen?: boolean };
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const sizes: Record<RecordButtonSize, { box: string; disc: number; square: number; ring: number }> = {
  md: { box: 'h-[54px] w-[54px]', disc: 30, square: 20, ring: 3 },
  lg: { box: 'h-16 w-16', disc: 38, square: 24, ring: 4 },
};

/**
 * The one record button: a round key with a red disc. Arm, record, stop are one button in three states, so the hand
 * never looks for a second control, and a pulsing square says "recording" from across the room. The label beside it
 * is the app's: the state's name, or the clock while a take runs.
 */
export function RecordButton({ state, label, size = 'md', tooltip, disabled, className, style, ...rest }: RecordButtonProps) {
  const theme = useTheme();
  const s = sizes[size];
  const recording = state === 'recording';
  const off = disabled || state === 'busy';
  const shape = useRef(new Animated.Value(recording ? 1 : 0)).current; // 0 disc, 1 square
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(shape, { toValue: recording ? 1 : 0, duration: 280, useNativeDriver: false }).start();
    if (!recording) { pulse.stopAnimation(); pulse.setValue(0); return; }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: false }),
      Animated.timing(pulse, { toValue: 0, duration: 800, useNativeDriver: false }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [recording, shape, pulse]);
  const sizePx = shape.interpolate({ inputRange: [0, 1], outputRange: [s.disc, s.square] });
  const radius = shape.interpolate({ inputRange: [0, 1], outputRange: [s.disc / 2, 6] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.9] });
  const tip = typeof tooltip === 'string' ? { label: tooltip } : tooltip;
  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tip?.label ?? label ?? 'Record'}
      accessibilityState={{ disabled: !!off, busy: state === 'busy' }}
      disabled={off}
      className={cn(
        'items-center justify-center rounded-full border border-inset/50 bg-overlay/[0.08]',
        Platform.OS === 'web' && 'cursor-pointer select-none transition-transform hover:scale-105 active:scale-95',
        s.box,
        off && 'opacity-50',
      )}
      style={{ boxShadow: `0 1px 0 ${withAlpha(theme.colors.overlay, 0.12)} inset, 0 3px 8px ${withAlpha(theme.colors.inset, 0.3)}` } as ViewStyle}
      {...rest}
    >
      {/* the glow under the shape: steady at rest, breathing while recording */}
      <Animated.View
        pointerEvents="none"
        style={{ position: 'absolute', width: s.disc, height: s.disc, borderRadius: s.disc / 2, opacity: recording ? glowOpacity : 0.45, boxShadow: `0 0 ${recording ? 26 : 18}px ${recording ? 4 : -2}px ${withAlpha(theme.colors.rec, 0.6)}` } as ViewStyle}
      />
      <Animated.View
        pointerEvents="none"
        style={
          state === 'arm'
            ? { width: s.disc, height: s.disc, borderRadius: s.disc / 2, borderWidth: s.ring, borderColor: theme.colors.rec }
            : { width: sizePx, height: sizePx, borderRadius: radius, backgroundColor: theme.colors.rec }
        }
      />
    </Pressable>
  );
  const withTip = tip ? (
    <Tooltip label={tip.label} shortcut={tip.shortcut} placement={tip.placement} defaultOpen={tip.defaultOpen} disabled={off}>
      {button}
    </Tooltip>
  ) : button;
  if (!label) return <View className={className} style={style}>{withTip}</View>;
  return (
    <View className={cn('flex-row items-center gap-3', className)} style={style}>
      {withTip}
      <Text variant="body" weight="semibold" tone={recording ? 'rec' : 'muted'} style={{ fontVariant: ['tabular-nums'], letterSpacing: 0.3 }} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}
