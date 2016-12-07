import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export interface FooterProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

export default class Footer extends React.Component<FooterProps, any> {

  static defaultProps = {
    prefixCls: 'ant-layout-footer',
  };

  render() {
    const [{ prefixCls, className }, others] = splitObject(this.props,
      ['prefixCls', 'className']);
    const footerCls = classNames({
      [prefixCls]: true,
      [className]: className,
    });
    return (
      <div className={footerCls} {...others}>
        {this.props.children}
      </div>
    );
  }
}
