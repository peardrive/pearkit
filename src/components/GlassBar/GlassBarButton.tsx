import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { CountBadge } from '../Badge/CountBadge';
import { Text } from '../Text/Text';

export interface GlassBarButtonProps {
  icon: IconSource;
  /** A word under the circle. */
  label?: string;
  /** The chosen one: lit with the primary. */
  active?: boolean;
  /** A count on the circle's corner (unread, pending). Hidden at 0. */
  badge?: number;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** PearDrive's toolbar action: a glass circle with its name under it, lit when it is the chosen one. */
export function GlassBarButton({ icon, label, active, badge, onPress, accessibilityLabel, disabled, className, style }: GlassBarButtonProps) {
  const web = Platform.OS === 'web';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: !!active, disabled: !!disabled }}
      className={cn('min-w-[46px] items-center gap-[3px]', web && !disabled && 'cursor-pointer', disabled && 'opacity-50', className)}
      style={style}
    >
      <View
        className={cn(
          'h-[36px] w-[36px] items-center justify-center rounded-full border',
          active ? 'border-primary/70 bg-primary/[0.18]' : 'border-overlay/[0.13] bg-overlay/[0.08] hover:border-overlay/25 hover:bg-overlay/[0.12] active:bg-overlay/[0.06]',
        )}
        style={{ boxShadow: active ? '0px 0px 14px -4px rgb(var(--pk-primary))' : 'inset 0px 1px 0px rgba(255,255,255,0.14), 0px 1px 2px rgba(0,0,0,0.35)' } as ViewStyle}
      >
        {renderIcon(icon, { size: 17, tone: active ? 'primary-text' : 'foreground' })}
        {badge ? <CountBadge value={badge} tone="danger" max={99} className="absolute -right-1.5 -top-1.5" /> : null}
      </View>
      {label ? (
        <Text variant="micro" weight="semibold" tone={active ? 'foreground' : 'muted'} numberOfLines={1}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
