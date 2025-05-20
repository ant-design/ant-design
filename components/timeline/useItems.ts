import * as React from 'react';
import toArray from '@rc-component/util/lib/Children/toArray';

import type { TimelineItemType } from './Timeline';

export default function useItems(
  items?: TimelineItemType[],
  children?: React.ReactNode,
): TimelineItemType[] {
  // Merge items and children
  const parseItems = React.useMemo(() => {
    return Array.isArray(items)
      ? items
      : toArray(children).map((ele: React.ReactElement<any>) => ({
          ...ele.props,
        }));
  }, [items, children]);

  // TODO: warning for legacy usage

  // convert legacy type
  return React.useMemo(() => {
    return parseItems.map((item) => {
      const { label, children, title, content, ...restProps } = item;
      return {
        ...restProps,
        title: title ?? label,
        content: content ?? children,
      };
    });
  }, [parseItems]);
}
