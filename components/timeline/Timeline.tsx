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
  reverse?: boolean;
}

export default class Timeline extends React.Component<TimelineProps, any> {
  static Item = TimelineItem as React.ClassicComponentClass<TimeLineItemProps>;
  static defaultProps = {
    prefixCls: 'ant-timeline',
  };

  render() {
    const {
      prefixCls,
      pending = null, pendingDot = <Icon type="loading" />,
      children, className, reverse = false,
      ...ulProps,
    } = this.props;
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = classNames(prefixCls, {
      [`${prefixCls}-pending`]: !!pending,
      [`${prefixCls}-reverse`]: !!reverse,
    }, className);

    const pendingItem = !!pending ? (
      <TimelineItem
        pending={!!pending}
        dot={pendingDot}
      >
        {pendingNode}
      </TimelineItem>
    ) : null;

    const timeLineItems = !!reverse
      ? [pendingItem, ...React.Children.toArray(children)]
      : [...React.Children.toArray(children), pendingItem];

    // Remove falsy items
    const falsylessItems = timeLineItems.filter(item => !!item);
    const itemsCount = React.Children.count(falsylessItems);
    const lastCls = `${prefixCls}-item-last`;
    const items = React.Children.map(falsylessItems, (ele: React.ReactElement<any>, idx) =>
      React.cloneElement(ele, {
        className: classNames([
          ele.props.className,
          !!reverse
            ? (idx === itemsCount - 1) && lastCls
            : !!pending ? (idx === itemsCount - 2) && lastCls
            : '',
        ]),
      }),
    );

    return (
      <ul {...ulProps} className={classString}>
        {items}
      </ul>
    );
  }
}
