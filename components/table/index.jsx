import React from 'react';
import Table from 'rc-table';

let AntTable = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-table',
      useFixedHeader: false
    };
  },
  render() {
    return <Table {...this.props} />;
  }
});

export default AntTable;
