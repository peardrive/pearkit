import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { useTheme } from '../../theme/ThemeProvider';
import { embossPad } from '../../theme/emboss';
import { CountBadge } from '../Badge/CountBadge';
import { Text } from '../Text/Text';

export interface GlassBarButtonProps {
  icon: IconSource;
  /** A word under the circle. */
  label?: string;
  /** The chosen one: the circle lit with the primary. */
  active?: boolean;
  /** A count on the circle's corner (unread, pending). Hidden at 0. */
  badge?: number;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * PearDrive's toolbar action: an embossed circle standing a little proud of the glass, with a filled, embossed
 * icon in it and its name under; the chosen one is painted with the primary.
 */
export function GlassBarButton({ icon, label, active, badge, onPress, accessibilityLabel, disabled, className, style }: GlassBarButtonProps) {
  const web = Platform.OS === 'web';
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: !!active, disabled: !!disabled }}
      className={cn('min-w-[46px] items-center gap-[3px]', web && !disabled && 'cursor-pointer hover:opacity-90 active:opacity-80', disabled && 'opacity-50', className)}
      style={style}
    >
      <View className="h-[36px] w-[36px] items-center justify-center rounded-full" style={embossPad(theme, { active, primary: active }, web)}>
        {renderIcon(icon, { size: 17, tone: active ? 'primary-text' : 'foreground', emboss: true })}
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
