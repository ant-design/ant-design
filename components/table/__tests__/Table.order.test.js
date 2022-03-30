import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { resetWarned } from '../../_util/devWarning';

describe('Table.order', () => {
  window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
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

  function createTable(props = {}) {
    return <Table columns={columns} dataSource={data} {...props} />;
  }

  it('warning if duplicated SELECTION_COLUMN', () => {
    resetWarned();
    mount(
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
    const wrapper = mount(
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

    expect(wrapper.find('tr').last().find('td')).toHaveLength(3);
    expect(wrapper.find('tr').last().find('td.ant-table-cell-fix-left')).toHaveLength(2);
    wrapper.unmount();
  });
});
