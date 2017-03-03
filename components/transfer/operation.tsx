import React from 'react';
import Button from '../button';
import Icon from '../icon';

function noop() {
}

export interface TransferOperationProps {
  className?: string;
  leftArrowText?: string;
  rightArrowText?: string;
  moveToLeft?: React.FormEventHandler<any>;
  moveToRight?: React.FormEventHandler<any>;
  leftActive?: boolean;
  rightActive?: boolean;
}

export default class TransferOperation extends React.Component<TransferOperationProps, any> {
  static defaultProps = {
    leftArrowText: '',
    rightArrowText: '',
    moveToLeft: noop,
    moveToRight: noop,
  };

  render() {
    const {
      moveToLeft,
      moveToRight,
      leftArrowText,
      rightArrowText,
      leftActive,
      rightActive,
      className,
    } = this.props;

    const moveToLeftButton = (
      <Button type="primary" size="small" disabled={!leftActive} onClick={moveToLeft}>
        {<span><Icon type="left" />{leftArrowText}</span>}
      </Button>
    );
    const moveToRightButton = (
      <Button type="primary" size="small" disabled={!rightActive} onClick={moveToRight}>
        {<span>{rightArrowText}<Icon type="right" /></span>}
      </Button>
    );
    return (
      <div className={className}>
        {moveToLeftButton}
        {moveToRightButton}
      </div>
    );
  }
}
