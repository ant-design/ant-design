import * as React from 'react';
import Dropdown from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('dropdown', {
  testRootProps: false,
});

rootPropsTest(
  'dropdown',
  (props) => (
    <Dropdown
      {...props}
      menu={{
        openKeys: ['1'],
        items: [
          {
            key: '1',
            label: 'parent',
            children: [
              {
                key: '2',
                label: 'child',
              },
            ],
          },
        ],
      }}
    >
      <a />
    </Dropdown>
  ),
  {
    findRootElements: () => document.querySelector('.ant-dropdown')!,
  },
);
