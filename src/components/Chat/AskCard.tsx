import React, { useState } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { statusBg, type StatusTone } from '../../theme/tones';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { AgentMark } from './AgentMark';
import { messageTime } from './chatLogic';
import { askOutcomeLine, askStatus, askTimeLeft, type AskAnswer, type AskChoice, type AskStatus } from './askLogic';

export * from './askLogic';

const MONO = Platform.select({ web: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', ios: 'Menlo', default: 'monospace' });

export interface AskCardProps {
  /** The agent asking. */
  agent: string;
  /** The tool it wants: `Bash`, `WebFetch`, `Edit`… */
  tool: string;
  /** What it would do, in one line: the command, the file. */
  what: string;
  /** The whole input, when it says more than `what` (the full command, the text an edit would write). */
  detail?: string;
  ts: number;
  /** When the question lapses (ms). */
  expires: number;
  /**
   * What a standing yes would let the agent do, in words ("read anything in ~/Anjou/pearkit"): the second answer
   * becomes "Allow for this project" with this line under the question. `null`: no standing yes is offered (allow
   * once or refuse). Left out: the plain "Always" of a host that does not say.
   */
  always?: string | null;
  answer?: AskAnswer | null;
  /** This person may answer (one of the owner's own devices). Others see why they cannot. */
  canAnswer?: boolean;
  /** Why this device cannot answer. Default: "Only the owner's devices can answer". */
  lockHint?: string;
  onAnswer?: (choice: AskChoice) => void;
  /** An answer is on its way: the buttons wait. */
  busy?: boolean;
  /** The clock, for tests and stories. Default `Date.now()`. */
  now?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const toneOf: Record<AskStatus, StatusTone> = { open: 'warning', allowed: 'success', refused: 'danger', lapsed: 'neutral' };

/**
 * An agent asks a person for a permission, in the conversation where it works: who asks, the tool and the exact
 * thing it would do, and three answers (allow once, always, deny) for the people who may give them. Everyone else
 * sees the question and the lock line. Once answered it says who answered and how, and stays as the record.
 * With `always`, the standing yes is "Allow for this project" and the card says what it would open.
 */
export function AskCard({ agent, tool, what, detail, ts, expires, always, answer, canAnswer, lockHint = "Only the owner's devices can answer", onAnswer, busy, now, className, style }: AskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const status = askStatus({ expires }, answer, now ?? Date.now());
  const tone = toneOf[status];
  const more = !!detail && detail.trim() !== what.trim();
  const outcome = askOutcomeLine(status, answer);
  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`${agent} asks for ${tool}: ${what}. ${status === 'open' ? askTimeLeft(expires, now) : outcome}`}
      className={cn('w-full max-w-[560px] flex-row overflow-hidden rounded-lg border border-overlay/10 bg-overlay/[0.04]', className)}
      style={style}
      {...({ dataSet: { askState: status } } as object)}
    >
      <View className={cn('w-1', statusBg[tone])} />
      <View className="min-w-0 flex-1 gap-2 px-3 py-2.5">
        <View className="flex-row items-center gap-2">
          <AgentMark size={18} />
          <Text variant="caption" weight="semibold" className="min-w-0 flex-1" numberOfLines={1}>
            {agent} asks for {tool}
          </Text>
          <Text variant="micro" tone="subtle">
            {status === 'open' ? askTimeLeft(expires, now) : messageTime(answer?.ts ?? ts)}
          </Text>
        </View>
        <Pressable disabled={!more} onPress={() => setExpanded((e) => !e)} accessibilityRole={more ? 'button' : undefined} accessibilityLabel={more ? (expanded ? 'Show less' : 'Show the whole input') : undefined}>
          <Text variant="body-sm" style={{ fontFamily: MONO }} numberOfLines={expanded ? undefined : 3}>
            {expanded && detail ? detail : what}
          </Text>
          {more ? (
            <Text variant="micro" tone="primary-text" className="pt-1">
              {expanded ? 'Less' : 'Show the whole input'}
            </Text>
          ) : null}
        </Pressable>
        {status === 'open' && always ? (
          <View className="flex-row items-start gap-1.5">
            <Icon name="folder" size={13} tone="subtle" />
            <Text variant="micro" tone="muted" className="min-w-0 flex-1">
              For this project: {always}
            </Text>
          </View>
        ) : null}
        {status === 'open' ? (
          canAnswer ? (
            <View className="flex-row flex-wrap items-center gap-2 pt-0.5">
              <Button size="sm" variant="primary" label="Allow once" loading={busy} disabled={busy} onPress={() => onAnswer?.('allow_once')} />
              {always === null ? null : <Button size="sm" variant="secondary" label={always ? 'Allow for this project' : 'Always'} disabled={busy} onPress={() => onAnswer?.('allow_always')} />}
              <Button size="sm" variant="danger" label="Refuse" disabled={busy} onPress={() => onAnswer?.('reject_once')} />
            </View>
          ) : (
            <View className="flex-row items-center gap-1.5">
              <Icon name="info-circle" size={13} tone="subtle" />
              <Text variant="micro" tone="subtle">
                {lockHint}
              </Text>
            </View>
          )
        ) : (
          <View className="flex-row items-center gap-1.5">
            <Icon name={status === 'allowed' ? 'tick' : 'close'} size={13} tone={tone} />
            <Text variant="micro" tone="muted">
              {outcome}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
