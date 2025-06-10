import React, { useState } from 'react';

import Table from '..';
import { render, fireEvent } from '../../../tests/utils';

describe('Sorter.value.test.tsx', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  afterEach(() => {
    errorSpy.mockReset();
  });
  afterAll(() => {
    errorSpy.mockRestore();
  });

  interface stateType {
    columns: Array<{
      title: string;
      dataIndex: string;
      sorter: {
        multiple: number;
      };
    }>;
    data: Array<{
      key: React.Key;
      age?: number;
      foo?: string;
      name?: string;
    }>;
  }

  const data = {
    columns: [
      {
        title: 'Age',
        dataIndex: 'age',
        sorter: {
          multiple: 2,
        },
      },
      {
        title: 'foo',
        dataIndex: 'foo',
        sorter: {
          multiple: 2,
        },
      },
    ],
    data: [
      {
        key: '1',
        age: 32,
        foo: 'foo',
      },
      {
        key: '2',
        age: 33,
        foo: 'bar',
      },
    ],
  };

  it('should call onChange with correct sorter value when clicked', () => {
    const onChange = jest.fn();
    const TableSorter: React.FC = () => {
      const [tableData, setTableData] = useState(data.data);
      const columns = [
        {
          title: 'Age',
          dataIndex: 'age',
          sorter: {
            multiple: 2,
          },
        },
        {
          title: 'foo',
          dataIndex: 'foo',
          sorter: {
            multiple: 2,
          },
        },
      ];
      const handleClick = () => {
        setTableData([
          {
            key: '1',
            age: 22,
            foo: 'foo1',
          },
          {
            key: '2',
            age: 23,
            foo: 'foo2',
          },
          {
            key: '3',
            age: 12,
            foo: 'foo3',
          },
        ]);
      };
      return (
        <>
          <Table
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
          />
          <button type="button" className="change-column" onClick={handleClick}>
            resetData
          </button>
        </>
      );
    };
    const { container } = render(<TableSorter />);
    fireEvent.click(container.querySelector('.ant-table-column-sorters')!);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        order: 'ascend',
        field: 'age',
      }),
      expect.anything(),
    );
    const columnSorters = container.querySelectorAll('.ant-table-column-sorters');
    const fooSorterIcon = columnSorters[1];
    fireEvent.click(fooSorterIcon);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.arrayContaining([
        expect.objectContaining({
          order: 'ascend',
          field: 'age',
        }),
        expect.objectContaining({
          order: 'ascend',
          field: 'foo',
        }),
      ]),
      expect.anything(),
    );
    const changeButton = container.querySelector('.change-column');
    fireEvent.click(changeButton!);
    const getNameColumn = () => container.querySelector('th');
    expect(
      getNameColumn()?.querySelector('.ant-table-column-sorter-up')?.className.includes('active'),
    ).toBeTruthy();
    fireEvent.click(container.querySelector('.ant-table-column-sorters')!);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.arrayContaining([
        expect.objectContaining({
          order: 'ascend',
          field: 'foo',
        }),
        expect.objectContaining({
          order: 'descend',
          field: 'age',
        }),
      ]),
      expect.anything(),
    );
    expect(
      getNameColumn()?.querySelector('.ant-table-column-sorter-down')?.className.includes('active'),
    ).toBeTruthy();
  });

  it('onChange should be called with the correct sorter value when clicked when the column changes', () => {
    const onChange = jest.fn();
    const TableSorter: React.FC = () => {
      const [tableData, setTableData] = useState<stateType>(data);
      const handleClick = () => {
        setTableData({
          columns: [
            {
              title: 'name',
              dataIndex: 'name',
              sorter: {
                multiple: 2,
              },
            },
            {
              title: 'foo',
              dataIndex: 'foo',
              sorter: {
                multiple: 2,
              },
            },
          ],
          data: [
            {
              key: 'sxzz',
              name: 'sxzz',
              foo: 'foo',
            },
            {
              key: 'innei',
              name: 'innei',
              foo: 'bar',
            },
          ],
        });
      };
      return (
        <>
          <Table
            columns={tableData.columns}
            dataSource={tableData.data}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
          />
          <button type="button" className="change-column" onClick={handleClick}>
            change11
          </button>
        </>
      );
    };
    const { container } = render(<TableSorter />);
    fireEvent.click(container.querySelector('.ant-table-column-sorters')!);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        order: 'ascend',
        field: 'age',
      }),
      expect.anything(),
    );
    const changeButton = container.querySelector('.change-column');
    fireEvent.click(changeButton!);
    const columnSorters = container.querySelectorAll('.ant-table-column-sorters');
    const fooSorterIcon = columnSorters[1];
    fireEvent.click(fooSorterIcon);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        order: 'ascend',
        field: 'foo',
      }),
      expect.anything(),
    );
  });
});
