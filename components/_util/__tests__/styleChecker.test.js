/**
 * @jest-environment node
 */
import * as styleChecker from '../styleChecker';

describe('test styleChecker.js in node', () => {
  it('can not use dom', () => {
    expect(!!styleChecker.canUseDocElement()).toBe(false);
  });

  it('can not use flex', () => {
    expect(styleChecker.detectFlexGapSupported()).toBe(false);
  });
});
