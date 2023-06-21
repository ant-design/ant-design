import React from 'react';
import Menu, { type MenuItemProps } from '..';
import type { MenuItemType } from '../hooks/useItems';

describe('Menu.typescript', () => {
  it('Menu.items', () => {
    const menu = (
      <Menu
        items={[
          { key: 'item', title: 'Item' },
          {
            key: 'submenu',
            theme: 'light',
            children: [
              { key: 'submenu-item', title: 'SubmenuItem' },
              { key: 'submenu-submenu', theme: 'light', children: [] },
              { key: 'submenu-divider', type: 'divider' },
              { key: 'submenu-group', type: 'group' },
              null,
            ],
          },
          {
            key: 'group',
            type: 'group',
            children: [
              { key: 'group-item', label: 'GroupItem' },
              { key: 'group-submenu', theme: 'light', children: [] },
              { key: 'group-divider', type: 'divider' },
              { key: 'group-group', type: 'group' },
              null,
            ],
          },
          { key: 'divider', type: 'divider' },
          null,
        ]}
      />
    );

    expect(menu).toBeTruthy();
  });

  it('Menu.items should accept custom item type', () => {
    interface CustomItemType extends MenuItemType {
      'data-x': number;
    }

    const menu = (
      <Menu<CustomItemType>
        items={[
          { key: 'item', title: 'Item', 'data-x': 0 },
          {
            key: 'submenu',
            theme: 'light',
            children: [
              { key: 'submenu-item', title: 'SubmenuItem', 'data-x': 0 },
              { key: 'submenu-submenu', theme: 'light', children: [], 'data-x': 0 },
              { key: 'submenu-divider', type: 'divider' },
              { key: 'submenu-group', type: 'group' },
              null,
            ],
          },
          {
            key: 'group',
            type: 'group',
            children: [
              { key: 'group-item', label: 'GroupItem', 'data-x': 0 },
              { key: 'group-submenu', theme: 'light', children: [], 'data-x': 0 },
              { key: 'group-divider', type: 'divider' },
              { key: 'group-group', type: 'group' },
              null,
            ],
          },
          { key: 'divider', type: 'divider' },
          null,
        ]}
      />
    );

    expect(menu).toBeTruthy();
  });

  it('MenuItem.props should accept custom props', () => {
    interface CustomItemProps extends MenuItemProps {
      'data-x': number;
    }

    const menu = (
      <Menu>
        <Menu.Item<CustomItemProps> key="item" title="Item" data-x={0} />
        <Menu.SubMenu key="submenu" theme="light">
          <Menu.Item<CustomItemProps> key="submenu-item" title="SubmenuItem" data-x={0} />
          <Menu.SubMenu key="submenu-submenu" theme="light" />
          <Menu.Divider key="submenu-divider" />
          <Menu.ItemGroup key="submenu-group" />
        </Menu.SubMenu>
        <Menu.ItemGroup key="group">
          <Menu.Item<CustomItemProps> key="group-item" title="GroupItem" data-x={0} />
          <Menu.SubMenu key="group-submenu" theme="light" />
          <Menu.Divider key="group-divider" />
          <Menu.ItemGroup key="group-group" />
        </Menu.ItemGroup>
        <Menu.Divider key="divider" />
      </Menu>
    );

    expect(menu).toBeTruthy();
  });
});
