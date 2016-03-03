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

    let locale;
    if (this.context.locale && this.context.locale.Pagination) {
      locale = this.context.locale.Pagination;
    } else {
      locale = this.props.locale;
    }

    if (this.props.size === 'small') {
      className += ' mini';
      selectComponentClass = MiniSelect;
    }

    return (
      <Pagination selectComponentClass={selectComponentClass}
        selectPrefixCls="ant-select"
        {...this.props}
        locale={locale}
        className={className} />
    );
  }
}

AntPagination.defaultProps = {
  locale: zhCN,
  className: '',
  prefixCls: 'ant-pagination',
};

AntPagination.contextTypes = {
  locale: React.PropTypes.object,
};

export default AntPagination;
