import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';
import { Icon } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { EmptyState } from '../EmptyState/EmptyState';

/**
 * The camera, as a QR reader, with the frame around it: the counterpart of `QRCode`. A phone app shows one to
 * join what another device shows as a code (a Space, a project, a login). The camera itself is `expo-camera`,
 * an optional peer: where it is not installed (the web, Storybook, a desktop) the scanner says so and offers the
 * paste button instead, so the screen around it stays one screen on every platform.
 */
export interface QRScannerProps {
  /** Called with the code's text once `accept` says it is one of ours. Scanning pauses until `active` goes false and true again, or the key changes. */
  onScan: (data: string) => void;
  /** Which codes count. Default: any. A code that is refused keeps the scanner open. */
  accept?: (data: string) => boolean;
  /** Scan while true. Default true. */
  active?: boolean;
  /** What to tell the person. */
  title?: string;
  description?: string;
  /** The paste alternative under the frame; absent, no paste button. */
  onPaste?: () => void;
  pasteLabel?: string;
  /** A close button in the corner of the frame. */
  onClose?: () => void;
  /** The camera to use. Default `back`. */
  facing?: 'back' | 'front';
  /** Width : height of the frame. Default 1 (square). */
  aspectRatio?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

type CameraModule = {
  CameraView: React.ComponentType<any>;
  useCameraPermissions: () => [{ granted: boolean; canAskAgain?: boolean } | null, () => Promise<{ granted: boolean }>];
};
let camera: CameraModule | null | undefined;
function loadCamera(): CameraModule | null {
  if (camera !== undefined) return camera;
  if (Platform.OS === 'web') { camera = null; return camera; }
  let found: CameraModule | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('expo-camera');
    found = mod?.CameraView && mod?.useCameraPermissions ? (mod as CameraModule) : null;
  } catch {
    found = null;
  }
  camera = found;
  return found;
}

export function QRScanner(props: QRScannerProps) {
  const cam = loadCamera();
  return cam ? <WithCamera cam={cam} {...props} /> : <NoCamera {...props} />;
}

function Frame({ aspectRatio = 1, className, style, onClose, children }: Pick<QRScannerProps, 'aspectRatio' | 'className' | 'style' | 'onClose'> & { children: React.ReactNode }) {
  return (
    <View className={cn('overflow-hidden rounded-2xl bg-inset', className)} style={[{ aspectRatio }, style]}>
      {children}
      {onClose ? (
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close the scanner" className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-black/50">
          <Icon name="close" size={18} color="#ffffff" />
        </Pressable>
      ) : null}
    </View>
  );
}

function Caption({ title, description, onPaste, pasteLabel = 'Paste a code instead' }: Pick<QRScannerProps, 'title' | 'description' | 'onPaste' | 'pasteLabel'>) {
  if (!title && !description && !onPaste) return null;
  return (
    <View className="items-center gap-2 pt-3">
      {title ? <Text variant="body" weight="semibold">{title}</Text> : null}
      {description ? <Text variant="caption" tone="muted" className="text-center">{description}</Text> : null}
      {onPaste ? <Button variant="subtle" size="sm" label={pasteLabel} onPress={onPaste} /> : null}
    </View>
  );
}

function WithCamera({ cam, onScan, accept, active = true, title, description, onPaste, pasteLabel, onClose, facing = 'back', aspectRatio, className, style }: QRScannerProps & { cam: CameraModule }) {
  const { CameraView, useCameraPermissions } = cam;
  const [perm, ask] = useCameraPermissions();
  const [asked, setAsked] = useState(false);
  const taken = useRef(false);
  useEffect(() => { taken.current = false; }, [active]);
  useEffect(() => { if (perm && !perm.granted && !asked) { setAsked(true); ask().catch(() => {}); } }, [perm, asked, ask]);
  const onBarcode = useCallback((e: { data: string }) => {
    if (!active || taken.current) return;
    const data = String(e?.data || '');
    if (accept && !accept(data)) return;
    taken.current = true;
    onScan(data);
  }, [active, accept, onScan]);
  if (perm && !perm.granted) {
    return (
      <View className={className} style={style}>
        <Frame aspectRatio={aspectRatio} onClose={onClose}>
          <View className="flex-1 items-center justify-center px-6">
            <EmptyState icon="scan-barcode" title="The camera is off for this app" description={perm.canAskAgain === false ? 'Allow the camera in Settings to scan a code.' : 'Allow the camera to scan a code.'} actions={perm.canAskAgain === false ? undefined : <Button variant="secondary" size="sm" label="Allow the camera" onPress={() => ask().catch(() => {})} />} />
          </View>
        </Frame>
        <Caption title={title} description={description} onPaste={onPaste} pasteLabel={pasteLabel} />
      </View>
    );
  }
  return (
    <View className={className} style={style}>
      <Frame aspectRatio={aspectRatio} onClose={onClose}>
        {perm?.granted ? <CameraView style={{ flex: 1 }} facing={facing} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={active ? onBarcode : undefined} /> : <View className="flex-1" />}
        <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
          <View className="h-[62%] w-[62%] rounded-2xl border-2 border-white/70" />
        </View>
      </Frame>
      <Caption title={title} description={description} onPaste={onPaste} pasteLabel={pasteLabel} />
    </View>
  );
}

function NoCamera({ title, description, onPaste, pasteLabel = 'Paste a code', onClose, aspectRatio, className, style }: QRScannerProps) {
  return (
    <View className={className} style={style}>
      <Frame aspectRatio={aspectRatio} onClose={onClose}>
        <View className="flex-1 items-center justify-center px-6">
          <EmptyState icon="scan-barcode" title="No camera here" description="Scanning needs a phone. Paste the code instead." actions={onPaste ? <Button variant="secondary" size="sm" label={pasteLabel} onPress={onPaste} /> : undefined} />
        </View>
      </Frame>
      <Caption title={title} description={description} />
    </View>
  );
}
