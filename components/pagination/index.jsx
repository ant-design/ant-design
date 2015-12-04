import assign from 'object-assign';

import React from 'react';
import Pagination from 'rc-pagination';
import Select from '../select';
import zhCN from './locale/zh_CN';

const prefixCls = 'ant-pagination';

class MiniSelect extends React.Component {
  render() {
    return <Select size="small" {...this.props} />;
  }
}

MiniSelect.Option = Select.Option;

class AntPagination extends React.Component {
  render() {
    let className = this.props.className;

    if (this.props.simple) {
      // hijiking simple pagination
      let newProps = assign({}, this.props);
      delete newProps.simple;

      className += ' mini';

      return <Pagination selectComponentClass={MiniSelect}
        selectPrefixCls="ant-select"
        prefixCls={prefixCls}
        showSizeChanger
        showQuickJumper
        {...newProps} className={className}/>;
    }

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
  className: '',
};

export default AntPagination;
