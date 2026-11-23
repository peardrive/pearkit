import React, { useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react';
import { ActivityIndicator, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../Text/Text';
import { anchoredScrollY, dayLabel, placeOf, quotedMessages } from './chatLogic';
import { MessageRow, type ChatLook } from './MessageRow';
import type { ChatAttachment, ChatAuthor, ChatMessage } from './types';

/** How close to the top (px) counts as reaching it. */
export const REACH_TOP_PX = 80;

export interface MessageListProps {
  messages: ChatMessage[];
  /** Whose messages are "mine": tinted, and on the right in `bubbles`. */
  currentUserId?: string;
  onReact?: (id: string, emoji: string) => void;
  onReply?: (id: string) => void;
  onOpenAttachment?: (attachment: ChatAttachment, message: ChatMessage) => void;
  /** Draw a message yourself (a card for an agent's ask, say); return null or undefined and `MessageRow` draws it as usual. */
  renderMessage?: (message: ChatMessage) => ReactNode;
  /** Shown while there are no messages, filling the pane. */
  emptyState?: ReactNode;
  /** Bubbles (mine on the right), or flat rows like a document. Default `bubbles`. */
  look?: ChatLook;
  /** Tighter spacing and smaller type, for a sidebar. */
  compact?: boolean;
  /** A line between days. Default true. */
  showDays?: boolean;
  /** The time under the last message of a group. Default true. */
  showTimes?: boolean;
  /** Told after a message's text was copied, with the text and whether it reached the clipboard. See `setClipboardWriter`. */
  onCopy?: (text: string, ok: boolean) => void;
  /** A link in a message was pressed. Without it the link opens with `Linking.openURL`. */
  onLinkPress?: (url: string) => void;
  /** The emoji on each message's action row, the person's most-used six as a rule. Default `QUICK_REACTIONS`. */
  quickReactions?: string[];
  /** The + on a message's action row: open the full emoji list for it. */
  onMore?: (message: ChatMessage) => void;
  /** Words were selected inside a message and "Reply to this" pressed (web): answer quoting only those words. */
  onReplyToSelection?: (message: ChatMessage, text: string) => void;
  /** An author's avatar or name was pressed: open their profile. */
  onAuthorPress?: (author: ChatAuthor) => void;
  /** Above the first message, inside the scroll (the start of the conversation, a "load more" button). */
  header?: ReactNode;
  /**
   * The person scrolled within 80 px of the top: fetch older messages. Called once; it is called again only after
   * the content has grown, so a page put in front does not ask for the next one by itself.
   */
  onReachTop?: () => void;
  /** Older messages are on their way: a spinner line above the first message. */
  loadingOlder?: boolean;
  /** Under the messages, inside the scroll (a typing line, say). */
  footer?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The messages of a conversation, newest at the bottom. Messages from one author within five minutes share one
 * name and avatar; a line marks each new day. It stays at the newest message as new ones arrive, unless the
 * person scrolled up to read; and when older messages are put in front, the view stays where it was.
 */
export function MessageList({
  messages,
  currentUserId,
  onReact,
  onReply,
  onOpenAttachment,
  renderMessage,
  emptyState,
  look = 'bubbles',
  compact,
  showDays = true,
  showTimes = true,
  onCopy,
  onLinkPress,
  quickReactions,
  onMore,
  onReplyToSelection,
  onAuthorPress,
  header,
  onReachTop,
  loadingOlder,
  footer,
  className,
  style,
}: MessageListProps) {
  const theme = useTheme();
  const scroller = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const atEnd = useRef(true);
  const scrollY = useRef(0);
  const contentHeight = useRef(0);
  /** The box's own height, to keep the bottom edge anchored when it changes (the keyboard, a resized pane). */
  const boxHeight = useRef(0);
  const reachedTop = useRef(false);
  /** Where we were before older messages were put in front, to go back there once the new height is known. */
  const prepended = useRef<{ y: number; height: number } | null>(null);
  const firstId = useRef(messages[0]?.id);
  /** The loading line appearing grows the content too; that growth must not re-arm `onReachTop`. */
  const wasLoading = useRef(!!loadingOlder);
  const growthIsLoadingLine = useRef(false);
  const byId = useMemo(() => new Map(messages.map((m) => [m.id, m])), [messages]);
  const last = messages[messages.length - 1];
  const lastMine = !!last && !!currentUserId && last.author.id === currentUserId;

  // Older messages put in front: the first message changed, and the old first one is still in the list.
  useLayoutEffect(() => {
    const first = messages[0]?.id;
    const was = firstId.current;
    if (first !== was && was !== undefined && messages.some((m) => m.id === was)) {
      prepended.current = { y: scrollY.current, height: contentHeight.current };
    }
    firstId.current = first;
  }, [messages]);

  // The loading line coming or going must not move what the person is reading, unless they are at the very top,
  // where they should see it.
  useLayoutEffect(() => {
    const loading = !!loadingOlder;
    if (loading !== wasLoading.current) {
      if (loading) growthIsLoadingLine.current = true;
      if (scrollY.current > 0 && !prepended.current) prepended.current = { y: scrollY.current, height: contentHeight.current };
    }
    wasLoading.current = loading;
  }, [loadingOlder]);

  // Stay at the newest message unless the person scrolled up to read; my own always show.
  useEffect(() => {
    if (atEnd.current || lastMine) scroller.current?.scrollToEnd({ animated: false });
  }, [last?.id, last?.text, lastMine]);

  // Opened on the newest message.
  useEffect(() => {
    const go = () => scroller.current?.scrollToEnd({ animated: false });
    go();
    const t = setTimeout(go, 120);
    return () => clearTimeout(t);
  }, []);

  if (!messages.length && emptyState) {
    return (
      <View className={cn('flex-1 items-center justify-center p-6', className)} style={style}>
        {emptyState}
      </View>
    );
  }

  const pad = compact ? 10 : 14;
  return (
    <ScrollView
      ref={scroller}
      className={cn('flex-1', className)}
      style={style}
      contentContainerStyle={{ padding: pad, paddingBottom: 4, flexGrow: 1, justifyContent: 'flex-end' }}
      accessibilityLabel="Messages"
      scrollEventThrottle={50}
      onLayout={(e) => {
        // The box changed height (the keyboard came up or went away, a pane was resized): the whole conversation
        // slides as one piece so what sat against the bottom edge stays there; nobody loses their place.
        const h = e.nativeEvent.layout.height;
        const was = boxHeight.current;
        boxHeight.current = h;
        if (!was || was === h) return;
        const y = anchoredScrollY(scrollY.current, was, h, contentHeight.current);
        scrollY.current = y;
        scroller.current?.scrollTo({ y, animated: false });
      }}
      onScroll={(e) => {
        const n = e.nativeEvent;
        scrollY.current = n.contentOffset.y;
        atEnd.current = n.contentOffset.y + n.layoutMeasurement.height >= n.contentSize.height - 40;
        if (onReachTop && n.contentOffset.y <= REACH_TOP_PX && !reachedTop.current) {
          reachedTop.current = true;
          onReachTop();
        }
      }}
      onContentSizeChange={(_w, h) => {
        const grew = h > contentHeight.current;
        if (prepended.current) {
          const { y, height } = prepended.current;
          prepended.current = null;
          scroller.current?.scrollTo({ y: y + (h - height), animated: false });
        } else if (atEnd.current) {
          scroller.current?.scrollToEnd({ animated: false });
        }
        if (grew && !growthIsLoadingLine.current) reachedTop.current = false;
        growthIsLoadingLine.current = false;
        contentHeight.current = h;
      }}
      keyboardShouldPersistTaps="handled"
    >
      {loadingOlder ? (
        <View className="flex-row items-center justify-center gap-2 py-2" accessibilityLiveRegion="polite" accessibilityLabel="Loading older messages">
          <ActivityIndicator size="small" color={theme.colors.muted} />
          <Text variant="micro" tone="muted">
            Loading older messages…
          </Text>
        </View>
      ) : null}
      {header}
      {messages.map((m, i) => {
        const { first, last: lastOfGroup, newDay } = placeOf(messages, i);
        const custom = renderMessage?.(m); // null or undefined: the app leaves this one to MessageRow
        return (
          <React.Fragment key={m.id}>
            {showDays && newDay ? (
              <View className="flex-row items-center gap-3 py-2" accessibilityRole="text">
                <View className="h-px flex-1 bg-overlay/[0.08]" />
                <Text variant="micro" tone="subtle">
                  {dayLabel(m.ts)}
                </Text>
                <View className="h-px flex-1 bg-overlay/[0.08]" />
              </View>
            ) : null}
            {custom != null ? (
              custom
            ) : (
              <MessageRow
                message={m}
                mine={!!currentUserId && m.author.id === currentUserId}
                first={first}
                last={lastOfGroup}
                quoted={quotedMessages(m, byId)}
                look={look}
                compact={compact}
                showTime={showTimes}
                onReact={onReact}
                onReply={onReply}
                onOpenAttachment={onOpenAttachment}
                onCopy={onCopy}
                onLinkPress={onLinkPress}
                quickReactions={quickReactions}
                onMore={onMore}
                onReplyToSelection={onReplyToSelection}
                onAuthorPress={onAuthorPress}
              />
            )}
          </React.Fragment>
        );
      })}
      {footer}
    </ScrollView>
  );
}
