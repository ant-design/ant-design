import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export interface LayoutProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

export default class Layout extends React.Component<LayoutProps, any> {
  static Header: any;
  static Footer: any;
  static Content: any;
  static Sider: any;

  static defaultProps = {
    prefixCls: 'ant-layout',
  };

  render() {
    const [{ prefixCls, className }, others] = splitObject(this.props,
      ['prefixCls', 'className']);
    const layoutCls = classNames({
      [prefixCls]: true,
      [className]: className,
    });
    return (
      <div className={layoutCls} {...others}>
        {this.props.children}
      </div>
    );
  }
}
