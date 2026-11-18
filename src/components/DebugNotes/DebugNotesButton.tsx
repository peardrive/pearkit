import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { Text } from '../Text/Text';
import type { DebugNotes, StoppedNote } from '../../debug';

/* ───────────────────────── useDebugNotes ───────────────────────── */

export interface DebugNotesState {
  /** A note is running. */
  active: boolean;
  /** The running note records a voice (false: steps only). */
  audio: boolean;
  seconds: number;
  steps: number;
  /** Why the voice is not being recorded, when it is not. */
  error: string | null;
}

/** The live state of a `DebugNotes` instance: re-renders on start, stop, every step, and the clock. */
export function useDebugNotes(notes: DebugNotes): DebugNotesState {
  const read = useCallback(
    (): DebugNotesState => ({ active: notes.trace.active, audio: notes.trace.audio, seconds: notes.trace.seconds, steps: notes.trace.steps, error: notes.recorder.error }),
    [notes],
  );
  const [state, setState] = useState<DebugNotesState>(read);
  useEffect(() => {
    const sync = () => setState(read());
    sync();
    const off = notes.trace.onChange(sync);
    const tick = setInterval(() => {
      if (notes.trace.active) sync();
    }, 500);
    return () => {
      off();
      clearInterval(tick);
    };
  }, [notes, read]);
  return state;
}

/* ───────────────────────── useMicLevel ───────────────────────── */

const SHAPE = [0.3, 0.7, 1, 0.7, 0.3]; // a little waveform, not a meter: the middle swings most
const GAIN = 9;
const ATTACK = 0.6;
const RELEASE = 0.12; // speech fills the bars; the fall is slower than the rise

/**
 * Five bar heights (0–1) following the voice going into `stream`. Web / Electron
 * only (AudioContext); elsewhere, or without a stream, every bar is 0.
 */
export function useMicLevel(stream: MediaStream | null): number[] {
  const [bars, setBars] = useState<number[]>(() => SHAPE.map(() => 0));
  useEffect(() => {
    if (!stream || typeof AudioContext === 'undefined' || typeof requestAnimationFrame === 'undefined') {
      setBars(SHAPE.map(() => 0));
      return;
    }
    let ctx: AudioContext | null = null;
    let raf = 0;
    let shown = 0;
    try {
      ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      const buf = new Uint8Array(analyser.fftSize);
      ctx.createMediaStreamSource(stream).connect(analyser); // no destination: never played back
      const tick = () => {
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i]! - 128) / 128;
          sum += v * v;
        }
        const level = Math.min(1, Math.sqrt(sum / buf.length) * GAIN);
        shown += (level - shown) * (level > shown ? ATTACK : RELEASE);
        setBars(SHAPE.map((s) => Math.round(shown * s * 100) / 100));
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } catch {
      setBars(SHAPE.map(() => 0));
    }
    return () => {
      cancelAnimationFrame(raf);
      ctx?.close().catch(() => {});
    };
  }, [stream]);
  return bars;
}

/* ───────────────────────── DebugNotesButton ───────────────────────── */

export interface DebugNotesButtonProps {
  notes: DebugNotes;
  /**
   * `expanded` (default, pearcast's title-bar button): mic and label when idle; recording shows the five-bar level and
   * `m:ss · steps`. `compact`, for a phone or a crowded bar: a round mic when idle; recording, a red circle with
   * three bars and nothing else. The time and step count stay in the accessibility label.
   */
  variant?: 'expanded' | 'compact';
  /** The idle label (expanded only). Default "Debug notes". */
  label?: string;
  /** Pressed while idle: show a dialog (pick the mic, see a refusal before talking) instead of starting at once. */
  onIdleClick?: () => void | Promise<void>;
  /** The note was stopped and saved. */
  onStopped?: (saved: StoppedNote | null) => void;
  size?: 'sm' | 'md';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const COMPACT_BARS = [1, 2, 3]; // the middle three of the five: the centre swings most
const COMPACT_REST = [5, 8, 5]; // at rest the three bars keep a waveform's shape, so silence never reads as "more" (•••)

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/**
 * The debug-notes button: a mic when idle; while a note records, red, with a
 * five-bar level following the voice and the clock — nothing else (Guy, memo
 * 2026-10-22: "it should never actually show recording … the red and the
 * counting is enough"). Grey instead of red when the note runs without a
 * microphone. Press to start, press again to stop and save. The look is
 * pearcast's title-bar button (hairline ring idle, red ring and glow recording);
 * `variant="compact"` is the same button reduced to the mic and the indicator.
 */
export function DebugNotesButton({ notes, variant = 'expanded', label = 'Debug notes', onIdleClick, onStopped, size = 'sm', className, style }: DebugNotesButtonProps) {
  const s = useDebugNotes(notes);
  const silent = s.active && !s.audio;
  const recording = s.active && !silent;
  const compact = variant === 'compact';
  const level = useMicLevel(recording ? notes.recorder.stream : null);
  const bars = compact ? COMPACT_BARS.map((i) => level[i]!) : level;
  const busy = useRef(false);
  const [, bump] = useState(0);
  const [hovered, setHovered] = useState(false); // pearcast: the idle label brightens under the pointer

  const press = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      if (notes.trace.active) onStopped?.(await notes.trace.stop());
      else if (onIdleClick) await onIdleClick();
      else await notes.trace.start();
    } finally {
      busy.current = false;
      bump((n) => n + 1);
    }
  }, [notes, onIdleClick, onStopped]);

  const hint = s.active
    ? silent
      ? `No microphone (${s.error || 'refused'}): this note keeps your steps only. Press to stop.`
      : 'Recording a debug note. Press to stop and save.'
    : 'Record a debug note: talk, and keep using the app';
  const box = compact ? (size === 'md' ? 'h-8 w-8 justify-center' : 'h-7 w-7 justify-center') : size === 'md' ? 'h-8 pl-2.5 pr-3' : 'h-7 pl-2 pr-2.5';
  const barMax = compact ? 8 : 15;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={s.active ? `Stop the debug note (${clock(s.seconds)}, ${s.steps} steps)` : 'Start a debug note'}
      accessibilityHint={hint}
      accessibilityState={{ selected: s.active }}
      onPress={press}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      className={cn(
        'flex-row items-center gap-1.5 self-start rounded-full border',
        box,
        Platform.OS === 'web' && 'cursor-pointer select-none app-region-no-drag',
        !s.active && 'border-overlay/[0.08] bg-overlay/[0.06] hover:bg-overlay/10 active:bg-overlay/[0.14]',
        recording && 'border-danger/50 bg-danger',
        silent && 'border-overlay/25 bg-neutral',
        className,
      )}
      style={[recording ? ({ boxShadow: '0 0 18px -4px rgb(var(--pk-danger))' } as ViewStyle) : null, style]}
      // The capture never writes this button's own presses into the trace.
      {...({ dataSet: { debugIgnore: '' } } as object)}
    >
      {recording ? (
        <View className="h-[18px] flex-row items-center gap-[2px]" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {bars.map((lvl, i) => (
            <View key={i} className="w-[3px] rounded-[2px] bg-danger-foreground" style={{ height: (compact ? COMPACT_REST[i]! : 3) + lvl * barMax }} />
          ))}
        </View>
      ) : (
        <Icon
          name={silent ? 'microphone-slash' : 'microphone'}
          size={compact ? 14 : 13}
          tone={silent ? 'danger-foreground' : hovered ? 'foreground' : 'icon-strong'}
          style={silent ? { opacity: 0.5 } : undefined}
        />
      )}
      {compact ? null : s.active ? (
        <Text variant="label" weight="semibold" tone="danger-foreground" style={{ fontVariant: ['tabular-nums'] }}>
          {clock(s.seconds)} · {s.steps}
        </Text>
      ) : (
        <Text variant="label" weight="semibold" tone={hovered ? 'foreground' : 'muted'}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
