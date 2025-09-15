import * as React from 'react';
import { UnstableContext } from '@rc-component/mentions';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';
import { fireEvent } from '../../../tests/utils';

demoTest('mentions', {
  testRootProps: false,
});

rootPropsTest(
  'mentions',
  (Mentions, props) => {
    return (
      <UnstableContext.Provider value={React.useMemo(() => ({ open: true }), [])}>
        <Mentions
          {...props}
          value="@"
          options={[
            {
              value: 'afc163',
              label: 'afc163',
            },
          ]}
        />
      </UnstableContext.Provider>
    );
  },
  {
    afterRender: (container) => {
      const char = '@';

      const myKeyEvent = {
        which: char.charCodeAt(0),
        key: char,
        target: {
          value: char,
          selectionStart: char.length,
        },
      };

      fireEvent.keyDown(container.querySelector('textarea')!, myKeyEvent);
    },
    findRootElements: () => document.querySelectorAll('.ant-mentions, .ant-mentions-dropdown'),
    expectCount: 2,
  },
);
