import React from 'react';
import RcPagination from 'rc-pagination';
import Select from '../select';
import zhCN from './locale/zh_CN';

class MiniSelect extends React.Component {
  render() {
    return <Select size="small" {...this.props} />;
  }
}

MiniSelect.Option = Select.Option;

export default class Pagination extends React.Component {
  render() {
    let className = this.props.className;
    let selectComponentClass = Select;

    let locale;
    if (this.context.antLocale && this.context.antLocale.Pagination) {
      locale = this.context.antLocale.Pagination;
    } else {
      locale = this.props.locale;
    }

    if (this.props.size === 'small') {
      className += ' mini';
      selectComponentClass = MiniSelect;
    }

    return (
      <RcPagination selectComponentClass={selectComponentClass}
        selectPrefixCls="ant-select"
        {...this.props}
        locale={locale}
        className={className} />
    );
  }
}

Pagination.defaultProps = {
  locale: zhCN,
  className: '',
  prefixCls: 'ant-pagination',
};

Pagination.contextTypes = {
  antLocale: React.PropTypes.object,
};
