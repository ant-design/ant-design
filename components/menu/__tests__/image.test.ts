import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';

import Menu from '..';
import imageTest, { imageDemoTest } from '../../../tests/shared/imageTest';
import Badge from '../../badge';
import ConfigProvider from '../../config-provider';

describe('Menu image', () => {
  imageDemoTest('menu');
});

describe.each(['ltr', 'rtl'] as const)('Menu badge icon geometry %s', (direction) => {
  const icon = React.createElement(Badge, { dot: true }, React.createElement(AppstoreOutlined));

  imageTest(
    React.createElement(
      ConfigProvider,
      { direction },
      React.createElement(Menu, {
        mode: 'inline',
        inlineCollapsed: true,
        items: [
          { key: 'item', label: 'Item', icon },
          { key: 'submenu', label: 'Submenu', icon, children: [{ key: 'child', label: 'Child' }] },
        ],
      }),
    ),
    `menu-badge-icon-${direction}`,
    'badge-icon',
    {
      beforeScreenshot: async (testPage) => {
        const positions = await testPage.evaluate(() =>
          Array.from(document.querySelectorAll('.ant-menu-item-icon.ant-badge')).map((badge) => {
            const badgeRect = badge.getBoundingClientRect();
            const iconRect = badge.querySelector('svg')!.getBoundingClientRect();
            const dotRect = badge.querySelector('.ant-badge-dot')!.getBoundingClientRect();

            return {
              badgeHeight: badgeRect.height,
              iconHeight: iconRect.height,
              iconLeft: iconRect.left,
              iconRight: iconRect.right,
              iconTop: iconRect.top,
              dotX: dotRect.left + dotRect.width / 2,
              dotY: dotRect.top + dotRect.height / 2,
            };
          }),
        );

        expect(positions).toHaveLength(2);
        positions.forEach((position) => {
          // Allow the one-pixel leading of the icon's inline box.
          expect(Math.abs(position.badgeHeight - position.iconHeight)).toBeLessThanOrEqual(1);
          expect(Math.abs(position.dotY - position.iconTop)).toBeLessThanOrEqual(1);
          expect(position.dotX).toBeCloseTo(
            direction === 'rtl' ? position.iconLeft : position.iconRight,
            1,
          );
        });
      },
    },
  );
});
