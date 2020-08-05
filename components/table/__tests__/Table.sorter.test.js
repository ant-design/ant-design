/* eslint-disable react/no-multi-comp */
import React from 'react';
import { render, mount } from 'enzyme';
import Table from '..';

describe('Table.sorter', () => {
  const sorterFn = (a, b) => a.name[0].charCodeAt() - b.name[0].charCodeAt();

  const column = {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
        columns={[
          {
            ...column,
            ...columnProps,
          },
        ]}
        dataSource={data}
        pagination={false}
        {...tableProps}
      />
    );
  }

  function renderedNames(wrapper) {
    return wrapper.find('BodyRow').map(row => row.props().record.name);
  }

  it('renders sorter icon correctly', () => {
    const wrapper = render(createTable());
    expect(wrapper.find('thead')).toMatchSnapshot();
  });

  it('default sort order ascend', () => {
    const wrapper = mount(
      createTable(
        {},
        {
          defaultSortOrder: 'ascend',
        },
      ),
    );

    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
  });

  it('default sort order descend', () => {
    const wrapper = mount(
      createTable(
        {},
        {
          defaultSortOrder: 'descend',
        },
      ),
    );

    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);
  });

  it('sort records', () => {
    const wrapper = mount(createTable());

    // ascend
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);

    // descend
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);
  });

  describe('can be controlled by sortOrder', () => {
    it('single', () => {
      const wrapper = mount(
        createTable({
          columns: [{ ...column, sortOrder: 'ascend' }],
        }),
      );
      expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
    });

    it('invalidate mix with single & multiple sorters', () => {
      const wrapper = mount(
        createTable({
          columns: [
            {
              title: 'Name',
              dataIndex: 'name',
              sortOrder: 'ascend',
              sorter: {
                multiple: 1,
              },
            },
            {
              title: 'Name',
              dataIndex: 'name',
              sortOrder: 'ascend',
              sorter: {},
            },
          ],
        }),
      );

      expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
    });
  });

  it('provides sortOrder in the sorterFn', () => {
    let actualSortOrder;
    mount(
      createTable(
        {},
        {
          sortOrder: 'ascend',
          sorter: (a, b, sortOrder) => {
            actualSortOrder = sortOrder;
            return sorterFn(a, b);
          },
        },
      ),
    );
    expect(actualSortOrder).toEqual('ascend');
  });

  it('can update column sortOrder', () => {
    const wrapper = mount(
      createTable({
        columns: [column],
      }),
    );
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
    wrapper.setProps({
      columns: [{ ...column, sortOrder: 'ascend' }],
    });
    wrapper.update();
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
  });

  it('fires change event', () => {
    const handleChange = jest.fn();
    const wrapper = mount(createTable({ onChange: handleChange }));

    // ascent
    wrapper.find('.ant-table-column-sorters').simulate('click');
    const sorter1 = handleChange.mock.calls[0][2];
    expect(sorter1.column.dataIndex).toBe('name');
    expect(sorter1.order).toBe('ascend');
    expect(sorter1.field).toBe('name');
    expect(sorter1.columnKey).toBe('name');

    wrapper.find('.ant-table-column-sorters').simulate('click');
    const sorter2 = handleChange.mock.calls[1][2];
    expect(sorter2.column.dataIndex).toBe('name');
    expect(sorter2.order).toBe('descend');
    expect(sorter2.field).toBe('name');
    expect(sorter2.columnKey).toBe('name');

    wrapper.find('.ant-table-column-sorters').simulate('click');
    const sorter3 = handleChange.mock.calls[2][2];
    expect(sorter3.column).toBe(undefined);
    expect(sorter3.order).toBe(undefined);
    expect(sorter3.field).toBe('name');
    expect(sorter3.columnKey).toBe('name');
  });

  it('hover header show sorter tooltip', () => {
    // tooltip has delay
    jest.useFakeTimers();
    const wrapper = mount(createTable({}));
    // default show sorter tooltip
    wrapper.find('.ant-table-column-sorters-with-tooltip').simulate('mouseenter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-tooltip-open').length).toBeTruthy();
    wrapper.find('.ant-table-column-sorters-with-tooltip').simulate('mouseout');

    // set table props showSorterTooltip is false
    wrapper.setProps({ showSorterTooltip: false });
    expect(wrapper.find('.ant-table-column-sorters-with-tooltip')).toHaveLength(0);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-tooltip-open')).toHaveLength(0);
    // set table props showSorterTooltip is false, column showSorterTooltip is true
    wrapper.setProps({
      showSorterTooltip: false,
      columns: [{ ...column, showSorterTooltip: true }],
    });
    wrapper.find('.ant-table-column-sorters-with-tooltip').simulate('mouseenter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-tooltip-open').length).toBeTruthy();
    wrapper.find('.ant-table-column-sorters-with-tooltip').simulate('mouseout');
    // set table props showSorterTooltip is true, column showSorterTooltip is false
    wrapper.setProps({
      showSorterTooltip: true,
      columns: [{ ...column, showSorterTooltip: false }],
    });
    expect(wrapper.find('.ant-table-column-sorters-with-tooltip')).toHaveLength(0);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-tooltip-open')).toHaveLength(0);
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
    const wrapper = mount(<Table columns={columns} dataSource={testData} />);

    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);
  });

  // https://github.com/ant-design/ant-design/issues/11246#issuecomment-405009167
  it('Allow column title as render props with sortOrder argument', () => {
    const title = ({ sortOrder }) => <div className="custom-title">{sortOrder}</div>;
    const columns = [
      {
        title,
        key: 'group',
        sorter: true,
      },
    ];
    const testData = [
      { key: 0, name: 'Jack', age: 11 },
      { key: 1, name: 'Lucy', age: 20 },
      { key: 2, name: 'Tom', age: 21 },
      { key: 3, name: 'Jerry', age: 22 },
    ];
    const wrapper = mount(<Table columns={columns} dataSource={testData} />);
    expect(wrapper.find('.custom-title').text()).toEqual('');
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(wrapper.find('.custom-title').text()).toEqual('ascend');
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(wrapper.find('.custom-title').text()).toEqual('descend');
  });

  // https://github.com/ant-design/ant-design/pull/12264#discussion_r218053034
  it('should sort from beginning state when toggle from different columns', () => {
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        sorter: true,
      },
    ];
    const testData = [
      { key: 0, name: 'Jack', age: 11 },
      { key: 1, name: 'Lucy', age: 20 },
      { key: 2, name: 'Tom', age: 21 },
      { key: 3, name: 'Jerry', age: 22 },
    ];
    const wrapper = mount(<Table columns={columns} dataSource={testData} />);

    const getNameColumn = () => wrapper.find('.ant-table-column-has-sorters').at(0);
    const getAgeColumn = () => wrapper.find('.ant-table-column-has-sorters').at(1);
    const getNameIcon = name => getNameColumn().find(`.ant-table-column-sorter-${name}`).first();
    const getAgeIcon = name => getAgeColumn().find(`.ant-table-column-sorter-${name}`).first();

    // sort name
    getNameColumn().simulate('click');
    expect(getNameIcon('up').hasClass('active')).toBeTruthy();
    expect(getAgeIcon('up').hasClass('active')).toBeFalsy();

    // sort age
    getAgeColumn().simulate('click');
    expect(getNameIcon('up').hasClass('active')).toBeFalsy();
    expect(getAgeIcon('up').hasClass('active')).toBeTruthy();
  });

  // https://github.com/ant-design/ant-design/issues/12571
  it('should toggle sort state when columns are put in render', () => {
    const testData = [
      { key: 0, name: 'Jack', age: 11 },
      { key: 1, name: 'Lucy', age: 20 },
      { key: 2, name: 'Tom', age: 21 },
      { key: 3, name: 'Jerry', age: 22 },
    ];
    class TableTest extends React.Component {
      state = {
        pagination: {},
      };

      onChange = pagination => {
        this.setState({ pagination });
      };

      render() {
        const columns = [
          {
            title: 'name',
            dataIndex: 'name',
            sorter: true,
          },
        ];
        const { pagination } = this.state;
        return (
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={testData}
            onChange={this.onChange}
          />
        );
      }
    }

    const wrapper = mount(<TableTest />);

    const getNameColumn = () => wrapper.find('.ant-table-column-has-sorters').at(0);
    const getIcon = name => getNameColumn().find(`.ant-table-column-sorter-${name}`).first();

    expect(getIcon('up').hasClass('active')).toBeFalsy();
    expect(getIcon('down').hasClass('active')).toBeFalsy();

    // sort name
    getNameColumn().simulate('click');
    expect(getIcon('up').hasClass('active')).toBeTruthy();
    expect(getIcon('down').hasClass('active')).toBeFalsy();

    // sort name
    getNameColumn().simulate('click');
    expect(getIcon('up').hasClass('active')).toBeFalsy();
    expect(getIcon('down').hasClass('active')).toBeTruthy();

    // sort name
    getNameColumn().simulate('click');
    expect(getIcon('up').hasClass('active')).toBeFalsy();
    expect(getIcon('down').hasClass('active')).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/12737
  // https://github.com/ant-design/ant-design/issues/19398
  it('should toggle sort state when columns with non primitive properties are put in render', () => {
    const testData = [
      { key: 0, name: 'Jack', age: 11 },
      { key: 1, name: 'Lucy', age: 20 },
      { key: 2, name: 'Tom', age: 21 },
      { key: 3, name: 'Jerry', age: 22 },
    ];
    class TableTest extends React.Component {
      state = {
        pagination: {},
      };

      onChange = pagination => {
        this.setState({ pagination });
      };

      render() {
        const columns = [
          {
            title: 'name',
            dataIndex: 'name',
            sorter: true,
            render: text => text,
            array: ['1', '2', 3],
          },
        ];
        const { pagination } = this.state;
        return (
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={testData}
            onChange={this.onChange}
          />
        );
      }
    }

    const wrapper = mount(<TableTest />);

    const getNameColumn = () => wrapper.find('.ant-table-column-has-sorters').at(0);
    const getIcon = name => getNameColumn().find(`.ant-table-column-sorter-${name}`).first();

    expect(getIcon('up').hasClass('active')).toBeFalsy();
    expect(getIcon('down').hasClass('active')).toBeFalsy();

    // sort name
    getNameColumn().simulate('click');
    expect(getIcon('up').hasClass('active')).toBeTruthy();
    expect(getIcon('down').hasClass('active')).toBeFalsy();

    // sort name
    getNameColumn().simulate('click');
    expect(getIcon('up').hasClass('active')).toBeFalsy();
    expect(getIcon('down').hasClass('active')).toBeTruthy();

    // sort name
    getNameColumn().simulate('click');
    expect(getIcon('up').hasClass('active')).toBeFalsy();
    expect(getIcon('down').hasClass('active')).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/12870
  it('should toggle sort state when columns with key are put in render', () => {
    const testData = [
      { key: 0, name: 'Jack', age: 11 },
      { key: 1, name: 'Lucy', age: 20 },
      { key: 2, name: 'Tom', age: 21 },
      { key: 3, name: 'Jerry', age: 22 },
    ];
    class TableTest extends React.Component {
      state = {
        pagination: {},
      };

      onChange = pagination => {
        this.setState({ pagination });
      };

      render() {
        const columns = [
          {
            title: 'name',
            dataIndex: 'name',
            sorter: true,
            key: 'a',
            style: {
              fontSize: 18,
            },
          },
        ];
        const { pagination } = this.state;
        return (
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={testData}
            onChange={this.onChange}
          />
        );
      }
    }

    const wrapper = mount(<TableTest />);
    const getNameColumn = () => wrapper.find('.ant-table-column-has-sorters').at(0);
    expect(
      getNameColumn().find('.ant-table-column-sorter-up').at(0).hasClass('active'),
    ).toBeFalsy();
    expect(
      getNameColumn().find('.ant-table-column-sorter-down').at(0).hasClass('active'),
    ).toBeFalsy();

    // sort name
    getNameColumn().simulate('click');
    expect(
      getNameColumn().find('.ant-table-column-sorter-up').at(0).hasClass('active'),
    ).toBeTruthy();
    expect(
      getNameColumn().find('.ant-table-column-sorter-down').at(0).hasClass('active'),
    ).toBeFalsy();

    // sort name
    getNameColumn().simulate('click');
    expect(
      getNameColumn().find('.ant-table-column-sorter-up').at(0).hasClass('active'),
    ).toBeFalsy();
    expect(
      getNameColumn().find('.ant-table-column-sorter-down').at(0).hasClass('active'),
    ).toBeTruthy();

    // sort name
    getNameColumn().simulate('click');
    expect(
      getNameColumn().find('.ant-table-column-sorter-up').at(0).hasClass('active'),
    ).toBeFalsy();
    expect(
      getNameColumn().find('.ant-table-column-sorter-down').at(0).hasClass('active'),
    ).toBeFalsy();
  });

  it('should first sort by descend, then ascend, then cancel sort', () => {
    const wrapper = mount(
      createTable({
        sortDirections: ['descend', 'ascend'],
      }),
    );

    // descend
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);

    // ascend
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);

    // cancel sort
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
  });

  it('should first sort by descend, then cancel sort', () => {
    const wrapper = mount(
      createTable({
        sortDirections: ['descend'],
      }),
    );

    // descend
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);

    // cancel sort
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
  });

  it('should first sort by descend, then cancel sort. (column prop)', () => {
    const wrapper = mount(
      createTable(
        {},
        {
          sortDirections: ['descend'],
        },
      ),
    );

    // descend
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jack', 'Jerry']);

    // cancel sort
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
  });

  it('pagination back', () => {
    const onPageChange = jest.fn();
    const onChange = jest.fn();

    const wrapper = mount(
      createTable({
        pagination: {
          pageSize: 2,
          defaultCurrent: 2,
          onChange: onPageChange,
        },
        onChange,
      }),
    );

    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(onChange.mock.calls[0][0].current).toBe(2);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should support onHeaderCell in sort column', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Table columns={[{ title: 'title', onHeaderCell: () => ({ onClick }), sorter: true }]} />,
    );
    wrapper.find('th').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('could sort data with children', () => {
    const wrapper = mount(
      createTable(
        {
          defaultExpandAllRows: true,
          dataSource: [
            {
              key: '1',
              name: 'Brown',
              children: [
                {
                  key: '2',
                  name: 'Zoe',
                },
                {
                  key: '3',
                  name: 'Mike',
                  children: [
                    {
                      key: '3-1',
                      name: 'Petter',
                    },
                    {
                      key: '3-2',
                      name: 'Alex',
                    },
                  ],
                },
                {
                  key: '4',
                  name: 'Green',
                },
              ],
            },
          ],
        },
        {
          defaultSortOrder: 'ascend',
        },
      ),
    );

    expect(renderedNames(wrapper)).toEqual(['Brown', 'Green', 'Mike', 'Alex', 'Petter', 'Zoe']);
  });

  // https://github.com/ant-design/ant-design/issues/19443
  it('should not being inifinite loop when using Table.Column with sortOrder', () => {
    class Demo extends React.Component {
      componentDidMount() {
        this.setState({});
      }

      render() {
        return (
          <Table dataSource={[]}>
            <Table.Column title="Age" dataIndex="age" sorter sortOrder="ascend" key="age" />
          </Table>
        );
      }
    }
    expect(() => {
      mount(<Demo />);
    }).not.toThrow();
  });

  it('should support defaultOrder in Column', () => {
    const wrapper = mount(
      <Table dataSource={[{ key: '1', age: 1 }]}>
        <Table.Column title="Age" dataIndex="age" sorter defaultSortOrder="ascend" key="age" />
      </Table>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/20096
  it('invalidate sorter should not display sorter button', () => {
    const wrapper = mount(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: false,
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: null,
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: undefined,
          },
        ]}
      />,
    );

    expect(wrapper.find('.ant-table-column-sorter-inner')).toHaveLength(0);
  });

  // https://github.com/ant-design/ant-design/issues/21193
  it('table with sugar column', () => {
    const wrapper = mount(
      <Table>
        <Table.Column
          title="Chinese Score"
          dataIndex="chinese"
          sorter={{
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          }}
        />
        <Table.Column
          title="Math Score"
          dataIndex="math"
          sorter={{
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          }}
        />
      </Table>,
    );

    wrapper.find('th').first().simulate('click');

    expect(wrapper.find('th.ant-table-column-sort')).toHaveLength(1);
  });

  it('surger should support sorterOrder', () => {
    const wrapper = mount(
      <Table>
        <Table.Column key="name" title="Name" dataIndex="name" sortOrder="ascend" sorter />
      </Table>,
    );

    expect(wrapper.find('.ant-table-column-sorter-up').last().hasClass('active')).toBeTruthy();
    expect(wrapper.find('.ant-table-column-sorter-down').last().hasClass('active')).toBeFalsy();
  });

  it('controlled multiple group', () => {
    const groupColumns = [
      {
        title: 'Math Score',
        dataIndex: 'math1',
        sortOrder: 'ascend',
        sorter: { multiple: 1 },
        children: [
          {
            title: 'math',
            dataIndex: 'math',
          },
        ],
      },
      {
        title: 'English Score',
        dataIndex: 'english',
        sortOrder: 'descend',
        sorter: { multiple: 2 },
      },
    ];

    const groupData = [
      {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
      },
    ];

    const wrapper = mount(<Table columns={groupColumns} data={groupData} />);
    wrapper.update();
    expect(
      wrapper
        .find('.ant-table-column-sorter-full')
        .first()
        .find('.ant-table-column-sorter-up')
        .first()
        .hasClass('active'),
    ).toBeTruthy();
    expect(
      wrapper
        .find('.ant-table-column-sorter-full')
        .last()
        .find('.ant-table-column-sorter-down')
        .first()
        .hasClass('active'),
    ).toBeTruthy();
  });

  it('onChange with correct sorter for multiple', () => {
    const groupColumns = [
      {
        title: 'Math Score',
        dataIndex: 'math',
        sorter: { multiple: 1 },
      },
      {
        title: 'English Score',
        dataIndex: 'english',
        sorter: { multiple: 2 },
      },
    ];

    const groupData = [
      {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
      },
    ];

    const onChange = jest.fn();
    const wrapper = mount(<Table columns={groupColumns} data={groupData} onChange={onChange} />);

    function clickToMatchExpect(index, sorter) {
      wrapper.find('.ant-table-column-sorters').at(index).simulate('click');

      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining(sorter),
        expect.anything(),
      );

      onChange.mockReset();
    }

    // First
    clickToMatchExpect(0, { field: 'math', order: 'ascend' });
    clickToMatchExpect(0, { field: 'math', order: 'descend' });
    clickToMatchExpect(0, { field: 'math', order: undefined });

    // Last
    clickToMatchExpect(1, { field: 'english', order: 'ascend' });
    clickToMatchExpect(1, { field: 'english', order: 'descend' });
    clickToMatchExpect(1, { field: 'english', order: undefined });
  });
});
