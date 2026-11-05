import React from 'react';
import { View } from 'react-native';
import { cn } from '../../utils/cn';

export interface SpacerProps {
  /** Fixed size in px along the parent's main axis. Omit to grow (`flex-1`). */
  size?: number;
  className?: string;
}

/** Pushes siblings apart (`flex-1`) or adds a fixed gap. */
export function Spacer({ size, className }: SpacerProps) {
  return <View className={cn(size == null && 'min-h-0 min-w-0 flex-1', className)} style={size != null ? { width: size, height: size } : undefined} />;
}
