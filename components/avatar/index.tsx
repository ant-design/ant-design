import React from 'react';
import Icon from '../icon';
import classNames from 'classnames';

export interface AvatarProps {
  /** Shape of avatar, options:`circle`, `square` */
  shape?: 'circle' | 'square';
  /** Size of avatar, options:`large`, `small`, `default` */
  size?: 'large' | 'small' | 'default';
  /** Src of image avatar */
  src?: string;
  /** Type of the Icon to be used in avatar */
  icon?: string;
  /** The icon or letter's color */
  color?: string;
  /** The backgroundColor of the avatar. Does not apply to image avatars */
  backgroundColor?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: any;
}

export default (props: AvatarProps) => {
  const {
    prefixCls = 'ant-avatar', shape = 'circle', size = 'default', src,
    icon, color, backgroundColor, className, ...others,
  } = props;

  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      sizeCls = '';
      break;
  }

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-image`]: src,
    [`${prefixCls}-icon`]: icon,
  });

  let children = props.children;
  if (src) {
    children = <img src={src} />;
  } else if (icon) {
    children = <Icon type={icon} />;
  }
  interface ColorStyle {
    color?: string;
    backgroundColor?: string;
  }
  const style: ColorStyle = {}; 
  if (color) {
    style.color = color;
  }
  if (backgroundColor) {
    style.backgroundColor = backgroundColor;
  }
  return (
    <span {...others} style={style} className={classString}>
      {children}
    </span>
  );
};

