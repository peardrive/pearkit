import React from 'react';
import {
  Image, Platform, Pressable, StyleSheet, View,
  type ImageSourcePropType, type StyleProp, type ViewStyle,
} from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { statusSoftBg, statusToken } from '../../theme/tones';
import { Icon } from '../../icons/Icon';
import { Text } from '../Text/Text';
import { LinearGradient } from '../Gradient/LinearGradient';
import { fileKindMeta, type FileKind } from '../Thumbnail/Thumbnail';

export interface MediaTileProps {
  /** Picture (`require(...)`, `{ uri }` or a URL string). Falls back to the kind icon. */
  source?: ImageSourcePropType | string | null;
  kind?: FileKind;
  /** Width / height of the tile (the RN convention). Default 16 / 9. */
  aspectRatio?: number;
  /** Shown on the bottom scrim. */
  title?: string;
  /** Secondary line under the title, e.g. `12:04 · 1080p`. */
  meta?: string;
  /** Always-visible corner tag, e.g. the duration `1:32:09`. */
  badge?: string;
  /** Primary ring + check, for multi-select. */
  selected?: boolean;
  favorite?: boolean;
  /**
   * Rendered over the picture whenever non-null — the host's live preview (a muted
   * looping video on the desktop, nothing or a native player on the phone). Mount it
   * from `onHoverChange`; the tile never owns playback.
   */
  preview?: React.ReactNode;
  /**
   * When the title/meta scrim shows. `auto` (default) = on hover where a pointer
   * exists, always where one doesn't.
   */
  reveal?: 'auto' | 'hover' | 'always';
  onHoverChange?: (hovered: boolean) => void;
  onPress?: () => void;
  onLongPress?: () => void;
  /** Corner radius in px. Default 10. */
  radius?: number;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One tile of a media wall: the picture, a corner badge, title and meta on a scrim, a
 * selection ring — and a `preview` slot that lights up under the pointer. Lay a wall of
 * them out with `Masonry`.
 */
export function MediaTile({
  source, kind = 'video', aspectRatio = 16 / 9, title, meta, badge, selected, favorite,
  preview, reveal = 'auto', onHoverChange, onPress, onLongPress, radius = 10,
  accessibilityLabel, className, style,
}: MediaTileProps) {
  const theme = useTheme();
  const [hovered, setHovered] = React.useState(false);
  const setHover = (h: boolean) => {
    setHovered(h);
    onHoverChange?.(h);
  };
  const canHover = Platform.OS === 'web';
  const mode = reveal === 'auto' ? (canHover ? 'hover' : 'always') : reveal;
  const showInfo = !!(title || meta) && (mode === 'always' || hovered);
  const kindMeta = fileKindMeta[kind];
  const src = typeof source === 'string' ? { uri: source } : source ?? null;
  const pressable = !!(onPress || onLongPress);
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      accessibilityRole={pressable ? 'button' : 'image'}
      accessibilityLabel={accessibilityLabel ?? title ?? kindMeta.label}
      accessibilityState={{ selected: !!selected }}
      className={cn(
        'w-full overflow-hidden border-2',
        selected ? 'border-primary' : 'border-transparent',
        pressable && Platform.OS === 'web' && 'cursor-pointer',
        className,
      )}
      style={[{ aspectRatio, borderRadius: radius }, style]}
    >
      {src ? (
        <Image source={src} resizeMode="cover" style={StyleSheet.absoluteFill} accessibilityIgnoresInvertColors />
      ) : (
        <View style={StyleSheet.absoluteFill} className={cn('items-center justify-center', statusSoftBg[kindMeta.tone])}>
          <Icon name={kindMeta.icon} size={28} tone={statusToken[kindMeta.tone]} />
        </View>
      )}

      {preview != null ? <View style={StyleSheet.absoluteFill}>{preview}</View> : null}

      {showInfo ? (
        <View className="absolute bottom-0 left-0 right-0 justify-end">
          <LinearGradient
            colors={[
              { color: theme.colors.background, offset: 0, opacity: 0 },
              { color: theme.colors.background, offset: 1, opacity: 0.88 },
            ]}
            direction="to-bottom"
          />
          <View className="gap-px px-2.5 pb-2 pt-5">
            {title ? (
              <Text variant="caption" weight="semibold" tone="foreground" numberOfLines={1}>
                {title}
              </Text>
            ) : null}
            {meta ? (
              <Text variant="micro" tone="muted" numberOfLines={1}>
                {meta}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {badge ? (
        <View
          className={cn(
            'absolute rounded-xs bg-background/70 px-[5px] py-px',
            showInfo ? 'top-1.5' : 'bottom-1.5',
            showInfo && selected ? 'right-[27px]' : 'right-1.5',
          )}
        >
          <Text variant="micro" weight="semibold" tone="foreground" numberOfLines={1}>
            {badge}
          </Text>
        </View>
      ) : null}

      {favorite ? (
        <View className="absolute left-1.5 top-1.5">
          <Icon name="star-bold" size={14} tone="favorite" />
        </View>
      ) : null}

      {selected ? (
        <View className="absolute right-1.5 top-1.5 h-[18px] w-[18px] items-center justify-center rounded-full bg-primary">
          <Icon name="tick" size={11} tone="primary-foreground" />
        </View>
      ) : null}
    </Pressable>
  );
}
