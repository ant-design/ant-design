import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
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

  function createTable(props) {
    return (
      <Table
        columns={[column]}
        dataSource={data}
        pagination={false}
        {...props}
      />
    );
  }

  function renderedNames(wrapper) {
    return wrapper.find('TableRow').map(row => row.props().record.name);
  }

  it('renders sorter icon correctly', () => {
    const wrapper = render(createTable());
    expect(renderToJson(wrapper.find('thead'))).toMatchSnapshot();
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
});
