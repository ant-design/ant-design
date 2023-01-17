import * as React from 'react';
import Input from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('input');

rootPropsTest('input', (props) => <Input addonBefore="Bamboo" addonAfter="Light" {...props} />, {
  name: 'addon',
});

rootPropsTest('input', (props) => <Input.Password {...props} />, {
  name: 'password',
});
