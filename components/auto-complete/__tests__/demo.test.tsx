import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('auto-complete', {
  testRootProps: false,
});

rootPropsTest(
  'auto-complete',
  (AutoComplete, props) => <AutoComplete {...props} options={[{ value: 'ddd' }]} />,
  {
    findRootElements: () => document.querySelectorAll('.ant-select, .ant-select-dropdown'),
    expectCount: 2,
  },
);
