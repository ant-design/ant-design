import React from 'react';
import classNames from 'classnames';

export default props => {
  const { prefixCls = 'ant-card', className, children, extra, bodyStyle, title, ...other } = props;
  const classString = classNames({
    [prefixCls]: true,
    [className]: !!className,
  });
  const head = title ? (
    <div className={`${prefixCls}-head`}>
      <h3 className={`${prefixCls}-head-title`}>{title}</h3>
    </div>
  ) : null;
  return (
    <div {...other} className={classString}>
      {head}
      {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
      <div className={`${prefixCls}-body`} style={bodyStyle}>{children}</div>
    </div>
  );
};
