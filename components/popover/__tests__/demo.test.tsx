import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('popover', {
  testRootProps: false,
});

rootPropsTest(
  'popover',
  (Popover, props) => (
    <Popover {...props} title="Bamboo" content="Little">
      <span />
    </Popover>
  ),
  {
    findRootElements: () => document.querySelector('.ant-popover')!,
  },
);
