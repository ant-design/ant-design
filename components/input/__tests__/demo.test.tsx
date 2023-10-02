import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('input', {
  skip: ['component-token.tsx'],
});

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

rootPropsTest('input', (Input, props) => <Input.TextArea {...props} />, {
  name: 'textarea',
});
