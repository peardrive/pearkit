import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import { Text } from '../Text/Text';
import type { DroppedItem, DropZoneProps } from './dropZoneTypes';

export * from './dropZoneTypes';

/** The files and folders in a drop, folders told apart with `webkitGetAsEntry`. */
export function droppedItemsFrom(dt: DataTransfer | null): DroppedItem[] {
  if (!dt) return [];
  const out: DroppedItem[] = [];
  const items = dt.items ? Array.from(dt.items) : [];
  if (items.length) {
    for (const it of items) {
      if (it.kind !== 'file') continue;
      const entry = (it as DataTransferItem & { webkitGetAsEntry?: () => { isDirectory: boolean; name: string } | null }).webkitGetAsEntry?.();
      const file = it.getAsFile() ?? undefined;
      if (entry?.isDirectory) out.push({ kind: 'directory', name: entry.name || file?.name || 'folder' });
      else if (file) out.push({ kind: 'file', name: file.name, file });
    }
    if (out.length) return out;
  }
  for (const file of Array.from(dt.files ?? [])) out.push({ kind: 'file', name: file.name, file });
  return out;
}

const hasFiles = (dt: DataTransfer | null) => !!dt && Array.from(dt.types ?? []).includes('Files');

/**
 * A place files can be dropped. Listens to the browser's drag events on its own element, tells folders from files,
 * and shows an overlay while a drag is over it. Only a drag that carries files counts; text being dragged does not.
 */
export function DropZone({ onDrop, onDragActiveChange, overlay, disabled, children, className, style }: DropZoneProps) {
  const ref = useRef<React.ComponentRef<typeof View>>(null);
  const [active, setActive] = useState(false);
  const depth = useRef(0);
  const latest = useRef({ onDrop, onDragActiveChange });
  latest.current = { onDrop, onDragActiveChange };

  useEffect(() => {
    const node = ref.current as unknown as HTMLElement | null;
    if (!node || disabled || typeof node.addEventListener !== 'function') return;
    const set = (on: boolean) => {
      setActive((was) => {
        if (was !== on) latest.current.onDragActiveChange?.(on);
        return on;
      });
    };
    const enter = (e: DragEvent) => {
      if (!hasFiles(e.dataTransfer)) return;
      e.preventDefault();
      depth.current += 1;
      set(true);
    };
    const over = (e: DragEvent) => {
      if (!hasFiles(e.dataTransfer)) return;
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    };
    const leave = (e: DragEvent) => {
      if (!hasFiles(e.dataTransfer)) return;
      depth.current = Math.max(0, depth.current - 1);
      if (depth.current === 0) set(false);
    };
    const drop = (e: DragEvent) => {
      if (!hasFiles(e.dataTransfer)) return;
      e.preventDefault();
      depth.current = 0;
      set(false);
      latest.current.onDrop(droppedItemsFrom(e.dataTransfer), e);
    };
    node.addEventListener('dragenter', enter);
    node.addEventListener('dragover', over);
    node.addEventListener('dragleave', leave);
    node.addEventListener('drop', drop);
    return () => {
      node.removeEventListener('dragenter', enter);
      node.removeEventListener('dragover', over);
      node.removeEventListener('dragleave', leave);
      node.removeEventListener('drop', drop);
      depth.current = 0;
      set(false);
    };
  }, [disabled]);

  const cover =
    typeof overlay === 'function' ? overlay(active) : active ? (overlay ?? <DefaultOverlay />) : null;

  return (
    <View ref={ref} className={cn('relative', className)} style={style}>
      {children}
      {cover ? (
        <View pointerEvents="none" className="absolute inset-0">
          {cover}
        </View>
      ) : null}
    </View>
  );
}

function DefaultOverlay() {
  return (
    <View className="flex-1 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/60 bg-primary/[0.10] p-4">
      <Icon name="import" size={22} tone="primary" />
      <Text variant="body-sm" weight="semibold" tone="primary-text">
        Drop to add
      </Text>
    </View>
  );
}
