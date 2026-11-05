import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import type { IconSource } from '../../icons/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

export interface PaneHeaderAction {
  icon: IconSource;
  label: string;
  onPress?: () => void;
  active?: boolean;
  shortcut?: string;
}

export interface PaneHeaderProps {
  title: string;
  subtitle?: string;
  /** Icon actions on the right (sort, filter, more…) or your own nodes. */
  actions?: PaneHeaderAction[] | React.ReactNode;
  /** Element before the title, e.g. a back button on mobile. */
  leading?: React.ReactNode;
  /** Mark as an Electron drag region (title bar). */
  dragRegion?: boolean;
  /** Title size: `title` (18, desktop panes) or `display` (21, mobile screens). */
  size?: 'title' | 'display';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Title + subtitle + icon actions at the top of a pane: "All Shares · 12 items · 2 transferring". */
export function PaneHeader({ title, subtitle, actions, leading, dragRegion, size = 'title', className, style }: PaneHeaderProps) {
  return (
    <View
      className={cn('w-full flex-row items-center gap-1 pb-2.5 pl-4 pr-3 pt-4', dragRegion && 'app-region-drag', className)}
      style={style}
    >
      {leading}
      <View className="min-w-0 flex-1 gap-0.5">
        <Text variant={size} accessibilityRole="header" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" tone="subtle" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {Array.isArray(actions)
        ? (actions as PaneHeaderAction[]).map((a) => (
            <IconButton
              key={a.label}
              icon={a.icon}
              size="sm"
              active={a.active}
              onPress={a.onPress}
              tooltip={{ label: a.label, shortcut: a.shortcut }}
              className="app-region-no-drag"
            />
          ))
        : actions}
    </View>
  );
}
