import { describe, expect, it } from 'vitest';
import { cleanFolderInput, looksLikeFolder, shortPath } from './accessLogic';

describe('a list of what something may reach', () => {
  it('shows paths under home with a tilde', () => {
    expect(shortPath('/Users/guy/Anjou/pearkit', '/Users/guy')).toBe('~/Anjou/pearkit');
    expect(shortPath('/Users/guy', '/Users/guy/')).toBe('~');
    expect(shortPath('/Users/guyx/a', '/Users/guy')).toBe('/Users/guyx/a');
    expect(shortPath('/etc', null)).toBe('/etc');
  });

  it('takes a typed folder as a person pastes it', () => {
    expect(cleanFolderInput('  "~/Anjou/pearkit/" ')).toBe('~/Anjou/pearkit');
    expect(cleanFolderInput('/')).toBe('/');
    expect(looksLikeFolder('~/Anjou')).toBe(true);
    expect(looksLikeFolder('/Users/guy/Anjou')).toBe(true);
    expect(looksLikeFolder('Anjou')).toBe(false);
    expect(looksLikeFolder('~/Anjou/*')).toBe(false);
    expect(looksLikeFolder('  ')).toBe(false);
  });
});
