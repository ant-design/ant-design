import { useMemo } from 'react';

import useApp from '../app/useApp';
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
  const { breadcrumb } = useApp();

  return useMemo<ItemType[] | null>(() => {
    if (items) {
      return [...breadcrumb.items, ...items];
    }

    if (routes) {
      return [...breadcrumb.items, ...routes.map(route2item)];
    }

    return breadcrumb.items || null;
  }, [items, routes, breadcrumb.items]);
}
