import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';

import ConfigProvider from '../../config-provider';
import Table from '..';
import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Table image', () => {
  imageDemoTest('table', {
    skip: ['virtual-list.tsx', 'row-selection-debug.tsx', 'sticky.tsx', 'auto-height.tsx'],
  });
});

describe('Tree Table layout', () => {
  it('aligns wrapped tree labels beside the expand controls in both directions', async () => {
    const name = 'A long tree label with enough words to wrap across multiple lines';
    const cache = createCache();
    const html = renderToString(
      React.createElement(
        StyleProvider,
        { cache },
        (['ltr', 'rtl'] as const).map((direction) =>
          React.createElement(
            ConfigProvider,
            { direction, key: direction },
            React.createElement(Table, {
              columns: [{ dataIndex: 'name', rowScope: 'row' }],
              dataSource: [{ key: 'parent', name, children: [{ key: 'child', name }] }],
              expandable: { defaultExpandAllRows: true },
              pagination: false,
              tableLayout: 'fixed',
              style: { width: 185 },
            }),
          ),
        ),
      ),
    );
    await page.setContent(`${extractStyle(cache)}${html}`);

    const cells = await page.$$eval('tbody th[scope="row"]', (elements) =>
      elements.map((cell) => {
        const { direction, display } = getComputedStyle(cell);
        const text = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT).nextNode()!;
        const range = document.createRange();
        range.selectNodeContents(text);
        const starts = Array.from(range.getClientRects(), (rect) =>
          direction === 'rtl' ? rect.right : rect.left,
        );
        const aligned =
          starts.length > 1 && starts.every((start) => Math.abs(start - starts[0]) < 1);
        return { direction, display, aligned };
      }),
    );

    expect(cells).toEqual([
      { direction: 'ltr', display: 'table-cell', aligned: true },
      { direction: 'ltr', display: 'table-cell', aligned: true },
      { direction: 'rtl', display: 'table-cell', aligned: true },
      { direction: 'rtl', display: 'table-cell', aligned: true },
    ]);
  });
});
