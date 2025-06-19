import React from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

import Button from '../button';
import type { DirectionType } from '../config-provider';

export interface TransferOperationProps {
  className?: string;
  actions?: React.ReactNode[];
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

function getArrowIcon(type: 'left' | 'right', direction?: DirectionType) {
  const isRight = type === 'right';
  if (direction !== 'rtl') {
    return isRight ? <RightOutlined /> : <LeftOutlined />;
  }
  return isRight ? <LeftOutlined /> : <RightOutlined />;
}

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
    actions = [],
  } = props;

  function renderArrow(
    button: React.ReactNode,
    moveHandler: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | undefined,
    active: boolean | undefined,
    icon: React.ReactNode,
  ) {
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
  }

  function renderArrowButton(type: 'left' | 'right') {
    const isRight = type === 'right';
    const button = isRight ? actions[0] : actions[1];
    const moveHandler = isRight ? moveToRight : moveToLeft;
    const active = isRight ? rightActive : leftActive;
    const icon = getArrowIcon(type, direction);
    return renderArrow(button, moveHandler, !!active, icon);
  }

  return (
    <div className={className} style={style}>
      {renderArrowButton('right')}
      {!oneWay && renderArrowButton('left')}
      {actions.slice(oneWay ? 1 : 2)}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Actions.displayName = 'Actions';
}

export default Actions;
