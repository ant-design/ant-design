import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import type { MenuProps } from '..';
import Menu from '..';
import { render } from '../../../tests/utils';

describe('Menu.Semantic', () => {
  it('support classNames and styles', () => {
    const items = [
      {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
      },
      {
        key: 'SubMenu',
        label: 'Navigation One',
        icon: <MailOutlined />,
        children: [
          {
            key: 'g1',
            label: 'Item 1',
            type: 'group',
            children: [
              { key: '1', label: 'Option 1', icon: <MailOutlined /> },
              { key: '2', label: 'Option 2' },
            ],
          },
        ],
      },
    ];
    const testClassNames = {
      root: 'test-root',
      item: 'test-item',
      itemIcon: 'test-item-icon',
      itemContent: 'test-item-content',
      subMenu: {
        list: 'test-sub-menu-list',
        item: 'test-sub-menu-list-item',
        itemIcon: 'test-sub-menu-list-item-icon',
        itemContent: 'test-sub-menu-list-item-content',
        itemTitle: 'test-sub-menu-list-title',
      },
    };
    const testStyles = {
      root: { fontSize: '12px' },
      item: { backgroundColor: 'rgba(0, 123, 255, 0.8)' },
      itemIcon: { backgroundColor: 'rgba(40, 167, 69, 0.9)' },
      itemContent: { backgroundColor: 'rgba(255, 193, 7, 0.7)' },
      subMenu: {
        list: { color: 'rgba(255, 7, 201, 0.7)' },
        item: { color: 'rgba(109, 76, 76, 0.8)' },
        itemIcon: { color: 'rgba(40, 167, 69, 0.9)' },
        itemContent: { color: 'rgba(68, 60, 35, 0.7)' },
        itemTitle: { color: 'rgba(255, 0, 0, 0.8)' },
      },
    };
    const { container } = render(
      <Menu
        selectedKeys={['mail']}
        mode="inline"
        items={items}
        openKeys={['SubMenu']}
        classNames={testClassNames}
        styles={testStyles}
      />,
    );
    const root = container.querySelector('.ant-menu');
    const item = container.querySelectorAll('.ant-menu-item')[0];
    const itemIcon = container.querySelector('.ant-menu-item-icon');
    const itemContent = container.querySelector('.ant-menu-title-content');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(item).toHaveClass(testClassNames.item);
    expect(item).toHaveStyle(testStyles.item);
    expect(itemIcon).toHaveClass(testClassNames.itemIcon);
    expect(itemIcon).toHaveStyle(testStyles.itemIcon);
    expect(itemContent).toHaveClass(testClassNames.itemContent);
    expect(itemContent).toHaveStyle(testStyles.itemContent);

    const subMenuList = document.querySelector(`.${testClassNames.subMenu.list}`);
    const subMenuListItem = document.querySelector(`.${testClassNames.subMenu.item}`);
    const subMenuListItemIcon = document.querySelector(`.${testClassNames.subMenu.itemIcon}`);
    const subMenuListItemContent = document.querySelector(`.${testClassNames.subMenu.itemContent}`);
    const subMenuListTitle = document.querySelector(`.${testClassNames.subMenu.itemTitle}`);

    expect(subMenuList).toHaveStyle(testStyles.subMenu.list);
    expect(subMenuListItem).toHaveStyle(testStyles.subMenu.item);
    expect(subMenuListItemIcon).toHaveStyle(testStyles.subMenu.itemIcon);
    expect(subMenuListItemContent).toHaveStyle(testStyles.subMenu.itemContent);
    expect(subMenuListTitle).toHaveStyle(testStyles.subMenu.itemTitle);
  });
  it('support function classNames and styles', () => {
    const items = [
      {
        key: 'SubMenu',
        label: 'Navigation One',
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
      { key: 'mail', label: 'Navigation Two' },
    ];
    const classNamesFn: MenuProps['classNames'] = (info) => {
      const grouped = !!info.props.items?.[0];
      return { root: grouped ? 'fn-root-grouped' : 'fn-root-plain' };
    };
    const stylesFn: MenuProps['styles'] = (info) => {
      const grouped = !!info.props.items?.[0];
      return { root: { backgroundColor: grouped ? 'rgb(240, 249, 255)' : 'rgb(255, 255, 255)' } };
    };

    const { container, rerender } = render(
      <Menu mode="inline" items={items} classNames={classNamesFn} styles={stylesFn} />,
    );
    const root = container.querySelector('.ant-menu');
    expect(root).toHaveClass('fn-root-grouped');
    expect(root).toHaveStyle({ backgroundColor: 'rgb(240, 249, 255)' });

    rerender(<Menu mode="inline" items={[]} classNames={classNamesFn} styles={stylesFn} />);

    expect(container.querySelector('.ant-menu')).toHaveClass('fn-root-plain');
    expect(container.querySelector('.ant-menu')).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)',
    });
  });

  // https://github.com/ant-design/ant-design/issues/56017
  it('support MenuItem style', () => {
    const items = [
      { label: 'One', key: 'one', style: { color: 'red' } },
      {
        label: 'Two',
        key: 'two',
        children: [
          { label: 'Two-One', key: 'two-one', style: { color: 'green' } },
          { label: 'Two-Two', key: 'two-two', style: { color: 'blue' } },
        ],
      },
    ];

    const { getAllByRole } = render(<Menu mode="inline" items={items} openKeys={['two']} />);

    const menuItems = getAllByRole('menuitem');
    expect(menuItems).toBeTruthy();

    // { [label: color] }
    const expected: any = {
      One: 'rgb(255, 0, 0)',
      'Two-One': 'rgb(0, 128, 0)',
      'Two-Two': 'rgb(0, 0, 255)',
    };

    menuItems.forEach((item) => {
      const labelNode = item.querySelector('.ant-menu-title-content');
      const label = labelNode?.textContent?.trim();

      if (label && expected[label]) {
        expect(item).toHaveStyle({ color: expected[label] });
      }
    });
  });
});
