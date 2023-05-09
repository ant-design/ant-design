import React from 'react';
import Menu from '..';

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
    interface CustomItemType {
      'data-x': number;
    }

    const menu = (
      <Menu<CustomItemType>
        items={[
          { key: 'item', title: 'Item', 'data-x': 0 },
          {
            key: 'submenu',
            theme: 'light',
            'data-x': 0,
            children: [
              { key: 'submenu-item', title: 'SubmenuItem', 'data-x': 0 },
              { key: 'submenu-submenu', theme: 'light', children: [], 'data-x': 0 },
              { key: 'submenu-divider', type: 'divider', 'data-x': 0 },
              { key: 'submenu-group', type: 'group', 'data-x': 0 },
              null,
            ],
          },
          {
            key: 'group',
            type: 'group',
            'data-x': 0,
            children: [
              { key: 'group-item', label: 'GroupItem', 'data-x': 0 },
              { key: 'group-submenu', theme: 'light', children: [], 'data-x': 0 },
              { key: 'group-divider', type: 'divider', 'data-x': 0 },
              { key: 'group-group', type: 'group', 'data-x': 0 },
              null,
            ],
          },
          { key: 'divider', type: 'divider', 'data-x': 0 },
          null,
        ]}
      />
    );

    expect(menu).toBeTruthy();
  });
});
