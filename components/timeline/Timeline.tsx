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
  mode?: 'left' | 'alternate' | 'right';
}

export default class Timeline extends React.Component<TimelineProps, any> {
  static Item = TimelineItem as React.ClassicComponentClass<TimeLineItemProps>;
  static defaultProps = {
    prefixCls: 'ant-timeline',
    reverse: false,
    mode: '',
  };

  render() {
    const {
      prefixCls,
      pending = null,
      pendingDot,
      children,
      className,
      reverse,
      mode,
      ...restProps
    } = this.props;
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = classNames(
      prefixCls,
      {
        [`${prefixCls}-pending`]: !!pending,
        [`${prefixCls}-reverse`]: !!reverse,
        [`${prefixCls}-${mode}`]: !!mode,
      },
      className,
    );

    const pendingItem = !!pending ? (
      <TimelineItem pending={!!pending} dot={pendingDot || <Icon type="loading" />}>
        {pendingNode}
      </TimelineItem>
    ) : null;

    const timeLineItems = !!reverse
      ? [pendingItem, ...React.Children.toArray(children).reverse()]
      : [...React.Children.toArray(children), pendingItem];

    // Remove falsy items
    const truthyItems = timeLineItems.filter(item => !!item);
    const itemsCount = React.Children.count(truthyItems);
    const lastCls = `${prefixCls}-item-last`;
    const items = React.Children.map(truthyItems, (ele: React.ReactElement<any>, idx) =>
      React.cloneElement(ele, {
        className: classNames([
          ele.props.className,
          !reverse && !!pending
            ? idx === itemsCount - 2
              ? lastCls
              : ''
            : idx === itemsCount - 1
            ? lastCls
            : '',
          mode === 'alternate'
            ? idx % 2 === 0
              ? `${prefixCls}-item-left`
              : `${prefixCls}-item-right`
            : mode === 'right'
            ? `${prefixCls}-item-right`
            : '',
        ]),
      }),
    );

    return (
      <ul {...restProps} className={classString}>
        {items}
      </ul>
    );
  }
}
