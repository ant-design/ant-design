import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { TimelineItemProps } from './TimelineItem';
import TimelineItemList from './TimelineItemList';
import TimelineItem from './TimelineItem';
import warning from '../_util/warning';
import useItems from './useItems';

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
  const { prefixCls: customizePrefixCls, children, items, ...restProps } = props;
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(!children, 'Timeline', '`Timeline.Item` is deprecated. Please use `items` instead.');
  }

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedItems: TimelineItemProps[] = useItems(items, children);

  return wrapSSR(
    <TimelineItemList
      {...restProps}
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
