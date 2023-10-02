import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('typography');

rootPropsTest('typography', (Typography, props) => <Typography.Title {...props} />, {
  name: 'Typography.Title',
});

rootPropsTest('typography', (Typography, props) => <Typography.Text {...props} />, {
  name: 'Typography.Text',
});

rootPropsTest('typography', (Typography, props) => <Typography.Paragraph {...props} />, {
  name: 'Typography.Paragraph',
});
