import React from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

import Button from '../button/Button';
import type { DirectionType } from '../config-provider';

export interface TransferOperationProps {
  className?: string;
  actions: React.ReactNode[];
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

interface ActionProps {
  type: 'left' | 'right';
  actions: React.ReactNode[];
  moveToLeft?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  moveToRight?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  leftActive?: boolean;
  rightActive?: boolean;
  direction?: DirectionType;
  disabled?: boolean;
}

const Action: React.FC<ActionProps> = ({
  type,
  actions,
  moveToLeft,
  moveToRight,
  leftActive,
  rightActive,
  direction,
  disabled,
}) => {
  const isRight = type === 'right';
  const button = isRight ? actions[0] : actions[1];
  const moveHandler = isRight ? moveToRight : moveToLeft;
  const active = isRight ? rightActive : leftActive;
  const icon = getArrowIcon(type, direction);

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
};

const Actions: React.FC<TransferOperationProps> = (props) => {
  const { className, style, oneWay, actions, ...restProps } = props;

  return (
    <div className={className} style={style}>
      <Action type="right" actions={actions} {...restProps} />
      {!oneWay && <Action type="left" actions={actions} {...restProps} />}
      {actions.slice(oneWay ? 1 : 2)}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Actions.displayName = 'Actions';
}

export default Actions;
