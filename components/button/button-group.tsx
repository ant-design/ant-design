import React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'small' | 'large';

export interface ButtonGroupProps {
  size?: ButtonSize;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

export default function ButtonGroup(props: ButtonGroupProps) {
  const { prefixCls = 'ant-btn-group', size = '', className, ...others } = props;

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
    default:
      break;
  }

  const classes = classNames(prefixCls, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
  }, className);

  return <div {...others} className={classes} />;
}
