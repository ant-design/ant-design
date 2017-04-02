import React from 'react';
import { mount, render } from 'enzyme';
import Table from '..';

describe('Table.rowSelection', () => {
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

  function createTable(props = {}) {
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{}}
        {...props}
      />
    );
  }

  function renderedNames(wrapper) {
    return wrapper.find('TableRow').map(row => row.props().record.name);
  }

  it('select by checkbox', () => {
    const wrapper = mount(createTable());
    const checkboxes = wrapper.find('input');
    const checkboxAll = checkboxes.first();

    checkboxAll.simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0, 1, 2, 3],
      selectionDirty: true,
    });

    checkboxes.at(1).simulate('change', { target: { checked: false } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1, 2, 3],
      selectionDirty: true,
    });

    checkboxes.at(1).simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1, 2, 3, 0],
      selectionDirty: true,
    });
  });

  it('select by radio', () => {
    const wrapper = mount(createTable({ rowSelection: { type: 'radio' } }));
    const radios = wrapper.find('input');

    expect(radios.length).toBe(4);

    radios.first().simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0],
      selectionDirty: true,
    });

    radios.last().simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [3],
      selectionDirty: true,
    });
  });

  it('pass getCheckboxProps to checkbox', () => {
    const rowSelection = {
      getCheckboxProps: record => ({
        disabled: record.name === 'Lucy',
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));
    const checkboxes = wrapper.find('input');

    expect(checkboxes.at(1).props().disabled).toBe(false);
    expect(checkboxes.at(2).props().disabled).toBe(true);
  });

  it('works with pagination', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 2 } }));

    const checkboxAll = wrapper.find('SelectionCheckboxAll');
    const pagers = wrapper.find('Pager');

    checkboxAll.find('input').simulate('change', { target: { checked: true } });
    expect(checkboxAll.node.state).toEqual({ checked: true, indeterminate: false });

    pagers.at(1).simulate('click');
    expect(checkboxAll.node.state).toEqual({ checked: false, indeterminate: false });

    pagers.at(0).simulate('click');
    expect(checkboxAll.node.state).toEqual({ checked: true, indeterminate: false });
  });

  // https://github.com/ant-design/ant-design/issues/4020
  it('handles defaultChecked', () => {
    const rowSelection = {
      getCheckboxProps: record => ({
        defaultChecked: record.key === 0,
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));

    const checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(false);

    checkboxs.at(2).simulate('change', { target: { checked: true } });
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(true);
  });

  it('can be controlled', () => {
    const wrapper = mount(createTable({ rowSelection: { selectedRowKeys: [0] } }));

    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0],
      selectionDirty: false,
    });

    wrapper.setProps({ rowSelection: { selectedRowKeys: [1] } });

    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1],
      selectionDirty: false,
    });
  });

  it('fires change & select events', () => {
    const handleChange = jest.fn();
    const handleSelect = jest.fn();
    const rowSelection = {
      onChange: handleChange,
      onSelect: handleSelect,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper.find('input').last().simulate('change', { target: { checked: true } });

    expect(handleChange).toBeCalledWith([3], [{ key: 3, name: 'Jerry' }]);
    expect(handleSelect).toBeCalledWith(
      { key: 3, name: 'Jerry' },
      true,
      [{ key: 3, name: 'Jerry' }]
    );
  });

  it('fires selectAll event', () => {
    const handleSelectAll = jest.fn();
    const rowSelection = {
      onSelectAll: handleSelectAll,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper.find('input').first().simulate('change', { target: { checked: true } });
    expect(handleSelectAll).toBeCalledWith(true, data, data);

    wrapper.find('input').first().simulate('change', { target: { checked: false } });
    expect(handleSelectAll).toBeCalledWith(false, [], data);
  });

  it('render with default selection correctly', () => {
    const rowSelection = {
      selections: true,
    };
    const wrapper = mount(createTable({ rowSelection }));
    const dropdownWrapper = render(wrapper.find('Trigger').node.getComponent());
    expect(dropdownWrapper).toMatchSnapshot();
  });

  it('click select all selection', () => {
    const handleSelectAll = jest.fn();
    const rowSelection = {
      onSelectAll: handleSelectAll,
      selections: true,
    };
    const wrapper = mount(createTable({ rowSelection }));

    const dropdownWrapper = mount(wrapper.find('Trigger').node.getComponent());
    dropdownWrapper.find('.ant-dropdown-menu-item > div').first().simulate('click');

    expect(handleSelectAll).toBeCalledWith(true, data, data);
  });

  it('fires selectInvert event', () => {
    const handleSelectInvert = jest.fn();
    const rowSelection = {
      onSelectInvert: handleSelectInvert,
      selections: true,
    };
    const wrapper = mount(createTable({ rowSelection }));
    const checkboxes = wrapper.find('input');

    checkboxes.at(1).simulate('change', { target: { checked: true } });
    const dropdownWrapper = mount(wrapper.find('Trigger').node.getComponent());
    dropdownWrapper.find('.ant-dropdown-menu-item > div').last().simulate('click');

    expect(handleSelectInvert).toBeCalledWith([1, 2, 3]);
  });

  it('fires selection event', () => {
    const handleSelectOdd = jest.fn();
    const handleSelectEven = jest.fn();
    const rowSelection = {
      selections: [{
        key: 'odd',
        text: '奇数项',
        onSelect: handleSelectOdd,
      }, {
        key: 'even',
        text: '偶数项',
        onSelect: handleSelectEven,
      }],
    };
    const wrapper = mount(createTable({ rowSelection }));

    const dropdownWrapper = mount(wrapper.find('Trigger').node.getComponent());

    dropdownWrapper.find('.ant-dropdown-menu-item > div').at(2).simulate('click');
    expect(handleSelectOdd).toBeCalledWith([0, 1, 2, 3]);

    dropdownWrapper.find('.ant-dropdown-menu-item > div').at(3).simulate('click');
    expect(handleSelectEven).toBeCalledWith([0, 1, 2, 3]);
  });

  // https://github.com/ant-design/ant-design/issues/4245
  it('handles disabled checkbox correctly when dataSource changes', () => {
    const rowSelection = {
      getCheckboxProps: record => ({ disabled: record.disabled }),
    };
    const wrapper = mount(createTable({ rowSelection }));
    const newData = [
      { key: 0, name: 'Jack', disabled: true },
      { key: 1, name: 'Lucy', disabled: true },
    ];
    wrapper.setProps({ dataSource: newData });
    wrapper.find('input').forEach((checkbox) => {
      expect(checkbox.props().disabled).toBe(true);
    });
  });

  // https://github.com/ant-design/ant-design/issues/4779
  it('should not switch pagination when select record', () => {
    const newData = [];
    for (let i = 0; i < 20; i += 1) {
      newData.push({
        key: i.toString(),
        name: i.toString(),
      });
    }
    const wrapper = mount(createTable({
      rowSelection: {},
      dataSource: newData,
    }));
    wrapper.find('Pager').last().simulate('click'); // switch to second page
    wrapper.find('input').first().simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(renderedNames(wrapper)).toEqual(['10', '11', '12', '13', '14', '15', '16', '17', '18', '19']);
  });
});
