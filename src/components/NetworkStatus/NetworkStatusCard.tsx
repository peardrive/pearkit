import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon, type IconSource } from '../../icons/Icon';
import type { StatusTone } from '../../theme/tones';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Spacer } from '../Spacer/Spacer';
import { StatusDot } from '../Status/StatusDot';
import { Text } from '../Text/Text';
import { Tooltip } from '../Tooltip/Tooltip';
import { TransferRate } from '../Transfer/TransferRate';

export type NetworkState = 'connected' | 'connecting' | 'offline';

export const networkStateMeta: Record<NetworkState, { label: string; tone: StatusTone }> = {
  connected: { label: 'Connected', tone: 'success' },
  connecting: { label: 'Connecting…', tone: 'warning' },
  offline: { label: 'Offline', tone: 'neutral' },
};

export interface NetworkStatusCardProps {
  state?: NetworkState;
  /** Override the state label. */
  label?: string;
  peers?: number;
  /** Bytes/s or preformatted strings. Hidden when undefined. */
  upload?: number | string;
  download?: number | string;
  /** Footer action. Pass `null` to hide. Default: "Pause all transfers". */
  action?: { label: string; icon?: IconSource; onPress?: () => void } | null;
  /** Shorthand: show Pause / Resume all and call back with the next state. */
  paused?: boolean;
  onPausedChange?: (paused: boolean) => void;
  /** Icon-rail mode: just the status dot with a tooltip. */
  compact?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** P2P network summary pinned to the bottom of the sidebar. */
export function NetworkStatusCard({
  state = 'connected',
  label,
  peers,
  upload,
  download,
  action,
  paused,
  onPausedChange,
  compact,
  className,
  style,
}: NetworkStatusCardProps) {
  const meta = networkStateMeta[state];
  const text = label ?? meta.label;
  const resolvedAction =
    action !== undefined
      ? action
      : onPausedChange || paused !== undefined
        ? {
            label: paused ? 'Resume all transfers' : 'Pause all transfers',
            icon: (paused ? 'play' : 'pause') as IconSource,
            onPress: () => onPausedChange?.(!paused),
          }
        : { label: 'Pause all transfers', icon: 'pause' as IconSource };

  if (compact) {
    return (
      <Tooltip label={text} shortcut={peers != null ? `${peers} peers` : undefined} placement="right" offset={10}>
        <View className={cn('h-[34px] w-[34px] items-center justify-center rounded-lg border border-overlay/[0.07] bg-overlay/[0.04]', className)} style={style}>
          <StatusDot tone={meta.tone} glow={state === 'connected'} pulse={state === 'connecting'} />
        </View>
      </Tooltip>
    );
  }

  return (
    <Card size="sm" className={className} style={style} accessibilityLabel={`Network: ${text}${peers != null ? `, ${peers} peers` : ''}`}>
      <View className="w-full flex-row items-center gap-2">
        <StatusDot tone={meta.tone} glow={state === 'connected'} pulse={state === 'connecting'} />
        <Text variant="body" weight="semibold" numberOfLines={1}>
          {text}
        </Text>
        <Spacer />
        {peers != null ? (
          <>
            <Icon name="people" size={14} tone="icon" />
            <Text variant="label" tone="muted" numberOfLines={1}>
              {peers} {peers === 1 ? 'peer' : 'peers'}
            </Text>
          </>
        ) : null}
      </View>
      {upload != null || download != null ? (
        <View className="w-full flex-row items-center gap-2.5">
          {upload != null ? <TransferRate direction="up" value={upload} /> : null}
          {download != null ? <TransferRate direction="down" value={download} /> : null}
        </View>
      ) : null}
      {resolvedAction ? (
        <Button
          variant="subtle"
          size="sm"
          fullWidth
          label={resolvedAction.label}
          icon={resolvedAction.icon}
          onPress={resolvedAction.onPress}
          disabled={state === 'offline'}
        />
      ) : null}
    </Card>
  );
}
