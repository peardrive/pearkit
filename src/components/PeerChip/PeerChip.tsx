import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { truncateMiddle } from '../../utils/format';
import { Avatar } from '../Avatar/Avatar';
import { StatusDot } from '../Status/StatusDot';
import { Text } from '../Text/Text';

export interface PeerChipProps {
  /** Peer public key / id. Shortened to `a12b…4f5g` unless `label` is given. */
  peerId: string;
  label?: string;
  /** Show a small online dot after the label. */
  online?: boolean;
  /** Explicit avatar gradient (defaults to one derived from `peerId`). */
  avatarColors?: [string, string];
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Pill showing a connected peer with its generated avatar. */
export function PeerChip({ peerId, label, online, avatarColors, onPress, className, style }: PeerChipProps) {
  const text = label ?? truncateMiddle(peerId, 4, 4);
  const Comp = onPress ? Pressable : View;
  return (
    <Comp
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`Peer ${text}`}
      className={cn(
        'flex-row items-center gap-1.5 self-start rounded-full bg-overlay/5 py-[3px] pl-[3px] pr-[9px]',
        onPress && 'hover:bg-overlay/[0.08]',
        onPress && Platform.OS === 'web' && 'cursor-pointer',
        className,
      )}
      style={style}
    >
      <Avatar seed={peerId} size={18} colors={avatarColors} />
      <Text variant="micro" tone="foreground" numberOfLines={1}>
        {text}
      </Text>
      {online ? <StatusDot tone="success" size={5} /> : null}
    </Comp>
  );
}
