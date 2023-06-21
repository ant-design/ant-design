import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';
import { fireEvent } from '../../../tests/utils';

demoTest('mentions', {
  testRootProps: false,
});

rootPropsTest(
  'mentions',
  (Mentions, props) => (
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
  ),
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
