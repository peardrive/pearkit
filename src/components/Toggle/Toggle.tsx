import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';

export type ToggleSize = 'sm' | 'md';

export interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  /** Words beside the switch. Pressing them flips it too. */
  label?: string;
  /** A quieter line under the label. */
  description?: string;
  disabled?: boolean;
  size?: ToggleSize;
  /** Required when there is no label, for screen readers. */
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const sizes: Record<ToggleSize, { track: string; thumb: number; travel: number; pad: number }> = {
  sm: { track: 'h-4 w-7', thumb: 12, travel: 12, pad: 2 },
  md: { track: 'h-5 w-9', thumb: 16, travel: 16, pad: 2 },
};

/** An on/off switch: a track with a thumb, primary when on. With `label` it is a whole row you can press. */
export function Toggle({ value, onValueChange, label, description, disabled, size = 'md', accessibilityLabel, className, style }: ToggleProps) {
  const s = sizes[size];
  const web = Platform.OS === 'web';
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={description}
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      className={cn('flex-row items-center gap-3', label ? 'self-stretch' : 'self-start', web && !disabled && 'cursor-pointer', disabled && 'opacity-50', className)}
      style={style}
    >
      {label ? (
        <View className="min-w-0 flex-1 gap-0.5">
          <Text variant={size === 'sm' ? 'label' : 'body'}>{label}</Text>
          {description ? (
            <Text variant="caption" tone="muted">
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
      <View
        className={cn('justify-center rounded-full', s.track, value ? 'bg-primary' : 'bg-overlay/[0.14]')}
        style={{ padding: s.pad }}
      >
        <View
          className={cn('rounded-full', value ? 'bg-primary-foreground' : 'bg-foreground/80')}
          style={{ width: s.thumb, height: s.thumb, transform: [{ translateX: value ? s.travel : 0 }], boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.3)' } as ViewStyle}
        />
      </View>
    </Pressable>
  );
}
