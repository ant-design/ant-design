import React from 'react';
import Pagination from 'rc-pagination';
import Select from 'rc-select';

const prefixCls = 'ant-pagination';

export default class AntPagination extends React.Component {
  render() {
    let className = this.props.className;
    if (this.props.size === 'small') {
      className += ' mini';
    }
    return <Pagination selectComponentClass={Select}
      selectPrefixCls="ant-select"
      prefixCls={prefixCls}
      {...this.props} className={className} />;
  }
}
