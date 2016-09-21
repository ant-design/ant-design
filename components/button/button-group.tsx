import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export type ButtonSize = 'small' | 'large'

export interface ButtonGroupProps {
  size?: ButtonSize;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

export default function ButtonGroup(props: ButtonGroupProps) {
  const [{ prefixCls = 'ant-btn-group', size, className }, others] =
    splitObject(props, ['prefixCls', 'size', 'className']);

  // large => lg
  // small => sm
  const sizeCls = ({
    large: 'lg',
    small: 'sm',
  })[size] || '';

  const classes = classNames({
    [prefixCls]: true,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [className]: className,
  });

  return <div {...others} className={classes} />;
}
