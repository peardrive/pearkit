/**
 * Literal class maps for tone props. Kept as full strings so Tailwind's
 * content scanner can see every class (never build class names dynamically).
 */
import type { ColorToken } from './tokens';

export const textTone: Record<ColorToken, string> = {
  background: 'text-background', pane: 'text-pane', sidebar: 'text-sidebar', 'sidebar-to': 'text-sidebar-to',
  overlay: 'text-overlay', inset: 'text-inset', tooltip: 'text-tooltip', 'tooltip-foreground': 'text-tooltip-foreground',
  foreground: 'text-foreground', muted: 'text-muted', subtle: 'text-subtle', icon: 'text-icon', 'icon-strong': 'text-icon-strong',
  primary: 'text-primary', 'primary-foreground': 'text-primary-foreground', 'primary-strong': 'text-primary-strong',
  'primary-text': 'text-primary-text', selected: 'text-selected',
  success: 'text-success', warning: 'text-warning', danger: 'text-danger', 'danger-foreground': 'text-danger-foreground',
  neutral: 'text-neutral', info: 'text-info', accent: 'text-accent', favorite: 'text-favorite',
  'window-close': 'text-window-close', 'window-minimize': 'text-window-minimize', 'window-maximize': 'text-window-maximize',
  'window-inactive': 'text-window-inactive', 'qr-background': 'text-qr-background', 'qr-foreground': 'text-qr-foreground',
};

/** Semantic status tones shared by StatusPill, StatusDot, CountBadge, SidebarItem… */
export type StatusTone = 'success' | 'warning' | 'danger' | 'neutral' | 'primary' | 'info' | 'accent';

export const statusText: Record<StatusTone, string> = {
  success: 'text-success', warning: 'text-warning', danger: 'text-danger', neutral: 'text-neutral',
  primary: 'text-primary-text', info: 'text-info', accent: 'text-accent',
};

export const statusBg: Record<StatusTone, string> = {
  success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', neutral: 'bg-neutral',
  primary: 'bg-primary', info: 'bg-info', accent: 'bg-accent',
};

/** 14–16% tinted backgrounds, as used by pills and badges in the design. */
export const statusSoftBg: Record<StatusTone, string> = {
  success: 'bg-success/[0.14]', warning: 'bg-warning/[0.14]', danger: 'bg-danger/[0.14]', neutral: 'bg-neutral/[0.14]',
  primary: 'bg-primary/[0.14]', info: 'bg-info/[0.14]', accent: 'bg-accent/[0.12]',
};

export const statusToken: Record<StatusTone, ColorToken> = {
  success: 'success', warning: 'warning', danger: 'danger', neutral: 'neutral',
  primary: 'primary', info: 'info', accent: 'accent',
};
