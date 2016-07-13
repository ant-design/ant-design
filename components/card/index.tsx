import * as React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';
export default props => {
  const [{
    prefixCls = 'ant-card', className, extra, bodyStyle,
    title, loading, bordered = true,
  }, others] = splitObject(props,
    ['prefixCls', 'className', 'children', 'extra', 'bodyStyle', 'title', 'loading', 'bordered']);
  let children = props.children;
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
    <div {...others} className={classString}>
      {head}
      {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
      <div className={`${prefixCls}-body`} style={bodyStyle}>{children}</div>
    </div>
  );
};
