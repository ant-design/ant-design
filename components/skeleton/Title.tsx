import * as React from 'react';
import classNames from 'classnames';

export interface SkeletonTitleProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  width?: number | string;
}

class Title extends React.Component<SkeletonTitleProps, any> {
  render() {
    const { prefixCls, className, width, style } = this.props;

    return <h3 className={classNames(prefixCls, className)} style={{ width, ...style }} />;
  }
}

export default Title;
