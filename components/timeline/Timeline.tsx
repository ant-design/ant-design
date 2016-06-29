import React from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';
import splitObject from '../_util/splitObject';
export default class Timeline extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-timeline',
  }

  render() {
    const [{
      prefixCls, children, pending, className
    },restProps] = splitObject(this.props,
      ['prefixCls', 'children', 'pending','className']);
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = classNames({
      [prefixCls]: true,
      [`${prefixCls}-pending`]: !!pending,
      [className]: className,
    });
    return (
      <ul {...restProps} className={classString}>
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
