/** `1288490188` → `"1.2 GB"`. */
export function formatBytes(bytes: number, fractionDigits = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  const digits = i === 0 || value >= 100 ? 0 : fractionDigits;
  return `${value.toFixed(digits).replace(/\.0+$/, '')} ${units[i]}`;
}

/** Bytes per second → `"1.2 MB/s"`. */
export function formatSpeed(bytesPerSecond: number): string {
  return `${formatBytes(bytesPerSecond)}/s`;
}

/** Seconds → `"~4 s left"`, `"~3 min left"`, `"~2 h left"`. */
export function formatEta(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '—';
  if (seconds < 60) return `~${Math.max(1, Math.round(seconds))} s left`;
  if (seconds < 3600) return `~${Math.round(seconds / 60)} min left`;
  return `~${Math.round(seconds / 3600)} h left`;
}

/** Shorten a peer key / hash: `"a12b9f…4f5g"`. */
export function truncateMiddle(value: string, head = 4, tail = 4, separator = '…'): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}${separator}${value.slice(-tail)}`;
}

/** Clamp a number into `[min, max]`. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
