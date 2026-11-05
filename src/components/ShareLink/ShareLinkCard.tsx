import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { copyToClipboard } from '../../utils/clipboard';
import type { IconSource } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { LinkField } from '../LinkField/LinkField';
import { QRCode } from '../QRCode/QRCode';
import { Text } from '../Text/Text';

export interface ShareLinkCardProps {
  /** The share link, e.g. `peardrop://1de09…`. */
  link: string;
  /** Encoded in the QR code. Defaults to `link`. */
  qrValue?: string;
  title?: string;
  description?: string;
  /** Called on copy. Without it the web clipboard is used. */
  onCopy?: (link: string) => void | Promise<void>;
  /** "Save QR" handler. Hide the button by passing `null` to `secondaryAction`. */
  onSaveQr?: () => void;
  copyLabel?: string;
  /** Override / hide the secondary button. */
  secondaryAction?: { label: string; icon?: IconSource; onPress?: () => void } | null;
  showQr?: boolean;
  qrSize?: number;
  /** `horizontal` (desktop) or `vertical` (mobile — QR on top). */
  layout?: 'horizontal' | 'vertical';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** QR code + copyable link + actions — everything needed to hand a share to someone. */
export function ShareLinkCard({
  link,
  qrValue,
  title = 'Share link',
  description = "Anyone with this link or QR can download while you're online",
  onCopy,
  onSaveQr,
  copyLabel = 'Copy Link',
  secondaryAction,
  showQr = true,
  qrSize = 108,
  layout = 'horizontal',
  className,
  style,
}: ShareLinkCardProps) {
  const copy = () => (onCopy ? onCopy(link) : copyToClipboard(link));
  const secondary = secondaryAction === undefined ? { label: 'Save QR', icon: 'import' as IconSource, onPress: onSaveQr } : secondaryAction;
  const vertical = layout === 'vertical';

  return (
    <Card className={cn(vertical ? 'items-center gap-4' : 'flex-row items-center gap-4', className)} style={style}>
      {showQr ? <QRCode value={qrValue ?? link} size={qrSize} accessibilityLabel={`QR code for ${title}`} /> : null}
      <View className={cn('min-w-0 gap-2.5', vertical ? 'w-full' : 'flex-1')}>
        <View className={cn('gap-0.5', vertical && 'items-center')}>
          <Text variant="body-lg" numberOfLines={1}>
            {title}
          </Text>
          {description ? (
            <Text variant="caption" tone="subtle" numberOfLines={vertical ? 2 : 1} className={vertical ? 'text-center' : undefined}>
              {description}
            </Text>
          ) : null}
        </View>
        <LinkField value={link} onCopy={onCopy} />
        <View className="w-full flex-row gap-2">
          <Button variant="primary" size="md" fill icon="copy" label={copyLabel} onPress={copy} />
          {secondary ? <Button variant="secondary" size="md" fill icon={secondary.icon} label={secondary.label} onPress={secondary.onPress} /> : null}
        </View>
      </View>
    </Card>
  );
}
