import React from 'react';
import Pagination from 'rc-pagination';
import Select from '../select';
import zhCN from './locale/zh_CN';

class MiniSelect extends React.Component {
  render() {
    return <Select size="small" {...this.props} />;
  }
}

MiniSelect.Option = Select.Option;

class AntPagination extends React.Component {
  render() {
    let className = this.props.className;
    let selectComponentClass = Select;

    if (this.props.size === 'small') {
      className += ' mini';
      selectComponentClass = MiniSelect;
    }

    return <Pagination selectComponentClass={selectComponentClass}
                       selectPrefixCls="ant-select"
                       {...this.props}
                       className={className} />;
  }
}

AntPagination.defaultProps = {
  locale: zhCN,
  className: '',
  prefixCls: 'ant-pagination',
};

export default AntPagination;
