import * as React from 'react';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
// CSSINJS
import useStyle from './style';
import type { TimelineItemProps } from './TimelineItem';
import TimelineItem from './TimelineItem';
import TimelineItemList from './TimelineItemList';
import useItems from './useItems';

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
  const { getPrefixCls, direction, timeline } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, children, items, className, style, ...restProps } = props;
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Timeline');

    warning.deprecated(!children, 'Timeline.Item', 'items');
  }

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedItems: TimelineItemProps[] = useItems(items, children);

  return wrapSSR(
    <TimelineItemList
      {...restProps}
      className={classNames(timeline?.className, className)}
      style={{ ...timeline?.style, ...style }}
      prefixCls={prefixCls}
      direction={direction}
      items={mergedItems}
      hashId={hashId}
    />,
  );
};

Timeline.Item = TimelineItem;

if (process.env.NODE_ENV !== 'production') {
  Timeline.displayName = 'Timeline';
}

export default Timeline;
