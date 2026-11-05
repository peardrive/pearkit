import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { statusSoftBg, statusText, type StatusTone } from '../../theme/tones';
import { Text } from '../Text/Text';
import { StatusDot } from './StatusDot';
import { shareStatusMeta, statusLabel, type ShareStatus } from './status';

export interface StatusPillProps {
  /** Use a preset (label + tone)… */
  status?: ShareStatus;
  /** …and/or set them explicitly. */
  label?: string;
  tone?: StatusTone;
  /** For `sharing` / `receiving`: appends the percentage, e.g. "Sharing 98%". 0–1. */
  progress?: number;
  size?: 'sm' | 'md';
  /** Show the leading dot. Default true. */
  dot?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const sizes = {
  sm: { box: 'gap-[5px] py-0.5 pl-[7px] pr-2', text: 'micro' as const, dot: 6 },
  md: { box: 'gap-1.5 py-[3px] pl-2 pr-2.5', text: 'caption' as const, dot: 6 },
};

/** Tinted status chip: `● Sharing 98%`, `● Completed`, `● Failed`… */
export function StatusPill({ status, label, tone, progress, size = 'sm', dot = true, className, style }: StatusPillProps) {
  const t: StatusTone = tone ?? (status ? shareStatusMeta[status].tone : 'neutral');
  const text = label ?? (status ? statusLabel(status, progress) : '');
  const s = sizes[size];
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={text}
      className={cn('flex-row items-center self-start rounded-full', s.box, statusSoftBg[t], className)}
      style={style}
    >
      {dot ? <StatusDot tone={t} size={s.dot} /> : null}
      <Text variant={s.text} weight="semibold" className={statusText[t]} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}
