import * as React from 'react';
import Tooltip from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('tooltip', {
  testRootProps: false,
});

rootPropsTest(
  'tooltip',
  (props) => (
    <Tooltip {...props} title="Bamboo">
      <span />
    </Tooltip>
  ),
  {
    findRootElements: () => document.querySelector('.ant-tooltip')!,
  },
);
