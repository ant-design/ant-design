import * as React from 'react';
import Button from '../button';

export interface TransferOperationProps {
  className?: string;
  leftArrowText?: string;
  rightArrowText?: string;
  moveToLeft?: React.MouseEventHandler<HTMLButtonElement>;
  moveToRight?: React.MouseEventHandler<HTMLButtonElement>;
  leftActive?: boolean;
  rightActive?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default class Operation extends React.Component<TransferOperationProps, any> {
  render() {
    const {
      disabled,
      moveToLeft,
      moveToRight,
      leftArrowText = '',
      rightArrowText = '',
      leftActive,
      rightActive,
      className,
      style,
    } = this.props;
    return (
      <div className={className} style={style}>
        <Button
          type="primary"
          size="small"
          disabled={disabled || !rightActive}
          onClick={moveToRight}
          icon="right"
        >
          {rightArrowText}
        </Button>
        <Button
          type="primary"
          size="small"
          disabled={disabled || !leftActive}
          onClick={moveToLeft}
          icon="left"
        >
          {leftArrowText}
        </Button>
      </div>
    );
  }
}
