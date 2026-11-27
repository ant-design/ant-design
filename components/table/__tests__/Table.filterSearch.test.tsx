import React from 'react';

import Table from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

describe('Table custom filter search input', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each([
    { filterMode: 'menu' as const, query: 'SKU' },
    { filterMode: 'tree' as const, query: 'SKU' },
    { filterMode: 'menu' as const, query: ' SKU ' },
    { filterMode: 'tree' as const, query: ' SKU ' },
  ])('preserves the query \"$query\" in $filterMode mode', async ({ filterMode, query }) => {
    const filterSearch = jest.fn((input: string, record: { value: unknown }) =>
      String(record.value).startsWith(input),
    );
    const { container } = render(
      <Table
        pagination={false}
        dataSource={[]}
        columns={[
          {
            title: 'Product code',
            dataIndex: 'code',
            filters: [
              { text: `${query}-001`, value: `${query}-001` },
              { text: 'sku-002', value: 'sku-002' },
            ],
            filterMode,
            filterSearch,
          },
        ]}
      />,
    );
    fireEvent.click(container.querySelector('.ant-table-filter-trigger.ant-dropdown-trigger')!);
    await waitFakeTimer();
    fireEvent.change(document.querySelector('.ant-table-filter-dropdown-search input')!, {
      target: { value: query },
    });
    if (filterMode === 'menu') {
      const options = document.querySelectorAll('.ant-dropdown-menu-item');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent(`${query}-001`.trim());
    } else {
      const highlighted = document.querySelectorAll('.ant-tree-treenode.filter-node');
      expect(highlighted).toHaveLength(1);
      expect(highlighted[0]).toHaveTextContent(`${query}-001`.trim());
    }
    expect(filterSearch).toHaveBeenCalledWith(
      query,
      expect.objectContaining({ value: `${query}-001` }),
    );
  });

  it('keeps built-in search case insensitive', async () => {
    const { container } = render(
      <Table
        pagination={false}
        dataSource={[]}
        columns={[
          {
            title: 'Product code',
            dataIndex: 'code',
            filters: [
              { text: 'SKU-001', value: 'SKU-001' },
              { text: 'sku-002', value: 'sku-002' },
            ],
            filterSearch: true,
          },
        ]}
      />,
    );
    fireEvent.click(container.querySelector('.ant-table-filter-trigger.ant-dropdown-trigger')!);
    await waitFakeTimer();
    fireEvent.change(document.querySelector('.ant-table-filter-dropdown-search input')!, {
      target: { value: ' SKU ' },
    });
    expect(document.querySelectorAll('.ant-dropdown-menu-item')).toHaveLength(2);
  });
});
