import * as React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import toArray from '@rc-component/util/lib/Children/toArray';
import classNames from 'classnames';

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

  // TODO: warning for legacy usage

  // convert legacy type
  return React.useMemo(() => {
    const mergedItems: TimelineItemType[] = parseItems.map((item, index) => {
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
        position,
        ...restProps
      } = item;

      let mergedStyle = style;
      let mergedClassName = className;

      // Color
      if (color) {
        if (['blue', 'red', 'green', 'gray'].includes(color)) {
          mergedClassName = classNames(className, `${itemCls}-color-${color}`);
        } else {
          mergedStyle = {
            '--steps-item-icon-dot-color': color,
            ...style,
          };
        }
      }

      // Position
      const mergedPosition =
        position ?? (mode === 'alternate' ? (index % 2 === 0 ? 'start' : 'end') : mode);
      mergedClassName = classNames(mergedClassName, `${itemCls}-position-${mergedPosition}`);

      return {
        ...restProps,
        title: title ?? label,
        content: content ?? children,
        style: mergedStyle,
        className: mergedClassName,
        icon: icon ?? dot,
        status: 'finish',
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
  }, [prefixCls, parseItems, pending, pendingDot]);
}
