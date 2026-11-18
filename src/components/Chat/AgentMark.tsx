import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';

export interface AgentMarkProps {
  size?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** The agent's mark where a person would have an avatar: a robot in a tinted circle. It says "this is the AI talking". */
export function AgentMark({ size = 24, className, style, accessibilityLabel = 'AI' }: AgentMarkProps) {
  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      className={cn('items-center justify-center rounded-full border border-primary/40 bg-primary/[0.16]', className)}
      style={[{ width: size, height: size }, style]}
    >
      <Icon name="robot" size={Math.round(size * 0.66)} tone="primary" />
    </View>
  );
}
