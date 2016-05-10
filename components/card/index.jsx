import React from 'react';
import classNames from 'classnames';

export default props => {
  let { prefixCls = 'ant-card', className, children, extra, bodyStyle,
        title, loading, bordered = true, ...other } = props;
  const classString = classNames({
    [prefixCls]: true,
    [className]: !!className,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-bordered`]: bordered,
  });

  if (loading) {
    children = (
      <div>
        <p>████████████████████████</p>
        <p>██████　███████████████████</p>
        <p>██████████████　██████████</p>
        <p>█████　██████　█████████████</p>
        <p>███████████　██████████　███</p>
      </div>
    );
  }

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
