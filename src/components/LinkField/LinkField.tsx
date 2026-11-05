import React, { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { copyToClipboard } from '../../utils/clipboard';
import { truncateMiddle } from '../../utils/format';
import { Icon } from '../../icons/Icon';
import { Text } from '../Text/Text';

export interface LinkFieldProps {
  /** The full value (copied verbatim). */
  value: string;
  /** What to show. Defaults to a middle-truncated `value`. */
  displayValue?: string;
  /** Called with the value. Without it the web clipboard is used. */
  onCopy?: (value: string) => void | Promise<void>;
  /** ms to show the "copied" tick. Default 1500. */
  feedbackDuration?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Read-only, recessed field showing a link with a copy affordance. Tapping anywhere copies. */
export function LinkField({ value, displayValue, onCopy, feedbackDuration = 1500, className, style }: LinkFieldProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    if (onCopy) await onCopy(value);
    else await copyToClipboard(value);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), feedbackDuration);
  };

  return (
    <Pressable
      onPress={copy}
      accessibilityRole="button"
      accessibilityLabel={`Copy ${value}`}
      accessibilityHint="Copies the link to the clipboard"
      className={cn(
        'h-[34px] w-full flex-row items-center gap-2 rounded-field border border-overlay/[0.08] bg-inset/35 px-2.5 hover:border-overlay/[0.14]',
        Platform.OS === 'web' && 'cursor-pointer',
        className,
      )}
      style={style}
    >
      <Text variant="label" tone="primary-text" numberOfLines={1} className="min-w-0 flex-1">
        {displayValue ?? truncateMiddle(value, 25, 12)}
      </Text>
      <Icon name={copied ? 'tick' : 'copy'} size={14} tone={copied ? 'primary-text' : 'icon-strong'} />
    </Pressable>
  );
}
