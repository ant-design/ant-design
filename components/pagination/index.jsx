'use strict';

let Pagination = require('rc-pagination');
let React = require('react');

let prefixCls = 'ant-pagination';

class AntPagination extends React.Component {
  render() {
    return <Pagination selectPrefixCls="ant-select" prefixCls={prefixCls} {...this.props} />;
  }
}

module.exports = AntPagination;
