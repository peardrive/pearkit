/**
 * A file's kind from what is known about it, and the icon and tint that stand for each kind. Plain TypeScript
 * with no screen in it, so the chat's attachment rules (and their tests) can use it under Node.
 */
import type { IconName } from '../../icons/registry';
import type { StatusTone } from '../../theme/tones';

export type FileKind = 'folder' | 'video' | 'image' | 'audio' | 'document' | 'file';

/** Icon + tint used when a thumbnail has no image. Replace entries to re-skin. */
export const fileKindMeta: Record<FileKind, { icon: IconName; tone: StatusTone; label: string }> = {
  folder: { icon: 'folder', tone: 'accent', label: 'Folder' },
  video: { icon: 'video', tone: 'info', label: 'Video' },
  image: { icon: 'image', tone: 'warning', label: 'Picture' },
  audio: { icon: 'music', tone: 'danger', label: 'Music' },
  document: { icon: 'document', tone: 'neutral', label: 'Document' },
  file: { icon: 'document', tone: 'neutral', label: 'File' },
};

/** Guess a file kind from a file name. */
export function fileKindFromName(name: string): FileKind {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  if (!name.includes('.')) return 'folder';
  if (['mp4', 'mov', 'mkv', 'webm', 'avi', 'm4v'].includes(ext)) return 'video';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'avif', 'svg'].includes(ext)) return 'image';
  if (['mp3', 'wav', 'flac', 'm4a', 'ogg', 'aac'].includes(ext)) return 'audio';
  if (['pdf', 'doc', 'docx', 'txt', 'md', 'pages', 'rtf'].includes(ext)) return 'document';
  return 'file';
}
