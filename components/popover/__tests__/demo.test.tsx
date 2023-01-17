import * as React from 'react';
import Popover from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('popover', {
  testRootProps: false,
});

rootPropsTest(
  'popover',
  (props) => (
    <Popover {...props} title="Bamboo" content="Little">
      <span />
    </Popover>
  ),
  {
    findRootElements: () => document.querySelector('.ant-popover')!,
  },
);
