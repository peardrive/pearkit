import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';
import { renderIcon, type IconSource } from '@/icons/Icon';
import { Icon } from '@/icons/Icon';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { LevelMeter } from '@/components/LevelMeter/LevelMeter';

export type DeviceToggleSize = 'md' | 'sm';

export interface DeviceToggleProps {
  icon: IconSource;
  /** The device's name: `Camera`, `Microphone`. In the tooltip and for a screen reader. */
  label: string;
  on: boolean;
  onToggle: () => void;
  /** The caret's press: open the device's options. Without it there is no caret. */
  onOptions?: () => void;
  /** The options are open: the caret turns up and lights (or, `compact`, the capsule gets a ring). */
  optionsOpen?: boolean;
  /** The caret's tooltip. Default `<label> options`. */
  optionsLabel?: string;
  /** The toggle's keyboard shortcut, in its tooltip. */
  shortcut?: string;
  /** A level to show along the bottom of the body (a microphone's). */
  level?: number | null;
  /** The level clips. Default: above 0.95. */
  hot?: boolean;
  /** For a thumb: no caret; tap toggles, long press opens the options. */
  compact?: boolean;
  /** Bump this number to shake the capsule once (a take started with the microphone off). */
  nudge?: number;
  disabled?: boolean;
  /** `md` is the desk's 50px; `sm` is 40px for a narrow screen. */
  size?: DeviceToggleSize;
  /** On the body: the thing that toggles. On the web it comes out as `data-testid`. */
  testID?: string;
  caretTestID?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const sizes: Record<DeviceToggleSize, { box: number; radius: string; left: string; right: string; icon: number; caret: number; slash: number }> = {
  md: { box: 50, radius: 'rounded-[15px]', left: 'rounded-l-[15px]', right: 'rounded-r-[15px]', icon: 23, caret: 20, slash: 28 },
  sm: { box: 40, radius: 'rounded-[13px]', left: 'rounded-l-[13px]', right: 'rounded-r-[13px]', icon: 21, caret: 18, slash: 24 },
};

/**
 * A live input as a capsule: the body switches the device on and off, the slim caret opens its options. Off is tinted
 * red with a slash through the icon, so the state reads from across a room. A microphone shows its level along the
 * body's bottom. `compact` drops the caret for a thumb (a long press opens the options instead).
 */
export function DeviceToggle({ icon, label, on, onToggle, onOptions, optionsOpen, optionsLabel, shortcut, level, hot, compact, nudge, disabled, size = 'md', testID, caretTestID, className, style }: DeviceToggleProps) {
  const s = sizes[size];
  const shake = useRef(new Animated.Value(0)).current;
  const lastNudge = useRef(nudge);
  useEffect(() => {
    if (nudge === undefined || nudge === lastNudge.current) return;
    lastNudge.current = nudge;
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: -5, duration: 150, useNativeDriver: false }),
      Animated.timing(shake, { toValue: 0, duration: 350, useNativeDriver: false }),
      Animated.timing(shake, { toValue: -5, duration: 150, useNativeDriver: false }),
      Animated.timing(shake, { toValue: 0, duration: 350, useNativeDriver: false }),
    ]).start();
  }, [nudge, shake]);
  const caret = !compact && !!onOptions;
  const body = (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: on, disabled: !!disabled }}
      accessibilityHint={compact && onOptions ? 'Long press for the options' : undefined}
      disabled={disabled}
      onPress={onToggle}
      onLongPress={compact ? onOptions : undefined}
      testID={testID}
      className={cn(
        'items-center justify-center',
        Platform.OS === 'web' && 'cursor-pointer select-none',
        caret ? s.left : s.radius,
        on ? 'hover:bg-overlay/[0.07]' : 'hover:bg-rec/10',
      )}
      style={{ width: s.box, height: s.box }}
    >
      <View pointerEvents="none" className="items-center justify-center">
        {renderIcon(icon, { size: s.icon, tone: on ? 'icon-strong' : 'rec' })}
        {on ? null : (
          <View
            pointerEvents="none"
            className="absolute rounded-full bg-rec"
            style={{ width: s.slash, height: 2, transform: [{ rotate: '-45deg' }] }}
          />
        )}
      </View>
      {level == null ? null : (
        <View pointerEvents="none" className="absolute" style={{ bottom: size === 'md' ? 6 : 4 }}>
          <LevelMeter level={on ? level : 0} hot={hot} muted={!on} length={size === 'md' ? 22 : 18} />
        </View>
      )}
    </Pressable>
  );
  return (
    <Animated.View style={[{ transform: [{ translateY: shake }] }, style]}>
      <View
        className={cn(
          'flex-row border',
          s.radius,
          on ? 'border-overlay/[0.07] bg-overlay/[0.045]' : 'border-rec/30 bg-rec/[0.16]',
          compact && optionsOpen && 'border-primary/60',
          disabled && 'opacity-50',
          className,
        )}
      >
        {compact ? body : (
          <Tooltip label={label} shortcut={shortcut ? `${shortcut} · ${on ? 'on' : 'off'}` : on ? 'on' : 'off'} disabled={disabled}>
            {body}
          </Tooltip>
        )}
        {caret ? (
          <Tooltip label={optionsLabel ?? `${label} options`} disabled={disabled}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={optionsLabel ?? `${label} options`}
              accessibilityState={{ expanded: !!optionsOpen, disabled: !!disabled }}
              disabled={disabled}
              onPress={onOptions}
              testID={caretTestID}
              className={cn(
                'items-center justify-center border-l',
                s.right,
                Platform.OS === 'web' && 'cursor-pointer select-none',
                on ? 'border-overlay/[0.07]' : 'border-rec/30',
                optionsOpen ? 'bg-primary/15' : 'hover:bg-overlay/[0.08]',
              )}
              style={{ width: s.caret, height: s.box }}
            >
              <View style={{ transform: [{ rotate: optionsOpen ? '-90deg' : '90deg' }] }}>
                <Icon name="chevron-right" size={11} tone={optionsOpen ? 'primary' : on ? 'icon' : 'rec'} />
              </View>
            </Pressable>
          </Tooltip>
        ) : null}
      </View>
    </Animated.View>
  );
}
