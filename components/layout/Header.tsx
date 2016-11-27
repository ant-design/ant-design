import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export interface HeaderProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

export default class Header extends React.Component<HeaderProps, any> {

  static defaultProps = {
    prefixCls: 'ant-layout-header',
  };

  render() {
    const [{ prefixCls, className }, others] = splitObject(this.props,
      ['prefixCls', 'className']);
    const headerCls = classNames({
      [prefixCls]: true,
      [className]: className,
    });
    return (
      <div className={headerCls} {...others}>
        {this.props.children}
      </div>
    );
  }
}
