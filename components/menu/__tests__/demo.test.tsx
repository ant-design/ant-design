import * as React from 'react';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';
import { TriggerMockContext } from '../../../tests/shared/demoTestContext';
import { render } from '../../../tests/utils';
import ScrollableSubmenu from '../demo/scrollable-submenu';

demoTest('menu', { testRootProps: false });

it('renders the scroll fade popup in the deterministic visual state', () => {
  const { container } = render(
    <TriggerMockContext.Provider value={{ popupVisible: true }}>
      <ScrollableSubmenu />
    </TriggerMockContext.Provider>,
  );

  expect(container.querySelector('.ant-segmented-item-selected')).toHaveTextContent('Vertical');

  const popup = container.querySelector('.scrollable-submenu-popup');
  expect(popup).toBeTruthy();
  expect(popup).not.toHaveClass('ant-menu-submenu-hidden');
  expect(popup).toHaveClass('ant-menu-scroll-fade');
  expect(popup?.querySelectorAll('.ant-menu-item')).toHaveLength(24);
});

rootPropsTest(
  'menu',
  (Menu, props) => (
    <Menu
      {...props}
      mode="vertical"
      openKeys={['lbl2']}
      items={[
        {
          label: 'Label 1',
          key: 'lbl1',
        },
        {
          label: 'Label 2',
          key: 'lbl2',
          children: [
            {
              label: 'Label 3',
              key: 'lbl3',
            },
          ],
        },
      ]}
    />
  ),
  {
    findRootElements: (container) =>
      container.querySelectorAll('.ant-menu-root, .ant-menu-submenu-popup'),
  },
);
