import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('checkbox');

rootPropsTest(
  'checkbox',
  (Checkbox, props) => <Checkbox.Group {...props} value={[]} options={['Bamboo']} />,
  {
    name: 'Checkbox.Group',
  },
);
