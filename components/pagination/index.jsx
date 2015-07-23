let React = require('react');
let Pagination = require('rc-pagination');
let Select = require('rc-select');

let prefixCls = 'ant-pagination';

class AntPagination extends React.Component {
  render() {
    return <Pagination selectComponentClass={Select}
      selectPrefixCls="ant-select"
      prefixCls={prefixCls}
      {...this.props} />;
  }
}

module.exports = AntPagination;
