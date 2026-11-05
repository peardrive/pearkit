/** Demo data mirroring the PearDrop Figma frame. Used by stories and examples. */
import type { FileKind, ShareStatus } from '../../index';
import videoDusk from '../assets/video-dusk.jpg';
import photoHarbor from '../assets/photo-harbor.jpg';
import photoRidge from '../assets/photo-ridge.jpg';
import albumEmber from '../assets/album-ember.jpg';

export const images = { videoDusk, photoHarbor, photoRidge, albumEmber };

export interface DemoShare {
  id: string;
  name: string;
  kind: FileKind;
  typeLabel: string;
  size: string;
  bytes: number;
  files?: number;
  image?: string;
  status: ShareStatus;
  progress?: number;
  peers?: string[];
  favorite?: boolean;
  time: string;
  added: string;
  location: string;
  link: string;
  group: 'in-progress' | 'recent';
}

const PEERS = ['a12b9f03c7d14f5g', '9e7c55e0b2a811ad', 'c03fd18e4a7cb82e'];

export const shares: DemoShare[] = [
  {
    id: 'photo_2', name: 'photo_2.mp4', kind: 'video', typeLabel: 'MP4 Video', size: '1.2 GB', bytes: 1.2 * 1024 ** 3,
    image: videoDusk, status: 'sharing', progress: 0.98, peers: PEERS, time: 'now', added: 'Jul 01, 2026 · 14:32',
    location: '~/Downloads', group: 'in-progress',
    link: 'peardrop://1de0909835728b6e0f3a4c19d2e7b8a5c6f71d0e9f684cb145a28',
  },
  {
    id: 'personal_01', name: 'Personal 01', kind: 'folder', typeLabel: 'Folder', size: '0.8 GB', bytes: 0.8 * 1024 ** 3, files: 2,
    status: 'sharing', progress: 0.54, peers: PEERS.slice(0, 2), time: 'now', added: 'Jul 01, 2026 · 13:05',
    location: '~/Documents/Personal 01', group: 'in-progress',
    link: 'peardrop://7c2e19a0d44b8f1306e5a7c2b9d0e8f4a1b3c5d7e9f02468ace13579bd',
  },
  {
    id: 'personal', name: 'Personal', kind: 'folder', typeLabel: 'Folder', size: '4.5 GB', bytes: 4.5 * 1024 ** 3, files: 12,
    status: 'active', favorite: true, time: '2h', added: 'Jun 30, 2026 · 09:12', location: '~/Documents/Personal', group: 'recent',
    link: 'peardrop://f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f708192a3b4c5d6',
  },
  {
    id: 'photo_1', name: 'photo_1.mp4', kind: 'video', typeLabel: 'MP4 Video', size: '560 MB', bytes: 560 * 1024 ** 2,
    image: videoDusk, status: 'active', time: '5h', added: 'Jun 30, 2026 · 06:48', location: '~/Movies', group: 'recent',
    link: 'peardrop://0a1b2c3d4e5f60718293a4b5c6d7e8f9011223344556677889900aabbcc',
  },
  {
    id: 'photo', name: 'photo.jpg', kind: 'image', typeLabel: 'JPEG Image', size: '342 KB', bytes: 342 * 1024,
    image: photoHarbor, status: 'completed', favorite: true, time: 'Yesterday', added: 'Jun 29, 2026 · 21:10', location: '~/Pictures', group: 'recent',
    link: 'peardrop://9f8e7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c5b4a39281706f5e4d3c',
  },
  {
    id: 'photo_03', name: 'photo_03.jpg', kind: 'image', typeLabel: 'JPEG Image', size: '126 KB', bytes: 126 * 1024,
    image: photoRidge, status: 'failed', time: '', added: 'Jun 29, 2026 · 18:02', location: '~/Pictures', group: 'recent',
    link: 'peardrop://1122334455667788990011aabbccddeeff00112233445566778899aabb',
  },
  {
    id: 'fallout', name: 'Fallout.mp3', kind: 'audio', typeLabel: 'MP3 Audio', size: '8.4 MB', bytes: 8.4 * 1024 ** 2,
    image: albumEmber, status: 'completed', time: 'Jul 2', added: 'Jul 02, 2026 · 11:40', location: '~/Music', group: 'recent',
    link: 'peardrop://abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123',
  },
  {
    id: 'photo_04', name: 'photo_04.jpg', kind: 'image', typeLabel: 'JPEG Image', size: '210 KB', bytes: 210 * 1024,
    image: photoHarbor, status: 'inactive', time: 'Jul 1', added: 'Jul 01, 2026 · 08:15', location: '~/Pictures', group: 'recent',
    link: 'peardrop://00ff11ee22dd33cc44bb55aa6699887766554433221100ffeeddccbbaa',
  },
];

export const kindLabel: Record<FileKind, string> = {
  folder: 'Folder', video: 'Video', image: 'Picture', audio: 'Music', document: 'Document', file: 'File',
};

/** "Video · 1.2 GB · 3 peers" / "Folder · 12 files · 4.5 GB" */
export function shareMeta(s: DemoShare): string[] {
  if (s.kind === 'folder') return [kindLabel[s.kind], `${s.files} files`, s.size];
  return [kindLabel[s.kind], s.size, s.progress != null && s.peers ? `${s.peers.length} peers` : ''];
}
