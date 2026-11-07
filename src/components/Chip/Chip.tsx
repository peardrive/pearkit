import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { statusSoftBg, statusText, statusToken, type StatusTone } from '../../theme/tones';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/registry';
import { Text } from '../Text/Text';

export interface ChipProps {
  label: string;
  /** Leading icon name, or any element (a swatch, a tiny avatar). */
  icon?: IconName | React.ReactElement;
  /** Quiet count after the label — how many results carry the tag. */
  count?: number | string;
  /** Tint of the selected state. Default `primary`. */
  tone?: StatusTone;
  selected?: boolean;
  disabled?: boolean;
  /** Makes the chip pressable (toggle a filter, open the tag). */
  onPress?: () => void;
  /** Shows a trailing ✕ that calls this — a removable chip. */
  onRemove?: () => void;
  size?: 'sm' | 'md';
  /** Accessible label of the ✕. Default `Remove <label>`. */
  removeLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const sizes = {
  sm: { box: 'gap-1 py-[3px] pl-2 pr-2', text: 'micro' as const, icon: 12, close: 10, closeBox: 'ml-px -mr-1 p-[3px]' },
  md: { box: 'gap-1.5 py-[5px] pl-2.5 pr-2.5', text: 'caption' as const, icon: 14, close: 11, closeBox: 'ml-px -mr-1.5 p-1' },
};

/**
 * A small token for a tag or an active filter: press to toggle, ✕ to remove. The independent
 * sibling of `SegmentedControl` — chips don't exclude each other.
 */
export function Chip({
  label, icon, count, tone = 'primary', selected, disabled, onPress, onRemove,
  size = 'md', removeLabel, className, style,
}: ChipProps) {
  const s = sizes[size];
  const pressable = !!onPress && !disabled;
  const Comp = pressable ? Pressable : View;
  return (
    <Comp
      onPress={pressable ? onPress : undefined}
      accessibilityRole={pressable ? 'button' : undefined}
      accessibilityLabel={label}
      accessibilityState={{ selected: !!selected, disabled: disabled || undefined }}
      className={cn(
        'flex-row items-center self-start rounded-full',
        s.box,
        selected ? statusSoftBg[tone] : 'bg-overlay/5',
        pressable && !selected && 'hover:bg-overlay/[0.08]',
        pressable && Platform.OS === 'web' && 'cursor-pointer',
        disabled && 'opacity-40',
        className,
      )}
      style={style}
    >
      {icon ? (
        typeof icon === 'string'
          ? <Icon name={icon} size={s.icon} tone={selected ? statusToken[tone] : 'icon'} />
          : icon
      ) : null}
      <Text
        variant={s.text}
        weight={selected ? 'semibold' : 'medium'}
        tone={selected ? undefined : 'foreground'}
        className={selected ? statusText[tone] : undefined}
        numberOfLines={1}
      >
        {label}
      </Text>
      {count != null ? (
        <Text variant={s.text} tone="muted" numberOfLines={1}>
          {String(count)}
        </Text>
      ) : null}
      {onRemove ? (
        <Pressable
          onPress={disabled ? undefined : onRemove}
          accessibilityRole="button"
          accessibilityLabel={removeLabel ?? `Remove ${label}`}
          hitSlop={6}
          className={cn(
            'items-center justify-center rounded-full hover:bg-overlay/[0.12]',
            s.closeBox,
            Platform.OS === 'web' && 'cursor-pointer',
          )}
        >
          <Icon name="close" size={s.close} tone={selected ? statusToken[tone] : 'icon'} />
        </Pressable>
      ) : null}
    </Comp>
  );
}
