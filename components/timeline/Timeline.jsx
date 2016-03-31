import React from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';

export default class Timeline extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-timeline',
  }

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
