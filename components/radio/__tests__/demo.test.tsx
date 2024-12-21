import * as React from 'react';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('radio', {
  ignoreAttributes: ['name'],
});

rootPropsTest(
  'radio',
  (Radio, props) => (
    <Radio.Group
      {...props}
      options={[
        {
          label: 'Bamboo',
          value: 'bamboo',
        },
      ]}
    />
  ),
  {
    name: 'Radio.Group',
  },
);
