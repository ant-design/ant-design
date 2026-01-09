import * as React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import type { TimelineItemType, TimelineMode, TimelineProps } from './Timeline';

export default function useItems(
  prefixCls: string,
  mode: TimelineMode,
  items?: TimelineItemType[],
  children?: React.ReactNode,
  pending?: TimelineProps['pending'],
  pendingDot?: TimelineProps['pendingDot'],
): TimelineItemType[] {
  const itemCls = `${prefixCls}-item`;

  // Merge items and children
  const parseItems = React.useMemo<TimelineItemType[]>(() => {
    return Array.isArray(items)
      ? items
      : toArray(children).map((ele: React.ReactElement<any>) => ({
          ...ele.props,
        }));
  }, [items, children]);

  // convert legacy type
  return React.useMemo(() => {
    const mergedItems = parseItems.map<TimelineItemType>((item, index) => {
      const {
        label,
        children,
        title,
        content,
        color,
        className,
        style,
        icon,
        dot,
        placement,
        position,
        loading,
        ...restProps
      } = item;

      let mergedStyle = style;
      let mergedClassName = className;

      // Color
      if (color) {
        if (['blue', 'red', 'green', 'gray'].includes(color)) {
          mergedClassName = clsx(className, `${itemCls}-color-${color}`);
        } else {
          mergedStyle = {
            '--steps-item-icon-dot-color': color,
            ...style,
          };
        }
      }

      // Placement
      const mergedPlacement =
        placement ??
        position ??
        (mode === 'alternate' ? (index % 2 === 0 ? 'start' : 'end') : mode);

      mergedClassName = clsx(mergedClassName, `${itemCls}-placement-${mergedPlacement}`);

      // Icon
      let mergedIcon = icon ?? dot;
      if (!mergedIcon && loading) {
        mergedIcon = <LoadingOutlined />;
      }

      return {
        ...restProps,
        title: title ?? label,
        content: content ?? children,
        style: mergedStyle,
        className: mergedClassName,
        icon: mergedIcon,
        status: loading ? 'process' : 'finish',
      };
    });

    if (pending) {
      mergedItems.push({
        icon: pendingDot ?? <LoadingOutlined />,
        content: pending,
        status: 'process',
      } as TimelineItemType);
    }

    return mergedItems;
  }, [parseItems, pending, pendingDot, itemCls, mode]);
}
