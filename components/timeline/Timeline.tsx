import React from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';

export interface TimelineProps {
  prefixCls?: string;
  className?: string;
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Timeline extends React.Component<TimelineProps, any> {
  static Item: React.ReactNode;
  static defaultProps = {
    prefixCls: 'ant-timeline',
  };

  render() {
    const { prefixCls, children, pending, className, ...restProps } = this.props;
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = classNames(prefixCls, {
      [`${prefixCls}-pending`]: !!pending,
    }, className);
    const items = React.Children.map(children, (ele: React.ReactElement<any>, idx) =>
      React.cloneElement(ele, {
        last: idx === (children as { length: number }).length - 1,
      })
    );
    const pendingItem = (!!pending) ? (
      <TimelineItem pending={!!pending}>{pendingNode}</TimelineItem>
    ) : null;
    return (
      <ul {...restProps} className={classString}>
        {items}
        {pendingItem}
      </ul>
    );
  }
}
