import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import * as React from 'react';

import { ConfigContext } from '../config-provider';
import { cloneElement } from '../_util/reactNode';
import type { TimelineItemProps } from './TimelineItem';
import TimelineItem from './TimelineItem';
import warning from '../_util/warning';

// CSSINJS
import useStyle from './style';

export interface TimelineProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending?: React.ReactNode;
  pendingDot?: React.ReactNode;
  style?: React.CSSProperties;
  reverse?: boolean;
  mode?: 'left' | 'alternate' | 'right';
  items?: TimelineItemProps[];
  children?: React.ReactNode;
}

type CompoundedComponent = React.FC<TimelineProps> & {
  Item: React.FC<TimelineItemProps>;
};

const Timeline: CompoundedComponent = (props) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    pending = null,
    pendingDot,
    children,
    className,
    rootClassName,
    reverse = false,
    items: itemsProp,
    mode = '' as TimelineProps['mode'],
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);
  const pendingNode = typeof pending === 'boolean' ? null : pending;

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(!children, 'Timeline', '`Timeline.Item` is deprecated. Please use `items` instead.');
  }

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const hasItems = 'items' in props;
  let items;
  let hasLabelItem;

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
    hasLabelItem = mergedItems.some((item) => !!item?.label);
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

    hasLabelItem = timeLineItems.some((item: React.ReactElement<any>) => !!item?.props?.label);
  }

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-pending`]: !!pending,
      [`${prefixCls}-reverse`]: !!reverse,
      [`${prefixCls}-${mode}`]: !!mode && !hasLabelItem,
      [`${prefixCls}-label`]: hasLabelItem,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );

  return wrapSSR(
    <ul {...restProps} className={classString}>
      {items}
    </ul>,
  );
};

Timeline.Item = TimelineItem;

if (process.env.NODE_ENV !== 'production') {
  Timeline.displayName = 'Timeline';
}

export default Timeline;
