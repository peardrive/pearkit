import React from 'react';
import { Image, Platform, Pressable, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { Avatar } from '../Avatar/Avatar';
import { Text } from '../Text/Text';

export interface OrgTabItem {
  key: string;
  name: string;
  avatar?: { seed?: string; uri?: string };
  /** A quiet number under the name (projects, unread). */
  count?: number;
}

export type OrgTabsSize = 'sm' | 'md';

export interface OrgTabsProps {
  items: OrgTabItem[];
  /** The chosen key; `ALL_ORGS` for the "All" tab. */
  value: string;
  onChange: (key: string) => void;
  /** Shows a + at the end that calls this. */
  onAdd?: () => void;
  size?: OrgTabsSize;
  /** The first tab's name. Default "All". */
  allLabel?: string;
  /** Leave out the "All" tab. */
  hideAll?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** The key of the "All" tab. */
export const ALL_ORGS = '*';

const sizes: Record<OrgTabsSize, { avatar: number; width: number; gap: number }> = {
  sm: { avatar: 40, width: 64, gap: 8 },
  md: { avatar: 52, width: 76, gap: 10 },
};

function Tab({ selected, onPress, label, count, size, accessibilityLabel, children }: { selected?: boolean; onPress: () => void; label: string; count?: number; size: OrgTabsSize; accessibilityLabel?: string; children: React.ReactNode }) {
  const s = sizes[size];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected: !!selected }}
      className={cn('items-center gap-1', Platform.OS === 'web' && 'cursor-pointer select-none')}
      style={{ width: s.width }}
    >
      <View
        className={cn('items-center justify-center rounded-full border-2', selected ? 'border-primary' : 'border-transparent')}
        style={{ width: s.avatar + 8, height: s.avatar + 8, padding: 2 }}
      >
        {children}
      </View>
      <View className="w-full flex-row items-center justify-center gap-1 px-0.5">
        <Text variant="micro" weight={selected ? 'bold' : 'medium'} tone={selected ? 'foreground' : 'muted'} numberOfLines={1} className="min-w-0 shrink">
          {label}
        </Text>
        {count != null ? (
          <Text variant="micro" tone="subtle" numberOfLines={1}>
            {count}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

/**
 * The organizations as a row of round tabs with their names under, "All" first, a + last; the chosen one ringed in
 * the primary. The row scrolls sideways and snaps to a tab, so a flick moves along it.
 */
export function OrgTabs({ items, value, onChange, onAdd, size = 'md', allLabel = 'All', hideAll, className, style }: OrgTabsProps) {
  const s = sizes[size];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={s.width + s.gap}
      snapToAlignment="start"
      decelerationRate="fast"
      className={cn('w-full flex-grow-0', className)}
      style={style}
      contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: s.gap, flexDirection: 'row', alignItems: 'flex-start' }}
      accessibilityRole="tablist"
    >
      {!hideAll ? (
        <Tab size={size} label={allLabel} selected={value === ALL_ORGS} onPress={() => onChange(ALL_ORGS)}>
          <View className={cn('items-center justify-center rounded-full border border-overlay/10', value === ALL_ORGS ? 'bg-primary/[0.14]' : 'bg-overlay/[0.06]')} style={{ width: s.avatar, height: s.avatar }}>
            <Icon name="grid-1" size={Math.round(s.avatar * 0.4)} tone={value === ALL_ORGS ? 'primary-text' : 'icon-strong'} />
          </View>
        </Tab>
      ) : null}
      {items.map((it) => (
        <Tab key={it.key} size={size} label={it.name} count={it.count} selected={value === it.key} onPress={() => onChange(it.key)}>
          {it.avatar?.uri ? (
            <Image source={{ uri: it.avatar.uri }} style={{ width: s.avatar, height: s.avatar, borderRadius: s.avatar / 2 }} accessibilityIgnoresInvertColors />
          ) : (
            <Avatar seed={it.avatar?.seed ?? it.key} size={s.avatar} label={it.name.slice(0, 1)} />
          )}
        </Tab>
      ))}
      {onAdd ? (
        <Tab size={size} label="New" onPress={onAdd} accessibilityLabel="New organization">
          <View className="items-center justify-center rounded-full border border-dashed border-overlay/25" style={{ width: s.avatar, height: s.avatar }}>
            <Icon name="add" size={Math.round(s.avatar * 0.4)} tone="icon-strong" />
          </View>
        </Tab>
      ) : null}
    </ScrollView>
  );
}
