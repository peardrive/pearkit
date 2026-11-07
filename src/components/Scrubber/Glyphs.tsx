import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import type { ColorToken } from '../../theme/tokens';
import { PIN, PLAYHEAD, pinBallCenterY, playheadCapPath } from './timeGlyphs';

export interface PlayheadProps {
  /** Horizontal position in the parent, px. */
  x: number;
  /** How far down the line runs from the parent's top, px. */
  height: number;
  /** Colour token. Default `playhead`. */
  tone?: ColorToken;
  /** Any colour; wins over `tone`. */
  color?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The playhead: a 2px line with a little house on top. Absolutely positioned; put it in a
 * `relative` parent after the content it should sit over.
 */
export function Playhead({ x, height, tone = 'playhead', color, className, style }: PlayheadProps) {
  const theme = useTheme();
  const c = color ?? theme.colors[tone];
  const w = PLAYHEAD.capWidth;
  return (
    <View
      pointerEvents="none"
      className={cn('absolute top-0', className)}
      style={[{ left: x - w / 2, width: w, height }, style]}
    >
      <View style={{ position: 'absolute', left: (w - PLAYHEAD.lineWidth) / 2, top: 0, bottom: 0, width: PLAYHEAD.lineWidth, backgroundColor: c }} />
      <Svg width={w} height={PLAYHEAD.capHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Path d={playheadCapPath(w / 2, 0)} fill={c} />
      </Svg>
    </View>
  );
}

export interface InOutPinProps {
  /** Horizontal position in the parent, px. */
  x: number;
  /** Height of the strip the line runs through; the ball hangs below it. */
  height: number;
  /** Hovered or held. */
  lit?: boolean;
  /** Colour token of the line and ball. Default `overlay` (white on a dark theme). */
  tone?: ColorToken;
  /** Colour token of the ball's outline. Default `inset`. */
  outlineTone?: ColorToken;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * An in or out pin: a thin line through the strip with a ball under it — the ball is what you grab.
 * Absolutely positioned, drawn only; the `Scrubber` owns the gesture.
 */
export function InOutPin({ x, height, lit, tone = 'overlay', outlineTone = 'inset', className, style }: InOutPinProps) {
  const theme = useTheme();
  const c = theme.colors[tone], o = theme.colors[outlineTone];
  const r = lit ? PIN.ballRadiusLit : PIN.ballRadius;
  const box = PIN.ballRadiusLit * 2 + 2;
  return (
    <View
      pointerEvents="none"
      className={cn('absolute top-0', className)}
      style={[{ left: x - box / 2, width: box, height: height + PIN.drop + PIN.ballRadius * 2 }, style]}
    >
      <View style={{ position: 'absolute', left: (box - PIN.lineWidth) / 2, top: 0, height: height + PIN.drop, width: PIN.lineWidth, backgroundColor: c }} />
      <View
        style={{
          position: 'absolute',
          left: box / 2 - r,
          top: pinBallCenterY(height) - r,
          width: r * 2,
          height: r * 2,
          borderRadius: r,
          backgroundColor: c,
          borderWidth: 1,
          borderColor: o,
        }}
      />
    </View>
  );
}
