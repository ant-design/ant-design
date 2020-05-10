import React from 'react';
import { render, mount } from 'enzyme';
import List from '..';

describe('List.pagination', () => {
  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  const pagination = { className: 'my-page', pageSize: 2 };

  function createList(props) {
    return (
      <List
        itemLayout="vertical"
        pagination={pagination}
        dataSource={data}
        renderItem={item => <List.Item key={item.key}>{item.name}</List.Item>}
        {...props}
      />
    );
  }

  function renderedNames(wrapper) {
    return wrapper.find('.ant-list-item').map(row => row.text());
  }

  it('renders pagination correctly', () => {
    const wrapper = render(createList());
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show pager if pagination.hideOnSinglePage is true and only 1 page', () => {
    const wrapper = mount(createList({ pagination: { pageSize: 3, hideOnSinglePage: true } }));
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

  it('paginate data', () => {
    const wrapper = mount(createList());

    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy']);
    wrapper
      .find('Pager')
      .last()
      .simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
  });

  it('repaginates when pageSize change', () => {
    const wrapper = mount(createList());

    wrapper.setProps({ pagination: { pageSize: 1 } });
    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });

  it('fires change event', () => {
    const handlePaginationChange = jest.fn();
    const noop = () => {};
    const wrapper = mount(
      createList({
        pagination: {
          ...pagination,
          onChange: handlePaginationChange,
          onShowSizeChange: noop,
        },
      }),
    );

    wrapper
      .find('Pager')
      .last()
      .simulate('click');

    expect(handlePaginationChange).toHaveBeenCalledWith(2, 2);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // https://codepen.io/afc163/pen/pWVRJV?editors=001
  it('should display pagination as prop pagination change between true and false', () => {
    const wrapper = mount(createList());
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
    // Legacy code will make pageSize ping with 10, here we fixed to keep sync by current one
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(2);
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
  });

  // https://github.com/ant-design/ant-design/issues/5259
  it('change to correct page when data source changes', () => {
    const wrapper = mount(createList({ pagination: { pageSize: 1 } }));
    wrapper.find('.ant-pagination-item-3').simulate('click');
    wrapper.setProps({ dataSource: [data[0]] });
    expect(wrapper.find('.ant-pagination-item-1').hasClass('ant-pagination-item-active')).toBe(
      true,
    );
  });

  it('specify the position of pagination', () => {
    const wrapper = mount(createList({ pagination: { position: 'top' } }));
    expect(
      wrapper
        .find('.ant-list')
        .childAt(0)
        .find('.ant-pagination'),
    ).toHaveLength(1);
    wrapper.setProps({ pagination: { position: 'bottom' } });
    expect(
      wrapper
        .find('.ant-list')
        .children()
        .last()
        .find('.ant-pagination'),
    ).toHaveLength(1);
    wrapper.setProps({ pagination: { position: 'both' } });
    expect(wrapper.find('.ant-pagination')).toHaveLength(2);
    expect(
      wrapper
        .find('.ant-list')
        .childAt(0)
        .find('.ant-pagination'),
    ).toHaveLength(1);
    expect(
      wrapper
        .find('.ant-list')
        .children()
        .last()
        .find('.ant-pagination'),
    ).toHaveLength(1);
  });

  it('should change page size work', () => {
    const wrapper = mount(createList({ pagination: { showSizeChanger: true } }));
    expect(
      wrapper
        .find('Pagination')
        .first()
        .render(),
    ).toMatchSnapshot();

    wrapper.find('.ant-select-selector').simulate('mousedown');
    wrapper
      .find('.ant-select-item-option')
      .at(2)
      .simulate('click');

    wrapper.find('.ant-select-selector').simulate('mousedown');
    expect(
      wrapper
        .find('Pagination')
        .first()
        .render(),
    ).toMatchSnapshot();
  });

  it('should default work', () => {
    const wrapper = mount(
      createList({
        pagination: {
          defaultPageSize: 3,
          defaultCurrent: 2,
          pageSizeOptions: ['1', '3'],
          showSizeChanger: true,
        },
      }),
    );

    expect(
      wrapper
        .find('Pagination')
        .first()
        .render(),
    ).toMatchSnapshot();
  });

  it('should not crash when pagination is null', () => {
    mount(
      createList({
        pagination: null,
      }),
    );
  });
});
