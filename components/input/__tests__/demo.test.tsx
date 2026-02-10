import * as React from 'react';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('input', {
  skip: ['component-token.tsx', 'group.tsx', 'compact-style.tsx', 'align.tsx', 'addon.tsx'],
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
