import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import * as React from 'react';

import { ConfigContext } from '../config-provider';
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
  Item?: React.FC<TimelineItemProps>;
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
    items,
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

  const mergedItems = items || [];

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

  const getPositionCls = (item: TimelineItemProps, idx: number) => {
    const { position } = item;
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

  const itemsCount = mergedItems.length;
  const lastCls = `${prefixCls}-item-last`;

  const ItemsDOM = mergedItems
    .filter((item) => !!item)
    .map((item, idx) => {
      const pendingClass = idx === itemsCount - 2 ? lastCls : '';
      const readyClass = idx === itemsCount - 1 ? lastCls : '';
      return (
        <TimelineItem
          className={classNames([
            className,
            !reverse && !!pending ? pendingClass : readyClass,
            getPositionCls(item, idx),
          ])}
          {...item}
          key={item.content as string}
        />
      );
    });

  const hasLabelItem = mergedItems.some((item) => !!item?.label);

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
      {ItemsDOM}
    </ul>,
  );
};

Timeline.Item = TimelineItem;

if (process.env.NODE_ENV !== 'production') {
  Timeline.displayName = 'Timeline';
}

export default Timeline;
