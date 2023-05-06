import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('cascader', {
  testRootProps: false,
});

rootPropsTest('cascader', (Cascader, props) => <Cascader {...props} />, {
  findRootElements: () => document.querySelectorAll('.ant-cascader, .ant-cascader-dropdown'),
  expectCount: 2,
});
