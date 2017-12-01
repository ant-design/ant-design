import * as React from 'react';
import Button from '../button';

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

export default class Operation extends React.Component<TransferOperationProps, any> {
  render() {
    const {
      moveToLeft = noop,
      moveToRight = noop,
      leftArrowText = '',
      rightArrowText = '',
      leftActive,
      rightActive,
      className,
    } = this.props;
    return (
      <div className={className}>
        <Button
          type="primary"
          size="small"
          disabled={!leftActive}
          onClick={moveToLeft}
          icon="left"
        >
          {leftArrowText}
        </Button>
        <Button
          type="primary"
          size="small"
          disabled={!rightActive}
          onClick={moveToRight}
          icon="right"
        >
          {rightArrowText}
        </Button>
      </div>
    );
  }
}
