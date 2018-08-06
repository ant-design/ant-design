import * as React from 'react';
import classNames from 'classnames';
import { antDesignIcons } from '@ant-design/icons';
import ReactIcon from '@ant-design/icons-react';
import CustomIcon from './CustomIcon';
import create from './IconFont';

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
    // prefixCls = 'ant-icon',
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

    },
    className,
  );

  const svgClassString = classNames(
    svgClassName,
  );

  const computedSvgStyle: React.CSSProperties = {
    transform: `${rotate ? `rotate(${rotate}deg)` : ''} `
      + `${(flip === 'horizontal' || flip === 'both') ? `scaleX(-1)` : ''} `
      + `${(flip === 'vertical' || flip === 'both') ? `scaleY(-1)` : ''}`,
    ...svgStyle,
  };

  return React.createElement(
    tag,
    {
      className: classString,
      style,
      onClick,
    },
    <ReactIcon
      className={svgClassString}
      type={type}
      style={computedSvgStyle}
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
