import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

// Timeline
export interface TimeLineItemProps {
  /** 指定圆圈颜色 */
  color?: string;
  dot?: React.ReactNode;
  pending?: boolean;
  style?: React.CSSProperties;
}

export default class TimelineItem extends React.Component<TimeLineItemProps, any> {
  static defaultProps = {
    prefixCls: 'ant-timeline',
    color: 'blue',
    last: false,
    pending: false,
  };

  render() {
    const [{
      prefixCls, color, last, children, pending, className, dot,
    }, restProps] = splitObject(this.props,
      ['prefixCls', 'color', 'last', 'children', 'pending', 'className', 'dot']);

    const itemClassName = classNames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-last`]: last,
      [`${prefixCls}-item-pending`]: pending,
      [className]: className,
    });

    const dotClassName = classNames({
      [`${prefixCls}-item-head`]: true,
      [`${prefixCls}-item-head-custom`]: dot,
      [`${prefixCls}-item-head-${color}`]: true,
    });

    return (
      <li {...restProps} className={itemClassName}>
        <div className={`${prefixCls}-item-tail`} />
        <div
          className={dotClassName}
          style={{ borderColor: /blue|red|green/.test(color) ? null : color }}
        >
          {dot}
        </div>
        <div className={`${prefixCls}-item-content`}>
          {children}
        </div>
      </li>
    );
  }
}
