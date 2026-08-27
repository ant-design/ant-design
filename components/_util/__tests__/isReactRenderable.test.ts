import { isReactRenderable } from '../is';

describe('isReactRenderable', () => {
  it('filters nullish, empty-string, and boolean nodes', () => {
    expect(isReactRenderable(0)).toBe(true);
    expect(isReactRenderable('content')).toBe(true);
    expect(isReactRenderable([])).toBe(true);

    expect(isReactRenderable('')).toBe(false);
    expect(isReactRenderable(true)).toBe(false);
    expect(isReactRenderable(false)).toBe(false);
    expect(isReactRenderable(null)).toBe(false);
    expect(isReactRenderable(undefined)).toBe(false);
  });
});
