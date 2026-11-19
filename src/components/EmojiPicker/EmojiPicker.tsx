import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, useWindowDimensions, View, type StyleProp, type ViewStyle } from 'react-native';
import { vars } from 'nativewind';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { themeToCssVariables } from '../../theme/createTheme';
import { IconButton } from '../IconButton/IconButton';
import { menuPlace, type MenuAnchor } from '../Menu/Menu';
import { SearchField } from '../SearchField/SearchField';
import { Text } from '../Text/Text';
import { EMOJI_CATEGORIES, searchEmoji, type EmojiCategory } from './emoji';

export * from './emoji';

export const EMOJI_COLUMNS = 8;
export const EMOJI_CELL = 44;
const PAD = 8;
const WIDTH = EMOJI_COLUMNS * EMOJI_CELL + PAD * 2;
const HEIGHT = 400;

export interface EmojiPickerProps {
  open: boolean;
  onClose: () => void;
  onPick: (emoji: string) => void;
  /** The ones used lately, shown first. The host keeps them (`pushRecent`). */
  recent?: string[];
  /** The point the panel hangs from, in window coordinates; without one it opens in the middle. */
  anchor?: MenuAnchor;
  /** Which edge of the panel sits on `anchor.x`. Default `left`. */
  align?: 'left' | 'right';
  categories?: EmojiCategory[];
  placeholder?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

function Cell({ emoji, onPick }: { emoji: string; onPick: (e: string) => void }) {
  return (
    <Pressable
      onPress={() => onPick(emoji)}
      accessibilityRole="button"
      accessibilityLabel={emoji}
      className={cn('items-center justify-center rounded-md hover:bg-overlay/[0.08] active:bg-overlay/[0.12]', Platform.OS === 'web' && 'cursor-pointer')}
      style={{ width: EMOJI_CELL, height: EMOJI_CELL }}
    >
      <Text style={{ fontSize: 24, lineHeight: 30 }}>{emoji}</Text>
    </Pressable>
  );
}

function Grid({ emojis, onPick }: { emojis: string[]; onPick: (e: string) => void }) {
  return (
    <View className="flex-row flex-wrap">
      {emojis.map((em, i) => (
        <Cell key={`${em}-${i}`} emoji={em} onPick={onPick} />
      ))}
    </View>
  );
}

/**
 * The full emoji list in a pop-up window (like `Menu`): a search field, the recent row first, then the categories,
 * eight to a row. Escape and a press outside close it.
 */
export function EmojiPicker({ open, onClose, onPick, recent = [], anchor, align = 'left', categories = EMOJI_CATEGORIES, placeholder = 'Search emoji', className, style }: EmojiPickerProps) {
  const theme = useTheme();
  const themeVars = useMemo(() => vars(themeToCssVariables(theme)), [theme]);
  const screen = useWindowDimensions();
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchEmoji(query, categories), [query, categories]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    if (!open || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const place = anchor
    ? menuPlace(anchor, align, WIDTH, HEIGHT, screen)
    : { left: Math.max(8, Math.round((screen.width - WIDTH) / 2)), top: Math.max(8, Math.round((screen.height - HEIGHT) / 2)) };
  const pick = (em: string) => {
    onPick(em);
    onClose();
  };

  return (
    <Modal visible={open} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <View className="flex-1" style={themeVars}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close the emoji list" className="absolute inset-0" onPress={onClose} focusable={false} />
        <View
          accessibilityRole="menu"
          accessibilityLabel="Emoji"
          className={cn('absolute overflow-hidden rounded-lg border border-overlay/10 bg-pane', className)}
          style={[{ width: WIDTH, height: HEIGHT, left: place.left, top: place.top, boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.45)' } as ViewStyle, style]}
        >
          <View className="flex-row items-center gap-1 px-2 pb-1 pt-2">
            <SearchField value={query} onChangeText={setQuery} placeholder={placeholder} autoFocus={Platform.OS === 'web'} className="flex-1" />
            <IconButton icon="close" size="sm" accessibilityLabel="Close" onPress={onClose} />
          </View>
          <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: PAD, paddingBottom: PAD }} keyboardShouldPersistTaps="handled">
            {query.trim() ? (
              results.length ? (
                <Grid emojis={results} onPick={pick} />
              ) : (
                <Text variant="caption" tone="muted" className="px-1 py-3">
                  Nothing called "{query.trim()}".
                </Text>
              )
            ) : (
              <>
                {recent.length ? (
                  <View>
                    <Text variant="overline" className="px-1 pb-1 pt-2">
                      Recent
                    </Text>
                    <Grid emojis={recent.slice(0, EMOJI_COLUMNS * 2)} onPick={pick} />
                  </View>
                ) : null}
                {categories.map((c) => (
                  <View key={c.id}>
                    <Text variant="overline" className="px-1 pb-1 pt-2">
                      {c.label}
                    </Text>
                    <Grid emojis={c.emojis.map((e) => e.char)} onPick={pick} />
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export interface EmojiBarProps {
  /** The quick ones, six as a rule. */
  emojis: string[];
  onPick: (emoji: string) => void;
  /** Shows a + after them that opens the full list. */
  onMore?: () => void;
  size?: 'sm' | 'md';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** The quick row: a few emoji in a pill and a + for the rest. */
export function EmojiBar({ emojis, onPick, onMore, size = 'md', className, style }: EmojiBarProps) {
  const cell = size === 'sm' ? 28 : 32;
  const font = size === 'sm' ? 16 : 18;
  return (
    <View className={cn('flex-row items-center gap-0.5 self-start rounded-full border border-overlay/[0.10] bg-pane px-1 py-0.5', className)} style={style} accessibilityRole="toolbar">
      {emojis.map((em) => (
        <Pressable
          key={em}
          onPress={() => onPick(em)}
          accessibilityRole="button"
          accessibilityLabel={`React ${em}`}
          className={cn('items-center justify-center rounded-full hover:bg-overlay/[0.08] active:bg-overlay/[0.12]', Platform.OS === 'web' && 'cursor-pointer')}
          style={{ width: cell, height: cell }}
        >
          <Text style={{ fontSize: font, lineHeight: cell }}>{em}</Text>
        </Pressable>
      ))}
      {onMore ? <IconButton icon="add" size={size === 'sm' ? 'xs' : 'sm'} accessibilityLabel="More emoji" onPress={onMore} className="rounded-full" /> : null}
    </View>
  );
}
