import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { Text } from '../Text/Text';

export interface KeyValueRowProps {
  label: string;
  value: React.ReactNode;
  /** Makes the row pressable (e.g. "Location" → reveal in Finder). */
  onPress?: () => void;
  /** Bottom hairline. Default true. */
  divider?: boolean;
  className?: string;
}

export function KeyValueRow({ label, value, onPress, divider = true, className }: KeyValueRowProps) {
  const Comp = onPress ? Pressable : View;
  return (
    <Comp
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      className={cn(
        'w-full flex-row items-center gap-4 px-0.5 py-[9px]',
        divider && 'border-b border-overlay/5',
        onPress && 'hover:bg-overlay/[0.03]',
        onPress && Platform.OS === 'web' && 'cursor-pointer',
        className,
      )}
    >
      <Text variant="label" tone="subtle" numberOfLines={1}>
        {label}
      </Text>
      <View className="min-w-0 flex-1 items-end">
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text variant="label" weight="semibold" numberOfLines={1}>
            {value}
          </Text>
        ) : (
          value
        )}
      </View>
    </Comp>
  );
}

export interface KeyValueListProps {
  /** Overline title, e.g. `DETAILS`. */
  title?: string;
  /** Data-driven rows… */
  items?: Array<Omit<KeyValueRowProps, 'divider'> & { key?: string }>;
  /** …or compose `<KeyValueRow/>` children yourself. */
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Label / value metadata list (the DETAILS block). */
export function KeyValueList({ title, items, children, className, style }: KeyValueListProps) {
  return (
    <View className={cn('w-full', className)} style={style}>
      {title ? <SectionLabel label={title} inset="none" className="px-0.5 pb-1.5" /> : null}
      {items?.map(({ key, ...row }) => <KeyValueRow key={key ?? row.label} {...row} />)}
      {children}
    </View>
  );
}
