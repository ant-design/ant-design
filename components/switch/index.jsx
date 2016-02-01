import Switch from 'rc-switch';
import React from 'react';
import classNames from 'classnames';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-switch',
    };
  },
  render() {
    const { prefixCls, size, className } = this.props;
    const cls = classNames({
      [className]: !!className,
      [`${prefixCls}-small`]: size === 'small',
    });
    return <Switch className={cls} {...this.props} />;
  }
});
