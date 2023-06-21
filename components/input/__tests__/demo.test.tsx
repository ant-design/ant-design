import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('input');

rootPropsTest(
  'input',
  (Input, props) => <Input addonBefore="Bamboo" addonAfter="Light" {...props} />,
  {
    name: 'addon',
  },
);

rootPropsTest('input', (Input, props) => <Input.Password {...props} />, {
  name: 'password',
});
