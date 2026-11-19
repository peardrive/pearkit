import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { statusSoftBg, statusToken } from '../../theme/tones';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { activityKindMeta, whenLabel, whereLabel, type ActivityItem } from './activityLogic';

export interface ActivityRowProps {
  item: ActivityItem;
  /** The line was pressed: open what it is about. */
  onOpen?: (item: ActivityItem) => void;
  /** The line's action button was pressed (after the item's own `action.onPress`). */
  onAction?: (item: ActivityItem) => void;
  /** Tighter: one line, no detail. */
  compact?: boolean;
  /** The breadcrumb under the title. Default true. */
  showWhere?: boolean;
  /** `Date.now()` unless the host keeps its own clock (tests, screenshots). */
  now?: number;
  /** Bottom hairline. Default true. */
  divider?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line of the feed, as PearDrive's: an unread dot at the left edge, a small tinted icon for the kind, who did
 * what, where it happened as a muted breadcrumb, the time at the right, and the action on the line when there is one.
 */
export function ActivityRow({ item, onOpen, onAction, compact, showWhere = true, now, divider = true, className, style }: ActivityRowProps) {
  const meta = activityKindMeta[item.kind];
  const web = Platform.OS === 'web';
  const where = showWhere ? whereLabel(item.where) : '';
  const press = onOpen ? () => onOpen(item) : undefined;
  // The line is a View with the pressable part inside it, so the action button is never a button inside a button.
  return (
    <View
      className={cn(
        'relative flex-row items-center gap-2.5 pr-3',
        compact ? 'min-h-[36px]' : 'min-h-[44px]',
        divider && 'border-b border-overlay/[0.06]',
        press && 'hover:bg-overlay/[0.04]',
        className,
      )}
      style={style}
    >
      {item.unread ? <View className="absolute left-[5px] top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary" accessibilityElementsHidden /> : null}
      <Pressable
        onPress={press}
        disabled={!press}
        accessibilityRole={press ? 'button' : undefined}
        accessibilityLabel={`${item.unread ? 'Unread. ' : ''}${meta.label}: ${item.who ? `${item.who.name} ` : ''}${item.title}${where ? `, in ${where}` : ''}, ${whenLabel(item.ts, now)}`}
        className={cn('min-w-0 flex-1 flex-row items-center gap-2.5 self-stretch pl-4', compact ? 'py-1' : 'py-2', press && web && 'cursor-pointer')}
      >
        <View className={cn('items-center justify-center rounded-full', compact ? 'h-6 w-6' : 'h-7 w-7', statusSoftBg[meta.tone])}>
          <Icon name={meta.icon} size={compact ? 13 : 14} tone={statusToken[meta.tone]} />
        </View>
        <View className="min-w-0 flex-1">
          <Text variant={compact ? 'label' : 'body-sm'} weight={item.unread ? 'semibold' : 'medium'} numberOfLines={1}>
            {item.who ? (
              <Text variant={compact ? 'label' : 'body-sm'} weight="semibold" tone={item.who.agent ? 'primary-text' : 'foreground'}>
                {item.who.name}{' '}
              </Text>
            ) : null}
            {item.title}
          </Text>
          {!compact && item.detail ? (
            <Text variant="caption" tone="muted" numberOfLines={1}>
              {item.detail}
            </Text>
          ) : null}
          {where ? (
            <Text variant="micro" tone="subtle" numberOfLines={1}>
              {where}
            </Text>
          ) : null}
        </View>
      </Pressable>
      {item.action ? (
        <Button
          size="sm"
          variant={item.kind === 'approval' ? 'primary' : 'secondary'}
          label={item.action.label}
          onPress={() => {
            item.action?.onPress();
            onAction?.(item);
          }}
        />
      ) : null}
      <Text variant="micro" tone="subtle" numberOfLines={1} className="min-w-[28px] text-right">
        {whenLabel(item.ts, now)}
      </Text>
    </View>
  );
}
