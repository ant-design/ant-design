/* eslint-disable react/no-multi-comp */
import React from 'react';
import { render, mount } from 'enzyme';
import Table from '..';
import Input from '../../input';
import Button from '../../button';

function getDropdownWrapper(wrapper) {
  return mount(
    wrapper
      .find('Trigger')
      .instance()
      .getComponent(),
  );
}

describe('Table.filter', () => {
  const filterFn = (value, record) => record.name.indexOf(value) !== -1;
  const column = {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      { text: 'Boy', value: 'boy' },
      { text: 'Girl', value: 'girl' },
      {
        text: 'Title',
        value: 'title',
        children: [{ text: 'Designer', value: 'designer' }, { text: 'Coder', value: 'coder' }],
      },
    ],
    onFilter: filterFn,
  };

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  function createTable(props) {
    return <Table columns={[column]} dataSource={data} pagination={false} {...props} />;
  }

  function renderedNames(wrapper) {
    return wrapper.find('TableRow').map(row => row.props().record.name);
  }

  it('renders filter correctly', () => {
    const wrapper = render(createTable());

    expect(wrapper).toMatchSnapshot();
  });

  it('renders menu correctly', () => {
    const wrapper = mount(createTable());
    const dropdownWrapper = render(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper).toMatchSnapshot();
  });

  it('renders radio filter correctly', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterMultiple: false,
          },
        ],
      }),
    );
    const dropdownWrapper = render(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper).toMatchSnapshot();
  });

  it('renders custom content correctly', () => {
    const filter = <div className="custom-filter-dropdown">custom filter</div>;
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: filter,
          },
        ],
      }),
    );

    const dropdownWrapper = render(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper).toMatchSnapshot();
  });

  it('override custom filter correctly', () => {
    const filter = ({ prefixCls, setSelectedKeys, confirm, clearFilters }) => (
      <div className={`${prefixCls}-view`} id="customFilter">
        <span onClick={() => setSelectedKeys([42])} id="setSelectedKeys">
          setSelectedKeys
        </span>
        <span onClick={() => confirm()} id="confirm">
          Confirm
        </span>
        <span onClick={() => clearFilters()} id="reset">
          Reset
        </span>
      </div>
    );

    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: filter,
          },
        ],
      }),
    );

    const filterMenu = wrapper.find('FilterMenu').instance();

    // check if renderer well
    wrapper.find('i.ant-dropdown-trigger').simulate('click');
    expect(wrapper.find('#customFilter')).toMatchSnapshot();

    // try to use reset btn
    expect(filterMenu.state.selectedKeys).toEqual([]);
    wrapper.find('#setSelectedKeys').simulate('click');
    expect(filterMenu.state.selectedKeys).toEqual([42]);
    wrapper.find('#reset').simulate('click');
    expect(filterMenu.state.selectedKeys).toEqual([]);

    // try to use confirm btn
    wrapper.find('i.ant-dropdown-trigger').simulate('click');
    wrapper.find('#setSelectedKeys').simulate('click');
    expect(filterMenu.state.visible).toBe(true);
    wrapper.find('#confirm').simulate('click');
    expect(filterMenu.state.selectedKeys).toEqual([42]);
    expect(filterMenu.state.visible).toBe(false);
  });

  it('can be controlled by filterDropdownVisible', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
          },
        ],
      }),
    );

    let dropdown = wrapper.find('Dropdown').first();
    expect(dropdown.props().visible).toBe(true);

    wrapper.setProps({
      columns: [
        {
          ...column,
          filterDropdownVisible: false,
        },
      ],
    });

    dropdown = wrapper.find('Dropdown').first();
    expect(dropdown.props().visible).toBe(false);
  });

  it('if the filter is visible it should ignore the selectedKeys changes', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
          },
        ],
      }),
    );

    const filterMenu = wrapper.find('FilterMenu').instance();
    expect(filterMenu.state.selectedKeys).toEqual([]);
    wrapper
      .find('FilterMenu')
      .find('input[type="checkbox"]')
      .first()
      .simulate('click');
    expect(filterMenu.state.selectedKeys).toEqual(['boy']);
    wrapper.setProps({ dataSource: [...data, { key: 999, name: 'Chris' }] });
    expect(filterMenu.state.selectedKeys).toEqual(['boy']);
  });

  it('fires change event when visible change', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            onFilterDropdownVisibleChange: handleChange,
          },
        ],
      }),
    );

    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('can be controlled by filteredValue', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy'],
          },
        ],
      }),
    );

    expect(wrapper.find('tbody tr').length).toBe(1);
    wrapper.setProps({
      columns: [
        {
          ...column,
          filteredValue: [],
        },
      ],
    });
    expect(wrapper.find('tbody tr').length).toBe(4);
  });

  it('can be controlled by filteredValue null', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy'],
          },
        ],
      }),
    );

    expect(wrapper.find('tbody tr').length).toBe(1);
    wrapper.setProps({
      columns: [
        {
          ...column,
          filteredValue: null,
        },
      ],
    });
    expect(wrapper.find('tbody tr').length).toBe(4);
  });

  it('fires change event', () => {
    const handleChange = jest.fn();
    const wrapper = mount(createTable({ onChange: handleChange }));
    const dropdownWrapper = getDropdownWrapper(wrapper);

    dropdownWrapper
      .find('MenuItem')
      .first()
      .simulate('click');
    dropdownWrapper.find('.confirm').simulate('click');

    expect(handleChange).toHaveBeenCalledWith(
      {},
      { name: ['boy'] },
      {},
      {
        currentDataSource: [],
      },
    );
  });

  it('should not fire change event on close filterDropdown without changing anything', () => {
    const handleChange = jest.fn();
    const wrapper = mount(createTable({ onChange: handleChange }));
    const dropdownWrapper = getDropdownWrapper(wrapper);

    dropdownWrapper.find('.clear').simulate('click');

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('three levels menu', () => {
    const filters = [
      { text: 'Upper', value: 'Upper' },
      { text: 'Lower', value: 'Lower' },
      {
        text: 'Level2',
        value: 'Level2',
        children: [
          { text: 'Large', value: 'Large' },
          { text: 'Small', value: 'Small' },
          {
            text: 'Level3',
            value: 'Level3',
            children: [
              { text: 'Black', value: 'Black' },
              { text: 'White', value: 'White' },
              { text: 'Jack', value: 'Jack' },
            ],
          },
        ],
      },
    ];
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filters,
          },
        ],
      }),
    );
    jest.useFakeTimers();
    const dropdownWrapper = getDropdownWrapper(wrapper);
    dropdownWrapper
      .find('.ant-dropdown-menu-submenu-title')
      .at(0)
      .simulate('mouseEnter');
    jest.runAllTimers();
    dropdownWrapper.update();
    dropdownWrapper
      .find('.ant-dropdown-menu-submenu-title')
      .at(1)
      .simulate('mouseEnter');
    jest.runAllTimers();
    dropdownWrapper.update();
    dropdownWrapper
      .find('MenuItem')
      .last()
      .simulate('click');
    dropdownWrapper.find('.confirm').simulate('click');
    wrapper.update();
    expect(renderedNames(wrapper)).toEqual(['Jack']);
    jest.useRealTimers();
  });

  describe('should support value types', () => {
    [['Light', 93], ['Bamboo', false]].forEach(([text, value]) => {
      it(`${typeof value} type`, () => {
        const onFilter = jest.fn();
        const filters = [{ text, value }];
        const wrapper = mount(
          createTable({
            columns: [
              {
                ...column,
                filters,
                onFilter,
              },
            ],
          }),
        );
        jest.useFakeTimers();
        const dropdownWrapper = getDropdownWrapper(wrapper);
        dropdownWrapper
          .find('MenuItem')
          .first()
          .simulate('click');

        // This test can be remove if refactor
        expect(typeof wrapper.find('FilterMenu').state().selectedKeys[0]).toEqual('string');

        dropdownWrapper.find('.confirm').simulate('click');
        wrapper.update();

        expect(onFilter.mock.calls.length > 0).toBeTruthy();
        onFilter.mock.calls.forEach(([val]) => {
          expect(val).toBe(value);
        });

        // This test can be remove if refactor
        expect(typeof wrapper.find('FilterMenu').state().selectedKeys[0]).toEqual(typeof value);

        // Another time of Filter show
        // https://github.com/ant-design/ant-design/issues/15593
        getDropdownWrapper(wrapper)
          .find('MenuItem')
          .first()
          .simulate('click');

        expect(
          wrapper
            .find('FilterMenu')
            .find('Checkbox')
            .at(0)
            .props().checked,
        ).toEqual(true);

        jest.useRealTimers();
      });
    });
  });

  it('works with JSX in controlled mode', () => {
    const { Column } = Table;

    class App extends React.Component {
      state = {
        filters: {},
      };

      handleChange = (pagination, filters) => {
        this.setState({ filters });
      };

      render() {
        const { filters } = this.state;
        return (
          <Table dataSource={data} onChange={this.handleChange}>
            <Column
              title="name"
              dataIndex="name"
              key="name"
              filters={[{ text: 'Jack', value: 'Jack' }, { text: 'Lucy', value: 'Lucy' }]}
              filteredValue={filters.name}
              onFilter={filterFn}
            />
          </Table>
        );
      }
    }

    const wrapper = mount(<App />);
    const dropdownWrapper = getDropdownWrapper(wrapper);

    dropdownWrapper
      .find('MenuItem')
      .first()
      .simulate('click');
    dropdownWrapper.find('.confirm').simulate('click');
    wrapper.update();
    expect(renderedNames(wrapper)).toEqual(['Jack']);

    dropdownWrapper.find('.clear').simulate('click');
    wrapper.update();
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
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
            filters: [{ text: 'Jack', value: 'Jack' }, { text: 'Lucy', value: 'Lucy' }],
            onFilter: filterFn,
            filteredValue: ['Jack'],
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
    const wrapper = mount(<Table columns={columns} dataSource={testData} />);

    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });

  it('confirm filter when dropdown hidden', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filters: [{ text: 'Jack', value: 'Jack' }, { text: 'Lucy', value: 'Lucy' }],
          },
        ],
        onChange: handleChange,
      }),
    );

    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-dropdown-menu-item')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][3].currentDataSource.length).toBe(1);
  });

  it('renders custom filter icon correctly', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterIcon: filtered => <span>{filtered ? 'filtered' : 'unfiltered'}</span>,
          },
        ],
      }),
    );

    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-dropdown-menu-item')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');
    expect(wrapper.find('.ant-table-filter-icon').render()).toMatchSnapshot();

    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-dropdown-menu-item')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');
    expect(wrapper.find('.ant-table-filter-icon').render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/13028
  it('reset dropdown filter correctly', () => {
    class Demo extends React.Component {
      state = {};

      onChange = () => {
        this.setState({ name: '' });
      };

      render() {
        const { name } = this.state;

        return createTable({
          onChange: this.onChange,
          columns: [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              filteredValue: name,
              filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <div>
                  <Input
                    value={selectedKeys[0]}
                    onChange={e => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                    }}
                  />
                  <Button onClick={confirm}>Confirm</Button>
                </div>
              ),
            },
          ],
        });
      }
    }

    const wrapper = mount(<Demo />);
    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');
    wrapper.find('.ant-input').simulate('change', { target: { value: 'test' } });
    expect(wrapper.find('.ant-input').instance().value).toBe('test');
    wrapper.find('.ant-btn').simulate('click');

    wrapper
      .find('.ant-dropdown-trigger')
      .first()
      .simulate('click');
    expect(wrapper.find('.ant-input').instance().value).toBe('');
  });
});
