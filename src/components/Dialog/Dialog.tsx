import React, { useEffect, useMemo } from 'react';
import { Modal, Platform, Pressable, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { vars } from 'nativewind';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { themeToCssVariables } from '../../theme/createTheme';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

export interface DialogProps {
  open: boolean;
  /** Called on backdrop press, Escape (web) and the close button. */
  onClose?: () => void;
  title?: string;
  description?: string;
  /** Icon in a tinted tile above the title. */
  icon?: IconSource;
  children?: React.ReactNode;
  /** Footer buttons, right-aligned. */
  actions?: React.ReactNode;
  /** Panel width in px. Default 420. */
  width?: number;
  /** Close on backdrop press. Default true. */
  dismissable?: boolean;
  /** Hide the × button. */
  hideCloseButton?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Centered modal dialog built on React Native's `Modal`, so it works on
 * native and on react-native-web / Electron. The modal is portalled outside the
 * provider's element, so the theme's CSS variables are re-applied inside it.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  actions,
  width = 420,
  dismissable = true,
  hideCloseButton,
  className,
  style,
}: DialogProps) {
  const theme = useTheme();
  const themeVars = useMemo(() => vars(themeToCssVariables(theme)), [theme]);

  // Escape closes on web / Electron.
  useEffect(() => {
    if (!open || Platform.OS !== 'web' || typeof window === 'undefined' || !onClose) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center p-6" style={themeVars}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
          className="absolute inset-0 bg-black/60"
          onPress={dismissable ? onClose : undefined}
          focusable={false}
        />
        <View
          accessibilityRole={Platform.OS === 'web' ? ('dialog' as never) : undefined}
          aria-modal
          aria-label={title}
          className={cn('max-h-full w-full overflow-hidden rounded-xl border border-overlay/10 bg-pane', className)}
          style={[{ maxWidth: width, boxShadow: '0px 30px 70px 0px rgba(0,0,0,0.55)' } as ViewStyle, style]}
        >
          <ScrollView contentContainerClassName="gap-4 p-5" keyboardShouldPersistTaps="handled">
            {title || icon ? (
              <View className="flex-row items-start gap-3">
                {icon ? (
                  <View className="h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
                    {renderIcon(icon, { size: 20, tone: 'primary-text' })}
                  </View>
                ) : null}
                <View className="min-w-0 flex-1 gap-1 pt-0.5">
                  {title ? <Text variant="title" accessibilityRole="header">{title}</Text> : null}
                  {description ? <Text variant="caption" tone="muted" className="leading-[17px]">{description}</Text> : null}
                </View>
                {onClose && !hideCloseButton ? <IconButton icon="close" size="sm" accessibilityLabel="Close" onPress={onClose} className="-mr-1.5 -mt-1" /> : null}
              </View>
            ) : null}
            {children}
            {actions ? <View className="flex-row justify-end gap-2 pt-1">{actions}</View> : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
