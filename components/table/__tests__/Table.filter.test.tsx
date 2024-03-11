/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';

import type { ColumnGroupType, ColumnType, TableProps } from '..';
import Table from '..';
import { resetWarned } from '../../_util/warning';
import { act, fireEvent, render, waitFor } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';
import Input from '../../input';
import Menu from '../../menu';
import type { SelectProps } from '../../select';
import Select from '../../select';
import Tooltip from '../../tooltip';
import type { TreeColumnFilterItem } from '../hooks/useFilter/FilterDropdown';
import type {
  ColumnFilterItem,
  ColumnsType,
  FilterDropdownProps,
  FilterValue,
  SorterResult,
} from '../interface';

// https://github.com/Semantic-Org/Semantic-UI-React/blob/72c45080e4f20b531fda2e3e430e384083d6766b/test/specs/modules/Dropdown/Dropdown-test.js#L73
const nativeEvent = { nativeEvent: { stopImmediatePropagation: () => {} } };

describe('Table.filter', () => {
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = window.clearTimeout;

  const filterFn = (value: any, record: any) => record.name.includes(value);
  const column: ColumnGroupType<any> | ColumnType<any> = {
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

  const longData: Record<'key' | 'name', string>[] = [];
  for (let i = 0; i < 100; i += 1) {
    longData.push({ key: i.toString(), name: 'name' });
  }

  function createTable(props?: TableProps<any>) {
    return <Table columns={[column]} dataSource={data} pagination={false} {...props} />;
  }

  function renderedNames(container: ReturnType<typeof render>['container']) {
    const namesList: (Node['textContent'] | undefined)[] = [];
    container
      ?.querySelector('.ant-table-tbody')
      ?.querySelectorAll('tr')
      ?.forEach((tr) => {
        namesList.push(tr.querySelector('td')?.textContent);
      });
    return namesList;
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

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
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
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
    await waitFor(() =>
      expect(container.querySelector('.ant-table-filter-dropdown')).toMatchSnapshot(),
    );
  });

  it('renders empty menu correctly', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);

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
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
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

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
    await waitFor(() =>
      expect(container.querySelector('.ant-table-filter-dropdown')).toMatchSnapshot(),
    );
  });

  it('override custom filter correctly', () => {
    let renderSelectedKeys: React.Key[] | null = null;
    const filter = ({
      prefixCls,
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps): React.ReactNode => {
      renderSelectedKeys = selectedKeys;

      return (
        <div className={`${prefixCls}-view`} id="customFilter">
          <span onClick={() => setSelectedKeys([42])} id="setSelectedKeys">
            setSelectedKeys
          </span>
          <span onClick={() => confirm?.()} id="confirm">
            Confirm
          </span>
          <span onClick={() => clearFilters?.()} id="reset">
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
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!);
    expect(container.querySelector('#customFilter')).toMatchSnapshot();

    // try to use reset btn
    expect(renderSelectedKeys).toHaveLength(0);
    fireEvent.click(container.querySelector('#setSelectedKeys')!);
    fireEvent.click(container.querySelector('#confirm')!);
    expect(renderSelectedKeys).toEqual([42]);

    // Reset
    fireEvent.click(container.querySelector('#reset')!);
    fireEvent.click(container.querySelector('#confirm')!);
    expect(renderSelectedKeys).toHaveLength(0);

    // try to use confirm btn
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('#setSelectedKeys')!);
    expect(container.querySelector('.ant-dropdown-open')).toBeTruthy();
    fireEvent.click(container.querySelector('#confirm')!);
    expect(renderSelectedKeys).toEqual([42]);
    expect(container.querySelector('.ant-dropdown-open')).toBeFalsy();

    // Simulate onSelect, setSelectedKeys & confirm
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('#simulateOnSelect')!);
    expect(renderSelectedKeys).toEqual([43]);
  });

  describe('filterDropdownOpen & filterDropdownVisible', () => {
    function test(propName: string) {
      it(`can be controlled by ${propName}`, () => {
        const { container, rerender } = render(
          createTable({
            columns: [
              {
                ...column,
                filterDropdownOpen: true,
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
                filterDropdownOpen: false,
              },
            ],
          }),
        );

        expect(container.querySelector('.ant-dropdown-open')).toBeFalsy();
      });
    }

    test('filterDropdownOpen');
    test('filterDropdownVisible');
  });

  it('if the filter is visible it should ignore the selectedKeys changes', () => {
    const myColumn = {
      title: 'Name',
      dataIndex: 'name',
      filters: [{ text: 'J', value: 'J' }],
      onFilter: (value: any, record: any) => record.name.includes(value),
    };

    const tableProps = {
      columns: [
        {
          ...myColumn,
          filterDropdownOpen: true,
        },
      ],
    };

    const { container, rerender } = render(createTable(tableProps));

    const checkboxList = container
      ?.querySelector('.ant-table-filter-dropdown')
      ?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    expect(checkboxList?.length).toBeTruthy();
    checkboxList?.forEach((checkbox) => {
      expect((checkbox as any)?.checkbox).toBeFalsy();
    });

    fireEvent.click(
      container
        .querySelector('.ant-table-filter-dropdown')
        ?.querySelector('input[type="checkbox"]')!,
    );
    fireEvent.click(
      container
        ?.querySelector('.ant-table-filter-dropdown')
        ?.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!,
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
    resetWarned();
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const onFilterDropdownOpenChange = jest.fn();
    const onFilterDropdownVisibleChange = jest.fn();
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            onFilterDropdownOpenChange,
            onFilterDropdownVisibleChange,
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(onFilterDropdownOpenChange).toHaveBeenCalledWith(true);
    expect(onFilterDropdownVisibleChange).toHaveBeenCalledWith(true);

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] `onFilterDropdownVisibleChange` is deprecated. Please use `onFilterDropdownOpenChange` instead.',
    );

    errSpy.mockRestore();
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
            onFilter: (value) => {
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
            onFilter: (value) => {
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
    ['Lucy', 23, false].forEach((val) => {
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

      fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
      expect(
        container
          ?.querySelector('.ant-table-filter-dropdown')
          ?.querySelectorAll<HTMLInputElement>('.ant-checkbox-input')[0].checked,
      ).toBe(true);
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);

    expect(
      container
        ?.querySelector('.ant-table-filter-dropdown')
        ?.querySelectorAll<HTMLInputElement>('.ant-checkbox-input')[0]?.checked,
    ).toBe(false);
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
    expect(container.querySelector('tbody tr')?.textContent).toBe('Lucy');

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
    expect(container.querySelector('tbody tr')?.textContent).toBe('Lucy');

    // Should properly be overridden by non-null filteredValue
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
    expect(container.querySelector('tbody tr')?.textContent).toBe('Tom');

    // Should properly be overridden by a null filteredValue
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

  it('can filter children by defaultFilteredValue', () => {
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            defaultFilteredValue: ['Jim', 'Tom'],
            onFilter: (value: string, record) => {
              if (record.children && record.children.length) {
                return true;
              }
              return record.name.includes(value);
            },
          },
        ],
        dataSource: [
          {
            key: '0',
            name: 'Jack',
            children: [
              { key: '0-1', name: 'Jim' },
              { key: '0-2', name: 'Tony' },
            ],
          },
          { key: '1', name: 'Lucy' },
          { key: '2', name: 'Tom' },
          { key: '3', name: 'Jerry' },
        ],
        expandable: {
          defaultExpandAllRows: true,
        },
      }),
    );

    expect([...container.querySelectorAll('tbody tr')].map((item) => item.textContent)).toEqual([
      'Jack',
      'Jim',
      'Tom',
    ]);
  });

  //  Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('fires change event', () => {
    const handleChange = jest.fn();
    const { container } = render(createTable({ onChange: handleChange }));
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    await waitFor(() => expect(onPaginationChange).toHaveBeenCalledWith(1, 10));
  });

  it('should not fire change event when close filterDropdown without changing anything', async () => {
    const handleChange = jest.fn();
    const { container } = render(createTable({ onChange: handleChange }));

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    await waitFor(() => expect(handleChange).not.toHaveBeenCalled());
  });

  it('three levels menu', () => {
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
    const { container } = render(createTable({ columns: [{ ...column, filters }], onChange }));

    expect(renderedNames(container)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);

    // Open
    fireEvent.click(container.querySelector('.ant-table-filter-trigger')!);

    function getFilterMenu() {
      return container.querySelector('.ant-table-filter-dropdown');
    }

    // Open Level2
    fireEvent.mouseEnter(
      getFilterMenu()?.querySelectorAll('div.ant-dropdown-menu-submenu-title')[0]!,
    );
    refreshTimer();

    // Open Level3
    fireEvent.mouseEnter(
      getFilterMenu()?.querySelectorAll('div.ant-dropdown-menu-submenu-title')[1]!,
    );
    refreshTimer();

    // Select Level3 value
    const items = getFilterMenu()?.querySelectorAll('li.ant-dropdown-menu-item');
    fireEvent.click(items?.[items.length - 1]!);
    fireEvent.click(
      getFilterMenu()?.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!,
    );
    refreshTimer();

    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(['Jack']);
    });

    expect(renderedNames(container)).toEqual(['Jack']);

    // What's this? Is that a coverage case? Or check a crash?
    const latestItems = getFilterMenu()?.querySelectorAll('li.ant-dropdown-menu-item');
    fireEvent.click(latestItems?.[latestItems?.length - 1]!);
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
                onFilter: (val) => {
                  expect(val).toBe(value);
                  filterKeys.add(val);
                  return false;
                },
              },
            ],
            onChange,
          }),
        );

        fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);

        fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);

        // This test can be remove if refactor
        fireEvent.click(
          container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!,
        );

        await waitFor(() =>
          expect(
            container
              ?.querySelector('.ant-table-filter-dropdown')
              ?.querySelectorAll<HTMLInputElement>('.ant-checkbox-input')[0].checked,
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
        fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);

        fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);

        expect(
          container
            ?.querySelector('.ant-table-filter-dropdown')
            ?.querySelectorAll<HTMLInputElement>('.ant-checkbox-input')[0].checked,
        ).toBe(false);
      });
    });
  });

  it('works with JSX in controlled mode', () => {
    const { Column } = Table;
    const App: React.FC = () => {
      const [filters, setFilters] = React.useState<{ name?: ColumnType<any>['filteredValue'] }>({});
      const handleChange: TableProps<any>['onChange'] = (_, filter) => {
        setFilters(filter);
      };
      return (
        <Table dataSource={data} onChange={handleChange}>
          <Column
            title="name"
            dataIndex="name"
            key="name"
            onFilter={filterFn}
            filteredValue={filters.name}
            filters={[
              { text: 'Jack', value: 'Jack' },
              { text: 'Lucy', value: 'Lucy' },
            ]}
          />
        </Table>
      );
    };

    const { container } = render(<App />);

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(container.querySelector('.ant-dropdown-open')).toBeTruthy();

    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    expect(renderedNames(container)).toEqual(['Jack']);
    expect(container.querySelector('.ant-dropdown-open')).toBeFalsy();

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link')!);

    expect(container.querySelector('.ant-dropdown-open')).toBeTruthy();
    expect(renderedNames(container)).toEqual(['Jack']);

    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][3].currentDataSource.length).toBe(1);
  });

  it('renders custom filter icon correctly', () => {
    const filterIcon = (filtered: boolean): React.ReactNode => (
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
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
      <Tooltip title="title" open>
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
    const Demo: React.FC = () => {
      const [name, setName] = React.useState<ColumnType<any>['filteredValue']>();
      const onChange = () => {
        setName('' as unknown as ColumnType<any>['filteredValue']);
      };
      return createTable({
        onChange,
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
                  onChange={(e) => {
                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                  }}
                />
                <Button onClick={() => confirm()}>Confirm</Button>
              </div>
            ),
          },
        ],
      });
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.change(container.querySelector('.ant-input')!, { target: { value: 'test' } });
    expect(container.querySelector<HTMLInputElement>('.ant-input')?.value).toBe('test');
    fireEvent.click(container.querySelector('.ant-btn')!);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(container.querySelector<HTMLInputElement>('.ant-input')?.value).toBe('');
  });

  // https://github.com/ant-design/ant-design/issues/17833
  it('should not trigger onChange when blurring custom filterDropdown', () => {
    const onChange = jest.fn();
    const filterDropdown = ({ setSelectedKeys }: FilterDropdownProps) => (
      <input onChange={(e) => setSelectedKeys([e.target.value])} />
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.change(container.querySelector('input')!, { target: { value: 'whatevervalue' } });
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should trigger onChange with correct params if defines custom filterDropdown', () => {
    const onChange = jest.fn();
    const filterDropdown = ({ setSelectedKeys, confirm }: FilterDropdownProps) => (
      <div>
        <input onChange={(e) => setSelectedKeys([e.target.value])} />
        <button className="confirm-btn" type="submit" onClick={() => confirm()}>
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

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.change(container.querySelector('input')!, { target: { value: 'test' } });
    fireEvent.click(container.querySelector('.confirm-btn')!);

    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(['test']);
    });
  });

  it('should work as expected with complex custom filterDropdown', () => {
    let renderSelectedKeys = null;
    const onChange = jest.fn();

    const filterDropdown = ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
      renderSelectedKeys = selectedKeys;
      const handleChange: SelectProps['onChange'] = (selectedValues) => {
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
          <button className="confirm-btn" type="submit" onClick={() => confirm()}>
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
    ] as unknown as ColumnType<any>['filteredValue'];
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

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    fireEvent.click(container.querySelector('.ant-select-item-option')!);
    fireEvent.click(container.querySelector('.confirm-btn')!);
    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(selectedValue);
    });
  });

  // https://github.com/ant-design/ant-design/issues/17089
  it('not crash when dynamic change filter', () => {
    const onChange = jest.fn();

    const Test: React.FC<{ filters?: ColumnFilterItem[] }> = ({ filters }) => (
      <Table
        onChange={onChange}
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filters,
            onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
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

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    expect(onChange).toHaveBeenCalled();
  });

  it('should support getPopupContainer', () => {
    const getPopupContainer = jest.fn((node) => node.parentNode);

    render(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownOpen: true,
          },
        ],
        getPopupContainer,
      }),
    );
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('should support getPopupContainer from ConfigProvider', () => {
    const getPopupContainer = jest.fn((node) => node.parentNode);

    render(
      <ConfigProvider getPopupContainer={getPopupContainer}>
        {createTable({
          columns: [
            {
              ...column,
              filterDropdownOpen: true,
            },
          ],
        })}
      </ConfigProvider>,
    );
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('pass visible prop to filterDropdown', () => {
    const filterDropdownMock = jest.fn().mockReturnValue(<span>test</span>);
    const filterDropdown = (...args: any[]) => filterDropdownMock(...args);

    const Test = () => (
      <Table
        rowKey="name"
        columns={[{ title: 'Name', dataIndex: 'name', filterDropdown }]}
        dataSource={[{ name: 'Jack' }]}
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
    const filterDropdown = (...args: any[]) => filterDropdownMock(...args);

    const Test: React.FC = () => (
      <Table
        rowKey="name"
        columns={[{ title: 'Name', dataIndex: 'name', filterDropdown }]}
        dataSource={[{ name: 'Jack' }]}
      />
    );

    const { container } = render(<Test />);

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(filterDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: true,
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
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
        pagination: true as TableProps<any>['pagination'],
      }),
    );
    // Warning: An update to Item ran an effect, but was not wrapped in act(...).
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

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

    expect(container.querySelector('.ant-pagination-item-active')?.textContent).toBe('3');
    // Warning: An update to Item ran an effect, but was not wrapped in act(...).
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

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
    const TestTable: React.FC = () => {
      const [cols, setCols] = React.useState<ColumnsType<any>>([]);
      useEffect(() => {
        setCols([{ title: 'test', key: 'test', filterDropdown: 123 }]);
      }, []);
      return <Table columns={cols} dataSource={[]} scroll={{ x: 1000 }} />;
    };
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
    fireEvent.click(container.querySelector('.ant-table-column-sorters')!, nativeEvent);
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      { gender: null },
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!, nativeEvent);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

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
            filterDropdownOpen: true,
            filterSearch: true,
            filterMode: 'tree',
          },
        ],
      }),
    );

    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')?.textContent,
    ).toEqual('Bamboo');
    expect(
      container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-link')?.textContent,
    ).toEqual('Reset');
    expect(container.querySelector('.ant-table-filter-dropdown-checkall')?.textContent).toEqual(
      'Select all items',
    );
    expect(container.querySelector('.ant-input')?.getAttribute('placeholder')).toEqual(
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
      container.querySelector('.ant-table-filter-trigger')?.className.includes('active'),
    ).toBeTruthy();
  });

  it('filtered should work after change', () => {
    const App: React.FC = () => {
      const [filtered, setFiltered] = React.useState(true);
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          filtered,
          filters: [],
        },
      ];

      return (
        <div className="App">
          <Button
            id="change-filtered-btn"
            onClick={() => {
              setFiltered(!filtered);
            }}
          >
            Set
          </Button>
          <Table columns={columns} dataSource={data} />
        </div>
      );
    };
    const { container } = render(<App />);

    expect(
      container.querySelector('.ant-table-filter-trigger')?.className.includes('active'),
    ).toBeTruthy();

    fireEvent.click(container.querySelector('#change-filtered-btn')!);

    refreshTimer();

    expect(
      container.querySelector('.ant-table-filter-trigger')?.className.includes('active'),
    ).toBeFalsy();
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
      container.querySelector('.ant-table-filter-trigger')?.className.includes('active'),
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
          onFilter={(value, record: any) => record.name.includes(value)}
          defaultFilteredValue={['Jack']}
        />
      </Table>,
    );

    expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(container.querySelector('tbody tr td')?.textContent).toEqual('Jack');
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
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!); // close dropdown
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!); // reopen
    const checkbox = container
      ?.querySelector('.ant-dropdown-menu-item')
      ?.querySelector<HTMLInputElement>('input[type=checkbox]');
    expect(checkbox?.checked).toBe(false);
  });

  it('should not trigger onChange when filters is empty', () => {
    const onChange = jest.fn();
    const Test: React.FC<{ filters?: ColumnFilterItem[] }> = ({ filters }) => (
      <Table
        onChange={onChange}
        rowKey="name"
        columns={[{ title: 'Name', dataIndex: 'name', filters }]}
        dataSource={[{ name: 'Jack' }]}
      />
    );
    const { container, unmount } = render(<Test filters={[]} />);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
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
        onFilter: (record: any) => String(record.english1).includes(String(1)),
        children: [
          {
            title: 'English Score1',
            dataIndex: 'english1',
            filters: [{ text: '2', value: 2 }],
            onFilter: (record: any) => String(record.english2).includes(String(2)),
          },
          {
            title: 'English Score2',
            dataIndex: 'english2',
            filters: [{ text: '2', value: 3 }],
            onFilter: (record: any) => String(record.english2).includes(String(3)),
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
        onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
    ] as TableProps<any>['columns'];
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
        address: 'Sydney No. 1 Lake Park',
      },
    ];

    const { container } = render(
      <Table onChange={onChange} rowKey="name" columns={columns} dataSource={dataSource} />,
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

    expect(onChange.mock.calls[0][0].current).toBe(1);

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[1]!);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    expect(onChange.mock.calls[1][0].current).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/30454
  it('should not trigger onFilterDropdownOpenChange when call confirm({ closeDropdown: false })', () => {
    const onFilterDropdownOpenChange = jest.fn();
    const { container } = render(
      createTable({
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: name as unknown as FilterValue,
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
            onFilterDropdownOpenChange,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(onFilterDropdownOpenChange).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('#confirm-only')!);
    expect(onFilterDropdownOpenChange).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('#confirm-and-close')!);
    expect(onFilterDropdownOpenChange).toHaveBeenCalledTimes(2);
    expect(onFilterDropdownOpenChange).toHaveBeenLastCalledWith(false);
  });

  // Warning: An update to Item ran an effect, but was not wrapped in act(...).
  it('Column with filter and children filters properly.', () => {
    const App: React.FC = () => {
      const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
      const [sortedInfo, setSortedInfo] = useState<SorterResult<any> | SorterResult<any>[]>({});
      const handleChange: TableProps<any>['onChange'] = (_, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
      };
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          filters: [
            { text: 'Joe', value: 'Joe' },
            { text: 'Jim', value: 'Jim' },
          ],
          filteredValue: filteredInfo?.name || null,
          onFilter: (value: any, record: any) => record.name.includes(value),
          children: [{ title: 'Age', dataIndex: 'age', key: 'age' }],
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          sorter: (a: any, b: any) => a.age - b.age,
          sortOrder: (sortedInfo as any)?.columnKey === 'age' && (sortedInfo as any)?.order,
          ellipsis: true,
        },
      ];
      return (
        <Table
          columns={columns}
          onChange={handleChange}
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
              address: 'Sydney No. 1 Lake Park',
            },
            {
              key: '4',
              name: 'Jim Red',
              age: 32,
              address: 'London No. 2 Lake Park',
            },
          ]}
        />
      );
    };

    const { container } = render(<App />);

    expect(container.querySelector('.ant-table-tbody .ant-table-cell')?.textContent).toEqual(
      `${32}`,
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger.ant-table-filter-trigger')!);
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);
    fireEvent.click(container.querySelector('.ant-btn.ant-btn-primary.ant-btn-sm')!);
    expect(container.querySelector('.ant-table-tbody .ant-table-cell')?.textContent).toEqual(
      `${66}`,
    );
  });

  it('Columns with filters should filter correctly after reset it.', () => {
    interface DataType {
      key: React.Key;
      name?: string;
      name1?: string;
      age?: number;
      address?: string;
    }

    const columns: ColumnsType<DataType> = [
      {
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value: string, record) => record.name?.indexOf(value) === 0,
        sorter: (a, b) => a.name!.length - b.name!.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age! - b.age!,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        onFilter: (value: string, record) => record.address?.indexOf(value) === 0,
      },
    ];

    const App: React.FC = () => {
      const [ddd, setData] = React.useState<Array<DataType>>([
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
          age: 32,
          address: 'Sydney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Jim Red',
          age: 32,
          address: 'London No. 2 Lake Park',
        },
      ]);
      const [cs, setCs] = React.useState(columns);

      const handleClick = () => {
        setCs([
          {
            title: 'name1',
            dataIndex: 'name1',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            filters: [
              {
                text: 'London',
                value: 'London',
              },
              {
                text: 'New York',
                value: 'New York',
              },
            ],
            onFilter: (value: string, record) => record.address?.indexOf(value) === 0,
          },
        ]);
        setData([
          {
            key: '1',
            name1: 'Joe Brown',
            address: 'New York No. 1 Lake Park',
          },
          {
            key: '2',
            name1: 'Jim Green',
            address: 'London No. 1 Lake Park',
          },
          {
            key: '3',
            name1: 'Joe Black',
            address: 'Sydney No. 1 Lake Park',
          },
          {
            key: '4',
            name1: 'Jim Red',
            address: 'London No. 2 Lake Park',
          },
        ]);
      };

      return (
        <div>
          <span className="rest-btn" onClick={handleClick}>
            refresh
          </span>
          <Table columns={cs} dataSource={ddd} />
        </div>
      );
    };

    const { container } = render(<App />);

    expect(container.querySelectorAll('.ant-table-tbody .ant-table-row').length).toEqual(4);
    // Open
    fireEvent.click(container.querySelector('.ant-table-filter-trigger')!);
    function getFilterMenu() {
      return container.querySelector('.ant-table-filter-dropdown');
    }

    const items = getFilterMenu()?.querySelectorAll('li.ant-dropdown-menu-item');
    fireEvent.click(items?.[0]!);
    fireEvent.click(
      getFilterMenu()?.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!,
    );
    refreshTimer();

    expect(container.querySelectorAll('.ant-table-tbody .ant-table-row').length).toEqual(1);

    fireEvent.click(container.querySelector('.rest-btn')!);

    expect(container.querySelectorAll('.ant-table-tbody .ant-table-row').length).toEqual(4);
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
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
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
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-tree').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      fireEvent.change(container.querySelector('.ant-input')!, { target: { value: '111' } });
    });

    it('supports search input in filter menu', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [{ ...column, filterSearch: true }],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-search').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      fireEvent.change(container.querySelector('.ant-input')!, { target: { value: '111' } });
    });

    it('should skip search when filters[0].text is ReactNode', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container, unmount } = render(
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

      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-search').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(3);
      fireEvent.change(container.querySelector('.ant-input')!, { target: { value: '123' } });
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(2);

      unmount();
    });

    it('should supports filterSearch has type of function', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container, unmount } = render(
        createTable({
          columns: [
            {
              ...column,
              filters: [
                { text: '123', value: '123' },
                { text: 123456, value: '456' },
                { text: <span>123</span>, value: '456' },
              ],
              filterSearch: (input: any, record: any) => record.value.includes(input),
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-search').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(3);
      fireEvent.change(container.querySelector('.ant-input')!, { target: { value: '456' } });
      expect(container.querySelectorAll('li.ant-dropdown-menu-item').length).toBe(2);

      unmount();
      errorSpy.mockRestore();
    });

    it('should supports filterSearch has type of function when filterMode is tree', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filters: [
                { text: '节点一', value: 'node1' },
                { text: '节点二', value: 'node2' },
                { text: '节点三', value: 'node3' },
              ],
              filterSearch: (input: any, record: TreeColumnFilterItem) =>
                (record.title as string).includes(input),
            },
          ],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-tree').length).toBe(1);
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      fireEvent.change(container.querySelector('.ant-input')!, { target: { value: '节点二' } });
      expect(container.querySelectorAll('.ant-tree-treenode.filter-node').length).toBe(1);
    });

    it('supports check all items', () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const { container } = render(
        createTable({
          columns: [{ ...column, filterMode: 'tree', filterSearch: true }],
        }),
      );
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-checkall').length).toBe(1);
      expect(container.querySelector('.ant-table-filter-dropdown-checkall')?.textContent).toBe(
        'Select all items',
      );
      expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);

      // fireEvent.change(container.querySelector('.ant-table-filter-dropdown-checkall input'), { target: { checked: true } });
      // 为什么 fireEvent.change 模拟 checkbox 触发会失败
      fireEvent.click(container.querySelector('.ant-table-filter-dropdown-checkall')!);
      expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(5);

      fireEvent.click(container.querySelector('.ant-table-filter-dropdown-checkall')!);
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
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelectorAll('.ant-table-filter-dropdown-checkall').length).toBe(1);
      expect(container.querySelector('.ant-table-filter-dropdown-checkall')?.textContent).toBe(
        'Select all items',
      );
      fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper')!);

      expect(
        container
          ?.querySelector('.ant-tree-checkbox')
          ?.className.includes('ant-tree-checkbox-checked'),
      ).toBe(true);
      expect(
        container
          ?.querySelector('.ant-table-filter-dropdown-checkall .ant-checkbox')
          ?.className.includes('ant-checkbox-indeterminate'),
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
      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[0]);
      fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[1]);

      expect(
        container
          ?.querySelector('.ant-table-filter-dropdown-checkall .ant-checkbox')
          ?.className.includes('ant-checkbox-checked'),
      ).toBe(true);
    });
  });

  it('filterMultiple is false - check item', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      createTable({
        columns: [{ ...column, filterMode: 'tree', filterMultiple: false }],
      }),
    );

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
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
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
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
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
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

    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    expect(renderedNames(container)).toEqual(['Jack']);

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(container.querySelectorAll('.ant-tree-checkbox-inner')[2]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    expect(renderedNames(container)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[2]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
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
    const filter = ({
      prefixCls,
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps): React.ReactNode => {
      renderSelectedKeys = selectedKeys;

      return (
        <div className={`${prefixCls}-view`} id="customFilter">
          {filterConfig.map(([text, id, param]) => (
            <>
              <span
                onClick={() => {
                  setSelectedKeys([text as React.Key]);
                  confirm();
                }}
                id={`set${id}`}
              >
                setSelectedKeys
              </span>
              <span onClick={() => (clearFilters as any)?.(param)} id={`reset${id}`}>
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
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!);
    expect(container.querySelector('#customFilter')).toMatchSnapshot();
    expect(renderSelectedKeys).toHaveLength(0);

    filterConfig.forEach(([text, id, , matchNames, visible]) => {
      fireEvent.click(container.querySelector(`#set${id}`)!);
      expect(renderedNames(container)).toEqual([text]);

      fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!);
      fireEvent.click(container.querySelector(`#reset${id}`)!);
      expect(renderedNames(container)).toEqual(matchNames);

      expect(container.querySelector('.ant-dropdown-open'))[visible ? 'toBeTruthy' : 'toBeFalsy']();
    });
  });

  it('filterDropdown should support filterResetToDefaultFilteredValue', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const columnFilter: ColumnGroupType<any> | ColumnType<any> = {
      ...column,
      filterMode: 'tree',
      filterSearch: true,
      defaultFilteredValue: ['girl'],
    };

    const { container } = render(
      createTable({
        columns: [columnFilter],
      }),
    );
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);

    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-checkall')!);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(5);
    fireEvent.click(container.querySelector('button.ant-btn-link')!, nativeEvent);
    expect(container.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(0);

    const { container: container2 } = render(
      createTable({
        columns: [
          {
            ...columnFilter,
            filterResetToDefaultFilteredValue: true,
          },
        ],
      }),
    );

    fireEvent.click(container2.querySelector('span.ant-dropdown-trigger')!, nativeEvent);
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.click(container2.querySelector('.ant-table-filter-dropdown-checkall')!);
    expect(container2.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(5);
    fireEvent.click(container2.querySelector('button.ant-btn-link')!, nativeEvent);
    expect(container2.querySelectorAll('.ant-tree-checkbox-checked').length).toBe(1);
    expect(container2.querySelector('.ant-tree-checkbox-checked+span')?.textContent).toBe('Girl');
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
    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });

    // Click Item
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown .ant-dropdown-menu-item')!);

    expect(onSelect).toHaveBeenCalled();
  });

  describe('filteredKeys should all be controlled or not controlled', () => {
    let errorSpy: jest.SpyInstance;

    beforeEach(() => {
      resetWarned();
      errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      errorSpy.mockReset();
    });

    afterEach(() => {
      errorSpy.mockRestore();
    });

    const tableData = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
      },
    ];
    const getColumns = () => [
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

    it('all uncontrolled', () => {
      render(
        createTable({
          columns: getColumns(),
          data: tableData,
        } as TableProps<any>),
      );
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('part controlled', () => {
      const columns = getColumns();
      (columns[0] as any).filteredValue = [];
      render(
        createTable({
          columns,
          data: tableData,
        } as TableProps<any>),
      );
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Table] Columns should all contain `filteredValue` or not contain `filteredValue`.',
      );
    });

    it('all controlled', () => {
      const columns = getColumns();
      (columns[0] as any).filteredValue = [];
      (columns[1] as any).filteredValue = [];
      render(
        createTable({
          columns,
          data: tableData,
        } as TableProps<any>),
      );
      expect(errorSpy).not.toHaveBeenCalled();
    });
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
    expect(container.querySelector('tbody tr')?.textContent).toBe('Jack');

    // open filter

    fireEvent.click(container.querySelector('span.ant-dropdown-trigger')!);
    expect(
      container.querySelector<HTMLLinkElement>('.ant-table-filter-dropdown-btns .ant-btn-link')
        ?.disabled,
    ).toBeTruthy();
    expect(container.querySelectorAll('li.ant-dropdown-menu-item')[0].textContent).toBe('Jack');
    expect(container.querySelectorAll('li.ant-dropdown-menu-item')[1].textContent).toBe('Lucy');

    // deselect default
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[0]);
    expect(
      container.querySelector<HTMLLinkElement>('.ant-table-filter-dropdown-btns .ant-btn-link')
        ?.disabled,
    ).toBeFalsy();
    // select other one
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[1]);
    expect(
      container.querySelector<HTMLLinkElement>('.ant-table-filter-dropdown-btns .ant-btn-link')
        ?.disabled,
    ).toBeFalsy();
    // deselect other one
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[1]);
    expect(
      container.querySelector<HTMLLinkElement>('.ant-table-filter-dropdown-btns .ant-btn-link')
        ?.disabled,
    ).toBeFalsy();
    // select default
    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[0]);
    expect(
      container.querySelector<HTMLLinkElement>('.ant-table-filter-dropdown-btns .ant-btn-link')
        ?.disabled,
    ).toBeTruthy();
  });

  it('title render function support `filter`', () => {
    const title = jest.fn(() => 'RenderTitle');
    const { container } = render(
      createTable({
        columns: [
          {
            ...column,
            title,
            filteredValue: ['boy'],
          },
        ],
      }),
    );

    expect(container.querySelector('.ant-table-column-title')?.textContent).toEqual('RenderTitle');
    expect(title).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: { name: ['boy'] },
      }),
    );
  });
  it('should be hidden and not commit when call close()', () => {
    const onFilterDropdownOpenChange = jest.fn();
    const onFilter = jest.fn();
    const { container } = render(
      createTable({
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: name as unknown as FilterValue,
            filterDropdown: ({ close }) => (
              <button id="close-only" type="button" onClick={() => close()}>
                close
              </button>
            ),
            onFilterDropdownOpenChange,
            onFilter,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(onFilterDropdownOpenChange).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('#close-only')!);
    expect(onFilterDropdownOpenChange).toHaveBeenCalledTimes(2);
    expect(onFilter).toHaveBeenCalledTimes(0);
  });

  it('works with grouping columns correctly', () => {
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

    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

    expect(renderedNames(container)).toEqual(['Jack']);
  });

  it('changes to table data should not reset the filter dropdown state being changed by a user', () => {
    const tableProps = {
      key: 'stabletable',
      rowKey: 'name',
      dataSource: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          filteredValue: [], // User is controlling filteredValue. It begins with no items checked.
          filters: [{ text: 'J', value: 'J' }],
          onFilter: (value: any, record: any) => record.name.includes(value),
        },
      ],
    };

    const { container, rerender } = render(createTable(tableProps));

    // User opens filter Dropdown.
    fireEvent.click(container.querySelector('.ant-dropdown-trigger.ant-table-filter-trigger')!);

    // There is one checkbox and it begins unchecked.
    expect(container.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked).toEqual(
      false,
    );

    // User checks it.
    fireEvent.click(container.querySelector('input[type="checkbox"]')!);

    // The checkbox is now checked.
    expect(container.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked).toEqual(
      true,
    );

    // Table data changes while the dropdown is open and a user is setting filters.
    rerender(createTable({ ...tableProps, dataSource: [{ name: 'Foo' }] }));

    // The checkbox is still checked.
    expect(container.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked).toEqual(
      true,
    );
  });

  it('should not crash when filterDropdown is boolean', () => {
    const tableProps = {
      key: 'stabletable',
      rowKey: 'name',
      dataSource: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          filterDropdown: true,
        },
      ],
    };

    const { container } = render(createTable(tableProps));

    // User opens filter Dropdown.
    fireEvent.click(container.querySelector('.ant-dropdown-trigger.ant-table-filter-trigger')!);
  });

  it('should not fire change event when dropdown dismisses if filterOnClose is false', () => {
    const handleChange = jest.fn();
    const { container } = render(
      createTable({
        onChange: handleChange,
        columns: [
          {
            ...column,
            filterOnClose: false,
          },
        ],
      }),
    );
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);
    fireEvent.click(container.querySelector('.ant-dropdown-trigger')!);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
