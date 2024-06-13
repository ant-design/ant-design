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
    const { container } = render(
      <Table
        columns={data.columns}
        dataSource={data.data}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />,
    );

    fireEvent.click(container.querySelector('.ant-table-column-sorters')!);
    const sorter1 = onChange.mock.calls[0][2];
    expect(sorter1.order).toBe('ascend');
    expect(sorter1.field).toBe('age');

    const columnSorters = container.querySelectorAll('.ant-table-column-sorters');
    const fooSorterIcon = columnSorters[1];
    fireEvent.click(fooSorterIcon);
    const sorter2 = onChange.mock.calls[1][2];
    expect(sorter2.length).toBe(2);
    expect(sorter2[0].order).toBe('ascend');
    expect(sorter2[0].field).toBe('age');
    expect(sorter2[1].order).toBe('ascend');
    expect(sorter2[1].field).toBe('foo');
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
          <button className="change-column" type="button" onClick={handleClick}>
            change11
          </button>
        </>
      );
    };

    const { container } = render(<TableSorter />);

    fireEvent.click(container.querySelector('.ant-table-column-sorters')!);
    const sorter1 = onChange.mock.calls[0][2];
    expect(sorter1.order).toBe('ascend');
    expect(sorter1.field).toBe('age');

    const changeButton = container.querySelector('.change-column');
    fireEvent.click(changeButton!);

    const columnSorters = container.querySelectorAll('.ant-table-column-sorters');
    const fooSorterIcon = columnSorters[1];
    fireEvent.click(fooSorterIcon);
    const sorter2 = onChange.mock.calls[1][2];
    expect(sorter2.order).toBe('ascend');
    expect(sorter2.field).toBe('foo');
  });
});
