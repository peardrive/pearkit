import { Platform } from 'react-native';

/**
 * Copy text using the browser/Electron clipboard. React Native has no built-in
 * clipboard any more — pass your own `onCopy` (e.g. from `expo-clipboard`) to
 * the components that copy, and this helper is skipped.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  if (__DEV__) console.warn('[pearkit] No clipboard available on this platform — pass an `onCopy` handler.');
  return false;
}
