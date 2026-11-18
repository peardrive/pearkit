import { describe, expect, test } from 'vitest';

import { parseInline, parseMarkdown, plainText } from './markdown';

describe('blocks', () => {
  test('a paragraph; a blank line starts another; one line break inside is kept', () => {
    expect(parseMarkdown('one\ntwo\n\nthree')).toEqual([
      { type: 'paragraph', children: [{ type: 'text', text: 'one\ntwo' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'three' }] },
    ]);
  });

  test('headings # to ###; deeper ones become ###', () => {
    expect(parseMarkdown('# One\n## Two\n### Three\n#### Four')).toEqual([
      { type: 'heading', level: 1, children: [{ type: 'text', text: 'One' }] },
      { type: 'heading', level: 2, children: [{ type: 'text', text: 'Two' }] },
      { type: 'heading', level: 3, children: [{ type: 'text', text: 'Three' }] },
      { type: 'heading', level: 3, children: [{ type: 'text', text: 'Four' }] },
    ]);
  });

  test('a # without a space is not a heading', () => {
    expect(parseMarkdown('#hashtag')[0]).toEqual({ type: 'paragraph', children: [{ type: 'text', text: '#hashtag' }] });
  });

  test('a fenced code block keeps its lines as they are, with the language', () => {
    expect(parseMarkdown('before\n```ts\nconst a = **1**;\n\n  indented\n```\nafter')).toEqual([
      { type: 'paragraph', children: [{ type: 'text', text: 'before' }] },
      { type: 'code', lang: 'ts', text: 'const a = **1**;\n\n  indented' },
      { type: 'paragraph', children: [{ type: 'text', text: 'after' }] },
    ]);
  });

  test('a fence without a language, and one never closed, still make a code block', () => {
    expect(parseMarkdown('```\nx\n```')).toEqual([{ type: 'code', lang: undefined, text: 'x' }]);
    expect(parseMarkdown('```\nx\ny')).toEqual([{ type: 'code', lang: undefined, text: 'x\ny' }]);
  });

  test('a bulleted list from -, * or +; an indented line goes on with its item', () => {
    expect(parseMarkdown('- one\n* two\n  more\n+ three')).toEqual([
      {
        type: 'list',
        ordered: false,
        start: 1,
        items: [[{ type: 'text', text: 'one' }], [{ type: 'text', text: 'two\nmore' }], [{ type: 'text', text: 'three' }]],
      },
    ]);
  });

  test('a numbered list starts at the first number', () => {
    expect(parseMarkdown('3. three\n4. four')).toEqual([
      { type: 'list', ordered: true, start: 3, items: [[{ type: 'text', text: 'three' }], [{ type: 'text', text: 'four' }]] },
    ]);
  });

  test('a bulleted list and a numbered one are two lists', () => {
    const blocks = parseMarkdown('- a\n1. b');
    expect(blocks.map((b) => b.type === 'list' && b.ordered)).toEqual([false, true]);
  });

  test('a quote holds blocks of its own', () => {
    expect(parseMarkdown('> # Title\n> words\n>\n> - item')).toEqual([
      {
        type: 'quote',
        children: [
          { type: 'heading', level: 1, children: [{ type: 'text', text: 'Title' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'words' }] },
          { type: 'list', ordered: false, start: 1, items: [[{ type: 'text', text: 'item' }]] },
        ],
      },
    ]);
  });

  test('a horizontal rule from ---, *** or ___', () => {
    expect(parseMarkdown('a\n---\n***\n___\nb').map((b) => b.type)).toEqual(['paragraph', 'hr', 'hr', 'hr', 'paragraph']);
  });

  test('windows line endings read the same', () => {
    expect(parseMarkdown('a\r\n\r\nb')).toEqual(parseMarkdown('a\n\nb'));
  });
});

describe('inline', () => {
  test('bold with ** or __', () => {
    expect(parseInline('a **b** c __d__')).toEqual([
      { type: 'text', text: 'a ' },
      { type: 'bold', children: [{ type: 'text', text: 'b' }] },
      { type: 'text', text: ' c ' },
      { type: 'bold', children: [{ type: 'text', text: 'd' }] },
    ]);
  });

  test('italic with * or _', () => {
    expect(parseInline('*a* and _b_')).toEqual([
      { type: 'italic', children: [{ type: 'text', text: 'a' }] },
      { type: 'text', text: ' and ' },
      { type: 'italic', children: [{ type: 'text', text: 'b' }] },
    ]);
  });

  test('an underscore inside a word is a letter, not a mark', () => {
    expect(parseInline('snake_case_name')).toEqual([{ type: 'text', text: 'snake_case_name' }]);
  });

  test('bold and italic nest', () => {
    expect(parseInline('**bold *and italic***')).toEqual([
      { type: 'bold', children: [{ type: 'text', text: 'bold ' }, { type: 'italic', children: [{ type: 'text', text: 'and italic' }] }] },
    ]);
    expect(parseInline('*italic **and bold***')).toEqual([
      { type: 'italic', children: [{ type: 'text', text: 'italic ' }, { type: 'bold', children: [{ type: 'text', text: 'and bold' }] }] },
    ]);
  });

  test('inline code keeps its marks and is not read further', () => {
    expect(parseInline('run `npm **run** x` now')).toEqual([
      { type: 'text', text: 'run ' },
      { type: 'code', text: 'npm **run** x' },
      { type: 'text', text: ' now' },
    ]);
  });

  test('a mark that never closes is plain text', () => {
    expect(parseInline('2 * 3 and `tick')).toEqual([{ type: 'text', text: '2 * 3 and `tick' }]);
    expect(parseInline('**loud')).toEqual([{ type: 'text', text: '**loud' }]);
  });

  test('a link, with marks inside its words', () => {
    expect(parseInline('see [the **docs**](https://peardrive.com/docs?a=1) here')).toEqual([
      { type: 'text', text: 'see ' },
      { type: 'link', href: 'https://peardrive.com/docs?a=1', children: [{ type: 'text', text: 'the ' }, { type: 'bold', children: [{ type: 'text', text: 'docs' }] }] },
      { type: 'text', text: ' here' },
    ]);
  });

  test('brackets that are not a link stay as written', () => {
    expect(parseInline('[not a link] and [no](url with space)')).toEqual([{ type: 'text', text: '[not a link] and [no](url with space)' }]);
  });

  test('a backslash escapes a mark', () => {
    expect(parseInline('\\*not italic\\* and \\`not code\\`')).toEqual([{ type: 'text', text: '*not italic* and `not code`' }]);
  });

  test('a mark inside a code span does not close an outer one', () => {
    expect(parseInline('**a `*` b**')).toEqual([
      { type: 'bold', children: [{ type: 'text', text: 'a ' }, { type: 'code', text: '*' }, { type: 'text', text: ' b' }] },
    ]);
  });
});

describe('plainText', () => {
  test('takes every mark off', () => {
    expect(plainText('# Hi **there**\n\n- `a`\n- [b](x)\n\n> *q*\n\n---\n\n```\ncode\n```')).toBe('Hi there\na\nb\nq\ncode');
  });
});
