import * as React from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
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
  direction?: 'ltr' | 'rtl';
  oneWay?: boolean;
}

const Operation = ({
  disabled,
  moveToLeft,
  moveToRight,
  leftArrowText = '',
  rightArrowText = '',
  leftActive,
  rightActive,
  className,
  style,
  direction,
  oneWay,
}: TransferOperationProps) => (
  <div className={className} style={style}>
    <Button
      type="primary"
      size="small"
      disabled={disabled || !rightActive}
      onClick={moveToRight}
      icon={direction !== 'rtl' ? <RightOutlined /> : <LeftOutlined />}
    >
      {rightArrowText}
    </Button>
    {!oneWay && (
      <Button
        type="primary"
        size="small"
        disabled={disabled || !leftActive}
        onClick={moveToLeft}
        icon={direction !== 'rtl' ? <LeftOutlined /> : <RightOutlined />}
      >
        {leftArrowText}
      </Button>
    )}
  </div>
);

export default Operation;
