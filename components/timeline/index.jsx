import React from 'react';
import classNames from 'classnames';

const TimelineItem = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-timeline',
      color: 'blue',
      last: false,
      pending: false,
    };
  },
  render() {
    const { prefixCls, color, last, children, pending } = this.props;
    const itemClassName = classNames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-last`]: last,
      [`${prefixCls}-item-pending`]: pending,
    });
    return (
      <li className={itemClassName}>
        <div className={`${prefixCls}-item-tail`} />
        <div className={`${prefixCls}-item-head ${prefixCls}-item-head-${color}`} />
        <div className={`${prefixCls}-item-content`}>{children}</div>
      </li>
    );
  }
});

const Timeline = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-timeline',
    };
  },
  render() {
    const { prefixCls, children, pending } = this.props;
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const className = classNames({
      [prefixCls]: true,
      [`${prefixCls}-pending`]: !!pending,
    });
    return (
      <ul className={className}>
        {
          React.Children.map(children, (ele, idx) =>
            React.cloneElement(ele, {
              last: idx === children.length - 1,
            })
          )
        }
        {(!!pending)
          ? <TimelineItem pending={!!pending}>{pendingNode}</TimelineItem>
          : null}
      </ul>
    );
  }
});

Timeline.Item = TimelineItem;

export default Timeline;
