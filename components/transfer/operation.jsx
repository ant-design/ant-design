import React, { Component, PropTypes } from 'react';
import Button from '../button';

function noop() {
}

class TransferOperation extends Component {
  render() {
    const { moveToLeft, moveToRight, leftArrowText, rightArrowText, leftActive, rightActive, prefixCls } = this.props;

    return <div className={`${prefixCls}`}>
      <Button style={{ 'margin-bottom': '4px' }} disabled={ !rightActive ? 'disabled' : false } onClick={moveToRight}>{rightArrowText + '>'}</Button>
      <Button disabled={ !leftActive ? 'disabled' : false } onClick={moveToLeft}>{'<' + leftArrowText}</Button>
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
