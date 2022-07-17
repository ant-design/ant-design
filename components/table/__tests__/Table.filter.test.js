/* eslint-disable react/no-multi-comp */
import React from 'react';
import { act } from 'react-dom/test-utils';
import Table from '..';
import { fireEvent, render, waitFor } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';
import Input from '../../input';
import Menu from '../../menu';
import Select from '../../select';
import Tooltip from '../../tooltip';

// https://github.com/Semantic-Org/Semantic-UI-React/blob/72c45080e4f20b531fda2e3e430e384083d6766b/test/specs/modules/Dropdown/Dropdown-test.js#L73
const nativeEvent = { nativeEvent: { stopImmediatePropagation: () => {} } };

describe('Table.filter', () => {
  window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = window.clearTimeout;

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
        children: [
          { text: 'Designer', value: 'designer' },
          { text: 'Coder', value: 'coder' },
        ],
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

  const longData = [];
  for (let i = 0; i < 100; i += 1) {
    longData.push({
      key: i.toString(),
      name: 'name',
    });
  }

  function createTable(props) {
    return <Table columns={[column]} dataSource={data} pagination={false} {...props} />;
  }

  function renderedNames(container) {
    const namesList = [];
    container
      .querySelector('.ant-table-tbody')
      .querySelectorAll('tr')
      .forEach(tr => {
        namesList.push(tr.querySelector('td').textContent);
      });
    return namesList;
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('not show filter icon when undefined', () => {
    const noFilterColumn = { ...column, filters: undefined };
    delete noFilterColumn.onFilter;
    const { container } = render(
      createTable({
        columns: [noFilterColumn],
      }),
    );

    expect(container.querySelectorAll('.ant-table-filter-column')).toHaveLength(0);
  });

  // https://github.com/ant-design/ant-design/issues/26988
  it('not show filter icon when filter and filterDropdown is undefined', () => {
    const noFilterColumn = { ...column, filters: undefined, filterDropdown: undefined };
    delete noFilterColumn.onFilter;
    const { container } = render(
      createTable({
        columns: [noFilterColumn],
      }),
    );

    expect(container.querySelectorAll('.ant-table-filter-column')).toHaveLength(0);
  });

  it('renders filter correctly', () => {
    const { asFragment } = render(createTable());

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  // async await 解决 Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('renders menu correctly', async () => {
    const { container } = render(createTable());
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    await waitFor(() =>
      expect(container.querySelector('.ant-table-filter-dropdown')).toMatchSnapshot(),
    );
  });

  it('renders empty menu correctly', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filters: [],
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);

    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('.ant-empty')).toBeTruthy();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('renders radio filter correctly', async () => {
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterMultiple: false,
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    await waitFor(() =>
      expect(container.querySelector('.ant-table-filter-dropdown')).toMatchSnapshot(),
    );
  });

  it('renders custom content correctly', async () => {
    const filter = <div className="custom-filter-dropdown">custom filter</div>;
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: filter,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    await waitFor(() =>
      expect(container.querySelector('.ant-table-filter-dropdown')).toMatchSnapshot(),
    );
  });

  it('override custom filter correctly', () => {
    let renderSelectedKeys = null;
    const filter = ({ prefixCls, setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      renderSelectedKeys = selectedKeys;

      return (
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
          <span
            onClick={() => {
              setSelectedKeys([43]);
              confirm();
            }}
            id="simulateOnSelect"
          >
            SimulateOnSelect
          </span>
        </div>
      );
    };

    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: filter,
          },
        ],
      }),
    );

    // check if renderer well
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'));
    expect(container.querySelector('#customFilter')).toMatchSnapshot();

    // try to use reset btn
    expect(renderSelectedKeys).toHaveLength(0);
    fireEvent.click(container.querySelector('#setSelectedKeys'));
    fireEvent.click(container.querySelector('#confirm'));
    expect(renderSelectedKeys).toEqual([42]);

    // Reset
    fireEvent.click(container.querySelector('#reset'));
    fireEvent.click(container.querySelector('#confirm'));
    expect(renderSelectedKeys).toHaveLength(0);

    // try to use confirm btn
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('#setSelectedKeys'));
    expect(container.querySelector('.ant-dropdown-open')).toBeTruthy();
    fireEvent.click(container.querySelector('#confirm'));
    expect(renderSelectedKeys).toEqual([42]);
    expect(container.querySelector('.ant-dropdown-open')).toBeFalsy();

    // Simulate onSelect, setSelectedKeys & confirm
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('#simulateOnSelect'));
    expect(renderSelectedKeys).toEqual([43]);
  });

  it('can be controlled by filterDropdownVisible', () => {
    const { container, rerender } = render(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
          },
        ],
      }),
    );

    expect(container.querySelector('.ant-dropdown-open')).toBeTruthy();

    rerender(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: false,
          },
        ],
      }),
    );

    expect(container.querySelector('.ant-dropdown-open')).toBeFalsy();
  });

  it('if the filter is visible it should ignore the selectedKeys changes', () => {
    const myColumn = {
      title: 'Name',
      dataIndex: 'name',
      filters: [{ text: 'J', value: 'J' }],
      onFilter: (value, record) => record.name.includes(value),
    };

    const tableProps = {
      columns: [
        {
          ...myColumn,
          filterDropdownVisible: true,
        },
      ],
    };

    const { container, rerender } = render(createTable(tableProps));

    const checkboxList = container
      .querySelector('.ant-table-filter-dropdown')
      .querySelectorAll('input[type="checkbox"]');
    expect(checkboxList.length).toBeTruthy();
    checkboxList.forEach(checkbox => {
      expect(checkbox.checkbox).toBeFalsy();
    });

    fireEvent.click(
      container.querySelector('.ant-table-filter-dropdown').querySelector('input[type="checkbox"]'),
    );
    fireEvent.click(
      container
        .querySelector('.ant-table-filter-dropdown')
        .querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'),
    );

    expect(container.querySelectorAll('tbody tr')).toHaveLength(2);

    rerender(
      createTable({
        ...tableProps,
        dataSource: [...data, { key: 999, name: 'Jason' }],
      }),
    );
    expect(container.querySelectorAll('tbody tr')).toHaveLength(3);
  });

  it('fires change event when visible change', () => {
    const handleChange = jest.fn();
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            onFilterDropdownVisibleChange: handleChange,
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('can be controlled by filteredValue', () => {
    const { container, rerender } = render(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy'],
          },
        ],
      }),
    );

    expect(container.querySelectorAll('tbody tr').length).toBe(1);

    rerender(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: [],
          },
        ],
      }),
    );

    expect(container.querySelectorAll('tbody tr').length).toBe(4);
  });

  it('should handle filteredValue and non-array filterValue as expected', () => {
    let filterKeys = new Set();

    const { rerender } = render(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy', 12, true],
            onFilter: value => {
              filterKeys.add(value);
              return false;
            },
          },
        ],
      }),
    );

    expect(Array.from(filterKeys)).toEqual(['Lucy', '12', 'true']);

    filterKeys = new Set();
    rerender(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: null,
            onFilter: value => {
              filterKeys.add(value);
              return true;
            },
          },
        ],
      }),
    );
    expect(Array.from(filterKeys)).toHaveLength(0);
  });

  it('can be controlled by filteredValue null', () => {
    const { container, rerender } = render(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy'],
          },
        ],
      }),
    );

    expect(container.querySelectorAll('tbody tr').length).toBe(1);

    rerender(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: null,
          },
        ],
      }),
    );

    expect(container.querySelectorAll('tbody tr').length).toBe(4);
  });

  // Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('render checked of checkbox correctly controlled by filteredValue', () => {
    ['Lucy', 23, false].forEach(val => {
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filters: [{ text: val, value: val }],
              filteredValue: [val],
            },
          ],
        }),
      );

      fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
      expect(
        container
          .querySelector('.ant-table-filter-dropdown')
          .querySelectorAll('.ant-checkbox-input')[0].checked,
      ).toEqual(true);
    });

    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filters: [{ text: 'ant', value: 'ant' }],
            filteredValue: ['any-value-not-exists-in-filters'],
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));

    expect(
      container
        .querySelector('.ant-table-filter-dropdown')
        .querySelectorAll('.ant-checkbox-input')[0].checked,
    ).toEqual(false);
  });

  it('can read defaults from defaultFilteredValue', () => {
    const { container, rerender } = render(
      createTable({
        columns: [
          {
            ...column,
            defaultFilteredValue: ['Lucy'],
          },
        ],
      }),
    );
    expect(container.querySelectorAll('tbody tr').length).toBe(1);
    expect(container.querySelector('tbody tr').textContent).toBe('Lucy');

    // Should properly ignore further defaultFilteredValue changes
    rerender(
      createTable({
        columns: [
          {
            ...column,
            defaultFilteredValue: [],
          },
        ],
      }),
    );

    expect(container.querySelectorAll('tbody tr').length).toBe(1);
    expect(container.querySelector('tbody tr').textContent).toBe('Lucy');

    // Should properly be overidden by non-null filteredValue
    rerender(
      createTable({
        columns: [
          {
            ...column,
            defaultFilteredValue: ['Lucy'],
            filteredValue: ['Tom'],
          },
        ],
      }),
    );
    expect(container.querySelectorAll('tbody tr').length).toBe(1);
    expect(container.querySelector('tbody tr').textContent).toBe('Tom');

    // Should properly be overidden by a null filteredValue
    rerender(
      createTable({
        columns: [
          {
            ...column,
            defaultFilteredValue: ['Lucy'],
            filteredValue: null,
          },
        ],
      }),
    );
    expect(container.querySelectorAll('tbody tr').length).toBe(4);
  });

  //  Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('fires change event', () => {
    const handleChange = jest.fn();
    const { container } = render(createTable({ onChange: handleChange }));
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(handleChange).toHaveBeenCalledWith(
      {},
      { name: ['boy'] },
      {},
      {
        currentDataSource: [],
        action: 'filter',
      },
    );
  });

  it('fires pagination change event', async () => {
    const onPaginationChange = jest.fn();
    const { container } = render(createTable({ pagination: { onChange: onPaginationChange } }));
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    await waitFor(() => expect(onPaginationChange).toHaveBeenCalledWith(1, 10));
  });

  it('should not fire change event when close filterDropdown without changing anything', async () => {
    const handleChange = jest.fn();
    const { container } = render(createTable({ onChange: handleChange }));

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    await waitFor(() => expect(handleChange).not.toHaveBeenCalled());
  });

  it('should not fire change event when close a filtered filterDropdown without changing anything', async () => {
    const handleChange = jest.fn();
    const { container } = render(
      createTable({
        onChange: handleChange,
        columns: [
          {
            ...column,
            defaultFilteredValue: ['boy', 'designer'],
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    await waitFor(() => expect(handleChange).not.toHaveBeenCalled());
  });

  it('three levels menu', async () => {
    const onChange = jest.fn();
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
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filters,
          },
        ],
        onChange,
      }),
    );

    expect(renderedNames(container)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);

    // Open
    fireEvent.click(container.querySelector('.ant-table-filter-trigger'));

    function getFilterMenu() {
      return container.querySelector('.ant-table-filter-dropdown');
    }

    // Seems raf not trigger when in useEffect for async update
    // Need trigger multiple times
    function refreshTimer() {
      for (let i = 0; i < 3; i += 1) {
        act(() => {
          jest.runAllTimers();
        });
      }
    }

    // Open Level2
    fireEvent.mouseEnter(
      getFilterMenu().querySelectorAll('div.ant-dropdown-menu-submenu-title')[0],
    );
    refreshTimer();

    // Open Level3
    fireEvent.mouseEnter(
      getFilterMenu().querySelectorAll('div.ant-dropdown-menu-submenu-title')[1],
    );
    refreshTimer();

    // Select Level3 value
    const items = getFilterMenu().querySelectorAll('li.ant-dropdown-menu-item');
    fireEvent.click(items[items.length - 1]);
    fireEvent.click(
      getFilterMenu().querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'),
    );
    refreshTimer();

    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(['Jack']);
    });

    expect(renderedNames(container)).toEqual(['Jack']);

    // What's this? Is that a coverage case? Or check a crash?
    const latestItems = getFilterMenu().querySelectorAll('li.ant-dropdown-menu-item');
    fireEvent.click(latestItems[latestItems.length - 1]);
  });

  describe('should support value types', () => {
    const filterKeys = new Set();
    [
      ['Light', 93],
      ['Bamboo', false],
    ].forEach(([text, value]) => {
      it(`${typeof value} type`, async () => {
        const onChange = jest.fn();
        const filters = [{ text, value }];
        const { container } = render(
          createTable({
            columns: [
              {
                ...column,
                filters,
                onFilter: val => {
                  expect(val).toBe(value);
                  filterKeys.add(val);
                  return false;
                },
              },
            ],
            onChange,
          }),
        );

        fireEvent.click(container.querySelector('.ant-dropdown-trigger'));

        fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);

        // This test can be remove if refactor
        fireEvent.click(
          container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'),
        );

        await waitFor(() =>
          expect(
            container
              .querySelector('.ant-table-filter-dropdown')
              .querySelectorAll('.ant-checkbox-input')[0].checked,
          ).toEqual(true),
        );

        expect(typeof Array.from(filterKeys)[0]).toEqual('number');

        expect(Array.from(filterKeys).length > 0).toBeTruthy();

        onChange.mock.calls.forEach(([, currentFilters]) => {
          const [, val] = Object.entries(currentFilters)[0];
          expect(val).toEqual([value]);
        });
        // Another time of Filter show
        // https://github.com/ant-design/ant-design/issues/15593

        fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);

        expect(
          container
            .querySelector('.ant-table-filter-dropdown')
            .querySelectorAll('.ant-checkbox-input')[0].checked,
        ).toEqual(false);
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
              filters={[
                { text: 'Jack', value: 'Jack' },
                { text: 'Lucy', value: 'Lucy' },
              ]}
              filteredValue={filters.name}
              onFilter={filterFn}
            />
          </Table>
        );
      }
    }

    const { container } = render(<App />);

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(container.querySelector('.ant-dropdown-open')).toBeTruthy();

    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(renderedNames(container)).toEqual(['Jack']);
    expect(container.querySelector('.ant-dropdown-open')).toBeFalsy();

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link'));

    expect(container.querySelector('.ant-dropdown-open')).toBeTruthy();
    expect(renderedNames(container)).toEqual(['Jack']);

    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(renderedNames(container)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
    expect(container.querySelector('.ant-dropdown-open')).toBeFalsy();
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
            filters: [
              { text: 'Jack', value: 'Jack' },
              { text: 'Lucy', value: 'Lucy' },
            ],
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
    const { container } = render(<Table columns={columns} dataSource={testData} />);

    expect(renderedNames(container)).toEqual(['Jack']);
  });

  // Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('confirm filter when dropdown hidden', () => {
    const handleChange = jest.fn();
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filters: [
              { text: 'Jack', value: 'Jack' },
              { text: 'Lucy', value: 'Lucy' },
            ],
          },
        ],
        onChange: handleChange,
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][3].currentDataSource.length).toBe(1);
  });

  it('renders custom filter icon correctly', () => {
    const filterIcon = filtered => (
      <span className="customize-icon">{filtered ? 'filtered' : 'unfiltered'}</span>
    );
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(container.querySelector('.customize-icon')).toMatchSnapshot();
  });

  it('renders custom filter icon as string correctly', () => {
    const filterIcon = () => 'string';
    const { asFragment } = render(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders custom filter icon with right Tooltip title', () => {
    const filterIcon = () => (
      <Tooltip title="title" visible>
        Tooltip
      </Tooltip>
    );
    const { asFragment } = render(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders custom filter icon as ReactNode', () => {
    const filterIcon = <span className="customize-icon" />;
    const { container, asFragment } = render(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(container.querySelector('span.customize-icon')).toBeTruthy();
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
              // eslint-disable-next-line react/no-unstable-nested-components
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

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.change(container.querySelector('.ant-input'), { target: { value: 'test' } });
    expect(container.querySelector('.ant-input').value).toBe('test');
    fireEvent.click(container.querySelector('.ant-btn'));
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(container.querySelector('.ant-input').value).toBe('');
  });

  // https://github.com/ant-design/ant-design/issues/17833
  it('should not trigger onChange when bluring custom filterDropdown', () => {
    const onChange = jest.fn();
    const filterDropdown = ({ setSelectedKeys }) => (
      <input onChange={e => setSelectedKeys([e.target.value])} />
    );
    const { container } = render(
      createTable({
        onChange,
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown,
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.change(container.querySelector('input'), { target: { value: 'whatevervalue' } });
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should trigger onChange with correct params if defines custom filterDropdown', () => {
    const onChange = jest.fn();
    const filterDropdown = ({ setSelectedKeys, confirm }) => (
      <div>
        <input onChange={e => setSelectedKeys([e.target.value])} />
        <button className="confirm-btn" type="submit" onClick={confirm}>
          Confirm
        </button>
      </div>
    );
    const { container } = render(
      createTable({
        onChange,
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.change(container.querySelector('input'), { target: { value: 'test' } });
    fireEvent.click(container.querySelector('.confirm-btn'));

    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(['test']);
    });
  });

  it('should work as expected with complex custom filterDropdown', () => {
    let renderSelectedKeys = null;
    const onChange = jest.fn();

    const filterDropdown = ({ setSelectedKeys, selectedKeys, confirm }) => {
      renderSelectedKeys = selectedKeys;
      const handleChange = selectedValues => {
        setSelectedKeys(selectedValues);
      };

      return (
        <div>
          <Select
            mode="multiple"
            allowClear
            labelInValue
            style={{ width: 200 }}
            value={selectedKeys}
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: 'Not Identified',
              },
              {
                value: 2,
                label: 'Closed',
              },
              {
                value: 3,
                label: 'Communicated',
              },
            ]}
          />
          <button className="confirm-btn" type="submit" onClick={confirm}>
            Confirm
          </button>
        </div>
      );
    };
    const filteredValue = [
      {
        value: 2,
        label: 'Closed',
      },
    ];
    const selectedValue = [
      {
        key: 2,
        value: 2,
        label: 'Closed',
      },
      {
        key: 1,
        value: 1,
        label: 'Not Identified',
      },
    ];
    const { container } = render(
      createTable({
        onChange,
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown,
            filteredValue,
          },
        ],
      }),
    );

    expect(renderSelectedKeys).toEqual(filteredValue);

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.mouseDown(container.querySelector('.ant-select-selector'));
    fireEvent.click(container.querySelector('.ant-select-item-option'));
    fireEvent.click(container.querySelector('.confirm-btn'));
    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(selectedValue);
    });
  });

  // https://github.com/ant-design/ant-design/issues/17089
  it('not crash when dynamic change filter', () => {
    const onChange = jest.fn();

    const Test = ({ filters }) => (
      <Table
        onChange={onChange}
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filters,
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );

    const { container, rerender } = render(
      <Test
        filters={[
          {
            text: 'Bill',
            value: 'Bill',
          },
        ]}
      />,
    );

    // Warning: An update to Item ran an effect, but was not wrapped in act(...).
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(onChange).toHaveBeenCalled();
    onChange.mockReset();
    expect(onChange).not.toHaveBeenCalled();
    rerender(
      <Test
        filters={[
          {
            text: 'Jim',
            value: 'Jim',
          },
        ]}
      />,
    );

    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(onChange).toHaveBeenCalled();
  });

  it('should support getPopupContainer', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);

    render(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
          },
        ],
        getPopupContainer,
      }),
    );
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('should support getPopupContainer from ConfigProvider', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);

    render(
      <ConfigProvider getPopupContainer={getPopupContainer}>
        {createTable({
          columns: [
            {
              ...column,
              filterDropdownVisible: true,
            },
          ],
        })}
      </ConfigProvider>,
    );
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('pass visible prop to filterDropdown', () => {
    const filterDropdownMock = jest.fn().mockReturnValue(<span>test</span>);
    const filterDropdown = (...args) => filterDropdownMock(...args);

    const Test = () => (
      <Table
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filterDropdown,
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );

    render(<Test />);
    expect(filterDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: false,
      }),
    );
  });

  it('visible prop of filterDropdown changes on click', () => {
    const filterDropdownMock = jest.fn().mockReturnValue(<span>test</span>);
    const filterDropdown = (...args) => filterDropdownMock(...args);

    const Test = () => (
      <Table
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filterDropdown,
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );

    const { container } = render(<Test />);

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(filterDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: true,
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(filterDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: false,
      }),
    );
  });

  it('should reset pagination after filter', () => {
    const handleChange = jest.fn();
    const { container } = render(
      createTable({
        onChange: handleChange,
        dataSource: longData,
        pagination: true,
      }),
    );
    // Warning: An update to Item ran an effect, but was not wrapped in act(...).
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));

    expect(handleChange).toHaveBeenCalledWith(
      {
        current: 1,
        pageSize: 10,
      },
      { name: ['boy'] },
      {},
      {
        currentDataSource: [],
        action: 'filter',
      },
    );
    expect(container.querySelectorAll('.ant-pagination-item')).toHaveLength(0);
  });

  it('should keep pagination current after filter', () => {
    const handleChange = jest.fn();
    const { container } = render(
      createTable({
        onChange: handleChange,
        dataSource: longData,
        pagination: {
          current: 3,
        },
      }),
    );

    expect(container.querySelector('.ant-pagination-item-active').textContent).toBe('3');
    // Warning: An update to Item ran an effect, but was not wrapped in act(...).
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));

    expect(handleChange).toHaveBeenCalledWith(
      {
        current: 1,
        pageSize: 10,
      },
      { name: ['boy'] },
      {},
      {
        currentDataSource: [],
        action: 'filter',
      },
    );
  });

  // https://github.com/ant-design/ant-design/issues/19274
  it('should not crash', () => {
    class TestTable extends React.Component {
      state = {
        cols: [],
      };

      componentDidMount() {
        this.setState({
          cols: [
            {
              title: 'test',
              itemKey: 'test',
              filterDropdown: 123,
            },
          ],
        });
      }

      render() {
        const { cols } = this.state;
        return <Table columns={cols} dataSource={[]} scroll={{ x: 1000 }} />;
      }
    }

    render(<TestTable />);
  });

  // https://github.com/ant-design/ant-design/issues/20854
  it('Not cache for onChange state', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
              { text: 'Male', value: 'male' },
              { text: 'Female', value: 'female' },
            ],
          },
        ]}
        dataSource={[]}
        onChange={onChange}
      />,
    );

    // Sort it
    fireEvent.click(container.querySelector('.ant-table-column-sorters'), nativeEvent);
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      {
        gender: null,
      },
      expect.objectContaining({
        column: {
          dataIndex: 'name',
          sorter: true,
          title: 'Name',
        },
      }),
      {
        currentDataSource: expect.anything(),
        action: 'sort',
      },
    );

    // Filter it
    onChange.mockReset();
    // Warning: An update to Item ran an effect, but was not wrapped in act(...).
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'), nativeEvent);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      {
        gender: ['male'],
      },
      expect.objectContaining({
        column: {
          dataIndex: 'name',
          sorter: true,
          title: 'Name',
        },
      }),
      {
        currentDataSource: expect.anything(),
        action: 'filter',
      },
    );
  });

  it('locale should work', () => {
    const { container } = render(
      createTable({
        locale: { filterConfirm: 'Bamboo' },
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
            filterSearch: true,
            filterMode: 'tree',
          },
        ],
      }),
    );

    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary').textContent,
    ).toEqual('Bamboo');
    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link').textContent,
    ).toEqual('Reset');
    expect(container.querySelector('.ant-table-filter-dropdown-checkall').textContent).toEqual(
      'Select all items',
    );
    expect(container.querySelector('.ant-input').getAttribute('placeholder')).toEqual(
      'Search in filters',
    );
  });

  it('filtered should work', () => {
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filtered: true,
          },
        ],
      }),
    );

    expect(
      container.querySelector('.ant-table-filter-trigger').className.includes('active'),
    ).toBeTruthy();
  });

  it('filteredValue with empty array should not active the filtered icon', () => {
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: [],
          },
        ],
      }),
    );

    expect(
      container.querySelector('.ant-table-filter-trigger').className.includes('active'),
    ).toBeFalsy();
  });

  it('with onFilter', () => {
    const onFilter = jest.fn((value, record) => record.key === value);
    const columns = [{ dataIndex: 'key', filteredValue: [5], onFilter }];
    const testData = [{ key: 1 }, { key: 3 }, { key: 5 }];
    const { container } = render(<Table columns={columns} dataSource={testData} />);

    expect(onFilter).toHaveBeenCalled();
    expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
  });

  it('jsx work', () => {
    const { container } = render(
      <Table dataSource={data}>
        <Table.Column
          title="Name"
          dataIndex="name"
          filters={[
            { text: 'Jack', value: 'Jack' },
            { text: 'Lucy', value: 'Lucy' },
          ]}
          onFilter={(value, record) => record.name.includes(value)}
          defaultFilteredValue={['Jack']}
        />
      </Table>,
    );

    expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(container.querySelector('tbody tr td').textContent).toEqual('Jack');
  });

  it(`shouldn't keep status when controlled filteredValue isn't change`, () => {
    const filterControlledColumn = {
      title: 'Name',
      dataIndex: 'name',
      filteredValue: null,
      filters: [
        { text: 'Boy', value: 'boy' },
        { text: 'Girl', value: 'girl' },
      ],
      onFilter: filterFn,
    };
    const { container } = render(createTable({ columns: [filterControlledColumn] }));
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')); // close drodown
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')); // reopen
    const checkbox = container
      .querySelector('.ant-dropdown-menu-item')
      .querySelector('input[type=checkbox]');
    expect(checkbox.checked).toEqual(false);
  });

  it('should not trigger onChange when filters is empty', () => {
    const onChange = jest.fn();
    const Test = ({ filters }) => (
      <Table
        onChange={onChange}
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filters,
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );
    const { container, unmount } = render(<Test filters={[]} />);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(onChange).not.toHaveBeenCalled();
    onChange.mockReset();
    unmount();
  });

  it('filters in children should render', () => {
    const columns = [
      {
        title: 'English Score',
        dataIndex: 'english',
        filters: [{ text: '1', value: 1 }],
        onFilter: record => String(record.english1).includes(String(1)),
        children: [
          {
            title: 'English Score1',
            dataIndex: 'english1',
            filters: [{ text: '2', value: 2 }],
            onFilter: record => String(record.english2).includes(String(2)),
          },
          {
            title: 'English Score2',
            dataIndex: 'english2',
            filters: [{ text: '2', value: 3 }],
            onFilter: record => String(record.english2).includes(String(3)),
          },
        ],
      },
    ];
    const dataSource = [
      {
        key: '1',
        english: 71,
        english1: 71,
        english2: 72,
      },
      {
        key: '2',
        english: 89,
        english1: 72,
        english2: 72,
      },
      {
        key: '3',
        english: 70,
        english1: 71,
        english2: 73,
      },
      {
        key: '4',
        english: 89,
        english1: 71,
        english2: 72,
      },
    ];
    const { container } = render(
      createTable({
        columns,
        dataSource,
      }),
    );

    expect(container.querySelectorAll('.ant-table-filter-column')).toHaveLength(3);
  });

  //  Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('should pagination.current be 1 after filtering', () => {
    const onChange = jest.fn();
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Joe',
            value: 'Joe',
          },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
    ];
    const dataSource = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];

    const { container } = render(
      <Table onChange={onChange} rowKey="name" columns={columns} dataSource={dataSource} />,
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));

    expect(onChange.mock.calls[0][0].current).toBe(1);

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[1]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(onChange.mock.calls[1][0].current).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/30454
  it('should not trigger onFilterDropdownVisibleChange when call confirm({ closeDropdown: false })', () => {
    const onFilterDropdownVisibleChange = jest.fn();
    const { container } = render(
      createTable({
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: name,
            filterDropdown: ({ confirm }) => (
              <>
                <button id="confirm-and-close" type="button" onClick={() => confirm()}>
                  confirm
                </button>
                <button
                  id="confirm-only"
                  type="button"
                  onClick={() => confirm({ closeDropdown: false })}
                >
                  confirm
                </button>
              </>
            ),
            onFilterDropdownVisibleChange,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('.ant-dropdown-trigger'));
    expect(onFilterDropdownVisibleChange).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('#confirm-only'));
    expect(onFilterDropdownVisibleChange).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('#confirm-and-close'));
    expect(onFilterDropdownVisibleChange).toHaveBeenCalledTimes(2);
    expect(onFilterDropdownVisibleChange).toHaveBeenLastCalledWith(false);
  });

  // Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('Column with filter and children filters properly.', () => {
    class App extends React.Component {
      state = {
        filteredInfo: null,
        sortedInfo: null,
      };

      handleChange = (pagination, filters, sorter) => {
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };

      render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
              { text: 'Joe', value: 'Joe' },
              { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            children: [
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
              },
            ],
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            ellipsis: true,
          },
        ];
        return (
          <Table
            columns={columns}
            dataSource={[
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
              },
              {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
              },
              {
                key: '3',
                name: 'Joe Black',
                age: 66,
                address: 'Sidney No. 1 Lake Park',
              },
              {
                key: '4',
                name: 'Jim Red',
                age: 32,
                address: 'London No. 2 Lake Park',
              },
            ]}
            onChange={this.handleChange}
          />
        );
      }
    }

    const { container } = render(<App />);

    expect(container.querySelector('.ant-table-tbody .ant-table-cell').textContent).toEqual(
      `${32}`,
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger.ant-table-filter-trigger'));
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));
    fireEvent.click(container.querySelector('.ant-btn.ant-btn-primary.ant-btn-sm'));
    expect(container.querySelector('.ant-table-tbody .ant-table-cell').textContent).toEqual(
      `${66}`,
    );
  });

  describe('filter tree mode', () => {
    it('supports filter tree', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-tree').length).toBe(1);
      expect(container.querySelectorAll('.ant-tree-checkbox').length).toBe(5);
    });

    it('supports search input in filter tree', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filterSearch: true,
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-tree').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      fireEvent.change(container.querySelector('.ant-input'), { target: { value: '111' } });
    });

    it('supports search input in filter menu', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filterSearch: true,
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-search').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      fireEvent.change(container.querySelector('.ant-input'), { target: { value: '111' } });
    });

    it('should skip search when filters[0].text is ReactNode', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filters: [
                {
                  text: '123',
                  value: '456',
                },
                {
                  text: 123456,
                  value: '456',
                },
                {
                  text: <span>123</span>,
                  value: '456',
                },
              ],
              filterSearch: true,
            },
          ],
        }),
      );

      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-search').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(3);
      fireEvent.change(container.querySelector('.ant-input'), { target: { value: '123' } });
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(2);
    });

    it('should supports filterSearch has type of function', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filters: [
                {
                  text: '123',
                  value: '123',
                },
                {
                  text: 123456,
                  value: '456',
                },
                {
                  text: <span>123</span>,
                  value: '456',
                },
              ],
              filterSearch: (input, record) => record.value.indexOf(input) > -1,
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-search').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(3);
      fireEvent.change(container.querySelector('.ant-input'), { target: { value: '456' } });
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(2);
    });

    it('supports check all items', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filterSearch: true,
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-checkall').length).toBe(1);
      expect(container.querySelector('.ant-table-filter-dropdown-checkall').textContent).toBe(
        'Select all items',
      );
      expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);

      // fireEvent.change(container.querySelector('.ant-table-filter-dropdown-checkall input'), { target: { checked: true } });
      // 为什么 fireEvent.change 模拟 checkbox 触发会失败
      fireEvent.click(container.querySelector('.ant-table-filter-dropdown-checkall'));
      expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(5);

      fireEvent.click(container.querySelector('.ant-table-filter-dropdown-checkall'));
      expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);
    });

    it('supports check item by selecting it', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filterSearch: true,
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-checkall').length).toBe(1);
      expect(container.querySelector('.ant-table-filter-dropdown-checkall').textContent).toBe(
        'Select all items',
      );
      fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper'));

      expect(
        container
          .querySelector('.ant-tree-checkbox')
          .className.includes('ant-tree-checkbox-checked'),
      ).toBe(true);
      expect(
        container
          .querySelector('.ant-table-filter-dropdown-checkall .ant-checkbox')
          .className.includes('ant-checkbox-indeterminate'),
      ).toBe(true);
    });

    it('select-all checkbox should change when all items are selected', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filters: [
                { text: 'Boy', value: 'boy' },
                { text: 'Girl', value: 'girl' },
              ],
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[0]);
      fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[1]);

      expect(
        container
          .querySelector('.ant-table-filter-dropdown-checkall .ant-checkbox')
          .className.includes('ant-checkbox-checked'),
      ).toBe(true);
    });
  });

  it('filterMultiple is false - check item', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterMode: 'tree',
            filterMultiple: false,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-tree-checkbox').length).toBe(5);
    expect(container.querySelector('.ant-table-filter-dropdown-checkall')).toBe(null);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);

    fireEvent.click(container.querySelectorAll('.ant-tree-checkbox')[2]);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[2]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(true);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);

    fireEvent.click(container.querySelectorAll('.ant-tree-checkbox')[1]);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[1]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(true);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);

    fireEvent.click(container.querySelectorAll('.ant-tree-checkbox')[1]);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[1]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(false);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);
  });

  it('filterMultiple is false - select item', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterMode: 'tree',
            filterMultiple: false,
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelectorAll('.ant-tree-checkbox').length).toBe(5);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[2]);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[2]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(true);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[1]);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[1]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(true);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[1]);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[1]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(false);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);
  });

  it('should select children when select parent', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filters: [
              { text: 'Boy', value: 'boy' },
              { text: 'Girl', value: 'girl' },
              {
                text: 'Title',
                value: 'title',
                children: [
                  { text: 'Jack', value: 'Jack' },
                  { text: 'Coder', value: 'coder' },
                ],
              },
            ],
            filterMode: 'tree',
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    act(() => {
      jest.runAllTimers();
    });
    // check parentnode

    fireEvent.click(container.querySelectorAll('.ant-tree-checkbox')[2]);

    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[2]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(true);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[3]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(true);
    expect(
      container
        .querySelectorAll('.ant-tree-checkbox')[4]
        .className.includes('ant-tree-checkbox-checked'),
    ).toBe(true);

    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(renderedNames(container)).toEqual(['Jack']);

    fireEvent.click(container.querySelectorAll('.ant-tree-checkbox')[2]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(renderedNames(container)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[2]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary'));
    expect(renderedNames(container)).toEqual(['Jack']);
  });

  it('clearFilters should support params', () => {
    const filterConfig = [
      ['Jack', 'NoParams', {}, ['Jack'], true],
      ['Lucy', 'Confirm', { confirm: true }, ['Jack', 'Lucy', 'Tom', 'Jerry'], true],
      ['Tom', 'Close', { closeDropdown: true }, ['Tom'], false],
      [
        'Jerry',
        'Params',
        { closeDropdown: true, confirm: true },
        ['Jack', 'Lucy', 'Tom', 'Jerry'],
        false,
      ],
    ];

    let renderSelectedKeys;
    const filter = ({ prefixCls, setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      renderSelectedKeys = selectedKeys;

      return (
        <div className={`${prefixCls}-view`} id="customFilter">
          {filterConfig.map(([text, id, param]) => (
            <>
              <span
                onClick={() => {
                  setSelectedKeys([text]);
                  confirm();
                }}
                id={`set${id}`}
              >
                setSelectedKeys
              </span>
              <span onClick={() => clearFilters(param)} id={`reset${id}`}>
                Reset
              </span>
            </>
          ))}
        </div>
      );
    };

    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: filter,
          },
        ],
      }),
    );

    // check if renderer well
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'));
    expect(container.querySelector('#customFilter')).toMatchSnapshot();
    expect(renderSelectedKeys).toHaveLength(0);

    filterConfig.forEach(([text, id, , matchNames, visible]) => {
      fireEvent.click(container.querySelector(`#set${id}`));
      expect(renderedNames(container)).toEqual([text]);

      fireEvent.click(container.querySelector('span.ant-dropdown-trigger'));
      fireEvent.click(container.querySelector(`#reset${id}`));
      expect(renderedNames(container)).toEqual(matchNames);

      expect(container.querySelector('.ant-dropdown-open'))[visible ? 'toBeTruthy' : 'toBeFalsy']();
    });
  });

  it('filterDropdown should support filterResetToDefaultFilteredValue', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const columnFilter = {
      ...column,
      filterMode: 'tree',
      filterSearch: true,
      defaultFilteredValue: ['girl'],
    };

    const { container, rerender } = render(
      createTable({
        columns: [columnFilter],
      }),
    );
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);

    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-checkall'));
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(5);
    fireEvent.click(container.querySelector('button.ant-btn-link'), nativeEvent);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);

    rerender(
      createTable({
        columns: [
          {
            ...columnFilter,
            filterResetToDefaultFilteredValue: true,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'), nativeEvent);
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-checkall'));
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(5);
    fireEvent.click(container.querySelector('button.ant-btn-link'), nativeEvent);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);
    expect(container.querySelector('.ant-tree-checkbox-checked+span').textContent).toBe('Girl');
  });

  it('filterDropdown should not override customize Menu selectable', () => {
    const onSelect = jest.fn();

    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: (
              <div className="custom-filter-dropdown">
                <Menu
                  onSelect={onSelect}
                  items={[
                    {
                      key: '1',
                      label: 'Item 1',
                    },
                  ]}
                />
              </div>
            ),
          },
        ],
      }),
    );

    // Open Filter
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'));
    act(() => {
      jest.runAllTimers();
    });

    // Click Item
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown .ant-dropdown-menu-item'));

    expect(onSelect).toHaveBeenCalled();
  });

  it('filteredKeys should all be controlled or not controlled', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    errorSpy.mockReset();
    const tableData = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
      },
    ];
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        filters: [],
      },
      {
        title: 'age',
        dataIndex: 'age',
        key: 'age',
        filters: [],
      },
    ];
    render(
      createTable({
        columns,
        data: tableData,
      }),
    );
    expect(errorSpy).not.toBeCalled();
    errorSpy.mockReset();
    columns[0].filteredValue = [];
    render(
      createTable({
        columns,
        data: tableData,
      }),
    );
    expect(errorSpy).toBeCalledWith(
      'Warning: [antd: Table] Columns should all contain `filteredValue` or not contain `filteredValue`.',
    );
    errorSpy.mockReset();
    columns[1].filteredValue = [];
    render(
      createTable({
        columns,
        data: tableData,
      }),
    );
    expect(errorSpy).not.toBeCalled();
  });

  // Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('can reset if filterResetToDefaultFilteredValue and filter is changing', () => {
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            filters: [
              { text: 'Jack', value: 'Jack' },
              { text: 'Lucy', value: 'Lucy' },
            ],
            defaultFilteredValue: ['Jack'],
            filterResetToDefaultFilteredValue: true,
          },
        ],
      }),
    );
    expect(container.querySelectorAll('tbody tr').length).toBe(1);
    expect(container.querySelector('tbody tr').textContent).toBe('Jack');

    // open filter

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger'));
    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link').disabled,
    ).toBeTruthy();
    expect(container.querySelectorAll('li.ant-dropdown-menu-item')[0].textContent).toBe('Jack');
    expect(container.querySelectorAll('li.ant-dropdown-menu-item')[1].textContent).toBe('Lucy');

    // deselect default
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[0]);
    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link').disabled,
    ).toBeFalsy();
    // select other one
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[1]);
    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link').disabled,
    ).toBeFalsy();
    // deselect other one
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[1]);
    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link').disabled,
    ).toBeFalsy();
    // select default
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[0]);
    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link').disabled,
    ).toBeTruthy();
  });
});
