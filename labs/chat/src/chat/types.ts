/**
 * The chat standard: ONE message shape and ONE set of pieces for every app. What differs between a sidebar chat
 * with an agent (Pearkit Studio, Pearcast) and a room (rKeyChat) is which features are switched on, and where the
 * messages come from. Neither is the chat's business: features are a prop, and the app owns the messages.
 */

export interface ChatAuthor {
  id: string;
  name: string;
  /** `agent`: an AI. `system`: the app itself (joined, renamed…). */
  kind: 'person' | 'agent' | 'system';
}

/** Something an agent offers to choose from ("three ways to improve it"). */
export interface ChatOption {
  id: string;
  label: string;
  detail?: string;
  /** A picture of the option (a rendered version, a drawing). Shown as a thumbnail. */
  image?: string;
}

/** A file, a picture or an example that comes with a message. Shown as a small tile; pressing it opens it. */
export interface ChatAttachment {
  id: string;
  name: string;
  kind: 'image' | 'file';
  /** A picture to show on the tile (the image itself, or a preview of the file). */
  image?: string;
  detail?: string;
}

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  text: string;
  /** Milliseconds. */
  at: number;
  /** The id of the message this one answers. */
  replyTo?: string;
  /** emoji → ids of the people who reacted with it. */
  reactions?: Record<string, string[]>;
  status?: 'sending' | 'sent' | 'failed';
  /** Still being written (an agent's answer arriving). */
  streaming?: boolean;
  options?: ChatOption[];
  chosen?: string;
  attachments?: ChatAttachment[];
  edited?: boolean;
}

/** What a chat shows and allows. Every switch is independent; a preset is only a starting set. */
export interface ChatFeatures {
  /** Messages in bubbles, or flat rows like a document. */
  look: 'bubbles' | 'flat';
  density: 'compact' | 'comfortable';
  /** My own messages on the right. */
  mineOnRight: boolean;
  avatars: boolean;
  names: boolean;
  times: boolean;
  /** Dividers between days. */
  days: boolean;
  /** Messages in a row from one author share one name and avatar. */
  grouping: boolean;
  reactions: boolean;
  replies: boolean;
  copy: boolean;
  /** An emoji button in the composer. */
  emoji: boolean;
  /** A "+" in the composer (files, drawings). */
  attach: boolean;
  /** "Ana is typing…" */
  typing: boolean;
  /** Sent / failed marks on my own messages. */
  receipts: boolean;
  /** Choices an agent offers are shown as buttons. */
  options: boolean;
  /** Suggested first questions while the chat is empty. */
  starters: boolean;
  /** Enter sends (Shift+Enter for a new line). Off: Enter is a new line, the button sends. */
  enterSends: boolean;
}

export const FEATURE_LABELS: Record<keyof ChatFeatures, string> = {
  look: 'Look',
  density: 'Density',
  mineOnRight: 'Mine on the right',
  avatars: 'Avatars',
  names: 'Names',
  times: 'Times',
  days: 'Day dividers',
  grouping: 'Group messages in a row',
  reactions: 'Reactions',
  replies: 'Replies',
  copy: 'Copy',
  emoji: 'Emoji button',
  attach: 'Attach button',
  typing: 'Typing line',
  receipts: 'Sent marks',
  options: 'Agent options as buttons',
  starters: 'Starter questions',
  enterSends: 'Enter sends',
};

/** A sidebar beside something else: one conversation with an agent about the thing on screen. */
export const SIDEBAR: ChatFeatures = {
  look: 'bubbles', density: 'compact', mineOnRight: true, avatars: false, names: false, times: false, days: false, grouping: true,
  reactions: false, replies: false, copy: true, emoji: false, attach: false, typing: true, receipts: false, options: true, starters: true, enterSends: true,
};

/** A room: people (and agents) talking, with everything a chat app has. */
export const ROOM: ChatFeatures = {
  look: 'bubbles', density: 'comfortable', mineOnRight: true, avatars: true, names: true, times: true, days: true, grouping: true,
  reactions: true, replies: true, copy: true, emoji: true, attach: true, typing: true, receipts: true, options: true, starters: false, enterSends: true,
};

export const QUICK_REACTIONS = ['👍', '❤️', '😂', '🎉', '🤔', '👀'];
export const EMOJI = ['😀', '😂', '🥹', '😍', '😎', '🤔', '😅', '😭', '🙏', '👍', '👎', '👏', '🙌', '🔥', '✨', '🎉', '❤️', '💜', '🍐', '👀', '✅', '❌', '⚡', '🚀'];
