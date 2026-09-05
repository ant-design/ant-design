import React from 'react';
import { renderHook } from '@testing-library/react';

import { render } from '../../../tests/utils';
import { mergeStyles, useMergeSemantic } from '../hooks/useMergeSemantic';
import type { SemanticSchema } from '../hooks/useMergeSemantic';
import { fillObjectBySchema } from '../hooks/useMergeSemantic/utils';

type DemoSemanticType = {
  classNames?: {
    root?: string;
    dragger?: string | { default?: string };
    level1?: { level2?: { level3?: string } };
  };
  styles?: {
    root?: React.CSSProperties;
    dragger?: { default?: React.CSSProperties; active?: React.CSSProperties };
    level1?: { level2?: { level3?: React.CSSProperties } };
  };
};

describe('useMergeSemantic,', () => {
  it('preserves the exported flat merge interface and explicit CSS resets', () => {
    const contextStyles = Object.freeze({ root: Object.freeze({ color: 'red', padding: 12 }) });
    const localStyles = { root: { color: undefined, padding: 0 } };

    expect(
      mergeStyles<{ root?: React.CSSProperties }>(contextStyles, undefined, localStyles, {
        root: undefined,
      }),
    ).toStrictEqual({
      root: { color: undefined, padding: 0 },
    });
    expect(mergeStyles()).toEqual({});
    expect(contextStyles.root).toEqual({ color: 'red', padding: 12 });
  });

  it('merges nested style properties without mutating the sources', () => {
    const contextStyles = Object.freeze({
      popup: Object.freeze({
        root: Object.freeze({ color: 'red', padding: 12 }),
        list: Object.freeze({ margin: 8 }),
      }),
    });
    const localStyles = Object.freeze({
      popup: Object.freeze({ root: Object.freeze({ color: 'blue' }) }),
    });

    const { result } = renderHook(() =>
      useMergeSemantic(
        [],
        [contextStyles, localStyles],
        { props: {} },
        {
          popup: { _default: 'root' },
        },
      ),
    );

    expect(result.current[1]).toEqual({
      popup: { root: { color: 'blue', padding: 12 }, list: { margin: 8 } },
    });
    expect(contextStyles.popup.root).toEqual({ color: 'red', padding: 12 });
    expect(localStyles.popup.root).toEqual({ color: 'blue' });
  });

  it('merges multiple semantic levels and preserves explicit CSS property resets', () => {
    const { result } = renderHook(() =>
      useMergeSemantic<NonNullable<DemoSemanticType['classNames']>, DemoSemanticType['styles']>(
        [],
        [
          {
            root: { color: 'red', padding: 12 },
            dragger: { default: { color: 'red', margin: 4 } },
            level1: { level2: { level3: { color: 'red', margin: 4, opacity: 0.5 } } },
          },
          undefined,
          {
            root: { padding: 0 },
            dragger: { default: undefined },
            level1: { level2: { level3: { color: undefined, opacity: 0 } } },
          },
        ],
        { props: {} },
        { dragger: { _default: 'default' }, level1: { level2: {} } },
      ),
    );

    expect(result.current[1]).toEqual({
      root: { color: 'red', padding: 0 },
      dragger: { default: { color: 'red', margin: 4 } },
      level1: { level2: { level3: { color: undefined, margin: 4, opacity: 0 } } },
    });
  });

  it('recomputes styles when the semantic schema changes', () => {
    const contextStyles = { popup: { root: { color: 'red', padding: 12 } } };
    const localStyles = { popup: { root: { color: 'blue' } } };
    const { result, rerender } = renderHook(
      ({ schema }: { schema: SemanticSchema }) =>
        useMergeSemantic([], [contextStyles, localStyles], { props: {} }, schema),
      { initialProps: { schema: {} } },
    );
    expect(result.current[1].popup.root).toEqual({ color: 'blue' });

    rerender({ schema: { popup: { _default: 'root' } } });
    expect(result.current[1].popup.root).toEqual({ color: 'blue', padding: 12 });
  });

  it('utils fillObjectBySchema', () => {
    const schema = { dragger: { _default: 'default' }, level1: { level2: {} } };
    // test 1
    const obj1: DemoSemanticType['styles'] = {};
    const result: DemoSemanticType['styles'] = { dragger: {}, level1: { level2: {} } };
    expect(fillObjectBySchema(obj1, schema)).toEqual(result);
    // test 2
    const obj2: DemoSemanticType['styles'] = {
      root: { width: 1 },
      dragger: { default: { width: 2 } },
      level1: { level2: { level3: { width: 3 } } },
    };
    expect(fillObjectBySchema(obj2, schema)).toEqual(obj2);
    // test 3
    const obj3: DemoSemanticType['styles'] = { level1: { level2: { level3: { color: 'red' } } } };
    expect(fillObjectBySchema(obj3, schema)).toEqual({ ...obj3, dragger: {} });
  });

  it('merge with mixed _default', () => {
    type ClassNames = {
      popup?: string | { root?: string };
    };
    const schema = { popup: { _default: 'root' } };

    const Test = ({ classNames }: { classNames?: ClassNames }) => {
      const myClassNames = {
        popup: {
          root: 'internal-popup-root',
        },
      };

      const [mergedClassNames] = useMergeSemantic(
        [classNames, myClassNames],
        [],
        { props: {} },
        schema,
      );

      return <div className="bamboo">{mergedClassNames.popup.root}</div>;
    };

    const { container } = render(<Test classNames={{ popup: 'external-popup-root' }} />);
    expect(container.querySelector('.bamboo')).toHaveTextContent(
      'external-popup-root internal-popup-root',
    );
  });
});
