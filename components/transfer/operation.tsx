import * as React from 'react';
import { useCallback } from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

import Button from '../button';
import type { DirectionType } from '../config-provider';

export interface TransferOperationProps {
  className?: string;
  leftArrowText?: React.ReactNode;
  rightArrowText?: React.ReactNode;
  moveToLeft?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  moveToRight?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  leftActive?: boolean;
  rightActive?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  direction?: DirectionType;
  oneWay?: boolean;
}

// 定义按钮元素的类型
type ButtonElementType = React.ReactElement<{
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const Operation: React.FC<TransferOperationProps> = (props) => {
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
    direction,
    oneWay,
  } = props;

  // 使用 useCallback 优化渲染函数，避免不必要的重新创建
  const renderRightArrow = useCallback(() => {
    // 如果是 React 元素，我们尝试传递必要的属性
    if (React.isValidElement(rightArrowText)) {
      const element = rightArrowText as ButtonElementType;
      const originalOnClick = element.props.onClick;

      // 创建新的 onClick 处理函数，结合原有的和 moveToRight
      const newOnClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
        event,
      ) => {
        if (originalOnClick) {
          originalOnClick(event);
        }
        if (moveToRight) {
          moveToRight(event);
        }
      };

      // 使用 cloneElement 创建新的元素，传递必要的属性
      return React.cloneElement(element, {
        disabled: disabled || !rightActive,
        onClick: newOnClick,
      });
    }

    // 如果不是 React 元素，使用默认的 Button
    return (
      <Button
        type="primary"
        size="small"
        disabled={disabled || !rightActive}
        onClick={moveToRight}
        icon={direction !== 'rtl' ? <RightOutlined /> : <LeftOutlined />}
      >
        {rightArrowText}
      </Button>
    );
  }, [disabled, direction, moveToRight, rightActive, rightArrowText]);

  // 使用 useCallback 优化渲染函数，避免不必要的重新创建
  const renderLeftArrow = useCallback(() => {
    // 如果是 React 元素，我们尝试传递必要的属性
    if (React.isValidElement(leftArrowText)) {
      const element = leftArrowText as ButtonElementType;
      const originalOnClick = element.props.onClick;

      // 创建新的 onClick 处理函数，结合原有的和 moveToLeft
      const newOnClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
        event,
      ) => {
        if (originalOnClick) {
          originalOnClick(event);
        }
        if (moveToLeft) {
          moveToLeft(event);
        }
      };

      // 使用 cloneElement 创建新的元素，传递必要的属性
      return React.cloneElement(element, {
        disabled: disabled || !leftActive,
        onClick: newOnClick,
      });
    }

    // 如果不是 React 元素，使用默认的 Button
    return (
      <Button
        type="primary"
        size="small"
        disabled={disabled || !leftActive}
        onClick={moveToLeft}
        icon={direction !== 'rtl' ? <LeftOutlined /> : <RightOutlined />}
      >
        {leftArrowText}
      </Button>
    );
  }, [disabled, direction, moveToLeft, leftActive, leftArrowText]);

  return (
    <div className={className} style={style}>
      {renderRightArrow()}
      {!oneWay && renderLeftArrow()}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Operation.displayName = 'Operation';
}

export default Operation;
