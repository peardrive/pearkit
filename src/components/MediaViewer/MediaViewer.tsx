import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Image, Modal, Platform, View } from 'react-native';
import { vars } from 'nativewind';
import { themeToCssVariables, useTheme } from '../../theme';
import { attachmentKind, viewableAttachments } from '../Chat/attachmentsLogic';
import type { ChatAttachment } from '../Chat/types';
import { MediaNotice } from '../MediaNotice/MediaNotice';
import { MediaPlayer } from '../MediaPlayer/MediaPlayer';
import type { MediaEngine, PlayerKind, PlayerSettings } from '../MediaPlayer/playerLogic';
import { WebAudio, WebVideo, useWebMedia } from '../MediaPlayer/web/WebMedia';
import { Button } from '../Button/Button';

export interface MediaViewerProps {
  open: boolean;
  /** Every attachment of the conversation (or the message): the viewer pages through the pictures, videos and sounds among them. */
  items: ChatAttachment[];
  /** The attachment to show, as its index in `items`. */
  index: number;
  onIndexChange?: (index: number) => void;
  onClose: () => void;
  /** The share button: hand the file to another app, save it, copy its link. Without it the button is left out of the words. */
  onShare?: (item: ChatAttachment) => void;
  shareLabel?: string;
  /** Loop and orientation, kept by the app; defaults are fine for a chat. */
  settings?: PlayerSettings;
  onSettingsChange?: (change: Partial<PlayerSettings>) => void;
  /**
   * A native app's own picture for a video or sound (expo-video, libVLC…) and the engine that drives it. On the web
   * the viewer brings its own (`<video>`, `<audio>`). Without either, a video or sound says it cannot be shown here.
   */
  renderMedia?: (item: ChatAttachment, kind: PlayerKind) => { picture: ReactNode; engine: MediaEngine | null } | null;
  insets?: { top: number; bottom: number; left: number; right: number };
}

const DEFAULT_SETTINGS: PlayerSettings = { loop: false, rotation: 'auto' };
const web = Platform.OS === 'web';

/**
 * The viewer: one attachment on a dark full-screen layer, with the shared MediaPlayer's controls (close, share,
 * next and previous by swipe or key), the same on the desktop, the phone and the web. A picture is shown as it is;
 * a video or sound plays through the player's engine; anything else says it cannot be shown here and offers the
 * share button, so the person always has a way out.
 */
export function MediaViewer({ open, items, index, onIndexChange, onClose, onShare, shareLabel, settings, onSettingsChange, renderMedia, insets }: MediaViewerProps) {
  const theme = useTheme();
  const themeVars = useMemo(() => vars(themeToCssVariables(theme)), [theme]);
  const [own, setOwn] = useState<PlayerSettings>(DEFAULT_SETTINGS);
  const [enterFrom, setEnterFrom] = useState<'left' | 'right' | null>(null);
  const { engine: webEngine, attach } = useWebMedia();

  const pages = useMemo(() => viewableAttachments(items), [items]);
  const at = pages.findIndex((p) => p.index === index);
  const current = items[index] ?? null;
  const kindOf = current ? attachmentKind(current) : 'file';
  const playerKind: PlayerKind | null = kindOf === 'image' || kindOf === 'video' || kindOf === 'audio' ? kindOf : null;

  const go = useCallback(
    (step: 1 | -1) => {
      if (at < 0) return;
      const next = pages[at + step];
      if (!next) return;
      setEnterFrom(step > 0 ? 'right' : 'left');
      onIndexChange?.(next.index);
    },
    [at, pages, onIndexChange],
  );

  // keys on the web: arrows page, Escape closes
  useEffect(() => {
    if (!open || !web || typeof window === 'undefined') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, go]);

  if (!open || !current) return null;
  const settingsNow = settings ?? own;
  const change = (c: Partial<PlayerSettings>) => (onSettingsChange ? onSettingsChange(c) : setOwn((s) => ({ ...s, ...c })));
  const hasNext = at >= 0 && at < pages.length - 1;
  const hasPrevious = at > 0;

  let picture: ReactNode = null;
  let engine: MediaEngine | null = null;
  let shown = false;
  if (playerKind === 'image' && current.url) {
    picture = <Image source={{ uri: current.url }} resizeMode="contain" style={{ flex: 1, width: '100%', height: '100%' }} accessibilityLabel={current.name} accessibilityIgnoresInvertColors />;
    shown = true;
  } else if (playerKind && current.url) {
    const own = renderMedia?.(current, playerKind);
    if (own) {
      picture = own.picture;
      engine = own.engine;
      shown = true;
    } else if (web) {
      picture = playerKind === 'video' ? <WebVideo key={current.url} src={current.url} attach={attach} /> : <WebAudio key={current.url} src={current.url} attach={attach} />;
      engine = webEngine;
      shown = true;
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black" style={themeVars} accessibilityViewIsModal accessibilityLabel={`Viewing ${current.name}`}>
        {shown && playerKind ? (
          <MediaPlayer
            key={`${current.url}-${index}`}
            kind={playerKind}
            title={current.name}
            engine={engine}
            settings={settingsNow}
            onSettingsChange={change}
            onClose={onClose}
            onShare={() => onShare?.(current)}
            shareLabel={shareLabel}
            onNext={hasNext ? () => go(1) : undefined}
            onPrevious={hasPrevious ? () => go(-1) : undefined}
            enterFrom={enterFrom}
            insets={insets}
          >
            {picture}
          </MediaPlayer>
        ) : (
          <View className="flex-1 items-center justify-center p-6" style={{ paddingTop: (insets?.top ?? 0) + 24 }}>
            <MediaNotice kind="custom" icon="document" tone="neutral" title={current.name} description={playerKind ? 'This file cannot be shown here.' : 'This kind of file has no viewer here.'} />
            <View className="flex-row gap-2 pt-4">
              {onShare ? <Button size="sm" variant="primary" icon="export" label={shareLabel ?? 'Share'} onPress={() => onShare(current)} /> : null}
              <Button size="sm" variant="secondary" label="Close" onPress={onClose} />
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
