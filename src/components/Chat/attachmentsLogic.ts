/**
 * The rules of a message's attachments, with no screen in them: which attachments are pictures (shown as a
 * gallery) and which are files (shown as chips), how a gallery of one, two, three or more pictures is laid out,
 * and how many are hidden behind the last cell. Tested in attachmentsLogic.test.ts.
 */
import { fileKindFromName, type FileKind } from '../Thumbnail/fileKind';
import type { ChatAttachment } from './types';

const KINDS: readonly FileKind[] = ['folder', 'video', 'image', 'audio', 'document', 'file'];

/** The kind an attachment is shown as: what it says, else what its name says. */
export function attachmentKind(a: ChatAttachment): FileKind {
  if (a.kind && (KINDS as readonly string[]).includes(a.kind)) return a.kind as FileKind;
  if (a.mime?.startsWith('image/')) return 'image';
  if (a.mime?.startsWith('video/')) return 'video';
  if (a.mime?.startsWith('audio/')) return 'audio';
  return fileKindFromName(a.name);
}

/** A picture or a video with something to show: it goes in the gallery; everything else is a chip. */
export function isGalleryItem(a: ChatAttachment): boolean {
  const k = attachmentKind(a);
  return (k === 'image' || k === 'video') && !!(a.thumbnail || a.url);
}

export interface SplitAttachments {
  /** Pictures and videos, in order, each with its index in the original list. */
  gallery: { item: ChatAttachment; index: number }[];
  /** Everything else, in order, each with its index in the original list. */
  files: { item: ChatAttachment; index: number }[];
}

export function splitAttachments(items: readonly ChatAttachment[]): SplitAttachments {
  const gallery: SplitAttachments['gallery'] = [];
  const files: SplitAttachments['files'] = [];
  items.forEach((item, index) => (isGalleryItem(item) ? gallery : files).push({ item, index }));
  return { gallery, files };
}

export interface GalleryCell {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GalleryLayout {
  width: number;
  height: number;
  cells: GalleryCell[];
  /** Pictures beyond the cells shown: the last cell says "+N". */
  more: number;
}

/** The most pictures a gallery shows as cells; the rest are counted on the last one. */
export const GALLERY_MAX = 4;

/**
 * Where each picture goes. One picture keeps its own shape (up to `width` wide and `maxHeight` tall); two sit side
 * by side as squares; three are one wide picture over two squares; four or more are a two-by-two grid.
 */
export function galleryLayout(count: number, { width = 300, gap = 3, maxHeight = 360, aspect = 4 / 3 }: { width?: number; gap?: number; maxHeight?: number; aspect?: number | null } = {}): GalleryLayout {
  if (count <= 0) return { width, height: 0, cells: [], more: 0 };
  if (count === 1) {
    const a = aspect && aspect > 0 ? aspect : 4 / 3;
    let w = width;
    let h = Math.round(w / a);
    if (h > maxHeight) {
      h = maxHeight;
      w = Math.round(h * a);
    }
    if (h < 72) h = 72;
    return { width: w, height: h, cells: [{ x: 0, y: 0, w, h }], more: 0 };
  }
  const half = Math.floor((width - gap) / 2);
  if (count === 2) return { width, height: half, cells: [{ x: 0, y: 0, w: half, h: half }, { x: half + gap, y: 0, w: half, h: half }], more: 0 };
  if (count === 3) {
    const top = Math.round(width * 0.56);
    return { width, height: top + gap + half, cells: [{ x: 0, y: 0, w: width, h: top }, { x: 0, y: top + gap, w: half, h: half }, { x: half + gap, y: top + gap, w: half, h: half }], more: 0 };
  }
  return {
    width,
    height: half * 2 + gap,
    cells: [
      { x: 0, y: 0, w: half, h: half },
      { x: half + gap, y: 0, w: half, h: half },
      { x: 0, y: half + gap, w: half, h: half },
      { x: half + gap, y: half + gap, w: half, h: half },
    ],
    more: Math.max(0, count - GALLERY_MAX),
  };
}

/** The picture's own shape, when the attachment knows it. */
export function attachmentAspect(a: ChatAttachment): number | null {
  return a.width && a.height && a.width > 0 && a.height > 0 ? a.width / a.height : null;
}

/** The items a viewer pages through: every picture, video and sound of a list, in order, with their indexes. */
export function viewableAttachments(items: readonly ChatAttachment[]): { item: ChatAttachment; index: number }[] {
  const out: { item: ChatAttachment; index: number }[] = [];
  items.forEach((item, index) => {
    const k = attachmentKind(item);
    if ((k === 'image' || k === 'video' || k === 'audio') && item.url) out.push({ item, index });
  });
  return out;
}
