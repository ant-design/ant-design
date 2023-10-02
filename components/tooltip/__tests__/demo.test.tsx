import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('tooltip', {
  testRootProps: false,
  skip: ['shift.tsx', 'debug.tsx'],
});

rootPropsTest(
  'tooltip',
  (Tooltip, props) => (
    <Tooltip {...props} title="Bamboo">
      <span />
    </Tooltip>
  ),
  {
    findRootElements: () => document.querySelector('.ant-tooltip')!,
  },
);
