import React from 'react';
import { render, mount } from 'enzyme';
import Table from '..';

describe('Table.sorter', () => {
  const sorterFn = (a, b) => a.name[0].charCodeAt() - b.name[0].charCodeAt();

  const column = {
    title: 'Name',
    dataIndex: 'name',
    sorter: sorterFn,
  };

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  function createTable(tableProps, columnProps = {}) {
    return (
      <Table
        columns={[{
          ...column,
          ...columnProps,
        }]}
        dataSource={data}
        pagination={false}
        {...tableProps}
      />
    );
  }

  function renderedNames(wrapper) {
    return wrapper.find('TableRow').map(row => row.props().record.name);
  }

  it('renders sorter icon correctly', () => {
    const wrapper = render(createTable());
    expect(wrapper.find('thead')).toMatchSnapshot();
  });

  it('default sort order ascend', () => {
    const wrapper = mount(createTable({}, {
      defaultSortOrder: 'ascend',
    }));

    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
  });

  it('default sort order descend', () => {
    const wrapper = mount(createTable({}, {
      defaultSortOrder: 'descend',
    }));

    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);
  });

  it('sort records', () => {
    const wrapper = mount(createTable());

    wrapper.find('.ant-table-column-sorter-up').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);

    wrapper.find('.ant-table-column-sorter-down').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);
  });

  it('can be controlled by sortOrder', () => {
    const wrapper = mount(createTable({
      columns: [{ ...column, sortOrder: 'ascend' }],
    }));
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
  });

  it('fires change event', () => {
    const handleChange = jest.fn();
    const wrapper = mount(createTable({ onChange: handleChange }));

    wrapper.find('.ant-table-column-sorter-up').simulate('click');

    const sorter = handleChange.mock.calls[0][2];
    expect(sorter.column.dataIndex).toBe('name');
    expect(sorter.order).toBe('ascend');
    expect(sorter.field).toBe('name');
    expect(sorter.columnKey).toBe('name');
  });

  it('works with grouping columns in controlled mode', () => {
    const columns = [
      {
        title: 'group',
        key: 'group',
        children: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: sorterFn,
            sortOrder: 'descend',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
        ],
      },
    ];
    const testData = [
      { key: 0, name: 'Jack', age: 11 },
      { key: 1, name: 'Lucy', age: 20 },
      { key: 2, name: 'Tom', age: 21 },
      { key: 3, name: 'Jerry', age: 22 },
    ];
    const wrapper = mount(
      <Table columns={columns} dataSource={testData} />
    );

    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);
  });
});
