import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('anchor', {
  testRootProps: false,
});

rootPropsTest(
  'anchor',
  (Anchor, props) => (
    <Anchor
      {...props}
      items={[
        {
          key: 'part-1',
          href: '#part-1',
          title: 'Part 1',
        },
      ]}
    />
  ),
  {
    findRootElements: () => document.querySelector('.ant-anchor-wrapper')!,
  },
);
