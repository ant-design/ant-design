import type { InternalRouteType, NewBreadcrumbProps } from './Breadcrumb';

type ItemRender = NewBreadcrumbProps['itemRender'];

function getBreadcrumbName(route: InternalRouteType, params: any) {
  if (route.title === undefined) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  return typeof route.title === 'object'
    ? route.title
    : String(route.title).replace(
        new RegExp(`:(${paramsKeys})`, 'g'),
        (replacement, key) => params[key] || replacement,
      );
}

export default function useItemRender(itemRender?: ItemRender) {
  const mergedItemRender: ItemRender = (route, params, routes, path) => {
    if (itemRender) {
      return itemRender(route, params, routes, path);
    }

    const name = getBreadcrumbName(route, params);
    return name;
  };

  return mergedItemRender;
}
