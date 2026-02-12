import React from 'react';

import { render } from '../../../tests/utils';
import { useMergeSemantic } from '../hooks/useMergeSemanticNew';
import { fillObjectBySchema, stringCovertObjectBySchema } from '../hooks/useMergeSemanticNew/utils';

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

describe('useMergeSemanticNew,', () => {
  it('utils fillObjectBySchema', () => {
    const schema1 = { dragger: { _default: 'default' }, level1: { level2: { level3: {} } } };

    expect(fillObjectBySchema({}, schema1)).toEqual({
      dragger: {},
      level1: { level2: { level3: {} } },
    });

    expect(
      fillObjectBySchema(
        {
          root: { width: 1 },
          dragger: { default: { width: 2 } },
          level1: { level2: { level3: { width: 3 } } },
        },
        schema1,
      ),
    ).toEqual({
      root: { width: 1 },
      dragger: { default: { width: 2 } },
      level1: { level2: { level3: { width: 3 } } },
    });

    expect(
      fillObjectBySchema({ level1: { level2: { level3: { color: 'red' } } } }, schema1),
    ).toEqual({
      level1: { level2: { level3: { color: 'red' } } },
      dragger: {},
    });
  });
  it('utils stringCovertObjectBySchema', () => {
    const schema1 = { dragger: { _default: 'default' } };

    const result1 = { root: 'root-class', dragger: { default: 'dragger-class' } };
    const list: NonNullable<DemoSemanticType['classNames']>[] = [
      // need fill
      { root: 'root-class', dragger: 'dragger-class' },
      // no need fill
      { root: 'root-class', dragger: { default: 'dragger-class' } },
    ];
    expect(stringCovertObjectBySchema(list[0], schema1)).toEqual(result1);
    expect(stringCovertObjectBySchema(list[1], schema1)).toEqual(result1);
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
