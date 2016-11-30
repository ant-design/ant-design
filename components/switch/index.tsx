import React from 'react';
import { PropTypes } from 'react';
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
    size: 'default',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default']),
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
