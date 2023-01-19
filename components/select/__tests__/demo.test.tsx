import * as React from 'react';
import Select from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('select', {
  skip: ['render-panel.tsx'],
  testRootProps: false,
});

rootPropsTest('select', (props) => <Select {...props} />, {
  findRootElements: () => document.querySelectorAll('.ant-select, .ant-select-dropdown'),
  expectCount: 2,
});
