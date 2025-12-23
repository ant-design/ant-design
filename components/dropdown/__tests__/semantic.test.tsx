import React from 'react';
import { SaveOutlined } from '@ant-design/icons';

import Dropdown from '..';
import { render } from '../../../tests/utils';
import type { MenuProps } from '../../menu';

describe('Dropdown.Semantic', () => {
  it('support classNames and styles', () => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        type: 'group',
        label: 'Group title',
        children: [
          {
            key: '1-1',
            label: '1st menu item',
            icon: <SaveOutlined />,
          },
          {
            key: '1-2',
            label: '2nd menu item',
            icon: <SaveOutlined />,
          },
        ],
      },
      {
        key: 'SubMenu',
        label: 'SubMenu',
        children: [
          {
            key: 'g1',
            label: 'Item 1',
            type: 'group',
            children: [
              { key: '1', label: 'Option 1' },
              { key: '2', label: 'Option 2' },
            ],
          },
        ],
      },
    ];
    const testClassNames = {
      root: 'test-root',
      itemTitle: 'test-menu-item-title',
      item: 'test-menu-item',
      itemContent: 'test-menu-item-content',
      itemIcon: 'test-menu-item-icon',
    };
    const testStyles = {
      root: { backgroundColor: 'rgb(0, 0, 255)' },
      itemTitle: { color: 'rgb(255, 0, 0)' },
      item: { backgroundColor: 'rgb(0, 255, 0)' },
      itemContent: { color: 'rgb(255, 255, 0)' },
      itemIcon: { fontSize: '20px' },
    };
    const { container } = render(
      <Dropdown menu={{ items }} open classNames={testClassNames} styles={testStyles}>
        <button type="button">button</button>
      </Dropdown>,
    );
    const root = container.querySelector('.ant-dropdown');
    const item = container.querySelector('.ant-dropdown-menu-item');
    const itemIcon = container.querySelector('.ant-dropdown-menu-item-icon');
    const itemContent = container.querySelector('.ant-dropdown-menu-title-content');
    const itemTitle = container.querySelector('.ant-dropdown-menu-item-group-title');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(item).toHaveClass(testClassNames.item);
    expect(item).toHaveStyle(testStyles.item);
    expect(itemIcon).toHaveClass(testClassNames.itemIcon);
    expect(itemIcon).toHaveStyle(testStyles.itemIcon);
    expect(itemContent).toHaveClass(testClassNames.itemContent);
    expect(itemContent).toHaveStyle(testStyles.itemContent);
    expect(itemTitle).toHaveClass(testClassNames.itemTitle);
    expect(itemTitle).toHaveStyle(testStyles.itemTitle);
  });
});
