import React from 'react';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';

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

// TODO. remove after https://github.com/ant-design/ant-design/issues/487
AntPagination.locale = {
  en_US: enUS,
  zh_CN: zhCN,
};

export default AntPagination;
