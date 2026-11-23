import React, { useRef, useState } from 'react';
import { Image, Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { copyToClipboard } from '../../utils/clipboard';
import { formatBytes } from '../../utils/format';
import { Icon } from '../../icons/Icon';
import { statusToken } from '../../theme/tones';
import { Avatar } from '../Avatar/Avatar';
import { EmojiBar } from '../EmojiPicker/EmojiPicker';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';
import { SelectionReply } from './SelectionReply';
import { MarkdownText } from '../MarkdownText/MarkdownText';
import { fileKindFromName, fileKindMeta, type FileKind } from '../Thumbnail/Thumbnail';
import { AgentMark } from './AgentMark';
import { messageTime } from './chatLogic';
import { QUICK_REACTIONS, type ChatAttachment, type ChatAuthor, type ChatMessage } from './types';

export type ChatLook = 'bubbles' | 'flat';

export interface MessageRowProps {
  message: ChatMessage;
  /** Written by the person using the app: tinted with the primary, and on the right in `bubbles`. */
  mine?: boolean;
  /** Starts a group of messages from one author: shows the name and the avatar. Default true. */
  first?: boolean;
  /** Ends the group: gets the time and the pointed corner. Default true. */
  last?: boolean;
  /** The messages this one answers, to quote above the text. */
  quoted?: ChatMessage[];
  /** Bubbles (mine on the right), or flat rows like a document. Default `bubbles`. */
  look?: ChatLook;
  /** Tighter spacing and smaller type, for a sidebar. */
  compact?: boolean;
  /** The time under the last message of a group. Default true. */
  showTime?: boolean;
  /** Offered on the action strip and on the reaction pills. Without it there are no reactions to press. */
  onReact?: (id: string, emoji: string) => void;
  /** Offered on the action strip. */
  onReply?: (id: string) => void;
  /** A tile under the message was pressed. */
  onOpenAttachment?: (attachment: ChatAttachment, message: ChatMessage) => void;
  /**
   * Told after Copy, with the text and whether it reached the clipboard (a toast, say). The copy itself is always
   * `copyToClipboard`: an app with its own clipboard registers it once with `setClipboardWriter`.
   */
  onCopy?: (text: string, ok: boolean) => void;
  /** A link in the text was pressed. Without it the link opens with `Linking.openURL`. */
  onLinkPress?: (url: string) => void;
  /** The emoji on the action row, the person's most-used six as a rule. Default `QUICK_REACTIONS`. */
  quickReactions?: string[];
  /** The + on the action row: open the full emoji list for this message. */
  onMore?: (message: ChatMessage) => void;
  /** Words were selected inside the message and "Reply to this" pressed (web): answer quoting only those words. */
  onReplyToSelection?: (message: ChatMessage, text: string) => void;
  /** The author's avatar or name was pressed: open their profile (a bot's settings, a person's devices). */
  onAuthorPress?: (author: ChatAuthor) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const KINDS: readonly FileKind[] = ['folder', 'video', 'image', 'audio', 'document', 'file'];
const kindOf = (a: ChatAttachment): FileKind =>
  a.kind && (KINDS as readonly string[]).includes(a.kind) ? (a.kind as FileKind) : fileKindFromName(a.name);

/**
 * One message: the author's avatar (or the agent's mark) and name on the first of a group, the text in a bubble
 * or a flat row, what it quotes, its attachments as tiles, its reactions as pills, and the time under the last of
 * a group. A press on the text opens a strip of quick reactions, Reply and Copy.
 */
export function MessageRow({
  message: m,
  mine,
  first = true,
  last = true,
  quoted = [],
  look = 'bubbles',
  compact,
  showTime = true,
  onReact,
  onReply,
  onOpenAttachment,
  onCopy,
  onLinkPress,
  quickReactions = QUICK_REACTIONS,
  onMore,
  onReplyToSelection,
  onAuthorPress,
  className,
  style,
}: MessageRowProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const body = useRef<React.ComponentRef<typeof View>>(null);
  const web = Platform.OS === 'web';

  if (m.system) {
    return (
      <View className={cn('py-1.5', className)} style={style} accessibilityRole="text">
        <Text variant="micro" tone="subtle" className="text-center">
          {m.text}
        </Text>
      </View>
    );
  }

  const bubbles = look === 'bubbles';
  const right = !!mine && bubbles;
  const avatar = compact ? 22 : 28;
  const hasActions = !!onReact || !!onReply || !!onMore || !m.redacted;
  const reactions = (m.reactions ?? []).filter((r) => r.count > 0);
  const text = m.redacted && !m.text ? 'Message removed' : m.text;

  const copy = async () => {
    const ok = await copyToClipboard(m.text);
    onCopy?.(m.text, ok);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const content = (
    <View ref={body} className={cn(bubbles ? 'max-w-[86%]' : 'min-w-0 flex-1', right ? 'items-end' : 'items-start')}>
      {onReplyToSelection && !m.redacted ? <SelectionReply containerRef={body} onReply={(text) => onReplyToSelection(m, text)} /> : null}
      {first && !right ? (
        <View className="flex-row items-baseline gap-2 pb-0.5">
          <Pressable onPress={onAuthorPress ? () => onAuthorPress(m.author) : undefined} disabled={!onAuthorPress} accessibilityRole={onAuthorPress ? 'button' : undefined} accessibilityLabel={onAuthorPress ? `${m.author.name}'s profile` : undefined}>
            <Text variant="caption" weight="semibold" tone={m.author.agent ? 'primary-text' : 'foreground'}>
              {m.author.name}
            </Text>
          </Pressable>
          {!bubbles && showTime ? (
            <Text variant="micro" tone="subtle">
              {messageTime(m.ts)}
            </Text>
          ) : null}
        </View>
      ) : null}

      <Pressable
        onPress={hasActions ? () => setOpen((o) => !o) : undefined}
        accessibilityRole={hasActions ? 'button' : undefined}
        accessibilityLabel={hasActions ? `${m.author.name}: ${text}. Actions` : undefined}
        accessibilityState={{ expanded: open }}
        className={cn(
          bubbles && (compact ? 'px-3 py-1.5' : 'px-3.5 py-[7px]'),
          // Like Messages: mine in the brand tint, everyone else on a quiet overlay; no edges.
          bubbles && (mine ? 'bg-primary/[0.28]' : 'bg-overlay/[0.06]'),
          web && hasActions && 'cursor-default',
        )}
        style={
          bubbles
            ? { borderRadius: 17, borderBottomRightRadius: right && last ? 5 : 17, borderBottomLeftRadius: !right && last ? 5 : 17 }
            : undefined
        }
      >
        {quoted.map((q) => (
          <View key={q.id} className="mb-1 border-l-2 border-primary/60 pl-2">
            <Text variant="micro" weight="semibold" tone="primary-text">
              {q.author.name}
            </Text>
            <Text variant="micro" tone="muted" numberOfLines={2}>
              {q.redacted ? 'Message removed' : q.text}
            </Text>
          </View>
        ))}
        {m.redacted ? (
          <Text variant={compact ? 'body-sm' : 'body'} tone="subtle" selectable className="line-through" style={{ lineHeight: compact ? 18 : 19 }}>
            {text}
          </Text>
        ) : (
          // The words as Markdown: bold, code, lists, a fenced block, links. A pending row is lighter as a whole.
          <MarkdownText text={m.text} variant={compact ? 'body-sm' : 'body'} tone="foreground" selectable onLinkPress={onLinkPress} />
        )}
      </Pressable>

      {m.attachments?.length ? (
        <View className={cn('flex-row flex-wrap items-start gap-1.5 pt-1.5', right && 'justify-end')}>
          {m.attachments.map((a, i) => {
            const kind = kindOf(a);
            const meta = fileKindMeta[kind];
            const picture = kind === 'image' && a.url;
            return (
              <Pressable
                key={`${a.name}-${i}`}
                onPress={onOpenAttachment ? () => onOpenAttachment(a, m) : undefined}
                disabled={!onOpenAttachment}
                accessibilityRole="button"
                accessibilityLabel={`Open ${a.name}`}
                className={cn(
                  'overflow-hidden rounded-control border border-overlay/[0.10] bg-pane active:border-primary/60',
                  web && onOpenAttachment && 'cursor-pointer hover:border-overlay/[0.18]',
                )}
                style={{ width: picture ? 132 : undefined, maxWidth: 220 }}
              >
                {picture ? <Image source={{ uri: a.url }} resizeMode="cover" style={{ width: 132, height: 84 }} accessibilityIgnoresInvertColors /> : null}
                <View className="flex-row items-center gap-1.5 px-2 py-1.5">
                  <Icon name={meta.icon} size={14} tone={statusToken[meta.tone]} />
                  <View className="shrink">
                    <Text variant="micro" weight="semibold" tone="foreground" numberOfLines={1}>
                      {a.name}
                    </Text>
                    {a.size != null ? (
                      <Text variant="micro" tone="muted" numberOfLines={1}>
                        {formatBytes(a.size)}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {reactions.length ? (
        <View className={cn('flex-row flex-wrap gap-1 pt-1', right && 'justify-end')}>
          {reactions.map((r) => (
            <Pressable
              key={r.emoji}
              onPress={onReact ? () => onReact(m.id, r.emoji) : undefined}
              disabled={!onReact}
              accessibilityRole="button"
              accessibilityLabel={`${r.emoji} ${r.count}${r.mine ? ', yours' : ''}`}
              accessibilityState={{ selected: !!r.mine }}
              className={cn(
                'flex-row items-center gap-1 rounded-full border px-2 py-0.5',
                r.mine ? 'border-primary/60 bg-primary/[0.14]' : 'border-overlay/[0.10] bg-pane',
                web && onReact && 'cursor-pointer',
              )}
            >
              <Text style={{ fontSize: 12.5 }}>{r.emoji}</Text>
              <Text variant="micro" tone="muted">
                {r.count}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {open && hasActions ? (
        // Icons only: the quick emoji and a + for the rest, then reply and copy.
        <View className={cn('mt-1 flex-row flex-wrap items-center gap-1', right && 'justify-end')} accessibilityRole="toolbar">
          {onReact || onMore ? (
            <EmojiBar
              size="sm"
              emojis={onReact ? quickReactions : []}
              onPick={(e) => { onReact?.(m.id, e); setOpen(false); }}
              onMore={onMore ? () => { onMore(m); setOpen(false); } : undefined}
            />
          ) : null}
          {onReply || !m.redacted ? (
            <View className="flex-row items-center gap-0.5 rounded-full border border-overlay/[0.10] bg-pane px-1 py-0.5">
              {onReply ? <IconButton icon="reply" size="xs" tooltip="Reply" onPress={() => { onReply(m.id); setOpen(false); }} className="rounded-full" /> : null}
              {!m.redacted ? <IconButton icon={copied ? 'tick' : 'copy'} size="xs" tooltip={copied ? 'Copied' : 'Copy'} onPress={copy} className="rounded-full" /> : null}
            </View>
          ) : null}
        </View>
      ) : null}

      {(bubbles && showTime && last) || m.pending ? (
        <Text variant="micro" tone="subtle" className="px-1 pt-0.5">
          {[bubbles && showTime ? messageTime(m.ts) : null, m.pending ? 'sending…' : null].filter(Boolean).join(' · ')}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View
      className={cn('flex-row gap-2', right ? 'justify-end' : 'justify-start', m.pending && 'opacity-60', className)}
      // 2 px between the bubbles of a group, 10 px between groups (8 when compact).
      style={[{ paddingTop: first ? (compact ? 8 : 10) : 2 }, style]}
    >
      {!right ? (
        <View style={{ width: avatar }}>
          {first ? (
            // the picture opens the profile: a bot's settings, a person's devices
            <Pressable
              onPress={onAuthorPress ? () => onAuthorPress(m.author) : undefined}
              disabled={!onAuthorPress}
              hitSlop={6}
              accessibilityRole={onAuthorPress ? 'button' : undefined}
              accessibilityLabel={onAuthorPress ? `Open ${m.author.name}'s profile` : m.author.name}
            >
              {m.author.agent ? <AgentMark size={avatar} /> : <Avatar seed={m.author.id} size={avatar} label={m.author.name.slice(0, 1)} accessibilityLabel={m.author.name} />}
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {content}
    </View>
  );
}
