import * as React from 'react';
import Space from '..';
import Input from '../../input';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('space', {
  testRootProps: false,
});

rootPropsTest('space', (props) => (
  <Space {...props}>
    <Input />
    <Input />
  </Space>
));

rootPropsTest(
  'space',
  (props) => (
    <Space.Compact {...props}>
      <Input />
      <Input />
    </Space.Compact>
  ),
  {
    name: 'Space.Compact',
  },
);
