import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('tooltip', {
  testRootProps: false,
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
