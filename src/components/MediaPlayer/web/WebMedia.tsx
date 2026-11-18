import React, { useMemo, useRef, type CSSProperties } from 'react';

import type { CaptionTrack, MediaEngine } from '../playerLogic';

/**
 * The engine for a browser: the page's own <video> and <audio> elements behind the same few
 * calls every other engine gives the player. Used by Storybook and by desktop apps, which draw
 * their windows with a browser. Phones use the engine their app supplies.
 */

export type WebCaption = {
  /** A WebVTT file. */
  src: string;
  /** The language code, such as "en" or "es-MX". */
  language: string;
  label?: string;
};

function captionTracks(el: HTMLMediaElement | null): TextTrack[] {
  if (!el) return [];
  return Array.from(el.textTracks).filter((t) => t.kind === 'subtitles' || t.kind === 'captions');
}

function describe(track: TextTrack, index: number): CaptionTrack {
  return { id: String(index), language: track.language, label: track.label };
}

/** An engine and the place to attach the element it drives: `<WebVideo attach={attach} … />`. */
export function useWebMedia(): { engine: MediaEngine; attach: (el: HTMLMediaElement | null) => void } {
  const element = useRef<HTMLMediaElement | null>(null);
  return useMemo(() => {
    const engine: MediaEngine = {
      play: () => {
        // A browser may refuse to start sound nobody asked for; that is not an error to show.
        void element.current?.play().catch(() => {});
      },
      pause: () => element.current?.pause(),
      seekTo: (seconds) => {
        if (element.current) element.current.currentTime = seconds;
      },
      setRate: (rate) => {
        if (element.current) element.current.playbackRate = rate;
      },
      setLoop: (loop) => {
        if (element.current) element.current.loop = loop;
      },
      read: () => {
        const el = element.current;
        if (!el) return { position: 0, duration: 0, playing: false, failed: false };
        return {
          position: el.currentTime,
          duration: el.duration,
          playing: !el.paused && !el.ended,
          failed: el.error != null,
        };
      },
      captions: () => {
        const tracks = captionTracks(element.current);
        const showing = tracks.findIndex((t) => t.mode === 'showing');
        const current = showing >= 0 ? tracks[showing] : undefined;
        return {
          tracks: tracks.map(describe),
          current: current ? describe(current, showing) : null,
        };
      },
      chooseCaption: (index) => {
        captionTracks(element.current).forEach((track, i) => {
          track.mode = i === index ? 'showing' : 'disabled';
        });
      },
    };
    return {
      engine,
      attach: (el: HTMLMediaElement | null) => {
        element.current = el;
      },
    };
  }, []);
}

const FILL: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  background: '#000',
};

export type WebVideoProps = {
  src: string;
  attach: (el: HTMLMediaElement | null) => void;
  captions?: readonly WebCaption[];
};

/** The picture for a video player. The player draws every control; the browser's own are off. */
export function WebVideo({ src, attach, captions = [] }: WebVideoProps) {
  return (
    <video ref={attach} src={src} style={FILL} playsInline preload="metadata" controls={false}>
      {captions.map((c) => (
        <track key={c.src} kind="subtitles" src={c.src} srcLang={c.language} label={c.label ?? ''} />
      ))}
    </video>
  );
}

/** Sound has nothing to show; this only needs to be on the page. */
export function WebAudio({ src, attach }: { src: string; attach: (el: HTMLMediaElement | null) => void }) {
  return <audio ref={attach} src={src} preload="metadata" />;
}
