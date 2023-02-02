import * as React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { TimelineItemProps } from './TimelineItem';
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
  const {
    prefixCls: customizePrefixCls,
    pending = null,
    children,
    className,
    rootClassName,
    reverse = false,
    mode = '' as TimelineProps['mode'],
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(!children, 'Timeline', '`Timeline.Item` is deprecated. Please use `items` instead.');
  }

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const { items: mergedItems, hasLabelItem } = useItems(props, prefixCls);

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

  delete restProps.items;

  return wrapSSR(
    <ul {...restProps} className={classString}>
      {mergedItems}
    </ul>,
  );
};

Timeline.Item = TimelineItem;

if (process.env.NODE_ENV !== 'production') {
  Timeline.displayName = 'Timeline';
}

export default Timeline;
