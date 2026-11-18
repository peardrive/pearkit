import { createContext } from 'react';

/**
 * ENTER DOES THE MAIN THING. In a window that comes up over the screen, Enter presses its one main action
 * ("go", "yes", "join"), and never a delete. (Guy, 2026-11-18: his brother pasted a link into "Join a
 * Space", pressed Enter, and nothing happened. "Anytime you have a modal come up ... one main live option
 * of just like go or yes ... the enter button always hits that ... with the exception of delete functions.")
 *
 * This is the part of the rule that reads a key press: is this Enter one that should press the main action?
 * Enter keeps its own meaning where it has one: a multi-line field (Cmd or Ctrl with Enter does the main
 * action there) and a focused button, link or other control inside the window. A key held down, a key
 * something else has already taken, and Enter while a word is being composed do nothing.
 * The same rule for a plain web page is `pear-ui/system/enter.js`.
 */
export interface EnterKey {
  key: string;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  repeat?: boolean;
  isComposing?: boolean;
  defaultPrevented?: boolean;
  target?: unknown;
}

const OWN_ENTER_TAGS = new Set(['BUTTON', 'A', 'SELECT', 'SUMMARY']);
const OWN_ENTER_ROLES = new Set(['button', 'link', 'checkbox', 'switch', 'radio', 'tab', 'menuitem', 'option', 'combobox']);

type El = { tagName?: unknown; isContentEditable?: boolean; getAttribute?: (name: string) => string | null };

export function enterPressesMain(e: EnterKey, panel?: { contains: (node: never) => boolean } | null): boolean {
  if (e.key !== 'Enter' || e.shiftKey || e.altKey || e.repeat || e.isComposing || e.defaultPrevented) return false;
  const t = e.target as El | null | undefined;
  if (!t || typeof t.tagName !== 'string') return true;
  const tag = t.tagName.toUpperCase();
  if ((tag === 'TEXTAREA' || t.isContentEditable) && !(e.metaKey || e.ctrlKey)) return false;
  // a control left focused behind the window does not keep Enter for itself
  const inside = !panel || panel.contains(t as never);
  if (inside && (OWN_ENTER_TAGS.has(tag) || OWN_ENTER_ROLES.has(t.getAttribute?.('role') || ''))) return false;
  return true;
}

/** The main action of the Dialog a field sits in, or null: there is none, it is not live, or it deletes.
 *  A single-line TextField gives it to Enter, which on a phone is the keyboard's return key ("go"). */
export const DialogSubmitContext = createContext<(() => void) | null>(null);
