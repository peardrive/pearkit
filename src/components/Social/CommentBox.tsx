import React, { useState } from 'react';
import { Platform, Pressable, TextInput, View, type StyleProp, type TextInputProps, type TextStyle, type ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';
import { Icon } from '@/icons';
import { useTheme } from '@/theme/ThemeProvider';
import { fontWeightValue } from '@/theme/tokens';
import { Text } from '@/components/Text/Text';

const LINE = 20; // one line of the box
const PAD = 16;  // its padding, top and bottom together

export interface CommentBoxProps extends Omit<TextInputProps, 'style' | 'value' | 'onChangeText' | 'multiline' | 'editable' | 'placeholderTextColor'> {
  value: string;
  onChangeText: (text: string) => void;
  /** Send what is in the box. The box does not empty itself: the app does, once the comment went. */
  onSend: () => void;
  /** A comment is on its way: Send waits. */
  sending?: boolean;
  /** Who is being answered: shown above the box, with a mark to stop answering. */
  replyTo?: { name?: string | null; where?: string | null } | null;
  onCancelReply?: () => void;
  /** Why the comment did not go. The words stay in the box. */
  error?: string;
  /** A quiet line in the same place (what a menu action just did). */
  note?: string;
  /** How many lines the box grows to before it scrolls. */
  maxLines?: number;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * The box a comment is written in: one line that grows with its text, Send at its right, and a banner while
 * answering somebody. On a keyboard, Enter sends and Shift+Enter starts a new line.
 */
export const CommentBox = React.forwardRef<React.ComponentRef<typeof TextInput>, CommentBoxProps>(function CommentBox(
  { value, onChangeText, onSend, sending, replyTo, onCancelReply, error, note, maxLines = 5, disabled, className, style, inputStyle, placeholder, onFocus, onBlur, ...rest },
  ref,
) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(LINE);
  const can = !!value.trim() && !sending && !disabled;
  const web = Platform.OS === 'web';
  const send = () => { if (can) onSend(); };
  return (
    <View className={cn('w-full gap-1.5', className)} style={style}>
      {replyTo ? (
        <View className="flex-row items-center gap-2">
          <Text variant="caption" tone="muted" numberOfLines={1} className="flex-1">
            Replying to <Text variant="caption" weight="bold" tone="foreground">{replyTo.name || '?'}</Text>
            {replyTo.where ? ` in ${replyTo.where}` : ''}
          </Text>
          {onCancelReply ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Cancel the reply" hitSlop={10} onPress={onCancelReply} className={cn(web && 'cursor-pointer')}>
              <Icon name="close" size={14} tone="muted" />
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {error ? (
        <View accessibilityLiveRegion="polite">
          <Text variant="caption" tone="danger">{error}</Text>
        </View>
      ) : note ? (
        <Text variant="caption" tone="muted">{note}</Text>
      ) : null}
      <View
        className={cn(
          'flex-row items-end gap-2 rounded-field border bg-overlay/5 px-3 py-2',
          error ? 'border-danger/70' : focused ? 'border-primary/60' : 'border-overlay/[0.08]',
          disabled && 'opacity-50',
        )}
      >
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          multiline
          editable={!disabled}
          placeholder={placeholder ?? (replyTo ? 'Write a reply…' : 'Write a comment…')}
          placeholderTextColor={theme.colors.subtle}
          accessibilityLabel={rest.accessibilityLabel ?? (replyTo ? 'Write a reply' : 'Write a comment')}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          onContentSizeChange={(e) => setHeight(Math.max(LINE, Math.min(maxLines * LINE, Math.ceil(e.nativeEvent.contentSize.height))))}
          onKeyPress={web ? (e) => {
            const k = e.nativeEvent as unknown as { key: string; shiftKey?: boolean; isComposing?: boolean };
            if (k.key === 'Enter' && !k.shiftKey && !k.isComposing) { (e as unknown as { preventDefault: () => void }).preventDefault(); send(); }
          } : undefined}
          className="min-w-0 flex-1 p-0 text-body text-foreground"
          textAlignVertical="top"
          style={[
            { height, lineHeight: LINE, maxHeight: maxLines * LINE + PAD, fontFamily: web ? theme.fonts.web : theme.fonts.native?.medium, fontWeight: web || !theme.fonts.native ? fontWeightValue.medium : undefined } as TextStyle,
            web ? ({ outlineStyle: 'none', resize: 'none' } as unknown as TextStyle) : null,
            inputStyle,
          ]}
          {...rest}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send the comment"
          accessibilityState={{ disabled: !can, busy: !!sending }}
          disabled={!can}
          hitSlop={10}
          onPress={send}
          className={cn(web && can && 'cursor-pointer')}
          style={{ height: LINE, justifyContent: 'center' }}
        >
          <Text variant="label" weight="bold" tone={can ? 'primary-text' : 'subtle'}>{sending ? 'Sending…' : 'Send'}</Text>
        </Pressable>
      </View>
    </View>
  );
}) as React.ForwardRefExoticComponent<CommentBoxProps & React.RefAttributes<React.ComponentRef<typeof TextInput>>>;
