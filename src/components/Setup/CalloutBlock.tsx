import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export interface CalloutBlockProps {
  icon?: IconSource;
  title: string;
  description?: string;
  /** The one thing to do about it. */
  action?: { label: string; onPress: () => void };
  /** The whole block is pressable too. */
  onPress?: () => void;
  /** `primary` (default): tinted, for something to set up. `neutral`: quiet. */
  tone?: 'primary' | 'neutral';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A standing notice on a home page: an embossed icon, a title, a line and a button. It stays until what it asks
 * for is done ("Connect your AI"), so a person who skipped a setup step always has the way back in front of them.
 */
export function CalloutBlock({ icon = 'alert-circle', title, description, action, onPress, tone = 'primary', className, style }: CalloutBlockProps) {
  const web = Platform.OS === 'web';
  const press = onPress ?? action?.onPress;
  const Wrap = press ? Pressable : View;
  return (
    <Wrap
      onPress={press}
      accessibilityRole={press ? 'button' : 'summary'}
      accessibilityLabel={title}
      className={cn(
        'w-full flex-row items-center gap-3.5 overflow-hidden rounded-card border p-4',
        tone === 'primary' ? 'border-primary/30 bg-primary/[0.08]' : 'border-overlay/[0.07] bg-overlay/[0.04]',
        press && web && 'cursor-pointer',
        className,
      )}
      style={[tone === 'primary' ? ({ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.25)' } as ViewStyle) : null, style]}
    >
      <View className={cn('h-12 w-12 items-center justify-center rounded-xl border', tone === 'primary' ? 'border-primary/30 bg-primary/15' : 'border-overlay/[0.08] bg-overlay/[0.06]')}>{renderIcon(icon, { size: 24, tone: tone === 'primary' ? 'primary-text' : 'icon-strong', emboss: true })}</View>
      <View className="min-w-0 flex-1 gap-0.5">
        <Text variant="body-lg" numberOfLines={2}>
          {title}
        </Text>
        {description ? (
          <Text variant="caption" tone="muted" className="leading-4">
            {description}
          </Text>
        ) : null}
      </View>
      {action ? <Button variant="primary" size="md" label={action.label} onPress={action.onPress} /> : null}
    </Wrap>
  );
}
