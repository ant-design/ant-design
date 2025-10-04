import { renderHook } from '@testing-library/react';

import useMergeSemantic, { mergeClassNames } from '../hooks/useMergeSemantic';

const mockSchema = {
  _default: 'root',
  container: {
    _default: 'container-root',
    header: {
      _default: 'header-root',
    },
  },
};

describe('useMergeSemantic', () => {
  it('mergeClassNames', () => {
    const result = mergeClassNames(
      {
        dragger: {
          _default: 'default',
        },
      },
      {
        root: 'root-a',
        dragger: 'dragger-a',
      },
      {
        root: 'root-b',
        dragger: {
          default: 'dragger-b-default',
          active: 'dragger-b-active',
        },
      },
      {
        dragger: 'dragger-c',
      },
    );

    expect(result).toEqual({
      root: 'root-a root-b',
      dragger: {
        default: 'dragger-a dragger-b-default dragger-c',
        active: 'dragger-b-active',
      },
    });
  });

  it('should merge without schema', () => {
    const { result } = renderHook(() =>
      useMergeSemantic([{ a: 'foo' }, { a: 'bar' }], [{ a: { color: 'blue' } }], { props: {} }),
    );

    const [classNames, styles] = result.current;
    expect(classNames).toEqual({ a: 'foo bar' });
    expect(styles).toEqual({ a: { color: 'blue' } });
  });

  it('should merge with schema', () => {
    const { result } = renderHook(() =>
      useMergeSemantic(
        [{ container: { header: 'foo' } }],
        [{ container: { header: { color: 'red' } } }],
        { props: {} },
        mockSchema,
      ),
    );

    const [classNames, styles] = result.current;
    expect(classNames.container.header).toHaveProperty('header-root', 'foo');
    expect(styles.container.header).toEqual({ color: 'red' });
  });
});
