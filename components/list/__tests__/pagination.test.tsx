import React from 'react';
import type { ListProps } from '..';
import List from '..';
import { fireEvent, render } from '../../../tests/utils';
import { noop } from '../../_util/warning';

interface DataSourceItem {
  name: string;
  key: React.Key;
}

describe('List.pagination', () => {
  const data: ListProps<DataSourceItem>['dataSource'] = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  const pagination = { className: 'my-page', pageSize: 2 };

  function createList(props?: ListProps<DataSourceItem>) {
    return (
      <List
        itemLayout="vertical"
        pagination={pagination}
        dataSource={data}
        renderItem={(item) => <List.Item key={item.key}>{item.name}</List.Item>}
        {...props}
      />
    );
  }

  function renderedNames(container: ReturnType<typeof render>['container']) {
    return Array.prototype.map.call(
      container.querySelectorAll('.ant-list-item'),
      (row: HTMLDivElement) => row.textContent,
    );
  }

  it('renders pagination correctly', () => {
    const { container } = render(createList());
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not show pager if pagination.hideOnSinglePage is true and only 1 page', () => {
    const { container: wrapper, rerender } = render(
      createList({ pagination: { pageSize: 3, hideOnSinglePage: true } }),
    );
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(1);
    rerender(createList({ pagination: { pageSize: 3, hideOnSinglePage: false } }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(1);
    rerender(createList({ pagination: { pageSize: 4, hideOnSinglePage: true } }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(0);
    rerender(createList({ pagination: { pageSize: 4, hideOnSinglePage: false } }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(1);
    rerender(createList({ pagination: { pageSize: 5, hideOnSinglePage: true } }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(0);
    rerender(createList({ pagination: { pageSize: 5, hideOnSinglePage: false } }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(1);
  });

  it('paginate data', () => {
    const { container: wrapper } = render(createList());
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy']);

    const paginationItems = wrapper.querySelectorAll('.ant-pagination-item');
    fireEvent.click(paginationItems[paginationItems.length - 1]);
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
  });

  it('repaginates when pageSize change', () => {
    const { container: wrapper, rerender } = render(createList());

    rerender(createList({ pagination: { pageSize: 1 } }));
    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });

  it('fires change event', () => {
    const handlePaginationChange = jest.fn();
    const { container: wrapper } = render(
      createList({
        pagination: {
          ...pagination,
          onChange: handlePaginationChange,
          onShowSizeChange: noop,
        },
      }),
    );

    const paginationItems = wrapper.querySelectorAll('.ant-pagination-item');
    fireEvent.click(paginationItems[paginationItems.length - 1]);

    expect(handlePaginationChange).toHaveBeenCalledWith(2, 2);
  });

  // https://github.com/ant-design/ant-design/issues/4532
  // https://codepen.io/afc163/pen/pWVRJV?editors=001
  it('should display pagination as prop pagination change between true and false', () => {
    const { container: wrapper, rerender } = render(createList());
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.ant-pagination-item')).toHaveLength(2);

    rerender(createList({ pagination: false }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(0);

    rerender(createList({ pagination }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.ant-pagination-item')).toHaveLength(2);

    fireEvent.click(wrapper.querySelector('.ant-pagination-item-2')!);
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);

    rerender(createList({ pagination: false }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(0);

    rerender(createList({ pagination: true as ListProps<DataSourceItem>['pagination'] }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(1);
    // Legacy code will make pageSize ping with 10, here we fixed to keep sync by current one
    expect(wrapper.querySelectorAll('.ant-pagination-item')).toHaveLength(2);
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
  });

  // https://github.com/ant-design/ant-design/issues/5259
  it('change to correct page when data source changes', () => {
    const { container: wrapper, rerender } = render(createList({ pagination: { pageSize: 1 } }));
    fireEvent.click(wrapper.querySelector('.ant-pagination-item-3')!);
    rerender(createList({ dataSource: [data[0]] }));
    expect(wrapper.querySelector('.ant-pagination-item-1')).toHaveClass(
      'ant-pagination-item-active',
    );
  });

  it('specify the position of pagination', () => {
    const { container: wrapper, rerender } = render(
      createList({ pagination: { position: 'top' } }),
    );
    expect(wrapper.querySelector('.ant-list')?.querySelectorAll('.ant-pagination')).toHaveLength(1);

    rerender(createList({ pagination: { position: 'bottom' } }));
    expect(
      wrapper.querySelector('.ant-list')?.lastElementChild?.querySelectorAll('.ant-pagination'),
    ).toHaveLength(1);

    rerender(createList({ pagination: { position: 'both' } }));
    expect(wrapper.querySelectorAll('.ant-pagination')).toHaveLength(2);
    expect(
      wrapper.querySelector('.ant-list')?.firstElementChild?.querySelectorAll('.ant-pagination'),
    ).toHaveLength(1);
    expect(
      wrapper.querySelector('.ant-list')?.lastElementChild?.querySelectorAll('.ant-pagination'),
    ).toHaveLength(1);
  });

  it('should change page size work', () => {
    const { container: wrapper } = render(createList({ pagination: { showSizeChanger: true } }));
    expect(wrapper.querySelector('.ant-pagination')).toMatchSnapshot();

    fireEvent.mouseDown(wrapper.querySelector('.ant-select-selector')!);
    fireEvent.click(wrapper.querySelectorAll('.ant-select-item-option')[2]);

    fireEvent.mouseDown(wrapper.querySelector('.ant-select-selector')!);
    expect(wrapper.querySelector('.ant-pagination')).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/24913
  // https://github.com/ant-design/ant-design/issues/24501
  it('should onChange called when pageSize change', () => {
    const handlePaginationChange = jest.fn();
    const handlePageSizeChange = () => {};
    const { container: wrapper } = render(
      createList({
        pagination: {
          ...pagination,
          showSizeChanger: true,
          onChange: handlePaginationChange,
          onShowSizeChange: handlePageSizeChange,
        },
      }),
    );

    fireEvent.mouseDown(wrapper.querySelector('.ant-select-selector')!);
    fireEvent.click(wrapper.querySelectorAll('.ant-select-item-option')[1]);
    expect(handlePaginationChange).toHaveBeenCalledWith(1, 10);
  });

  it('should default work', () => {
    const { container: wrapper } = render(
      createList({
        pagination: {
          defaultPageSize: 3,
          defaultCurrent: 2,
          pageSizeOptions: ['1', '3'],
          showSizeChanger: true,
        },
      }),
    );

    expect(wrapper.querySelector('.ant-pagination')).toMatchSnapshot();
  });

  it('should not crash when pagination is null', () => {
    render(createList({ pagination: null as unknown as ListProps<DataSourceItem>['pagination'] }));
  });

  // https://github.com/ant-design/ant-design/issues/39496
  it('should not crash when pagination pageSize is not defined', () => {
    expect(() => {
      render(
        createList({
          pagination: {
            pageSize: undefined,
          },
        }),
      );
    }).not.toThrow();
  });

  it('pagination button should be displayed normally, when the paginator total is not defined', () => {
    const { container } = render(
      createList({
        pagination: { total: undefined },
        dataSource: Array.from({ length: 11 }, (_, key) => ({ key, name: `name${key}` })),
      }),
    );

    expect(container.querySelector('.ant-pagination')).toMatchSnapshot();
  });
});
