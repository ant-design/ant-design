import * as React from 'react';
import Cascader from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('cascader', {
  testRootProps: false,
});

rootPropsTest('cascader', (props) => <Cascader {...props} />, {
  findRootElements: () => document.querySelectorAll('.ant-cascader, .ant-cascader-dropdown'),
  expectCount: 2,
});
