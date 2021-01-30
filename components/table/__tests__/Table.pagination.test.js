/* eslint-disable import/first */
jest.mock('../../_util/scrollTo');

import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import scrollTo from '../../_util/scrollTo';
import { resetWarned } from '../../_util/devWarning';

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
    return wrapper.find('BodyRow').map(row => row.props().record.name);
  }

  it('renders pagination correctly', () => {
    const wrapper = mount(createTable());
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('not crash when pageSize is undefined', () => {
    expect(() => {
      mount(createTable({ pagination: { pageSize: undefined } }));
    }).not.toThrow();
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
    wrapper.find('Pager').last().simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
  });

  it('repaginates when pageSize change', () => {
    const wrapper = mount(createTable());

    wrapper.setProps({ pagination: { pageSize: 1 } });
    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });

  it('should accept pagination size', () => {
    const wrapper = mount(
      createTable({
        pagination: { size: 'small' },
      }),
    );
    expect(wrapper.find('.ant-pagination.mini')).toHaveLength(1);
  });

  it('should scroll to first row when page change', () => {
    scrollTo.mockReturnValue(null);

    const wrapper = mount(
      createTable({ scroll: { y: 20 }, pagination: { showSizeChanger: true, pageSize: 2 } }),
    );
    expect(scrollTo).toHaveBeenCalledTimes(0);

    wrapper.find('Pager').last().simulate('click');
    expect(scrollTo).toHaveBeenCalledTimes(1);

    wrapper.find('.ant-select-selector').simulate('mousedown');
    wrapper.find('.ant-select-item').last().simulate('click');
    expect(scrollTo).toHaveBeenCalledTimes(2);
  });

  it('should scroll inside .ant-table-body', () => {
    scrollTo.mockImplementationOnce((top, { getContainer }) => {
      expect(top).toBe(0);
      expect(getContainer().className).toBe('ant-table-body');
    });
    const wrapper = mount(
      createTable({ scroll: { y: 20 }, pagination: { showSizeChanger: true, pageSize: 2 } }),
    );
    wrapper.find('Pager').last().simulate('click');
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

    wrapper.find('Pager').last().simulate('click');

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
        action: 'paginate',
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
    wrapper.setProps({ pagination: undefined });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(2);
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
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

  // https://github.com/ant-design/ant-design/issues/24913
  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const wrapper = mount(
      createTable({
        pagination: {
          current: 1,
          pageSize: 10,
          total: 200,
          onChange,
          onShowSizeChange,
        },
      }),
    );
    wrapper.find('.ant-select-selector').simulate('mousedown');
    expect(wrapper.find('.ant-select-item-option').length).toBe(4);
    wrapper.find('.ant-select-item-option').at(1).simulate('click');
    expect(onChange).toHaveBeenCalledWith(1, 20);
  });

  it('should not change page when pagination current is specified', () => {
    const wrapper = mount(createTable({ pagination: { current: 2, pageSize: 1 } }));
    expect(wrapper.find('.ant-pagination-item-2').hasClass('ant-pagination-item-active')).toBe(
      true,
    );
    wrapper.find('.ant-pagination-item-3').simulate('click');
    expect(wrapper.find('.ant-pagination-item-2').hasClass('ant-pagination-item-active')).toBe(
      true,
    );
  });

  it('specify the position of pagination', () => {
    const wrapper = mount(createTable({ pagination: { position: ['topLeft'] } }));
    expect(wrapper.find('.ant-spin-container').children()).toHaveLength(2);
    expect(wrapper.find('.ant-spin-container').childAt(0).find('.ant-pagination')).toHaveLength(1);
    wrapper.setProps({ pagination: { position: ['bottomRight'] } });
    expect(wrapper.find('.ant-spin-container').children()).toHaveLength(2);
    expect(wrapper.find('.ant-spin-container').childAt(1).find('.ant-pagination')).toHaveLength(1);
    wrapper.setProps({ pagination: { position: ['topLeft', 'bottomRight'] } });
    expect(wrapper.find('.ant-spin-container').children()).toHaveLength(3);
    expect(wrapper.find('.ant-spin-container').childAt(0).find('.ant-pagination')).toHaveLength(1);
    expect(wrapper.find('.ant-spin-container').childAt(2).find('.ant-pagination')).toHaveLength(1);
    wrapper.setProps({ pagination: { position: ['invalid'] } });
    expect(wrapper.find('.ant-pagination')).toHaveLength(1);
  });

  /**
   * `pagination` is not designed to accept `true` value, but in practice, many people assign
   * `true` to `pagination`, since they misunderstand that `pagination` can accept a boolean value.
   */
  it('Accepts pagination as true', () => {
    const wrapper = mount(createTable({ pagination: true }));
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('ajax render should keep display by the dataSource', () => {
    const onChange = jest.fn();
    const onPaginationChange = jest.fn();

    const wrapper = mount(
      createTable({
        onChange,
        pagination: {
          total: 200,
          onChange: onPaginationChange,
        },
      }),
    );

    expect(wrapper.find('.ant-table-tbody tr.ant-table-row')).toHaveLength(data.length);

    wrapper.find('.ant-pagination .ant-pagination-item-2').simulate('click');
    expect(onChange.mock.calls[0][0].current).toBe(2);
    expect(onChange).toHaveBeenCalledWith(
      { current: 2, pageSize: 10, total: 200 },
      {},
      {},
      {
        currentDataSource: [
          { key: 0, name: 'Jack' },
          { key: 1, name: 'Lucy' },
          { key: 2, name: 'Tom' },
          { key: 3, name: 'Jerry' },
        ],
        action: 'paginate',
      },
    );
    expect(onPaginationChange).toHaveBeenCalledWith(2, 10);

    expect(wrapper.find('.ant-table-tbody tr.ant-table-row')).toHaveLength(data.length);
  });

  it('onShowSizeChange should trigger once', () => {
    jest.useFakeTimers();
    const onShowSizeChange = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      createTable({
        pagination: {
          total: 200,
          showSizeChanger: true,
          onShowSizeChange,
        },
        onChange,
      }),
    );
    wrapper.find('.ant-select-selector').simulate('mousedown');
    jest.runAllTimers();
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(wrapper.find('.ant-select-item-option').length).toBe(4);
    dropdownWrapper.find('.ant-select-item-option').at(3).simulate('click');
    expect(onShowSizeChange).toHaveBeenCalledTimes(1);
    expect(onShowSizeChange).toHaveBeenLastCalledWith(1, 100);
    expect(onChange).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('should support current in pagination', () => {
    const wrapper = mount(createTable({ pagination: { current: 2, pageSize: 1 } }));
    expect(wrapper.find('.ant-pagination-item-active').text()).toBe('2');
  });

  it('should support defaultCurrent in pagination', () => {
    const wrapper = mount(createTable({ pagination: { defaultCurrent: 2, pageSize: 1 } }));
    expect(wrapper.find('.ant-pagination-item-active').text()).toBe('2');
  });

  it('should support defaultPageSize in pagination', () => {
    const wrapper = mount(createTable({ pagination: { defaultPageSize: 1 } }));
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(4);
  });

  // https://github.com/ant-design/ant-design/issues/19957
  it('ajax should work with pagination', () => {
    const wrapper = mount(createTable({ pagination: { total: 100 } }));
    wrapper.find('.ant-pagination-item-2').simulate('click');
    wrapper.setProps({ pagination: { current: 2, total: 100 } });

    expect(
      wrapper.find('.ant-pagination-item-2').hasClass('ant-pagination-item-active'),
    ).toBeTruthy();
  });

  it('pagination should ignore invalidate total', () => {
    const wrapper = mount(createTable({ pagination: { total: null } }));
    expect(wrapper.find('.ant-pagination-item-1').length).toBeTruthy();
  });

  it('renders pagination topLeft and bottomRight', () => {
    const wrapper = mount(createTable({ pagination: ['topLeft', 'bottomRight'] }));
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should call onChange when change pagination size', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      createTable({
        pagination: {
          total: 200,
          showSizeChanger: true,
        },
        onChange,
      }),
    );
    wrapper.find('.ant-select-selector').simulate('mousedown');
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    dropdownWrapper.find('.ant-select-item-option').at(2).simulate('click');

    expect(onChange).toBeCalledTimes(1);
  });

  it('dynamic warning', () => {
    resetWarned();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const dynamicData = [];
    for (let i = 0; i < 15; i += 1) {
      dynamicData.push({
        key: i,
        name: i,
      });
    }

    const wrapper = mount(
      createTable({
        dataSource: dynamicData,
        pagination: { total: 100, pageSize: 10, current: 2 },
      }),
    );

    expect(wrapper.find('tbody tr')).toHaveLength(5);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] `dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.',
    );
  });

  it('should render pagination after last item on last page being removed', () => {
    const total = data.length;
    const paginationProp = {
      pageSize: 1,
      total,
      current: total,
      position: ['topLeft', 'bottomLeft'],
    };
    const wrapper = mount(
      createTable({
        pagination: paginationProp,
      }),
    );

    wrapper.setProps({
      dataSource: data.slice(total - 1),
      pagination: { ...paginationProp, total: total - 1 },
    });
    expect(wrapper.find('.ant-pagination')).toHaveLength(2);
  });

  it('showTotal should hide when removed', () => {
    const Demo = () => {
      const [p, setP] = React.useState({
        showTotal: t => `>${t}<`,
        total: 200,
        current: 1,
        pageSize: 10,
      });

      return (
        <Table
          data={[]}
          columns={[]}
          pagination={p}
          onChange={pg => {
            setP({
              ...pg,
              total: 23,
            });
          }}
        />
      );
    };

    const wrapper = mount(<Demo />);
    expect(wrapper.find('.ant-pagination-total-text').text()).toEqual('>200<');

    // Should hide
    wrapper.find('.ant-pagination-item-2').simulate('click');
    expect(wrapper.find('.ant-pagination-total-text')).toHaveLength(0);
  });
});
