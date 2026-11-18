/**
 * The chat standard: ONE message shape for every app. What differs between a sidebar chat with an agent
 * (Pearkit Studio, Pearcast) and a room (rKeyChat) is where the messages come from, and that is the app's
 * business: the chat holds no messages and talks to no network.
 */

export interface ChatAuthor {
  id: string;
  name: string;
  /** An AI. It always shows its mark, so it is never mistaken for a person. */
  agent?: boolean;
}

export interface ChatReaction {
  emoji: string;
  count: number;
  /** I am one of the people who reacted with it. */
  mine?: boolean;
}

export interface ChatAttachment {
  name: string;
  /** Bytes. */
  size?: number;
  /** Where to open it; for a picture, also what to show on the tile. */
  url?: string;
  /** `image`, `video`, `audio`, `document`, `folder`… Guessed from the name when left out. */
  kind?: string;
}

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  /** Milliseconds since the epoch. */
  ts: number;
  text: string;
  /** Ids of the messages this one answers. */
  re?: string[];
  reactions?: ChatReaction[];
  attachments?: ChatAttachment[];
  /** Sent, not yet confirmed: shown lighter. */
  pending?: boolean;
  /** Taken back: shown struck through and dimmed. */
  redacted?: boolean;
  /** The app speaking (joined, renamed…): one muted line. */
  system?: boolean;
}

/** The reactions offered on a message's action strip. */
export const QUICK_REACTIONS = ['👍', '❤️', '😂', '🎉', '🤔', '👀'];
