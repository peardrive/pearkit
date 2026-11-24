import React, { type ReactNode } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Text } from '../Text/Text';

export interface ChoiceCardProps {
  icon?: IconSource;
  title: string;
  description?: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  /** A small word at the right of the title ("recommended", "no key"). */
  tag?: string;
  /** Shown under the description when selected: the choice's own fields. */
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One of a few ways to do something, as a card the person picks: an icon, a title, a line of description and a
 * radio at the right. Selected, it can open to its own fields underneath (a key to paste, a URL to confirm).
 */
export function ChoiceCard({ icon, title, description, selected, disabled, onPress, tag, children, className, style }: ChoiceCardProps) {
  const web = Platform.OS === 'web';
  return (
    <View className={cn('w-full overflow-hidden rounded-card border', selected ? 'border-primary/60 bg-primary/[0.06]' : 'border-overlay/[0.07] bg-overlay/[0.04]', disabled && 'opacity-50', className)} style={style}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="radio"
        accessibilityLabel={title}
        accessibilityState={{ selected: !!selected, disabled: !!disabled }}
        className={cn('flex-row items-center gap-3 p-3.5', !selected && 'hover:bg-overlay/[0.03]', web && !disabled && 'cursor-pointer')}
      >
        {icon ? <View className={cn('h-10 w-10 items-center justify-center rounded-lg border', selected ? 'border-primary/30 bg-primary/10' : 'border-overlay/[0.07] bg-overlay/[0.05]')}>{renderIcon(icon, { size: 20, tone: selected ? 'primary-text' : 'icon-strong' })}</View> : null}
        <View className="min-w-0 flex-1 gap-0.5">
          <View className="flex-row items-center gap-2">
            <Text variant="body-lg" numberOfLines={1} className="min-w-0 shrink">
              {title}
            </Text>
            {tag ? (
              <View className="rounded-full border border-overlay/[0.08] bg-overlay/[0.05] px-1.5 py-px">
                <Text variant="micro" tone="subtle">
                  {tag}
                </Text>
              </View>
            ) : null}
          </View>
          {description ? (
            <Text variant="caption" tone="muted" className="leading-4">
              {description}
            </Text>
          ) : null}
        </View>
        <View className={cn('h-[18px] w-[18px] items-center justify-center rounded-full border-2', selected ? 'border-primary' : 'border-overlay/25')}>{selected ? <View className="h-2 w-2 rounded-full bg-primary" /> : null}</View>
      </Pressable>
      {selected && children ? <View className="gap-2.5 border-t border-overlay/[0.07] px-3.5 pb-3.5 pt-3">{children}</View> : null}
    </View>
  );
}
