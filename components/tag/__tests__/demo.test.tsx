import * as React from 'react';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('tag', {
  skip: ['component-token.tsx'],
});

rootPropsTest('tag', (Tag, props) => <Tag.CheckableTagGroup {...props} />, {
  name: 'Tag.CheckableTagGroup',
});
