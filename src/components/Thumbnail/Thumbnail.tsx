import React from 'react';
import { Image, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/registry';
import { statusSoftBg, statusToken, type StatusTone } from '../../theme/tones';

export type FileKind = 'folder' | 'video' | 'image' | 'audio' | 'document' | 'file';

/** Icon + tint used when a thumbnail has no image. Replace entries to re-skin. */
export const fileKindMeta: Record<FileKind, { icon: IconName; tone: StatusTone; label: string }> = {
  folder: { icon: 'folder', tone: 'accent', label: 'Folder' },
  video: { icon: 'video', tone: 'info', label: 'Video' },
  image: { icon: 'image', tone: 'warning', label: 'Picture' },
  audio: { icon: 'music', tone: 'danger', label: 'Music' },
  document: { icon: 'document', tone: 'neutral', label: 'Document' },
  file: { icon: 'document', tone: 'neutral', label: 'File' },
};

/** Guess a file kind from a file name. */
export function fileKindFromName(name: string): FileKind {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  if (!name.includes('.')) return 'folder';
  if (['mp4', 'mov', 'mkv', 'webm', 'avi', 'm4v'].includes(ext)) return 'video';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'avif', 'svg'].includes(ext)) return 'image';
  if (['mp3', 'wav', 'flac', 'm4a', 'ogg', 'aac'].includes(ext)) return 'audio';
  if (['pdf', 'doc', 'docx', 'txt', 'md', 'pages', 'rtf'].includes(ext)) return 'document';
  return 'file';
}

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
      {src ? (
        <Image source={src} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      ) : (
        <Icon name={icon ?? meta.icon} size={Math.round(size * 0.5)} tone={statusToken[t]} strokeWidth={kind === 'folder' ? 1.6 : 1.5} />
      )}
      {overlay}
    </View>
  );
}
