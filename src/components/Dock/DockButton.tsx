import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { useTheme } from '../../theme/ThemeProvider';
import { embossPad } from '../../theme/emboss';
import { CountBadge } from '../Badge/CountBadge';
import { Text } from '../Text/Text';

export interface DockButtonProps {
  icon: IconSource;
  label: string;
  /** The chosen one: lifted a little more, the icon in the primary. */
  active?: boolean;
  badge?: number;
  onPress: () => void;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One place in the dock: a filled, embossed icon with its name under it, on a pad that stands a little proud
 * of the glass, lit from above. The chosen one is lifted more and its icon is painted in the primary.
 */
export function DockButton({ icon, label, active, badge, onPress, accessibilityLabel, className, style }: DockButtonProps) {
  const web = Platform.OS === 'web';
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected: !!active }}
      className={cn('min-w-[64px] items-center justify-center gap-0.5 rounded-full px-3', !active && 'hover:opacity-90 active:opacity-80', web && 'cursor-pointer select-none', className)}
      style={[{ height: 48 }, embossPad(theme, { active }, web), style]}
    >
      <View className="relative">
        {renderIcon(icon, { size: 20, tone: active ? 'primary' : 'icon-strong', emboss: true })}
        {badge ? <CountBadge value={badge} tone="danger" max={99} className="absolute -right-2.5 -top-1.5" /> : null}
      </View>
      <Text variant="micro" weight={active ? 'bold' : 'semibold'} tone={active ? 'foreground' : 'muted'} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
