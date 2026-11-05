import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '../../utils/cn';

export interface CardProps extends ViewProps {
  /** `md` — 16px padding / 14px radius (detail cards). `sm` — 12px / 12px (sidebar cards). */
  size?: 'sm' | 'md';
  /** `surface` — tinted fill + hairline (default). `outline` — hairline only. `plain` — no chrome. */
  variant?: 'surface' | 'outline' | 'plain';
  className?: string;
}

const cardSize = { sm: 'gap-2.5 rounded-lg p-3', md: 'gap-3 rounded-card p-4' };
const cardVariant = {
  surface: 'border border-overlay/[0.07] bg-overlay/[0.04]',
  outline: 'border border-overlay/[0.08]',
  plain: '',
};

/** Grouping surface used for the network status, transfer and share-link panels. */
export function Card({ size = 'md', variant = 'surface', className, ...rest }: CardProps) {
  return <View className={cn('w-full overflow-hidden', cardSize[size], cardVariant[variant], className)} {...rest} />;
}
