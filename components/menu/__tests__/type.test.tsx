import * as React from 'react';
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
});
