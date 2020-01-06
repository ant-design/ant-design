import * as React from 'react';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import TimelineItem, { TimeLineItemProps } from './TimelineItem';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

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
  static Item: React.SFC<TimeLineItemProps> = TimelineItem;

  static defaultProps = {
    reverse: false,
    mode: '',
  };

  renderTimeline = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      pending = null,
      pendingDot,
      children,
      className,
      reverse,
      mode,
      ...restProps
    } = this.props;
    const prefixCls = getPrefixCls('timeline', customizePrefixCls);
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = classNames(
      prefixCls,
      {
        [`${prefixCls}-pending`]: !!pending,
        [`${prefixCls}-reverse`]: !!reverse,
        [`${prefixCls}-${mode}`]: !!mode,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    const pendingItem = pending ? (
      <TimelineItem pending={!!pending} dot={pendingDot || <LoadingOutlined />}>
        {pendingNode}
      </TimelineItem>
    ) : null;

    const timeLineItems = reverse
      ? [pendingItem, ...React.Children.toArray(children).reverse()]
      : [...React.Children.toArray(children), pendingItem];

    const getPositionCls = (ele: React.ReactElement<any>, idx: number) => {
      if (mode === 'alternate') {
        if (ele.props.position === 'right') return `${prefixCls}-item-right`;
        if (ele.props.position === 'left') return `${prefixCls}-item-left`;
        return idx % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
      }
      if (mode === 'left') return `${prefixCls}-item-left`;
      if (mode === 'right') return `${prefixCls}-item-right`;
      if (ele.props.position === 'right') return `${prefixCls}-item-right`;
      return '';
    };

    // Remove falsy items
    const truthyItems = timeLineItems.filter(item => !!item);
    const itemsCount = React.Children.count(truthyItems);
    const lastCls = `${prefixCls}-item-last`;
    const items = React.Children.map(truthyItems, (ele: React.ReactElement<any>, idx) => {
      const pendingClass = idx === itemsCount - 2 ? lastCls : '';
      const readyClass = idx === itemsCount - 1 ? lastCls : '';
      return React.cloneElement(ele, {
        className: classNames([
          ele.props.className,
          !reverse && !!pending ? pendingClass : readyClass,
          getPositionCls(ele, idx),
        ]),
      });
    });

    return (
      <ul {...restProps} className={classString}>
        {items}
      </ul>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTimeline}</ConfigConsumer>;
  }
}
