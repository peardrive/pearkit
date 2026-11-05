import React from 'react';
import { ActivityIndicator, Platform, Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { useTheme } from '../../theme/ThemeProvider';
import { withAlpha } from '../../theme/createTheme';
import type { ColorToken } from '../../theme/tokens';
import { Text } from '../Text/Text';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary hover:bg-primary/90 active:bg-primary/80',
  secondary: 'border border-overlay/[0.08] bg-overlay/[0.06] hover:bg-overlay/10 active:bg-overlay/[0.14]',
  subtle: 'bg-overlay/5 hover:bg-overlay/[0.08] active:bg-overlay/[0.12]',
  ghost: 'bg-transparent hover:bg-overlay/5 active:bg-overlay/10',
  danger: 'bg-danger hover:bg-danger/90 active:bg-danger/80',
};

const variantTone: Record<ButtonVariant, ColorToken> = {
  primary: 'primary-foreground',
  secondary: 'foreground',
  subtle: 'foreground',
  ghost: 'foreground',
  danger: 'danger-foreground',
};

const variantIconTone: Record<ButtonVariant, ColorToken> = {
  primary: 'primary-foreground',
  secondary: 'foreground',
  subtle: 'icon-strong',
  ghost: 'icon-strong',
  danger: 'danger-foreground',
};

const sizeClass: Record<ButtonSize, { box: string; square: string; text: 'label' | 'body-sm' | 'body'; icon: number }> = {
  sm: { box: 'h-7 gap-1.5 rounded-md px-3', square: 'h-7 w-7 rounded-md', text: 'label', icon: 13 },
  md: { box: 'h-[34px] gap-1.5 rounded-field px-3.5', square: 'h-[34px] w-[34px] rounded-field', text: 'body-sm', icon: 14 },
  lg: { box: 'h-9 gap-1.5 rounded-control px-3', square: 'h-9 w-9 rounded-control', text: 'body', icon: 16 },
};

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Button text. Omit for an icon-only (square) button — then pass `accessibilityLabel`. */
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon: an icon name or any element. */
  icon?: IconSource;
  /** Trailing icon. */
  iconRight?: IconSource;
  /** Stretch to fill the main axis of a row (`flex-1`). */
  fill?: boolean;
  /** Stretch to the full width of a column. */
  fullWidth?: boolean;
  /** Soft brand-coloured shadow (used by the sidebar "Send" CTA). Primary only. */
  glow?: boolean;
  loading?: boolean;
  className?: string;
  labelClassName?: string;
  style?: StyleProp<ViewStyle>;
}

export const Button = React.forwardRef<React.ComponentRef<typeof View>, ButtonProps>(function Button(
  {
    label,
    variant = 'secondary',
    size = 'md',
    icon,
    iconRight,
    fill,
    fullWidth,
    glow,
    loading,
    disabled,
    className,
    labelClassName,
    style,
    accessibilityLabel,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const s = sizeClass[size];
  const iconOnly = !label;
  const glowStyle: ViewStyle | null =
    glow && variant === 'primary' ? ({ boxShadow: `0px 6px 16px -4px ${withAlpha(theme.colors.primary, 0.28)}` } as ViewStyle) : null;
  const iconDefaults = { size: s.icon, tone: variantIconTone[variant] };

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      disabled={disabled || loading}
      className={cn(
        'flex-row items-center justify-center overflow-hidden',
        Platform.OS === 'web' && 'cursor-pointer select-none',
        iconOnly ? s.square : s.box,
        variantClass[variant],
        fill && 'min-w-0 flex-1',
        fullWidth && 'self-stretch',
        (disabled || loading) && 'opacity-50',
        className,
      )}
      style={[glowStyle, style]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors[variantTone[variant]]} />
      ) : (
        renderIcon(icon, iconDefaults)
      )}
      {label ? (
        <Text variant={s.text} weight="semibold" tone={variantTone[variant]} numberOfLines={1} className={labelClassName}>
          {label}
        </Text>
      ) : null}
      {renderIcon(iconRight, iconDefaults)}
    </Pressable>
  );
}) as React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<React.ComponentRef<typeof View>>>;
