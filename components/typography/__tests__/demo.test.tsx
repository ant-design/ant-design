import * as React from 'react';
import Typography from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('typography');

rootPropsTest('typography', (props) => <Typography.Title {...props} />, {
  name: 'Typography.Title',
});

rootPropsTest('typography', (props) => <Typography.Text {...props} />, {
  name: 'Typography.Text',
});

rootPropsTest('typography', (props) => <Typography.Paragraph {...props} />, {
  name: 'Typography.Paragraph',
});
