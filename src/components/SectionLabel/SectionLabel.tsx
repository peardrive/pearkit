import React from 'react';
import { View } from 'react-native';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';

export interface SectionLabelProps {
  label: string;
  /** Appended as ` · n`, e.g. `IN PROGRESS · 2`. */
  count?: number | string;
  /** Preset paddings: `sidebar` (14/10/6), `list` (10/6/4) or `none`. */
  inset?: 'sidebar' | 'list' | 'none';
  trailing?: React.ReactNode;
  className?: string;
}

const insets = { sidebar: 'px-2.5 pb-1.5 pt-3.5', list: 'px-1.5 pb-1 pt-2.5', none: '' };

/** Uppercase overline that titles a group: LIBRARY, STATUS, IN PROGRESS · 2… */
export function SectionLabel({ label, count, inset = 'sidebar', trailing, className }: SectionLabelProps) {
  return (
    <View accessibilityRole="header" className={cn('w-full flex-row items-center', insets[inset], className)}>
      <Text variant="overline" numberOfLines={1} className="flex-1">
        {count != null ? `${label} · ${count}` : label}
      </Text>
      {trailing}
    </View>
  );
}
