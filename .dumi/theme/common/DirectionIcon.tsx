import React from 'react';
import Icon from '@ant-design/icons';
import type { DirectionType } from 'antd/es/config-provider';

const ltrD =
  'M448 64l512 0 0 128-128 0 0 768-128 0 0-768-128 0 0 768-128 0 0-448c-123.712 0-224-100.288-224-224s100.288-224 224-224zM64 448l256 224-256 224z';

const rtlD =
  'M256 64l512 0 0 128-128 0 0 768-128 0 0-768-128 0 0 768-128 0 0-448c-123.712 0-224-100.288-224-224s100.288-224 224-224zM960 896l-256-224 256-224z';

interface DirectionIconProps {
  className?: string;
  direction?: DirectionType;
}

const DirectionSvg: React.FC<DirectionIconProps> = (props) => {
  const { direction } = props;
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor">
      <path d={direction === 'ltr' ? ltrD : rtlD} />
    </svg>
  );
};

const DirectionIcon: React.FC<DirectionIconProps> = (props) => (
  <Icon {...props} component={() => <DirectionSvg direction={props.direction} />} />
);

export default DirectionIcon;
