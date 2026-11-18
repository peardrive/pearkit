/**
 * A small Markdown reader with no dependency: the constructs a chat message or an agent's answer uses, and no
 * more. Pure functions, so they can be tested without a screen and used by hosts that draw the result themselves.
 *
 * Blocks: paragraphs, headings (`#`..`###`), fenced code, `-`/`*`/`1.` lists, `>` quotes, horizontal rules.
 * Inline: **bold**, *italic*, `code`, [links](url). A backslash escapes the character after it.
 *
 * One line break inside a paragraph is kept as a line break (people write chat messages that way), not folded
 * into a space as a document renderer would.
 */

export type Inline =
  | { type: 'text'; text: string }
  | { type: 'bold'; children: Inline[] }
  | { type: 'italic'; children: Inline[] }
  | { type: 'code'; text: string }
  | { type: 'link'; href: string; children: Inline[] };

export type Block =
  | { type: 'paragraph'; children: Inline[] }
  | { type: 'heading'; level: 1 | 2 | 3; children: Inline[] }
  | { type: 'code'; lang?: string; text: string }
  | { type: 'list'; ordered: boolean; start: number; items: Inline[][] }
  | { type: 'quote'; children: Block[] }
  | { type: 'hr' };

const FENCE = /^\s*```\s*([\w+-]*)\s*$/;
const HR = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
const HEADING = /^\s*(#{1,6})\s+(.+?)\s*#*\s*$/;
const BULLET = /^\s*[-*+]\s+(.*)$/;
const NUMBERED = /^\s*(\d{1,9})[.)]\s+(.*)$/;
const QUOTE = /^\s*>\s?(.*)$/;
const LINK = /^\[([^\]]*)\]\(([^)\s]+)\)/;
const PUNCT = /[\\`*_{}[\]()#+\-.!>~|]/;

/** The blocks of a Markdown text, in order. */
export function parseMarkdown(text: string | null | undefined): Block[] {
  text = text ?? '' // a message with only an attachment has no text
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ type: 'paragraph', children: parseInline(para.join('\n')) });
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    const fence = FENCE.exec(line);
    if (fence) {
      flush();
      const code: string[] = [];
      i++;
      while (i < lines.length && !FENCE.test(lines[i]!)) code.push(lines[i++]!);
      blocks.push({ type: 'code', lang: fence[1] || undefined, text: code.join('\n') });
      continue;
    }

    if (!line.trim()) {
      flush();
      continue;
    }

    if (HR.test(line)) {
      flush();
      blocks.push({ type: 'hr' });
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      flush();
      blocks.push({ type: 'heading', level: Math.min(3, heading[1]!.length) as 1 | 2 | 3, children: parseInline(heading[2]!) });
      continue;
    }

    const quote = QUOTE.exec(line);
    if (quote) {
      flush();
      const inner = [quote[1]!];
      while (i + 1 < lines.length && QUOTE.test(lines[i + 1]!)) inner.push(QUOTE.exec(lines[++i]!)![1]!);
      blocks.push({ type: 'quote', children: parseMarkdown(inner.join('\n')) });
      continue;
    }

    const numbered = NUMBERED.exec(line);
    const bullet = numbered ? null : BULLET.exec(line);
    if (numbered || bullet) {
      flush();
      const ordered = !!numbered;
      const items: string[] = [numbered ? numbered[2]! : bullet![1]!];
      const start = numbered ? Number(numbered[1]) : 1;
      while (i + 1 < lines.length) {
        const next = lines[i + 1]!;
        const n = NUMBERED.exec(next);
        const b = n ? null : BULLET.exec(next);
        if ((ordered && n) || (!ordered && b)) {
          items.push(n ? n[2]! : b![1]!);
          i++;
        } else if (/^\s+\S/.test(next) && !FENCE.test(next)) {
          // An indented line goes on with the item above it.
          items[items.length - 1] += '\n' + next.trim();
          i++;
        } else break;
      }
      blocks.push({ type: 'list', ordered, start, items: items.map(parseInline) });
      continue;
    }

    para.push(line);
  }
  flush();
  return blocks;
}

/** The spans of one run of text: plain, bold, italic, code and links, nested where Markdown nests them. */
export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let plain = '';
  const push = (node: Inline) => {
    if (plain) {
      out.push({ type: 'text', text: plain });
      plain = '';
    }
    out.push(node);
  };
  const isWord = (c: string | undefined) => !!c && /\w/.test(c);

  let i = 0;
  while (i < text.length) {
    const c = text[i]!;
    const next = text[i + 1];

    if (c === '\\' && next && PUNCT.test(next)) {
      plain += next;
      i += 2;
      continue;
    }

    if (c === '`') {
      const end = text.indexOf('`', i + 1);
      if (end > i + 1) {
        push({ type: 'code', text: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if ((c === '*' || c === '_') && next === c) {
      const end = findClosing(text, c + c, i + 2);
      if (end > i + 2) {
        push({ type: 'bold', children: parseInline(text.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }

    if (c === '*' || c === '_') {
      const inWord = c === '_' && isWord(text[i - 1]);
      const end = inWord ? -1 : findClosing(text, c, i + 1);
      if (end > i + 1 && text[end - 1] !== ' ' && text[i + 1] !== ' ' && (c !== '_' || !isWord(text[end + 1]))) {
        push({ type: 'italic', children: parseInline(text.slice(i + 1, end)) });
        i = end + 1;
        continue;
      }
    }

    if (c === '[') {
      const m = LINK.exec(text.slice(i));
      if (m) {
        push({ type: 'link', href: m[2]!, children: parseInline(m[1]!) });
        i += m[0].length;
        continue;
      }
    }

    plain += c;
    i++;
  }
  if (plain) out.push({ type: 'text', text: plain });
  return out;
}

/** Where `mark` closes, skipping code spans, or -1. */
function findClosing(text: string, mark: string, from: number): number {
  let i = from;
  while (i < text.length) {
    if (text[i] === '\\') {
      i += 2;
      continue;
    }
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1);
      if (end > 0) {
        i = end + 1;
        continue;
      }
    }
    if (text.startsWith(mark, i)) {
      // `**` closes `**`, but a lone `*` must not close a `**` run.
      if (mark.length === 1 && text[i + 1] === mark) {
        i += 2;
        continue;
      }
      // `***` closing a `**` run: the inner `*` closes an italic, the last two close the bold.
      if (mark.length === 2 && text[i + 2] === mark[0] && text[i + 3] !== mark[0]) return i + 1;
      return i;
    }
    i++;
  }
  return -1;
}

/** The words of a Markdown text with every mark taken off: for a one-line preview, a notification, a search index. */
export function plainText(text: string | null | undefined): string {
  const inlineText = (nodes: Inline[]): string =>
    nodes.map((n) => (n.type === 'text' || n.type === 'code' ? n.text : inlineText(n.children))).join('');
  const blockText = (b: Block): string => {
    switch (b.type) {
      case 'paragraph':
      case 'heading':
        return inlineText(b.children);
      case 'code':
        return b.text;
      case 'list':
        return b.items.map(inlineText).join('\n');
      case 'quote':
        return b.children.map(blockText).join('\n');
      case 'hr':
        return '';
    }
  };
  return parseMarkdown(text).map(blockText).filter(Boolean).join('\n');
}
