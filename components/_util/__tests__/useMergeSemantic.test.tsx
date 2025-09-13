import { renderHook } from '@testing-library/react';

import useMergeSemantic, { mergeClassNames } from '../hooks/useMergeSemantic';

// Mock schema
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
      useMergeSemantic({
        classNamesList: [{ a: 'foo' }, { a: 'bar' }],
        stylesList: [{ a: { color: 'blue' } }],
      }),
    );

    const [classNames, styles] = result.current;
    expect(classNames).toEqual({ a: 'foo bar' });
    expect(styles).toEqual({ a: { color: 'blue' } });
  });

  it('should merge with schema', () => {
    const { result } = renderHook(() =>
      useMergeSemantic({
        classNamesList: [{ container: { header: 'foo' } }],
        stylesList: [{ container: { header: { color: 'red' } } }],
        schema: mockSchema,
      }),
    );
    const [classNames, styles] = result.current;
    expect(classNames.container.header).toHaveProperty('header-root', 'foo');
    expect(styles.container.header).toEqual({ color: 'red' });
  });
});
