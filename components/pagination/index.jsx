import React from 'react';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import zhCN from './locale/zh_CN';

const prefixCls = 'ant-pagination';

class AntPagination extends React.Component {
  render() {
    let className = this.props.className;
    if (this.props.size === 'small') {
      className += ' mini';
    }
    return <Pagination selectComponentClass={Select}
                       selectPrefixCls="ant-select"
                       prefixCls={prefixCls}
      {...this.props} className={className}/>;
  }
}

AntPagination.defaultProps = {
  locale: zhCN,
};

export default AntPagination;
