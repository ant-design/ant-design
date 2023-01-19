import * as React from 'react';
import Popconfirm from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('popconfirm', {
  testRootProps: false,
});

rootPropsTest(
  'popconfirm',
  (props) => (
    <Popconfirm {...props}>
      <span />
    </Popconfirm>
  ),
  {
    findRootElements: () => document.querySelector('.ant-popover')!,
  },
);
