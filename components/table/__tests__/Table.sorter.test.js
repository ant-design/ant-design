/* eslint-disable react/no-multi-comp */
import React from 'react';
import { render, mount } from 'enzyme';
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
    return wrapper.find('TableRow').map(row => row.props().record.name);
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

  it('can be controlled by sortOrder', () => {
    const wrapper = mount(
      createTable({
        columns: [{ ...column, sortOrder: 'ascend' }],
      }),
    );
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
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
  it('should sort from begining state when toggle from different columns', () => {
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
    const nameColumn = wrapper.find('.ant-table-column-sorters').at(0);
    const ageColumn = wrapper.find('.ant-table-column-sorters').at(1);
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
    expect(
      ageColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    // sort age
    ageColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      ageColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
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
    const nameColumn = wrapper.find('.ant-table-column-sorters').at(0);
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
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
    const nameColumn = wrapper.find('.ant-table-column-sorters').at(0);
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
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
    const nameColumn = wrapper.find('.ant-table-column-sorters').at(0);
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' on');
    // sort name
    nameColumn.simulate('click');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-up')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
    expect(
      nameColumn
        .find('.ant-table-column-sorter-down')
        .at(0)
        .getDOMNode().className,
    ).toContain(' off');
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
          onChange: onPageChange,
        },
        onChange,
      }),
    );

    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(onChange.mock.calls[0][0].current).toBe(1);
    expect(onPageChange.mock.calls[0][0]).toBe(1);
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
});
