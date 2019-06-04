import React from 'react';
import { render, mount } from 'enzyme';
import Table from '..';

describe('Table.pagination', () => {
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

  const pagination = { className: 'my-page', pageSize: 2 };

  function createTable(props) {
    return <Table columns={columns} dataSource={data} pagination={pagination} {...props} />;
  }

  function renderedNames(wrapper) {
    return wrapper.find('TableRow').map(row => row.props().record.name);
  }

  it('renders pagination correctly', () => {
    const wrapper = render(createTable());
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show pager if pagination.hideOnSinglePage is true and only 1 page', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 3, hideOnSinglePage: true } }));
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    wrapper.setProps({ pagination: { pageSize: 3, hideOnSinglePage: false } });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    wrapper.setProps({ pagination: { pageSize: 4, hideOnSinglePage: true } });
    expect(wrapper.find('.ant-pagination')).toHaveLength(0);
    wrapper.setProps({ pagination: { pageSize: 4, hideOnSinglePage: false } });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    wrapper.setProps({ pagination: { pageSize: 5, hideOnSinglePage: true } });
    expect(wrapper.find('.ant-pagination')).toHaveLength(0);
    wrapper.setProps({ pagination: { pageSize: 5, hideOnSinglePage: false } });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
  });

  it('should use pageSize when defaultPageSize and pageSize are both specified', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 3, defaultPageSize: 4 } }));
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(2);
  });

  it('paginate data', () => {
    const wrapper = mount(createTable());

    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy']);
    wrapper
      .find('Pager')
      .last()
      .simulate('click');
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
    const wrapper = mount(
      createTable({
        pagination: { ...pagination, onChange: handlePaginationChange, onShowSizeChange: noop },
        onChange: handleChange,
      }),
    );

    wrapper
      .find('Pager')
      .last()
      .simulate('click');

    expect(handleChange).toHaveBeenCalledWith(
      {
        className: 'my-page',
        current: 2,
        pageSize: 2,
      },
      {},
      {},
      {
        currentDataSource: [
          { key: 0, name: 'Jack' },
          { key: 1, name: 'Lucy' },
          { key: 2, name: 'Tom' },
          { key: 3, name: 'Jerry' },
        ],
      },
    );

    expect(handlePaginationChange).toHaveBeenCalledWith(2, 2);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // https://codepen.io/afc163/pen/dVeNoP?editors=001
  it('should have pager when change pagination from false to undefined', () => {
    const wrapper = mount(createTable({ pagination: false }));
    expect(wrapper.find('.ant-pagination')).toHaveLength(0);
    wrapper.setProps({ pagination: undefined });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-pagination-item-active')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // https://codepen.io/afc163/pen/pWVRJV?editors=001
  it('should display pagination as prop pagination change between true and false', () => {
    const wrapper = mount(createTable());
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(2);
    wrapper.setProps({ pagination: false });
    expect(wrapper.find('.ant-pagination')).toHaveLength(0);
    wrapper.setProps({ pagination });
    wrapper.update();
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
    expect(wrapper.find('.ant-pagination-item-1').hasClass('ant-pagination-item-active')).toBe(
      true,
    );
  });

  it('specify the position of pagination', () => {
    const wrapper = mount(createTable({ pagination: { position: 'top' } }));
    expect(wrapper.find('.ant-spin-container').children()).toHaveLength(2);
    expect(
      wrapper
        .find('.ant-spin-container')
        .childAt(0)
        .find('.ant-pagination'),
    ).toHaveLength(1);
    wrapper.setProps({ pagination: { position: 'bottom' } });
    expect(wrapper.find('.ant-spin-container').children()).toHaveLength(2);
    expect(
      wrapper
        .find('.ant-spin-container')
        .childAt(1)
        .find('.ant-pagination'),
    ).toHaveLength(1);
    wrapper.setProps({ pagination: { position: 'both' } });
    expect(wrapper.find('.ant-spin-container').children()).toHaveLength(3);
    expect(
      wrapper
        .find('.ant-spin-container')
        .childAt(0)
        .find('.ant-pagination'),
    ).toHaveLength(1);
    expect(
      wrapper
        .find('.ant-spin-container')
        .childAt(2)
        .find('.ant-pagination'),
    ).toHaveLength(1);
  });

  /**
   * `pagination` is not designed to accept `true` value,
   * but in practice, many people assign `true` to `pagination`,
   * since they misunderstand that `pagination` can accept a boolean value.
   */
  it('Accepts pagination as true', () => {
    const wrapper = render(createTable({ pagination: true }));
    expect(wrapper).toMatchSnapshot();
  });

  it('ajax render should keep display by the dataSource', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createTable({
        onChange,
        pagination: {
          total: 200,
        },
      }),
    );

    expect(wrapper.find('.ant-table-tbody tr.ant-table-row')).toHaveLength(data.length);

    wrapper.find('.ant-pagination .ant-pagination-item-2').simulate('click');
    expect(onChange.mock.calls[0][0].current).toBe(2);

    expect(wrapper.find('.ant-table-tbody tr.ant-table-row')).toHaveLength(data.length);
  });
});
