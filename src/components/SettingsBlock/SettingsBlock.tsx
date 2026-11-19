import React, { type ReactNode } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

export interface SettingsBlockProps {
  title: string;
  /** The block's visual cue, before the title. */
  icon?: IconSource;
  /** A few quiet words at the right of the title (PearDrive's blurb: "its name and key"). */
  description?: string;
  /** Anything else at the right of the title (an "All settings" link). */
  trailing?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** One settings block as PearDrive draws them: a card, a title with its icon and blurb, rows under it. */
export function SettingsBlock({ title, icon, description, trailing, children, className, style }: SettingsBlockProps) {
  return (
    <Card size="md" className={cn('gap-1', className)} style={style} accessibilityRole="summary" accessibilityLabel={title}>
      <View className="flex-row items-center gap-2 pb-1">
        {renderIcon(icon, { size: 16, tone: 'icon-strong' })}
        <Text variant="body-lg" weight="semibold" numberOfLines={1}>
          {title}
        </Text>
        <View className="min-w-0 flex-1 flex-row items-center justify-end gap-2">
          {description ? (
            <Text variant="caption" tone="subtle" numberOfLines={1} className="min-w-0 shrink">
              {description}
            </Text>
          ) : null}
          {trailing}
        </View>
      </View>
      {children}
    </Card>
  );
}

export interface SettingsRowProps {
  label: string;
  /** A quiet line under the label. */
  hint?: string;
  icon?: IconSource;
  /** What sits at the right: a `Toggle`, a `SegmentedControl`, a value `Text`, a `Button`. */
  control?: ReactNode;
  /** Makes the whole row pressable; without a `control` a chevron shows. */
  onPress?: () => void;
  /** A destructive row: the label in the danger colour. */
  destructive?: boolean;
  disabled?: boolean;
  /** Bottom hairline. Default true; the block's last row turns it off. */
  divider?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** One line of a settings block: label (and hint) at the left, the control at the right. */
export function SettingsRow({ label, hint, icon, control, onPress, destructive, disabled, divider = true, className, style }: SettingsRowProps) {
  const web = Platform.OS === 'web';
  const Comp = onPress ? Pressable : View;
  return (
    <Comp
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? label : undefined}
      accessibilityHint={onPress ? hint : undefined}
      accessibilityState={onPress ? { disabled: !!disabled } : undefined}
      className={cn(
        'min-h-[38px] flex-row items-center gap-2.5 py-2',
        divider && 'border-b border-overlay/[0.06]',
        onPress && 'hover:bg-overlay/[0.03] active:bg-overlay/[0.05]',
        onPress && web && !disabled && 'cursor-pointer',
        disabled && 'opacity-50',
        className,
      )}
      style={style}
    >
      {renderIcon(icon, { size: 16, tone: destructive ? 'danger' : 'icon' })}
      <View className="min-w-0 flex-1 gap-0.5">
        <Text variant="body-lg" weight="semibold" tone={destructive ? 'danger' : 'foreground'} numberOfLines={1}>
          {label}
        </Text>
        {hint ? (
          <Text variant="caption" tone="muted">
            {hint}
          </Text>
        ) : null}
      </View>
      {control != null ? (
        <View className="shrink-0 flex-row items-center">{typeof control === 'string' ? <Text variant="label" tone="muted" numberOfLines={1}>{control}</Text> : control}</View>
      ) : onPress ? (
        renderIcon('chevron-right', { size: 14, tone: 'subtle' })
      ) : null}
    </Comp>
  );
}
