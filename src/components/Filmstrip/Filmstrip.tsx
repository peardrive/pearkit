import React from 'react';
import { Image, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import type { FilmstripFrame } from './filmstripCells';

export interface FilmstripProps {
  /** The frames, left to right. `null` entries show as empty cells until they arrive. */
  frames: ReadonlyArray<FilmstripFrame>;
  /** Height in px. Default 30. */
  height?: number;
  /** Corner radius. Default 6. */
  radius?: number;
  accessibilityLabel?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Frames of a clip edge to edge: what the trim strip shows for video. It only draws — how the frames
 * are made (a hidden video seeking on the desktop, a native thumbnailer on the phone) is the host's.
 */
export function Filmstrip({ frames, height = 30, radius = 6, accessibilityLabel, className, style }: FilmstripProps) {
  return (
    <View
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      className={cn('w-full flex-row overflow-hidden', className)}
      style={[{ height, borderRadius: radius }, style]}
    >
      {frames.map((f, i) => {
        const src = typeof f === 'string' ? { uri: f } : f ?? null;
        return src ? (
          <Image key={i} source={src} resizeMode="cover" className="h-full flex-1" style={{ minWidth: 0 }} accessibilityIgnoresInvertColors />
        ) : (
          <View key={i} className="h-full flex-1 bg-overlay/[0.06]" />
        );
      })}
    </View>
  );
}
