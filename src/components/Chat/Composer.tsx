import React, { useRef, useState, type ReactNode } from 'react';
import { Platform, TextInput, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { fontWeightValue } from '../../theme/tokens';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

const LINE = 21; // one line of the field

export interface ComposerProps {
  value: string;
  onChangeText: (text: string) => void;
  /** Send what is in the field. The field does not empty itself: the app does, once the message went. */
  onSend: () => void;
  /** A message is on its way: Send waits. */
  sending?: boolean;
  placeholder?: string;
  /** Who is being answered: shown above the field, with a mark to stop answering. */
  replyTo?: { name: string; text: string } | null;
  onCancelReply?: () => void;
  /** Shows a paperclip before the field that calls this. */
  onAttach?: () => void;
  /** How many lines the field grows to before it scrolls. Default 6. */
  maxLines?: number;
  disabled?: boolean;
  /** Anything else before the field (after the paperclip). */
  leading?: ReactNode;
  /** Anything else after the field, before Send. */
  trailing?: ReactNode;
  /** Tighter, for a sidebar. */
  compact?: boolean;
  /** Focus the field when it appears. */
  autoFocus?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * Where a message is written: a pill-shaped field that grows with its text, Send at its right, a paperclip at
 * its left, and a banner while answering somebody. On a keyboard, Enter sends and Shift+Enter starts a new line;
 * a phone's Return key is a new line, and the button sends.
 */
export const Composer = React.forwardRef<React.ComponentRef<typeof TextInput>, ComposerProps>(function Composer(
  { value, onChangeText, onSend, sending, placeholder = 'Message', replyTo, onCancelReply, onAttach, maxLines = 6, disabled, leading, trailing, compact, autoFocus, className, style, inputStyle },
  ref,
) {
  const theme = useTheme();
  const [height, setHeight] = useState(LINE);
  const [focused, setFocused] = useState(false);
  const inner = useRef<React.ComponentRef<typeof TextInput>>(null);
  const web = Platform.OS === 'web';
  // A phone's browser zooms the page when a field's text is under 16px; with a mouse the field matches the messages.
  const touch = !web || !!(globalThis as { matchMedia?: (q: string) => { matches: boolean } }).matchMedia?.('(pointer: coarse)').matches;
  const fontSize = touch ? 16 : compact ? 13 : 14.5;
  const min = compact ? 34 : 40;
  const can = !!value.trim() && !sending && !disabled;
  const send = () => { if (can) onSend(); };
  const buttonSize = compact ? 'sm' : 'md';

  return (
    <View className={cn('border-t border-overlay/[0.06] bg-background', className)} style={style}>
      {replyTo ? (
        <View className="flex-row items-center gap-2 px-3 pt-2">
          <View className="flex-1 border-l-2 border-primary/60 pl-2">
            <Text variant="micro" weight="semibold" tone="primary-text">
              Replying to {replyTo.name}
            </Text>
            <Text variant="micro" tone="muted" numberOfLines={1}>
              {replyTo.text}
            </Text>
          </View>
          {onCancelReply ? <IconButton icon="close" size="xs" accessibilityLabel="Cancel the reply" onPress={onCancelReply} /> : null}
        </View>
      ) : null}
      <View className="flex-row items-end gap-1.5" style={{ padding: compact ? 8 : 10 }}>
        {onAttach ? <IconButton icon="paperclip" size={buttonSize} variant="subtle" accessibilityLabel="Attach" onPress={onAttach} disabled={disabled} /> : null}
        {leading}
        <View
          className={cn(
            'flex-1 flex-row items-end rounded-[18px] border bg-inset px-[13px]',
            focused ? 'border-primary/60' : 'border-overlay/[0.10]',
            disabled && 'opacity-50',
          )}
          // The field itself has no padding, so its content height is exactly its lines: the padding is here.
          style={{ minHeight: min, paddingVertical: (min - 2 - LINE) / 2 }}
        >
          {/* The same words, invisible, in the same type and width: their height is the field's height. The field
              cannot be asked (on the web it only ever reports the box it already has), and this shrinks as well as grows. */}
          <Text
            pointerEvents="none"
            accessible={false}
            importantForAccessibility="no-hide-descendants"
            onLayout={(e) => setHeight(Math.max(LINE, Math.min(maxLines * LINE, Math.ceil(e.nativeEvent.layout.height))))}
            className="absolute left-[13px] right-[13px] top-0 opacity-0"
            style={{ fontSize, lineHeight: LINE } as TextStyle}
          >
            {value}
            {'​'}
          </Text>
          <TextInput
            ref={(node) => {
              inner.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.subtle}
            accessibilityLabel={placeholder}
            multiline
            editable={!disabled}
            autoFocus={autoFocus}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyPress={
              web && !touch
                ? (e) => {
                    const k = e.nativeEvent as unknown as { key: string; shiftKey?: boolean; isComposing?: boolean };
                    if (k.key === 'Enter' && !k.shiftKey && !k.isComposing) {
                      (e as unknown as { preventDefault: () => void }).preventDefault();
                      send();
                    }
                  }
                : undefined
            }
            className="min-w-0 flex-1 p-0 text-foreground"
            textAlignVertical="top"
            style={[
              {
                height,
                lineHeight: LINE,
                fontSize,
                fontFamily: web ? theme.fonts.web : theme.fonts.native?.medium,
                fontWeight: web || !theme.fonts.native ? fontWeightValue.medium : undefined,
              } as TextStyle,
              web ? ({ outlineStyle: 'none', resize: 'none' } as unknown as TextStyle) : null,
              inputStyle,
            ]}
          />
        </View>
        {trailing}
        <IconButton
          icon="arrow-up"
          size={buttonSize}
          variant="solid"
          disabled={!can}
          accessibilityLabel={sending ? 'Sending' : 'Send'}
          accessibilityState={{ disabled: !can, busy: !!sending }}
          onPress={send}
        />
      </View>
    </View>
  );
}) as React.ForwardRefExoticComponent<ComposerProps & React.RefAttributes<React.ComponentRef<typeof TextInput>>>;
