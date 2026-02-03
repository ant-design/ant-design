import { renderHook } from '@testing-library/react';

import { fillObjectBySchema, mergeClassNames, useMergeSemantic } from '../hooks';

const mockSchema = {
  // _default: 'root',
  container: {
    // _default: 'container-root',
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
    expect(styles.container.header).toEqual({ 'header-root': { color: 'red' } });

    const schema = { dragger: { _default: 'default' } };

    // string
    const res = { test: 'test', dragger: { default: 'aaa' } };
    expect(fillObjectBySchema({ test: 'test', dragger: 'aaa' }, schema)).toEqual(res);
    expect(fillObjectBySchema({ test: 'test', dragger: { default: 'aaa' } }, schema)).toEqual(res);
    // more fields
    expect(
      fillObjectBySchema({ test: 'test', dragger: { test: 'test', default: 'aaa' } }, schema),
    ).toEqual({ test: 'test', dragger: { test: 'test', default: 'aaa' } });

    // CSS
    const res2 = { test: 'test', dragger: { default: { color: 'red' } } };
    expect(fillObjectBySchema({ test: 'test', dragger: { color: 'red' } }, schema)).toEqual(res2);
    expect(
      fillObjectBySchema({ test: 'test', dragger: { default: { color: 'red' } } }, schema),
    ).toEqual(res2);
    // more fields
    expect(
      fillObjectBySchema(
        { test: 'test', dragger: { test: { background: 'blue' }, default: { color: 'red' } } },
        schema,
      ),
    ).toEqual({
      test: 'test',
      dragger: { test: { background: 'blue' }, default: { color: 'red' } },
    });
  });
});
