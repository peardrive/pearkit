import React from 'react';
import { Platform, Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import type { ColorToken } from '../../theme/tokens';
import { Tooltip, type TooltipPlacement } from '../Tooltip/Tooltip';

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'ghost' | 'subtle' | 'solid';

const sizes: Record<IconButtonSize, { box: string; icon: number }> = {
  xs: { box: 'h-6 w-6 rounded-xs', icon: 14 },
  sm: { box: 'h-[30px] w-[30px] rounded-md', icon: 16 },
  md: { box: 'h-8 w-8 rounded-md', icon: 17 },
  lg: { box: 'h-9 w-9 rounded-control', icon: 18 },
};

const variants: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent hover:bg-overlay/[0.06] active:bg-overlay/10',
  subtle: 'bg-overlay/5 hover:bg-overlay/[0.08] active:bg-overlay/[0.12]',
  solid: 'bg-primary hover:bg-primary/90 active:bg-primary/80',
};

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  icon: IconSource;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  /** Pressed/toggled look (e.g. the active tool in a toolbar). */
  active?: boolean;
  /** Icon colour token. Defaults to `icon-strong` (`primary-foreground` for `solid`). */
  tone?: ColorToken;
  /** Show a tooltip on hover. A string, or label + shortcut. Also used as the accessibility label. */
  tooltip?: string | { label: string; shortcut?: string; placement?: TooltipPlacement; defaultOpen?: boolean };
  /** Required when there is no tooltip, for screen readers. */
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const IconButton = React.forwardRef<React.ComponentRef<typeof View>, IconButtonProps>(function IconButton(
  { icon, size = 'md', variant = 'ghost', active, tone, tooltip, accessibilityLabel, disabled, className, style, ...rest },
  ref,
) {
  const s = sizes[size];
  const tip = typeof tooltip === 'string' ? { label: tooltip } : tooltip;
  const button = (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? tip?.label}
      accessibilityState={{ disabled: !!disabled, selected: !!active }}
      disabled={disabled}
      className={cn(
        'items-center justify-center',
        Platform.OS === 'web' && 'cursor-pointer select-none',
        s.box,
        variants[variant],
        active && variant === 'ghost' && 'bg-overlay/[0.08]',
        disabled && 'opacity-40',
        className,
      )}
      style={style}
      {...rest}
    >
      {renderIcon(icon, { size: s.icon, tone: tone ?? (variant === 'solid' ? 'primary-foreground' : active ? 'foreground' : 'icon-strong') })}
    </Pressable>
  );
  if (!tip) return button;
  return (
    <Tooltip label={tip.label} shortcut={tip.shortcut} placement={tip.placement} defaultOpen={tip.defaultOpen} disabled={disabled}>
      {button}
    </Tooltip>
  );
}) as React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<React.ComponentRef<typeof View>>>;
