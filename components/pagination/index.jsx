import React from 'react';
import Pagination from 'rc-pagination';
import Select from '../select';
import zhCN from './locale/zh_CN';

const prefixCls = 'ant-pagination';

const MiniSelect = React.createClass({
  render() {
    return <Select size="small" {...this.props} />;
  }
});

MiniSelect.Option = Select.Option;

class AntPagination extends React.Component {
  render() {
    let className = this.props.className;

    if (this.props.simple) {
      // hijiking simple pagination
      let newProps = {};
      for (let key in this.props) {
        if (this.props.hasOwnProperty(key)) {
          newProps[key] = this.props[key];
        }
      }

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
