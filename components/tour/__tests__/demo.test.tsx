import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('tour', {
  testRootProps: false,
});

rootPropsTest(
  'tour',
  (Tour, props) => (
    <Tour
      {...props}
      steps={[
        {
          title: 'Bamboo',
          description: 'Little',
        },
      ]}
    />
  ),
  {
    expectCount: 3,
    findRootElements: () =>
      Array.from(
        document.body.querySelectorAll('.ant-tour, .ant-tour-target-placeholder, .ant-tour-mask'),
      ),
  },
);
