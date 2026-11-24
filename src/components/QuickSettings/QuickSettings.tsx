import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { withAlpha } from '../../theme/createTheme';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

export interface QuickSettingsProps {
  /** A small heading above the lines, when the box is not obviously about one thing. */
  title?: string;
  children?: React.ReactNode;
  /** The one plain button at the foot: "All settings", which opens the full page. */
  footer?: { label: string; onPress: () => void; disabled?: boolean };
  /** Default 300. */
  width?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The small options box that pops up from a control: one line per setting, its name on the left and its control on
 * the right, nothing else, and at the foot one plain button to the full page. The host places it (above a dock
 * button, under a toolbar's) and puts it away on a press outside. The kit-wide version of the player's options box.
 */
export function QuickSettings({ title, children, footer, width = 300, className, style }: QuickSettingsProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="menu"
      className={cn('rounded-2xl border border-overlay/10 bg-pane p-2', className)}
      style={[{ width, boxShadow: `0 12px 32px ${withAlpha(theme.colors.inset, 0.5)}, 0 1px 0 ${withAlpha(theme.colors.overlay, 0.06)} inset` } as ViewStyle, style]}
    >
      {title ? <Text variant="overline" tone="muted" className="px-2 pb-1 pt-1">{title}</Text> : null}
      <View>{children}</View>
      {footer ? (
        <View className="pt-1.5">
          <Button label={footer.label} variant="subtle" size="sm" fullWidth onPress={footer.onPress} disabled={footer.disabled} />
        </View>
      ) : null}
    </View>
  );
}

export interface QuickSettingsLineProps {
  icon?: IconSource;
  name: string;
  /** A second, quieter line under the name. */
  detail?: string;
  /** The control: a `Switch`, an `IconButton`, a value with two buttons. */
  children?: React.ReactNode;
  /** Greyed: the setting is not available now. */
  dim?: boolean;
  className?: string;
}

/** One setting: the name (and its icon) on the left, its control on the right. */
export function QuickSettingsLine({ icon, name, detail, children, dim, className }: QuickSettingsLineProps) {
  return (
    <View className={cn('min-h-[44px] flex-row items-center gap-3 rounded-xl px-2', dim && 'opacity-50', className)}>
      {icon ? renderIcon(icon, { size: 18, tone: 'icon' }) : null}
      <View className="flex-1">
        <Text variant="body-sm" weight="medium" numberOfLines={1}>{name}</Text>
        {detail ? <Text variant="micro" tone="muted" numberOfLines={1}>{detail}</Text> : null}
      </View>
      <View className="flex-row items-center gap-2">{children}</View>
    </View>
  );
}
