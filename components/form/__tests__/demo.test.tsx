import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('form', { skip: ['complex-form-control.tsx', 'dep-debug.tsx', 'component-token.tsx'] });

rootPropsTest('form', (Form, props) => <Form.Item {...props} />, {
  name: 'Form.Item',
});
