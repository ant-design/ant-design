import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('tree-select', {
  testRootProps: false,
  skip: ['component-token.tsx'],
});

rootPropsTest('tree-select', (TreeSelect, props) => <TreeSelect {...props} />, {
  findRootElements: () => document.querySelectorAll('.ant-select, .ant-select-dropdown'),
  expectCount: 2,
});
