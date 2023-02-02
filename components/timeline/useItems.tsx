import React from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';
import type { TimelineItemProps } from './TimelineItem';
import type { TimelineProps } from './Timeline';
import { cloneElement } from '../_util/reactNode';

function useItems(props: TimelineProps, prefixCls: string) {
  const {
    pending = null,
    children,
    className,
    items: itemsProp,
    reverse = false,
    mode = '' as TimelineProps['mode'],
    pendingDot,
  } = props;

  const getPositionCls = (position: string, idx: number) => {
    if (mode === 'alternate') {
      if (position === 'right') return `${prefixCls}-item-right`;
      if (position === 'left') return `${prefixCls}-item-left`;
      return idx % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
    }
    if (mode === 'left') return `${prefixCls}-item-left`;
    if (mode === 'right') return `${prefixCls}-item-right`;
    if (position === 'right') return `${prefixCls}-item-right`;
    return '';
  };

  const pendingNode = typeof pending === 'boolean' ? null : pending;
  const hasItems = 'items' in props;
  let items;
  let hasLabelItem;

  //  support items
  if (hasItems) {
    const mergedItems = (itemsProp || []).concat([]);
    if (pending) {
      mergedItems.push({
        pending: !!pending,
        dot: pendingDot || <LoadingOutlined />,
        content: pendingNode,
      });
    }

    if (reverse) {
      mergedItems.reverse();
    }
    const itemsCount = mergedItems.length;
    const lastCls = `${prefixCls}-item-last`;

    items = mergedItems
      .filter((item) => !!item)
      .map((item, idx) => {
        const pendingClass = idx === itemsCount - 2 ? lastCls : '';
        const readyClass = idx === itemsCount - 1 ? lastCls : '';
        return (
          <TimelineItem
            className={classNames([
              className,
              !reverse && !!pending ? pendingClass : readyClass,
              getPositionCls(item?.position ?? '', idx),
            ])}
            {...item}
            key={item.content as string}
          />
        );
      });
    hasLabelItem = mergedItems.some((item: TimelineItemProps) => !!item?.label);
  } else {
    const pendingItem = pending ? (
      <TimelineItem pending={!!pending} dot={pendingDot || <LoadingOutlined />}>
        {pendingNode}
      </TimelineItem>
    ) : null;

    const timeLineItems = React.Children.toArray(children);
    timeLineItems.push(pendingItem!);
    if (reverse) {
      timeLineItems.reverse();
    }
    // Remove falsy items
    const truthyItems = timeLineItems.filter((item) => !!item);
    const itemsCount = React.Children.count(truthyItems);
    const lastCls = `${prefixCls}-item-last`;
    items = React.Children.map(truthyItems, (ele: React.ReactElement<any>, idx) => {
      const pendingClass = idx === itemsCount - 2 ? lastCls : '';
      const readyClass = idx === itemsCount - 1 ? lastCls : '';
      return cloneElement(ele, {
        className: classNames([
          ele.props.className,
          !reverse && !!pending ? pendingClass : readyClass,
          getPositionCls(ele.props.position, idx),
        ]),
      });
    });

    hasLabelItem = timeLineItems.some((item: React.ReactElement) => !!item?.props?.label);
  }

  return {
    items,
    hasLabelItem,
  };
}

export default useItems;
