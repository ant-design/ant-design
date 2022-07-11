import * as React from 'react';
import type { MenuProps } from '..';
import Menu from '..';
import type { ItemType } from '../hooks/useItems';

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

  it('Menu.items Customizable attributes', () => {
    interface CustomItem extends MenuProps {
      items: ItemType<{ 'data-x': number }>[];
    }
    const menu = (
      <Menu<CustomItem>
        items={[
          { key: 'item', title: 'Item', 'data-x': 1 },
          {
            key: 'submenu',
            theme: 'light',
            'data-x': 1,
            children: [
              { key: 'submenu-item', title: 'SubmenuItem2', 'data-x': 1 },
              { key: 'submenu-submenu', theme: 'light', children: [], 'data-x': 1 },
              { key: 'submenu-divider', type: 'divider', 'data-x': 1 },
              { key: 'submenu-group', type: 'group', 'data-x': 1 },
              { key: 'submenu-group', type: 'group', 'data-x': 1 },
              null,
            ],
          },
          null,
        ]}
      />
    );

    expect(menu).toBeTruthy();
  });

  it('Menu.items Customizable optional attributes', () => {
    interface CustomItem extends MenuProps {
      items: ItemType<{ 'data-x'?: number }>[];
    }
    const menu = (
      <Menu<CustomItem>
        items={[
          { key: 'item', title: 'Item', 'data-x': 222 },
          {
            key: 'submenu',
            theme: 'light',
            children: [
              { key: 'submenu-item', title: 'SubmenuItem2' },
              { key: 'submenu-submenu', theme: 'light', children: [] },
              { key: 'submenu-divider', type: 'divider' },
              { key: 'submenu-group', type: 'group' },
              { key: 'submenu-group', type: 'group' },
              null,
            ],
          },
          null,
        ]}
      />
    );

    expect(menu).toBeTruthy();
  });
});
