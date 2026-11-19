import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { CountBadge } from '../Badge/CountBadge';
import { Text } from '../Text/Text';

export interface DockButtonProps {
  icon: IconSource;
  label: string;
  /** The chosen one: lifted on a pad, the icon in the primary. */
  active?: boolean;
  badge?: number;
  onPress: () => void;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** One place in the dock: an icon with its name under it. The chosen one is embossed, the others sit flat. */
export function DockButton({ icon, label, active, badge, onPress, accessibilityLabel, className, style }: DockButtonProps) {
  const web = Platform.OS === 'web';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected: !!active }}
      className={cn(
        'min-w-[64px] items-center justify-center gap-0.5 rounded-full px-3',
        active ? 'bg-overlay/[0.08]' : 'hover:bg-overlay/[0.04] active:bg-overlay/[0.06]',
        web && 'cursor-pointer select-none',
        className,
      )}
      style={[
        { height: 48 },
        active ? ({ boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.14), inset 0px -1px 0px rgba(0,0,0,0.25), 0px 2px 6px -2px rgba(0,0,0,0.5)' } as ViewStyle) : null,
        style,
      ]}
    >
      <View className="relative">
        {renderIcon(icon, { size: 20, tone: active ? 'primary' : 'icon-strong' })}
        {badge ? <CountBadge value={badge} tone="danger" max={99} className="absolute -right-2.5 -top-1.5" /> : null}
      </View>
      <Text variant="micro" weight={active ? 'bold' : 'semibold'} tone={active ? 'foreground' : 'muted'} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
