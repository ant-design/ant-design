import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Table from '..';

describe('Table.pagination', () => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }];

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  const pagination = { pageSize: 2 };

  function createTable(props) {
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        {...props}
      />
    );
  }

  function renderedNames(wrapper) {
    return wrapper.find('TableRow').map(row => row.props().record.name);
  }

  it('renders pagination correctly', () => {
    const wrapper = render(createTable());
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('paginate data', () => {
    const wrapper = mount(createTable());

    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy']);
    wrapper.find('Pager').last().simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
  });


  it('repaginates when pageSize change', () => {
    const wrapper = mount(createTable());

    wrapper.setProps({ pagination: { pageSize: 1 } });
    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });

  it('fires change event', () => {
    const handleChange = jest.fn();
    const noop = () => {};
    const wrapper = mount(createTable({
      pagination: { ...pagination, onChange: noop, onShowSizeChange: noop },
      onChange: handleChange,
    }));

    wrapper.find('Pager').last().simulate('click');

    expect(handleChange).toBeCalledWith(
      {
        current: 2,
        onChange: noop,
        onShowSizeChange: noop,
        pageSize: 2,
      },
      {},
      {}
    );
  });
});
