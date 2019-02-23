import * as React from 'react';
import classNames from 'classnames';
import Table, { TableProps, TableRowSelection, PaginationConfig } from '../table';
import Empty from '../empty';
import Search from './search';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Transfer, { TransferProps } from './index';
import { TransferListProps } from './list';

export interface TableTransferProps<T> extends TransferProps {
  leftTable: TableProps<T>;
  rightTable: TableProps<T>;
}

function generatePrimaryTable<T>(props: TableTransferProps<T>) {
  return props.leftTable;
}

function generateSecondaryTable<T>(props: TableTransferProps<T>) {
  return props.rightTable;
}

class TableTransfer<T> extends React.Component<TableTransferProps<T>> {
  renderBody = (listProps: TransferListProps) => {
    const {
      direction,
      dataSource,
      checkedKeys,
      prefixCls,
      handleSelect,
      handleSelectAll,
    } = listProps;
    const { showSearch } = this.props;
    const isPrimary = direction === 'left';
    const { pagination, rowSelection = {}, ...tableProps } = isPrimary
      ? generatePrimaryTable(this.props)
      : generateSecondaryTable(this.props);

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

    const search = showSearch && (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          // onChange={this.handleFilter}
          // handleClear={this.handleClear}
          // placeholder={searchPlaceholder}
          // value={filter}
          // disabled={disabled}
        />
      </div>
    );

    const content = dataSource.length ? (
      <Table
        dataSource={dataSource as any}
        pagination={mergedPagination}
        rowSelection={mergedRowSelection}
        {...tableProps}
      />
    ) : (
      <Empty />
    );

    return (
      <div className={`${prefixCls}-body`}>
        {search}
        {content}
      </div>
    );
  };

  renderTransfer = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { dataSource, prefixCls: customizePrefixCls, className } = this.props;
    const prefixCls = getPrefixCls('transfer-table', customizePrefixCls);
    return (
      <Transfer
        body={this.renderBody}
        {...this.props}
        dataSource={dataSource as any}
        className={classNames(prefixCls, className)}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTransfer}</ConfigConsumer>;
  }
}

export default TableTransfer;
