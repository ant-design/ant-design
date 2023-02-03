import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
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
    pendingDot,
    items,
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(!children, 'Timeline', '`Timeline.Item` is deprecated. Please use `items` instead.');
  }

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedItems: TimelineItemProps[] = useItems(items, children);
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

  const itemsList = mergedItems
    .filter((item: TimelineItemProps) => !!item)
    .map((item: TimelineItemProps, idx: number) => {
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
  const hasLabelItem = mergedItems.some((item: TimelineItemProps) => !!item?.label);

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
      {itemsList}
    </ul>,
  );
};

Timeline.Item = TimelineItem;

if (process.env.NODE_ENV !== 'production') {
  Timeline.displayName = 'Timeline';
}

export default Timeline;
