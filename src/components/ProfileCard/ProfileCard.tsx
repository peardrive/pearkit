import React, { type ReactNode } from 'react';
import { Image, Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon, type IconSource } from '../../icons/Icon';
import type { StatusTone } from '../../theme/tones';
import { Avatar } from '../Avatar/Avatar';
import { AgentMark } from '../Chat/AgentMark';
import { Chip } from '../Chip/Chip';
import { IconButton } from '../IconButton/IconButton';
import { SettingsBlock, SettingsRow } from '../SettingsBlock/SettingsBlock';
import { Text } from '../Text/Text';

export interface ProfileBadge {
  label: string;
  tone?: StatusTone;
  icon?: IconSource;
}

export interface ProfileRow {
  label: string;
  /** A value at the right, as words. */
  value?: string;
  /** Or anything at the right (a `Toggle`, a `Button`). Wins over `value`. */
  control?: ReactNode;
  hint?: string;
  onPress?: () => void;
}

export interface ProfileSection {
  title: string;
  icon?: IconSource;
  description?: string;
  rows: ProfileRow[];
}

export interface ProfileCardProps {
  name: string;
  /** Under the name: what it is, where it lives ("Bot in Pearkit · runs on Mac Mini"). */
  subtitle?: string;
  /** A picture by URL, or a generated one from a seed (the name when neither is given). */
  avatar?: { seed?: string; uri?: string };
  /** An AI: the agent's mark instead of a generated picture, unless there is a `uri`. */
  agent?: boolean;
  /** Small chips under the name: agent, device, runtime. */
  badges?: ProfileBadge[];
  /** Settings blocks, in PearDrive's style. */
  sections: ProfileSection[];
  /** Buttons at the bottom. */
  actions?: ReactNode;
  /** The owner's view: the name and the picture can be changed. */
  editable?: boolean;
  onEditName?: () => void;
  onPickAvatar?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A profile for a bot or a person: name and picture on top, badge chips, then settings blocks (`SettingsBlock`,
 * `SettingsRow`). With `editable`, the name and the picture show their edit marks.
 */
export function ProfileCard({ name, subtitle, avatar, agent, badges, sections, actions, editable, onEditName, onPickAvatar, className, style }: ProfileCardProps) {
  const web = Platform.OS === 'web';
  const size = 64;
  const canPick = !!editable && !!onPickAvatar;
  const picture = avatar?.uri ? (
    <Image source={{ uri: avatar.uri }} style={{ width: size, height: size, borderRadius: size / 2 }} accessibilityLabel={name} accessibilityIgnoresInvertColors />
  ) : agent ? (
    <AgentMark size={size} accessibilityLabel={`${name}, an agent`} />
  ) : (
    <Avatar seed={avatar?.seed ?? name} size={size} label={name.slice(0, 1)} accessibilityLabel={name} />
  );
  return (
    <View className={cn('w-full gap-3', className)} style={style}>
      <View className="flex-row items-center gap-4 px-1 py-1">
        <Pressable
          onPress={canPick ? onPickAvatar : undefined}
          disabled={!canPick}
          accessibilityRole={canPick ? 'button' : undefined}
          accessibilityLabel={canPick ? 'Change the picture' : undefined}
          className={cn('relative', canPick && web && 'cursor-pointer')}
        >
          {picture}
          {canPick ? (
            <View className="absolute -bottom-0.5 -right-0.5 h-6 w-6 items-center justify-center rounded-full border border-background bg-pane">
              <Icon name="edit" size={12} tone="icon-strong" />
            </View>
          ) : null}
        </Pressable>
        <View className="min-w-0 flex-1 gap-1">
          <View className="flex-row items-center gap-1">
            <Text variant="display" numberOfLines={1} className="min-w-0 shrink">
              {name}
            </Text>
            {editable && onEditName ? <IconButton icon="edit" size="xs" tooltip="Change the name" onPress={onEditName} /> : null}
          </View>
          {subtitle ? (
            <Text variant="caption" tone="muted" numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
          {badges?.length ? (
            <View className="flex-row flex-wrap gap-1.5 pt-1">
              {badges.map((b, i) => (
                <Chip key={`${b.label}-${i}`} label={b.label} icon={b.icon} tone={b.tone ?? 'neutral'} selected size="sm" />
              ))}
            </View>
          ) : null}
        </View>
      </View>
      {sections.map((s, i) => (
        <SettingsBlock key={`${s.title}-${i}`} title={s.title} icon={s.icon} description={s.description}>
          {s.rows.map((r, j) => (
            <SettingsRow key={`${r.label}-${j}`} label={r.label} hint={r.hint} control={r.control ?? r.value} onPress={r.onPress} divider={j < s.rows.length - 1} />
          ))}
        </SettingsBlock>
      ))}
      {actions ? <View className="flex-row flex-wrap items-center gap-2 px-1">{actions}</View> : null}
    </View>
  );
}
