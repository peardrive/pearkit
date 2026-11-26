import React from 'react';
import { Image, Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { formatBytes } from '../../utils/format';
import { Icon } from '../../icons/Icon';
import { statusToken } from '../../theme/tones';
import { Text } from '../Text/Text';
import { Thumbnail, fileKindMeta } from '../Thumbnail/Thumbnail';
import { attachmentAspect, attachmentKind, galleryLayout, splitAttachments } from './attachmentsLogic';
import type { ChatAttachment } from './types';

export interface AttachmentsProps {
  items: ChatAttachment[];
  /** Open one (a picture in the viewer, a file wherever the app opens files). Without it nothing is pressable. */
  onOpen?: (attachment: ChatAttachment, index: number) => void;
  /** Under a message of mine the gallery and chips sit at the right. */
  align?: 'left' | 'right';
  /** The widest a gallery gets, in px. Default 300. */
  width?: number;
  /** Chips only, no gallery: a tight list for a sidebar or a search result. */
  compact?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const web = Platform.OS === 'web';

/**
 * What a message carries, under its text: pictures and videos as a gallery (one keeps its shape, two side by
 * side, three as one over two, four or more as a grid with "+N" on the last), every other file as a small chip
 * with its kind, name and size. One press opens it. The same piece in every app's chat.
 */
export function Attachments({ items, onOpen, align = 'left', width = 300, compact = false, className, style }: AttachmentsProps) {
  const { gallery, files } = splitAttachments(compact ? [] : items);
  const chips = compact ? items.map((item, index) => ({ item, index })) : files;
  const right = align === 'right';
  const first = gallery[0]?.item;
  const layout = galleryLayout(gallery.length, { width, aspect: first ? attachmentAspect(first) : null });

  return (
    <View className={cn('gap-1.5', right ? 'items-end' : 'items-start', className)} style={style}>
      {gallery.length ? (
        <View accessibilityRole="list" accessibilityLabel={`${gallery.length} picture${gallery.length === 1 ? '' : 's'}`} style={{ width: layout.width, height: layout.height }}>
          {layout.cells.map((c, i) => {
            const { item, index } = gallery[i]!;
            const kind = attachmentKind(item);
            const last = i === layout.cells.length - 1 && layout.more > 0;
            const src = item.thumbnail || item.url;
            return (
              <Pressable
                key={`${item.name}-${index}`}
                onPress={onOpen ? () => onOpen(item, index) : undefined}
                disabled={!onOpen}
                accessibilityRole="button"
                accessibilityLabel={last ? `Open ${item.name} and ${layout.more} more` : `Open ${item.name}`}
                className={cn('absolute overflow-hidden rounded-control border border-overlay/[0.10] bg-inset active:border-primary/60', web && onOpen && 'cursor-pointer hover:border-overlay/[0.22]')}
                style={{ left: c.x, top: c.y, width: c.w, height: c.h }}
              >
                {src ? <Image source={{ uri: src }} resizeMode="cover" style={{ width: c.w, height: c.h }} accessibilityIgnoresInvertColors accessibilityLabel={item.name} /> : null}
                {kind === 'video' ? (
                  <View className="absolute inset-0 items-center justify-center">
                    <View className="h-9 w-9 items-center justify-center rounded-full bg-black/55">
                      <Icon name="play" size={18} tone="foreground" />
                    </View>
                  </View>
                ) : null}
                {last ? (
                  <View className="absolute inset-0 items-center justify-center bg-black/55">
                    <Text variant="title" weight="bold" tone="foreground">
                      +{layout.more}
                    </Text>
                  </View>
                ) : null}
                {item.state === 'fetching' ? (
                  <View className="absolute bottom-1 right-1 rounded-full bg-black/55 px-1.5 py-0.5">
                    <Text variant="micro" tone="foreground">
                      fetching…
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {chips.length ? (
        <View className={cn('flex-row flex-wrap gap-1.5', right && 'justify-end')} style={{ maxWidth: Math.max(width, 220) }}>
          {chips.map(({ item, index }) => {
            const kind = attachmentKind(item);
            const meta = fileKindMeta[kind];
            return (
              <Pressable
                key={`${item.name}-${index}`}
                onPress={onOpen ? () => onOpen(item, index) : undefined}
                disabled={!onOpen}
                accessibilityRole="button"
                accessibilityLabel={`Open ${item.name}`}
                className={cn('flex-row items-center gap-2 rounded-control border border-overlay/[0.10] bg-pane py-1.5 pl-1.5 pr-2.5 active:border-primary/60', web && onOpen && 'cursor-pointer hover:border-overlay/[0.22]')}
                style={{ maxWidth: 240 }}
              >
                {item.thumbnail ? <Thumbnail source={item.thumbnail} kind={kind} size={28} radius={6} /> : (
                  <View className="h-7 w-7 items-center justify-center rounded-md bg-overlay/[0.06]">
                    <Icon name={meta.icon} size={15} tone={statusToken[meta.tone]} />
                  </View>
                )}
                <View className="min-w-0 shrink">
                  <Text variant="micro" weight="semibold" tone="foreground" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text variant="micro" tone="muted" numberOfLines={1}>
                    {[item.size != null ? formatBytes(item.size) : null, item.state === 'away' ? 'elsewhere' : item.state === 'fetching' ? 'fetching…' : null].filter(Boolean).join(' · ') || meta.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
