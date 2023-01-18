import * as React from 'react';
import Checkbox from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('checkbox');

rootPropsTest(
  'checkbox',
  (props) => <Checkbox.Group {...props} value={[]} options={['Bamboo']} />,
  {
    name: 'Checkbox.Group',
  },
);
