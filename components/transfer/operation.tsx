import * as React from 'react';
import { useCallback } from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

import Button from '../button';
import type { DirectionType } from '../config-provider';

export interface TransferOperationProps {
  className?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
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
    leftActive,
    rightActive,
    className,
    style,
    direction,
    oneWay,
    leftButton = '',
    rightButton = '',
  } = props;

  // 通用的箭头渲染函数，处理两种方向的按钮
  const renderArrow = useCallback(
    (
      button: React.ReactNode,
      moveHandler: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | undefined,
      active: boolean | undefined,
      icon: React.ReactNode,
    ) => {
      // 如果是 React 元素，尝试传递必要属性
      if (React.isValidElement(button)) {
        const element = button as ButtonElementType;

        const onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (event) => {
          element?.props?.onClick?.(event);
          moveHandler?.(event);
        };

        return React.cloneElement(element, {
          disabled: disabled || !active,
          onClick,
        });
      }

      // 如果不是 React 元素，使用默认的 Button
      return (
        <Button
          type="primary"
          size="small"
          disabled={disabled || !active}
          onClick={(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) =>
            moveHandler?.(event)
          }
          icon={icon}
        >
          {button}
        </Button>
      );
    },
    [disabled],
  );

  // 使用通用函数渲染右箭头
  const renderRightArrow = useCallback(
    () =>
      renderArrow(
        rightButton,
        moveToRight,
        !!rightActive,
        direction !== 'rtl' ? <RightOutlined /> : <LeftOutlined />,
      ),
    [renderArrow, rightButton, moveToRight, rightActive, direction],
  );

  // 使用通用函数渲染左箭头
  const renderLeftArrow = useCallback(
    () =>
      renderArrow(
        leftButton,
        moveToLeft,
        !!leftActive,
        direction !== 'rtl' ? <LeftOutlined /> : <RightOutlined />,
      ),
    [renderArrow, leftButton, moveToLeft, leftActive, direction],
  );

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
