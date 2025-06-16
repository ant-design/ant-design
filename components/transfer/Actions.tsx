import React, { useCallback } from 'react';
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

type ButtonElementType = React.ReactElement<{
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const Actions: React.FC<TransferOperationProps> = (props) => {
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

  // General arrow render function for both directions
  const renderArrow = useCallback(
    (
      button: React.ReactNode,
      moveHandler: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | undefined,
      active: boolean | undefined,
      icon: React.ReactNode,
    ) => {
      // If it's a React element, try to pass necessary attributes
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

      // If it's not a React element, use default Button
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

  // Merge left and right arrow render into a general function
  const renderArrowButton = useCallback(
    (type: 'left' | 'right') => {
      const isRight = type === 'right';
      const button = isRight ? rightButton : leftButton;
      const moveHandler = isRight ? moveToRight : moveToLeft;
      const active = isRight ? rightActive : leftActive;
      const icon = (() => {
        if (direction !== 'rtl') {
          return isRight ? <RightOutlined /> : <LeftOutlined />;
        }
        return isRight ? <LeftOutlined /> : <RightOutlined />;
      })();
      return renderArrow(button, moveHandler, !!active, icon);
    },
    [
      renderArrow,
      rightButton,
      leftButton,
      moveToRight,
      moveToLeft,
      rightActive,
      leftActive,
      direction,
    ],
  );

  return (
    <div className={className} style={style}>
      {renderArrowButton('right')}
      {!oneWay && renderArrowButton('left')}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Actions.displayName = 'Actions';
}

export default Actions;
