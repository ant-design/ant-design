import React, { Component, PropTypes } from 'react';
import Button from '../button';
import Icon from '../icon';

function noop() {
}

class TransferOperation extends Component {
  render() {
    const { moveToLeft, moveToRight, leftArrowText, rightArrowText, leftActive, rightActive, prefixCls } = this.props;

    return <div className={`${prefixCls}`}>
      { rightArrowText ? <Button type="primary" style={{ 'marginBottom': '4px' }} disabled={ !rightActive ? 'disabled' : false } onClick={moveToRight}>{rightArrowText}<Icon type="right" /></Button> :
        <Button type="primary" style={{ 'marginBottom': '4px' }} disabled={ !rightActive ? 'disabled' : false } onClick={moveToRight}><Icon type="right" /></Button>}
      {leftArrowText ? <Button type="primary" disabled={ !leftActive ? 'disabled' : false } onClick={moveToLeft}><Icon type="left" />{leftArrowText}</Button> :
        <Button type="primary" disabled={ !leftActive ? 'disabled' : false } onClick={moveToLeft}><Icon type="left" /></Button>}
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
