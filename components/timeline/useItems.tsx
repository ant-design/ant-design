import type * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import type { TimelineItemProps } from './TimelineItem';

function useItems(items?: TimelineItemProps[], children?: React.ReactNode): TimelineItemProps[] {
  if (items && Array.isArray(items)) return items;

  return toArray(children).map((ele: React.ReactElement<any>) => ({
    children: ele?.props?.children ?? '',
    ...ele.props,
  }));
}

export default useItems;
