import type { StatusTone } from '../../theme/tones';

/** Lifecycle states of a share / transfer in PearDrop-style apps. */
export type ShareStatus = 'sharing' | 'receiving' | 'active' | 'completed' | 'failed' | 'paused' | 'inactive';

export interface StatusMeta {
  label: string;
  tone: StatusTone;
}

/**
 * Default label and tone for each status. Override per call (`label`, `tone`)
 * or replace entries to localise / re-brand.
 */
export const shareStatusMeta: Record<ShareStatus, StatusMeta> = {
  sharing: { label: 'Sharing', tone: 'warning' },
  receiving: { label: 'Receiving', tone: 'info' },
  active: { label: 'Active', tone: 'success' },
  completed: { label: 'Completed', tone: 'primary' },
  failed: { label: 'Failed', tone: 'danger' },
  paused: { label: 'Paused', tone: 'neutral' },
  inactive: { label: 'Inactive', tone: 'neutral' },
};

/** `"Sharing 98%"` for in-flight statuses when a progress value is known. */
export function statusLabel(status: ShareStatus, progress?: number, meta = shareStatusMeta): string {
  const base = meta[status].label;
  if (progress == null || !(status === 'sharing' || status === 'receiving')) return base;
  return `${base} ${Math.round(progress * 100)}%`;
}
