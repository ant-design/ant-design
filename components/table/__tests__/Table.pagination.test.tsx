/* eslint-disable import/first */
jest.mock('../../_util/scrollTo');

import React from 'react';
import type { TablePaginationConfig, TableProps } from '..';
import Table from '..';
import { act, fireEvent, render } from '../../../tests/utils';
import scrollTo from '../../_util/scrollTo';
import { resetWarned } from '../../_util/warning';

describe('Table.pagination', () => {
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

  const longData: any[] = [];
  for (let i = 0; i < 100; i += 1) {
    longData.push({ key: i, name: `${i}` });
  }

  const pagination = { className: 'my-page', pageSize: 2 };

  function createTable(props?: TableProps<any>) {
    return <Table columns={columns} dataSource={data} pagination={pagination} {...props} />;
  }

  function renderedNames(container: ReturnType<typeof render>['container']) {
    // --- reserve comment for code review ---
    // return wrapper.find('BodyRow').map(row => row.props().record.name);
    const namesList: (Node['textContent'] | undefined)[] = [];
    container
      .querySelector('.ant-table-tbody')
      ?.querySelectorAll('tr')
      ?.forEach((tr) => {
        namesList.push(tr.querySelector('td')?.textContent);
      });
    return namesList;
  }

  it('renders pagination correctly', () => {
    const { asFragment } = render(createTable());
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('not crash when pageSize is undefined', () => {
    expect(() => {
      render(createTable({ pagination: { pageSize: undefined } }));
    }).not.toThrow();
  });

  it('should not show pager if pagination.hideOnSinglePage is true and only 1 page', () => {
    const { container, rerender } = render(
      createTable({ pagination: { pageSize: 3, hideOnSinglePage: true } }),
    );
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
    rerender(createTable({ pagination: { pageSize: 3, hideOnSinglePage: false } }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
    rerender(createTable({ pagination: { pageSize: 4, hideOnSinglePage: true } }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(0);
    rerender(createTable({ pagination: { pageSize: 4, hideOnSinglePage: false } }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
    rerender(createTable({ pagination: { pageSize: 5, hideOnSinglePage: true } }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(0);
    rerender(createTable({ pagination: { pageSize: 5, hideOnSinglePage: false } }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
  });

  it('should use pageSize when defaultPageSize and pageSize are both specified', () => {
    const { container } = render(createTable({ pagination: { pageSize: 3, defaultPageSize: 4 } }));
    expect(container.querySelectorAll('.ant-pagination-item')).toHaveLength(2);
  });

  it('paginate data', () => {
    const { container } = render(createTable());

    expect(renderedNames(container)).toEqual(['Jack', 'Lucy']);
    fireEvent.click(container.querySelector('.ant-pagination-next')!);
    expect(renderedNames(container)).toEqual(['Tom', 'Jerry']);
  });

  it('repaginates when pageSize change', () => {
    const { container, rerender } = render(createTable());
    rerender(createTable({ pagination: { pageSize: 1 } }));
    expect(renderedNames(container)).toEqual(['Jack']);
  });

  // https://github.com/ant-design/ant-design/issues/33487
  it('should not crash when trigger onChange in render', () => {
    function App() {
      const [page, setPage] = React.useState({ current: 1, pageSize: 10 });
      const onChange: TablePaginationConfig['onChange'] = (current, pageSize) => {
        setPage({ current, pageSize });
      };
      return (
        <Table
          dataSource={[]}
          pagination={{
            ...page,
            onChange,
          }}
        />
      );
    }
    const { asFragment } = render(<App />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should accept pagination size', () => {
    const { container } = render(
      createTable({
        pagination: { size: 'small' },
      }),
    );
    expect(container.querySelectorAll('.ant-pagination.ant-pagination-mini')).toHaveLength(1);
  });

  it('should scroll to first row when page change', () => {
    (scrollTo as any).mockReturnValue(null);

    const { container } = render(
      createTable({ scroll: { y: 20 }, pagination: { showSizeChanger: true, pageSize: 2 } }),
    );
    expect(scrollTo).toHaveBeenCalledTimes(0);

    fireEvent.click(container.querySelector('.ant-pagination-next')!);
    expect(scrollTo).toHaveBeenCalledTimes(1);

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    fireEvent.click(container.querySelectorAll('.ant-select-item')[1]);
    expect(scrollTo).toHaveBeenCalledTimes(2);
  });

  it('should scroll inside .ant-table-body', () => {
    (scrollTo as any).mockImplementationOnce(
      (top: number, { getContainer }: { getContainer: () => HTMLElement }) => {
        expect(top).toBe(0);
        expect(getContainer().className).toBe('ant-table-body');
      },
    );
    const { container } = render(
      createTable({ scroll: { y: 20 }, pagination: { showSizeChanger: true, pageSize: 2 } }),
    );
    fireEvent.click(container.querySelector('.ant-pagination-next')!);
  });

  it('fires change event', () => {
    const handleChange = jest.fn();
    const handlePaginationChange = jest.fn();
    const noop = () => {};
    const { container } = render(
      createTable({
        pagination: { ...pagination, onChange: handlePaginationChange, onShowSizeChange: noop },
        onChange: handleChange,
      }),
    );
    fireEvent.click(container.querySelector('.ant-pagination-next')!);

    expect(handleChange).toHaveBeenCalledWith(
      { className: 'my-page', current: 2, pageSize: 2 },
      {},
      {},
      {
        currentDataSource: [
          { key: 0, name: 'Jack' },
          { key: 1, name: 'Lucy' },
          { key: 2, name: 'Tom' },
          { key: 3, name: 'Jerry' },
        ],
        action: 'paginate',
      },
    );

    expect(handlePaginationChange).toHaveBeenCalledWith(2, 2);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // https://codepen.io/afc163/pen/dVeNoP?editors=001
  it('should have pager when change pagination from false to undefined', () => {
    const { container, rerender } = render(createTable({ pagination: false }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(0);

    rerender(createTable({ pagination: undefined }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-pagination-item-active')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // https://codepen.io/afc163/pen/pWVRJV?editors=001
  it('should display pagination as prop pagination change between true and false', () => {
    const { container, rerender } = render(createTable());
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-pagination-item')).toHaveLength(2);

    rerender(createTable({ pagination: false }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(0);

    rerender(createTable({ pagination }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-pagination-item')).toHaveLength(2);
    fireEvent.click(container.querySelector('.ant-pagination-item-2')!);
    expect(renderedNames(container)).toEqual(['Tom', 'Jerry']);

    rerender(createTable({ pagination: false }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(0);

    rerender(createTable({ pagination: undefined }));
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-pagination-item')).toHaveLength(2);
    expect(renderedNames(container)).toEqual(['Tom', 'Jerry']);
  });

  // https://github.com/ant-design/ant-design/issues/5259
  it('change to correct page when data source changes', () => {
    const { container, rerender } = render(createTable({ pagination: { pageSize: 1 } }));
    fireEvent.click(container.querySelector('.ant-pagination-item-3')!);
    rerender(createTable({ dataSource: [data[0]] }));
    expect(
      container
        .querySelector('.ant-pagination-item-1')
        ?.className.includes('ant-pagination-item-active'),
    ).toBe(true);
  });

  // https://github.com/ant-design/ant-design/issues/24913
  it('should called onChange when pageSize change', () => {
    const onChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const { container } = render(
      createTable({
        pagination: { current: 1, pageSize: 10, total: 200, onChange, onShowSizeChange },
      }),
    );

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(4);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[1]);
    expect(onChange).toHaveBeenCalledWith(1, 20);
  });

  it('should not change page when pagination current is specified', () => {
    const { container } = render(createTable({ pagination: { current: 2, pageSize: 1 } }));

    expect(
      container
        ?.querySelector('.ant-pagination-item-2')
        ?.className.includes('ant-pagination-item-active'),
    ).toBe(true);
    fireEvent.click(container.querySelector('.ant-pagination-item-3')!);
    expect(
      container
        ?.querySelector('.ant-pagination-item-2')
        ?.className.includes('ant-pagination-item-active'),
    ).toBe(true);
  });

  // https://github.com/ant-design/ant-design/issues/29175
  it('should change page to max page count when pageSize change without pagination.total', () => {
    const onChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const { container } = render(
      createTable({
        pagination: {
          current: 10,
          pageSize: 10,
          onChange,
          onShowSizeChange,
        },
        dataSource: longData,
      }),
    );
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(4);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[1]);
    const newPageSize = parseInt(
      container.querySelectorAll('.ant-select-item-option')?.[1]?.textContent!,
      10,
    );
    expect(onChange).toHaveBeenCalledWith(longData.length / newPageSize, 20);
  });

  it('should change page to max page count when pageSize change with pagination.total', () => {
    const onChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const total = 20000;
    const { container } = render(
      createTable({
        pagination: {
          current: total / 10,
          pageSize: 10,
          onChange,
          total,
          onShowSizeChange,
        },
        dataSource: longData,
      }),
    );

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(4);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[1]);
    const newPageSize = parseInt(
      container.querySelectorAll('.ant-select-item-option')?.[1]?.textContent!,
      10,
    );
    expect(onChange).toHaveBeenCalledWith(total / newPageSize, 20);
  });

  // https://github.com/ant-design/ant-design/issues/29175
  it('should not change page to max page if current is not greater max page when pageSize change', () => {
    const onChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const { container } = render(
      createTable({
        pagination: {
          current: 4,
          pageSize: 10,
          onChange,
          onShowSizeChange,
        },
        dataSource: longData,
      }),
    );
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(4);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[1]);
    expect(onChange).toHaveBeenCalledWith(4, 20);
  });

  it('should reset current to max page when data length is cut', () => {
    const onChange = jest.fn();
    const { container, rerender } = render(
      createTable({
        pagination: {
          current: 10,
          pageSize: 10,
          onChange,
        },
        dataSource: longData,
      }),
    );
    expect(container.querySelector('.ant-pagination-item-active')?.textContent).toBe('10');
    rerender(
      createTable({
        pagination: { current: 10, pageSize: 10, onChange },
        dataSource: longData.filter((item) => item.key < 60),
      }),
    );

    expect(container.querySelector('.ant-pagination-item-active')?.textContent).toBe('6');
  });

  it('specify the position of pagination', () => {
    const { container, rerender } = render(createTable({ pagination: { position: ['topLeft'] } }));
    expect(container.querySelector('.ant-spin-container')?.children).toHaveLength(2);
    expect(
      container
        ?.querySelector('.ant-spin-container')
        ?.children[0].className.includes('ant-pagination'),
    ).toBe(true);

    rerender(createTable({ pagination: { position: ['bottomRight'] } }));
    expect(container.querySelector('.ant-spin-container')?.children).toHaveLength(2);
    expect(
      container
        ?.querySelector('.ant-spin-container')
        ?.children[1].className.includes('ant-pagination'),
    ).toBe(true);

    rerender(createTable({ pagination: { position: ['topLeft', 'bottomRight'] } }));
    expect(container.querySelector('.ant-spin-container')?.children).toHaveLength(3);
    expect(
      container
        ?.querySelector('.ant-spin-container')
        ?.children[0].className.includes('ant-pagination'),
    ).toBe(true);
    expect(
      container
        ?.querySelector('.ant-spin-container')
        ?.children[2].className.includes('ant-pagination'),
    ).toBe(true);

    rerender(
      createTable({
        pagination: { position: ['none', 'none'] as unknown as TablePaginationConfig['position'] },
      }),
    );
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(0);

    rerender(
      createTable({
        pagination: { position: ['invalid'] as unknown as TablePaginationConfig['position'] },
      }),
    );
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);

    rerender(
      createTable({
        pagination: {
          position: ['invalid', 'invalid'] as unknown as TablePaginationConfig['position'],
        },
      }),
    );
    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(1);
  });

  /**
   * `pagination` is not designed to accept `true` value, but in practice, many people assign `true`
   * to `pagination`, since they misunderstand that `pagination` can accept a boolean value.
   */
  it('Accepts pagination as true', () => {
    const { asFragment } = render(createTable({ pagination: true as any } as TableProps<any>));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('ajax render should keep display by the dataSource', () => {
    const onChange = jest.fn();
    const onPaginationChange = jest.fn();

    const { container } = render(
      createTable({
        onChange,
        pagination: {
          total: 200,
          onChange: onPaginationChange,
        },
      }),
    );

    expect(container.querySelectorAll('.ant-table-tbody tr.ant-table-row')).toHaveLength(
      data.length,
    );

    fireEvent.click(container.querySelector('.ant-pagination .ant-pagination-item-2')!);
    expect(onChange.mock.calls[0][0].current).toBe(2);
    expect(onChange).toHaveBeenCalledWith(
      { current: 2, pageSize: 10, total: 200 },
      {},
      {},
      {
        currentDataSource: [
          { key: 0, name: 'Jack' },
          { key: 1, name: 'Lucy' },
          { key: 2, name: 'Tom' },
          { key: 3, name: 'Jerry' },
        ],
        action: 'paginate',
      },
    );
    expect(onPaginationChange).toHaveBeenCalledWith(2, 10);

    expect(container.querySelectorAll('.ant-table-tbody tr.ant-table-row')).toHaveLength(
      data.length,
    );
  });

  it('onShowSizeChange should trigger once', () => {
    jest.useFakeTimers();
    const onShowSizeChange = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      createTable({
        pagination: {
          total: 200,
          showSizeChanger: true,
          onShowSizeChange,
        },
        onChange,
      }),
    );

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    //  resolve Warning: An update to Align ran an effect, but was not wrapped in act(...)
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(4);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[3]);
    expect(onShowSizeChange).toHaveBeenCalledTimes(1);
    expect(onShowSizeChange).toHaveBeenLastCalledWith(1, 100);
    expect(onChange).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('should support current in pagination', () => {
    const { container } = render(createTable({ pagination: { current: 2, pageSize: 1 } }));
    expect(container.querySelector('.ant-pagination-item-active')?.textContent).toBe('2');
  });

  it('should support defaultCurrent in pagination', () => {
    const { container } = render(createTable({ pagination: { defaultCurrent: 2, pageSize: 1 } }));
    expect(container.querySelector('.ant-pagination-item-active')?.textContent).toBe('2');
  });

  it('should support defaultPageSize in pagination', () => {
    const { container } = render(createTable({ pagination: { defaultPageSize: 1 } }));
    expect(container.querySelectorAll('.ant-pagination-item')).toHaveLength(4);
  });

  // https://github.com/ant-design/ant-design/issues/19957
  it('ajax should work with pagination', () => {
    const { container, rerender } = render(createTable({ pagination: { total: 100 } }));

    fireEvent.click(container.querySelector('.ant-pagination-item-2')!);
    rerender(createTable({ pagination: { current: 2, total: 100 } }));

    expect(
      container
        ?.querySelector('.ant-pagination-item-2')
        ?.className.includes('ant-pagination-item-active'),
    ).toBeTruthy();
  });

  it('pagination should ignore invalidate total', () => {
    const { container } = render(
      createTable({ pagination: { total: null } as unknown as TableProps<any>['pagination'] }),
    );
    expect(container.querySelectorAll('.ant-pagination-item-1').length).toBeTruthy();
  });

  it('renders pagination topLeft and bottomRight', () => {
    const { asFragment } = render(
      createTable({
        pagination: ['topLeft', 'bottomRight'] as unknown as TableProps<any>['pagination'],
      }),
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should call onChange when change pagination size', () => {
    const onChange = jest.fn();
    const { container } = render(
      createTable({
        pagination: {
          total: 200,
          showSizeChanger: true,
        },
        onChange,
      }),
    );
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[2]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('dynamic warning', () => {
    resetWarned();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const dynamicData = [];
    for (let i = 0; i < 15; i += 1) {
      dynamicData.push({
        key: i,
        name: i,
      });
    }

    const { container } = render(
      createTable({
        dataSource: dynamicData,
        pagination: { total: 100, pageSize: 10, current: 2 },
      }),
    );

    expect(container.querySelectorAll('tbody tr')).toHaveLength(5);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] `dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.',
    );
  });

  it('should render pagination after last item on last page being removed', () => {
    const total = data.length;
    const paginationProp = {
      pageSize: 1,
      total,
      current: total,
      position: ['topLeft', 'bottomLeft'],
    };
    const { container, rerender } = render(
      createTable({ pagination: paginationProp } as TableProps<any>),
    );
    rerender(
      createTable({
        dataSource: data.slice(total - 1),
        pagination: { ...paginationProp, total: total - 1 },
      } as TableProps<any>),
    );

    expect(container.querySelectorAll('.ant-pagination')).toHaveLength(2);
  });

  it('showTotal should hide when removed', () => {
    const dataProp = { data: [] } as any;
    const Demo: React.FC = () => {
      const [p, setP] = React.useState<TablePaginationConfig>({
        showTotal: (t) => `>${t}<`,
        total: 200,
        current: 1,
        pageSize: 10,
      });
      return (
        <Table
          {...dataProp}
          columns={[]}
          pagination={p}
          onChange={(pg) => {
            setP({
              ...pg,
              total: 23,
            });
          }}
        />
      );
    };

    const { container } = render(<Demo />);
    expect(container.querySelector('.ant-pagination-total-text')?.textContent).toEqual('>200<');

    // Should hide
    fireEvent.click(container.querySelector('.ant-pagination-item-2')!);
    expect(container.querySelectorAll('.ant-pagination-total-text')).toHaveLength(0);
  });

  it('should preserve table pagination className', () => {
    const dataProp = { data: [] } as any;
    const { container } = render(
      <Table
        {...dataProp}
        columns={[]}
        pagination={{
          className: 'pagination',
          total: 200,
          current: 1,
          pageSize: 10,
        }}
      />,
    );
    expect(container.querySelector('.ant-pagination')?.className).toEqual(
      'ant-pagination ant-table-pagination ant-table-pagination-right pagination',
    );
  });
});
