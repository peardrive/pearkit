import React, { useState } from 'react';
import { Platform, Pressable, TextInput, View, type StyleProp, type TextInputProps, type TextStyle, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon, renderIcon, type IconSource } from '../../icons/Icon';
import { useTheme } from '../../theme/ThemeProvider';
import { fontWeightValue } from '../../theme/tokens';
import { Text } from '../Text/Text';

export interface TextFieldProps extends Omit<TextInputProps, 'style' | 'placeholderTextColor' | 'editable'> {
  /** Label above the field. */
  label?: string;
  /** Helper text under the field (replaced by `error` when set). */
  hint?: string;
  /** Error message — paints the field red and is announced to screen readers. */
  error?: string;
  /** Leading icon. */
  icon?: IconSource;
  /** Anything on the right (a button, a unit, a Kbd…). */
  trailing?: React.ReactNode;
  /** Adds a show / hide toggle and masks the value. */
  password?: boolean;
  /** `md` 36px (forms) or `sm` 32px (toolbars). */
  size?: 'sm' | 'md';
  /** Monospace value — for keys, links and hashes. */
  mono?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/** Labelled text input with hint / error, icons and an optional password toggle. */
export const TextField = React.forwardRef<React.ComponentRef<typeof TextInput>, TextFieldProps>(function TextField(
  { label, hint, error, icon, trailing, password, size = 'md', mono, disabled, className, style, inputStyle, onFocus, onBlur, secureTextEntry, ...rest },
  ref,
) {
  const theme = useTheme();
  const multiline = !!rest.multiline;
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const family = mono
    ? Platform.select({ web: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', ios: 'Menlo', default: 'monospace' })
    : Platform.OS === 'web'
      ? theme.fonts.web
      : theme.fonts.native?.medium;

  return (
    <View className={cn('w-full gap-1.5', className)} style={style}>
      {label ? (
        <Text variant="label" weight="semibold" tone="muted">
          {label}
        </Text>
      ) : null}
      <View
        className={cn(
          'flex-row gap-2 rounded-field border bg-overlay/5 px-3',
          multiline ? 'min-h-[76px] items-start py-2' : size === 'md' ? 'h-9 items-center' : 'h-8 items-center',
          error ? 'border-danger/70' : focused ? 'border-primary/60' : 'border-overlay/[0.08]',
          disabled && 'opacity-50',
        )}
      >
        {renderIcon(icon, { size: 15, tone: 'subtle' })}
        <TextInput
          ref={ref}
          editable={!disabled}
          secureTextEntry={(password && !revealed) || secureTextEntry}
          placeholderTextColor={theme.colors.subtle}
          accessibilityLabel={rest.accessibilityLabel ?? label}
          accessibilityHint={error ?? hint}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          className={cn('min-w-0 flex-1 p-0 text-body text-foreground', multiline ? 'min-h-[58px]' : 'h-full')}
          textAlignVertical={multiline ? 'top' : undefined}
          style={[
            { fontFamily: family, fontWeight: Platform.OS === 'web' || !theme.fonts.native ? fontWeightValue.medium : undefined } as TextStyle,
            Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null,
            inputStyle,
          ]}
          {...rest}
        />
        {password ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={revealed ? 'Hide password' : 'Show password'}
            hitSlop={8}
            onPress={() => setRevealed((r) => !r)}
            className={cn('rounded-xs px-1 py-0.5 hover:bg-overlay/5', Platform.OS === 'web' && 'cursor-pointer')}
          >
            <Text variant="micro" weight="semibold" tone="muted">
              {revealed ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        ) : null}
        {trailing}
      </View>
      {error ? (
        <View className="flex-row items-center gap-1.5" accessibilityLiveRegion="polite">
          <Icon name="info-circle" size={12} tone="danger" />
          <Text variant="caption" tone="danger">{error}</Text>
        </View>
      ) : hint ? (
        <Text variant="caption" tone="subtle">{hint}</Text>
      ) : null}
    </View>
  );
}) as React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<React.ComponentRef<typeof TextInput>>>;
