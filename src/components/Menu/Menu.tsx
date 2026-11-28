import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Modal, Platform, Pressable, useWindowDimensions, View, type StyleProp, type ViewStyle } from 'react-native';
import { vars } from 'nativewind';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { themeToCssVariables } from '../../theme/createTheme';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Button, type ButtonSize, type ButtonVariant } from '../Button/Button';
import { IconButton, type IconButtonSize, type IconButtonVariant } from '../IconButton/IconButton';
import { Text } from '../Text/Text';
import { EDGE, PAD, ROW, SEPARATOR, menuCenter, menuPlace, type MenuAnchor } from './menuLogic';

export { menuCenter, menuPlace, type MenuAnchor } from './menuLogic';

export type MenuItem =
  | {
      key: string;
      label: string;
      icon?: IconSource;
      /** A destructive action: drawn in the danger colour. */
      danger?: boolean;
      disabled?: boolean;
      /** The keyboard shortcut, shown quietly at the right (`⌘C`). */
      shortcut?: string;
      onSelect: () => void;
    }
  | { key: string; separator: true };


export interface MenuProps {
  open: boolean;
  /** Called after an item is chosen, on a press outside, and on Escape (web). */
  onClose: () => void;
  items: MenuItem[];
  /**
   * The point the list hangs from, in window coordinates. Without one it opens in the middle of the screen (at
   * the top left it sat under a phone's status bar, its first row out of reach: rKeyChat, 2026-11-28).
   */
  anchor?: MenuAnchor;
  /** Which edge of the list sits on `anchor.x`. Default `left`. */
  align?: 'left' | 'right';
  /** Width in px. Default 220. */
  width?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A list of actions that drops from a button or opens where you pressed. It sits over everything else in a
 * pop-up window that covers the screen (React Native's `Modal`, portalled on web with the theme re-applied),
 * so a press anywhere outside closes it. Escape closes it on web.
 */
export function Menu({ open, onClose, items, anchor, align = 'left', width = 220, className, style }: MenuProps) {
  const theme = useTheme();
  const themeVars = useMemo(() => vars(themeToCssVariables(theme)), [theme]);
  const screen = useWindowDimensions();

  useEffect(() => {
    if (!open || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const height = items.reduce((h, it) => h + ('separator' in it ? SEPARATOR : ROW), PAD * 2 + 2);
  const place = anchor ? menuPlace(anchor, align, width, height, screen) : menuCenter(width, height, screen);

  return (
    <Modal visible={open} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <View className="flex-1" style={themeVars}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close menu" className="absolute inset-0" onPress={onClose} focusable={false} />
        <View
          accessibilityRole="menu"
          className={cn('absolute rounded-lg border border-overlay/10 bg-pane', className)}
          style={[{ width, left: place.left, top: place.top, paddingVertical: PAD, boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.45)' } as ViewStyle, style]}
        >
          {items.map((it) =>
            'separator' in it ? (
              <View key={it.key} className="my-1 h-px bg-overlay/[0.08]" />
            ) : (
              <Pressable
                key={it.key}
                accessibilityRole="menuitem"
                accessibilityLabel={it.label}
                accessibilityState={{ disabled: !!it.disabled }}
                disabled={it.disabled}
                onPress={() => { onClose(); it.onSelect(); }}
                className={cn(
                  'mx-1 flex-row items-center gap-2.5 rounded-sm px-2.5',
                  it.danger ? 'hover:bg-danger/[0.12] active:bg-danger/20' : 'hover:bg-overlay/[0.08] active:bg-overlay/[0.12]',
                  Platform.OS === 'web' && !it.disabled && 'cursor-pointer',
                  it.disabled && 'opacity-40',
                )}
                style={{ height: ROW }}
              >
                {renderIcon(it.icon, { size: 15, tone: it.danger ? 'danger' : 'icon-strong' })}
                <Text variant="body-sm" tone={it.danger ? 'danger' : 'foreground'} numberOfLines={1} className="min-w-0 flex-1">
                  {it.label}
                </Text>
                {it.shortcut ? (
                  <Text variant="micro" tone="subtle" numberOfLines={1}>
                    {it.shortcut}
                  </Text>
                ) : null}
              </Pressable>
            ),
          )}
        </View>
      </View>
    </Modal>
  );
}

export type MenuButtonSize = IconButtonSize | ButtonSize;
export type MenuButtonVariant = IconButtonVariant | ButtonVariant;

export interface MenuButtonProps {
  /** Icon only (an `IconButton`) when there is no label; with a label, a `Button` with this icon leading. */
  icon?: IconSource;
  label?: string;
  items: MenuItem[];
  size?: MenuButtonSize;
  variant?: MenuButtonVariant;
  /** Hover tooltip of an icon-only button; also its accessibility label. */
  tooltip?: string;
  /** The list's edge that lines up with the button. Default `right` (lists open under the button's right edge). */
  align?: 'left' | 'right';
  /** Width of the list in px. */
  width?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const buttonSizeOf = (s: MenuButtonSize | undefined): ButtonSize => (s === 'xs' || s === 'sm' ? 'sm' : s === 'lg' ? 'lg' : 'md');
const buttonVariantOf = (v: MenuButtonVariant | undefined): ButtonVariant =>
  v === 'solid' ? 'primary' : v === 'ghost' || v === 'subtle' || v === 'primary' || v === 'danger' ? v : 'secondary';
const iconSizeOf = (s: MenuButtonSize | undefined): IconButtonSize => s ?? 'md';
const iconVariantOf = (v: MenuButtonVariant | undefined): IconButtonVariant =>
  v === 'primary' ? 'solid' : v === 'secondary' || v === 'danger' ? 'subtle' : (v ?? 'ghost');

/** A button that owns a `Menu`: press it and the list drops from under it. */
export function MenuButton({ icon = 'more', label, items, size, variant, tooltip, align = 'right', width, disabled, accessibilityLabel, className, style }: MenuButtonProps) {
  const button = useRef<React.ComponentRef<typeof View>>(null);
  const [anchor, setAnchor] = useState<MenuAnchor | null>(null);
  const open = anchor !== null;

  const press = () => {
    if (open) return setAnchor(null);
    const node = button.current;
    if (!node) return setAnchor({ x: Dimensions.get('window').width / 2, y: Dimensions.get('window').height / 3 });
    // Where the button is on the screen, so the list can hang from it inside the pop-up window.
    node.measureInWindow((x, y, w, h) => setAnchor({ x: align === 'right' ? x + w : x, y: y + h + 4 }));
  };

  return (
    <>
      {label ? (
        <Button
          ref={button}
          label={label}
          icon={icon === 'more' && label ? undefined : icon}
          iconRight="chevron-down"
          size={buttonSizeOf(size)}
          variant={buttonVariantOf(variant)}
          disabled={disabled}
          onPress={press}
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ expanded: open, disabled: !!disabled }}
          className={className}
          style={style}
        />
      ) : (
        <IconButton
          ref={button}
          icon={icon}
          size={iconSizeOf(size)}
          variant={iconVariantOf(variant)}
          active={open}
          disabled={disabled}
          tooltip={tooltip}
          accessibilityLabel={accessibilityLabel ?? tooltip ?? 'More'}
          accessibilityState={{ expanded: open, disabled: !!disabled }}
          onPress={press}
          className={className}
          style={style}
        />
      )}
      <Menu open={open} onClose={() => setAnchor(null)} items={items} anchor={anchor ?? undefined} align={align} width={width} />
    </>
  );
}
