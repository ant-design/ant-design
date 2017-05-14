import React from 'react';
import { render, mount } from 'enzyme';
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
    expect(wrapper).toMatchSnapshot();
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
    const handlePaginationChange = jest.fn();
    const noop = () => {};
    const wrapper = mount(createTable({
      pagination: { ...pagination, onChange: handlePaginationChange, onShowSizeChange: noop },
      onChange: handleChange,
    }));

    wrapper.find('Pager').last().simulate('click');

    expect(handleChange).toBeCalledWith(
      {
        current: 2,
        pageSize: 2,
      },
      {},
      {}
    );

    expect(handlePaginationChange).toBeCalledWith(2, 2);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // http://codepen.io/anon/pen/NdGgga?editors=001
  it('should have pager when change pagination from false to undefined', () => {
    const wrapper = mount(createTable({ pagination: false }));
    expect(wrapper.find('.ant-pagination')).toHaveLength(0);
    wrapper.setProps({ pagination: undefined });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-pagination-item-active')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // http://codepen.io/anon/pen/ZLbyjV?editors=001
  it('should display pagination as prop pagination change between true and false', () => {
    const wrapper = mount(createTable());
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(2);
    wrapper.setProps({ pagination: false });
    expect(wrapper.find('.ant-pagination')).toHaveLength(0);
    wrapper.setProps({ pagination });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(2);
    wrapper.find('.ant-pagination-item-2').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
    wrapper.setProps({ pagination: false });
    expect(wrapper.find('.ant-pagination')).toHaveLength(0);
    wrapper.setProps({ pagination: true });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(1); // pageSize will be 10
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
  });

  // https://github.com/ant-design/ant-design/issues/5259
  it('change to correct page when data source changes', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 1 } }));
    wrapper.find('.ant-pagination-item-3').simulate('click');
    wrapper.setProps({ dataSource: [data[0]] });
    expect(wrapper.find('.ant-pagination-item-1').hasClass('ant-pagination-item-active')).toBe(true);
  });
});
