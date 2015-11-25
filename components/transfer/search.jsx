import { Component, PropTypes } from 'react';

function noop() {
}

class TransferSearch extends Component {
  render() {

  }
}

TransferSearch.defaultProps = {
  prefixCls: 'ant-transfer-search',
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: noop,
  onDelete: noop,
};

TransferSearch.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TransferSearch;
