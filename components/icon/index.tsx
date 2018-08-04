import * as React from 'react';
import classNames from 'classnames';
import { antDesignIcons } from '@ant-design/icons';
import ReactIcon from '@ant-design/icons-react';
import CustomIcon, { create } from './CustomIcon';

ReactIcon.add(...antDesignIcons);

export type IconRotateNumber = 15 | 30 | 45 | 60 | 75
  | 90 | 105 | 120 | 135 | 150 | 165 | 180 | 195 | 210
  | 225 | 240 | 270 | 285 | 300 | 315 | 330 | 345 | 360;

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
  svgStyle?: React.CSSProperties;
  svgClassName?: string;
  rotate?: IconRotateNumber;
  flip?: 'horizontal' | 'vertical' | 'both';
  fixedWidth?: true;
  prefixCls?: string;
}

const Icon: React.SFC<IconProps> = (props: IconProps) => {
  const {
    prefixCls = 'ant-icon',
    type, className = '', spin, flip, fixedWidth,
    svgClassName,
    onClick, style, rotate = 0, svgStyle = {},
  } = props;
  const classString = classNames(
    {
      [`anticon`]: true,
      [`anticon-spin`]: !!spin || type === 'loading',

    },
    className,
  );

  const svgClassString = classNames(
    {
      [`${prefixCls}-rotate-${rotate}`]: rotate,
      [`${prefixCls}-flip-${flip}`]: flip,
      [`${prefixCls}-fixed-width`]: fixedWidth,
    },
    svgClassName,
  );
  return (
    <i className={classString} style={style}>
      <ReactIcon
        className={svgClassString}
        type={type}
        onClick={onClick}
        style={svgStyle}
      />
    </i>
  );
};

export type IconType = React.SFC<IconProps> & {
  CustomIcon: typeof CustomIcon;
  create: typeof create;
};

(Icon as IconType).CustomIcon = CustomIcon;
(Icon as IconType).create = create;

export default Icon as IconType;
