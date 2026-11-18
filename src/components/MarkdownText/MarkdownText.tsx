import React, { useMemo } from 'react';
import { Linking, Platform, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import type { ColorToken } from '../../theme/tokens';
import { Text, type TextVariant } from '../Text/Text';
import { parseMarkdown, type Block, type Inline } from './markdown';

export * from './markdown';

export type MarkdownVariant = 'body' | 'body-sm';

export interface MarkdownTextProps {
  text: string;
  /** The size of the running text. Headings, code and lists scale with it. Default `body`. */
  variant?: MarkdownVariant;
  /** A link was pressed. Without it the link opens with `Linking.openURL`. */
  onLinkPress?: (url: string) => void;
  /** The colour of the running text. Default `foreground`. */
  tone?: ColorToken;
  /** Let the words be selected. Default true. */
  selectable?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const MONO = Platform.select({ web: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', ios: 'Menlo', default: 'monospace' });

const scale: Record<MarkdownVariant, { text: TextVariant; line: number; code: TextVariant; codeLine: number; h: [TextVariant, TextVariant, TextVariant] }> = {
  body: { text: 'body', line: 19, code: 'body-sm', codeLine: 18, h: ['title', 'body-lg', 'body'] },
  'body-sm': { text: 'body-sm', line: 18, code: 'label', codeLine: 17, h: ['body-lg', 'body', 'body-sm'] },
};

/**
 * Markdown as nested `Text` and `View`, with no dependency: paragraphs, headings, bold, italic, inline code, fenced
 * code, lists, quotes, links and rules — what a chat message or an agent's answer needs. The reading rules live in
 * `markdown.ts` (`parseMarkdown`, `parseInline`, `plainText`).
 */
export function MarkdownText({ text, variant = 'body', onLinkPress, tone = 'foreground', selectable = true, className, style }: MarkdownTextProps) {
  const blocks = useMemo(() => parseMarkdown(text), [text]);
  const s = scale[variant];
  const open = (href: string) => {
    if (onLinkPress) onLinkPress(href);
    else void Linking.openURL(href).catch(() => {});
  };
  return (
    <View className={cn('gap-2', className)} style={style}>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} s={s} tone={tone} selectable={selectable} open={open} />
      ))}
    </View>
  );
}

type Scale = (typeof scale)[MarkdownVariant];

function BlockView({ block: b, s, tone, selectable, open }: { block: Block; s: Scale; tone: ColorToken; selectable: boolean; open: (href: string) => void }) {
  switch (b.type) {
    case 'paragraph':
      return (
        <Text variant={s.text} tone={tone} selectable={selectable} style={{ lineHeight: s.line }}>
          <Spans nodes={b.children} s={s} tone={tone} open={open} />
        </Text>
      );
    case 'heading': {
      const v = s.h[b.level - 1]!;
      return (
        <Text variant={v} weight={b.level === 1 ? 'bold' : 'semibold'} tone={tone} selectable={selectable} accessibilityRole="header" className={b.level === 1 ? 'pt-1' : undefined}>
          <Spans nodes={b.children} s={s} tone={tone} open={open} />
        </Text>
      );
    }
    case 'code':
      return (
        <View className="rounded-md border border-overlay/[0.06] bg-inset px-3 py-2" accessibilityLabel={b.lang ? `${b.lang} code` : 'code'}>
          <Text variant={s.code} weight="regular" tone={tone} selectable={selectable} style={{ fontFamily: MONO, lineHeight: s.codeLine } as TextStyle}>
            {b.text}
          </Text>
        </View>
      );
    case 'list':
      return (
        <View className="gap-1" accessibilityRole="list">
          {b.items.map((item, i) => (
            <View key={i} className="flex-row gap-2 pl-1">
              <Text variant={s.text} tone={b.ordered ? 'muted' : tone} style={{ lineHeight: s.line, minWidth: b.ordered ? 18 : 10, textAlign: b.ordered ? 'right' : 'center' }}>
                {b.ordered ? `${b.start + i}.` : '•'}
              </Text>
              <Text variant={s.text} tone={tone} selectable={selectable} className="min-w-0 flex-1" style={{ lineHeight: s.line }}>
                <Spans nodes={item} s={s} tone={tone} open={open} />
              </Text>
            </View>
          ))}
        </View>
      );
    case 'quote':
      return (
        <View className="gap-2 border-l-2 border-overlay/20 pl-3">
          {b.children.map((c, i) => (
            <BlockView key={i} block={c} s={s} tone="muted" selectable={selectable} open={open} />
          ))}
        </View>
      );
    case 'hr':
      return <View className="my-1 h-px bg-overlay/10" accessibilityRole="none" />;
  }
}

function Spans({ nodes, s, tone, open, bold, italic }: { nodes: Inline[]; s: Scale; tone: ColorToken; open: (href: string) => void; bold?: boolean; italic?: boolean }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.type) {
          case 'text':
            return <React.Fragment key={i}>{n.text}</React.Fragment>;
          case 'bold':
            return (
              <Text key={i} variant={s.text} weight="bold" tone={tone} style={italic ? { fontStyle: 'italic' } : undefined}>
                <Spans nodes={n.children} s={s} tone={tone} open={open} bold italic={italic} />
              </Text>
            );
          case 'italic':
            return (
              <Text key={i} variant={s.text} weight={bold ? 'bold' : undefined} tone={tone} style={{ fontStyle: 'italic' }}>
                <Spans nodes={n.children} s={s} tone={tone} open={open} bold italic />
              </Text>
            );
          case 'code':
            return (
              <Text key={i} variant={s.code} weight="regular" tone={tone} className="rounded-xs bg-overlay/[0.08] px-1" style={{ fontFamily: MONO } as TextStyle}>
                {n.text}
              </Text>
            );
          case 'link':
            return (
              <Text
                key={i}
                variant={s.text}
                weight={bold ? 'bold' : 'medium'}
                tone="primary-text"
                className="underline"
                accessibilityRole="link"
                onPress={() => open(n.href)}
                style={italic ? { fontStyle: 'italic' } : undefined}
              >
                <Spans nodes={n.children} s={s} tone="primary-text" open={open} bold={bold} italic={italic} />
              </Text>
            );
        }
      })}
    </>
  );
}
