import React from 'react';
import type { TableProps } from '..';
import Table from '..';
import { render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

describe('Table.order', () => {
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = window.clearTimeout;

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  function createTable(props: TableProps<any> = {}) {
    return <Table columns={columns} dataSource={data} {...props} />;
  }

  it('warning if duplicated SELECTION_COLUMN', () => {
    resetWarned();
    render(
      createTable({
        columns: [Table.SELECTION_COLUMN, Table.SELECTION_COLUMN],
        rowSelection: {},
        expandable: {
          expandedRowRender: () => null,
        },
      }),
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] Multiple `SELECTION_COLUMN` exist in `columns`.',
    );
  });

  it('auto fixed', () => {
    const { container } = render(
      createTable({
        columns: [
          {
            dataIndex: 'name',
            fixed: true,
          },
          Table.SELECTION_COLUMN,
          {
            dataIndex: 'key',
          },
        ],
        rowSelection: {},
      }),
    );

    expect(container.querySelectorAll('tr')[1].querySelectorAll('td')).toHaveLength(3);
    expect(
      container.querySelectorAll('tr')[1].querySelectorAll('td.ant-table-cell-fix-left'),
    ).toHaveLength(2);
  });
});
