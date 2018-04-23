import * as React from 'react';
import classNames from 'classnames';
import TimelineItem, { TimeLineItemProps } from './TimelineItem';
import Icon from '../icon';

export interface TimelineProps {
  prefixCls?: string;
  className?: string;
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending?: React.ReactNode;
  pendingDot?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Timeline extends React.Component<TimelineProps, any> {
  static Item = TimelineItem as React.ClassicComponentClass<TimeLineItemProps>;
  static defaultProps = {
    prefixCls: 'ant-timeline',
  };

  render() {
    const { prefixCls, children, pending, pendingDot, className, ...restProps } = this.props;
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = classNames(prefixCls, {
      [`${prefixCls}-pending`]: !!pending,
    }, className);
    // Remove falsy items
    const truthyItems = React.Children.toArray(children).filter(item => !!item);
    const items = React.Children.map(truthyItems, (ele: React.ReactElement<any>, idx) =>
      React.cloneElement(ele, {
        last: idx === (React.Children.count(truthyItems) - 1),
      }),
    );
    const pendingItem = (!!pending) ? (
      <TimelineItem
        pending={!!pending}
        dot={pendingDot || <Icon type="loading" />}
      >
        {pendingNode}
      </TimelineItem>
    ) : null;
    return (
      <ul {...restProps} className={classString}>
        {items}
        {pendingItem}
      </ul>
    );
  }
}
