import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { formatBytes, formatEta } from '../../utils/format';
import { Icon } from '../../icons/Icon';
import { Card } from '../Card/Card';
import { Spacer } from '../Spacer/Spacer';
import { PeerChip } from '../PeerChip/PeerChip';
import { avatarPalette } from '../Avatar/Avatar';
import { useTheme } from '../../theme/ThemeProvider';
import { ProgressBar, type ProgressVariant } from '../ProgressBar/ProgressBar';
import { Text } from '../Text/Text';
import { TransferRate } from './TransferRate';

export interface TransferPeer {
  id: string;
  label?: string;
  online?: boolean;
}

export interface TransferCardProps {
  /** "Sharing with 3 peers". Defaults from `direction` + peer count. */
  title?: string;
  /** 0–1. */
  progress: number;
  direction?: 'up' | 'down';
  /** Bytes/s or a preformatted string. */
  speed?: number | string;
  /** Seconds remaining or a preformatted string. */
  eta?: number | string;
  /** Bytes transferred / total — shown as "1.18 / 1.2 GB". Or pass `sizeLabel`. */
  transferred?: number;
  total?: number;
  sizeLabel?: string;
  peers?: Array<string | TransferPeer>;
  onPeerPress?: (peer: TransferPeer) => void;
  progressVariant?: ProgressVariant;
  /** Extra content at the bottom (actions…). */
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

function bytesPair(done: number, total: number) {
  const [t, unit] = formatBytes(total, 1).split(' ');
  const divisor = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4, PB: 1024 ** 5 }[unit as 'B'] ?? 1;
  return `${(done / divisor).toFixed(2).replace(/\.?0+$/, '')} / ${t} ${unit}`;
}

/** Live transfer panel: percentage, progress, speed, ETA, size and connected peers. */
export function TransferCard({
  title,
  progress,
  direction = 'up',
  speed,
  eta,
  transferred,
  total,
  sizeLabel,
  peers = [],
  onPeerPress,
  progressVariant = 'brand',
  children,
  className,
  style,
}: TransferCardProps) {
  const palette = avatarPalette(useTheme());
  const normalized: TransferPeer[] = peers.map((p) => (typeof p === 'string' ? { id: p } : p));
  const heading = title ?? `${direction === 'up' ? 'Sharing with' : 'Receiving from'} ${normalized.length} ${normalized.length === 1 ? 'peer' : 'peers'}`;
  const size = sizeLabel ?? (transferred != null && total != null ? bytesPair(transferred, total) : undefined);
  const etaText = typeof eta === 'number' ? formatEta(eta) : eta;

  return (
    <Card className={className} style={style}>
      <View className="w-full flex-row items-center gap-1.5">
        <Text variant="body-lg" numberOfLines={1} className="min-w-0 flex-1">
          {heading}
        </Text>
        <Text variant="body-lg" weight="bold" tone="primary-text">
          {Math.round(progress * 100)}%
        </Text>
      </View>

      <ProgressBar value={progress} height={6} variant={progressVariant} accessibilityLabel={heading} />

      {speed != null || etaText || size ? (
        <View className="w-full flex-row items-center gap-1.5">
          {speed != null ? <TransferRate direction={direction} value={speed} /> : null}
          {speed != null && etaText ? (
            <Text variant="label" tone="subtle">
              ·
            </Text>
          ) : null}
          {etaText ? (
            <>
              <Icon name="clock" size={12} tone="icon" />
              <Text variant="label" tone="muted" numberOfLines={1}>
                {etaText}
              </Text>
            </>
          ) : null}
          <Spacer />
          {size ? (
            <Text variant="label" tone="muted" numberOfLines={1}>
              {size}
            </Text>
          ) : null}
        </View>
      ) : null}

      {normalized.length ? (
        <View className={cn('flex-row flex-wrap gap-1.5')}>
          {normalized.map((p, i) => (
            <PeerChip key={p.id} avatarColors={palette[i % palette.length]} peerId={p.id} label={p.label} online={p.online} onPress={onPeerPress ? () => onPeerPress(p) : undefined} />
          ))}
        </View>
      ) : null}
      {children}
    </Card>
  );
}
