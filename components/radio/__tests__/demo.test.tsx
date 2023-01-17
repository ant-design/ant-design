import * as React from 'react';
import Radio from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('radio');

rootPropsTest(
  'radio',
  (props) => (
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
