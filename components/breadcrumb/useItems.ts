import { useMemo } from 'react';
import type { BreadcrumbItemType, BreadcrumbSeparatorType, ItemType } from './Breadcrumb';

type MergedType = BreadcrumbItemType & {
  children?: ItemType['children'];
};

function route2item(route: ItemType): MergedType {
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
  routes?: ItemType[],
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
