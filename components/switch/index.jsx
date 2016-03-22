import RcSwitch from 'rc-switch';
import React from 'react';
import classNames from 'classnames';

export default class Switch extends React.Component {
  render() {
    const { prefixCls, size, className } = this.props;
    const cls = classNames({
      [className]: !!className,
      [`${prefixCls}-small`]: size === 'small',
    });
    return <RcSwitch className={cls} {...this.props} />;
  }
}

Switch.defaultProps = {
  prefixCls: 'ant-switch',
};
