import React, { useState } from 'react';
import { Platform, Pressable, TextInput, View, type StyleProp, type TextInputProps, type TextStyle, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { useTheme } from '../../theme/ThemeProvider';
import { fontWeightValue } from '../../theme/tokens';
import { Kbd } from '../Kbd/Kbd';

export interface SearchFieldProps extends Omit<TextInputProps, 'style' | 'placeholderTextColor'> {
  /** Shortcut hint on the right, e.g. `⌘F`. Hidden while there is text. */
  shortcut?: string;
  /** Show a clear button when there is text. Default true. */
  clearable?: boolean;
  onClear?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/** Compact search input with leading icon and a shortcut / clear affordance. */
export const SearchField = React.forwardRef<React.ComponentRef<typeof TextInput>, SearchFieldProps>(function SearchField(
  { shortcut, clearable = true, onClear, value, defaultValue, onChangeText, placeholder = 'Search', className, style, inputStyle, onFocus, onBlur, ...rest },
  ref,
) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState(defaultValue ?? '');
  const text = value ?? inner;
  const nativeFamily = theme.fonts.native?.medium;

  const change = (t: string) => {
    if (value === undefined) setInner(t);
    onChangeText?.(t);
  };

  return (
    <View
      className={cn(
        'h-8 flex-row items-center gap-2 rounded-field border bg-overlay/5 px-2.5',
        focused ? 'border-primary/50' : 'border-overlay/[0.06]',
        className,
      )}
      style={style}
    >
      <Icon name="search-normal" size={14} tone="subtle" />
      <TextInput
        ref={ref}
        value={text}
        onChangeText={change}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.subtle}
        accessibilityLabel={rest.accessibilityLabel ?? placeholder}
        onFocus={(e) => { setFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
        className="h-full min-w-0 flex-1 p-0 text-body-sm text-foreground"
        style={[
          Platform.OS === 'web'
            ? ({ fontFamily: theme.fonts.web, fontWeight: fontWeightValue.medium, outlineStyle: 'none' } as unknown as TextStyle)
            : nativeFamily ? { fontFamily: nativeFamily } : { fontWeight: '500' },
          inputStyle,
        ]}
        {...rest}
      />
      {text && clearable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
          onPress={() => { change(''); onClear?.(); }}
          className="h-4 w-4 items-center justify-center rounded-full bg-overlay/10 web:cursor-pointer"
        >
          <Icon name="close" size={10} tone="muted" strokeWidth={2.5} />
        </Pressable>
      ) : shortcut ? (
        <Kbd>{shortcut}</Kbd>
      ) : null}
    </View>
  );
}) as React.ForwardRefExoticComponent<SearchFieldProps & React.RefAttributes<React.ComponentRef<typeof TextInput>>>;
