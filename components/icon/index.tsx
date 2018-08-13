import * as React from 'react';
import classNames from 'classnames';
import { antDesignIcons } from '@ant-design/icons';
import ReactIcon from '@ant-design/icons-react';
import CustomIcon from './CustomIcon';
import create from './IconFont';
import { getComputedSvgStyle } from './utils';

ReactIcon.add(...antDesignIcons);

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
  svgStyle?: React.CSSProperties;
  svgClassName?: string;
  rotate?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
  tag?: string;
  prefixCls?: string;
}

const Icon: React.SFC<IconProps> = (props: IconProps) => {
  const {
    type,
    className = '',
    spin,
    flip,
    svgClassName,
    tag = 'i',
    onClick,
    style,
    rotate = 0,
    svgStyle = {},
  } = props;
  const classString = classNames(
    {
      [`anticon`]: true,
      [`anticon-spin`]: !!spin || type === 'loading',
      [`anticon-${type}`]: true,
    },
    className,
  );

  return React.createElement(
    tag,
    {
      className: classString,
      style,
      onClick,
    },
    <ReactIcon
      className={svgClassName}
      type={type}
      style={getComputedSvgStyle({ rotate, flip }, svgStyle)}
    />,
  );
};

export type IconType = React.SFC<IconProps> & {
  CustomIcon: typeof CustomIcon;
  create: typeof create;
};

(Icon as IconType).CustomIcon = CustomIcon;
(Icon as IconType).create = create;

export default Icon as IconType;
