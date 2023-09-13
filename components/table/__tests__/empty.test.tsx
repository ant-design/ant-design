import React from 'react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

import type { ColumnsType } from '..';
import Table from '..';
import { render, triggerResize, waitFakeTimer } from '../../../tests/utils';

const columns: ColumnsType<any> = [
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
];

const columnsFixed: ColumnsType<any> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'address',
    fixed: 'right',
    width: 100,
  },
];

describe('Table', () => {
  it('renders empty table', () => {
    const { asFragment } = render(<Table dataSource={[]} columns={columns} pagination={false} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  describe('renders empty table with fixed columns', () => {
    let domSpy: ReturnType<typeof spyElementPrototypes>;

    beforeAll(() => {
      domSpy = spyElementPrototypes(HTMLDivElement, {
        offsetWidth: {
          get: () => 1000,
        },
      });
    });
    afterAll(() => {
      domSpy.mockRestore();
    });

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should work', async () => {
      const { container, asFragment } = render(
        <Table dataSource={[]} columns={columnsFixed} pagination={false} scroll={{ x: 1 }} />,
      );

      triggerResize(container.querySelector('.ant-table')!);

      await waitFakeTimer();
      expect(container.querySelector('.ant-empty')).toBeTruthy();

      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  it('renders empty table with custom emptyText', () => {
    const { asFragment } = render(
      <Table
        dataSource={[]}
        columns={columns}
        pagination={false}
        locale={{ emptyText: 'custom empty text' }}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders empty table without emptyText when loading', () => {
    const { asFragment } = render(<Table dataSource={[]} columns={columns} loading />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
