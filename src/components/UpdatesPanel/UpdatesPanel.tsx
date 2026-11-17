import React, { useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

/** One version on the update channel. */
export interface UpdateVersion {
  /** The release's id on the channel. */
  id: string;
  /** e.g. "0.1.4". */
  version: string;
  /** When it was published, in milliseconds. */
  at: number;
  /** The installer's size in bytes. */
  size?: number | null;
  notes?: string;
  build?: string;
}

/** A version in full, for the release window. */
export interface UpdateRelease extends UpdateVersion {
  /** The installer's file name. */
  file?: string;
  /** Does the signature belong to the channel's publisher? */
  verified?: boolean;
  /** The key that signed it. */
  signedBy?: string;
  contentHash?: string;
  /** The signed release exactly as it was published. */
  raw?: unknown;
}

/**
 * Where the channel stands:
 * `starting` the app's network is not up yet · `no-channel` none is set · `connecting` joining it ·
 * `up-to-date` · `available` a newer version waits · `downloading` · `installing` · `none-posted` the channel has
 * nothing for this computer.
 */
export type UpdatesStatus = 'starting' | 'no-channel' | 'connecting' | 'up-to-date' | 'available' | 'downloading' | 'installing' | 'none-posted';

export interface UpdatesPanelProps {
  /** The app's name, for the release window ("Pearkit Studio 0.1.4"). */
  appName: string;
  /** The version this copy is running. Its row in the list reads "Your version". */
  running: string;
  status: UpdatesStatus;
  /** The newest version on the channel. */
  latest?: string;
  /** How many versions this copy is behind (shown as a tag beside "Latest"). */
  behind?: number;
  /** 0–1 while downloading, when known. */
  progress?: number;
  /** Why the last try failed. Shown with "Try again". */
  error?: string | null;
  /** False where this copy cannot swap itself (run from source, a command line): the buttons are disabled. */
  canInstall?: boolean;
  /** Every installable version for this computer, newest first. */
  versions?: UpdateVersion[];
  /** Behind "Advanced": where updates come from. */
  channel?: { name?: string; publisher?: string };
  /** Ask the channel again. */
  onCheck?: () => void;
  /** Install the newest version (no id) or a chosen one. */
  onInstall?: (id?: string) => void;
  /** The release window asks for the version in full (signature, file, hash). Without it the list's own data is shown. */
  loadRelease?: (id: string) => Promise<UpdateRelease | null | undefined>;
  /** Copy to the clipboard (the app owns the clipboard). Without it the copy buttons are left out. */
  onCopy?: (text: string) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const MONO: TextStyle = { fontFamily: Platform.select({ web: '"JetBrains Mono", ui-monospace, Menlo, monospace', ios: 'Menlo', default: 'monospace' }) };

/** "3d ago", as PearDrive writes it. */
export function updateAge(at: number, now = Date.now()): string {
  if (!at) return 'never';
  const s = (now - at) / 1000;
  if (s < 90) return 'just now';
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

const bytes = (n?: number | null) => {
  if (n == null) return '';
  if (n < 1024) return `${n} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let i = -1;
  do {
    n /= 1024;
    i++;
  } while (n >= 1024 && i < units.length - 1);
  return `${n.toFixed(n >= 100 ? 0 : 1)} ${units[i]}`;
};
const middle = (s: string, head = 10, tail = 6) => (s.length <= head + tail + 1 ? s : `${s.slice(0, head)}…${s.slice(-tail)}`);

/** One line: the label on the left, the answer on the right, an optional button after it. */
function Row({ label, tag, children, extra }: { label: string; tag?: string | null; children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <View className="min-h-[34px] flex-row items-center gap-2">
      <View className="min-w-[92px] flex-row items-center gap-1.5">
        <Text variant="label" tone="muted">
          {label}
        </Text>
        {tag ? (
          <View className="rounded-full bg-primary/[0.14] px-1.5 py-[3px]">
            <Text variant="micro" weight="bold" tone="primary-text" className="leading-[11px]">
              {tag}
            </Text>
          </View>
        ) : null}
      </View>
      <View className="min-w-0 flex-1 flex-row items-center justify-end">{children}</View>
      {extra}
    </View>
  );
}

/**
 * The Updates block of an app's settings: the newest version and its button on one line with "check" beside it;
 * every version in a framed list, yours marked, the newest with the bright Install; where updates come from behind
 * "Advanced"; a version's notes and signature in a window over the page. PearDrive's layout, so every app's
 * updates read the same. The app's update channel drives it; this only shows it.
 */
export function UpdatesPanel({ appName, running, status, latest, behind, progress, error, canInstall = true, versions = [], channel, onCheck, onInstall, loadRelease, onCopy, className, style }: UpdatesPanelProps) {
  const [advanced, setAdvanced] = useState(false);
  const [open, setOpen] = useState<UpdateRelease | null>(null);
  const list = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const mineAt = versions.findIndex((v) => v.version === running);

  const pct = progress == null ? null : Math.min(99, Math.round(Math.max(0, progress) * 100));
  const quiet = (text: string) => (
    <Text variant="label" tone="muted" numberOfLines={1}>
      {text}
    </Text>
  );
  const plain = (text: string) => (
    <Text variant="label" numberOfLines={1}>
      {text}
    </Text>
  );
  const answer =
    status === 'starting'
      ? quiet('Starting…')
      : status === 'no-channel'
        ? quiet('No update channel')
        : status === 'connecting'
          ? quiet('Connecting…')
          : status === 'installing'
            ? plain(`Installing ${latest ?? ''}…`)
            : status === 'downloading'
              ? plain(`Downloading ${latest ?? ''}${pct != null ? ` · ${pct}%` : '…'}`)
              : status === 'available'
                ? <Button size="sm" variant="primary" icon="import" label={`Update to ${latest ?? ''}`} disabled={!canInstall} onPress={() => onInstall?.()} />
                : status === 'up-to-date'
                  ? quiet("You're up to date")
                  : quiet('Nothing posted for this computer yet');

  const show = async (v: UpdateVersion) => {
    setOpen(v);
    try {
      const full = await loadRelease?.(v.id);
      if (full) setOpen((now) => (now?.id === v.id ? { ...v, ...full } : now));
    } catch {
      /* the list's own data stays in the window */
    }
  };

  return (
    <View className={cn('w-full', className)} style={style}>
      <Row label="Latest" tag={status === 'available' && behind && behind > 0 ? `${behind} behind` : null} extra={onCheck ? <IconButton icon="refresh" size="sm" tooltip="Check for a new version" onPress={onCheck} /> : null}>
        {answer}
      </Row>

      {error ? (
        <View className="flex-row items-center gap-2 pb-1.5 pt-0.5">
          <Text variant="label" tone="danger" className="min-w-0 flex-1">
            {error}
          </Text>
          <Button size="sm" variant="secondary" label="Try again" disabled={!canInstall} onPress={() => onInstall?.()} />
        </View>
      ) : null}

      {versions.length ? (
        <>
          <Text variant="overline" className="pb-1.5 pt-3">
            Versions
          </Text>
          <ScrollView ref={list} showsVerticalScrollIndicator={false} className="rounded-field border border-overlay/[0.08] bg-inset" style={{ maxHeight: 196, flexGrow: 0 }} contentContainerClassName="gap-0.5 p-1">
            {versions.map((v, i) => {
              const mine = v.version === running;
              const newest = i === 0 && !mine;
              return (
                <Pressable
                  key={v.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Release notes for ${v.version}`}
                  onPress={() => void show(v)}
                  className={cn('h-9 flex-row items-center gap-2.5 rounded-md pl-2.5 pr-1.5', mine ? 'bg-overlay/[0.09]' : 'hover:bg-overlay/[0.05]', Platform.OS === 'web' && 'cursor-pointer')}
                >
                  <Text variant="label" weight={mine ? 'bold' : 'semibold'} style={MONO}>
                    {v.version}
                  </Text>
                  <Text variant="label" tone="subtle" className="min-w-0 flex-1" numberOfLines={1}>
                    {updateAge(v.at)}
                  </Text>
                  {mine ? (
                    <Text variant="caption" weight="bold" tone="foreground" className="px-1.5">
                      Your version
                    </Text>
                  ) : (
                    <Button size="sm" variant={newest ? 'primary' : 'subtle'} label="Install" disabled={!canInstall} onPress={() => onInstall?.(v.id)} />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
          {versions.length > 5 && mineAt > 3 ? (
            <View className="items-center pt-1">
              <Button size="sm" variant="ghost" icon="arrow-down" label="Your version" onPress={() => list.current?.scrollTo({ y: mineAt * 38 - 4, animated: true })} />
            </View>
          ) : null}
        </>
      ) : null}

      {channel ? (
        <>
          <Pressable accessibilityRole="button" accessibilityState={{ expanded: advanced }} onPress={() => setAdvanced((a) => !a)} className={cn('flex-row items-center gap-1 self-start pb-1 pt-3', Platform.OS === 'web' && 'cursor-pointer')}>
            <View style={{ transform: [{ rotate: advanced ? '90deg' : '0deg' }] }}>
              <Icon name="chevron-right" size={13} tone="subtle" />
            </View>
            <Text variant="caption" weight="semibold" tone="subtle">
              Advanced
            </Text>
          </Pressable>
          {advanced ? (
            <>
              <Row label="Channel">{plain(channel.name || 'A Space')}</Row>
              <Row label="Publisher" extra={onCopy && channel.publisher ? <Button size="sm" variant="secondary" icon="copy" label="Copy" onPress={() => onCopy(channel.publisher!)} /> : null}>
                <Text variant="label" style={MONO} numberOfLines={1}>
                  {middle(channel.publisher || '')}
                </Text>
              </Row>
            </>
          ) : null}
        </>
      ) : null}

      <ReleaseDialog
        appName={appName}
        release={open}
        mine={!!open && open.version === running}
        canInstall={canInstall}
        onClose={() => setOpen(null)}
        onInstall={
          onInstall
            ? (id) => {
                setOpen(null);
                onInstall(id);
              }
            : undefined
        }
        onCopy={onCopy}
      />
    </View>
  );
}

export interface ReleaseDialogProps {
  appName: string;
  /** The version to show; null closes the window. */
  release: UpdateRelease | null;
  /** This is the version running here. */
  mine?: boolean;
  canInstall?: boolean;
  onClose: () => void;
  onInstall?: (id: string) => void;
  onCopy?: (text: string) => void;
}

/** A version's window: its notes in full, and the signature as a line that opens into the details. */
export function ReleaseDialog({ appName, release: r, mine, canInstall = true, onClose, onInstall, onCopy }: ReleaseDialogProps) {
  const [details, setDetails] = useState(false);
  const [raw, setRaw] = useState(false);
  const signed = r?.verified !== false;
  const knows = r?.verified != null;
  const copy = (text?: string) => (onCopy && text ? <IconButton icon="copy" size="xs" tooltip="Copy" onPress={() => onCopy(text)} /> : null);
  return (
    <Dialog open={!!r} onClose={onClose} width={520} hideCloseButton>
      {r ? (
        <View>
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
              <Icon name="import" size={20} tone="primary-text" />
            </View>
            <View className="min-w-0 flex-1">
              <Text variant="title" accessibilityRole="header">
                {appName} {r.version}
              </Text>
              <Text variant="caption" tone="muted">
                {[new Date(r.at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }), bytes(r.size), r.build ? `build ${r.build}` : ''].filter(Boolean).join(' · ')}
              </Text>
            </View>
            {mine ? (
              <Text variant="caption" weight="bold" tone="foreground" className="px-1.5">
                Your version
              </Text>
            ) : onInstall ? (
              <Button size="sm" variant="primary" icon="import" label="Install" disabled={!canInstall} onPress={() => onInstall(r.id)} />
            ) : null}
            <IconButton icon="close" size="sm" tooltip="Close" onPress={onClose} />
          </View>

          <Text variant="label" selectable className="border-b border-overlay/[0.08] py-3.5 leading-[18px]">
            {r.notes || 'No notes with this release.'}
          </Text>

          {knows ? (
            <View className="pt-3">
              <Pressable accessibilityRole="button" accessibilityState={{ expanded: details }} onPress={() => setDetails((d) => !d)} className={cn('flex-row items-center gap-2', Platform.OS === 'web' && 'cursor-pointer')}>
                <Icon name={signed ? 'tick' : 'info-circle'} size={16} tone={signed ? 'primary' : 'danger'} />
                <Text variant="label" weight="bold" className="min-w-0 flex-1">
                  {signed ? `Signed by the ${appName} publisher` : "Not signed by this channel's publisher"}
                </Text>
                <Text variant="caption" tone="muted">
                  {details ? 'Hide' : 'Details'}
                </Text>
              </Pressable>
              {details ? (
                <View className="pt-2">
                  <Row label="Signed by" extra={copy(r.signedBy)}>
                    <Text variant="label" style={MONO} numberOfLines={1}>
                      {middle(r.signedBy || '')}
                    </Text>
                  </Row>
                  <Row label="Signature">
                    <Text variant="label" tone={signed ? 'primary-text' : 'danger'}>
                      {signed ? 'checked' : 'does not match'}
                    </Text>
                  </Row>
                  <Row label="File">
                    <Text variant="label" style={MONO} numberOfLines={1}>
                      {r.file || ''}
                    </Text>
                  </Row>
                  <Row label="Content hash" extra={copy(r.contentHash)}>
                    <Text variant="label" style={MONO} numberOfLines={1}>
                      {middle(r.contentHash || '')}
                    </Text>
                  </Row>
                  {r.raw != null ? (
                    <>
                      <Pressable accessibilityRole="button" accessibilityState={{ expanded: raw }} onPress={() => setRaw((x) => !x)} className={cn('self-start pt-2', Platform.OS === 'web' && 'cursor-pointer')}>
                        <Text variant="caption" tone="muted">
                          {raw ? 'Hide the signed release' : 'The signed release, as published'}
                        </Text>
                      </Pressable>
                      {raw ? (
                        <ScrollView className="mt-2 rounded-md border border-overlay/[0.08] bg-inset" style={{ maxHeight: 260 }} contentContainerClassName="p-2.5">
                          <Text variant="micro" tone="muted" selectable style={[MONO, { lineHeight: 16 }]}>
                            {JSON.stringify(r.raw, null, 2)}
                          </Text>
                        </ScrollView>
                      ) : null}
                    </>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </Dialog>
  );
}
