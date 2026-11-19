import { Platform } from 'react-native';

/**
 * How text gets onto the clipboard, in order:
 * 1. a writer the app registered with `setClipboardWriter` (a native module such as `expo-clipboard`, or a bridge
 *    from a web page to the app that shows it in a WebView, where the browser clipboard is not available);
 * 2. the browser clipboard (`navigator.clipboard`), which needs a secure context and a user gesture;
 * 3. on the web, the old `document.execCommand('copy')` on a hidden field, which still works in WebViews over
 *    plain http (an app serving its page from 127.0.0.1 inside a phone app, for instance).
 * Components that copy (`LinkField`, the message row…) call this; pass `onCopy` to override per component.
 */
export type ClipboardWriter = (text: string) => boolean | Promise<boolean | void> | void;

let writer: ClipboardWriter | null = null;

/** Register the app's own way of writing the clipboard. Pass `null` to go back to the browser's. */
export function setClipboardWriter(fn: ClipboardWriter | null): void {
  writer = fn;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (writer) {
    try {
      const r = await writer(text);
      if (r !== false) return true;
    } catch {
      // fall through to the browser's ways
    }
  }
  if (Platform.OS !== 'web') {
    if (__DEV__) console.warn('[pearkit] No clipboard available on this platform — register one with setClipboardWriter or pass `onCopy`.');
    return false;
  }
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // not a secure context, or no gesture: try the old way
    }
  }
  return execCopy(text);
}

function execCopy(text: string): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
