import * as React from 'react';
import InputNumber from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('input-number');

rootPropsTest('input-number', (props) => <InputNumber {...props} addonBefore="Bamboo" />, {
  name: 'input-number.addonBefore',
});
rootPropsTest('input-number', (props) => <InputNumber {...props} prefix="Bamboo" />, {
  name: 'input-number.prefix',
});
