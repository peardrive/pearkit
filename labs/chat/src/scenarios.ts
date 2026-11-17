/** Three places the same chat goes, each with made-up people and a made-up agent, so every feature can be tried. */
import { ROOM, SIDEBAR, type ChatAttachment, type ChatAuthor, type ChatFeatures, type ChatMessage, type ChatOption } from './chat/types';

export const ME: ChatAuthor = { id: 'me', name: 'Guy', kind: 'person' };
const agent = (name: string): ChatAuthor => ({ id: 'agent', name, kind: 'agent' });
const ANA: ChatAuthor = { id: 'ana', name: 'Ana', kind: 'person' };
const TOMAS: ChatAuthor = { id: 'tomas', name: 'Tomás', kind: 'person' };
const SYSTEM: ChatAuthor = { id: 'system', name: '', kind: 'system' };

export interface Scenario {
  id: 'studio' | 'pearcast' | 'room';
  title: string;
  /** What the chat is attached to. */
  subject: string;
  preset: ChatFeatures;
  agent?: ChatAuthor;
  peers: ChatAuthor[];
  placeholder: string;
  emptyText: string;
  starters: string[];
  seed: () => ChatMessage[];
  /** What the agent answers: a text, sometimes with choices. */
  answer: (question: string, n: number) => { text: string; options?: ChatOption[]; attachments?: ChatAttachment[] };
}

const min = 60000;
/** A pretend picture of a button, so thumbnails have something to show. */
const pic = (fill: string, r: number, label = 'Button') =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="264" height="168"><rect width="264" height="168" fill="#10151a"/><rect x="72" y="62" width="120" height="44" rx="${r}" fill="${fill}"/><text x="132" y="90" font-family="sans-serif" font-size="15" font-weight="600" fill="#fff" text-anchor="middle">${label}</text></svg>`)}`;
let n = 0;
export const newId = () => `m${Date.now().toString(36)}${(n++).toString(36)}`;

export const SCENARIOS: Scenario[] = [
  {
    id: 'studio',
    title: 'Pearkit Studio',
    subject: 'Button · Variants',
    preset: SIDEBAR,
    agent: agent('Studio'),
    peers: [],
    placeholder: 'Ask about Button',
    emptyText: 'Ask about Button: how it is built, what could change, options to try.',
    starters: ['Describe this component', 'Give me three ways to improve it'],
    seed: () => [],
    answer: (q, i) =>
      /three|options|ways|improve|ideas/i.test(q)
        ? {
            text: 'Three directions, from smallest change to largest:',
            options: [
              { id: 'a', label: 'Softer press', detail: 'The face sinks 1px and the glow fades on press, instead of only dimming.', image: pic('#3f9d63', 10) },
              { id: 'b', label: 'Taller small size', detail: 'Small goes from 28 to 30px so the label has the same breathing room as medium.', image: pic('#58c47a', 14) },
              { id: 'c', label: 'Quiet secondary', detail: 'Secondary loses its border and keeps only the overlay fill, so primary stands out more.', image: pic('#2a323a', 10) },
            ],
          }
        : i % 2
          ? { text: 'It can. The primary button is a gradient from primary to primary-strong with an inner highlight on the top edge; the glow under it is a separate layer, so it can be turned off per button.' }
          : {
              text: 'Button is a pressable row: an optional icon, a label, an optional icon on the right. It comes in primary, secondary, ghost and danger, and in two heights. The label never wraps; a long one is cut with an ellipsis.',
              attachments: [
                { id: 'f1', name: 'Button.tsx', kind: 'file', detail: '142 lines' },
                { id: 'f2', name: 'Variants', kind: 'image', image: pic('#58c47a', 10), detail: 'as it is now' },
              ],
            },
  },
  {
    id: 'pearcast',
    title: 'Pearcast',
    subject: 'Episode 214 · cold open',
    preset: { ...SIDEBAR, times: false, attach: true },
    agent: agent('Editor'),
    peers: [],
    placeholder: 'Ask the editor',
    emptyText: 'The editor has this segment open. Ask for a cut, a title, a summary.',
    starters: ['Tighten this segment', 'Suggest three titles'],
    seed: () => [
      { id: 's1', author: ME, text: 'The cold open drags. Where would you cut?', at: Date.now() - 9 * min },
      { id: 's2', author: agent('Editor'), text: 'Two places. The second "so, anyway" at 0:41 restarts the thought, and the aside about the microphone at 1:12 never pays off. Cutting both takes the open from 1:58 to 1:31 and it lands on the question sooner.', at: Date.now() - 9 * min + 9000 },
    ],
    answer: (q, i) =>
      /title/i.test(q)
        ? {
            text: 'Three titles for this one:',
            options: [
              { id: 'a', label: 'The Signature Nobody Checked' },
              { id: 'b', label: 'One Run in Eight' },
              { id: 'c', label: 'Why It Worked the First Time' },
            ],
          }
        : i % 2
          ? { text: 'Done as a suggestion, nothing is changed yet: three cuts marked on the timeline, 27 seconds in total. Play from 0:35 to hear the first one.' }
          : { text: 'I would keep the laugh at 0:52. It is the only place the open breathes, and the cut right after it is cleaner with it in.' },
  },
  {
    id: 'room',
    title: 'rKeyChat room',
    subject: 'Pearkit crew · 4 people',
    preset: ROOM,
    agent: agent('Pear'),
    peers: [ANA, TOMAS],
    placeholder: 'Message Pearkit crew',
    emptyText: 'Nothing here yet.',
    starters: [],
    seed: () => {
      const y = Date.now() - 26 * 60 * min;
      const t = Date.now() - 40 * min;
      const list: ChatMessage[] = [
        { id: 'r0', author: SYSTEM, text: 'Ana added Tomás to the room', at: y - min },
        { id: 'r1', author: ANA, text: 'New drag bar is in the library. Bolder, 75% of the gap.', at: y, reactions: { '🎉': ['tomas', 'me'] } },
        { id: 'r2', author: TOMAS, text: 'Tried it on the tablet, the grab area is finally big enough.', at: y + 2 * min },
        { id: 'r3', author: TOMAS, text: 'One thing: it disappears on the light theme.', at: y + 2.4 * min, reactions: { '👀': ['ana'] } },
        { id: 'r4', author: ME, text: 'Good catch. It should use the overlay colour, not white.', at: y + 6 * min, replyTo: 'r3', status: 'sent' },
        { id: 'r5', author: ANA, text: 'Morning. Chat pieces today?', at: t },
        { id: 'r6', author: ME, text: 'Yes. One set for the sidebar chats and for rooms like this one.', at: t + min, status: 'sent' },
        { id: 'r7', author: ME, text: 'Same messages, same composer. The sidebar just switches most of it off.', at: t + 1.3 * min, status: 'sent', reactions: { '👍': ['ana'] } },
        { id: 'r8', author: agent('Pear'), text: 'I can keep a summary of this room pinned at the top if that helps. Say "@Pear summarize".', at: t + 3 * min },
      ];
      return list;
    },
    answer: (q) =>
      /summar/i.test(q)
        ? { text: 'So far: the new drag bar shipped and works on the tablet; it is invisible on the light theme and Guy will move it to the overlay colour; today is the shared chat pieces.' }
        : { text: 'Noted. I only answer in here when someone writes @Pear.' },
  },
];

export const PEER_LINES = ['Makes sense.', 'Can you show it on the phone width too?', 'I like the compact one for sidebars.', 'Replies need to show who is being answered, even when it scrolled away.', 'ok, trying it now', 'That works for me 🍐'];
