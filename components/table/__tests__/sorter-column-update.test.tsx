import React from 'react';
import Table from '..';
import type { ColumnType } from '..';
import { fireEvent, render } from '../../../tests/utils';

type Row = { key: string; name: string; price: number; stock: number };
const data: Row[] = [
  { key: 'a', name: 'Apple', price: 20, stock: 1 },
  { key: 'b', name: 'Banana', price: 10, stock: 2 },
];
const priceSorter = (a: Row, b: Row) => a.price - b.price;
const stockSorter = (a: Row, b: Row) => a.stock - b.stock;
function table(sorter: ColumnType<Row>['sorter'], defaultSortOrder?: 'ascend') {
  return (
    <Table<Row>
      pagination={false}
      dataSource={data}
      columns={[{ key: 'metric', title: 'Product', dataIndex: 'name', sorter, defaultSortOrder }]}
    />
  );
}
function names(container: HTMLElement) {
  return Array.from(container.querySelectorAll('tbody tr[data-row-key]'), (row) => row.textContent);
}

describe('Table active sorter after column configuration changes', () => {
  it('uses an updated compare function while retaining the selected order', () => {
    const { container, rerender } = render(table(priceSorter));
    fireEvent.click(container.querySelector('th')!);
    expect(names(container)).toEqual(['Banana', 'Apple']);
    rerender(table(stockSorter));
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toBe('ascending');
    expect(names(container)).toEqual(['Apple', 'Banana']);
  });

  it('stops locally sorting when the column switches to server-side sorting', () => {
    const { container, rerender } = render(table(priceSorter, 'ascend'));
    expect(names(container)).toEqual(['Banana', 'Apple']);
    rerender(table(true, 'ascend'));
    expect(names(container)).toEqual(['Apple', 'Banana']);
  });

  it('stops sorting when sorting is removed from the column', () => {
    const { container, rerender } = render(table(priceSorter, 'ascend'));
    expect(names(container)).toEqual(['Banana', 'Apple']);
    rerender(table(false));
    expect(container.querySelector('.ant-table-column-sorters')).toBeNull();
    expect(names(container)).toEqual(['Apple', 'Banana']);
  });

  it('refreshes a sorter inside grouped columns', () => {
    const columns = (sorter: ColumnType<Row>['sorter']) => [
      {
        title: 'Group',
        children: [
          {
            key: 'metric',
            title: 'Product',
            dataIndex: 'name',
            sorter,
            defaultSortOrder: 'ascend' as const,
          },
        ],
      },
    ];
    const { container, rerender } = render(
      <Table<Row> pagination={false} dataSource={data} columns={columns(priceSorter)} />,
    );
    expect(names(container)).toEqual(['Banana', 'Apple']);
    rerender(<Table<Row> pagination={false} dataSource={data} columns={columns(stockSorter)} />);
    expect(names(container)).toEqual(['Apple', 'Banana']);
  });

  it('uses updated multiple priorities while preserving active sort orders', () => {
    const columns = (multiple: number): ColumnType<Row>[] => [
      {
        key: 'price',
        title: 'Price',
        dataIndex: 'name',
        sorter: { compare: priceSorter, multiple },
        defaultSortOrder: 'ascend',
      },
      {
        key: 'stock',
        title: 'Stock',
        sorter: { compare: stockSorter, multiple: 2 },
        defaultSortOrder: 'ascend',
      },
    ];
    const { container, rerender } = render(
      <Table<Row> pagination={false} dataSource={data} columns={columns(1)} />,
    );
    expect(names(container)).toEqual(['Apple', 'Banana']);
    rerender(<Table<Row> pagination={false} dataSource={data} columns={columns(3)} />);
    expect(names(container)).toEqual(['Banana', 'Apple']);
    expect(container.querySelectorAll('th[aria-sort="ascending"]')).toHaveLength(2);
  });
});
