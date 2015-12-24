import React, { Component, PropTypes } from 'react';
import Button from '../button';
import Icon from '../icon';

function noop() {
}

class TransferOperation extends Component {
  render() {
    const {
      moveToLeft,
      moveToRight,
      leftArrowText,
      rightArrowText,
      leftActive,
      rightActive,
      prefixCls,
    } = this.props;

    const moveToLeftButton = (
      <Button type="primary" disabled={!leftActive} onClick={moveToLeft}>
        {
          leftArrowText
            ? <Icon type="left" /> + leftArrowText
            : <Icon type="left" />
        }
      </Button>
    );

    const moveToRightButton = (
      <Button type="primary" disabled={!rightActive} onClick={moveToRight}>
        {
          rightArrowText
            ? rightArrowText + <Icon type="right" />
            : <Icon type="right" />
        }
      </Button>
    );

    return <div className={prefixCls}>
      {moveToLeftButton}
      {moveToRightButton}
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
