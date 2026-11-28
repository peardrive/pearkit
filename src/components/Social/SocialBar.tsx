import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';
import { formatCount, type SocialCounts } from '@/utils/social';
import { Icon, type IconName } from '@/icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from '@/components/Text/Text';

export interface SocialBarProps {
  /**
   * The numbers beside the marks. `null`: there is nothing to like or comment on (a notice, a card of
   * several things), so only Share is drawn. Left out: the marks with no numbers.
   */
  counts?: SocialCounts | null;
  /** A column of larger marks, for the rail over a full-screen picture or video. */
  vertical?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  /** Left out: no Share mark. */
  onShare?: () => void;
  /** More marks after Share (keep, a menu…). */
  extra?: React.ReactNode;
  /** The colour of the marks at rest. Defaults to the `icon-strong` token; over a picture pass white. */
  color?: string;
  /** A soft shadow under each mark, so it reads over a picture. Defaults to `vertical`. */
  shadow?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Like, comment and share under a post: icons alone, each with its number once there is one, the heart
 * filled in the primary colour when it is yours. The same bar is the vertical rail over a full-screen picture.
 */
export function SocialBar({ counts, vertical = false, onLike, onComment, onShare, extra, color, shadow = vertical, className, style }: SocialBarProps) {
  const theme = useTheme();
  const rest = color ?? theme.colors['icon-strong'];
  const liked = !!counts?.liked;
  const size = vertical ? 28 : 20;
  // on the web a shadow set this way is drawn around the mark's box, so there it is a filter on what is drawn
  const lift: ViewStyle | null = !shadow
    ? null
    : Platform.OS === 'web'
      ? ({ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' } as unknown as ViewStyle)
      : { shadowColor: '#000', shadowOpacity: 0.55, shadowRadius: 6, shadowOffset: { width: 0, height: 1 } };

  // a plain function, not a component made in here: that one would be built again on every draw, and a
  // finger going down on a mark at that moment would be lost
  const mark = (icon: IconName, label: string, onPress: (() => void) | undefined, n = 0, on = false) => {
    const num = formatCount(n);
    const c = on ? theme.colors.primary : rest;
    return (
      <Pressable
        key={label}
        accessibilityRole="button"
        accessibilityLabel={num ? `${label}, ${num}` : label}
        accessibilityState={{ selected: on, disabled: !onPress }}
        disabled={!onPress}
        hitSlop={10}
        onPress={onPress}
        className={cn(vertical ? 'items-center gap-0.5' : 'flex-row items-center gap-1.5 rounded-control px-2.5 py-1.5 hover:bg-overlay/5', Platform.OS === 'web' && onPress && 'cursor-pointer')}
        style={lift}
      >
        <Icon name={icon} size={size} color={c} strokeWidth={1.8} />
        {num ? (
          <Text variant={vertical ? 'caption' : 'label'} weight="semibold" style={{ color: c, fontVariant: ['tabular-nums'] }}>
            {num}
          </Text>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View className={cn(vertical ? 'items-center gap-6' : 'flex-row items-center gap-1', className)} style={style}>
      {counts !== null ? mark(liked ? 'heart-bold' : 'heart', liked ? 'Liked' : 'Like', onLike, counts?.likes, liked) : null}
      {counts !== null ? mark('message', 'Comment', onComment, counts?.comments) : null}
      {onShare ? mark('share', 'Share', onShare) : null}
      {extra}
    </View>
  );
}
