import * as React from 'react';
import Form from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('form', { skip: ['complex-form-control.tsx', 'dep-debug.tsx'] });

rootPropsTest('form', (props) => <Form.Item {...props} />, {
  name: 'Form.Item',
});
