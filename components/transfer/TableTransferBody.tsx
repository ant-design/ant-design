import * as React from 'react';
import classNames from 'classnames';
import Table, { TableProps, TableRowSelection, PaginationConfig } from '../table';
import Empty from '../empty';
import Search from './search';
import { TransferListProps } from './list';

export interface TableTransferBodyProps<T> extends TransferListProps {
  table: TableProps<T>;
}

function defaultFilterOption<T extends { [name: string]: any }>(filter: string, item: T) {
  const keys = Object.keys(item);

  return keys.some(key => {
    const value = item[key];
    return String(value).indexOf(filter) !== -1;
  });
}

class TableTransferBody<T> extends React.Component<TableTransferBodyProps<T>> {
  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { handleFilter } = this.props;
    handleFilter(e);
  };

  render() {
    const {
      dataSource,
      checkedKeys,
      prefixCls,
      handleSelect,
      handleSelectAll,
      disabled,
      handleClear,
      searchPlaceholder,
      filter,
      showSearch,
      table,
      filterOption,
    } = this.props;

    const filterFunc = filterOption || defaultFilterOption;
    const { pagination, rowSelection = {}, ...tableProps } = table;

    // =========== Search  ===========
    const search = showSearch && (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.onSearchChange}
          handleClear={handleClear}
          placeholder={searchPlaceholder}
          value={filter}
          disabled={disabled}
        />
      </div>
    );

    // =========== Table  ===========
    // Set pagination to small size
    const mergedPagination: PaginationConfig = {
      size: 'small',
      hideOnSinglePage: true,
      ...pagination,
    };

    // Make selection as default
    const mergedRowSelection: TableRowSelection<T> = {
      ...rowSelection,
      onSelect(record, selected) {
        handleSelect(record, selected);
      },
      onSelectAll(selected, _, changedRows) {
        handleSelectAll(changedRows, !selected);
      },
      selectedRowKeys: checkedKeys,
    };

    let filteredDataSource = dataSource;
    if (showSearch && filter) {
      filteredDataSource = dataSource.filter(item => filterFunc(filter, item));
    }

    const content = filteredDataSource.length ? (
      <Table
        dataSource={filteredDataSource as any}
        pagination={mergedPagination}
        rowSelection={mergedRowSelection}
        {...tableProps}
      />
    ) : (
      <Empty />
    );

    return (
      <div
        className={classNames(`${prefixCls}-body`, {
          [`${prefixCls}-body-with-search`]: showSearch,
        })}
      >
        {search}
        {content}
      </div>
    );
  }
}

export default TableTransferBody;
