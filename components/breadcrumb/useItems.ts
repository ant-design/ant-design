import { useMemo } from 'react';
import type { BreadcrumbItemType, BreadcrumbSeparatorType, ItemType, Route } from './Breadcrumb';

type MergedType = BreadcrumbItemType & {
  children?: Route['children'];
};

function route2item(route: Route): MergedType {
  const { breadcrumbName, children, ...rest } = route;

  const clone: MergedType = {
    title: breadcrumbName,
    ...rest,
  };

  if (children) {
    clone.menu = {
      items: children.map(({ breadcrumbName: itemBreadcrumbName, ...itemProps }) => ({
        ...itemProps,
        title: itemBreadcrumbName,
      })),
    };
  }

  return clone;
}

export default function useItems(
  items?: ItemType[],
  routes?: Route[],
): Partial<MergedType & BreadcrumbSeparatorType>[] | null {
  return useMemo<ItemType[] | null>(() => {
    if (items) {
      return items;
    }

    if (routes) {
      return routes.map(route2item);
    }

    return null;
  }, [items, routes]);
}
