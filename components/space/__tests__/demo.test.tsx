import * as React from 'react';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('space', {
  testRootProps: false,
});

rootPropsTest('space', (Space, props) => (
  <Space {...props}>
    <input />
    <input />
  </Space>
));

rootPropsTest(
  'space',
  (Space, props) => (
    <Space.Compact {...props}>
      <input />
      <input />
    </Space.Compact>
  ),
  {
    name: 'Space.Compact',
  },
);
