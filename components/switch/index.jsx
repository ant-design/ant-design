import Switch from 'rc-switch';
import React from 'react';
import classNames from 'classnames';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-switch',
      size: 'default',
    };
  },
  render() {
    const { prefixCls, size, className } = this.props;
    const cls = classNames({
      [className]: !!className,
      [prefixCls + '-' + size]: true,
    });
    return <Switch className={cls} {...this.props} />;
  }
});
