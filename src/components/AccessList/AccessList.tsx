import React, { useState } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/registry';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { cleanFolderInput, looksLikeFolder } from './accessLogic';

export * from './accessLogic';

const MONO = Platform.select({ web: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', ios: 'Menlo', default: 'monospace' });

export interface AccessItem {
  id: string;
  /** What it opens, as a person reads it: a folder (`~/Anjou/pearkit`) or a permission ("run jq commands"). */
  title: string;
  /** Under the title: where it came from ("allowed from a question, by guy"), or what it leaves out. */
  detail?: string;
  /** `folder` (default) for a path, `tick` for a permission, and any other icon for a kind of its own. */
  icon?: IconName;
  /** Shown as a path (monospace). Default true for the folder icon. */
  path?: boolean;
  /** Cannot be removed here (the project's own folder, the preset). */
  fixed?: boolean;
}

export interface AccessListProps {
  items: AccessItem[];
  /** Withdraws one; the row waits while it runs. Without it no row can be removed. */
  onRemove?: (item: AccessItem) => Promise<void> | void;
  /** Adds a typed folder; without it there is no field. A throw keeps the text so it can be fixed. */
  onAdd?: (folder: string) => Promise<void> | void;
  addPlaceholder?: string;
  /** Why nothing can change here (a device that is not the owner's). Shown instead of the field. */
  lockHint?: string;
  /** Under the list: what never opens, whatever is added. */
  footnote?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * What something may reach, as a list a person can change: the places it always has, the ones granted (each with
 * where the grant came from and a remove button), a field to add a folder, and a line about what is never
 * opened. rKeyChat's "Folders this project can see".
 */
export function AccessList({ items, onRemove, onAdd, addPlaceholder = '~/path/to/folder', lockHint, footnote, className, style }: AccessListProps) {
  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const add = async () => {
    if (!onAdd || !looksLikeFolder(text)) return;
    setAdding(true);
    try {
      await onAdd(cleanFolderInput(text));
      setText('');
    } catch {
      // the caller says why; the text stays to be fixed
    } finally {
      setAdding(false);
    }
  };
  return (
    <View className={cn('w-full gap-1', className)} style={style}>
      {items.map((it) => {
        const icon = it.icon ?? 'folder';
        const mono = it.path ?? icon === 'folder';
        return (
          <View key={it.id} className="flex-row items-center gap-2 rounded-field border border-overlay/[0.08] bg-overlay/5 py-1.5 pl-3 pr-1" {...({ dataSet: { access: it.id } } as object)}>
            <Icon name={icon} size={14} tone={it.fixed ? 'subtle' : 'accent'} />
            <View className="min-w-0 flex-1 py-0.5">
              <Text variant="label" numberOfLines={1} style={mono ? { fontFamily: MONO } : undefined}>
                {it.title}
              </Text>
              {it.detail ? (
                <Text variant="micro" tone="subtle" numberOfLines={2}>
                  {it.detail}
                </Text>
              ) : null}
            </View>
            {onRemove && !it.fixed ? (
              <IconButton
                icon="close"
                size="xs"
                tooltip="Remove"
                accessibilityLabel={`Remove ${it.title}`}
                disabled={removing === it.id}
                onPress={async () => {
                  setRemoving(it.id);
                  try {
                    await onRemove(it);
                  } finally {
                    setRemoving(null);
                  }
                }}
              />
            ) : (
              <View className="w-1" />
            )}
          </View>
        );
      })}
      {onAdd ? (
        <View className="flex-row items-center gap-2 pt-1">
          <TextField size="sm" value={text} onChangeText={setText} placeholder={addPlaceholder} accessibilityLabel="Folder to add" className="min-w-0 flex-1" onSubmitEditing={() => void add()} autoCapitalize="none" autoCorrect={false} />
          <Button size="sm" variant="secondary" label="Add" loading={adding} disabled={adding || !looksLikeFolder(text)} onPress={() => void add()} />
        </View>
      ) : lockHint ? (
        <View className="flex-row items-center gap-1.5 pt-1">
          <Icon name="info-circle" size={13} tone="subtle" />
          <Text variant="micro" tone="subtle">
            {lockHint}
          </Text>
        </View>
      ) : null}
      {footnote ? (
        <Text variant="micro" tone="subtle" className="pt-1">
          {footnote}
        </Text>
      ) : null}
    </View>
  );
}
