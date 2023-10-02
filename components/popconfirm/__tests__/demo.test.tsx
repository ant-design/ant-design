import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('popconfirm', {
  testRootProps: false,
});

rootPropsTest(
  'popconfirm',
  (Popconfirm, props) => (
    <Popconfirm {...props}>
      <span />
    </Popconfirm>
  ),
  {
    findRootElements: () => document.querySelector('.ant-popover')!,
  },
);
