import * as React from 'react';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('color-picker', {
  testRootProps: false,
  skip: ['presets-line-gradient.tsx'],
});

rootPropsTest('color-picker', (ColorPicker, props) => <ColorPicker {...props} value={undefined} />);
