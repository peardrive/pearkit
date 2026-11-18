import React, { useMemo } from 'react';
import { FlatList, Platform, Pressable, View, type FlatListProps, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { commentTree, formatAgo, formatClock, formatCount, type CommentData, type CommentRowData } from '../../utils';
import { Icon } from '../../icons';
import { useTheme } from '../../theme/ThemeProvider';
import { Avatar } from '../Avatar/Avatar';
import { Text } from '../Text/Text';

export interface CommentRowProps<T extends CommentData = CommentData> {
  row: CommentRowData<T>;
  /** Say where each comment was written (`comment.where`): for a thread gathered from several places. */
  showWhere?: boolean;
  /** The words for a comment's time. Defaults to `formatAgo`. */
  formatTime?: (at: number) => string;
  onLike?: (comment: T) => void;
  onReply?: (comment: T) => void;
  /** The comment's own menu (delete, remove…). Left out: no menu mark. */
  onMenu?: (comment: T) => void;
  /** A tap on the moment a comment points at (`comment.seconds`). */
  onSeek?: (seconds: number, comment: T) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** One comment: who, when, the words, a heart with its number, Reply and the menu. An answer is set in. */
export function CommentRow<T extends CommentData = CommentData>({ row, showWhere, formatTime = formatAgo, onLike, onReply, onMenu, onSeek, className, style }: CommentRowProps<T>) {
  const theme = useTheme();
  const { comment: c, depth, replyTo } = row;
  const name = c.name || '?';
  const web = Platform.OS === 'web';
  return (
    <View className={cn('flex-row gap-3 py-2.5', depth ? 'pl-11' : null, className)} style={style}>
      <Avatar seed={c.author || 'x'} size={depth ? 26 : 32} label={c.name || undefined} />
      <View className="min-w-0 flex-1">
        <Text variant="caption" numberOfLines={1}>
          <Text variant="caption" weight="bold" tone="foreground">{name}</Text>
          {showWhere && c.where ? <Text variant="caption" tone="muted"> in {c.where}</Text> : null}
          <Text variant="caption" tone="subtle">{'\u00a0\u00a0'}{formatTime(c.at)}</Text>
        </Text>
        <Text variant="body-sm" selectable>
          {replyTo ? <Text variant="body-sm" weight="semibold" tone="primary-text">{replyTo.name || '?'} </Text> : null}
          {c.seconds != null ? (
            <Text variant="body-sm" weight="semibold" tone="primary-text" onPress={onSeek ? () => onSeek(c.seconds as number, c) : undefined} accessibilityRole={onSeek ? 'link' : undefined}>
              {formatClock(c.seconds)}{' '}
            </Text>
          ) : null}
          {c.text}
        </Text>
        <View className="flex-row items-center gap-5 pt-1">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={c.liked ? 'Take the like back' : 'Like this comment'}
            accessibilityState={{ selected: !!c.liked }}
            hitSlop={10}
            disabled={!onLike}
            onPress={() => onLike?.(c)}
            className={cn('flex-row items-center gap-1', web && onLike && 'cursor-pointer')}
          >
            <Icon name={c.liked ? 'heart-bold' : 'heart'} size={15} color={c.liked ? theme.colors.primary : theme.colors.muted} strokeWidth={1.8} />
            {formatCount(c.likes) ? <Text variant="caption" tone="muted" style={{ fontVariant: ['tabular-nums'] }}>{formatCount(c.likes)}</Text> : null}
          </Pressable>
          {onReply ? (
            <Pressable accessibilityRole="button" accessibilityLabel={`Reply to ${c.name || 'this comment'}`} hitSlop={10} onPress={() => onReply(c)} className={cn(web && 'cursor-pointer')}>
              <Text variant="caption" weight="semibold" tone="muted">Reply</Text>
            </Pressable>
          ) : null}
          {onMenu ? (
            <Pressable accessibilityRole="button" accessibilityLabel="More about this comment" hitSlop={10} onPress={() => onMenu(c)} className={cn(web && 'cursor-pointer')}>
              <Icon name="more" size={15} tone="muted" />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export interface CommentThreadProps<T extends CommentData = CommentData>
  extends Pick<CommentRowProps<T>, 'showWhere' | 'formatTime' | 'onLike' | 'onReply' | 'onMenu' | 'onSeek'> {
  /** The comments, oldest first, as they came: answers are put under their comment here. */
  comments: readonly T[] | null | undefined;
  /** Drawn above the first comment (who liked it, where else it is…). */
  header?: React.ReactElement | null;
  /** What an empty thread says. Pass the words for "still reading" or "could not be read" as they apply. */
  emptyLabel?: string;
  /** Passed to the list (a ref, `onContentSizeChange`, `keyboardShouldPersistTaps`…). */
  listProps?: Partial<Omit<FlatListProps<CommentRowData<T>>, 'data' | 'renderItem' | 'keyExtractor'>>;
  listRef?: React.Ref<FlatList<CommentRowData<T>>>;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The comments of a post or a file: each comment, the answers under it, a heart and Reply on each. It takes
 * the comments and callbacks only; reading them, sending and deleting are the app's.
 */
export function CommentThread<T extends CommentData = CommentData>({ comments, header, emptyLabel = 'No comments yet.', listProps, listRef, className, style, ...row }: CommentThreadProps<T>) {
  const rows = useMemo(() => commentTree(comments), [comments]);
  return (
    <FlatList
      ref={listRef}
      data={rows}
      keyExtractor={(r) => r.comment.id}
      keyboardShouldPersistTaps="handled"
      className={cn('flex-1', className)}
      style={style}
      ListHeaderComponent={header ?? undefined}
      ListEmptyComponent={
        <View className="items-center py-8">
          <Text variant="body-sm" tone="muted">{emptyLabel}</Text>
        </View>
      }
      renderItem={({ item }) => <CommentRow row={item} {...row} />}
      {...listProps}
    />
  );
}
