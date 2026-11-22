import React from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { StatusDot } from '../Status/StatusDot';
import { Text } from '../Text/Text';
import { syncStateMeta, type SyncState } from './syncState';

export * from './syncState';

export interface SyncBubbleProps {
  state: SyncState;
  /** The words. Default: the state's own (`syncStateMeta`). */
  label?: string;
  /** A second, quieter line or phrase: "2 of 3 files", "open rKeyChat on the Mac". */
  detail?: string;
  /** Pressing dismisses (or opens the thing): the whole bubble is the target. */
  onPress?: () => void;
  /**
   * Float it: an absolute wrapper at the bottom of the nearest positioned parent, centred, this far from the
   * bottom (px or a CSS length on the web, e.g. `calc(64px + env(safe-area-inset-bottom))`). Without it the bubble
   * is laid out in place.
   */
  offset?: number | string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A small pill that says where something stands with the other device: a breathing dot while it waits or sends,
 * a glowing one when it has arrived. The Toast is for the app's own news; this is for one item's sync, shown right
 * where the item was made (the bottom of the screen, above the composer or the dock) and gone once it is settled.
 */
export function SyncBubble({ state, label, detail, onPress, offset, className, style }: SyncBubbleProps) {
  const meta = syncStateMeta[state];
  const words = label ?? meta.label;
  const bubble = (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={detail ? `${words}, ${detail}` : words}
      accessibilityLiveRegion="polite"
      disabled={!onPress}
      onPress={onPress}
      className={cn(
        'max-w-full flex-row items-center gap-2 self-center rounded-full border border-overlay/10 bg-pane py-1.5 pl-3 pr-3.5',
        Platform.OS === 'web' && (onPress ? 'cursor-pointer select-none' : 'cursor-default'),
        className,
      )}
      style={[{ maxWidth: 360, boxShadow: '0px 8px 24px 0px rgba(0,0,0,0.4)' } as ViewStyle, style]}
      {...({ dataSet: { debugIgnore: '', syncState: state } } as object)}
    >
      <StatusDot tone={meta.tone} size={7} pulse={meta.pulse} glow={meta.glow} />
      <View className="min-w-0 flex-row items-baseline gap-1.5">
        <Text variant="caption" weight="semibold" numberOfLines={1}>
          {words}
        </Text>
        {detail ? (
          <Text variant="micro" tone="muted" numberOfLines={1} className="shrink">
            {detail}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
  if (offset === undefined) return bubble;
  return (
    <View pointerEvents="box-none" className="absolute inset-x-0 bottom-0 z-20 items-center px-4" style={{ paddingBottom: offset } as ViewStyle}>
      {bubble}
    </View>
  );
}
