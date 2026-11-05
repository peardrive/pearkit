import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import type { IconSource } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export interface DangerZoneProps {
  actionLabel?: string;
  icon?: IconSource;
  /** Consequence, shown next to the button. */
  description?: string;
  onPress?: () => void;
  disabled?: boolean;
  /** Stack the description under the button (narrow screens). */
  layout?: 'horizontal' | 'vertical';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Destructive action with its consequence spelled out: "Stop sharing — Peers will lose access…". */
export function DangerZone({
  actionLabel = 'Stop sharing',
  icon = 'stop-circle',
  description = 'Peers will lose access to this file',
  onPress,
  disabled,
  layout = 'horizontal',
  className,
  style,
}: DangerZoneProps) {
  return (
    <View className={cn('w-full gap-2.5', layout === 'horizontal' ? 'flex-row items-center' : 'items-start', className)} style={style}>
      <Button variant="danger" size="md" icon={icon} label={actionLabel} onPress={onPress} disabled={disabled} className="h-auto py-2 pl-2.5 pr-3" />
      {description ? (
        <Text variant="caption" tone="subtle" numberOfLines={2} className="shrink">
          {description}
        </Text>
      ) : null}
    </View>
  );
}
