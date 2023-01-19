import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('input-number');

rootPropsTest(
  'input-number',
  (InputNumber, props) => <InputNumber {...props} addonBefore="Bamboo" />,
  {
    name: 'input-number.addonBefore',
  },
);
rootPropsTest('input-number', (InputNumber, props) => <InputNumber {...props} prefix="Bamboo" />, {
  name: 'input-number.prefix',
});
