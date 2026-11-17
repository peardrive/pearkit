/**
 * Chat: the message list and the composer, for any app. It holds no messages and talks to no network: the app
 * passes `messages` and gets `onSend`, `onReact`, `onChoose` back. What it shows is decided by `features`.
 *
 * React Native primitives and Pearkit pieces only, so the same file runs in Electron, the browser and on a phone.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Avatar, Button, cn, Icon, IconButton, Text, useTheme } from 'pearkit';
import { EMOJI, QUICK_REACTIONS, type ChatAttachment, type ChatAuthor, type ChatFeatures, type ChatMessage } from './types';

export interface ChatProps {
  messages: ChatMessage[];
  /** Who is typing here. */
  me: ChatAuthor;
  features: ChatFeatures;
  onSend: (text: string, replyTo?: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
  onChoose?: (messageId: string, optionId: string) => void;
  onAttach?: () => void;
  /** A tile on a message was pressed: open the file or the picture. */
  onOpen?: (attachment: ChatAttachment, messageId: string) => void;
  /** Names of the others writing right now. */
  typing?: string[];
  placeholder?: string;
  /** Shown while there are no messages. */
  emptyText?: string;
  starters?: string[];
  /** An answer is on its way: the composer shows a stop button instead of send. */
  busy?: boolean;
  onStop?: () => void;
}

const clock = (at: number) => new Date(at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
const day = (at: number) => {
  const d = new Date(at);
  const today = new Date();
  const diff = Math.round((new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() - new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) / 86400000);
  return diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
};
const sameDay = (a: number, b: number) => new Date(a).toDateString() === new Date(b).toDateString();

export function Chat({ messages, me, features: f, onSend, onReact, onChoose, onAttach, onOpen, typing = [], placeholder = 'Message', emptyText, starters = [], busy, onStop }: ChatProps) {
  const [active, setActive] = useState<string | null>(null); // the message whose actions are open
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const scroller = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const atEnd = useRef(true);
  const byId = useMemo(() => new Map(messages.map((m) => [m.id, m])), [messages]);
  const last = messages[messages.length - 1];

  // Stay at the newest message unless the person scrolled up to read.
  useEffect(() => {
    if (atEnd.current || last?.author.id === me.id) scroller.current?.scrollToEnd({ animated: false });
  }, [last?.id, last?.text, last?.author.id, me.id, typing.length]);

  // Opened on the newest message.
  useEffect(() => {
    const go = () => scroller.current?.scrollToEnd({ animated: false });
    go();
    const t = setTimeout(go, 120);
    return () => clearTimeout(t);
  }, []);

  const pad = f.density === 'compact' ? 10 : 14;
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        ref={scroller}
        className="flex-1"
        contentContainerStyle={{ padding: pad, paddingBottom: 6, flexGrow: 1, justifyContent: 'flex-end' }}
        scrollEventThrottle={50}
        onScroll={(e) => {
          const n = e.nativeEvent;
          atEnd.current = n.contentOffset.y + n.layoutMeasurement.height >= n.contentSize.height - 40;
        }}
        onContentSizeChange={() => atEnd.current && scroller.current?.scrollToEnd({ animated: false })}
        keyboardShouldPersistTaps="handled"
      >
        {!messages.length ? (
          <View className="gap-3">
            {emptyText ? (
              <Text variant="caption" tone="muted" className="px-4 text-center">
                {emptyText}
              </Text>
            ) : null}
            {/* Things to say first, as messages not yet sent: the outline of my own bubble, on my side. */}
            {f.starters && starters.length ? (
              <View className={cn('gap-1.5', f.mineOnRight ? 'items-end' : 'items-start')}>
                {starters.map((s) => (
                  <Pressable key={s} onPress={() => onSend(s)} accessibilityRole="button" className="border border-dashed border-primary/45 px-3 py-1.5 active:bg-primary/[0.14]" style={{ borderRadius: 16, borderBottomRightRadius: f.mineOnRight ? 5 : 16, borderBottomLeftRadius: f.mineOnRight ? 16 : 5 }}>
                    <Text variant="label" tone="primary-text" style={{ fontSize: f.density === 'compact' ? 13 : 14.5 }}>
                      {s}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}
        {messages.map((m, i) => {
          const prev = messages[i - 1];
          const next = messages[i + 1];
          const newDay = !prev || !sameDay(prev.at, m.at);
          const first = !f.grouping || newDay || !prev || prev.author.id !== m.author.id || m.at - prev.at > 5 * 60000 || prev.author.kind === 'system';
          const lastOfGroup = !f.grouping || !next || next.author.id !== m.author.id || next.at - m.at > 5 * 60000 || !sameDay(next.at, m.at);
          return (
            <React.Fragment key={m.id}>
              {f.days && newDay ? (
                <View className="flex-row items-center gap-3 py-2">
                  <View className="h-px flex-1 bg-overlay/[0.08]" />
                  <Text variant="micro" tone="subtle">
                    {day(m.at)}
                  </Text>
                  <View className="h-px flex-1 bg-overlay/[0.08]" />
                </View>
              ) : null}
              <Message
                m={m}
                me={me}
                f={f}
                first={first}
                last={lastOfGroup}
                quoted={m.replyTo ? byId.get(m.replyTo) : undefined}
                active={active === m.id}
                onToggle={() => setActive((a) => (a === m.id ? null : m.id))}
                onReact={onReact ? (e) => { onReact(m.id, e); setActive(null); } : undefined}
                onReply={() => { setReplyTo(m.id); setActive(null); }}
                onChoose={onChoose ? (o) => onChoose(m.id, o) : undefined}
                onOpen={onOpen ? (a) => onOpen(a, m.id) : undefined}
              />
            </React.Fragment>
          );
        })}
        {f.typing && typing.length ? (
          <Text variant="micro" tone="muted" className="px-1 pt-1.5">
            {typing.length === 1 ? `${typing[0]} is writing…` : `${typing.slice(0, -1).join(', ')} and ${typing[typing.length - 1]} are writing…`}
          </Text>
        ) : null}
      </ScrollView>
      <Composer
        f={f}
        placeholder={placeholder}
        replyingTo={replyTo ? byId.get(replyTo) : undefined}
        onCancelReply={() => setReplyTo(null)}
        onSend={(text) => {
          atEnd.current = true;
          onSend(text, replyTo ?? undefined);
          setReplyTo(null);
        }}
        onAttach={onAttach}
        busy={busy}
        onStop={onStop}
      />
    </View>
  );
}

/* ───────── one message ───────── */

function Message({ m, me, f, first, last, quoted, active, onToggle, onReact, onReply, onChoose, onOpen }: {
  m: ChatMessage;
  me: ChatAuthor;
  f: ChatFeatures;
  first: boolean;
  last: boolean;
  quoted?: ChatMessage;
  active: boolean;
  onToggle: () => void;
  onReact?: (emoji: string) => void;
  onReply: () => void;
  onChoose?: (optionId: string) => void;
  onOpen?: (attachment: ChatAttachment) => void;
}) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  if (m.author.kind === 'system')
    return (
      <Text variant="micro" tone="subtle" className="py-1.5 text-center">
        {m.text}
      </Text>
    );
  const mine = m.author.id === me.id;
  const right = mine && f.mineOnRight && f.look === 'bubbles';
  const compact = f.density === 'compact';
  const avatar = compact ? 22 : 28;
  const showName = f.names && first && !right;
  const reactions = Object.entries(m.reactions ?? {}).filter(([, who]) => who.length);
  const hasActions = (f.reactions && !!onReact) || f.replies || f.copy;

  const body = (
    <View className={cn(f.look === 'bubbles' ? 'max-w-[86%]' : 'flex-1', right ? 'items-end' : 'items-start')}>
      {showName || (f.times && first && f.look === 'flat') ? (
        <View className="flex-row items-baseline gap-2 pb-0.5">
          {showName || f.look === 'flat' ? (
            <Text variant="caption" weight="semibold" tone={m.author.kind === 'agent' ? 'primary-text' : 'foreground'}>
              {m.author.name}
            </Text>
          ) : null}
          {f.times && f.look === 'flat' ? (
            <Text variant="micro" tone="subtle">
              {clock(m.at)}
            </Text>
          ) : null}
        </View>
      ) : null}
      <Pressable
        onPress={hasActions ? onToggle : undefined}
        className={cn(
          f.look === 'bubbles' && (compact ? 'px-3 py-1.5' : 'px-3.5 py-2'),
          f.look === 'bubbles' && (mine ? 'bg-primary/[0.16]' : 'bg-pane'),
          f.look === 'bubbles' && 'border border-overlay/[0.06]',
          m.status === 'failed' && 'border-danger/50',
        )}
        style={f.look === 'bubbles' ? { borderRadius: 16, borderBottomRightRadius: right && last ? 5 : 16, borderBottomLeftRadius: !right && last ? 5 : 16 } : undefined}
      >
        {f.replies && quoted ? (
          <View className="mb-1 border-l-2 border-primary/60 pl-2">
            <Text variant="micro" weight="semibold" tone="primary-text">
              {quoted.author.name}
            </Text>
            <Text variant="micro" tone="muted" numberOfLines={2}>
              {quoted.text}
            </Text>
          </View>
        ) : null}
        <Text variant="label" selectable style={{ fontSize: compact ? 13 : 14.5, lineHeight: compact ? 18.5 : 21 }}>
          {m.text}
          {m.streaming ? <Text style={{ color: theme.colors.primary }}> ▍</Text> : null}
        </Text>
        {f.options && m.options?.length && !m.streaming ? (
          <View className="gap-1.5 pb-0.5 pt-2">
            {m.options.map((o, n) => {
              const chosen = m.chosen === o.id;
              return (
                <Pressable
                  key={o.id}
                  disabled={!!m.chosen}
                  onPress={() => onChoose?.(o.id)}
                  className={cn('flex-row items-center gap-2 rounded-control border px-2.5 py-2', chosen ? 'border-primary/70 bg-primary/[0.14]' : 'border-overlay/[0.10] bg-background', m.chosen && !chosen && 'opacity-45')}
                >
                  {o.image ? <Image source={{ uri: o.image }} resizeMode="cover" style={{ width: 56, height: 42, borderRadius: 6 }} /> : null}
                  <Text variant="caption" weight="bold" tone="primary-text">
                    {chosen ? '✓' : n + 1}
                  </Text>
                  <View className="flex-1">
                    <Text variant="caption" weight="semibold" tone="foreground">
                      {o.label}
                    </Text>
                    {o.detail ? (
                      <Text variant="micro" tone="muted">
                        {o.detail}
                      </Text>
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </Pressable>

      {m.attachments?.length && !m.streaming ? (
        <View className={cn('flex-row flex-wrap items-start gap-1.5 pt-1.5', right && 'justify-end')}>
          {m.attachments.map((a) => (
            <Pressable key={a.id} onPress={() => onOpen?.(a)} accessibilityRole="button" accessibilityLabel={`Open ${a.name}`} className="overflow-hidden rounded-control border border-overlay/[0.10] bg-pane active:border-primary/60" style={{ width: a.image ? 132 : undefined, maxWidth: 200 }}>
              {a.image ? <Image source={{ uri: a.image }} resizeMode="cover" style={{ width: 132, height: 84 }} /> : null}
              <View className="flex-row items-center gap-1.5 px-2 py-1.5">
                <Icon name={a.kind === 'image' ? 'image' : 'document'} size={14} color={theme.colors.muted} />
                <View className="shrink">
                  <Text variant="micro" weight="semibold" tone="foreground" numberOfLines={1}>
                    {a.name}
                  </Text>
                  {a.detail ? (
                    <Text variant="micro" tone="muted" numberOfLines={1}>
                      {a.detail}
                    </Text>
                  ) : null}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      ) : null}

      {f.reactions && reactions.length ? (
        <View className={cn('flex-row flex-wrap gap-1 pt-1', right && 'justify-end')}>
          {reactions.map(([emoji, who]) => (
            <Pressable key={emoji} onPress={() => onReact?.(emoji)} className={cn('flex-row items-center gap-1 rounded-full border px-2 py-0.5', who.includes(me.id) ? 'border-primary/60 bg-primary/[0.14]' : 'border-overlay/[0.10] bg-pane')}>
              <Text style={{ fontSize: 12.5 }}>{emoji}</Text>
              <Text variant="micro" tone="muted">
                {who.length}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {active && hasActions ? (
        <View className={cn('mt-1 flex-row flex-wrap items-center gap-1 rounded-full border border-overlay/[0.10] bg-pane px-1.5 py-1', right && 'self-end')}>
          {f.reactions && onReact
            ? QUICK_REACTIONS.map((e) => (
                <Pressable key={e} onPress={() => onReact(e)} className="h-7 w-7 items-center justify-center rounded-full active:bg-overlay/10" accessibilityLabel={`React ${e}`}>
                  <Text style={{ fontSize: 16 }}>{e}</Text>
                </Pressable>
              ))
            : null}
          {f.replies ? <Button size="sm" variant="ghost" label="Reply" onPress={onReply} /> : null}
          {f.copy ? (
            <Button
              size="sm"
              variant="ghost"
              label={copied ? 'Copied' : 'Copy'}
              onPress={() => {
                void globalThis.navigator?.clipboard?.writeText(m.text).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
            />
          ) : null}
        </View>
      ) : null}

      {(f.times && last && f.look === 'bubbles') || (f.receipts && mine && last && m.status) ? (
        <Text variant="micro" tone={m.status === 'failed' ? 'danger' : 'subtle'} className="px-1 pt-0.5">
          {[f.times && f.look === 'bubbles' ? clock(m.at) : null, m.edited ? 'edited' : null, f.receipts && mine ? (m.status === 'sending' ? 'sending…' : m.status === 'failed' ? 'not sent' : m.status === 'sent' ? 'sent' : null) : null].filter(Boolean).join(' · ')}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View className={cn('flex-row gap-2', right ? 'justify-end' : 'justify-start')} style={{ paddingTop: first ? (compact ? 8 : 12) : 2 }}>
      {f.avatars && !right ? <View style={{ width: avatar }}>{first ? <Avatar seed={m.author.id} size={avatar} label={m.author.kind === 'agent' ? '✦' : m.author.name.slice(0, 1)} /> : null}</View> : null}
      {body}
    </View>
  );
}

/* ───────── the composer ───────── */

function Composer({ f, placeholder, replyingTo, onCancelReply, onSend, onAttach, busy, onStop }: {
  f: ChatFeatures;
  placeholder: string;
  replyingTo?: ChatMessage;
  onCancelReply: () => void;
  onSend: (text: string) => void;
  onAttach?: () => void;
  busy?: boolean;
  onStop?: () => void;
}) {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [height, setHeight] = useState(0);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const input = useRef<React.ComponentRef<typeof TextInput>>(null);
  const compact = f.density === 'compact';
  const min = compact ? 34 : 40;
  const send = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
    setHeight(0);
    setEmojiOpen(false);
  };
  return (
    <View className="border-t border-overlay/[0.06] bg-background" style={{ paddingBottom: Platform.OS === 'web' ? ('env(safe-area-inset-bottom)' as unknown as number) : 0 }}>
      {replyingTo ? (
        <View className="flex-row items-center gap-2 px-3 pt-2">
          <View className="flex-1 border-l-2 border-primary/60 pl-2">
            <Text variant="micro" weight="semibold" tone="primary-text">
              Replying to {replyingTo.author.name}
            </Text>
            <Text variant="micro" tone="muted" numberOfLines={1}>
              {replyingTo.text}
            </Text>
          </View>
          <IconButton icon="close" size="xs" accessibilityLabel="Cancel the reply" onPress={onCancelReply} />
        </View>
      ) : null}
      {emojiOpen ? (
        <View className="flex-row flex-wrap px-2 pt-2">
          {EMOJI.map((e) => (
            <Pressable key={e} onPress={() => { setText((t) => t + e); input.current?.focus(); }} className="h-9 w-9 items-center justify-center rounded-control active:bg-overlay/10">
              <Text style={{ fontSize: 19 }}>{e}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      <View className="flex-row items-end gap-1.5" style={{ padding: compact ? 8 : 10 }}>
        {f.attach ? <IconButton icon="add" size={compact ? 'sm' : 'md'} variant="subtle" accessibilityLabel="Attach" onPress={onAttach} /> : null}
        <View className="flex-1 flex-row items-end rounded-[18px] border border-overlay/[0.10] bg-inset" style={{ minHeight: min }}>
          <TextInput
            ref={input}
            value={text}
            onChangeText={setText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.subtle}
            multiline
            onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
            onKeyPress={(e) => {
              const ev = e.nativeEvent as unknown as { key: string; shiftKey?: boolean; isComposing?: boolean };
              // A phone's Return key is a new line: only a real keyboard's Enter sends.
              const touch = Platform.OS !== 'web' || globalThis.matchMedia?.('(pointer: coarse)').matches;
              if (f.enterSends && !touch && ev.key === 'Enter' && !ev.shiftKey && !ev.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            style={[
              { flex: 1, color: theme.colors.foreground, fontFamily: Platform.OS === 'web' ? theme.fonts.web : theme.fonts.native?.medium, fontSize: 16, lineHeight: 21, paddingHorizontal: 13, paddingVertical: (min - 21) / 2 - 1, height: Math.max(min - 2, Math.min(132, height)) },
              Platform.OS === 'web' ? ({ outlineStyle: 'none', resize: 'none' } as object) : null,
            ]}
          />
          {f.emoji ? (
            <Pressable onPress={() => setEmojiOpen((o) => !o)} accessibilityLabel="Emoji" className="items-center justify-center" style={{ width: min - 2, height: min - 2, opacity: emojiOpen ? 1 : 0.6 }}>
              <Text style={{ fontSize: 17 }}>🙂</Text>
            </Pressable>
          ) : null}
        </View>
        {busy && onStop && !text.trim() ? (
          <IconButton icon="stop-circle" size={compact ? 'sm' : 'md'} variant="subtle" accessibilityLabel="Stop" onPress={onStop} />
        ) : (
          <IconButton icon="arrow-up" size={compact ? 'sm' : 'md'} variant="solid" disabled={!text.trim()} accessibilityLabel="Send" onPress={send} />
        )}
      </View>
    </View>
  );
}
