import React from 'react';
import { Image, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/registry';
import { statusSoftBg, statusToken, type StatusTone } from '../../theme/tones';
import { fileKindMeta, type FileKind } from './fileKind';
import { RetryImage } from './RetryImage';

export { fileKindMeta, fileKindFromName, type FileKind } from './fileKind';

export interface ThumbnailProps {
  /** Image source (`require(...)`, `{ uri }` or a URL string). Falls back to the kind icon. */
  source?: ImageSourcePropType | string | null;
  kind?: FileKind;
  /** Square size in px. Default 40. */
  size?: number;
  /** Corner radius in px. Defaults to ~23% of the size (9 at 40px, 16 at 68px). */
  radius?: number;
  /** Hairline border (the detail preview uses it). */
  bordered?: boolean;
  /** Override the fallback tint. */
  tone?: StatusTone;
  /** Override the fallback icon. */
  icon?: IconName;
  /** Rendered on top, e.g. a play badge or a selection check. */
  overlay?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function Thumbnail({ source, kind = 'file', size = 40, radius, bordered, tone, icon, overlay, className, style, accessibilityLabel }: ThumbnailProps) {
  const meta = fileKindMeta[kind];
  const r = radius ?? Math.round(size * 0.23);
  const src = typeof source === 'string' ? { uri: source } : source;
  const t = tone ?? meta.tone;
  return (
    <View
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      className={cn('items-center justify-center overflow-hidden', !src && statusSoftBg[t], bordered && 'border border-overlay/10', className)}
      style={[{ width: size, height: size, borderRadius: r }, style]}
    >
      {typeof source === 'string' ? (
        <RetryImage uri={source} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      ) : src ? (
        <Image source={src} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      ) : (
        <Icon name={icon ?? meta.icon} size={Math.round(size * 0.5)} tone={statusToken[t]} strokeWidth={kind === 'folder' ? 1.6 : 1.5} />
      )}
      {overlay}
    </View>
  );
}
