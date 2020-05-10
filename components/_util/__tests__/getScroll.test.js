/**
 * @jest-environment node
 */
import getScroll from '../getScroll';

describe('getScroll', () => {
  it('getScroll return 0 in node envioronment', async () => {
    expect(getScroll(null, true)).toBe(0);
    expect(getScroll(null, false)).toBe(0);
  });
});
