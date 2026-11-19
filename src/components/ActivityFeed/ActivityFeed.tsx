import React, { type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { ActivityRow } from './ActivityRow';
import { groupByDay, type ActivityItem } from './activityLogic';

export * from './activityLogic';
export * from './ActivityRow';

export interface ActivityFeedProps {
  /** Newest first. */
  items: ActivityItem[];
  onOpen?: (item: ActivityItem) => void;
  onAction?: (item: ActivityItem) => void;
  /** Shown while there are no items. */
  emptyState?: ReactNode;
  /** A quiet day label over each day's lines. Default true. */
  groupByDay?: boolean;
  compact?: boolean;
  /** The breadcrumb under each title (turn it off inside one project). Default true. */
  showWhere?: boolean;
  /** `Date.now()` unless the host keeps its own clock. */
  now?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * What needs you and what happened, one line each, newest first, in PearDrive's feed style. It is a plain column:
 * put it in the page's own scroll.
 */
export function ActivityFeed({ items, onOpen, onAction, emptyState, groupByDay: byDay = true, compact, showWhere = true, now, className, style }: ActivityFeedProps) {
  if (!items.length) {
    return (
      <View className={cn('flex-1 items-center justify-center p-6', className)} style={style}>
        {emptyState}
      </View>
    );
  }
  const days = byDay ? groupByDay(items, now) : [{ label: '', items }];
  return (
    <View className={cn('w-full', className)} style={style} accessibilityRole="list">
      {days.map((d, di) => (
        <View key={`${d.label}-${di}`}>
          {d.label ? <SectionLabel label={d.label} inset="list" className={cn('pl-4', di > 0 && 'pt-3')} /> : null}
          {d.items.map((item, i) => (
            <ActivityRow key={item.id} item={item} onOpen={onOpen} onAction={onAction} compact={compact} showWhere={showWhere} now={now} divider={i < d.items.length - 1} />
          ))}
        </View>
      ))}
    </View>
  );
}
