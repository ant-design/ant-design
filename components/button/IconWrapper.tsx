import React, { forwardRef } from 'react';
import classNames from 'classnames';

export type IconWrapperProps = {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const IconWrapper = forwardRef<HTMLSpanElement, IconWrapperProps>((props, ref) => {
  const { className, style, children, prefixCls } = props;

  const iconWrapperCls = classNames(`${prefixCls}-icon`, className);

  return (
    <span ref={ref} className={iconWrapperCls} style={style}>
      {children}
    </span>
  );
});

export default IconWrapper;
