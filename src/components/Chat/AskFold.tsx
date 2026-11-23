import React, { useState } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { statusBg, type StatusTone } from '../../theme/tones';
import { Text } from '../Text/Text';
import { askFoldLine, type AskStatus, type FoldedAsk } from './askLogic';

const MONO = Platform.select({ web: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', ios: 'Menlo', default: 'monospace' });

export interface AskFoldProps {
  /** The agent that asked. */
  agent: string;
  /** The asks of one stretch of work, in order. */
  asks: FoldedAsk[];
  /** The steps the agent took around them, hidden with the fold. */
  steps?: number;
  /** Start open. */
  defaultExpanded?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const toneOf: Record<AskStatus, StatusTone> = { open: 'warning', allowed: 'success', refused: 'danger', lapsed: 'neutral' };
const word: Record<AskStatus, string> = { open: 'open', allowed: 'allowed', refused: 'refused', lapsed: 'lapsed' };

/**
 * The permissions an agent asked for during one stretch of work, as one quiet line of the conversation (2026-11-23
 * memo: "they only ever take up one block"). A press opens it to one line per ask, the tool and what it would do,
 * with the answer at the end of the line; a press closes it again. The open question itself is never in here:
 * that one stands as its card until it is answered.
 */
export function AskFold({ agent, asks, steps = 0, defaultExpanded = false, className, style }: AskFoldProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const line = askFoldLine(asks, steps);
  return (
    <View className={cn('w-full max-w-[560px]', className)} style={style} {...({ dataSet: { askFold: expanded ? 'open' : 'closed' } } as object)}>
      <Pressable
        onPress={() => setExpanded((e) => !e)}
        accessibilityRole="button"
        accessibilityLabel={`${agent} ${line}`}
        accessibilityState={{ expanded }}
        className="flex-row items-center gap-1.5 py-0.5"
      >
        <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size={12} tone="subtle" />
        <Text variant="micro" tone="subtle" className="min-w-0 flex-1" numberOfLines={expanded ? undefined : 1}>
          {agent} {line}
        </Text>
      </Pressable>
      {expanded ? (
        <View className="ml-[18px] gap-0.5 border-l border-overlay/10 pl-2.5">
          {asks.map((a) => (
            <View key={a.id} className="flex-row items-center gap-2" accessibilityLabel={`${a.tool}: ${a.what}. ${word[a.status]}${a.by ? ` by ${a.by}` : ''}`}>
              <View className={cn('h-1.5 w-1.5 rounded-full', statusBg[toneOf[a.status]])} />
              <Text variant="micro" tone="muted" numberOfLines={1} className="min-w-0 flex-1" style={{ fontFamily: MONO }}>
                {a.tool}: {a.what}
              </Text>
              <Text variant="micro" tone={a.status === 'refused' ? 'danger' : 'subtle'}>
                {word[a.status]}
                {a.by ? ` · ${a.by}` : ''}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
