'use strict';

let Pagination = require('rc-pagination');
let React = require('react');

let prefixCls = 'ant-patination';

class AntPagination extends React.Component {
  render() {
    return <Pagination className={prefixCls} {...this.props} />;
  }
}

module.exports = AntPagination;
