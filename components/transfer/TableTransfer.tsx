import * as React from 'react';
import Transfer, { TransferProps } from './index';

class TableTransfer extends React.Component<TransferProps> {
  render() {
    return <Transfer {...this.props} />;
  }
}

export default TableTransfer;
