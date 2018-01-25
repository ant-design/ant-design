import * as React from 'react';
import classNames from 'classnames';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
}

export default function Divider({
  prefixCls = 'ant',
  type = 'horizontal',
  className,
  children,
  dashed,
  ...restProps,
}: DividerProps) {
  const classString = classNames(
    className, `${prefixCls}-divider`, `${prefixCls}-divider-${type}`, {
    [`${prefixCls}-divider-with-text`]: children,
    [`${prefixCls}-divider-dashed`]: !!dashed,
  });
  return (
    <div className={classString} {...restProps}>
      {children && <span className={`${prefixCls}-divider-inner-text`}>{children}</span>}
    </div>
  );
}
