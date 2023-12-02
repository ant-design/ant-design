import React from 'react';

import type { TableProps } from '..';
import Table from '..';
import { resetWarned } from '../../_util/warning';
import { act, fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { TableRowSelection } from '../interface';

describe('Table.rowSelection', () => {
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = window.clearTimeout;

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

  function createTable(props: TableProps<any> = {}) {
    return <Table columns={columns} dataSource={data} rowSelection={{}} {...props} />;
  }

  function renderedNames(container: ReturnType<typeof render>['container']) {
    const namesList: Node['textContent'][] = [];
    container
      ?.querySelector('.ant-table-tbody')
      ?.querySelectorAll('tr')
      ?.forEach((tr) => {
        namesList.push(tr?.querySelectorAll('td')?.[1]?.textContent);
      });
    return namesList;
  }

  function getSelections(container: ReturnType<typeof render>['container']) {
    const keys: React.Key[] = [];
    container.querySelectorAll('.ant-table-tbody tr').forEach((row) => {
      const key = row.getAttribute('data-row-key');
      if (row.querySelector('input')?.checked) {
        if (isNaN(Number(key))) {
          // rowKey
          keys.push(key!);
        } else {
          keys.push(Number(key));
        }
      }
    });
    return keys;
  }

  function getIndeterminateSelection(container: ReturnType<typeof render>['container']) {
    const keys: React.Key[] = [];
    container.querySelectorAll('.ant-table-tbody tr').forEach((row) => {
      const key = row.getAttribute('data-row-key');
      if (row.querySelector('.ant-checkbox-indeterminate')) {
        if (isNaN(Number(key))) {
          // rowKey
          keys.push(key!);
        } else {
          keys.push(Number(key));
        }
      }
    });
    return keys;
  }

  it('select default row', () => {
    const { container } = render(createTable({ rowSelection: { defaultSelectedRowKeys: [0] } }));
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(getSelections(container)).toEqual([0]);

    fireEvent.click(checkboxes[1]);
    expect(getSelections(container)).toEqual([]);

    fireEvent.click(checkboxes[0]);
    expect(getSelections(container)).toEqual([0, 1, 2, 3]);

    fireEvent.click(checkboxes[0]);
    expect(getSelections(container)).toEqual([]);
  });

  it('select by checkbox', () => {
    const { container } = render(createTable());
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    fireEvent.click(checkboxes[0]);
    expect(getSelections(container)).toEqual([0, 1, 2, 3]);

    fireEvent.click(checkboxes[1]);
    expect(getSelections(container)).toEqual([1, 2, 3]);

    fireEvent.click(checkboxes[1]);
    expect(getSelections(container)).toEqual([0, 1, 2, 3]);
  });

  it('select by radio', () => {
    const { container } = render(createTable({ rowSelection: { type: 'radio' } }));
    const radios = container.querySelectorAll('input[type="radio"]');

    expect(radios.length).toBe(4);
    fireEvent.click(radios[0]);
    expect(getSelections(container)).toEqual([0]);

    fireEvent.click(radios[radios.length - 1]);
    expect(getSelections(container)).toEqual([3]);
  });

  it('pass getCheckboxProps to checkbox', () => {
    const rowSelection = {
      getCheckboxProps: (record: any) => ({
        disabled: record.name === 'Lucy',
        indeterminate: record.name === 'Tom',
        name: record.name,
      }),
    };

    const { container } = render(createTable({ rowSelection }));
    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    expect(checkboxes[1].disabled).toBe(false);
    expect(checkboxes[1].name).toEqual(data[0].name);
    expect(checkboxes[2].disabled).toBe(true);
    expect(checkboxes[2].name).toEqual(data[1].name);

    expect(getIndeterminateSelection(container)).toEqual([2]);
  });

  it("make getCheckboxProps's `indeterminate` override selectedRowKeys' effect", () => {
    const rowSelection: TableProps<any>['rowSelection'] = {
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Lucy',
        indeterminate: record.name === 'Tom',
        name: record.name,
      }),
      selectedRowKeys: [2],
    };

    const { container } = render(createTable({ rowSelection }));
    expect(getIndeterminateSelection(container)).toEqual([2]);
  });

  it('works with pagination', () => {
    const { container } = render(createTable({ pagination: { pageSize: 2 } }));

    const pagers = container.querySelectorAll('.ant-pagination-item');
    const checkboxAll = container.querySelector<HTMLInputElement>('input[type="checkbox"]');

    const objectContaining: { checked?: boolean; indeterminate?: boolean } = {};
    fireEvent.click(checkboxAll!);
    objectContaining.checked = checkboxAll?.checked; // true
    objectContaining.indeterminate = getIndeterminateSelection(container).length > 0; // false
    expect.objectContaining(objectContaining);

    fireEvent.click(pagers[1]);
    objectContaining.checked = checkboxAll?.checked; // false
    objectContaining.indeterminate = getIndeterminateSelection(container).length > 0; // false
    expect.objectContaining(objectContaining);

    fireEvent.click(pagers[0]);
    objectContaining.checked = checkboxAll?.checked; // true
    objectContaining.indeterminate = getIndeterminateSelection(container).length > 0; // false
    expect.objectContaining(objectContaining);
  });

  // https://github.com/ant-design/ant-design/issues/4020
  it('handles defaultChecked', () => {
    resetWarned();
    const rowSelection = {
      getCheckboxProps: (record) => ({
        defaultChecked: record.key === 0,
      }),
    } as TableRowSelection<any>;

    render(createTable({ rowSelection }));

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.',
    );
  });

  it('can be controlled', () => {
    const { container, rerender } = render(createTable({ rowSelection: { selectedRowKeys: [0] } }));

    expect(getSelections(container)).toEqual([0]);

    rerender(createTable({ rowSelection: { selectedRowKeys: [1] } }));

    expect(getSelections(container)).toEqual([1]);
  });

  it('fires change & select events', () => {
    const order: string[] = [];
    const handleChange = jest.fn().mockImplementation(() => {
      order.push('onChange');
    });
    const handleSelect = jest.fn().mockImplementation(() => {
      order.push('onSelect');
    });
    const rowSelection = {
      onChange: handleChange,
      onSelect: handleSelect,
    };
    const { container } = render(createTable({ rowSelection }));

    fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[4]);

    expect(handleChange).toHaveBeenCalledWith([3], [{ key: 3, name: 'Jerry' }], {
      type: 'single',
    });
    expect(handleSelect.mock.calls.length).toBe(1);
    expect(handleSelect.mock.calls[0][0]).toEqual({ key: 3, name: 'Jerry' });
    expect(handleSelect.mock.calls[0][1]).toBe(true);
    expect(handleSelect.mock.calls[0][2]).toEqual([{ key: 3, name: 'Jerry' }]);
    expect(handleSelect.mock.calls[0][3].type).toBe('click');
    expect(order).toEqual(['onSelect', 'onChange']);
  });

  it('fires selectMulti event', () => {
    const order: string[] = [];
    const handleSelectMulti = jest.fn().mockImplementation(() => {
      order.push('onSelectMultiple');
    });
    const handleSelect = jest.fn().mockImplementation(() => {
      order.push('onSelect');
    });
    const handleChange = jest.fn().mockImplementation(() => {
      order.push('onChange');
    });
    const rowSelection = {
      onChange: handleChange,
      onSelect: handleSelect,
      onSelectMultiple: handleSelectMulti,
    };
    const { container } = render(createTable({ rowSelection }));
    fireEvent.click(container.querySelectorAll('tbody input[type="checkbox"]')[0], {
      shiftKey: true,
    });

    expect(handleSelect).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith([0], [{ key: 0, name: 'Jack' }], {
      type: 'single',
    });

    fireEvent.click(container.querySelectorAll('tbody input[type="checkbox"]')[2], {
      shiftKey: true,
    });

    expect(handleSelectMulti).toHaveBeenCalledWith(
      true,
      [data[0], data[1], data[2]],
      [data[1], data[2]],
    );
    expect(handleChange).toHaveBeenLastCalledWith(
      [0, 1, 2],
      [
        { key: 0, name: 'Jack' },
        { key: 1, name: 'Lucy' },
        { key: 2, name: 'Tom' },
      ],
      { type: 'multiple' },
    );

    fireEvent.click(container.querySelectorAll('tbody input[type="checkbox"]')[0], {
      shiftKey: true,
    });
    expect(handleSelectMulti).toHaveBeenCalledWith(false, [], [data[0], data[1], data[2]]);
    expect(handleChange).toHaveBeenLastCalledWith([], [], { type: 'multiple' });

    expect(order).toEqual([
      'onSelect',
      'onChange',
      'onSelectMultiple',
      'onChange',
      'onSelectMultiple',
      'onChange',
    ]);
  });

  it('reset last select key after deselect', async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();

    const { container } = render(
      createTable({
        checkbox: true,
        rowSelection: {
          selections: [Table.SELECTION_NONE],
          onChange: (keys) => onChange(keys),
        },
      } as TableProps<any>),
    );

    const last = () => {
      const elements = container.querySelectorAll('td input');
      return elements[elements.length - 1];
    };

    const first = () => {
      const elements = container.querySelectorAll('td input');
      return elements[0];
    };

    fireEvent.click(first());
    expect(onChange).toHaveBeenLastCalledWith([0]);
    fireEvent.click(last());
    expect(onChange).toHaveBeenLastCalledWith([0, 3]);
    fireEvent.click(last());
    expect(onChange).toHaveBeenLastCalledWith([0]);
    fireEvent.click(last(), {
      shiftKey: true,
    });
    expect(onChange).toHaveBeenLastCalledWith([0, 3]);

    jest.useRealTimers();
  });

  it('reset last select key after bulk operations', async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();

    const { container, baseElement } = render(
      createTable({
        checkbox: true,
        rowSelection: {
          selections: [Table.SELECTION_NONE],
          onChange: (keys) => onChange(keys),
        },
      } as TableProps<any>),
    );

    const last = () => {
      const elements = container.querySelectorAll('td input');
      return elements[elements.length - 1];
    };

    const first = () => {
      const elements = container.querySelectorAll('td input');
      return elements[0];
    };

    const allElement = () => container.querySelector('th input');

    // Multiple select normal
    fireEvent.click(last());
    expect(onChange).toHaveBeenLastCalledWith([3]);
    fireEvent.click(first(), {
      shiftKey: true,
    });
    expect(onChange).toHaveBeenLastCalledWith([3, 0, 1, 2]);
    fireEvent.click(allElement()!);
    expect(onChange).toHaveBeenLastCalledWith([]);

    // Reset last select key when select all
    fireEvent.click(last());
    expect(onChange).toHaveBeenLastCalledWith([3]);
    fireEvent.click(allElement()!);
    fireEvent.click(allElement()!);
    expect(onChange).toHaveBeenLastCalledWith([]);
    fireEvent.click(first(), {
      shiftKey: true,
    });
    expect(onChange).toHaveBeenLastCalledWith([0]);

    // Reset last select key when bulk operations
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.click(baseElement.querySelector('li.ant-dropdown-menu-item')!);
    expect(onChange).toHaveBeenLastCalledWith([]);
    fireEvent.click(first(), {
      shiftKey: true,
    });
    expect(onChange).toHaveBeenLastCalledWith([0]);

    jest.useRealTimers();
  });

  it('fires selectAll event', () => {
    const order: string[] = [];
    const handleSelectAll = jest.fn().mockImplementation(() => {
      order.push('onSelectAll');
    });
    const handleChange = jest.fn().mockImplementation(() => {
      order.push('onChange');
    });
    const rowSelection = {
      onChange: handleChange,
      onSelectAll: handleSelectAll,
    };
    const { container } = render(createTable({ rowSelection }));

    const checkAll = container.querySelector('input[type="checkbox"]');

    fireEvent.click(checkAll!);
    expect(handleSelectAll).toHaveBeenCalledWith(true, data, data);

    expect(order).toEqual(['onSelectAll', 'onChange']);

    fireEvent.click(checkAll!);
    expect(handleSelectAll).toHaveBeenCalledWith(false, [], data);
  });

  it('works with selectAll option inside selection menu', () => {
    jest.useFakeTimers();
    const handleChange = jest.fn();
    const rowSelection = {
      onChange: handleChange,
      selections: true,
    };
    const { container } = render(createTable({ rowSelection }));

    // Open
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(container.querySelectorAll('.ant-dropdown-menu-item')[0]);

    expect(handleChange.mock.calls[0][0]).toEqual([0, 1, 2, 3]);
  });

  it('render with default selection correctly', () => {
    jest.useFakeTimers();
    const rowSelection = {
      selections: true,
    };
    const { container } = render(createTable({ rowSelection }));
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('.ant-dropdown')).toMatchSnapshot();
  });

  it('fires selectInvert event', () => {
    jest.useFakeTimers();

    const order: string[] = [];
    const handleSelectInvert = jest.fn().mockImplementation(() => {
      order.push('onSelectInvert');
    });
    const handleChange = jest.fn().mockImplementation(() => {
      order.push('onChange');
    });
    const rowSelection = {
      onChange: handleChange,
      onSelectInvert: handleSelectInvert,
      selections: true,
    };
    const { container } = render(createTable({ rowSelection }));

    fireEvent.click(container.querySelectorAll('.ant-checkbox')[1]);
    // Open
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(container.querySelectorAll('li.ant-dropdown-menu-item')[1]);

    expect(handleSelectInvert).toHaveBeenCalledWith([1, 2, 3]);
    expect(order).toEqual(['onChange', 'onSelectInvert', 'onChange']);

    jest.useRealTimers();
  });

  it('fires selectNone event', () => {
    jest.useFakeTimers();
    const order: string[] = [];
    const handleChange = jest.fn().mockImplementation(() => {
      order.push('onChange');
    });
    const handleSelectNone = jest.fn().mockImplementation(() => {
      order.push('onSelectNone');
    });
    const rowSelection = {
      onChange: handleChange,
      onSelectNone: handleSelectNone,
      selections: true,
    };
    const { container } = render(createTable({ rowSelection }));

    fireEvent.click(container.querySelectorAll('.ant-checkbox')[1]);
    // Open
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });
    const dropdownMenuItems = container.querySelectorAll('.ant-dropdown-menu-item');
    fireEvent.click(dropdownMenuItems[dropdownMenuItems.length - 1]);

    expect(handleSelectNone).toHaveBeenCalled();
    expect(order).toEqual(['onChange', 'onSelectNone', 'onChange']);
  });

  it('fires selection event', () => {
    jest.useFakeTimers();
    const handleSelectOdd = jest.fn();
    const handleSelectEven = jest.fn();
    const rowSelection = {
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
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
    const { container } = render(createTable({ rowSelection }));

    // Open
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });

    const dropdownMenuItems = container.querySelectorAll('.ant-dropdown-menu-item');

    expect(dropdownMenuItems.length).toBe(4);

    fireEvent.click(dropdownMenuItems[2]);
    expect(handleSelectOdd).toHaveBeenCalledWith([0, 1, 2, 3]);

    fireEvent.click(dropdownMenuItems[3]);
    expect(handleSelectEven).toHaveBeenCalledWith([0, 1, 2, 3]);
  });

  describe('preset selection options', () => {
    const presetData = [
      { key: 0, name: 'Jack' },
      { key: 1, name: 'Lucy', disabled: true },
      { key: 2, name: 'Tom' },
    ];

    const getCheckboxProps = (record: any) => record;

    it('SELECTION_ALL', () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const { container } = render(
        createTable({
          dataSource: presetData,
          rowSelection: {
            onChange,
            defaultSelectedRowKeys: [2],
            getCheckboxProps,
            selections: [Table.SELECTION_ALL],
          },
        }),
      );

      fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);

      act(() => {
        jest.runAllTimers();
      });

      fireEvent.click(container.querySelector('li.ant-dropdown-menu-item')!);
      expect(onChange).toHaveBeenCalledWith([0, 2], expect.anything(), { type: 'all' });
    });

    it('SELECTION_INVERT', () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const { container } = render(
        createTable({
          dataSource: presetData,
          rowSelection: {
            onChange,
            defaultSelectedRowKeys: [2],
            getCheckboxProps,
            selections: [Table.SELECTION_INVERT],
          },
        }),
      );

      fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);

      act(() => {
        jest.runAllTimers();
      });

      fireEvent.click(container.querySelector('li.ant-dropdown-menu-item')!);

      expect(onChange).toHaveBeenCalledWith([0], expect.anything(), { type: 'invert' });
    });

    it('SELECTION_NONE', () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const { container } = render(
        createTable({
          dataSource: presetData,
          rowSelection: {
            onChange,
            defaultSelectedRowKeys: [1, 2],
            getCheckboxProps,
            selections: [Table.SELECTION_NONE],
          },
        }),
      );

      fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);

      act(() => {
        jest.runAllTimers();
      });

      fireEvent.click(container.querySelector('li.ant-dropdown-menu-item')!);

      expect(onChange).toHaveBeenCalledWith([1], expect.anything(), { type: 'none' });
    });
  });

  it('could hide selectAll checkbox and custom selection', () => {
    const rowSelection = {
      hideSelectAll: true,
    };
    const { container } = render(createTable({ rowSelection }));
    expect(container.querySelector('.ant-selection')).toBeFalsy();
  });

  it('handle custom selection onSelect correctly when hide default selection options', () => {
    jest.useFakeTimers();
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
    const { container } = render(createTable({ rowSelection }));

    // Open
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });

    const dropdownMenuItems = container.querySelectorAll('li.ant-dropdown-menu-item');
    expect(dropdownMenuItems.length).toBe(2);

    fireEvent.click(dropdownMenuItems[0]);
    expect(handleSelectOdd).toHaveBeenCalledWith([0, 1, 2, 3]);

    fireEvent.click(dropdownMenuItems[1]);
    expect(handleSelectEven).toHaveBeenCalledWith([0, 1, 2, 3]);
  });

  // https://github.com/ant-design/ant-design/issues/4245
  it('handles disabled checkbox correctly when dataSource changes', () => {
    const rowSelection: TableProps<any>['rowSelection'] = {
      getCheckboxProps: (record) => ({ disabled: record.disabled }),
    };
    const { container, rerender } = render(createTable({ rowSelection }));
    const newData = [
      { key: 0, name: 'Jack', disabled: true },
      { key: 1, name: 'Lucy', disabled: true },
    ];

    rerender(createTable({ rowSelection, dataSource: newData }));
    container.querySelectorAll('input').forEach((checkbox) => {
      expect(checkbox.disabled).toBe(true);
    });
  });

  // https://github.com/ant-design/ant-design/issues/4245
  it('should allow dynamic getCheckboxProps', () => {
    const { container, rerender } = render(
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          getCheckboxProps: (record) => ({ disabled: record.name === 'Jack' }),
        }}
      />,
    );

    let checkboxList = container.querySelectorAll('input');
    expect(checkboxList[1]).toHaveAttribute('disabled');
    expect(checkboxList[2]).not.toHaveAttribute('disabled');

    rerender(
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          getCheckboxProps: (record) => ({ disabled: record.name === 'Lucy' }),
        }}
      />,
    );
    checkboxList = container.querySelectorAll('input');
    expect(checkboxList[1]).not.toHaveAttribute('disabled');
    expect(checkboxList[2]).toHaveAttribute('disabled');
  });

  // https://github.com/ant-design/ant-design/issues/4779
  it('should not switch pagination when select record', () => {
    const newData: Record<'key' | 'name', string>[] = [];
    for (let i = 0; i < 20; i += 1) {
      newData.push({
        key: i.toString(),
        name: i.toString(),
      });
    }
    const { container } = render(
      createTable({
        rowSelection: {},
        dataSource: newData,
      }),
    );
    fireEvent.click(container.querySelectorAll('.ant-pagination-item')[1]); // switch to second page
    fireEvent.click(container.querySelector('.ant-checkbox')!);

    expect(renderedNames(container)).toEqual([
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
    const { container } = render(createTable());

    fireEvent.click(container.querySelectorAll('input')[1]);
    expect(
      container.querySelectorAll('tbody tr')[0].className.includes('ant-table-row-selected'),
    ).toBe(true);
  });

  it('fix selection column on the left', () => {
    const { asFragment } = render(
      createTable({
        rowSelection: { fixed: true },
        scroll: { x: 903 },
      }),
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('fix expand on th left when selection column fixed on the left', () => {
    const { asFragment } = render(
      createTable({
        expandable: {
          expandedRowRender() {
            return <div />;
          },
        },
        rowSelection: { fixed: true },
        scroll: { x: 903 },
      }),
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('fix selection column on the left when any other column is fixed', () => {
    const { asFragment } = render(
      createTable({
        rowSelection: {},
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            fixed: 'left',
          },
        ],
        scroll: { x: 903 },
      }),
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('use column as selection column when key is `selection-column`', () => {
    const { asFragment } = render(
      createTable({
        rowSelection: {},
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'selection-column',
          },
        ],
      }),
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/10629
  it('should keep all checked state when remove item from dataSource', () => {
    const { container, rerender } = render(
      <Table
        rowSelection={{
          selectedRowKeys: [0, 1, 2, 3],
        }}
        columns={columns}
        dataSource={data}
      />,
    );
    const checkboxes = container.querySelectorAll('.ant-checkbox');
    expect(checkboxes.length).toBe(5);
    checkboxes.forEach((checkbox) => {
      expect(checkbox.querySelector('input')?.checked).toBe(true);
      expect(checkbox.className.includes('ant-checkbox-indeterminate')).toBe(false);
    });

    rerender(
      <Table
        rowSelection={{
          selectedRowKeys: [1, 2, 3],
        }}
        columns={columns}
        dataSource={data.slice(1)}
      />,
    );

    expect(container.querySelectorAll('.ant-checkbox').length).toBe(4);
    container.querySelectorAll('.ant-checkbox').forEach((checkbox) => {
      expect(checkbox.querySelector('input')?.checked).toBe(true);
      expect(checkbox.className.includes('ant-checkbox-indeterminate')).toBe(false);
    });
  });

  // https://github.com/ant-design/ant-design/issues/11042
  it('add columnTitle for rowSelection', () => {
    const { container, rerender } = render(
      <Table columns={columns} dataSource={data} rowSelection={{ columnTitle: '多选' }} />,
    );
    expect(container.querySelector('thead tr th')?.textContent).toBe('多选');
    rerender(
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: 'radio',
          columnTitle: '单选',
        }}
      />,
    );
    expect(container.querySelector('thead tr th')?.textContent).toBe('单选');
  });

  it('columnTitle for rowSelection to be renderProps', () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          columnTitle: (originalNode) =>
            React.cloneElement(originalNode as any, {
              'data-testid': 'selection-checkbox',
              children: '多选',
            }),
        }}
      />,
    );

    expect(container.querySelector('thead tr th')?.textContent).toBe('多选');
    expect(container.querySelector('thead tr th input')?.getAttribute('data-testid')).toBe(
      'selection-checkbox',
    );

    fireEvent.click(container.querySelector('thead tr th input')!);
    container.querySelectorAll('.ant-checkbox').forEach((checkbox) => {
      expect(checkbox.querySelector('input')?.checked).toBe(true);
      expect(checkbox.className.includes('ant-checkbox-indeterminate')).toBe(false);
    });
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
        filterDropdownOpen: true,
        onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
      },
    ];

    const onChange = jest.fn();
    const rowSelection = {
      onChange,
    };

    const { container } = render(
      <Table columns={filterColumns} dataSource={data} rowSelection={rowSelection} />,
    );

    function clickFilter(indexList: number[]) {
      indexList.forEach((index) => {
        // wrapper.find('.ant-dropdown-menu-item .ant-checkbox-wrapper').at(index).simulate('click');
        fireEvent.click(
          container.querySelectorAll('.ant-dropdown-menu-item .ant-checkbox-wrapper')[index],
        );
      });
      // wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
      fireEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);
    }

    function clickItem() {
      fireEvent.click(
        container.querySelectorAll('tbody .ant-table-selection-column .ant-checkbox-input')[0],
      );
      // wrapper
      //   .find('tbody .ant-table-selection-column .ant-checkbox-input')
      //   .at(0)
      //   .simulate('change', {
      //     target: { checked: true },
      //   });
    }

    // Check Jack
    clickFilter([0]);
    expect(container.querySelectorAll('tbody tr').length).toBe(1);
    clickItem();
    expect(onChange.mock.calls[0][0].length).toBe(1);
    expect(onChange.mock.calls[0][1].length).toBe(1);

    // Check Lucy
    clickFilter([0, 1]);
    expect(container.querySelectorAll('tbody tr').length).toBe(1);
    clickItem();
    expect(onChange.mock.calls[1][0].length).toBe(2);
    expect(onChange.mock.calls[1][1].length).toBe(2);
  });

  it('render correctly when set childrenColumnName', () => {
    const newData = [
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
    const { container } = render(
      <Table columns={columns} dataSource={newData} childrenColumnName="test" rowSelection={{}} />,
    );
    const checkboxes = container.querySelectorAll('input');
    const objectContaining: { checked?: boolean; indeterminate?: boolean } = {};
    fireEvent.click(checkboxes[1]);
    objectContaining.checked = checkboxes[0].checked; // false
    objectContaining.indeterminate = getIndeterminateSelection(container).length > 0; // true
    expect.objectContaining(objectContaining);

    fireEvent.click(checkboxes[2]);
    objectContaining.checked = checkboxes[0].checked; // true
    objectContaining.indeterminate = getIndeterminateSelection(container).length > 0; // false
    expect.objectContaining(objectContaining);
  });

  // https://github.com/ant-design/ant-design/issues/16614
  it('should get selectedRows correctly when set childrenColumnName', () => {
    const onChange = jest.fn();
    const newData = [
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
    const { container } = render(
      <Table
        columns={columns}
        dataSource={newData}
        childrenColumnName="list"
        rowSelection={{ onChange }}
        expandedRowKeys={[1]}
      />,
    );
    const checkboxes = container.querySelectorAll('input');

    fireEvent.click(checkboxes[2]);

    expect(onChange).toHaveBeenLastCalledWith([11], [newData[0].list[0]], { type: 'single' });
    onChange.mockReset();

    fireEvent.click(checkboxes[1]);
    const item0 = newData[0];
    expect(onChange).toHaveBeenLastCalledWith([11, 1], [newData[0].list[0], item0], {
      type: 'single',
    });
  });

  it('clear selection className when remove `rowSelection`', () => {
    const dataSource = [
      { id: 1, name: 'Hello', age: 10 },
      { id: 2, name: 'World', age: 30 },
    ];

    const { container, rerender } = render(
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={{}}
        expandedRowRender={() => null}
        rowKey="id"
      />,
    );
    const checkboxes = container.querySelectorAll('input');
    fireEvent.click(checkboxes[1]);

    expect(container.querySelectorAll('tr.ant-table-row-selected').length).toBe(1);

    rerender(
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={null as unknown as TableRowSelection<any>}
        expandedRowRender={() => null}
        rowKey="id"
      />,
    );

    expect(container.querySelectorAll('tr.ant-table-row-selected').length).toBe(0);
  });

  it('select by checkbox to trigger stopPropagation', () => {
    const { container } = render(createTable());
    expect(() => {
      fireEvent.click(container.querySelectorAll('span')[10]);
    }).not.toThrow();
  });

  it('all disabled should not make select all checked', () => {
    const { container } = render(
      createTable({
        rowSelection: {
          getCheckboxProps: () => ({ disabled: true }),
        },
      }),
    );

    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.disabled,
    ).toBeTruthy();
    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.checked,
    ).toBeFalsy();
  });

  it('should make select all checked when each item is checked and disabled', () => {
    const { container } = render(
      createTable({
        rowSelection: {
          selectedRowKeys: [0, 1, 2, 3],
          getCheckboxProps: () => ({
            disabled: true,
          }),
        },
      }),
    );

    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.disabled,
    ).toBeTruthy();
    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.checked,
    ).toBeTruthy();
  });

  it('should make select all indeterminate when each item is disabled and some item is checked', () => {
    const { container } = render(
      createTable({
        rowSelection: {
          selectedRowKeys: [0],
          getCheckboxProps: () => ({
            disabled: true,
          }),
        },
      }),
    );

    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.disabled,
    ).toBeTruthy();
    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.checked,
    ).toBeFalsy();
    expect(
      container.querySelector('thead .ant-checkbox-indeterminate.ant-checkbox-disabled'),
    ).toBeTruthy();
  });

  it('should make select all checked when each item is checked and some item is disabled', () => {
    const { container } = render(
      createTable({
        rowSelection: {
          selectedRowKeys: [0, 1, 2, 3],
          getCheckboxProps: (record) => ({
            disabled: record.key === 0,
          }),
        },
      }),
    );

    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.disabled,
    ).toBeFalsy();
    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.checked,
    ).toBeTruthy();
  });

  it('should not make select all checked when some item is checked and disabled', () => {
    const { container } = render(
      createTable({
        rowSelection: {
          selectedRowKeys: [1],
          getCheckboxProps: (record) => ({
            disabled: record.key === 0,
          }),
        },
      }),
    );

    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.disabled,
    ).toBeFalsy();
    expect(
      container.querySelector<HTMLInputElement>('thead .ant-checkbox-input')?.checked,
    ).toBeFalsy();
    expect(container.querySelector('thead .ant-checkbox-indeterminate')).toBeTruthy();
  });

  it('should onRowClick not called when checkbox clicked', () => {
    const onRowClick = jest.fn();

    const { container } = render(
      createTable({
        onRow: () => ({
          onClick: onRowClick,
        }),
      }),
    );
    const checkboxes = container.querySelectorAll('input');
    fireEvent.click(checkboxes[checkboxes.length - 1]);

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('should support getPopupContainer', () => {
    const rowSelection = {
      selections: true,
    };
    const getPopupContainer = jest.fn((node) => node);
    const { container } = render(
      createTable({
        rowSelection,
        getPopupContainer,
      }),
    );
    jest.useFakeTimers();
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('should support getPopupContainer from ConfigProvider', () => {
    const rowSelection = {
      selections: true,
    };
    const { container } = render(
      <ConfigProvider getPopupContainer={(node) => node?.parentNode as HTMLElement}>
        {createTable({
          rowSelection,
        })}
      </ConfigProvider>,
    );
    jest.useFakeTimers();
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Table selection should check', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={[{ name: 'light', sub: [{ name: 'bamboo' }] }]}
        expandable={{ expandedRowKeys: ['light'], childrenColumnName: 'sub' }}
        rowSelection={{ onChange }}
        rowKey="name"
      />,
    );

    const checkboxes = container.querySelectorAll('input');
    fireEvent.click(checkboxes[checkboxes.length - 1]);

    expect(onChange.mock.calls[0][1]).toEqual([expect.objectContaining({ name: 'bamboo' })]);
  });

  it('support onCell', () => {
    const onCell = jest.fn().mockReturnValue({ rowSpan: 4 });
    const { container } = render(
      createTable({
        rowSelection: {
          onCell,
        },
      }),
    );
    expect(onCell).toHaveBeenCalledTimes(8);
    expect(container.querySelectorAll("td[rowspan='4']").length).toBe(4);
  });

  describe('supports children', () => {
    const dataWithChildren = [
      { key: 0, name: 'Jack' },
      { key: 1, name: 'Lucy' },
      { key: 2, name: 'Tom' },
      {
        key: 3,
        name: 'Jerry',
        children: [
          {
            key: 4,
            name: 'Jerry Jack',
          },
          {
            key: 5,
            name: 'Jerry Lucy',
          },
          {
            key: 6,
            name: 'Jerry Tom',
            children: [
              {
                key: 7,
                name: 'Jerry Tom Jack',
              },
              {
                key: 8,
                name: 'Jerry Tom Lucy',
              },
              {
                key: 9,
                name: 'Jerry Tom Tom',
              },
            ],
          },
        ],
      },
    ];
    describe('supports checkStrictly', () => {
      it('use data entity key', () => {
        const onChange = jest.fn();

        const table = createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            onChange,
          },
        });
        const { container } = render(table);
        const checkboxes = container.querySelectorAll('input');

        fireEvent.click(checkboxes[4]);

        expect(getSelections(container)).toEqual([3, 4, 5, 6, 7, 8, 9]);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(onChange.mock.calls[0][0]).toEqual([3, 4, 5, 6, 7, 8, 9]);

        fireEvent.click(checkboxes[7]);

        expect(getSelections(container)).toEqual([4, 5]);
        expect(getIndeterminateSelection(container)).toEqual([3]);
        expect(onChange.mock.calls[1][0]).toEqual([4, 5]);
      });
      it('use function rowkey', () => {
        const onChange = jest.fn();
        const table = createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            onChange,
          },
          rowKey: (entity) => entity.name,
        });
        const { container } = render(table);
        const checkboxes = container.querySelectorAll('input');

        fireEvent.click(checkboxes[4]);
        expect(getSelections(container)).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom',
          'Jerry Tom Jack',
          'Jerry Tom Lucy',
          'Jerry Tom Tom',
        ]);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(onChange.mock.calls[0][0]).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom',
          'Jerry Tom Jack',
          'Jerry Tom Lucy',
          'Jerry Tom Tom',
        ]);

        fireEvent.click(checkboxes[7]);
        expect(getSelections(container)).toEqual(['Jerry Jack', 'Jerry Lucy']);
        expect(getIndeterminateSelection(container)).toEqual(['Jerry']);
        expect(onChange.mock.calls[1][0]).toEqual(['Jerry Jack', 'Jerry Lucy']);
      });
      it('use string rowkey', () => {
        const onChange = jest.fn();
        const table = createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            onChange,
          },
          rowKey: 'name',
        });
        const { container } = render(table);
        const checkboxes = container.querySelectorAll('input');

        fireEvent.click(checkboxes[4]);
        expect(getSelections(container)).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom',
          'Jerry Tom Jack',
          'Jerry Tom Lucy',
          'Jerry Tom Tom',
        ]);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(onChange.mock.calls[0][0]).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom',
          'Jerry Tom Jack',
          'Jerry Tom Lucy',
          'Jerry Tom Tom',
        ]);

        fireEvent.click(checkboxes[7]);
        expect(getSelections(container)).toEqual(['Jerry Jack', 'Jerry Lucy']);
        expect(getIndeterminateSelection(container)).toEqual(['Jerry']);
        expect(onChange.mock.calls[1][0]).toEqual(['Jerry Jack', 'Jerry Lucy']);
      });
      it('initialized correctly', () => {
        const table = createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            selectedRowKeys: [7, 8, 9],
          },
          rowKey: 'key',
        });
        const { container } = render(table);
        expect(getSelections(container)).toEqual([6, 7, 8, 9]);
        expect(getIndeterminateSelection(container)).toEqual([3]);
      });
      it('works with disabled checkbox', () => {
        const onChange = jest.fn();

        const table = createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            onChange,
            getCheckboxProps(record) {
              return {
                disabled: record.name === 'Jerry Tom',
              };
            },
          },
        });
        const { container } = render(table);

        const checkboxes = container.querySelectorAll('input');

        fireEvent.click(checkboxes[10]);
        fireEvent.click(checkboxes[4]);

        expect(getSelections(container).sort()).toEqual([3, 4, 5, 9]);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(Array.from(onChange.mock.calls[1][0]).sort()).toEqual([3, 4, 5, 9]);

        fireEvent.click(checkboxes[4]);
        expect(getSelections(container)).toEqual([9]);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(onChange.mock.calls[2][0]).toEqual([9]);
      });
      it('works with disabled checkbox and function rowkey', () => {
        const onChange = jest.fn();

        const table = createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            onChange,
            getCheckboxProps(record) {
              return {
                disabled: record.name === 'Jerry Tom',
              };
            },
          },
          rowKey: (entity) => entity.name,
        });
        const { container } = render(table);
        const checkboxes = container.querySelectorAll('input');

        fireEvent.click(checkboxes[10]);
        fireEvent.click(checkboxes[4]);
        expect(getSelections(container)).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom Tom',
        ]);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(Array.from(onChange.mock.calls[1][0]).sort()).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom Tom',
        ]);

        fireEvent.click(checkboxes[4]);
        expect(getSelections(container)).toEqual(['Jerry Tom Tom']);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(onChange.mock.calls[2][0]).toEqual(['Jerry Tom Tom']);
      });
      it('works with disabled checkbox and string rowkey', () => {
        const onChange = jest.fn();

        const table = createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            onChange,
            getCheckboxProps(record) {
              return {
                disabled: record.name === 'Jerry Tom',
              };
            },
          },
          rowKey: 'name',
        });
        const { container } = render(table);
        const checkboxes = container.querySelectorAll('input');

        fireEvent.click(checkboxes[10]);
        fireEvent.click(checkboxes[4]);
        expect(getSelections(container)).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom Tom',
        ]);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(Array.from(onChange.mock.calls[1][0]).sort()).toEqual([
          'Jerry',
          'Jerry Jack',
          'Jerry Lucy',
          'Jerry Tom Tom',
        ]);

        fireEvent.click(checkboxes[4]);
        expect(getSelections(container)).toEqual(['Jerry Tom Tom']);
        expect(getIndeterminateSelection(container)).toEqual([]);
        expect(onChange.mock.calls[2][0]).toEqual(['Jerry Tom Tom']);
      });

      it('should support `childrenColumnName`', () => {
        const onChange = jest.fn();

        const table = createTable({
          dataSource: [
            {
              key: 0,
              name: 'Jack',
              childList: [
                { key: 1, name: 'Light' },
                { key: 2, name: 'Bamboo' },
              ],
            },
          ],
          expandable: {
            childrenColumnName: 'childList',
            defaultExpandAllRows: true,
          },
          rowSelection: {
            checkStrictly: false,
            onChange,
          },
        });
        const { container } = render(table);
        const checkboxes = container.querySelectorAll('input');
        expect(checkboxes).toHaveLength(1 + 3);

        fireEvent.click(checkboxes[1]);
        expect(getSelections(container)).toEqual([0, 1, 2]);
      });
    });
    it('warns when set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured data.', () => {
      resetWarned();
      render(
        createTable({
          dataSource: dataWithChildren,
          defaultExpandAllRows: true,
          rowSelection: {
            checkStrictly: false,
            getCheckboxProps() {
              return {
                indeterminate: true,
              };
            },
          },
        }),
      );
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Table] set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.',
      );
    });
  });

  describe('cache with selected keys', () => {
    it('default not cache', () => {
      const onChange = jest.fn();
      const { container, rerender } = render(
        <Table
          dataSource={[{ name: 'light' }, { name: 'bamboo' }]}
          rowSelection={{ onChange }}
          rowKey="name"
        />,
      );

      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(['light'], [{ name: 'light' }], { type: 'single' });
      rerender(
        <Table dataSource={[{ name: 'bamboo' }]} rowSelection={{ onChange }} rowKey="name" />,
      );
      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(['bamboo'], [{ name: 'bamboo' }], { type: 'single' });
    });

    it('cache with preserveSelectedRowKeys', () => {
      const onChange = jest.fn();
      const { container, rerender } = render(
        <Table
          dataSource={[{ name: 'light' }, { name: 'bamboo' }]}
          rowSelection={{ onChange, preserveSelectedRowKeys: true }}
          rowKey="name"
        />,
      );

      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(['light'], [{ name: 'light' }], { type: 'single' });

      rerender(
        <Table
          dataSource={[{ name: 'bamboo' }]}
          rowSelection={{ onChange, preserveSelectedRowKeys: true }}
          rowKey="name"
        />,
      );
      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(
        ['light', 'bamboo'],
        [{ name: 'light' }, { name: 'bamboo' }],
        { type: 'single' },
      );
    });

    it('cache with preserveSelectedRowKeys and checkStrictly false', () => {
      const onChange = jest.fn();
      const { container, rerender } = render(
        <Table
          dataSource={[{ name: 'light' }, { name: 'bamboo' }]}
          rowSelection={{ onChange, preserveSelectedRowKeys: true, checkStrictly: false }}
          rowKey="name"
        />,
      );

      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(['light'], [{ name: 'light' }], { type: 'single' });

      rerender(
        <Table
          dataSource={[{ name: 'bamboo' }]}
          rowSelection={{ onChange, preserveSelectedRowKeys: true, checkStrictly: false }}
          rowKey="name"
        />,
      );
      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(
        ['light', 'bamboo'],
        [{ name: 'light' }, { name: 'bamboo' }],
        { type: 'single' },
      );
    });

    it('works with receive selectedRowKeys from [] to undefined', () => {
      const onChange = jest.fn();
      const dataSource = [{ name: 'Jack' }];
      const { container, rerender } = render(
        <Table
          dataSource={dataSource}
          rowSelection={{ onChange, selectedRowKeys: [0] }}
          rowKey="name"
        />,
      );

      rerender(
        <Table
          dataSource={dataSource}
          rowSelection={{ onChange, selectedRowKeys: undefined }}
          rowKey="name"
        />,
      );

      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(['Jack'], [{ name: 'Jack' }], { type: 'single' });
    });

    it('works with selectionType radio receive selectedRowKeys from [] to undefined', () => {
      const onChange = jest.fn();
      const dataSource = [{ name: 'Jack' }];
      const { container, rerender } = render(
        <Table
          dataSource={dataSource}
          rowSelection={{ onChange, selectedRowKeys: [0], type: 'radio' }}
          rowKey="name"
        />,
      );
      rerender(
        <Table
          dataSource={dataSource}
          rowSelection={{ onChange, selectedRowKeys: undefined, type: 'radio' }}
          rowKey="name"
        />,
      );

      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(['Jack'], [{ name: 'Jack' }], { type: 'single' });
    });

    it('selectedRows ant selectedKeys should keep sync in initial state', () => {
      const dataSource = [{ name: 'Jack' }, { name: 'Tom' }, { name: 'Lucy' }, { name: 'John' }];
      const onChange = jest.fn();
      const rowSelection = {
        preserveSelectedRowKeys: true,
        onChange,
        selectedRowKeys: ['Jack'],
      };
      const { container, rerender } = render(
        <Table
          dataSource={dataSource.slice(0, 2)}
          rowSelection={rowSelection}
          rowKey="name"
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
          ]}
        />,
      );

      rerender(
        <Table
          dataSource={dataSource.slice(2, 4)}
          rowSelection={rowSelection}
          rowKey="name"
          columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        />,
      );
      fireEvent.click(container.querySelector('tbody input')!);
      expect(onChange).toHaveBeenCalledWith(
        ['Jack', 'Lucy'],
        [{ name: 'Jack' }, { name: 'Lucy' }],
        { type: 'single' },
      );
    });
  });
});
