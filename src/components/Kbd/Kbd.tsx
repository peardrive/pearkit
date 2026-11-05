import React from 'react';
import { View } from 'react-native';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';

export interface KbdProps {
  /** Shortcut text, e.g. `⌘F`. */
  children: string;
  className?: string;
}

/** Keyboard shortcut hint chip. */
export function Kbd({ children, className }: KbdProps) {
  return (
    <View className={cn('rounded-xs bg-overlay/[0.07] px-1.5 py-px', className)}>
      <Text variant="overline" tone="muted" className="normal-case tracking-normal">
        {children}
      </Text>
    </View>
  );
}
