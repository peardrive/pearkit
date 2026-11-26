import { describe, expect, it } from 'vitest';
import { attachmentAspect, attachmentKind, galleryLayout, isGalleryItem, splitAttachments, viewableAttachments } from './attachmentsLogic';

const pic = (name: string, over = {}) => ({ name, url: `/f/${name}`, ...over });

describe('attachments: which is a picture, which is a file', () => {
  it('reads the kind from the attachment, its mime, then its name', () => {
    expect(attachmentKind({ name: 'a.png' })).toBe('image');
    expect(attachmentKind({ name: 'a.bin', mime: 'image/png' })).toBe('image');
    expect(attachmentKind({ name: 'a.bin', mime: 'video/mp4' })).toBe('video');
    expect(attachmentKind({ name: 'memo', mime: 'audio/webm' })).toBe('audio');
    expect(attachmentKind({ name: 'a.png', kind: 'document' })).toBe('document');
    expect(attachmentKind({ name: 'notes.md' })).toBe('document');
    expect(attachmentKind({ name: 'thing.zip' })).toBe('file');
  });

  it('a picture or video with something to show goes in the gallery; the rest are chips', () => {
    expect(isGalleryItem(pic('a.png'))).toBe(true);
    expect(isGalleryItem({ name: 'a.png' })).toBe(false); // nothing to show yet
    expect(isGalleryItem({ name: 'clip.mp4', thumbnail: '/t/clip' })).toBe(true);
    expect(isGalleryItem(pic('notes.pdf'))).toBe(false);
    const s = splitAttachments([pic('a.png'), { name: 'notes.pdf', url: '/f/notes.pdf' }, pic('b.jpg'), { name: 'memo', mime: 'audio/webm', url: '/b/1' }]);
    expect(s.gallery.map((g) => g.index)).toEqual([0, 2]);
    expect(s.files.map((f) => f.item.name)).toEqual(['notes.pdf', 'memo']);
  });

  it('a viewer pages through pictures, videos and sounds that have a url', () => {
    expect(viewableAttachments([pic('a.png'), { name: 'notes.pdf', url: '/x' }, { name: 'm', mime: 'audio/webm', url: '/b' }, { name: 'c.mov' }]).map((v) => v.index)).toEqual([0, 2]);
  });
});

describe('the gallery layout', () => {
  it('one picture keeps its shape, up to the width and a height cap', () => {
    const l = galleryLayout(1, { width: 300, aspect: 3 / 2 });
    expect(l.cells).toEqual([{ x: 0, y: 0, w: 300, h: 200 }]);
    const tall = galleryLayout(1, { width: 300, aspect: 1 / 2, maxHeight: 360 });
    expect(tall.height).toBe(360);
    expect(tall.width).toBe(180);
    expect(galleryLayout(1, { width: 300, aspect: null }).height).toBe(225); // 4:3 when the shape is unknown
    expect(attachmentAspect({ name: 'a.png', width: 1024, height: 512 })).toBe(2);
    expect(attachmentAspect({ name: 'a.png' })).toBeNull();
  });

  it('two side by side, three as one over two, four and more as a grid with the rest counted', () => {
    const two = galleryLayout(2, { width: 303, gap: 3 });
    expect(two.cells.map((c) => [c.x, c.w])).toEqual([[0, 150], [153, 150]]);
    expect(two.height).toBe(150);
    const three = galleryLayout(3, { width: 303, gap: 3 });
    expect(three.cells[0]).toEqual({ x: 0, y: 0, w: 303, h: 170 });
    expect(three.cells.length).toBe(3);
    const six = galleryLayout(6, { width: 303, gap: 3 });
    expect(six.cells.length).toBe(4);
    expect(six.more).toBe(2);
    expect(six.height).toBe(303);
    expect(galleryLayout(0).cells).toEqual([]);
  });
});
