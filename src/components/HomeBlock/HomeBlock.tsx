import React, { useState, type ReactNode } from 'react';
import { Platform, Pressable, useWindowDimensions, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Avatar } from '../Avatar/Avatar';
import { CountBadge } from '../Badge/CountBadge';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { AgentMark } from '../Chat/AgentMark';
import { StatusDot } from '../Status/StatusDot';
import { Text } from '../Text/Text';

export type HomeBlockSize = 'compact' | 'wide' | 'full';

export interface HomeBlockProps {
  title: string;
  icon?: IconSource;
  /** A quiet number after the title. */
  count?: number | string;
  /** One thing to do, at the right of the header ("All", "New"). */
  action?: { label: string; onPress: () => void };
  /**
   * `compact`: one cell of the grid. `wide`: a whole row. `full`: a whole row that grows to the space it is given.
   * On a phone every block is a whole row. Default `compact`.
   */
  size?: HomeBlockSize;
  /** Makes the header pressable (open the block's own page). */
  onPress?: () => void;
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** PearDrive's block: a card with a header row (icon, title, count, an action at the right) and a body. */
export function HomeBlock({ title, icon, count, action, size = 'compact', onPress, children, className, style }: HomeBlockProps) {
  const web = Platform.OS === 'web';
  const Head = onPress ? Pressable : View;
  return (
    <Card size="md" className={cn('gap-2.5', size === 'full' && 'flex-1', className)} style={style} accessibilityLabel={title}>
      <Head
        onPress={onPress}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={onPress ? title : undefined}
        className={cn('-m-1 flex-row items-center gap-2 rounded-md p-1', onPress && 'hover:bg-overlay/[0.04]', onPress && web && 'cursor-pointer')}
      >
        {renderIcon(icon, { size: 16, tone: 'icon-strong', emboss: true })}
        <Text variant="body-lg" weight="semibold" numberOfLines={1} className="min-w-0 shrink">
          {title}
        </Text>
        {count != null ? <CountBadge value={count} /> : null}
        <View className="flex-1" />
        {action ? <Button size="sm" variant="ghost" label={action.label} onPress={action.onPress} className="-my-1" /> : onPress ? renderIcon('chevron-right', { size: 14, tone: 'subtle' }) : null}
      </Head>
      {children}
    </Card>
  );
}

export interface HomeGridProps {
  children: ReactNode;
  /** Columns on this screen. Without it: two from 720 px up, one below. */
  columns?: 1 | 2;
  /** Space between blocks, in px. Default 12. */
  gap?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Lays `HomeBlock`s out: two up on a wide screen (a `wide` or `full` block takes the row), one up on a phone. */
export function HomeGrid({ children, columns, gap = 12, className, style }: HomeGridProps) {
  const { width: screen } = useWindowDimensions();
  const [width, setWidth] = useState(0);
  const cols = columns ?? (screen >= 720 ? 2 : 1);
  const cell = width ? (width - gap * (cols - 1)) / cols : undefined;
  return (
    <View className={cn('w-full flex-row flex-wrap', className)} style={[{ gap }, style]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const size = (child.props as { size?: HomeBlockSize }).size ?? 'compact';
        const whole = cols === 1 || size !== 'compact';
        return <View style={{ width: whole ? '100%' : cell, opacity: cell || whole ? 1 : 0 }}>{child}</View>;
      })}
    </View>
  );
}

export interface PresencePerson {
  id: string;
  name: string;
  agent?: boolean;
  online: boolean;
  avatar?: { seed?: string };
}

export interface PresenceRowProps {
  people: PresencePerson[];
  /** How many faces before "+N". Default 6. */
  max?: number;
  onPress?: (id: string) => void;
  /** Avatar size in px. Default 28. */
  size?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** Who is around: small avatars with an online dot each (people and bots), and "+N" for the rest. */
export function PresenceRow({ people, max = 6, onPress, size = 28, className, style }: PresenceRowProps) {
  const web = Platform.OS === 'web';
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  const dot = Math.max(8, Math.round(size * 0.32));
  return (
    <View className={cn('flex-row flex-wrap items-center gap-2', className)} style={style} accessibilityRole="list">
      {shown.map((p) => (
        <Pressable
          key={p.id}
          onPress={onPress ? () => onPress(p.id) : undefined}
          disabled={!onPress}
          accessibilityRole={onPress ? 'button' : undefined}
          accessibilityLabel={`${p.name}, ${p.agent ? 'bot, ' : ''}${p.online ? 'online' : 'offline'}`}
          className={cn('relative', onPress && web && 'cursor-pointer', !p.online && 'opacity-60')}
          style={{ width: size, height: size }}
        >
          {p.agent ? <AgentMark size={size} accessibilityLabel={p.name} /> : <Avatar seed={p.avatar?.seed ?? p.id} size={size} label={p.name.slice(0, 1)} />}
          <View className="absolute -bottom-px -right-px rounded-full border-2 border-pane" style={{ width: dot + 4, height: dot + 4 }}>
            <StatusDot tone={p.online ? 'success' : 'neutral'} size={dot} glow={p.online} />
          </View>
        </Pressable>
      ))}
      {rest > 0 ? (
        <View className="items-center justify-center rounded-full border border-overlay/10 bg-overlay/[0.06]" style={{ width: size, height: size }} accessibilityLabel={`${rest} more`}>
          <Text variant="micro" weight="bold" tone="muted">
            +{rest}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
