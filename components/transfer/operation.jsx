import React, { Component, PropTypes } from 'react';
import Button from '../button';

function noop() {
}

class TransferOperation extends Component {
  render() {
    const { moveToLeft, moveToRight, leftArrowText, rightArrowText } = this.props;

    return <div style={{ width: '20%', display: 'inline-block'}}>
      <Button onClick={moveToRight}>{rightArrowText + '>'}</Button>
      <Button onClick={moveToLeft}>{'<' + leftArrowText}</Button>
    </div>;
  }
}

TransferOperation.defaultProps = {
  prefixCls: 'ant-transfer-operation',
  leftArrowText: '',
  rightArrowText: '',
  moveToLeft: noop,
  moveToRight: noop,
};

TransferOperation.propTypes = {
  prefixCls: PropTypes.string,
  leftArrowText: PropTypes.string,
  rightArrowText: PropTypes.string,
  moveToLeft: PropTypes.func,
  moveToRight: PropTypes.func,
};

export default TransferOperation;
