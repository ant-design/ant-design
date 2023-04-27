import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
  InternalRouteType,
  NewBreadcrumbProps,
} from './Breadcrumb';

type AddParameters<TFunction extends (...args: any) => any, TParameters extends [...args: any]> = (
  ...args: [...Parameters<TFunction>, ...TParameters]
) => ReturnType<TFunction>;

type ItemRender = NonNullable<NewBreadcrumbProps['itemRender']>;
type InternalItemRenderParams = AddParameters<ItemRender, [href?: string]>;

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

export default function useItemRender(prefixCls: string, itemRender?: ItemRender) {
  const mergedItemRender: InternalItemRenderParams = (item, params, routes, path, href) => {
    if (itemRender) {
      return itemRender(item, params, routes, path);
    }

    const name = getBreadcrumbName(item, params);

    const passedProps = omit(item as BreadcrumbItemType & BreadcrumbSeparatorType, [
      'title',
      'type',
      'separator',
      'path',
      'menu',
      'overlay',
    ]);

    if (href !== undefined) {
      return (
        <a {...passedProps} className={`${prefixCls}-link`} href={href}>
          {name}
        </a>
      );
    }

    return (
      <span {...passedProps} className={`${prefixCls}-link`}>
        {name}
      </span>
    );
  };

  return mergedItemRender;
}
