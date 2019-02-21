import * as React from 'react';
import Table from '../table';
import Transfer, { TransferProps } from './index';
import { TransferListProps } from './list';

class TableTransfer extends React.Component<TransferProps> {
  renderBody = (props: TransferListProps) => {
    return (
      <Table />
    );
  };

  render() {
    return <Transfer body={this.renderBody} {...this.props} />;
  }
}

export default TableTransfer;
