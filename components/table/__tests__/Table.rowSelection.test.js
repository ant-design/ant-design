import React from 'react';
import { mount, render } from 'enzyme';
import Table from '..';
import Checkbox from '../../checkbox';

describe('Table.rowSelection', () => {
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
    return <Table columns={columns} dataSource={data} rowSelection={{}} {...props} />;
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
        name: record.name,
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));
    const checkboxes = wrapper.find('input');

    expect(checkboxes.at(1).props().disabled).toBe(false);
    expect(checkboxes.at(1).props().name).toEqual(data[0].name);
    expect(checkboxes.at(2).props().disabled).toBe(true);
    expect(checkboxes.at(2).props().name).toEqual(data[1].name);
  });

  it('works with pagination', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 2 } }));

    const checkboxAll = wrapper.find('SelectionCheckboxAll');
    const pagers = wrapper.find('Pager');

    checkboxAll.find('input').simulate('change', { target: { checked: true } });
    expect(checkboxAll.instance().state).toEqual({ checked: true, indeterminate: false });

    pagers.at(1).simulate('click');
    expect(checkboxAll.instance().state).toEqual({ checked: false, indeterminate: false });

    pagers.at(0).simulate('click');
    expect(checkboxAll.instance().state).toEqual({ checked: true, indeterminate: false });
  });

  // https://github.com/ant-design/ant-design/issues/4020
  it('handles defaultChecked', () => {
    const rowSelection = {
      getCheckboxProps: record => ({
        defaultChecked: record.key === 0,
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));

    let checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(false);

    checkboxs.at(2).simulate('change', { target: { checked: true } });
    checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(true);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.',
    );
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

    wrapper
      .find('input')
      .last()
      .simulate('change', { target: { checked: true } });

    expect(handleChange).toHaveBeenCalledWith([3], [{ key: 3, name: 'Jerry' }]);
    expect(handleSelect.mock.calls.length).toBe(1);
    expect(handleSelect.mock.calls[0][0]).toEqual({ key: 3, name: 'Jerry' });
    expect(handleSelect.mock.calls[0][1]).toEqual(true);
    expect(handleSelect.mock.calls[0][2]).toEqual([{ key: 3, name: 'Jerry' }]);
    expect(handleSelect.mock.calls[0][3].type).toBe('change');
  });

  it('fires selectMulti event', () => {
    const handleSelectMulti = jest.fn();
    const handleSelect = jest.fn();
    const rowSelection = {
      onSelect: handleSelect,
      onSelectMultiple: handleSelectMulti,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper
      .find('input')
      .at(1)
      .simulate('change', {
        target: { checked: true },
        nativeEvent: { shiftKey: true },
      });
    expect(handleSelect).toHaveBeenCalled();

    wrapper
      .find('input')
      .at(3)
      .simulate('change', {
        target: { checked: true },
        nativeEvent: { shiftKey: true },
      });
    expect(handleSelectMulti).toHaveBeenCalledWith(
      true,
      [data[0], data[1], data[2]],
      [data[1], data[2]],
    );

    wrapper
      .find('input')
      .at(1)
      .simulate('change', {
        target: { checked: false },
        nativeEvent: { shiftKey: true },
      });
    expect(handleSelectMulti).toHaveBeenCalledWith(false, [], [data[0], data[1], data[2]]);
  });

  it('fires selectAll event', () => {
    const handleSelectAll = jest.fn();
    const rowSelection = {
      onSelectAll: handleSelectAll,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { checked: true } });
    expect(handleSelectAll).toHaveBeenCalledWith(true, data, data);

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { checked: false } });
    expect(handleSelectAll).toHaveBeenCalledWith(false, [], data);
  });

  it('render with default selection correctly', () => {
    const rowSelection = {
      selections: true,
    };
    const wrapper = mount(createTable({ rowSelection }));
    const dropdownWrapper = render(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper).toMatchSnapshot();
  });

  it('click select all selection', () => {
    const handleSelectAll = jest.fn();
    const rowSelection = {
      onSelectAll: handleSelectAll,
      selections: true,
    };
    const wrapper = mount(createTable({ rowSelection }));

    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    dropdownWrapper
      .find('.ant-dropdown-menu-item > div')
      .first()
      .simulate('click');

    expect(handleSelectAll).toHaveBeenCalledWith(true, data, data);
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
    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    dropdownWrapper
      .find('.ant-dropdown-menu-item > div')
      .last()
      .simulate('click');

    expect(handleSelectInvert).toHaveBeenCalledWith([1, 2, 3]);
  });

  it('fires selection event', () => {
    const handleSelectOdd = jest.fn();
    const handleSelectEven = jest.fn();
    const rowSelection = {
      selections: [
        {
          key: 'odd',
          text: '奇数项',
          onSelect: handleSelectOdd,
        },
        {
          key: 'even',
          text: '偶数项',
          onSelect: handleSelectEven,
        },
      ],
    };
    const wrapper = mount(createTable({ rowSelection }));

    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.find('.ant-dropdown-menu-item').length).toBe(4);

    dropdownWrapper
      .find('.ant-dropdown-menu-item > div')
      .at(2)
      .simulate('click');
    expect(handleSelectOdd).toHaveBeenCalledWith([0, 1, 2, 3]);

    dropdownWrapper
      .find('.ant-dropdown-menu-item > div')
      .at(3)
      .simulate('click');
    expect(handleSelectEven).toHaveBeenCalledWith([0, 1, 2, 3]);
  });

  it('could hide default selection options', () => {
    const rowSelection = {
      hideDefaultSelections: true,
      selections: [
        {
          key: 'odd',
          text: '奇数项',
        },
        {
          key: 'even',
          text: '偶数项',
        },
      ],
    };
    const wrapper = mount(createTable({ rowSelection }));
    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.find('.ant-dropdown-menu-item').length).toBe(2);
  });

  it('handle custom selection onSelect correctly when hide default selection options', () => {
    const handleSelectOdd = jest.fn();
    const handleSelectEven = jest.fn();
    const rowSelection = {
      hideDefaultSelections: true,
      selections: [
        {
          key: 'odd',
          text: '奇数项',
          onSelect: handleSelectOdd,
        },
        {
          key: 'even',
          text: '偶数项',
          onSelect: handleSelectEven,
        },
      ],
    };
    const wrapper = mount(createTable({ rowSelection }));

    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.find('.ant-dropdown-menu-item').length).toBe(2);

    dropdownWrapper
      .find('.ant-dropdown-menu-item > div')
      .at(0)
      .simulate('click');
    expect(handleSelectOdd).toHaveBeenCalledWith([0, 1, 2, 3]);

    dropdownWrapper
      .find('.ant-dropdown-menu-item > div')
      .at(1)
      .simulate('click');
    expect(handleSelectEven).toHaveBeenCalledWith([0, 1, 2, 3]);
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
    wrapper.find('input').forEach(checkbox => {
      expect(checkbox.props().disabled).toBe(true);
    });
  });

  // https://github.com/ant-design/ant-design/issues/4245
  it('should allow dynamic getCheckboxProps', () => {
    class App extends React.Component {
      state = {
        disableName: 'Jack',
      };

      render() {
        const { disableName } = this.state;
        return (
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={{
              getCheckboxProps: record => ({ disabled: record.name === disableName }),
            }}
          />
        );
      }
    }
    const wrapper = mount(<App />);
    let checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().disabled).toBe(true);
    expect(checkboxs.at(2).props().disabled).toBe(false);
    wrapper.setState({ disableName: 'Lucy' });
    checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().disabled).toBe(false);
    expect(checkboxs.at(2).props().disabled).toBe(true);
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
    const wrapper = mount(
      createTable({
        rowSelection: {},
        dataSource: newData,
      }),
    );
    wrapper
      .find('Pager')
      .last()
      .simulate('click'); // switch to second page
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(renderedNames(wrapper)).toEqual([
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
    ]);
  });

  it('highlight selected row', () => {
    const wrapper = mount(createTable());
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('tbody tr')
        .at(0)
        .hasClass('ant-table-row-selected'),
    ).toBe(true);
  });

  it('fix selection column on the left', () => {
    const wrapper = render(
      createTable({
        rowSelection: { fixed: true },
      }),
    );

    expect(wrapper).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/10629
  it('should keep all checked state when remove item from dataSource', () => {
    const wrapper = mount(
      <Table
        rowSelection={{
          selectedRowKeys: [0, 1, 2, 3],
        }}
        columns={columns}
        dataSource={data}
      />,
    );
    expect(wrapper.find(Checkbox).length).toBe(5);
    wrapper.find(Checkbox).forEach(checkbox => {
      expect(checkbox.props().checked).toBe(true);
      expect(checkbox.props().indeterminate).toBe(false);
    });
    wrapper.setProps({
      dataSource: data.slice(1),
      rowSelection: {
        selectedRowKeys: [1, 2, 3],
      },
    });
    expect(wrapper.find(Checkbox).length).toBe(4);
    wrapper.find(Checkbox).forEach(checkbox => {
      expect(checkbox.props().checked).toBe(true);
      expect(checkbox.props().indeterminate).toBe(false);
    });
  });

  // https://github.com/ant-design/ant-design/issues/11042
  it('add columnTitle for rowSelection', () => {
    const wrapper = mount(
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          columnTitle: '多选',
        }}
      />,
    );
    expect(
      wrapper
        .find('thead tr div')
        .at(0)
        .text(),
    ).toBe('多选');
    wrapper.setProps({
      rowSelection: {
        type: 'radio',
        columnTitle: '单选',
      },
    });
    expect(
      wrapper
        .find('thead tr div')
        .at(0)
        .text(),
    ).toBe('单选');
  });

  // https://github.com/ant-design/ant-design/issues/11384
  it('should keep item even if in filter', () => {
    const filterColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Jack',
            value: 'Jack',
          },
          {
            text: 'Lucy',
            value: 'Lucy',
          },
        ],
        filterDropdownVisible: true,
        onFilter: (value, record) => record.name.indexOf(value) === 0,
      },
    ];

    const onChange = jest.fn();
    const rowSelection = {
      onChange,
    };

    const wrapper = mount(
      <Table columns={filterColumns} dataSource={data} rowSelection={rowSelection} />,
    );

    function clickFilter(indexList) {
      indexList.forEach(index => {
        wrapper
          .find('.ant-dropdown-menu-item .ant-checkbox-wrapper')
          .at(index)
          .simulate('click');
      });
      wrapper
        .find('.ant-table-filter-dropdown-btns .ant-table-filter-dropdown-link.confirm')
        .simulate('click');
    }

    function clickItem() {
      wrapper
        .find('tbody .ant-table-selection-column .ant-checkbox-input')
        .at(0)
        .simulate('change', {
          target: { checked: true },
        });
    }

    // Check Jack
    clickFilter([0]);
    expect(wrapper.find('tbody tr').length).toBe(1);
    clickItem();
    expect(onChange.mock.calls[0][0].length).toBe(1);
    expect(onChange.mock.calls[0][1].length).toBe(1);

    // Check Lucy
    clickFilter([0, 1]);
    expect(wrapper.find('tbody tr').length).toBe(1);
    clickItem();
    expect(onChange.mock.calls[1][0].length).toBe(2);
    expect(onChange.mock.calls[1][1].length).toBe(2);
  });

  it('render correctly when set childrenColumnName', () => {
    const newDatas = [
      {
        key: 1,
        name: 'Jack',
        children: [
          {
            key: 11,
            name: 'John Brown',
          },
        ],
      },
      {
        key: 2,
        name: 'Lucy',
        children: [
          {
            key: 21,
            name: 'Lucy Brown',
          },
        ],
      },
    ];
    const wrapper = mount(
      <Table columns={columns} dataSource={newDatas} childrenColumnName="test" rowSelection={{}} />,
    );
    const checkboxes = wrapper.find('input');
    const checkboxAll = wrapper.find('SelectionCheckboxAll');

    checkboxes.at(1).simulate('change', { target: { checked: true } });
    expect(checkboxAll.instance().state).toEqual({ indeterminate: true, checked: false });

    checkboxes.at(2).simulate('change', { target: { checked: true } });
    expect(checkboxAll.instance().state).toEqual({ indeterminate: false, checked: true });
  });

  // https://github.com/ant-design/ant-design/issues/16614
  it('should get selectedRows correctly when set childrenColumnName', () => {
    const onChange = jest.fn();
    const newDatas = [
      {
        key: 1,
        name: 'Jack',
        list: [
          {
            key: 11,
            name: 'John Brown',
          },
        ],
      },
    ];
    const wrapper = mount(
      <Table
        columns={columns}
        dataSource={newDatas}
        childrenColumnName="list"
        rowSelection={{ onChange }}
        expandedRowKeys={[1]}
      />,
    );
    const checkboxes = wrapper.find('input');
    checkboxes.at(2).simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenLastCalledWith([11], [newDatas[0].list[0]]);
    checkboxes.at(1).simulate('change', { target: { checked: true } });
    const item0 = { ...newDatas[0], list: undefined };
    expect(onChange).toHaveBeenLastCalledWith([11, 1], [item0, newDatas[0].list[0]]);
  });

  it('clear selection className when remove `rowSelection`', () => {
    const dataSource = [{ id: 1, name: 'Hello', age: 10 }, { id: 2, name: 'World', age: 30 }];

    const wrapper = mount(<Table columns={columns} dataSource={dataSource} rowSelection={{}} />);
    const checkboxes = wrapper.find('input');
    checkboxes.at(1).simulate('change', { target: { checked: true } });

    expect(wrapper.find('.ant-table-row-selected').length).toBe(1);

    wrapper.setProps({ rowSelection: null });
    expect(wrapper.find('.ant-table-row-selected').length).toBe(0);
  });
});
