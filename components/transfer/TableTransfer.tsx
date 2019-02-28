import * as React from 'react';
import classNames from 'classnames';
import { TableProps } from '../table';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Transfer, { TransferProps } from './index';
import { TransferListProps } from './list';
import TableTransferBody from './TableTransferBody';

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
    const { direction } = listProps;
    const isPrimary = direction === 'left';
    const table = isPrimary ? generatePrimaryTable(this.props) : generateSecondaryTable(this.props);
    return <TableTransferBody table={table} {...listProps} />;
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
