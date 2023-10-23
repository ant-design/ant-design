import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('badge');

rootPropsTest('badge', (Badge, props) => <Badge.Ribbon {...props} />, {
  name: 'Badge.Ribbon',
});
