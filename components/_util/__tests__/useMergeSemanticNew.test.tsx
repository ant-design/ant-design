import React from 'react';

import { render } from '../../../tests/utils';
import { useMergeSemantic } from '../hooks/useMergeSemanticNew';
import { fillObjectBySchema } from '../hooks/useMergeSemanticNew/utils';

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
    const schema = { dragger: { _default: 'default' }, level1: { level2: {} } };

    const result: DemoSemanticType['styles'] = { dragger: {}, level1: { level2: {} } };
    expect(fillObjectBySchema({}, schema)).toEqual(result);
    const obj2: DemoSemanticType['styles'] = {
      root: { width: 1 },
      dragger: { default: { width: 2 } },
      level1: { level2: { level3: { width: 3 } } },
    };
    expect(fillObjectBySchema(obj2, schema)).toEqual(obj2);

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
