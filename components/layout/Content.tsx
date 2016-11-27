import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export interface ContentProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

export default class Content extends React.Component<ContentProps, any> {

  static defaultProps = {
    prefixCls: 'ant-layout-content',
  };

  render() {
    const [{ prefixCls, className }, others] = splitObject(this.props,
      ['prefixCls', 'className']);
    const contentCls = classNames({
      [prefixCls]: true,
      [className]: className,
    });
    return (
      <div className={contentCls} {...others}>
        {this.props.children}
      </div>
    );
  }
}
