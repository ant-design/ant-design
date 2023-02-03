import React from 'react';
import type { TimelineItemProps } from './TimelineItem';

function useItems(items?: TimelineItemProps[], children?: React.ReactNode): TimelineItemProps[] {
  if (items && Array.isArray(items)) return items;

  const truthyItems = React.Children.toArray(children).filter((item) => !!item);
  return React.Children.map(truthyItems, (ele: React.ReactElement<any>) => ({
    content: ele?.props?.children ?? '',
    ...ele.props,
  }));
}

export default useItems;
