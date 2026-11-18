import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon } from '../../icons/Icon';
import type { IconName } from '../../icons/registry';
import { statusBg, type StatusTone } from '../../theme/tones';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Milliseconds before it goes on its own. Default 4000; `0` keeps it until dismissed. */
  duration?: number;
  /** One button on the toast. Pressing it dismisses the toast. */
  action?: { label: string; onPress: () => void };
}

export interface ToastContextValue {
  /** Show a toast; returns its id, for `dismiss`. */
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** `const { toast, dismiss } = useToast()`. Needs a `ToastProvider` above. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('[pearkit] useToast() needs a <ToastProvider> above it.');
  return ctx;
}

const toneIcon: Record<ToastTone, IconName | null> = {
  neutral: null,
  success: 'tick',
  warning: 'alert-circle',
  danger: 'alert-circle',
  info: 'info-circle',
};
const toneStatus: Record<Exclude<ToastTone, 'neutral'>, StatusTone> = { success: 'success', warning: 'warning', danger: 'danger', info: 'info' };

export interface ToastProps extends ToastOptions {
  onDismiss?: () => void;
  /** Hovering pauses the clock (web). */
  onHoverChange?: (hovering: boolean) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** One toast as it looks: a tinted bar, an icon for the tone, the words, an action and ✕. `ToastProvider` stacks these. */
export function Toast({ title, description, tone = 'neutral', action, onDismiss, onHoverChange, className, style }: ToastProps) {
  const icon = toneIcon[tone];
  const status = tone === 'neutral' ? null : toneStatus[tone];
  return (
    <Pressable
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      onHoverIn={onHoverChange ? () => onHoverChange(true) : undefined}
      onHoverOut={onHoverChange ? () => onHoverChange(false) : undefined}
      className={cn('w-full flex-row items-stretch overflow-hidden rounded-lg border border-overlay/10 bg-pane', Platform.OS === 'web' && 'cursor-default', className)}
      style={[{ maxWidth: 420, boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.45)' } as ViewStyle, style]}
    >
      {status ? <View className={cn('w-1', statusBg[status])} /> : null}
      <View className="min-w-0 flex-1 flex-row items-start gap-2.5 py-2.5 pl-3 pr-2">
        {icon && status ? <View className="pt-px">{renderIcon(icon, { size: 16, tone: status })}</View> : null}
        <View className="min-w-0 flex-1 gap-0.5 pt-px">
          <Text variant="body-sm" weight="semibold">{title}</Text>
          {description ? (
            <Text variant="caption" tone="muted" className="leading-[16px]">
              {description}
            </Text>
          ) : null}
        </View>
        {action ? <Button size="sm" variant="subtle" label={action.label} onPress={() => { action.onPress(); onDismiss?.(); }} className="-my-0.5" /> : null}
        {onDismiss ? <IconButton icon="close" size="xs" accessibilityLabel="Dismiss" onPress={onDismiss} className="-my-px" /> : null}
      </View>
    </Pressable>
  );
}

interface Shown extends ToastOptions {
  id: string;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Default time on screen, in ms, for toasts that name none. Default 4000. */
  duration?: number;
  /** How many show at once; older ones go first. Default 3. */
  max?: number;
  /** Distance from the bottom, in px (above a composer or a tab bar). Default 16. */
  offset?: number;
  className?: string;
}

let counter = 0;

/** Wrap the app once. Toasts stack at the bottom centre; `useToast()` anywhere below shows one. */
export function ToastProvider({ children, duration: defaultDuration = 4000, max = 3, offset = 16, className }: ToastProviderProps) {
  const [shown, setShown] = useState<Shown[]>([]);
  const timers = useRef(new Map<string, { handle: ReturnType<typeof setTimeout> | null; left: number; since: number }>());

  const dismiss = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t?.handle) clearTimeout(t.handle);
    timers.current.delete(id);
    setShown((all) => all.filter((s) => s.id !== id));
  }, []);

  const start = useCallback((id: string, ms: number) => {
    const entry = timers.current.get(id) ?? { handle: null, left: ms, since: Date.now() };
    entry.left = ms;
    entry.since = Date.now();
    entry.handle = setTimeout(() => dismiss(id), ms);
    timers.current.set(id, entry);
  }, [dismiss]);

  const toast = useCallback((options: ToastOptions) => {
    const id = `toast-${++counter}`;
    setShown((all) => [...all, { ...options, id }].slice(-max));
    const ms = options.duration ?? defaultDuration;
    if (ms > 0) start(id, ms);
    return id;
  }, [defaultDuration, max, start]);

  // Hovering holds the clock; leaving lets the rest of the time run.
  const hover = useCallback((id: string, on: boolean) => {
    const t = timers.current.get(id);
    if (!t) return;
    if (on) {
      if (t.handle) clearTimeout(t.handle);
      t.handle = null;
      t.left = Math.max(800, t.left - (Date.now() - t.since));
    } else if (!t.handle) {
      start(id, t.left);
    }
  }, [start]);

  useEffect(() => () => { timers.current.forEach((t) => { if (t.handle) clearTimeout(t.handle); }); }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View pointerEvents="box-none" className={cn('absolute inset-x-0 bottom-0 items-center gap-2 px-4', className)} style={{ paddingBottom: offset }}>
        {shown.map((s) => (
          <Toast key={s.id} {...s} onDismiss={() => dismiss(s.id)} onHoverChange={Platform.OS === 'web' ? (on) => hover(s.id, on) : undefined} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}
