import React from 'react';

import { render } from '../../../tests/utils';
import { useMergeSemantic } from '../hooks/useMergeSemanticNew';
import { fillObjectBySchema } from '../hooks/useMergeSemanticNew/utils';

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
