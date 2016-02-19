import React from 'react';
import classNames from 'classnames';

export default props => {
  const { prefixCls = 'ant-card', className, children, extra, title, ...other } = props;
  const classString = classNames({
    [prefixCls]: true,
    [className]: !!className,
  });
  return (
    <div {...other} className={classString}>
      <div className={`${prefixCls}-head`}>
        <h3 className={`${prefixCls}-head-title`}>{title}</h3>
        <span className={`${prefixCls}-head-extra`}>{extra}</span>
      </div>
      <div className={`${prefixCls}-body`}>{children}</div>
    </div>
  );
};
