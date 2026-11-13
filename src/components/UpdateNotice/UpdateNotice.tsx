import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { Text } from '../Text/Text';
import { Tooltip } from '../Tooltip/Tooltip';
import { StatusDot } from '../Status/StatusDot';
import { useSidebar } from '../Sidebar/Sidebar';

export type UpdateState = 'available' | 'downloading' | 'restarting' | 'error';

export interface UpdateNoticeProps {
  /** The version waiting, e.g. "0.1.4". */
  version: string;
  /** How many versions this copy is behind (shown when more than one). */
  behind?: number;
  state?: UpdateState;
  /** 0–1 while downloading, when known. */
  progress?: number;
  /** Why the last try failed (state "error"). */
  error?: string;
  /** One press does it all: download, install, restart. Ignored while downloading or restarting. */
  onPress?: () => void;
  /** Shown as an icon only (a collapsed sidebar). Defaults to the sidebar's own collapsed state. */
  compact?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const pct = (p?: number) => (p == null ? '' : ` ${Math.round(Math.min(1, Math.max(0, p)) * 100)}%`);

/**
 * The notice at the bottom of the sidebar when a newer version is waiting. One press downloads it, installs it and
 * restarts the app on it. The app's update channel drives `state` and `progress`; this only shows them.
 */
export function UpdateNotice({ version, behind, state = 'available', progress, error, onPress, compact, className, style }: UpdateNoticeProps) {
  const sidebar = useSidebar();
  const iconOnly = compact ?? sidebar.collapsed;
  const busy = state === 'downloading' || state === 'restarting';
  const failed = state === 'error';

  const label =
    state === 'downloading'
      ? 'Downloading…'
      : state === 'restarting'
        ? 'Restarting…'
        : failed
          ? 'Update failed. Try again'
          : `Update to ${version}`;
  const detail = state === 'downloading' ? pct(progress).trim() || null : state === 'available' && behind && behind > 1 ? `${behind} behind` : null;
  const hint = failed ? `${error ?? 'The update did not finish.'} Press to try again.` : busy ? label : `Version ${version} is ready. Press to update; the app restarts on it.`;

  const row = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={iconOnly ? label : undefined}
      accessibilityHint={hint}
      accessibilityState={{ busy, disabled: busy }}
      disabled={busy}
      onPress={onPress}
      className={cn(
        'app-region-no-drag overflow-hidden rounded-md',
        Platform.OS === 'web' && (busy ? 'cursor-default' : 'cursor-pointer select-none'),
        iconOnly ? 'h-[34px] w-[34px] items-center justify-center' : 'h-9 w-full flex-row items-center gap-2 px-2.5',
        failed ? 'bg-danger/10 hover:bg-danger/[0.16]' : 'bg-primary/[0.12]',
        !failed && !busy && 'hover:bg-primary/20 active:bg-primary/[0.26]',
        className,
      )}
      style={style}
    >
      <Icon name={failed ? 'refresh' : 'import'} size={16} tone={failed ? 'danger' : 'primary'} />
      {iconOnly ? (
        <View className="absolute right-1 top-1">
          <StatusDot tone={failed ? 'danger' : 'primary'} size={6} />
        </View>
      ) : (
        <>
          <Text variant="body" weight="semibold" tone={failed ? 'danger' : 'primary'} numberOfLines={1} className="min-w-0 flex-1">
            {label}
          </Text>
          {detail ? (
            <Text variant="micro" tone="muted" numberOfLines={1}>
              {detail}
            </Text>
          ) : null}
        </>
      )}
      {state === 'downloading' && progress != null ? (
        <View className="absolute bottom-0 left-0 h-[2px] bg-primary" style={{ width: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` }} />
      ) : null}
    </Pressable>
  );

  return iconOnly ? (
    <Tooltip label={detail ? `${label} · ${detail}` : label} placement="right" offset={10}>
      {row}
    </Tooltip>
  ) : (
    row
  );
}
