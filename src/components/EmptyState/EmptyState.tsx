import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Text } from '../Text/Text';

export interface EmptyStateProps {
  icon?: IconSource;
  title: string;
  description?: string;
  /** Usually one or two `<Button/>`s. */
  actions?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Centered placeholder for empty lists, no selection, offline… */
export function EmptyState({ icon = 'folder-open', title, description, actions, className, style }: EmptyStateProps) {
  return (
    <View className={cn('flex-1 items-center justify-center gap-3 p-8', className)} style={style}>
      <View className="mb-1 h-14 w-14 items-center justify-center rounded-xl border border-overlay/[0.07] bg-overlay/[0.04]">
        {renderIcon(icon, { size: 24, tone: 'icon' })}
      </View>
      <Text variant="body-lg" className="text-center">
        {title}
      </Text>
      {description ? (
        <Text variant="caption" tone="subtle" className="max-w-[280px] text-center leading-[17px]">
          {description}
        </Text>
      ) : null}
      {actions ? <View className="mt-2 flex-row gap-2">{actions}</View> : null}
    </View>
  );
}
