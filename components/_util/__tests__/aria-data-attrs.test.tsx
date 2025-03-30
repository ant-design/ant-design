import { getAriaDataAttrs } from '../aria-data-attrs';

describe('aria-data-attrs', () => {
  it('should return aria data attributes', () => {
    const props = {
      className: 'test',
      title: 'test',
      'aria-label': 'label',
      'data-test': 'test',
      role: 'button',
    };
    const result = getAriaDataAttrs(props);
    expect(result).toEqual({
      'aria-label': 'label',
      'data-test': 'test',
      role: 'button',
    });
  });

  it('should ignore non-aria data attributes', () => {
    const props = {
      className: 'test',
      style: { color: 'red' },
    };
    const result = getAriaDataAttrs(props);
    expect(result).toEqual({});
  });
});
