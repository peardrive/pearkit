import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Text } from '../Text/Text';

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedOption {
  value: string;
  /** Omit for an icon-only segment; then `accessibilityLabel` is the icon's name. */
  label?: string;
  icon?: IconSource;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: SegmentedControlSize;
  /** Stretch across the row, each segment the same width. */
  fullWidth?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const sizes: Record<SegmentedControlSize, { box: string; square: string; text: 'label' | 'body-sm'; icon: number }> = {
  sm: { box: 'h-6 gap-1 rounded-sm px-2.5', square: 'h-6 w-7 rounded-sm', text: 'label', icon: 13 },
  md: { box: 'h-7 gap-1.5 rounded-md px-3', square: 'h-7 w-8 rounded-md', text: 'body-sm', icon: 14 },
};

/**
 * One choice among a few, side by side in a pill: the chosen segment is raised on a pane-coloured tile, the others
 * sit flat on the track. The exclusive sibling of `Chip`.
 */
export function SegmentedControl({ options, value, onChange, size = 'md', fullWidth, disabled, accessibilityLabel, className, style }: SegmentedControlProps) {
  const s = sizes[size];
  const web = Platform.OS === 'web';
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      className={cn('flex-row items-center rounded-control bg-overlay/[0.06] p-0.5', fullWidth ? 'self-stretch' : 'self-start', disabled && 'opacity-50', className)}
      style={style}
    >
      {options.map((o) => {
        const selected = o.value === value;
        const off = disabled || o.disabled;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityLabel={o.accessibilityLabel ?? o.label ?? (typeof o.icon === 'string' ? o.icon : o.value)}
            accessibilityState={{ checked: selected, disabled: !!off }}
            disabled={off}
            onPress={() => { if (!selected) onChange(o.value); }}
            className={cn(
              'flex-row items-center justify-center',
              o.label ? s.box : s.square,
              fullWidth && 'min-w-0 flex-1',
              selected ? 'bg-pane' : 'hover:bg-overlay/[0.06] active:bg-overlay/10',
              web && !off && !selected && 'cursor-pointer',
              o.disabled && 'opacity-40',
            )}
            style={selected ? ({ boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.28)' } as ViewStyle) : undefined}
          >
            {renderIcon(o.icon, { size: s.icon, tone: selected ? 'foreground' : 'icon' })}
            {o.label ? (
              <Text variant={s.text} weight={selected ? 'semibold' : 'medium'} tone={selected ? 'foreground' : 'muted'} numberOfLines={1}>
                {o.label}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
