import * as React from 'react';
import classNames from 'classnames';

export interface TimeLineItemProps {
  prefixCls?: string;
  className?: string;
  color?: string;
  dot?: React.ReactNode;
  pending?: boolean;
  style?: React.CSSProperties;
}

export default class TimelineItem extends React.Component<TimeLineItemProps, any> {
  static defaultProps = {
    prefixCls: 'ant-timeline',
    color: 'blue',
    pending: false,
  };

  render() {
    const { prefixCls, className, color = '', children, pending, dot, ...restProps } = this.props;

    const itemClassName = classNames(
      {
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-pending`]: pending,
      },
      className,
    );

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
          style={{ borderColor: /blue|red|green/.test(color) ? undefined : color }}
        >
          {dot}
        </div>
        <div className={`${prefixCls}-item-content`}>{children}</div>
      </li>
    );
  }
}
