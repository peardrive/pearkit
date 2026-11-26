import React, { useEffect, useState } from 'react';
import { Image, type ImageProps } from 'react-native';

/** How long to wait before asking again for a picture that did not load: the file may still be on its way. */
export const RETRY_AFTER_MS = [3_000, 8_000, 20_000];

/** The URL asked for on the nth try: a cache-busting mark so the browser asks again. */
export function retryUri(uri: string, attempt: number): string {
  if (!attempt) return uri;
  return `${uri}${uri.includes('?') ? '&' : '?'}retry=${attempt}`;
}

export interface RetryImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
  /** After every try failed. */
  onGiveUp?: () => void;
}

/**
 * A picture that asks again when it did not load. A file shared in a Space can be a few seconds behind its message
 * (the listing arrives, then the bytes), and the daemon answers 404 until it holds them; a plain image gives up on
 * the first failure and stays blank (the phone, 2026-11-25). Three tries, 3 s, 8 s and 20 s apart.
 */
export function RetryImage({ uri, onError, onGiveUp, ...rest }: RetryImageProps) {
  const [attempt, setAttempt] = useState(0);
  useEffect(() => setAttempt(0), [uri]);
  return (
    <Image
      {...rest}
      source={{ uri: retryUri(uri, attempt) }}
      onError={(e) => {
        onError?.(e);
        const wait = RETRY_AFTER_MS[attempt];
        if (wait == null) {
          onGiveUp?.();
          return;
        }
        setTimeout(() => setAttempt((a) => (a === attempt ? a + 1 : a)), wait);
      }}
    />
  );
}
