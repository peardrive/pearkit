/** Demo media for the time components: a speech-like waveform and a few frames. */
import videoDusk from '../assets/video-dusk.jpg';
import photoHarbor from '../assets/photo-harbor.jpg';
import photoRidge from '../assets/photo-ridge.jpg';
import albumEmber from '../assets/album-ember.jpg';
import type { WaveformSource } from '../../components/Waveform/waveformBars';
import type { FilmstripFrame } from '../../components/Filmstrip/filmstripCells';

/** A deterministic pseudo-random sequence so stories look the same every time. */
function prng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 0xffffffff;
  };
}

/** Peaks that look like someone talking: phrases with pauses, a little room tone. */
export function demoPeaks(seconds = 92, peaksPerSecond = 50, seed = 7): WaveformSource {
  const rnd = prng(seed);
  const n = Math.round(seconds * peaksPerSecond);
  const peaks = new Float32Array(n);
  let t = 0;
  while (t < n) {
    const phrase = Math.round((1.2 + rnd() * 3.5) * peaksPerSecond);
    const pause = Math.round((0.3 + rnd() * 1.1) * peaksPerSecond);
    for (let i = 0; i < phrase && t < n; i++, t++) {
      const env = Math.sin((i / phrase) * Math.PI) ** 0.6;
      const syllable = 0.55 + 0.45 * Math.abs(Math.sin(i / (peaksPerSecond * 0.11)));
      peaks[t] = Math.min(1, env * syllable * (0.5 + rnd() * 0.5) * 0.9);
    }
    for (let i = 0; i < pause && t < n; i++, t++) peaks[t] = 0.02 + rnd() * 0.03;
  }
  return { peaks, peaksPerSecond };
}

/** `count` frames cycling through the demo pictures; `missing` indexes stay empty, as if still loading. */
export function demoFrames(count = 12, missing: number[] = []): FilmstripFrame[] {
  const pics = [videoDusk, photoHarbor, photoRidge, albumEmber];
  return Array.from({ length: count }, (_, i) => (missing.includes(i) ? null : pics[i % pics.length]));
}
