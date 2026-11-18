import React from 'react';
import { View } from 'react-native';
import { cn } from '../../utils/cn';
import type { DropZoneProps } from './dropZoneTypes';

export * from './dropZoneTypes';

/**
 * A place files can be dropped. On the web (`DropZone.web.tsx`) it listens to the browser's drag events and
 * shows an overlay while a drag is over it; on a phone there is nothing to drag from, so it only draws its children.
 */
export function DropZone({ children, className, style }: DropZoneProps) {
  return (
    <View className={cn('relative', className)} style={style}>
      {children}
    </View>
  );
}
