import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon, renderIcon, type IconSource } from '../../icons/Icon';
import type { IconName } from '../../icons/registry';
import { statusToken, type StatusTone } from '../../theme/tones';
import { Button } from '../Button/Button';
import { EmptyState } from '../EmptyState/EmptyState';

/** What the notice is about. Each kind brings an icon, a title, a description and a tone; any of them can be overridden. */
export type MediaNoticeKind = 'offline' | 'unplayable' | 'custom';

const kinds: Record<MediaNoticeKind, { icon: IconName; title: string; description?: string; tone: StatusTone }> = {
  offline: { icon: 'wifi-slash', title: 'No device online has this file', description: 'It plays when one comes back.', tone: 'neutral' },
  unplayable: { icon: 'alert-circle', title: 'This could not be played', description: 'The stream kept failing.', tone: 'warning' },
  custom: { icon: 'info-circle', title: '', tone: 'neutral' },
};

export interface MediaNoticeProps {
  /** `offline` (nobody online holds the file), `unplayable` (the stream kept failing) or `custom`. Default `offline`. */
  kind?: MediaNoticeKind;
  /** Icon: a name or any element. Defaults per kind. */
  icon?: IconSource;
  /** Colours the icon. Defaults per kind (`neutral`, `warning`). */
  tone?: StatusTone;
  title?: string;
  description?: string;
  /** Shows the retry button. A press is fresh intent: reopen the stream, do not just reload. */
  onRetry?: () => void;
  /** Default "Try again". */
  retryLabel?: string;
  /** Default `refresh`. */
  retryIcon?: IconSource;
  /** Extra buttons, after the retry button. */
  actions?: React.ReactNode;
  /**
   * `true` (default): fills the positioned parent, over a scrim in the `background` token,
   * so the poster stays visible behind it. `false`: an ordinary block, for a list row or a card.
   */
  overlay?: boolean;
  /** Scrim opacity, 0 to 1. Default 0.74. Overlay only. */
  scrim?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * The notice over a player that cannot play. A media element only knows "error";
 * the app finds out why (nobody online has the file, or the stream kept failing)
 * and says so where the media is, with one way out, instead of spinning or
 * re-opening the stream in a loop. Composes `EmptyState` and `Button`.
 */
export function MediaNotice({
  kind = 'offline',
  icon,
  tone,
  title,
  description,
  onRetry,
  retryLabel = 'Try again',
  retryIcon = 'refresh',
  actions,
  overlay = true,
  scrim = 0.74,
  className,
  style,
  accessibilityLabel,
}: MediaNoticeProps) {
  const k = kinds[kind];
  const iconTone = statusToken[tone ?? k.tone];
  const glyph: IconSource = icon ?? <Icon name={k.icon} size={24} tone={tone || kind !== 'offline' ? iconTone : 'icon'} />;
  const buttons =
    onRetry || actions ? (
      <>
        {onRetry ? <Button size="sm" variant="secondary" icon={retryIcon} label={retryLabel} onPress={onRetry} /> : null}
        {actions}
      </>
    ) : undefined;
  const body = (
    <EmptyState
      icon={renderIcon(glyph, { size: 24 }) ?? undefined}
      title={title ?? k.title}
      description={description ?? k.description}
      actions={buttons}
      className={cn('flex-none p-4', !overlay && 'rounded-card border border-overlay/[0.07] bg-pane')}
    />
  );
  if (!overlay) {
    return (
      <View accessibilityRole="alert" accessibilityLabel={accessibilityLabel ?? title ?? k.title} className={cn('self-stretch', className)} style={style}>
        {body}
      </View>
    );
  }
  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={accessibilityLabel ?? title ?? k.title}
      className={cn('absolute inset-0 z-10 items-center justify-center', className)}
      style={style}
    >
      <View className="absolute inset-0 bg-background" style={{ opacity: scrim }} pointerEvents="none" />
      {body}
    </View>
  );
}
