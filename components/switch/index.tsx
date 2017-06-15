import React from 'react';
import PropTypes from 'prop-types';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';

export interface SwitchProps {
  prefixCls?: string;
  size?: 'small' | 'default';
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => any;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
}

export default class Switch extends React.Component<SwitchProps, any> {
  static defaultProps = {
    prefixCls: 'ant-switch',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/ant-design/ant-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string,
  };

  render() {
    const { prefixCls, size, className = '' } = this.props;
    const classes = classNames(className, {
      [`${prefixCls}-small`]: size === 'small',
    });
    return <RcSwitch {...this.props} className={classes} />;
  }
}
