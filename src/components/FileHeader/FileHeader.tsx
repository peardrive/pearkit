import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import type { StatusTone } from '../../theme/tones';
import { StatusPill } from '../Status/StatusPill';
import type { ShareStatus } from '../Status/status';
import { Text } from '../Text/Text';
import { Thumbnail, type ThumbnailProps } from '../Thumbnail/Thumbnail';

export interface FileHeaderProps {
  title: string;
  /** "Video · 1.2 GB · Added Jul 01, 2026" — array items are joined with ` · `. */
  meta?: string | string[];
  thumbnail?: ThumbnailProps | React.ReactElement;
  status?: ShareStatus;
  statusLabel?: string;
  statusTone?: StatusTone;
  /** Extra nodes under the pill (tags, actions…). */
  children?: React.ReactNode;
  /** Stack the preview above the text (mobile). */
  layout?: 'horizontal' | 'vertical';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Hero block at the top of the detail pane: big preview, name, meta and status. */
export function FileHeader({ title, meta, thumbnail, status, statusLabel, statusTone, children, layout = 'horizontal', className, style }: FileHeaderProps) {
  const metaText = Array.isArray(meta) ? meta.filter(Boolean).join(' · ') : meta;
  const thumb = React.isValidElement(thumbnail) ? (
    thumbnail
  ) : (
    <Thumbnail size={68} radius={16} bordered {...(thumbnail as ThumbnailProps | undefined)} />
  );
  const vertical = layout === 'vertical';
  return (
    <View className={cn('w-full gap-4', vertical ? 'items-center' : 'flex-row items-center', className)} style={style}>
      {thumb}
      <View className={cn('min-w-0 gap-1.5', vertical ? 'items-center' : 'flex-1')}>
        <Text variant="display" accessibilityRole="header" numberOfLines={1}>
          {title}
        </Text>
        {metaText ? (
          <Text variant="label" tone="muted" numberOfLines={1}>
            {metaText}
          </Text>
        ) : null}
        {status || statusLabel ? <StatusPill status={status} label={statusLabel} tone={statusTone} size="md" /> : null}
        {children}
      </View>
    </View>
  );
}
