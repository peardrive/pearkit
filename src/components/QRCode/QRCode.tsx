import React, { useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import qrcode from 'qrcode-generator';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';

export interface QRCodeProps {
  /** Text / URL to encode. */
  value: string;
  /** Outer size in px. Default 108. */
  size?: number;
  /** Quiet zone inside the tile, in px. Default 8. */
  padding?: number;
  /** Tile corner radius. Default 12. */
  radius?: number;
  /** Error correction level. Default `M`. */
  errorCorrection?: 'L' | 'M' | 'Q' | 'H';
  /** Override colours (default: `qr-foreground` on `qr-background`). */
  color?: string;
  backgroundColor?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** QR code rendered as a single SVG path — pure JS, works everywhere. */
export function QRCode({ value, size = 108, padding = 8, radius = 12, errorCorrection = 'M', color, backgroundColor, className, style, accessibilityLabel }: QRCodeProps) {
  const theme = useTheme();
  const { d, count } = useMemo(() => {
    const qr = qrcode(0, errorCorrection);
    qr.addData(value);
    qr.make();
    const n = qr.getModuleCount();
    let path = '';
    // Merge horizontal runs of dark modules into one rect each — fewer nodes, no hairline seams.
    for (let r = 0; r < n; r++) {
      let c = 0;
      while (c < n) {
        if (!qr.isDark(r, c)) { c++; continue; }
        let run = 1;
        while (c + run < n && qr.isDark(r, c + run)) run++;
        path += `M${c} ${r}h${run}v1h-${run}z`;
        c += run;
      }
    }
    return { d: path, count: n };
  }, [value, errorCorrection]);

  const inner = size - padding * 2;
  const bg = backgroundColor ?? theme.colors['qr-background'];
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? 'QR code'}
      className={cn('items-center justify-center overflow-hidden', className)}
      style={[{ width: size, height: size, borderRadius: radius, backgroundColor: bg }, style]}
    >
      <Svg width={inner} height={inner} viewBox={`0 0 ${count} ${count}`} {...({ shapeRendering: 'crispEdges' } as object)}>
        <Rect x={0} y={0} width={count} height={count} fill={bg} />
        <Path d={d} fill={color ?? theme.colors['qr-foreground']} />
      </Svg>
    </View>
  );
}
