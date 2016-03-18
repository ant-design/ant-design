import React from 'react';
import classNames from 'classnames';

/* Exported as Timeline.Item */
class TimelineItem extends React.Component {
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
}

TimelineItem.defaultProps = {
  prefixCls: 'ant-timeline',
  color: 'blue',
  last: false,
  pending: false,
};

export default class Timeline extends React.Component {
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
}

Timeline.defaultProps = {
  prefixCls: 'ant-timeline',
};

Timeline.Item = TimelineItem;
