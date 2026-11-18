import React, { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';
import { dayLabel, placeOf, quotedMessages } from './chatLogic';
import { MessageRow, type ChatLook } from './MessageRow';
import type { ChatAttachment, ChatMessage } from './types';

export interface MessageListProps {
  messages: ChatMessage[];
  /** Whose messages are "mine": tinted, and on the right in `bubbles`. */
  currentUserId?: string;
  onReact?: (id: string, emoji: string) => void;
  onReply?: (id: string) => void;
  onOpenAttachment?: (attachment: ChatAttachment, message: ChatMessage) => void;
  /** Draw a message yourself; `MessageRow` draws the rest. */
  renderMessage?: (message: ChatMessage) => ReactNode;
  /** Shown while there are no messages. */
  emptyState?: ReactNode;
  /** Bubbles (mine on the right), or flat rows like a document. Default `bubbles`. */
  look?: ChatLook;
  /** Tighter spacing and smaller type, for a sidebar. */
  compact?: boolean;
  /** A line between days. Default true. */
  showDays?: boolean;
  /** The time under the last message of a group. Default true. */
  showTimes?: boolean;
  /** Copy a message's text yourself (React Native has no clipboard of its own). */
  onCopy?: (text: string) => void;
  /** Under the messages, inside the scroll (a typing line, say). */
  footer?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The messages of a conversation, newest at the bottom. Messages from one author within five minutes share one
 * name and avatar; a line marks each new day. It stays at the newest message as new ones arrive, unless the
 * person scrolled up to read.
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
  footer,
  className,
  style,
}: MessageListProps) {
  const scroller = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const atEnd = useRef(true);
  const byId = useMemo(() => new Map(messages.map((m) => [m.id, m])), [messages]);
  const last = messages[messages.length - 1];
  const lastMine = !!last && !!currentUserId && last.author.id === currentUserId;

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

  const pad = compact ? 10 : 14;
  return (
    <ScrollView
      ref={scroller}
      className={cn('flex-1', className)}
      style={style}
      contentContainerStyle={{ padding: pad, paddingBottom: 6, flexGrow: 1, justifyContent: 'flex-end' }}
      scrollEventThrottle={50}
      onScroll={(e) => {
        const n = e.nativeEvent;
        atEnd.current = n.contentOffset.y + n.layoutMeasurement.height >= n.contentSize.height - 40;
      }}
      onContentSizeChange={() => atEnd.current && scroller.current?.scrollToEnd({ animated: false })}
      keyboardShouldPersistTaps="handled"
    >
      {!messages.length && emptyState ? <View className="flex-1 items-center justify-center">{emptyState}</View> : null}
      {messages.map((m, i) => {
        const { first, last: lastOfGroup, newDay } = placeOf(messages, i);
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
            {renderMessage ? (
              renderMessage(m)
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
              />
            )}
          </React.Fragment>
        );
      })}
      {footer}
    </ScrollView>
  );
}
