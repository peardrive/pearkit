/** Demo media items for the browse components: a wall of mixed-ratio tiles. */
import videoDusk from '../assets/video-dusk.jpg';
import photoHarbor from '../assets/photo-harbor.jpg';
import photoRidge from '../assets/photo-ridge.jpg';
import albumEmber from '../assets/album-ember.jpg';
import type { FileKind } from '../../components/Thumbnail/Thumbnail';

export interface DemoMediaItem {
  id: string;
  source: string | null;
  kind: FileKind;
  aspectRatio: number;
  title: string;
  meta: string;
  badge?: string;
}

const pics = [videoDusk, photoHarbor, photoRidge, albumEmber] as string[];
const ratios = [16 / 9, 2 / 3, 1, 4 / 3, 21 / 9, 3 / 4];
const names = ['Dusk over the bay', 'Harbor crossing', 'Ridge line', 'Ember session', 'North pier', 'Low tide'];

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

function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** `count` media items cycling through the demo pictures with varied aspect ratios. */
export function demoWall(count = 18, seed = 7): DemoMediaItem[] {
  const rnd = prng(seed);
  return Array.from({ length: count }, (_, i) => {
    const video = rnd() > 0.4;
    const seconds = 20 + Math.round(rnd() * 580);
    return {
      id: `demo-${i}`,
      source: pics[i % pics.length],
      kind: video ? 'video' : 'image',
      aspectRatio: ratios[i % ratios.length],
      title: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
      meta: video ? `${clock(seconds)} · 1080p` : '4032 × 3024',
      badge: video ? clock(seconds) : undefined,
    };
  });
}
