import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { StatusTone } from '../../theme/tones';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { StatusPill } from '../Status/StatusPill';
import type { ShareStatus } from '../Status/status';
import { Text } from '../Text/Text';
import { Thumbnail, type ThumbnailProps } from '../Thumbnail/Thumbnail';

export interface ShareRowProps {
  name: string;
  /** Secondary line. An array is joined with ` · ` ("Video · 1.2 GB · 3 peers"). */
  meta?: string | string[];
  /** Thumbnail props, or your own element. */
  thumbnail?: ThumbnailProps | React.ReactElement;
  /** Gold star after the name. */
  favorite?: boolean;
  /** 0–1. When set, an in-flight progress bar is shown under the meta line. */
  progress?: number;
  status?: ShareStatus;
  /** Override the pill label / tone. */
  statusLabel?: string;
  statusTone?: StatusTone;
  /** Small text under the pill: "now", "2h", "Yesterday"… */
  timestamp?: string;
  /** Inline link that replaces the timestamp, e.g. Retry on failure. */
  action?: { label: string; onPress: () => void };
  selected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * List row for a share (file or folder). Toggle `progress` for in-flight
 * transfers and `favorite` for starred items — mirrors the Figma “Share Row”.
 */
export function ShareRow({
  name,
  meta,
  thumbnail,
  favorite,
  progress,
  status,
  statusLabel,
  statusTone,
  timestamp,
  action,
  selected,
  onPress,
  onLongPress,
  disabled,
  className,
  style,
}: ShareRowProps) {
  const metaText = Array.isArray(meta) ? meta.filter(Boolean).join(' · ') : meta;
  const thumb = React.isValidElement(thumbnail) ? thumbnail : <Thumbnail size={40} {...(thumbnail as ThumbnailProps | undefined)} />;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[name, metaText, statusLabel ?? status].filter(Boolean).join(', ')}
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      className={cn(
        'h-15 w-full flex-row items-center gap-3 rounded-control border py-2.5 pl-2.5 pr-3',
        Platform.OS === 'web' && 'cursor-pointer select-none',
        selected ? 'border-primary bg-selected' : 'border-transparent hover:bg-overlay/[0.03] active:bg-overlay/5',
        disabled && 'opacity-50',
        className,
      )}
      style={style}
    >
      {thumb}

      <View className="min-w-0 flex-1 gap-[3px]">
        <View className="flex-row items-center gap-[5px]">
          <Text variant="body-lg" numberOfLines={1} className="shrink">
            {name}
          </Text>
          {favorite ? <Icon name="star-bold" size={11} tone="favorite" accessibilityLabel="Favorite" /> : null}
        </View>
        {metaText ? (
          <Text variant="caption" numberOfLines={1}>
            {metaText}
          </Text>
        ) : null}
        {progress != null ? <ProgressBar value={progress} height={4} className="mt-px" /> : null}
      </View>

      {status || statusLabel || timestamp || action ? (
        <View className="shrink-0 items-end gap-[5px]">
          {status || statusLabel ? (
            <StatusPill status={status} label={statusLabel} tone={statusTone} progress={progress} className="self-end" />
          ) : null}
          {action ? (
            <Text
              variant="micro"
              weight="semibold"
              tone="primary-text"
              className="underline"
              accessibilityRole="button"
              onPress={action.onPress}
              suppressHighlighting
            >
              {action.label}
            </Text>
          ) : timestamp ? (
            <Text variant="micro" numberOfLines={1}>
              {timestamp}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}
